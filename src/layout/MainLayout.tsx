import Footer from "@/components/Footer";
import { type PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-linear-to-br from-background to-muted">
      header
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
