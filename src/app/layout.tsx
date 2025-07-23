import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Header } from "@/components/Header"; // Add this import
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cultura Inglesa Teresina - Matrículas 2025 | Curso de Inglês",
  description:
    "Matrículas abertas para 2025! Aprenda inglês na Cultura Inglesa Teresina com professores certificados Cambridge. Cursos para todas as idades.",
  keywords:
    "curso de inglês, Teresina, Cultura Inglesa, Cambridge, matrículas 2025, aulas de inglês",
  authors: [{ name: "Cultura Inglesa Teresina" }],
  creator: "Cultura Inglesa Teresina",
  publisher: "Cultura Inglesa Teresina",
  openGraph: {
    title: "Cultura Inglesa Teresina - Matrículas 2025",
    description:
      "Aprenda inglês com a tradição e qualidade da Cultura Inglesa. Professores certificados Cambridge.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Cultura Inglesa Teresina",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cultura Inglesa Teresina - Matrículas 2025",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cultura Inglesa Teresina - Matrículas 2025",
    description:
      "Aprenda inglês com a tradição e qualidade da Cultura Inglesa.",
    images: ["/images/og-image.jpg"],
  },
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
  verification: {
    google: "your-google-verification-code",
  },
};

<meta name="apple-mobile-web-app-title" content="Cultura Inglesa" />;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* Schema.org markup for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Cultura Inglesa Teresina",
              image: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
              "@id": process.env.NEXT_PUBLIC_SITE_URL,
              url: process.env.NEXT_PUBLIC_SITE_URL,
              telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Sua Rua, 123",
                addressLocality: "Teresina",
                addressRegion: "PI",
                postalCode: "64000-000",
                addressCountry: "BR",
              },
              sameAs: [
                "https://www.facebook.com/culturainglesateresina",
                "https://www.instagram.com/culturainglesateresina",
              ],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "07:00",
                  closes: "21:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "08:00",
                  closes: "17:00",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Header variant="landing" />
        {children}

        {/* WhatsApp Floating Button */}
        <WhatsAppButton
          phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}
          variant="floating"
        />

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />

        {/* Google Analytics */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
