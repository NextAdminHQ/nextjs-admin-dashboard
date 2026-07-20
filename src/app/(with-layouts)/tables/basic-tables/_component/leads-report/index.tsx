"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/tailgrids/core/avatar";
import { Badge } from "@/components/tailgrids/core/badge";
import { Button } from "@/components/tailgrids/core/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/tailgrids/core/table";
import { formatNumber } from "@/utils/format-number";
import { MenuDotsIcon } from "@/utils/icon";
import { leadsReportData } from "./data";

const data = { data: leadsReportData };

export default function LeadsReport() {
  return (
    <Card>
      <CardHeader className="mb-6">
        <CardTitle>Leads Report</CardTitle>

        <Button iconOnly size="xs" variant="ghost">
          <MenuDotsIcon />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <TableRoot className="rounded-none border-none">
          <TableHeader className="bg-background-gray-secondary_alt">
            <TableRow>
              <TableHead className="px-6 py-2 text-xs leading-4 font-semibold text-text-secondary">
                Rep Name
              </TableHead>
              <TableHead className="px-6 py-2 text-xs leading-4 font-semibold text-text-secondary">
                Deals Closed
              </TableHead>
              <TableHead className="px-6 py-2 text-xs leading-4 font-semibold text-text-secondary">
                Revenue
              </TableHead>
              <TableHead className="w-34.25 px-6 py-2 text-xs leading-4 font-semibold text-text-secondary">
                Performance
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={item.representative.avatarUrl}
                        alt={item.representative.fullName}
                      />
                      <AvatarFallback>
                        {item.representative.fullName
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sm font-medium whitespace-nowrap text-text-primary">
                        {item.representative.fullName}
                      </p>
                      <small className="block text-xs leading-4 font-normal text-text-tertiary">
                        {item.representative.roleTitle}
                      </small>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-3 text-sm font-normal text-text-primary">
                  {item.metrics.dealsClosedCount}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm font-medium text-text-primary">
                  ${formatNumber({ value: item.metrics.totalRevenueUsd })}
                </TableCell>
                <TableCell className="px-6 py-3">
                  <Badge
                    color={
                      item.metrics.performanceTargetPercentage > 85
                        ? "success"
                        : item.metrics.performanceTargetPercentage > 75
                          ? "primary"
                          : "warning"
                    }
                    className="px-2.5 text-sm"
                  >
                    {item.metrics.performanceTargetPercentage}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </CardContent>
    </Card>
  );
}
