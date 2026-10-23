import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, HeartHandshake, Trees, ShieldCheck, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const metadata = {
  title: 'Our Story & Botanical Heritage',
  description:
    'Discover how NECO PRODUCTS partners with agrarian families in Tamil Nadu to transform naturally shed areca palm leaves into luxury tableware without cutting down a single branch.',
};

export default function StoryPage() {
  return (
    <div className="pt-28 pb-24 bg-forest-night text-cream">
      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6 pt-12 pb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F3A2B] border border-gold/30 text-[11px] uppercase tracking-widest text-gold font-semibold">
          <Trees className="w-3.5 h-3.5 text-sprout" />
          The Living Canopy Tradition
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.1] text-cream">
          Not a single branch is harmed. We simply catch what the{' '}
          <span className="italic text-gradient-gold">canopy gifts us.</span>
        </h1>

        <p className="text-base sm:text-xl text-cream/80 max-w-3xl mx-auto font-light leading-relaxed">
          Deep within the lush agroforests flanking the Western Ghats in Tamil Nadu, the Areca palm (Areca Catechu) undergoes an ancient natural shedding ritual.
        </p>
      </section>

      {/* Narrative & Visual Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <div className="relative rounded-3xl overflow-hidden border border-gold/30 shadow-2xl aspect-[4/3]">
            <Image
              src="/frames/film/frame_0010.jpg"
              alt="Fallen leaf collection in Tamil Nadu plantation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1611] via-transparent to-transparent opacity-50" />
            <div className="absolute bottom-4 left-4 text-xs font-mono text-gold bg-[#13201A]/80 px-3 py-1 rounded-full border border-gold/20">
              TAMIL NADU AGROFORESTS • SHENKOTTAI
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold">
              01 — REVERENCE FOR THE TREE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-cream">
              An Agrarian Cycle Older Than Industrialization
            </h2>
            <p className="text-sm text-cream/80 leading-relaxed font-light">
              For generations, rural families in South India revered the fallen sheath of the areca palm. Unlike traditional paper and wood tableware that demands the destruction of intact forest ecosystems, our process requires zero deforestation.
            </p>
            <p className="text-sm text-cream/80 leading-relaxed font-light">
              Each tree sheds between 6 to 8 thick sheaths annually. What used to be burned in fields is now collected with quiet agrarian dignity, providing supplementary income to smallholder farming families while offering the hospitality industry an uncompromised organic vessel.
            </p>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
          <div className="glass-panel rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#1F3A2B] border border-gold/30 flex items-center justify-center text-gold">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-cream">Zero Tree Cutting</h3>
            <p className="text-xs text-cream/70 leading-relaxed">
              We never sever living palm leaves. Every vessel is pressed exclusively from naturally dried sheaths harvested after their organic release from the crown.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#1F3A2B] border border-sprout/30 flex items-center justify-center text-sprout">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-cream">Empowering Rural Hands</h3>
            <p className="text-xs text-cream/70 leading-relaxed">
              Over 200+ local women artisans and rural farmers form the backbone of our Tenkasi collection units, earning fair trade dignified compensation.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#1F3A2B] border border-gold/30 flex items-center justify-center text-gold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-cream">Zero Chemical Finishing</h3>
            <p className="text-xs text-cream/70 leading-relaxed">
              Pure freshwater cleansing and thermal steam pressure lock the fibres together. No synthetic waxes, no formaldehyde glues, no coatings whatsoever.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center py-16">
        <div className="rounded-3xl bg-[#0C1611] border border-gold/30 p-10 space-y-6 shadow-2xl">
          <h2 className="font-serif text-3xl sm:text-4xl text-cream font-normal">
            Witness the Hydraulic Steam Craft
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 max-w-xl mx-auto">
            Explore our 14-stage manufacturing process from mountain spring washing to container shipping.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/process"
              className="btn-gold"
            >
              <span>Explore The Process</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="btn-outline-leaf"
            >
              <span>View Tableware Collection</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
