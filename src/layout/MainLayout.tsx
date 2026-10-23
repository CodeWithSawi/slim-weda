import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { type PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="overflow-x-clip bg-linear-to-br from-background to-muted">
      <Header />
      <main className="container mx-auto min-h-screen w-full overflow-x-hidden px-4 py-6 sm:py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
