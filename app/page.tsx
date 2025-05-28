import dynamic from 'next/dynamic';

const CatalogPage = dynamic(() => import('./CatalogPage'), { ssr: false });

export default function Page() {
  return <CatalogPage />;
}