import type { ForecastResponse } from "@/api/type";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Droplet, Wind } from "lucide-react";
import { ArrowDown, ArrowUp } from "lucide-react";

interface WeatherForecastProps {
  data: ForecastResponse;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyForecasts = data.list.reduce(
    (acc, forecast) => {
      const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

      if (!acc[date]) {
        acc[date] = {
          temp_min: forecast.main.temp_min,
          temp_max: forecast.main.temp_max,
          humidity: forecast.main.humidity,
          wind: forecast.wind.speed,
          weather: forecast.weather[0],
          date: forecast.dt,
        };
      } else {
        acc[date].temp_min = Math.min(
          acc[date].temp_min,
          forecast.main.temp_min,
        );
        acc[date].temp_max = Math.max(
          acc[date].temp_max,
          forecast.main.temp_max,
        );
      }

      return acc;
    },
    {} as Record<string, DailyForecast>,
  );

  // skip index 0 (today), take next 5
  const nextDays = Object.values(dailyForecasts).slice(1, 6);

  const formatTemp = (t: number) => `${Math.round(t)}°`;

  return (
    <Card>
      <CardHeader className="px-3 pt-4 pb-2 sm:px-4">
        <CardTitle className="text-base font-semibold">
          5-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-4 sm:px-4">
        <div className="space-y-2">
          {nextDays.map((day) => (
            <div
              key={day.date}
              className="grid grid-cols-1 gap-3 rounded-lg bg-muted/40 px-3 py-3 transition-colors hover:bg-muted/70 sm:grid-cols-[1fr_auto_1fr_1fr] sm:items-center sm:gap-4 sm:px-4"
            >
              {/* Day + description */}
              <div className="min-w-0">
                <p className="text-sm font-medium leading-none">
                  {format(new Date(day.date * 1000), "EEE, MMM d")}
                </p>
                <p className="mt-1 truncate text-xs capitalize text-muted-foreground">
                  {day.weather.description}
                </p>
              </div>

              {/* Weather icon */}
              <img
                src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                alt={day.weather.description}
                className="h-10 w-10 object-contain"
              />

              {/* Min / Max temp */}
              <div className="flex items-center gap-2 text-sm font-medium sm:justify-center">
                <span className="flex items-center gap-0.5 text-blue-400">
                  <ArrowDown className="h-3.5 w-3.5" />
                  {formatTemp(day.temp_min)}
                </span>
                <span className="flex items-center gap-0.5 text-rose-400">
                  <ArrowUp className="h-3.5 w-3.5" />
                  {formatTemp(day.temp_max)}
                </span>
              </div>

              {/* Humidity + Wind */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:justify-end">
                <span className="flex items-center gap-1">
                  <Droplet className="h-3.5 w-3.5 text-blue-400" />
                  {day.humidity}%
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="h-3.5 w-3.5 text-cyan-400" />
                  {day.wind.toFixed(1)} m/s
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
