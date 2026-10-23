'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const WhatsAppButton: React.FC = () => {
  return (
    <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-6 right-6 z-40 group">
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with NECO Export Coordinator on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#1F3A2B] border-2 border-sprout/60 text-sprout flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#284c38] hover:border-sprout hover:shadow-glow-leaf active:scale-95 group relative"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-sprout animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-sprout" />
      </a>
      {/* Tooltip on hover */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 hidden sm:block">
        <div className="bg-[#0C1611]/90 backdrop-blur-md text-cream text-xs py-1.5 px-3 rounded-lg border border-sprout/30 whitespace-nowrap shadow-xl">
          <p className="font-medium text-sprout">Instant Export Enquiry</p>
          <p className="text-[10px] text-cream/70">Chat on WhatsApp</p>
        </div>
      </div>
    </aside>
  );
};
