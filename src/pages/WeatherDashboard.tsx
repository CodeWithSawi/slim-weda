import CurrentWeather from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import { useGeolocation } from "@/hooks/use-geolocation";
import {
  useForecast,
  useReversegeocoding,
  useWeather,
} from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

export default function WeatherDashboard() {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  const locationQuery = useReversegeocoding(coordinates);
  const weatherQuery = useWeather(coordinates);
  const forecastQuery = useForecast(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      locationQuery.refetch();
      forecastQuery.refetch();
    }
  };

  if (locationLoading) return <WeatherSkeleton />;

  if (locationError)
    return (
      <div className="container mx-auto px-4 py-6 max-w-xl">
        <Alert
          variant="destructive"
          className="flex flex-col gap-3 sm:flex-row sm:items-start"
        >
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <div className="space-y-2 w-full">
            <AlertTitle className="text-base font-semibold">
              Location Error
            </AlertTitle>
            <AlertDescription className="space-y-3">
              <p className="text-sm leading-relaxed">{locationError}</p>
              <div>
                <Button
                  onClick={getLocation}
                  variant="outline"
                  size="sm"
                  className="gap-2 border-destructive/30 hover:bg-destructive/10"
                >
                  <MapPin className="h-4 w-4" />
                  Enable Location
                </Button>
              </div>
            </AlertDescription>
          </div>
        </Alert>
      </div>
    );

  if (!coordinates)
    return (
      <div className="container mx-auto px-4 py-6 max-w-xl">
        <Alert className="border-primary/20 bg-primary/5 text-foreground">
          <MapPin className="h-5 w-5 text-primary shrink-0" />
          <div className="space-y-2 w-full">
            <AlertTitle className="text-base font-semibold">
              Location Access Needed
            </AlertTitle>
            <AlertDescription className="space-y-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Please enable location access to see real-time weather details
                for your area.
              </p>
              <div>
                <Button
                  onClick={getLocation}
                  size="sm"
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <MapPin className="h-4 w-4" />
                  Enable Location
                </Button>
              </div>
            </AlertDescription>
          </div>
        </Alert>
      </div>
    );

  // Guard: data still loading after coordinates are available
  if (weatherQuery.isLoading || forecastQuery.isLoading)
    return <WeatherSkeleton />;

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
            <AlertDescription className="space-y-3">
              <p className="text-sm leading-relaxed">
                Failed to fetch weather data. Please try again.
              </p>
              <div>
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  size="sm"
                  className="gap-2 border-destructive/30 hover:bg-destructive/10"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry
                </Button>
              </div>
            </AlertDescription>
          </div>
        </Alert>
      </div>
    );

  const locationName = locationQuery.data?.[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location:</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${weatherQuery.isFetching || forecastQuery.isFetching ? "animate-spin" : ""}`}
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}
