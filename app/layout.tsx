import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ÁlemSaz — Learn Kazakh Instruments",
  description: "Learn dombra, qobyz and shankobyz through interactive lessons, quizzes and Kazakh musical culture."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}