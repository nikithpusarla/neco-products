import React from 'react';
import { QuoteForm } from '@/components/ui/QuoteForm';
import { siteConfig } from '@/data/siteConfig';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ShieldCheck,
  Package,
  ArrowUpRight,
} from 'lucide-react';

export const metadata = {
  title: 'Contact & Request Wholesale Quotation',
  description:
    'Direct communication with NECO PRODUCTS factory in Tenkasi, Tamil Nadu. Request commercial FOB/CIF pricing, private label samples, and container scheduling.',
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24 bg-forest-night text-cream">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center pt-12 pb-16 space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F3A2B] border border-gold/30 text-[11px] uppercase tracking-widest text-gold font-semibold">
          <MessageCircle className="w-3.5 h-3.5 text-sprout" />
          Direct Factory Communication
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-cream">
          Connect with Our{' '}
          <span className="italic text-gradient-gold">Export Desk.</span>
        </h1>

        <p className="text-sm sm:text-lg text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
          Whether you are an international food-service distributor, zero-waste festival director, or private-label eco brand, our team provides swift quotes and physical sample kits.
        </p>
      </section>

      {/* Main Grid: Form + Factory Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>

          {/* Right Column: Factory & Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Card */}
            <div className="glass-panel rounded-3xl p-8 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-cream">
                Factory & Coordination
              </h3>

              <div className="space-y-4 text-xs text-cream/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream block mb-0.5">Manufacturing Facility:</strong>
                    <p className="text-cream/70 leading-relaxed">
                      {siteConfig.address.facility}, {siteConfig.address.state} {siteConfig.address.postalCode}, {siteConfig.address.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream block mb-0.5">WhatsApp & Direct Phone:</strong>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                      className="text-gold font-medium hover:underline text-sm"
                    >
                      {siteConfig.phone}
                    </a>
                    <span className="block text-[10px] text-sage/80 mt-0.5">
                      Available Mon-Sat, 8:00 AM - 8:00 PM IST (UTC+5:30)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream block mb-0.5">Electronic Inquiries:</strong>
                    <p className="text-cream/70">
                      General: {siteConfig.emails.general}
                    </p>
                    <p className="text-cream/70">
                      Wholesale & Export: {siteConfig.emails.export}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream block mb-0.5">Commercial Response SLA:</strong>
                    <p className="text-cream/70">
                      Quotations, container packing specs, and certificates dispatched within 24 hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#1F3A2B] hover:bg-[#284c38] text-sprout border border-sprout/40 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Direct on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Sample Kit Box Callout */}
            <div className="rounded-3xl bg-[#0C1611] border border-gold/30 p-8 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1F3A2B] border border-gold/40 flex items-center justify-center text-gold">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-cream">Free Sample Showcase Box</h4>
                  <span className="text-[10px] text-sprout uppercase tracking-wider font-mono">
                    DISPATCHED VIA DHL EXPRESS
                  </span>
                </div>
              </div>
              <p className="text-xs text-cream/70 leading-relaxed font-light">
                Inspect genuine areca palm leaf plates in your culinary kitchen. Our sample showcase box includes all 7 plate and bowl geometries, soup bowls, and dessert dishes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
