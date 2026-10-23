'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const quoteFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid business email is required'),
  country: z.string().min(2, 'Destination country is required'),
  volume: z.string().min(1, 'Please select container/order volume'),
  products: z.array(z.string()).min(1, 'Please select at least one item of interest'),
  message: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export const QuoteForm: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: '',
      email: '',
      country: '',
      volume: 'Sample Pack (Curated Showcase)',
      products: ['Round Plates (10" / 12")'],
      message: '',
    },
  });

  const selectedProducts = watch('products') || [];

  const handleProductToggle = (item: string) => {
    if (selectedProducts.includes(item)) {
      setValue(
        'products',
        selectedProducts.filter((p) => p !== item),
        { shouldValidate: true }
      );
    } else {
      setValue('products', [...selectedProducts, item], { shouldValidate: true });
    }
  };

  const onSubmit = async (data: QuoteFormValues) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setSubmitted(true);
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C9A46A', '#A3C25A', '#F4EDE1'],
        });
        reset();
      } else {
        setServerError(json.message || 'Error sending quote request');
      }
    } catch (e) {
      setServerError('Network error. Please try reaching us directly via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#0C1611]/90 backdrop-blur-xl border border-gold/40 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 rounded-full bg-[#1F3A2B] border-2 border-sprout mx-auto flex items-center justify-center text-sprout shadow-glow-leaf">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
          Inquiry Dispatched Successfully
        </h3>
        <p className="text-sm text-cream/80 max-w-md mx-auto leading-relaxed">
          Thank you. Our export desk has received your request. We will formulate a comprehensive FOB / CIF commercial quotation and coordinate your sample kit within 24 business hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold text-[#13201A] hover:bg-gold-light transition-all"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0C1611]/85 backdrop-blur-xl border border-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1F3A2B] border border-gold/30 text-[10px] uppercase tracking-wider text-gold font-semibold mb-2">
          <Sparkles className="w-3 h-3 text-sprout" />
          Priority B2B Desk
        </div>
        <h3 className="font-serif text-2xl font-bold text-cream">
          Request Wholesale Pricing & Sample Kit
        </h3>
        <p className="text-xs text-cream/70 mt-1">
          Commercial inquiries are dispatched with FOB Tuticorin / CIF global port rates within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {serverError && (
          <div className="p-3 rounded-xl bg-red-900/40 border border-red-500/50 text-xs text-red-200">
            {serverError}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-gold font-medium mb-1.5">
              Your Name *
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="e.g. Marcus Vance"
              className="w-full px-4 py-2.5 rounded-xl bg-[#13201A] border border-white/10 text-cream placeholder:text-cream/30 text-sm focus:outline-none focus:border-gold transition-colors"
            />
            {errors.name && (
              <span className="text-[10px] text-red-400 mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-gold font-medium mb-1.5">
              Business Email *
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="marcus@hospitalitygroup.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#13201A] border border-white/10 text-cream placeholder:text-cream/30 text-sm focus:outline-none focus:border-gold transition-colors"
            />
            {errors.email && (
              <span className="text-[10px] text-red-400 mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Destination Country */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-gold font-medium mb-1.5">
              Destination Country & Port *
            </label>
            <input
              type="text"
              {...register('country')}
              placeholder="e.g. USA (Port of Los Angeles)"
              className="w-full px-4 py-2.5 rounded-xl bg-[#13201A] border border-white/10 text-cream placeholder:text-cream/30 text-sm focus:outline-none focus:border-gold transition-colors"
            />
            {errors.country && (
              <span className="text-[10px] text-red-400 mt-1 block">
                {errors.country.message}
              </span>
            )}
          </div>

          {/* Volume */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-gold font-medium mb-1.5">
              Estimated Volume *
            </label>
            <select
              {...register('volume')}
              className="w-full px-4 py-2.5 rounded-xl bg-[#13201A] border border-white/10 text-cream text-sm focus:outline-none focus:border-gold transition-colors"
            >
              <option value="Sample Pack (Curated Showcase)">
                Free Sample Pack (Curated Samples)
              </option>
              <option value="LCL Pallet (5,000 - 20,000 pcs)">
                LCL Pallet (5,000 - 20,000 pcs)
              </option>
              <option value="20ft Container (approx 50,000 pcs)">
                20ft Full Container (~50,000 pcs)
              </option>
              <option value="40ft High Cube Container (~110,000 pcs)">
                40ft High Cube Container (~110,000 pcs)
              </option>
              <option value="Monthly Contract Dispatches">
                Recurring Monthly Contract Dispatches
              </option>
            </select>
          </div>
        </div>

        {/* Product Portfolio Checkboxes */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-gold font-medium mb-2">
            Product Portfolio of Interest *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Round Plates (10" / 12")',
              'Deep Bowls (Soup & Curries)',
              'Rectangular Platters (Sushi / Tapas)',
              'Square Dishes & Geometric Bowls',
            ].map((prod) => {
              const isChecked = selectedProducts.includes(prod);
              return (
                <button
                  type="button"
                  key={prod}
                  onClick={() => handleProductToggle(prod)}
                  className={`p-2.5 rounded-xl text-xs text-left border transition-all flex items-center gap-2 ${
                    isChecked
                      ? 'bg-[#1F3A2B] border-gold text-cream'
                      : 'bg-[#13201A] border-white/10 text-cream/70 hover:border-gold/40'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                      isChecked
                        ? 'bg-gold border-gold text-[#13201A]'
                        : 'border-white/30'
                    }`}
                  >
                    {isChecked && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                  <span className="truncate">{prod}</span>
                </button>
              );
            })}
          </div>
          {errors.products && (
            <span className="text-[10px] text-red-400 mt-1 block">
              {errors.products.message}
            </span>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-gold font-medium mb-1.5">
            Custom Mold / Private Label Specifications (Optional)
          </label>
          <textarea
            {...register('message')}
            rows={2}
            placeholder="Tell us if you require custom laser branding, bespoke multi-compartment trays, or custom barcoded retail shrink packaging..."
            className="w-full px-4 py-2.5 rounded-xl bg-[#13201A] border border-white/10 text-cream placeholder:text-cream/30 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-full font-semibold uppercase tracking-wider text-xs bg-gold hover:bg-gold-light text-[#13201A] transition-all duration-300 shadow-glow-gold flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <>
              <span>Request Commercial FOB Pricing</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-center text-[10px] text-cream/50 pt-1">
          Direct response within 24 business hours • Free eco-sample catalog available on request
        </p>
      </form>
    </div>
  );
};
