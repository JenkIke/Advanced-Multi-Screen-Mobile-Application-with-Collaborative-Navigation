import { useState } from "react";
import { View, type LayoutChangeEvent } from "react-native";
import Svg, { Circle, Polyline } from "react-native-svg";

import { useAppTheme } from "@/context/ThemeContext";
import type { SeriesPoint } from "@/types";

interface SparklineProps {
  data: SeriesPoint[];
  color: string;
  height?: number;
  /** Draws a wide translucent band under the line, like the Expenditure card. */
  showBand?: boolean;
  dotRadius?: number;
}

/**
 * Small line chart with hollow point markers. Width comes from layout so the
 * same component fits a half-width insight tile and a full-width detail page.
 */
export function Sparkline({
  data,
  color,
  height = 48,
  showBand = false,
  dotRadius = 5,
}: SparklineProps) {
  const { colors } = useAppTheme();
  const [width, setWidth] = useState(0);

  function handleLayout(event: LayoutChangeEvent) {
    setWidth(event.nativeEvent.layout.width);
  }

  const values = data.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const padding = dotRadius + 2;
  const stepX = data.length > 1 ? (width - padding * 2) / (data.length - 1) : 0;

  // Index is only used for the x position here, never as a React key.
  const points = data.map((point, index) => ({
    id: point.id,
    x: padding + index * stepX,
    y: padding + (1 - (point.value - min) / range) * (height - padding * 2),
  }));
  const pointString = points.map(({ x, y }) => `${x},${y}`).join(" ");

  return (
    <View style={{ height }} onLayout={handleLayout}>
      {width > 0 && (
        <Svg width={width} height={height}>
          {showBand && (
            <Polyline
              points={pointString}
              fill="none"
              stroke={color}
              strokeOpacity={0.35}
              strokeWidth={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          <Polyline
            points={pointString}
            fill="none"
            stroke={color}
            strokeWidth={2.5}
            strokeLinejoin="round"
          />
          {points.map(({ id, x, y }) => (
            <Circle
              key={id}
              cx={x}
              cy={y}
              r={dotRadius}
              fill={colors.card}
              stroke={color}
              strokeWidth={2.5}
            />
          ))}
        </Svg>
      )}
    </View>
  );
}
