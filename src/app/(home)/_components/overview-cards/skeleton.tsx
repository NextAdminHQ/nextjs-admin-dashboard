import { Skeleton } from "@/components/ui/skeleton";

export function OverviewCardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
        >
          <Skeleton className="size-12 rounded-full" />

          <div className="mt-6 flex items-end justify-between">
            <div>
              <Skeleton className="mb-1.5 h-7 w-18" />

              <Skeleton className="h-5 w-20" />
            </div>

            <Skeleton className="h-5 w-15" />
          </div>
        </div>
      ))}
    </div>
  );
}
