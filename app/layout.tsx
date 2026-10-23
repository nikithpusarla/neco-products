import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { SmoothScroll } from '@/components/scroll/SmoothScroll';
import { siteConfig } from '@/data/siteConfig';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'areca leaf plates manufacturer India',
    'palm leaf plates exporter',
    'biodegradable plates wholesale',
    'eco-friendly disposable tableware',
    'areca palm leaf bowls',
    'compostable catering dinnerware',
    'private label palm leaf plates',
    'Tamil Nadu areca leaf factory',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/images/products/artisan-tableware.jpg',
        width: 1200,
        height: 896,
        alt: 'NECO PRODUCTS - 100% Natural Areca Palm Leaf Tableware',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/images/products/artisan-tableware.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/products/round-plate-hero.jpg`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.facility,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'sales & export',
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Tamil', 'Hindi'],
    },
    sameAs: ['https://wa.me/919840234567'],
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-forest-night text-cream antialiased selection:bg-gold selection:text-forest-night relative">
        <SmoothScroll>
          <GrainOverlay />
          <CustomCursor />
          <Navbar />
          <main className="min-h-screen relative">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
