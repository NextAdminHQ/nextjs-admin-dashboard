import { Badge } from "@/components/tailgrids/core/badge";
import { Card } from "@/components/tailgrids/core/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/tailgrids/core/table";
import { packageData } from "./data";
import { DownloadIcon, EyeIcon, TrashBinIcon } from "./icons";

export default function PackageTable() {
  return (
    <Card>
      <TableRoot className="rounded-none border-none">
        <TableHeader className="bg-background-gray-secondary_alt">
          <TableRow className="[&_th]:border-t">
            <TableHead className="px-6 py-2 text-xs leading-4 font-semibold text-text-secondary">
              Package
            </TableHead>
            <TableHead className="px-6 py-2 text-xs leading-4 font-semibold text-text-secondary">
              Invoice Date
            </TableHead>
            <TableHead className="px-6 py-2 text-xs leading-4 font-semibold text-text-secondary">
              Status
            </TableHead>
            <TableHead className="w-34.25 px-6 py-2 text-xs leading-4 font-semibold text-text-secondary">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packageData.map((pkg, index) => (
            <TableRow key={index}>
              <TableCell className="px-6 py-3">
                <div>
                  <div className="text-sm font-medium whitespace-nowrap text-text-primary">
                    {pkg.name}
                  </div>
                  <div className="text-xs leading-4 font-normal text-text-tertiary">
                    {pkg.subName}
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-3 text-sm font-normal text-text-primary">
                {pkg.invoiceDate}
              </TableCell>
              <TableCell className="px-6 py-3">
                <Badge
                  color={
                    pkg.status === "Paid"
                      ? "success"
                      : pkg.status === "Unpaid"
                        ? "error"
                        : pkg.status === "Pending"
                          ? "warning"
                          : "primary"
                  }
                  className="px-2.5 text-sm"
                >
                  {pkg.status}
                </Badge>
              </TableCell>
              <TableCell className="px-6 py-3">
                <div className="flex items-center gap-3">
                  <button className="text-icon-tertiary transition-colors hover:text-brand-500">
                    <EyeIcon />
                  </button>
                  <button className="text-text-tertiary transition-colors hover:text-red-600">
                    <TrashBinIcon />
                  </button>
                  <button className="text-text-tertiary transition-colors hover:text-brand-500">
                    <DownloadIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Card>
  );
}
