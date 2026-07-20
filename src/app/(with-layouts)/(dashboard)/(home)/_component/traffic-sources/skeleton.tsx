import { Card, CardContent, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
import { Skeleton } from "@/components/tailgrids/core/skeleton";
import { MenuDotsIcon } from "@/utils/icon";

export default function TrafficSourcesSkeleton() {
  return (
    <Card>
      {/* Header */}
      <CardHeader className="mb-6">
        <CardTitle className="leading-6 font-semibold text-text-primary">Traffic Sources</CardTitle>

        <button className="rounded-lg bg-button-primary-outline-background p-1.5 transition-colors hover:bg-button-primary-outline-hover-background">
          <MenuDotsIcon />
        </button>
      </CardHeader>

      {/* Traffic chart */}
      <CardContent className="flex flex-col p-0">
        <div className="mb-3.5 flex items-center justify-between">
          <span className="block text-sm leading-5 font-medium text-text-tertiary">Source</span>
          <span className="block text-sm leading-5 font-medium text-text-tertiary">Impression</span>
        </div>

        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex h-8 max-w-[90%] flex-1 items-center">
                <Skeleton
                  className="h-full rounded"
                  style={{ width: `${100 - index * 10}%` }}
                />
              </div>
              <Skeleton className="h-4 w-10 rounded" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
