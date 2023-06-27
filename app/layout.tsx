import "./globals.css";
import { Fira_Mono } from "next/font/google";

const font = Fira_Mono({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Simple Blog App",
  description: "Simple Blog App created using nextjs and prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
