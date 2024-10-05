import type { Metadata } from 'next';
import './globals.css';
import { Manrope } from 'next/font/google';
import { cn } from '@/lib/utils';
import Footer from '@/components/ui/footer';

const font = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'React Wavesurfer - Shadcn UI',
  description: 'A audio player built with React Wavesurfer and ShadcnUI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(font.className, 'antialiased')}>
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
