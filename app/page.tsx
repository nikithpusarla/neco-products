'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ScrollSequence } from '@/components/scroll/ScrollSequence';
import { QuoteForm } from '@/components/ui/QuoteForm';
import { siteConfig } from '@/data/siteConfig';
import {
  Leaf,
  Droplets,
  Flame,
  Sprout,
  ShieldCheck,
  Award,
  Recycle,
  Sparkles,
  ArrowUpRight,
  ArrowDown,
  MapPin,
  Phone,
  Mail,
  Check,
} from 'lucide-react';

// Dynamically import Three.js components to prevent SSR hydration issues
const PlateViewer = dynamic(
  () => import('@/components/three/PlateViewer').then((mod) => mod.PlateViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] rounded-3xl bg-[#0C1611]/80 border border-gold/20 flex flex-col items-center justify-center gap-3">
        <span className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
        <p className="text-xs uppercase tracking-widest text-gold font-mono">
          Loading 3D Product Canvas...
        </p>
      </div>
    ),
  }
);

const LeafParticles = dynamic(
  () => import('@/components/three/LeafParticles').then((mod) => mod.LeafParticles),
  { ssr: false }
);

export default function HomePage() {
  return (
    <div className="relative bg-forest-night text-cream selection:bg-gold selection:text-forest-night">
      {/* =========================================================================
          HERO SECTION: 240-FRAME SCROLL-DRIVEN CINEMATIC FILM (Core Feature 1)
          ========================================================================= */}
      <ScrollSequence totalFrames={240} containerHeight="750vh" />

      {/* =========================================================================
          FEATURE HIGHLIGHT: 100% RAW ORGANIC MATERIAL
          ========================================================================= */}
      <section id="craft" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F3A2B]/70 border border-gold/30 text-[11px] uppercase tracking-widest text-gold font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-sprout" />
              100% Raw Organic Material
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.15] text-cream">
              Each vessel carries its own{' '}
              <span className="italic text-gradient-gold">grain, tone,</span> and forest memory.
            </h2>

            <p className="text-sm sm:text-base text-cream/80 leading-relaxed font-light">
              Formed under high-pressure steam without fillers — this retains agrarian water lines intact from life on the palm tree. 100% resistant to leaking and hot liquids, naturally rigid, an artisanal platter crafted without chemicals.
            </p>

            {/* Stats Row */}
            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-white/10">
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-gold">
                  60 Days
                </span>
                <p className="text-xs text-cream/70 mt-1 uppercase tracking-wider">
                  Complete backyard composting
                </p>
              </div>

              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-sprout">
                  -20° to 200°C
                </span>
                <p className="text-xs text-cream/70 mt-1 uppercase tracking-wider">
                  Microwave & freezer safe
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Card (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-gold/30 shadow-2xl group">
              <Image
                src="/images/products/artisan-tableware.jpg"
                alt="Artisanal bio-plates tableware arrangement on dark slate"
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1611] via-transparent to-transparent opacity-60" />

              {/* Badges on Image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-cream">
                <span className="bg-[#13201A]/85 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30 font-medium">
                  ARTISAN BIO-PLATES • NATURE&apos;S BOUNTY
                </span>
                <span className="bg-gold text-[#13201A] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[10px]">
                  Plaques / Soy
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER PROCESS SECTION: THE JOURNEY OF A FALLEN LEAF (4-Step Cards)
          ========================================================================= */}
      <section id="process" className="relative py-24 bg-[#0C1611] border-y border-gold/15 overflow-hidden">
        <LeafParticles />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold font-medium mb-2">
                CHAPTER 01 — 10 GLORIOUS STEPS
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-cream">
                The Journey of a Fallen Leaf
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-cream/70 max-w-md leading-relaxed">
              Areca vessels harvest fallen leaves in ancient agroforestry in Tamil Nadu & South India, where not a single living branch is cut or harmed.
            </p>
          </div>

          {/* 4 Process Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-gold/80">01</span>
                  <div className="w-8 h-8 rounded-full bg-[#1F3A2B] border border-gold/30 flex items-center justify-center text-gold">
                    <Leaf className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-cream mb-2">
                  The Natural Shedding
                </h3>
                <p className="text-xs text-cream/70 leading-relaxed">
                  Every mature areca palm sheds 6 to 8 leaves per year without human intervention. Our farmers collect fallen sheaths from agroforest floors.
                </p>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-sage border-t border-white/10 pt-3 block">
                SHEATH COLLECTION
              </span>
            </div>

            {/* Step 2 */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-gold/80">02</span>
                  <div className="w-8 h-8 rounded-full bg-[#1F3A2B] border border-gold/30 flex items-center justify-center text-sprout">
                    <Droplets className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-cream mb-2">
                  Spring Water Purge
                </h3>
                <p className="text-xs text-cream/70 leading-relaxed">
                  Sheaths receive high-pressure cleansing water spray to remove forest dirt and dust residue. We sterilize sheaths with heat-infused natural springs for fresh hygiene.
                </p>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-sage border-t border-white/10 pt-3 block">
                SPRING PURIFICATION
              </span>
            </div>

            {/* Step 3 */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-gold/80">03</span>
                  <div className="w-8 h-8 rounded-full bg-[#1F3A2B] border border-gold/30 flex items-center justify-center text-gold">
                    <Flame className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-cream mb-2">
                  Steam Press Forming
                </h3>
                <p className="text-xs text-cream/70 leading-relaxed">
                  Hydraulic presses heat leaf sheaths to 150°C to shape and deep cleanse the bowls, naturally sterilizing the surface and activating inherent natural moisture for structural rigidity.
                </p>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-sage border-t border-white/10 pt-3 block">
                HYDRAULIC STEAM PRESSING
              </span>
            </div>

            {/* Step 4 */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-gold/80">04</span>
                  <div className="w-8 h-8 rounded-full bg-[#1F3A2B] border border-gold/30 flex items-center justify-center text-sprout">
                    <Sprout className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-cream mb-2">
                  Return to Humus
                </h3>
                <p className="text-xs text-cream/70 leading-relaxed">
                  After banquet use, our plates decompose into pure compost within 50 days, releasing nutrient-dense organic matter back into soil to fertilize next season&apos;s palms.
                </p>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-sage border-t border-white/10 pt-3 block">
                HOME COMPOSTABLE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRODUCT SHOWCASE: OUR BASIC RANGE OF ARECA LEAF PRODUCTS (4 Cards)
          ========================================================================= */}
      <section id="collection" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-2">
            EXPORTERS & B2B COMMERCIAL PORTFOLIO
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-cream mb-4">
            Our Basic Range of Areca Leaf Products
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 leading-relaxed">
            Engineered for rigorous and hospitable catering to stem waste, our vessels outperform plastics and commercial paperwares every single time.
          </p>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Product 1: Round Plates */}
          <div className="group rounded-2xl bg-[#0C1611]/90 border border-gold/25 overflow-hidden transition-all duration-300 hover:border-gold hover:shadow-luxury flex flex-col justify-between">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#13201A]">
              <Image
                src="/images/products/round-plate-hero.jpg"
                alt="Areca Round Plates"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-[#13201A]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-gold border border-gold/20">
                Heavy Feast
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-cream group-hover:text-gold transition-colors">
                  Round Plates
                </h3>
                <p className="text-xs text-cream/70 mt-1 leading-relaxed">
                  Available in 6&quot;, 8&quot;, 10&quot;, and 12&quot; diameter. Heavy, rigid, and grease-resistant base plate for full wedding meals and roasts.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-sage">
                <span>Standard Packs: 25 / 100</span>
                <Link
                  href="/products/round-plates"
                  className="text-gold font-medium hover:underline inline-flex items-center gap-0.5"
                >
                  Square / Round ›
                </Link>
              </div>
            </div>
          </div>

          {/* Product 2: Round Bowls */}
          <div className="group rounded-2xl bg-[#0C1611]/90 border border-gold/25 overflow-hidden transition-all duration-300 hover:border-gold hover:shadow-luxury flex flex-col justify-between">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#13201A]">
              <Image
                src="/images/products/round-bowl-hero.jpg"
                alt="Areca Round Bowls"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-[#13201A]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-sprout border border-sprout/20">
                Deep Cavity
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-cream group-hover:text-gold transition-colors">
                  Round Bowls
                </h3>
                <p className="text-xs text-cream/70 mt-1 leading-relaxed">
                  Available in 3&quot;, 4&quot;, and 5&quot; deep cavities. Designed for hot curries, soups, sweet puddings, and ice creams.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-sage">
                <span>Standard Packs: 25 / 100</span>
                <Link
                  href="/products/round-bowls"
                  className="text-gold font-medium hover:underline inline-flex items-center gap-0.5"
                >
                  Liquid Tight ›
                </Link>
              </div>
            </div>
          </div>

          {/* Product 3: Rectangle Plates */}
          <div className="group rounded-2xl bg-[#0C1611]/90 border border-gold/25 overflow-hidden transition-all duration-300 hover:border-gold hover:shadow-luxury flex flex-col justify-between">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#13201A]">
              <Image
                src="/images/products/rect-platter-hero.jpg"
                alt="Areca Rectangle Plates"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-[#13201A]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-gold border border-gold/20">
                Multi-Compartment
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-cream group-hover:text-gold transition-colors">
                  Rectangle Plates
                </h3>
                <p className="text-xs text-cream/70 mt-1 leading-relaxed">
                  Available in 8&quot;x4&quot; and 10&quot;x6.5&quot; multi-compartment format for sushi, antipasto, and catering platters.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-sage">
                <span>Standard Packs: 25 / 100</span>
                <Link
                  href="/products/rectangle-platters"
                  className="text-gold font-medium hover:underline inline-flex items-center gap-0.5"
                >
                  Rigid ›
                </Link>
              </div>
            </div>
          </div>

          {/* Product 4: Square Bowls */}
          <div className="group rounded-2xl bg-[#0C1611]/90 border border-gold/25 overflow-hidden transition-all duration-300 hover:border-gold hover:shadow-luxury flex flex-col justify-between">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#13201A]">
              <Image
                src="/images/products/square-bowl-hero.jpg"
                alt="Areca Square Bowls"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-[#13201A]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-sprout border border-sprout/20">
                Geometric
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-cream group-hover:text-gold transition-colors">
                  Square Bowls
                </h3>
                <p className="text-xs text-cream/70 mt-1 leading-relaxed">
                  Available in 5&quot;x5&quot; & 6&quot;x6&quot; flares. Modern square geometry providing elegance and structural elegance.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-sage">
                <span>Standard Packs: 25 / 100</span>
                <Link
                  href="/products/square-bowls"
                  className="text-gold font-medium hover:underline inline-flex items-center gap-0.5"
                >
                  Stackable ›
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Mold Banner Bar */}
        <div className="rounded-2xl bg-[#1F3A2B]/40 border border-gold/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1F3A2B] border border-gold/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-cream">
                Seeking Customised Thick Plates or Custom Export Molds?
              </h4>
              <p className="text-xs text-cream/70 mt-0.5">
                We press to bespoke client molds: compartment trays (3-bay, 4-bay), custom shrink-wrap and export packaging.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#1F3A2B] hover:bg-[#284c38] text-cream border border-gold/40 hover:border-gold whitespace-nowrap transition-all shadow-md shrink-0"
          >
            Request Custom Catalog
          </Link>
        </div>
      </section>

      {/* =========================================================================
          REAL-TIME 3D PRODUCT VIEWER: THE LIVING COLLECTION (Core Feature 2)
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-2">
            INTERACTIVE REAL-TIME 3D LAB
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-cream mb-4">
            Examine Every Curve & Contour
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 leading-relaxed">
            Switch geometries, test nesting stacks, and view the authentic botanical curvature formed under hydraulic pressure.
          </p>
        </div>

        <PlateViewer initialShape="round" allowShapeSwitch={true} />
      </section>

      {/* =========================================================================
          PROMISE SECTION: OUR PROMISE TO THE SOIL (Quote + 4 Pills)
          ========================================================================= */}
      <section className="relative py-24 sm:py-32 bg-[#0C1611] border-y border-gold/15 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
            OUR PROMISE TO THE SOIL
          </p>

          <blockquote className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-cream leading-tight">
            &ldquo;Let us leave a healthy planet to our coming generations!&rdquo;
          </blockquote>

          <p className="text-xs sm:text-sm text-cream/70 max-w-2xl mx-auto leading-relaxed">
            Manufactured without artificial additives, preservatives, or chemical treatments. Verified by independent lab tests for food contact.
          </p>

          {/* 4 Feature Badges */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-panel rounded-2xl p-4 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#1F3A2B] border border-sprout/40 mx-auto flex items-center justify-center text-sprout">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-bold text-cream">100% Vegan</h4>
              <p className="text-[11px] text-cream/60">
                Naturally shed leaves without animal fats or waxes.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-4 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#1F3A2B] border border-sprout/40 mx-auto flex items-center justify-center text-sprout">
                <Recycle className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-bold text-cream">100% Compostable</h4>
              <p className="text-[11px] text-cream/60">
                Decomposes in 60 days into nutrient-rich backyard compost.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-4 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#1F3A2B] border border-gold/40 mx-auto flex items-center justify-center text-gold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-bold text-cream">Chemical Free</h4>
              <p className="text-[11px] text-cream/60">
                Steam-pressed at 160°C with zero chemical additives.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-4 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#1F3A2B] border border-cream/30 mx-auto flex items-center justify-center text-cream">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-bold text-cream">ISO 22000 Certified</h4>
              <p className="text-[11px] text-cream/60">
                Certified Food Safety Management for global export.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHOLESALE, PRIVATE LABEL & CONTAINER DISPATCHES (Quote Form)
          ========================================================================= */}
      <section id="quote" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Wholesale Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F3A2B] border border-gold/30 text-[11px] uppercase tracking-wider text-gold font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-sprout" />
              For Bulk / Export Buyers Only
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-cream leading-[1.15]">
              Wholesale, Private Label & Container Dispatches
            </h2>

            <p className="text-xs sm:text-sm text-cream/80 leading-relaxed font-light">
              Premium tableware directly from our Tamil Nadu manufacturer. Supplying hospitality groups, eco-distributors, and zero-waste events across North America, Europe, Australia, and the Middle East with custom private-label solutions.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cream block mb-0.5">Manufacturing Facility:</strong>
                  <p className="text-cream/70">{siteConfig.address.full}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cream block mb-0.5">
                    Direct Founder & WhatsApp Coordinator:
                  </strong>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                    className="text-gold font-medium hover:underline"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cream block mb-0.5">Export Inquiries:</strong>
                  <p className="text-cream/70">
                    {siteConfig.emails.general} • {siteConfig.emails.export}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
