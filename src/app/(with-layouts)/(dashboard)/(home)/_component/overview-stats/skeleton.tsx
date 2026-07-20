import { Card, CardContent, CardFooter, CardHeader } from "@/components/tailgrids/core/card";
import { Skeleton } from "@/components/tailgrids/core/skeleton";

export default function OverviewStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="size-8 rounded-lg" />
          </CardHeader>

          <CardContent className="mt-6 p-0">
            <Skeleton className="mb-1.25 h-7 w-24 rounded-full md:h-8 md:w-28" />
          </CardContent>

          <CardFooter className="flex items-center justify-between p-0">
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
