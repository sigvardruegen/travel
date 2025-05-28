
// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css'; // Ensure this file exists or remove import

export const metadata: Metadata = {
  title: 'Travel App',
  description: 'Find unique places to stay!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
