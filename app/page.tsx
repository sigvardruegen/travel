'use client';
import dynamic from 'next/dynamic';

const CatalogPage = dynamic(() => import('./page/CatalogPage'), { ssr: false });

export default function Page() {
  return <CatalogPage />;
}
