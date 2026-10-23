'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Leaf } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide on scroll down, show on scroll up (with a threshold)
      if (currentScrollY > 150 && currentScrollY > lastScrollY + 10) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY - 10 || currentScrollY <= 80) {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      } ${scrolled ? 'py-3' : 'py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-[#13201A]/85 backdrop-blur-md border border-gold/25 shadow-luxury'
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Official Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 px-2.5 py-1 rounded-xl bg-cream/95 flex items-center justify-center border border-gold/40 shadow-sm transition-transform group-hover:scale-105">
              <Image
                src="/images/logo-trimmed.png"
                alt="NECO PRODUCTS"
                width={120}
                height={40}
                className="h-7 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-[#13201A]/60 p-1.5 rounded-full border border-gold/15">
            {siteConfig.navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'bg-[#1F3A2B] text-gold shadow-sm border border-gold/30'
                      : 'text-cream/80 hover:text-cream hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action: Request Catalog / Quote */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold hover:bg-gold-light text-[#13201A] transition-all duration-300 shadow-glow-gold flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <span>Request Catalog</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/contact"
              className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-gold text-[#13201A]"
            >
              Catalog
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-cream/90 hover:text-gold bg-[#1F3A2B]/70 border border-gold/20"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 bg-[#13201A]/95 backdrop-blur-2xl border border-gold/30 rounded-2xl p-6 shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-3">
            {siteConfig.navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-colors ${
                  pathname === item.href
                    ? 'bg-[#1F3A2B] text-gold border border-gold/30'
                    : 'text-cream/90 hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl text-center text-xs font-semibold tracking-wider uppercase bg-gold text-[#13201A] flex items-center justify-center gap-2"
              >
                <span>Request B2B Wholesale Pricing</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl text-center text-xs font-medium text-sprout border border-sprout/30 bg-[#1F3A2B]/40 hover:bg-[#1F3A2B]"
              >
                Direct WhatsApp Coordinator
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
