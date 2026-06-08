import {
  DownloadIcon,
  EyeIcon,
  TrashBinIcon,
} from "@/app/(withLayouts)/tables/_component/packageTable/icons";
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

export default function PackageTable() {
  return (
    <Card>
      <TableRoot className="border-none rounded-none">
        <TableHeader className="bg-background-gray-secondary_alt">
          <TableRow className="[&_th]:border-t">
            <TableHead className="text-text-secondary font-semibold text-xs leading-4 px-6 py-2">
              Package
            </TableHead>
            <TableHead className="text-text-secondary font-semibold text-xs leading-4 px-6 py-2">
              Invoice Date
            </TableHead>
            <TableHead className="text-text-secondary font-semibold text-xs leading-4 px-6 py-2">
              Status
            </TableHead>
            <TableHead className="w-[137px] text-text-secondary font-semibold text-xs leading-4 px-6 py-2">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packageData.map((pkg, index) => (
            <TableRow key={index}>
              <TableCell className="px-6 py-3">
                <div>
                  <div className="font-medium text-text-primary text-sm whitespace-nowrap">
                    {pkg.name}
                  </div>
                  <div className="text-text-tertiary leading-4 text-xs font-normal">
                    {pkg.subName}
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-3 text-text-primary text-sm font-normal">
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
                  <button className="text-icon-tertiary hover:text-brand-500 transition-colors">
                    <EyeIcon />
                  </button>
                  <button className="text-text-tertiary hover:text-red-600 transition-colors">
                    <TrashBinIcon />
                  </button>
                  <button className="text-text-tertiary hover:text-brand-500 transition-colors">
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
