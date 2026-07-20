import { Skeleton } from "@/components/tailgrids/core/skeleton";
import { TableCell, TableRow } from "@/components/tailgrids/core/table";

export function TransactionSkeletonRow() {
  return (
    <TableRow className="[&_td]:border-none">
      <TableCell className="px-2.5 py-4">
        <div className="flex items-center justify-center">
          <Skeleton className="size-4 rounded" />
        </div>
      </TableCell>
      <TableCell className="px-6 py-3.5">
        <Skeleton className="h-3.5 w-24" />
      </TableCell>
      <TableCell className="px-6 py-3.5">
        <Skeleton className="h-3.5 w-32" />
      </TableCell>
      <TableCell className="px-6 py-3.5">
        <Skeleton className="h-3.5 w-28" />
      </TableCell>
      <TableCell className="px-6 py-3.5">
        <Skeleton className="h-3.5 w-16" />
      </TableCell>
      <TableCell className="px-6 py-3.5">
        <Skeleton className="h-5 w-20 rounded-full" />
      </TableCell>
      <TableCell className="px-6 py-3.5">
        <div className="flex items-center justify-center">
          <Skeleton className="h-7.5 w-8 rounded-lg" />
        </div>
      </TableCell>
    </TableRow>
  );
}
