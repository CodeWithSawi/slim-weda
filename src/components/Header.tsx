import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import CitySearch from "./city-search";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="WEDA by Slim home"
        >
          <img
            className="h-12 w-12 object-contain"
            src="/weda-logo.png"
            alt=""
          />

          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">WEDA</span>
            <span className="text-xs font-medium tracking-wider text-muted-foreground">
              BY SAWI
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <CitySearch />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
