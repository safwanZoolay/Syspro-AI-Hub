import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SYSPRO AI Hub",
  description: "AI Agent Orchestration Platform - Powered by Claude Code Agents & n8n Workflows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
