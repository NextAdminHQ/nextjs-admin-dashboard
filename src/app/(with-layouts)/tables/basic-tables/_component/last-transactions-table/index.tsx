"use client";

import { SearchIcon } from "@/components/common/header/icons";
import { Badge } from "@/components/tailgrids/core/badge";
import { Button } from "@/components/tailgrids/core/button";
import { Card, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
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
import { useState } from "react";
import { DownloadIcon, FilterIcon } from "./icon";
import { transactionsTableData } from "./transactions-table-data";

export default function LastTransactionsTable() {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(transactionsTableData.map((tx) => tx.id));
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleSelectTransaction = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedTransactions((prev) => [...prev, id]);
    } else {
      setSelectedTransactions((prev) => prev.filter((item) => item !== id));
    }
  };

  const isAllSelected =
    transactionsTableData.length > 0 &&
    selectedTransactions.length === transactionsTableData.length;

  return (
    <Card>
      {/* Header */}
      <CardHeader className="mb-6">
        <CardTitle>Last Transaction</CardTitle>
        <div className="flex items-center gap-1">
          <InputGroup className="h-9">
            <InputGroupAddon align="inline-start" className="pr-0 text-icon-tertiary">
              <SearchIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search" className="pl-2 text-sm" />
          </InputGroup>
          <Button appearance="outline" className="h-8 w-8 p-1.5 text-icon-tertiary">
            <FilterIcon />
          </Button>
          <Button appearance="outline" className="h-8 w-8 p-1.5 text-icon-tertiary">
            <DownloadIcon />
          </Button>
        </div>
      </CardHeader>
      {/* table */}
      <div>
        <TableRoot className="w-full min-w-200 rounded-none border-none">
          <TableHeader>
            <TableRow className="[&_th]:border-t">
              <TableHead className="w-9 px-5 py-2.5">
                <div className="flex items-center justify-center">
                  <Checkbox isSelected={isAllSelected} onChange={handleSelectAll} />
                </div>
              </TableHead>
              <TableHead className="px-6 py-2.5 text-xs leading-4 font-semibold text-text-secondary">
                Order
              </TableHead>
              <TableHead className="px-6 py-2.5 text-xs leading-4 font-semibold whitespace-nowrap text-text-secondary">
                Date
              </TableHead>
              <TableHead className="px-6 py-2.5 text-xs leading-4 font-semibold text-text-secondary">
                Customer
              </TableHead>
              <TableHead className="px-6 py-2.5 text-xs leading-4 font-semibold text-text-secondary">
                Amount
              </TableHead>
              <TableHead className="px-6 py-2.5 text-xs leading-4 font-semibold text-text-secondary">
                Status
              </TableHead>
              <TableHead className="px-6 py-2.5 text-xs leading-4 font-semibold text-text-secondary">
                <div className="flex items-center justify-center">Action</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionsTableData.map((tx) => (
              <TableRow key={tx.id} className="[&_td]:border-none">
                <TableCell className="px-2.5 py-4">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      isSelected={selectedTransactions.includes(tx.id)}
                      onChange={(checked) => handleSelectTransaction(tx.id, checked)}
                    />
                  </div>
                </TableCell>
                <TableCell className="px-6 py-3.5 text-sm leading-5 font-medium whitespace-nowrap text-text-primary">
                  {tx.id}
                </TableCell>
                <TableCell className="px-6 py-3.5 text-sm leading-5 whitespace-nowrap text-text-secondary">
                  {tx.date} • {tx.time}
                </TableCell>
                <TableCell className="px-6 py-3.5 text-sm leading-5 font-medium whitespace-nowrap text-text-primary">
                  {tx.customer}
                </TableCell>
                <TableCell className="px-6 py-3.5 text-sm leading-5 font-medium whitespace-nowrap text-text-primary">
                  {tx.amount}
                </TableCell>
                <TableCell className="px-6 py-3.5">
                  <Badge color={tx.statusColor} size="sm">
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-3.5">
                  <div className="flex items-center justify-center">
                    <Button
                      appearance="outline"
                      className="h-7.5 w-8 rounded-lg border-none p-1.5 text-icon-secondary shadow-xs"
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
