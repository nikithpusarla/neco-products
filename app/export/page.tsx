import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { exportDestinations, exportOrigin } from '@/data/exportCountries';
import {
  Globe as GlobeIcon,
  Ship,
  FileText,
  ShieldCheck,
  Package,
  Layers,
  ArrowUpRight,
  Anchor,
  Clock,
  Compass,
} from 'lucide-react';

const Globe3D = dynamic(
  () => import('@/components/three/Globe').then((mod) => mod.Globe),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[560px] rounded-3xl bg-[#0C1611]/80 border border-gold/20 flex flex-col items-center justify-center gap-3">
        <span className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
        <p className="text-xs uppercase tracking-widest text-gold font-mono">
          Loading 3D Global Trade Arcs...
        </p>
      </div>
    ),
  }
);

export const metadata = {
  title: 'Global Export & Wholesale Dispatches',
  description:
    'Direct container shipments from Tuticorin Port, Tamil Nadu to North America, Europe, Australia, and the Middle East. Full container load (FCL), palletized LCL, and private label packaging.',
};

export default function ExportPage() {
  const containerMetrics = [
    {
      type: '20ft Standard Container (FCL)',
      pieces: '~48,000 to 55,000 units',
      pallets: '10 Standard Export Pallets',
      transitTime: '18 - 25 Days (EU / Middle East)',
      ideal: 'Medium-sized distributors & regional supermarket chains',
    },
    {
      type: '40ft High Cube Container (FCL)',
      pieces: '~110,000 to 125,000 units',
      pallets: '21 Heavy Export Pallets',
      transitTime: '22 - 32 Days (Americas / Australia)',
      ideal: 'Large hospitality suppliers, national retail brands',
    },
    {
      type: 'LCL Pallet Consignments',
      pieces: '5,000 to 20,000 units',
      pallets: '1 to 4 Stretch-Wrapped Pallets',
      transitTime: '14 - 28 Days',
      ideal: 'Boutique eco-stores, trial market launches, seasonal festivals',
    },
  ];

  const exportDocs = [
    { title: 'Certificate of Origin (COO)', desc: 'Issued by Chamber of Commerce India for preferential customs tariffs.' },
    { title: 'Phytosanitary Certificate', desc: 'Government quarantine clearance certifying pest & weed-free botanical cargo.' },
    { title: 'ISPM 15 Fumigation Certificate', desc: 'Heat-treated and fumigated export wooden pallets complying with biosecurity.' },
    { title: 'SGS Food Contact Migration Report', desc: 'Verified 100% compliant with US FDA 21 CFR and EU 1935/2004 regulations.' },
    { title: 'Commercial Invoice & Packing List', desc: 'Itemized SKU barcodes, carton weights, and HS Code classification.' },
    { title: 'Clean On-Board Ocean Bill of Lading (B/L)', desc: 'Issued directly by Maersk, MSC, Hapag-Lloyd, or CMA CGM lines.' },
  ];

  return (
    <div className="pt-28 pb-24 bg-forest-night text-cream">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center pt-12 pb-16 space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F3A2B] border border-gold/30 text-[11px] uppercase tracking-widest text-gold font-semibold">
          <Ship className="w-3.5 h-3.5 text-sprout" />
          Global Maritime Freight & B2B Supply
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-cream">
          Direct Dispatches from{' '}
          <span className="italic text-gradient-gold">Tamil Nadu, India.</span>
        </h1>

        <p className="text-sm sm:text-lg text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
          Supplying hospitality leaders and certified zero-waste distributors across 30+ countries from our facility near Tuticorin Port (V.O. Chidambaranar Port).
        </p>
      </section>

      {/* 3D Global Network Globe Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        <Globe3D />
      </section>

      {/* Origin & Port Infrastructure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="glass-panel rounded-3xl p-8 space-y-3">
            <Anchor className="w-8 h-8 text-gold" />
            <h3 className="font-serif text-xl font-bold text-cream">Port Proximity</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-light">
              Our factory in Tenkasi is situated just 110 km from Tuticorin Port (VOC Port) — one of India&apos;s premier deep-water container ports offering direct express sea links.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-8 space-y-3">
            <Compass className="w-8 h-8 text-sprout" />
            <h3 className="font-serif text-xl font-bold text-cream">Incoterms Supported</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-light">
              We execute shipments under <strong>FOB Tuticorin</strong>, <strong>CIF Destination Port</strong>, and <strong>DDP (Delivered Duty Paid)</strong> with pre-cleared customs logistics.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-8 space-y-3">
            <Clock className="w-8 h-8 text-gold" />
            <h3 className="font-serif text-xl font-bold text-cream">Dispatch Lead Times</h3>
            <p className="text-xs text-cream/70 leading-relaxed font-light">
              Standard container dispatches leave factory within 7 to 10 days of order confirmation. Ample inventory buffer ensures continuous supply year-round.
            </p>
          </div>
        </div>

        {/* Container Loading Capacities */}
        <div className="rounded-3xl bg-[#0C1611] border border-gold/30 p-8 sm:p-10 shadow-2xl space-y-8 mb-20">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold font-semibold">
              CONTAINER CAPACITY GUIDE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream mt-1">
              FCL & LCL Loading Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {containerMetrics.map((c, i) => (
              <div key={i} className="glass-panel rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 className="font-serif text-lg font-bold text-cream">{c.type}</h4>
                  <Package className="w-5 h-5 text-gold" />
                </div>
                <div className="space-y-2 text-xs">
                  <p className="text-sage">
                    Estimated Quantity: <strong className="text-cream">{c.pieces}</strong>
                  </p>
                  <p className="text-sage">
                    Pallet Footprint: <strong className="text-cream">{c.pallets}</strong>
                  </p>
                  <p className="text-sage">
                    Ocean Transit Time: <strong className="text-sprout">{c.transitTime}</strong>
                  </p>
                </div>
                <p className="text-[11px] text-cream/60 pt-2 border-t border-white/10 italic">
                  {c.ideal}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Customs & Export Documentation Provided */}
        <div className="rounded-3xl bg-[#0C1611] border border-gold/30 p-8 sm:p-10 shadow-2xl space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold font-semibold">
              COMPLIANCE & CLEARANCE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream mt-1">
              Complete Export Documentation Suite
            </h2>
            <p className="text-xs text-cream/70 mt-1 max-w-xl">
              Every container is dispatched with full international customs dossiers to ensure zero demurrage and frictionless clearance at your destination port.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exportDocs.map((doc, idx) => (
              <div key={idx} className="glass-panel rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-gold">
                  <FileText className="w-4 h-4 shrink-0" />
                  <h4 className="font-serif text-sm font-bold text-cream">{doc.title}</h4>
                </div>
                <p className="text-xs text-cream/70 leading-relaxed font-light">
                  {doc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center py-16">
        <div className="rounded-3xl bg-[#0C1611] border border-gold/30 p-10 space-y-6 shadow-2xl">
          <h2 className="font-serif text-3xl sm:text-4xl text-cream font-normal">
            Request an FOB or CIF Rate Calculation
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 max-w-xl mx-auto">
            Provide your destination port and desired product mix. Our logistics team will return guaranteed freight estimates.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="btn-gold inline-flex items-center gap-2"
            >
              <span>Get Freight Quotation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
