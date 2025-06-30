import { memo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/UI/shadcn/chart";

const ChartDisplay = memo(
  ({ filteredData, vendorsToShow, chartConfig, vendorColors }) => (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[350px] w-full"
    >
      <AreaChart
        accessibilityLayer
        data={filteredData}
        margin={{
          left: 12,
          right: 12,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            const [year, month] = value.split("-");
            const date = new Date(year, parseInt(month) - 1);
            return date.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });
          }}
          style={{ fontSize: "12px", fill: "var(--foreground)" }}
        />
        <YAxis
          tickFormatter={(value) => `$${value / 1000}k`}
          style={{ fontSize: "12px", fill: "var(--foreground)" }}
        />
        <ChartTooltip
          cursor={{ stroke: "var(--muted)" }}
          content={
            <ChartTooltipContent
              className="w-[200px] bg-background"
              labelFormatter={(value) => {
                const [year, month] = value.split("-");
                const date = new Date(year, parseInt(month) - 1);
                return date.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                });
              }}
              formatter={(value, name, props) => {
                const color = vendorColors[name] || "hsl(var(--chart-1))";
                return (
                  <span style={{ color }}>
                    {name}: ${value.toLocaleString()}
                  </span>
                );
              }}
            />
          }
        />
        {vendorsToShow.map((vendor) => (
          <Area
            key={vendor}
            type="monotone"
            dataKey={vendor}
            stroke={vendorColors[vendor] || "hsl(var(--chart-1))"}
            fill={vendorColors[vendor] || "hsl(var(--chart-1))"}
            fillOpacity={0.2}
            name={vendor}
            activeDot={{ r: 6 }}
            stackId="1"
          />
        ))}
        <Legend wrapperStyle={{ paddingTop: 16 }} />
      </AreaChart>
    </ChartContainer>
  )
);

ChartDisplay.displayName = "ChartDisplay";

export default ChartDisplay;
