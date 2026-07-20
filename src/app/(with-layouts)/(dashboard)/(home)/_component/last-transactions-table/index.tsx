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
import { getLastTransactionsData } from "@/services/api/home";
import { MenuDotsIcon } from "@/utils/icon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SKELETON_ROW_COUNT, STATUS_COLOR_MAP } from "./data";
import { DownloadIcon, FilterIcon } from "./icon";
import { TransactionSkeletonRow } from "./skeleton";
import type { RawTransactionItem } from "@/services/api/home";

import type { TransactionViewModel } from "./types";
import { formatAmount, formatDate } from "./utils";

function toViewModel(raw: RawTransactionItem): TransactionViewModel {
  const { date, time } = formatDate(raw.created_at);
  const statusKey = raw.status.toLowerCase();
  return {
    id: raw.id,
    orderId: raw.order_number,
    date,
    time,
    customer: raw.customer.full_name,
    amount: formatAmount(raw.amount.value, raw.amount.currency_code),
    status: raw.status.charAt(0).toUpperCase() + raw.status.slice(1),
    statusColor: STATUS_COLOR_MAP[statusKey] ?? "gray",
  };
}

export default function LastTransactionsTable() {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);

  const { data: rawResponse, isLoading } = useQuery({
    queryKey: ["lastTransactions"],
    queryFn: getLastTransactionsData,
  });

  const transactions: TransactionViewModel[] = rawResponse?.data.map(toViewModel) ?? [];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(transactions.map((tx) => tx.id));
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
    transactions.length > 0 && selectedTransactions.length === transactions.length;

  return (
    <Card>
      {/* Header */}
      <CardHeader className="mb-6">
        <CardTitle>Last Transaction</CardTitle>

        <div className="flex items-center gap-1.5">
          <InputGroup className="py-1.5">
            <InputGroupAddon align="inline-start" className="pr-0 text-icon-tertiary">
              <SearchIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search" className="py-0 pl-2 text-sm" />
          </InputGroup>

          <Button appearance="outline" className="h-8 w-8 p-1.5 text-icon-tertiary">
            <FilterIcon />
          </Button>
          <Button appearance="outline" className="h-8 w-8 p-1.5 text-icon-tertiary">
            <DownloadIcon />
          </Button>
        </div>
      </CardHeader>

      {/* Table */}
      <div>
        <TableRoot className="w-full min-w-200 rounded-none border-none">
          <TableHeader>
            <TableRow className="[&_th]:border-t">
              <TableHead className="w-9 px-5 py-2.5">
                <div className="flex items-center justify-center">
                  <Checkbox
                    isSelected={isAllSelected}
                    onChange={handleSelectAll}
                    isDisabled={isLoading}
                  />
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
            {isLoading
              ? Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
                  <TransactionSkeletonRow key={i} />
                ))
              : transactions.map((tx) => (
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
                      {tx.orderId}
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
                          variant="ghost"
                          size="xs"
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
