import React from 'react';
import Link from 'next/link';
import {
  Leaf,
  Recycle,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Sprout,
  ArrowRight,
  Award,
} from 'lucide-react';

export const metadata = {
  title: 'Circular Soil Life Cycle & Sustainability',
  description:
    'From fallen leaf to nutrient-dense humus in 60 days. Explore how NECO PRODUCTS tableware returns to the earth without PFAS chemicals or microplastics.',
};

export default function SustainabilityPage() {
  const comparisonData = [
    {
      metric: 'Source Material',
      areca: 'Naturally shed dried palm sheaths',
      bagasse: 'Sugarcane processing residue',
      birch: 'Felled living birch trees',
      pla: 'Corn starch chemically polymerized',
      plastic: 'Fossil crude petroleum',
    },
    {
      metric: 'Deforestation Impact',
      areca: 'ZERO trees cut down',
      bagasse: 'Intensive sugar monoculture',
      birch: 'Direct logging of mature forests',
      pla: 'Pesticide intensive agricultural land',
      plastic: 'Habitat destruction & drilling',
    },
    {
      metric: 'PFAS Fluorochemicals',
      areca: '100% Zero (SGS Lab Tested)',
      bagasse: 'Often added for oil resistance',
      birch: 'Zero',
      pla: 'Chemical additives & stabilizers',
      plastic: 'Toxic phthalates & BPA',
    },
    {
      metric: 'Backyard Composting',
      areca: '45 - 60 Days in home soil',
      bagasse: '90 - 120 Days',
      birch: '180 - 365+ Days',
      pla: 'Requires industrial facility (>60°C)',
      plastic: 'Never (450+ years to microplastic)',
    },
    {
      metric: 'Hot Liquids & Boiling Soups',
      areca: 'Superior rigidity (4+ hours)',
      bagasse: 'Softens and sags quickly',
      birch: 'Rigid but absorbs moisture',
      pla: 'Melts at 55°C',
      plastic: 'Leaches micro-chemicals',
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-forest-night text-cream">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center pt-12 pb-20 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F3A2B] border border-gold/30 text-[11px] uppercase tracking-widest text-gold font-semibold">
          <Recycle className="w-3.5 h-3.5 text-sprout" />
          True Circularity
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-cream">
          Back to the Soil in{' '}
          <span className="italic text-gradient-leaf">60 Days.</span>
        </h1>

        <p className="text-sm sm:text-lg text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
          Nature makes no waste. Our tableware does not merely break down into smaller pieces — it converts into nutrient-dense organic humus that enriches agricultural soil.
        </p>
      </section>

      {/* 4-Phase Circular Life Cycle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="glass-panel rounded-3xl p-6 space-y-3">
            <span className="font-mono text-xs text-gold">PHASE 01</span>
            <h3 className="font-serif text-xl font-bold text-cream">The Natural Shed</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-light">
              Areca palm trees shed their dried leaf sheaths naturally. Leaves are collected from the soil floor with zero tree felling.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 space-y-3">
            <span className="font-mono text-xs text-sprout">PHASE 02</span>
            <h3 className="font-serif text-xl font-bold text-cream">Hydraulic Steam</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-light">
              Washed in spring water and pressed at 160°C under 15 tons of pressure. Zero glues, zero chemicals, zero paraffin wax.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 space-y-3">
            <span className="font-mono text-xs text-gold">PHASE 03</span>
            <h3 className="font-serif text-xl font-bold text-cream">The Dining Feast</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-light">
              Endures piping hot soups, roast meats, and acidic dressings with elegant wood-grain aesthetics and zero leakages.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 space-y-3">
            <span className="font-mono text-xs text-sprout">PHASE 04</span>
            <h3 className="font-serif text-xl font-bold text-cream">Return to Humus</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-light">
              Disposed directly into home gardens or compost bins. Decomposes within 60 days, yielding nitrogen-rich soil to nourish new plant sprouts.
            </p>
          </div>
        </div>

        {/* Comparative Analysis Table */}
        <div className="rounded-3xl bg-[#0C1611] border border-gold/30 p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                MATERIAL BENCHMARK
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream mt-1">
                Why Areca Palm Leaf Outperforms All Alternatives
              </h2>
            </div>
            <span className="text-[11px] font-mono text-sage px-3 py-1 rounded-full bg-[#1F3A2B] border border-gold/20">
              INDEPENDENT LAB VERIFIED
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-semibold">Metric</th>
                  <th className="py-3 px-4 font-bold text-sprout bg-[#1F3A2B]/40 rounded-t-xl">
                    NECO Areca Palm Leaf
                  </th>
                  <th className="py-3 px-4 text-cream/70">Bagasse (Sugarcane)</th>
                  <th className="py-3 px-4 text-cream/70">Birchwood</th>
                  <th className="py-3 px-4 text-cream/70">PLA Bioplastic</th>
                  <th className="py-3 px-4 text-cream/70">Single-Use Plastic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-cream/80">
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 font-medium text-cream">{row.metric}</td>
                    <td className="py-3.5 px-4 font-semibold text-sprout bg-[#1F3A2B]/20">
                      {row.areca}
                    </td>
                    <td className="py-3.5 px-4 text-cream/70">{row.bagasse}</td>
                    <td className="py-3.5 px-4 text-cream/70">{row.birch}</td>
                    <td className="py-3.5 px-4 text-cream/70">{row.pla}</td>
                    <td className="py-3.5 px-4 text-cream/50">{row.plastic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Compliance & Certifications Badges */}
        <div className="pt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel rounded-2xl p-6 space-y-3 text-center">
            <Award className="w-8 h-8 text-gold mx-auto" />
            <h4 className="font-serif text-lg font-bold text-cream">USDA BioPreferred</h4>
            <p className="text-xs text-cream/70">
              Tested 100% bio-based carbon content under ASTM D6866 international standards.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 text-center">
            <ShieldCheck className="w-8 h-8 text-sprout mx-auto" />
            <h4 className="font-serif text-lg font-bold text-cream">ISO 22000:2018</h4>
            <p className="text-xs text-cream/70">
              Certified food safety management systems for sterile, hygienic global export.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 text-center">
            <Recycle className="w-8 h-8 text-gold mx-auto" />
            <h4 className="font-serif text-lg font-bold text-cream">ASTM D6400 / EN 13432</h4>
            <p className="text-xs text-cream/70">
              Decomposition verified for home composting and commercial municipal facilities.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 text-center">
            <Leaf className="w-8 h-8 text-sprout mx-auto" />
            <h4 className="font-serif text-lg font-bold text-cream">PFAS / Fluorine Free</h4>
            <p className="text-xs text-cream/70">
              SGS lab tested zero &ldquo;forever chemicals&rdquo;, zero heavy metals, zero bisphenols.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center py-16">
        <div className="rounded-3xl bg-[#0C1611] border border-gold/30 p-10 space-y-6 shadow-2xl">
          <h2 className="font-serif text-3xl sm:text-4xl text-cream font-normal">
            Transition Your Brand Away from Plastics
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 max-w-xl mx-auto">
            Join premier hotel chains, zero-waste festival promoters, and eco-retailers worldwide.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="btn-gold inline-flex items-center gap-2"
            >
              <span>Request Wholesale Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
