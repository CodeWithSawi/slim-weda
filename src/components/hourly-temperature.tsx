import type { ForecastResponse } from "@/api/type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

interface HourlyTemperatureProps {
  data: ForecastResponse;
}

const CHART_COLORS = {
  temp: "#3b82f6", // blue-500
  feels_like: "#a78bfa", // violet-400
  axis: "#6b7280", // gray-500
};

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card className="flex-1 overflow-hidden">
      <CardHeader className="px-3 pt-4 pb-2 sm:px-4">
        <CardTitle className="text-base font-semibold">
          Today's Temperature
        </CardTitle>
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 pt-1 sm:gap-4">
          <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground sm:text-xs">
            <span
              className="inline-block h-0.5 w-4 rounded-full"
              style={{ backgroundColor: CHART_COLORS.temp }}
            />
            Temperature
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground sm:text-xs">
            <span
              className="inline-block h-0.5 w-4 rounded-full opacity-70"
              style={{
                backgroundColor: CHART_COLORS.feels_like,
                borderTop: "2px dashed",
              }}
            />
            Feels Like
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-3 pb-3 pt-0 sm:px-4">
        <div className="h-40 w-full overflow-hidden sm:h-35">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 4, right: 8, left: -12, bottom: 0 }}
            >
              <XAxis
                dataKey="time"
                stroke={CHART_COLORS.axis}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={12}
                stroke={CHART_COLORS.axis}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}°`}
              />
              <Tooltip
                cursor={{
                  stroke: "#6b7280",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-md text-xs space-y-1">
                      <p className="font-medium text-foreground mb-1.5">
                        {payload[0]?.payload?.time}
                      </p>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">
                          Temperature
                        </span>
                        <span
                          className="font-semibold"
                          style={{ color: CHART_COLORS.temp }}
                        >
                          {payload[0]?.value}°
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">
                          Feels Like
                        </span>
                        <span
                          className="font-semibold"
                          style={{ color: CHART_COLORS.feels_like }}
                        >
                          {payload[1]?.value}°
                        </span>
                      </div>
                    </div>
                  );
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke={CHART_COLORS.temp}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke={CHART_COLORS.feels_like}
                strokeWidth={2}
                dot={false}
                strokeDasharray="4 4"
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;
