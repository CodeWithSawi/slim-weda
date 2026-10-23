import { useState } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Clock, Loader2, MapPin, Search, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/hooks/use-Search-history";
import { format } from "date-fns";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationSearch(query);
  const { history, clearHistory, addToHistory } = useSearchHistory();

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country, state] = cityData.split("|");

    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
      ...(state && { state }),
    });

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) setQuery("");
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="relative min-h-[44px] w-full min-w-0 shrink justify-start text-sm text-muted-foreground sm:min-w-[180px] sm:pr-12 md:w-40 lg:w-64"
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="truncate">Search cities...</span>
      </Button>

      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <Command>
          <CommandInput
            placeholder="Search cities..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {/* Empty state */}
            {query.length > 2 && !isLoading && !locations?.length && (
              <CommandEmpty>No cities found.</CommandEmpty>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="flex items-center justify-center p-6">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            )}

            {/* Recent searches */}
            {history.length > 0 && (
              <>
                <CommandGroup
                  heading={
                    <div className="flex items-center justify-between">
                      <span>Recent Searches</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto min-h-[44px] px-1 py-0.5 text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => clearHistory.mutate()}
                      >
                        <XCircle className="mr-1 h-3 w-3" />
                        Clear
                      </Button>
                    </div>
                  }
                >
                  {history.map((city) => (
                    <CommandItem
                      key={city.id}
                      value={`${city.lat}|${city.lon}|${city.name}|${city.country}|${city.state ?? ""}`}
                      onSelect={handleSelect}
                      className="flex items-center gap-2"
                    >
                      <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <div className="flex flex-1 items-center gap-1 overflow-hidden">
                        <span className="font-medium">{city.name}</span>
                        {city.state && (
                          <span className="truncate text-xs text-muted-foreground">
                            , {city.state}
                          </span>
                        )}
                        <span className="truncate text-xs text-muted-foreground">
                          , {city.country}
                        </span>
                      </div>
                      <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                        {format(new Date(city.searchedAt), "MMM d, h:mm a")}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {/* Search results */}
            {locations && locations.length > 0 && (
              <CommandGroup heading="Results">
                {locations.map((city) => (
                  <CommandItem
                    key={`${city.lat}-${city.lon}`}
                    value={`${city.lat}|${city.lon}|${city.name}|${city.country}|${city.state ?? ""}`}
                    onSelect={handleSelect}
                    className="flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="flex flex-1 items-center gap-1 overflow-hidden">
                      <span className="font-medium">{city.name}</span>
                      {city.state && (
                        <span className="truncate text-xs text-muted-foreground">
                          , {city.state}
                        </span>
                      )}
                      <span className="truncate text-xs text-muted-foreground">
                        , {city.country}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
