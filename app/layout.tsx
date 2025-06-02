import '../styles/globals.css'; // если у тебя структура styles/

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="h-screen">{children}</body>
    </html>
  );
}
