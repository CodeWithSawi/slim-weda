import CurrentWeather from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import { useForecast, useWeather } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

export default function City() {
  const [searchParams] = useSearchParams();
  const { city: cityName } = useParams<{ city: string }>();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeather(coordinates);
  const forecastQuery = useForecast(coordinates);

  // Guard: invalid route
  if (!cityName)
    return (
      <div className="container mx-auto px-4 py-6 max-w-xl">
        <Alert variant="destructive">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Invalid City</AlertTitle>
          <AlertDescription>No city name provided in the URL.</AlertDescription>
        </Alert>
      </div>
    );

  // Guard: loading
  if (weatherQuery.isLoading || forecastQuery.isLoading)
    return <WeatherSkeleton />;

  // Guard: error
  if (weatherQuery.error || forecastQuery.error)
    return (
      <div className="container mx-auto px-4 py-6 max-w-xl">
        <Alert
          variant="destructive"
          className="flex flex-col gap-3 sm:flex-row sm:items-start"
        >
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <div className="space-y-2 w-full">
            <AlertTitle className="text-base font-semibold">Error</AlertTitle>
            <AlertDescription>
              Failed to load weather data for{" "}
              <span className="font-semibold">{cityName}</span>. Please try
              again.
            </AlertDescription>
          </div>
        </Alert>
      </div>
    );

  // Guard: no data (shouldn't happen after loading, but satisfies TS)
  if (!weatherQuery.data || !forecastQuery.data) return <WeatherSkeleton />;

  return (
    <div className="space-y-6 overflow-x-hidden">
      {/* Page heading */}
      <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
        <h1 className="text-2xl font-bold tracking-tight break-words">{cityName}</h1>
        <span className="text-sm text-muted-foreground break-all">
          {searchParams.get("lat")}°N, {searchParams.get("lon")}°E
        </span>
      </div>

      {/* Row 1: Current weather full width */}
      <CurrentWeather data={weatherQuery.data} />

      {/* Row 2: Hourly chart + weather details side by side */}
      <div className="grid gap-6 md:grid-cols-2">
        <HourlyTemperature data={forecastQuery.data} />
        <WeatherDetails data={weatherQuery.data} />
      </div>

      {/* Row 3: 5-day forecast full width */}
      <WeatherForecast data={forecastQuery.data} />
    </div>
  );
}
