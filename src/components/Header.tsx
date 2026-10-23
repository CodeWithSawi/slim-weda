import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import CitySearch from "./city-search";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <div className="container mx-auto flex items-center justify-between gap-2 px-4 py-2">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3 min-h-[44px]"
          aria-label="WEDA by Slim home"
        >
          <img
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
            src="/weda-logo.png"
            alt=""
          />

          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight sm:text-xl">WEDA</span>
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground sm:text-xs">
              BY SAWI
            </span>
          </div>
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-4">
          <CitySearch />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
