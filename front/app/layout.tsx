import LayoutClient from './layoutClient';
import { Metadata } from 'next';
// import { ChildrenProps } from './types/children';
import './globals.css';
import { inter } from './theme/fonts';

export const metadata: Metadata = {
  title: 'HERMES',
  description: 'HERMES',
};

export default async function RootLayout({ children }: any) {
  return (
    <html lang={'es-AR'}>
      <body className={`${inter.className} antialiased`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}