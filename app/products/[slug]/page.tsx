import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { productsData, ProductItem } from '@/data/products';
import {
  ShieldCheck,
  Check,
  Layers,
  Thermometer,
  Recycle,
  Box,
  Truck,
  ArrowLeft,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

// Dynamically import PlateViewer
const PlateViewer = dynamic(
  () => import('@/components/three/PlateViewer').then((mod) => mod.PlateViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] rounded-3xl bg-[#0C1611]/80 border border-gold/20 flex flex-col items-center justify-center gap-3">
        <span className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
        <p className="text-xs uppercase tracking-widest text-gold font-mono">
          Loading 3D Product Mesh...
        </p>
      </div>
    ),
  }
);

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return productsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const product = productsData.find((p) => p.slug === params.slug);
  if (!product) return {};

  return {
    title: `${product.name} | 100% Natural Areca Palm Leaf Tableware`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images.hero }],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = productsData.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: `${siteConfig.url}${product.images.hero}`,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '0.08',
      highPrice: '0.35',
      offerCount: '1000000',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="pt-28 pb-24 bg-forest-night text-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-mono text-sage hover:text-gold transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>BACK TO FULL COLLECTION</span>
        </Link>

        {/* Top Product Hero: 3D Viewer & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
          {/* Left Column: Real-Time Procedural 3D Canvas (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <PlateViewer initialShape={product.shape} allowShapeSwitch={false} />
            <div className="flex items-center justify-between text-[11px] text-sage px-2 font-mono">
              <span>CONTROLS: LEFT-CLICK DRAG • SCROLL ZOOM</span>
              <span className="text-gold font-medium">REAL-TIME THREE.JS MESH</span>
            </div>
          </div>

          {/* Right Column: Product Narrative & Spec Overview (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F3A2B] border border-gold/30 text-[10px] uppercase tracking-widest text-gold font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-sprout" />
              {product.tag}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-cream leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-cream/80 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Dimensional Specifications */}
            <div className="p-5 rounded-2xl bg-[#0C1611]/90 border border-gold/20 space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                <span className="text-sage">Available Diameters:</span>
                <span className="text-cream font-medium text-right">
                  {product.sizes.join(' • ')}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                <span className="text-sage">Wall Depth / Rim:</span>
                <span className="text-cream font-medium">{product.depth}</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                <span className="text-sage">Thermal Tolerance:</span>
                <span className="text-sprout font-medium">{product.specs.heatResistance}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-sage">Soil Decomposition:</span>
                <span className="text-gold font-medium">{product.specs.compostDays}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/contact"
                className="w-full sm:w-auto flex-1 btn-gold text-center justify-center text-xs tracking-wider uppercase font-semibold"
              >
                <span>Request Container Pricing</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-medium border border-sprout/40 text-sprout bg-[#1F3A2B]/40 hover:bg-[#1F3A2B] transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Detailed B2B Packaging & Export Metrics */}
        <section className="pt-12 border-t border-white/10 space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold font-semibold">
              COMMERCIAL EXPORT DATA
            </span>
            <h2 className="font-serif text-3xl font-normal text-cream mt-1">
              Carton Packaging & Container Dispatches
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-panel rounded-2xl p-6 space-y-2">
              <Box className="w-6 h-6 text-gold mb-2" />
              <h4 className="font-serif text-base font-bold text-cream">Retail Packaging</h4>
              <p className="text-xs text-cream/70 leading-relaxed">
                {product.packQty}
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-6 space-y-2">
              <Truck className="w-6 h-6 text-sprout mb-2" />
              <h4 className="font-serif text-base font-bold text-cream">Container Capacity</h4>
              <p className="text-xs text-cream/70 leading-relaxed">
                {product.specs.palletCapacity}
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-6 space-y-2">
              <Thermometer className="w-6 h-6 text-gold mb-2" />
              <h4 className="font-serif text-base font-bold text-cream">Cold & Heat Limits</h4>
              <p className="text-xs text-cream/70 leading-relaxed">
                {product.specs.coldResistance} to {product.specs.heatResistance}
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-6 space-y-2">
              <Recycle className="w-6 h-6 text-sprout mb-2" />
              <h4 className="font-serif text-base font-bold text-cream">Home Composting</h4>
              <p className="text-xs text-cream/70 leading-relaxed">
                Leaves no toxic residue in garden soils or commercial municipal digesters.
              </p>
            </div>
          </div>

          {/* Key Engineering Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
            <div className="glass-panel rounded-3xl p-8 space-y-4">
              <h3 className="font-serif text-xl font-bold text-cream">
                Structural & Food Service Advantages
              </h3>
              <ul className="space-y-3 text-xs text-cream/80">
                {product.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-sprout shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel rounded-3xl p-8 space-y-4">
              <h3 className="font-serif text-xl font-bold text-cream">
                Recommended Service Scenarios
              </h3>
              <ul className="space-y-3 text-xs text-cream/80">
                {product.idealFor.map((scenario, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>{scenario}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
