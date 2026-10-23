import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>
            © {currentYear}{" "}
            <span className="font-semibold text-foreground">WEDA</span>
            <span> by Slim</span>. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart
              className="h-3.5 w-3.5 fill-red-500 text-red-500"
              aria-label="love"
            />
            <span>
              <a
                href="https://www.instagram.com/slim.sawi?rpxt=Y3JnMmUzYTcwNnB4&utm_source=qr"
                target="blank"
              >
                by Momoh Sawi
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
