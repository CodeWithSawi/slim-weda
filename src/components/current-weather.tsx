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
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {" "}
          {/* Left column: location + temp + stats */}
          <div className="flex flex-col gap-4">
            {/* Location */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight leading-none">
                {locationName?.name}
                {locationName?.state && (
                  <span className="font-normal text-muted-foreground">
                    , {locationName.state}
                  </span>
                )}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {locationName?.country}
              </p>
            </div>

            {/* Temperature */}
            <div className="flex items-end gap-4">
              <p className="text-7xl font-extrabold tracking-tighter leading-none">
                {formatTemp(temp)}
              </p>
              <div className="mb-1 space-y-1.5 text-sm font-medium">
                <p className="text-muted-foreground">
                  Feels like{" "}
                  <span className="text-foreground font-semibold">
                    {formatTemp(feels_like)}
                  </span>
                </p>
                <div className="flex items-center gap-3">
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
            <div className="grid grid-cols-2 gap-3">
              {stats.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5"
                >
                  {icon}
                  <div>
                    <p className="text-xs text-muted-foreground leading-none mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm font-semibold leading-none">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right column: weather icon + description */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="relative flex h-36 w-36 items-center justify-center drop-shadow-lg">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold capitalize tracking-wide">
                {currentWeather.description}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground uppercase tracking-widest">
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
