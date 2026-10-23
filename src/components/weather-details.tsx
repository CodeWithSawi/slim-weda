import type { CurrentWeatherResponse } from "@/api/type";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WeatherDetailsProps {
  data: CurrentWeatherResponse;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;

  const getWindDirection = (degree: number) => {
    const DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;

    return DIRECTIONS[index];
  };

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const windDegree = wind.deg ?? 0;

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(windDegree)} (${windDegree})`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];
  return (
    <Card>
      <CardHeader className="px-3 pt-4 sm:px-6">
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-4 sm:px-6 sm:pb-6">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-6">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex min-w-0 items-center gap-3 rounded-lg border p-3 sm:p-4"
            >
              <detail.icon className={`h-5 w-5 shrink-0 ${detail.color}`} />
              <div className="min-w-0">
                <p className="text-sm font-medium leading-none">
                  {detail.title}
                </p>
                <p className="mt-1 text-sm break-words text-muted-foreground">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
