import type {
  CurrentWeatherResponse,
  ReverseGeocodeLocation,
} from "@/api/type";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplet, Eye, Gauge, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: CurrentWeatherResponse;
  locationName?: ReverseGeocodeLocation;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    wind: { speed },
    visibility,
  } = data;

  const formatTemp = (t: number) => `${Math.round(t)}°`;

  const stats = [
    {
      icon: <Droplet className="h-4 w-4 text-blue-400" />,
      label: "Humidity",
      value: `${humidity}%`,
    },
    {
      icon: <Wind className="h-4 w-4 text-cyan-400" />,
      label: "Wind Speed",
      value: `${speed} m/s`,
    },
    {
      icon: <Gauge className="h-4 w-4 text-purple-400" />,
      label: "Pressure",
      value: `${pressure} hPa`,
    },
    {
      icon: <Eye className="h-4 w-4 text-yellow-400" />,
      label: "Visibility",
      value: `${((visibility ?? 0) / 1000).toFixed(1)} km`,
    },
  ];

  return (
    <Card className="overflow-hidden border-border/50 shadow-md">
      <CardContent className="p-4 sm:p-6">
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {" "}
          {/* Left column: location + temp + stats */}
          <div className="flex min-w-0 flex-col gap-4">
            {/* Location */}
            <div className="min-w-0">
              <h2 className="text-2xl font-bold tracking-tight leading-none break-words">
                {locationName?.name}
                {locationName?.state && (
                  <span className="font-normal text-muted-foreground">
                    , {locationName.state}
                  </span>
                )}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground break-words">
                {locationName?.country}
              </p>
            </div>

            {/* Temperature */}
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:gap-4">
              <p className="text-5xl font-extrabold tracking-tighter leading-none sm:text-7xl">
                {formatTemp(temp)}
              </p>
              <div className="space-y-1.5 text-sm font-medium">
                <p className="text-muted-foreground">
                  Feels like{" "}
                  <span className="text-foreground font-semibold">
                    {formatTemp(feels_like)}
                  </span>
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-0.5 text-blue-400">
                    <ArrowDown className="h-3.5 w-3.5" />
                    <span>{formatTemp(temp_min)}</span>
                  </span>
                  <span className="flex items-center gap-0.5 text-rose-400">
                    <ArrowUp className="h-3.5 w-3.5" />
                    <span>{formatTemp(temp_max)}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {stats.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5"
                >
                  {icon}
                  <div className="min-w-0">
                    <p className="mb-0.5 text-xs leading-none text-muted-foreground">
                      {label}
                    </p>
                    <p className="text-sm font-semibold leading-none break-words">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right column: weather icon + description */}
          <div className="flex min-w-0 flex-col items-center justify-center gap-3">
            <div className="relative flex h-28 w-28 items-center justify-center drop-shadow-lg sm:h-36 sm:w-36">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="text-center">
              <p className="text-base font-semibold capitalize tracking-wide sm:text-lg">
                {currentWeather.description}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">
                Current Conditions
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
