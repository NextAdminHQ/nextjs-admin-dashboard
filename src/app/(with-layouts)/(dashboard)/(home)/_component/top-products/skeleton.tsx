import { Card, CardContent, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
import { Skeleton } from "@/components/tailgrids/core/skeleton";
import { MenuDotsIcon } from "@/utils/icon";

export default function TopProductsSkeleton() {
  return (
    <Card>
      {/* Header */}
      <CardHeader className="mb-6">
        <CardTitle>Top Product</CardTitle>
        <button className="rounded-lg bg-button-primary-outline-background p-1.5 transition-colors hover:bg-button-primary-outline-hover-background">
          <MenuDotsIcon />
        </button>
      </CardHeader>
      {/* Product list */}
      <CardContent className="flex flex-col p-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-border-primary py-3 first:pt-0 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div>
                <Skeleton className="mb-1.5 h-4 w-28 rounded-full" />
                <Skeleton className="h-3 w-20 rounded-full" />
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Skeleton className="mb-1.5 h-4 w-14 rounded-full" />
              <Skeleton className="h-3 w-10 rounded-full" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
