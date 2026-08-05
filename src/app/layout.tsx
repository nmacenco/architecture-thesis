import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tesis de Arquitectura",
  description: "Una tesis de arquitectura presentada como relato visual.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
