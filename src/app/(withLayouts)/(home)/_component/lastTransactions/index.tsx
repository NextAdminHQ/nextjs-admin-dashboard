import {
  DownloadIcon,
  FilterIcon,
} from "@/app/(withLayouts)/(home)/_component/lastTransactions/icon";
import { transactionsTableData } from "@/app/(withLayouts)/(home)/_component/lastTransactions/transactionsTableData";
import { SearchIcon } from "@/components/common/header/icons";
import { Badge } from "@/components/tailgrids/core/badge";
import { Button } from "@/components/tailgrids/core/button";
import { Card } from "@/components/tailgrids/core/card";
import { Checkbox } from "@/components/tailgrids/core/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/tailgrids/core/input-group";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/tailgrids/core/table";
import { MenuDotsIcon } from "@/utils/icon";

export default function LastTransactions() {
  return (
    <Card>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-text-primary font-semibold leading-6">Last Transaction</p>
        <div className="flex items-center gap-1">
          <InputGroup className="h-9">
            <InputGroupAddon align="inline-start" className="text-icon-tertiary pr-0">
              <SearchIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search" className="pl-2 text-sm" />
          </InputGroup>
          <Button appearance="outline" className="w-8 h-8 p-1.5 text-icon-tertiary">
            <FilterIcon />
          </Button>
          <Button appearance="outline" className="w-8 h-8 p-1.5 text-icon-tertiary">
            <DownloadIcon />
          </Button>
        </div>
      </div>
      {/* table */}
      <div>
        <TableRoot className="min-w-[800px] w-full border-none rounded-none">
          <TableHeader>
            <TableRow className="[&_th]:border-t [&_th]:border-border-primary">
              <TableHead className="px-5 py-2.5 w-9">
                <div className="flex items-center justify-center">
                  <Checkbox />
                </div>
              </TableHead>
              <TableHead className="text-text-secondary leading-4 py-2.5 px-6 font-semibold text-xs">
                Order
              </TableHead>
              <TableHead className="text-text-secondary leading-4 py-2.5 px-6 font-semibold text-xs">
                Date
              </TableHead>
              <TableHead className="text-text-secondary leading-4 py-2.5 px-6 font-semibold text-xs">
                Customer
              </TableHead>
              <TableHead className="text-text-secondary leading-4 py-2.5 px-6 font-semibold text-xs">
                Amount
              </TableHead>
              <TableHead className="text-text-secondary leading-4 py-2.5 px-6 font-semibold text-xs">
                Status
              </TableHead>
              <TableHead className="py-2.5 px-6 text-text-secondary leading-4 font-semibold text-xs">
                <div className="flex items-center justify-center">Action</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionsTableData.map((tx) => (
              <TableRow key={tx.id} className="[&_td]:border-none">
                <TableCell className="px-2.5 py-4">
                  <div className="flex items-center justify-center">
                    <Checkbox />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-sm leading-5 text-text-primary px-6 py-3.5">
                  {tx.id}
                </TableCell>
                <TableCell className="text-sm leading-5 text-text-secondary px-6 py-3.5">
                  {tx.date} • {tx.time}
                </TableCell>
                <TableCell className="text-sm font-medium leading-5 px-6 py-3.5 text-text-primary">
                  {tx.customer}
                </TableCell>
                <TableCell className="text-sm font-medium leading-5 px-6 py-3.5 text-text-primary">
                  {tx.amount}
                </TableCell>
                <TableCell className="py-3.5 px-6">
                  <Badge color={tx.statusColor} size="sm">
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3.5 px-6">
                  <div className="flex items-center justify-center">
                    <Button
                      appearance="outline"
                      className="w-8 h-7.5 p-1.5 text-icon-secondary rounded-lg border-none shadow-xs"
                    >
                      <MenuDotsIcon />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </div>
    </Card>
  );
}
