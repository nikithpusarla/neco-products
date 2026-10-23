import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid business email'),
  country: z.string().min(2, 'Please specify your destination country'),
  volume: z.string().min(1, 'Please select estimated volume'),
  products: z.array(z.string()).min(1, 'Select at least one product category'),
  message: z.string().optional(),
});

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = quoteSchema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.EXPORT_NOTIFICATION_EMAIL;
    const configured = apiKey && !apiKey.includes('placeholder') && to;

    if (configured) {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'NECO Quotes <onboarding@resend.dev>',
        to: [to],
        replyTo: data.email,
        subject: `New export quote request — ${data.name} (${data.country})`,
        html: `<h2>New quote request</h2>
<p><b>Name:</b> ${escapeHtml(data.name)}</p>
<p><b>Email:</b> ${escapeHtml(data.email)}</p>
<p><b>Destination:</b> ${escapeHtml(data.country)}</p>
<p><b>Volume:</b> ${escapeHtml(data.volume)}</p>
<p><b>Products:</b> ${data.products.map(escapeHtml).join(', ')}</p>
<p><b>Message:</b><br/>${escapeHtml(data.message || '—').replace(/\n/g, '<br/>')}</p>`,
      });
      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json(
          { success: false, message: 'We could not send your inquiry. Please email us directly or use WhatsApp.' },
          { status: 502 }
        );
      }
    } else {
      console.warn('[quote] RESEND_API_KEY not configured; inquiry logged only:', data);
    }

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been received. Our export coordinator will reply within 24 hours.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error processing quote request' },
      { status: 500 }
    );
  }
}
