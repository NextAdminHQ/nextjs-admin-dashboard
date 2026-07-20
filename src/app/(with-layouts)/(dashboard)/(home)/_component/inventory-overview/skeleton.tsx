import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/tailgrids/core/card";
import { Skeleton } from "@/components/tailgrids/core/skeleton";
import { MenuDotsIcon } from "@/utils/icon";

export default function InventoryOverviewSkeleton() {
  return (
    <Card className="flex flex-col p-2 pt-5">
      <CardHeader className="mb-6 px-3">
        <CardTitle className="leading-6 font-semibold text-text-primary">
          Inventory Overview
        </CardTitle>
        <button className="rounded-lg bg-button-primary-outline-background p-1.5 transition-colors hover:bg-button-primary-outline-hover-background">
          <MenuDotsIcon />
        </button>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between p-0 lg:mt-10">
        <Skeleton className="relative mx-auto h-42.25 w-1/2 rounded-t-full rounded-b-none">
          <div className="absolute inset-x-1/2 bottom-4 flex -translate-x-1/2 flex-col items-center">
            <Skeleton className="mb-1 h-6 w-12 rounded-full" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
        </Skeleton>
      </CardContent>

      <CardFooter className="mt-5 grid grid-cols-3 divide-x divide-gray-200 rounded-[9px] bg-background-gray-secondary_alt px-11 py-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center pt-3">
            <Skeleton className="mb-2 h-4 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
