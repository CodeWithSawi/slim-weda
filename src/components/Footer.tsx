import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" w-full border-t border-border/40 backdrop-blur  supports-backdrop-filter:bg-background/95">
      <div className="container mx-auto px-4 py-6 text-center sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {currentYear}{" "}
            <span className="font-medium text-foreground">SlimWɛda</span>. Built
            by{" "}
            <a
              href="https://github.com/CodeWithSawi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Momoh Sawi
            </a>
            . All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
            <span>in Sierra Leone 🇸🇱</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
