import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import ModeSacreeToggle from "./ModeSacreeToggle";

interface LayoutProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

const Layout = ({
  title = "Les Pâtes Graphiques",
  description = "Communauté Discord héroïque et croustillante",
  children
}: LayoutProps) => (
  <div className="min-h-screen bg-[#05070f] text-white relative overflow-hidden">
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap"
        rel="stylesheet"
      />
    </Head>
    <div className="fixed inset-0 bg-pastaTexture opacity-[0.05] mix-blend-screen pointer-events-none" />
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1023] via-transparent to-[#010104]" />
      <div className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-knightGradient opacity-50 blur-3xl animate-float" />
      <div className="absolute -bottom-32 -right-24 w-[40rem] h-[40rem] bg-civilGradient opacity-50 blur-3xl animate-float" />
    </div>
    <Navbar />
    <ModeSacreeToggle />
    <main className="relative z-10">{children}</main>
  </div>
);

export default Layout;
