"use client";

interface SegmentedGaugeProps {
  value: number; // 0-100
  size?: number;
  segments?: number;
  activeColor?: string;
  inactiveColor?: string;
  label?: string;
}

export default function SegmentedGauge({
  value,
  size = 320,
  segments = 36,
  activeColor = "#5B5BF7",
  inactiveColor = "#ECECF1",
  label = "Available",
}: SegmentedGaugeProps) {
  const strokeWidth = 10;
  const radius = size * 0.35;
  const centerX = size / 2;
  const centerY = size / 2;

  const activeSegments = Math.round((value / 100) * segments);

  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const radians = (angle * Math.PI) / 180;

    return {
      x: cx + r * Math.cos(radians),
      y: cy + r * Math.sin(radians),
    };
  };

  const createArc = (startAngle: number, endAngle: number, color: string, index: number) => {
    const start = polarToCartesian(centerX, centerY, radius, startAngle);

    const end = polarToCartesian(centerX, centerY, radius, endAngle);

    return (
      <path
        key={index}
        d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        fill="none"
      />
    );
  };

  const totalAngle = 180;
  const gap = 2.5;
  const segmentAngle = totalAngle / segments;

  const arcs = [];

  for (let i = 0; i < segments; i++) {
    const startAngle = 180 + i * segmentAngle + gap / 2;

    const endAngle = 180 + (i + 1) * segmentAngle - gap / 2;

    arcs.push(createArc(startAngle, endAngle, i < activeSegments ? activeColor : inactiveColor, i));
  }

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size / 2 + 40,
      }}
    >
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        {arcs}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
        <div className="text-3xl font-semibold text-gray-900">{value}%</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}
