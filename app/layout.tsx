import "./globals.css";
import { Metadata } from "next";

// =============================================
// SEO METADATA - DEVolution CMS
// =============================================
export const metadata: Metadata = {
  metadataBase: new URL("https://devsolution.id"),
  title: {
    default: "DevSolution - Jasa Pembuatan Aplikasi Web, Mobile & Panel Admin",
    template: "%s | DevSolution",
  },
  description:
    "DevSolution - Layanan profesional pembuatan aplikasi web, mobile app (Flutter), dan panel admin. 100+ project selesai, garansi revisi 2x, respon cepat 1x24 jam. Trusted Since 2020.",
  keywords: [
    "jasa pembuatan aplikasi",
    "pembuatan website",
    "web application",
    "mobile app",
    "Flutter development",
    "panel admin",
    "dashboard",
    "React Next.js",
    "Laravel development",
    "jasa digital",
    "software house Indonesia",
    "pembuatan aplikasi Android iOS",
  ],
  authors: [{ name: "DevSolution" }],
  creator: "DevSolution",
  publisher: "DevSolution",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://devsolution.id",
    siteName: "DevSolution",
    title: "DevSolution - Jasa Pembuatan Aplikasi Web, Mobile & Panel Admin",
    description:
      "Layanan profesional pembuatan aplikasi web, mobile app (Flutter), dan panel admin. 100+ project selesai, garansi revisi 2x.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevSolution - Jasa Pembuatan Aplikasi",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "DevSolution - Jasa Pembuatan Aplikasi Web & Mobile",
    description:
      "Layanan profesional pembuatan aplikasi web, mobile app (Flutter), dan panel admin. Trusted Since 2020.",
    images: ["/og-image.png"],
    creator: "@devsolution",
  },

  // robots.txt
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Alternates
  alternates: {
    canonical: "https://devsolution.id",
    languages: {
      "id-ID": "https://devsolution.id",
    },
  },

  // Category
  category: "Technology",
};

// =============================================
// JSON-LD STRUCTURED DATA
// =============================================
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization
    {
      "@type": "Organization",
      "@id": "https://devsolution.id/#organization",
      name: "DevSolution",
      url: "https://devsolution.id",
      logo: {
        "@type": "ImageObject",
        url: "https://devsolution.id/logo.png",
      },
      sameAs: [
        "https://facebook.com/devsolution",
        "https://instagram.com/devsolution",
        "https://twitter.com/devsolution",
        "https://linkedin.com/company/devsolution",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+6289514465439",
        contactType: "customer service",
        availableLanguage: ["Indonesian", "English"],
        areaServed: "ID",
      },
    },
    // LocalBusiness
    {
      "@type": "LocalBusiness",
      "@id": "https://devsolution.id/#localbusiness",
      name: "DevSolution - Jasa Pembuatan Aplikasi",
      description:
        "Layanan profesional pembuatan aplikasi web, mobile app, dan panel admin di Indonesia.",
      url: "https://devsolution.id",
      telephone: "+6289514465439",
      email: "hello@devsolution.id",
      address: {
        "@type": "PostalAddress",
        addressCountry: "ID",
        addressRegion: "Indonesia",
      },
      geo: {
        "@type": "GeoCoordinates",
        //Optional: latitude: -6.2088, longitude: 106.8456,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "17:00",
      },
      priceRange: "$$",
      serviceType: [
        "Jasa Pembuatan Aplikasi Web",
        "Mobile App Development",
        "Panel Admin Dashboard",
        "Flutter Development",
      ],
    },
    // WebSite
    {
      "@type": "WebSite",
      "@id": "https://devsolution.id/#website",
      url: "https://devsolution.id",
      name: "DevSolution",
      publisher: { "@id": "https://devsolution.id/#organization" },
      inLanguage: "id-ID",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://devsolution.id/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    // Service
    {
      "@type": "Service",
      "@id": "https://devsolution.id/#service",
      name: "Jasa Pembuatan Aplikasi Web & Mobile",
      description:
        "Layanan profesional development aplikasi web, mobile (Flutter/Android/iOS), dan panel admin dengan teknologi terkini.",
      provider: { "@id": "https://devsolution.id/#organization" },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Layanan Pengembangan Software",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Application Development",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mobile App Development (Flutter)",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Admin Panel / Dashboard",
            },
          },
        ],
      },
    },
    // FAQ
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Berapa lama proses pembuatan aplikasi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tergantung kompleksitas project. Aplikasi sederhana 2-4 minggu, aplikasi menengah 1-2 bulan, dan aplikasi kompleks 2-4 bulan.",
          },
        },
        {
          "@type": "Question",
          name: "Apakah ada garansi jika ada bug/error?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ya! Kami memberikan garansi revisi 2x untuk setiap project dan 1 bulan maintenance gratis setelah launching.",
          },
        },
        {
          "@type": "Question",
          name: "Bagaimana sistem pembayaran?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sistem pembayaran bertahap: 30% DP, 40% setelah desain disetujui, 30% saat project selesai.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Preconnect untuk performa */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* Google Fonts - Inter */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
