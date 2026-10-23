'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Leaf,
  Droplets,
  Flame,
  Scissors,
  CheckCircle,
  Sun,
  ShieldAlert,
  Package,
  Truck,
  ArrowUpRight,
} from 'lucide-react';

interface ProcessStage {
  step: string;
  title: string;
  category: string;
  description: string;
  image: string;
  icon: any;
}

const stages: ProcessStage[] = [
  {
    step: '01',
    category: 'Agrarian Harvesting',
    title: 'Natural Sheath Shedding',
    description: 'Mature areca palm trees naturally drop their broad sheaths to the agroforest floor without human intervention or cutting.',
    image: '/frames/film/frame_0005.jpg',
    icon: Leaf,
  },
  {
    step: '02',
    category: 'Agrarian Harvesting',
    title: 'Hand Gathering & Farm Collection',
    description: 'Trained local farming families collect unblemished sheaths, sorting them by fibre thickness and natural grain density.',
    image: '/frames/film/frame_0025.jpg',
    icon: Leaf,
  },
  {
    step: '03',
    category: 'Agrarian Harvesting',
    title: 'Visual Moisture Quality Control',
    description: 'Each leaf sheath is inspected to ensure optimal internal moisture levels required for clean hydraulic thermal pressing.',
    image: '/frames/film/frame_0045.jpg',
    icon: CheckCircle,
  },
  {
    step: '04',
    category: 'Sanitation & Cleansing',
    title: 'High-Pressure Spring Water Wash',
    description: 'High-velocity spring water jets thoroughly blast away forest sand, dust, and organic debris without chemical soaps.',
    image: '/frames/film/frame_0060.jpg',
    icon: Droplets,
  },
  {
    step: '05',
    category: 'Sanitation & Cleansing',
    title: 'Freshwater Thermal Sterilization Soak',
    description: 'Leaves are briefly immersed in pristine warm spring baths to soften the fibrous lignins and achieve natural pliability.',
    image: '/frames/film/frame_0075.jpg',
    icon: Droplets,
  },
  {
    step: '06',
    category: 'Thermal Forming',
    title: 'Hydraulic Steam Pressing (160°C)',
    description: '15-ton hydraulic presses heated to 160°C mold the sheaths into durable plates and bowls, locking the natural fibers.',
    image: '/frames/film/frame_0090.jpg',
    icon: Flame,
  },
  {
    step: '07',
    category: 'Thermal Forming',
    title: 'Precision Die Sculpting',
    description: 'Laser-calibrated aluminum dies guarantee uniform rim heights, exact bowl depth volumes, and flat wobble-free bases.',
    image: '/frames/film/frame_0110.jpg',
    icon: Flame,
  },
  {
    step: '08',
    category: 'Artisanal Finishing',
    title: 'Hand Edge Trimming & Deburring',
    description: 'Artisans meticulously trim extraneous perimeter leaf fibres with rotary blades to produce a smooth, rounded edge.',
    image: '/frames/film/frame_0130.jpg',
    icon: Scissors,
  },
  {
    step: '09',
    category: 'Artisanal Finishing',
    title: 'Micro-Surface Buffing',
    description: 'Each plate surface is lightly buffed with pure organic cotton cloths to highlight the natural golden-tan palm luster.',
    image: '/frames/film/frame_0145.jpg',
    icon: Sparkles,
  },
  {
    step: '10',
    category: 'Food Safety QA',
    title: 'UV-C Germicidal Sterilization',
    description: 'All formed vessels pass through a medical-grade UV-C irradiation tunnel, eradicating 99.9% of microbial flora.',
    image: '/frames/film/frame_0165.jpg',
    icon: Sun,
  },
  {
    step: '11',
    category: 'Food Safety QA',
    title: 'Oven Moisture Equalization Chamber',
    description: 'Plates undergo dehumidification in temperature-controlled drying ovens to bring moisture strictly below 8%.',
    image: '/frames/film/frame_0185.jpg',
    icon: ShieldAlert,
  },
  {
    step: '12',
    category: 'Packaging & Export',
    title: 'Shrink Wrapping with Food-Grade Film',
    description: 'Packs of 25 are vacuum sealed with food-grade recyclable wrap and botanical silica pouches to preserve dryness.',
    image: '/frames/film/frame_0205.jpg',
    icon: Package,
  },
  {
    step: '13',
    category: 'Packaging & Export',
    title: '5-Ply Corrugated Master Cartoning',
    description: 'Shrink packs are packed into heavy-duty 5-ply export master cartons labelled with international traceability QR codes.',
    image: '/frames/film/frame_0220.jpg',
    icon: Package,
  },
  {
    step: '14',
    category: 'Packaging & Export',
    title: 'Container Palletization & Global Port Dispatch',
    description: 'Fumigated wooden pallets are secured with stretch film and dispatched to Tuticorin Port for global sea transit.',
    image: '/frames/film/frame_0240.jpg',
    icon: Truck,
  },
];

export default function ProcessPage() {
  return (
    <div className="pt-28 pb-24 bg-forest-night text-cream relative">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center pt-12 pb-20 space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F3A2B] border border-gold/30 text-[11px] uppercase tracking-widest text-gold font-semibold">
          <Flame className="w-3.5 h-3.5 text-gold" />
          The 14-Stage Hydraulic Craft
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-cream">
          From Forest Floor to{' '}
          <span className="italic text-gradient-gold">Global Tables.</span>
        </h1>

        <p className="text-sm sm:text-lg text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
          Zero chemicals. Zero artificial binders. Our 14-stage manufacturing process combines ancestral agrarian knowledge with precision industrial thermal pressure.
        </p>
      </section>

      {/* Pinned Vertical Timeline */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative py-12">
        {/* Central Glowing Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-gold/30 via-gold to-sprout shadow-glow-gold pointer-events-none" />

        <div className="space-y-16 relative">
          {stages.map((stage, idx) => {
            const isEven = idx % 2 === 0;
            const Icon = stage.icon;

            return (
              <div
                key={stage.step}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Center Node on the line */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0C1611] border-2 border-gold flex items-center justify-center text-gold z-20 shadow-glow-gold">
                  <Icon className="w-4 h-4 text-gold" />
                </div>

                {/* Content Card (Half width) */}
                <div className="w-full md:w-1/2 pl-14 md:pl-0">
                  <div className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
                        STAGE {stage.step}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-[#1F3A2B] text-sprout border border-sprout/30">
                        {stage.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-cream">
                      {stage.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-light">
                      {stage.description}
                    </p>
                  </div>
                </div>

                {/* Photo Card (Half width) */}
                <div className="w-full md:w-1/2 pl-14 md:pl-0">
                  <div className="relative rounded-3xl overflow-hidden border border-gold/25 aspect-[16/10] shadow-xl group">
                    <Image
                      src={stage.image}
                      alt={stage.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C1611]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 text-[10px] uppercase tracking-wider text-cream/80 font-mono">
                      FRAME RECORDING • TENKASI UNITS
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
        <div className="rounded-3xl bg-[#0C1611] border border-gold/30 p-10 space-y-6 shadow-2xl">
          <h2 className="font-serif text-3xl sm:text-4xl text-cream font-normal">
            Ready to Inspect Real Samples?
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 max-w-xl mx-auto">
            Order a sample showcase box delivered via DHL / FedEx directly to your business address.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="btn-gold inline-flex items-center gap-2"
            >
              <span>Order Sample Kit Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
