import './strict.css';
import './global.css';

export const metadata = {
  title: 'Box Model UI',
  description: 'Box Model UI app built on React Strict DOM.',
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
