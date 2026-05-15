import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { SITE } from '@/lib/constants';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.shortName} · ${SITE.role}`,
    template: `%s · ${SITE.shortName}`,
  },
  description: SITE.pitch,
  keywords: [
    'Dipak Yadav',
    'Senior Software Engineer',
    'Platform Engineer',
    'Apache Kafka',
    'Kubernetes',
    'Observability',
    'Site Reliability Engineering',
    'Distributed Systems',
    'GitOps',
    'OpenTelemetry',
  ],
  authors: [{ name: SITE.shortName, url: SITE.url }],
  creator: SITE.shortName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    title: `${SITE.shortName} · ${SITE.role}`,
    description: SITE.pitch,
    siteName: SITE.shortName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.shortName} · ${SITE.role}`,
    description: SITE.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      {
        url:
          'data:image/svg+xml,' +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="%230B0D14"/><text x="50%" y="54%" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="28" font-weight="600" fill="%235BEAFF">DY</text></svg>`,
          ),
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#06070B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      style={
        {
          ['--font-sans' as string]: GeistSans.style.fontFamily,
          ['--font-mono' as string]: GeistMono.style.fontFamily,
        } as React.CSSProperties
      }
    >
      <body className="relative min-h-screen bg-bg font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
