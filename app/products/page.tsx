'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { productsData, ProductItem } from '@/data/products';
import { Sparkles, ArrowUpRight, Check, Download, Layers } from 'lucide-react';

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All Tableware' },
    { id: 'round', label: 'Round Plates' },
    { id: 'bowl', label: 'Deep Bowls' },
    { id: 'rectangle', label: 'Rectangular Platters' },
    { id: 'square', label: 'Square Dishes' },
    { id: 'hexagon', label: 'Hexagon Plates' },
    { id: 'heart', label: 'Heart Plates' },
    { id: 'oval', label: 'Oval Platters' },
  ];

  const filteredProducts =
    activeFilter === 'all'
      ? productsData
      : productsData.filter((p) => p.shape === activeFilter);

  return (
    <div className="pt-28 pb-24 bg-forest-night text-cream">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center pt-12 pb-16 space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F3A2B] border border-gold/30 text-[11px] uppercase tracking-widest text-gold font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-sprout" />
          The Commercial Tableware Portfolio
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-cream">
          Naturally Sculpted{' '}
          <span className="italic text-gradient-gold">Vessels & Platters.</span>
        </h1>

        <p className="text-sm sm:text-lg text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
          100% Fallen Areca Palm Sheath. Steam-pressed with zero plastics or binders. Available for private label, custom branded retail packaging, and container-load dispatches.
        </p>

        {/* Shape Filter Pills */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeFilter === f.id
                  ? 'bg-gold text-[#13201A] font-semibold shadow-glow-gold'
                  : 'bg-[#0C1611] text-cream/75 border border-white/10 hover:border-gold/40 hover:text-cream'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-3xl bg-[#0C1611]/90 border border-gold/25 overflow-hidden transition-all duration-300 hover:border-gold hover:shadow-luxury flex flex-col justify-between"
            >
              {/* Product Photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#13201A]">
                <Image
                  src={product.images.hero}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#13201A]/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-gold border border-gold/20">
                  {product.tag}
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-cream group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-cream/70 mt-2 leading-relaxed">
                    {product.shortDescription}
                  </p>

                  {/* Available Sizes List */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-[10px] uppercase tracking-wider text-sage font-mono block mb-1.5">
                      Standard Diameters & Sizes:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.sizes.map((sz) => (
                        <span
                          key={sz}
                          className="px-2.5 py-0.5 rounded-full bg-[#13201A] border border-white/10 text-[11px] text-cream/80"
                        >
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[11px] text-sage">
                    <span>Pack: <strong>{product.packQty.split('/')[0]}</strong></span>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="px-4 py-2 rounded-full text-xs font-semibold bg-gold text-[#13201A] hover:bg-gold-light transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
                  >
                    <span>View 3D Model</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Catalog Download & Custom Packaging Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="rounded-3xl bg-[#0C1611] border border-gold/30 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold">
              B2B SPECIFICATION SHEET
            </span>
            <h2 className="font-serif text-3xl font-normal text-cream">
              Download the 2026 Wholesale Product Catalog
            </h2>
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed font-light">
              Includes full container loading metrics, pallet dimensions, master carton weights, barcoding options, and SGS food safety certification test reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="btn-gold"
            >
              <Download className="w-4 h-4" />
              <span>Request Full Catalog PDF</span>
            </Link>
            <Link
              href="/contact"
              className="btn-outline-leaf"
            >
              <span>Custom Mold Inquiries</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
