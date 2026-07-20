import { Skeleton } from "@/components/tailgrids/core/skeleton";

export function SalesChartStatSkeleton() {
  return (
    <div className="min-w-0">
      <div className="mb-2 flex items-center gap-3">
        <Skeleton className="size-2.5 shrink-0 rounded-xs" />
        <Skeleton className="h-4 w-28 rounded-full" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-7 w-28 rounded-lg md:h-8 md:w-32" />
        <span className="flex items-center gap-1">
          <Skeleton className="h-4 w-12 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-full" />
        </span>
      </div>
    </div>
  );
}

export default function SalesChartSkeleton() {
  return (
    <div className="h-67.5 w-full border-b border-dashed border-border-secondary-alt p-0">
      <svg
        viewBox="0 0 1300 260"
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="b" x1={0} y1={0} x2={1} y2={0}>
            <stop offset="0%" stopColor="var(--color-gray-300)" stopOpacity={0.3} />
            <stop offset="50%" stopColor="var(--color-gray-500)" stopOpacity={0.7} />
            <stop offset="100%" stopColor="var(--color-gray-300)" stopOpacity={0.3} />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-1.3 0"
              to="1.3 0"
              dur="1.6s"
              repeatCount="indefinite"
            />
          </linearGradient>
          <linearGradient id="a" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="0%" stopColor="var(--color-gray-500)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-gray-700)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <g stroke="var(--color-gray-500)" opacity={0.5}>
          <path d="M0 10L1300 10" />
          <path d="M0 60L1300 60" />
          <path d="M0 110L1300 110" />
          <path d="M0 160L1300 160" />
          <path d="M0 210L1300 210" />
        </g>
        <path
          d="M0 210v-20c80-15 160-40 240-60 80-15 160-25 240-22 80 2 140 32 200 30s120-28 200-43c80-13 160-35 240-50 60-10 120-3 180 5v160z"
          fill="url(#a)"
        />
        <path
          d="M0 190c80-15 160-40 240-60 80-15 160-25 240-22 80 2 140 32 200 30s120-28 200-43c80-13 160-35 240-50 60-10 120-3 180 5"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.55}
        />
        <path
          d="M0 175c80-10 160-35 240-50 80-5 160 5 240 20 80 10 140-25 200-40 60-10 120-5 200-10s160-23 240-27c60-3 120 10 180 4"
          fill="none"
          stroke="url(#b)"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
