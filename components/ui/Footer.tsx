import Link from 'next/link';
import Image from 'next/image';
import { Leaf, ShieldCheck, Award, Recycle, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0C1611] text-cream border-t border-gold/15 relative overflow-hidden">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-block group">
              <div className="h-12 px-3 py-1.5 rounded-xl bg-cream/95 inline-flex items-center justify-center border border-gold/40 shadow-sm transition-transform group-hover:scale-105 mb-2">
                <Image
                  src="/images/logo-trimmed.png"
                  alt="NECO PRODUCTS"
                  width={140}
                  height={48}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-sm text-cream/70 max-w-sm leading-relaxed">
              Crafting circular organic tableware from naturally shed areca palm tree leaves. Sustainable, backyard compostable, and certified food safe with zero chemicals.
            </p>

            {/* Certifications Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#1F3A2B]/80 text-sprout border border-sprout/30">
                <Recycle className="w-3 h-3 text-sprout" />
                100% Bio-Based
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#1F3A2B]/80 text-gold border border-gold/30">
                <ShieldCheck className="w-3 h-3 text-gold" />
                USDA BioPreferred
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#1F3A2B]/80 text-cream border border-cream/20">
                <Award className="w-3 h-3 text-cream" />
                ISO 22000 Certified
              </span>
            </div>
          </div>

          {/* Workshop & Contact Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-gold font-semibold">
              Headquarters & Workshop
            </h4>
            <div className="space-y-3 text-xs text-cream/80 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <p>
                  {siteConfig.address.facility}, {siteConfig.address.postalCode}, {siteConfig.address.country}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={`mailto:${siteConfig.emails.sales}`}
                  className="hover:text-gold transition-colors"
                >
                  {siteConfig.emails.sales}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="hover:text-gold transition-colors font-medium text-cream"
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-gold shrink-0" />
                <span>Global Exports: North America, EU, Middle East, APAC</span>
              </div>
            </div>
          </div>

          {/* Quick Links Col (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-gold font-semibold">
              Explore Our World
            </h4>
            <ul className="space-y-2.5 text-xs text-cream/70">
              <li>
                <Link href="/story" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <span className="text-gold/40 text-[10px]">›</span> Our Botanical Heritage
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <span className="text-gold/40 text-[10px]">›</span> Palm Leaf Tableware Collection
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <span className="text-gold/40 text-[10px]">›</span> Hydraulic Steam Craft
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <span className="text-gold/40 text-[10px]">›</span> Circular Soil Life Cycle
                </Link>
              </li>
              <li>
                <Link href="/export" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <span className="text-gold/40 text-[10px]">›</span> Global Wholesale & Export
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <span className="text-gold/40 text-[10px]">›</span> Request Sample Kit & Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-cream/50">
          <p>© 2026 NECO PRODUCTS (A Living Earth Zero Concept) • All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-cream/80 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-cream/80 cursor-pointer">Terms of Sourcing</span>
            <span className="hover:text-cream/80 cursor-pointer">Export Compliance (FOB / CIF)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
