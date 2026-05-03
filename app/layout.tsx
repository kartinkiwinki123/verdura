import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: {
    default: 'Verdura - Duurzame Energie Voor Uw Thuis',
    template: '%s | Verdura',
  },
  description:
    'Verdura installeert zonnepanelen, thuisbatterijen, warmtepompen en laadpalen. Profiteer van gemeentelijke subsidies en maak uw woning toekomstbestendig.',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'VERDURA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}