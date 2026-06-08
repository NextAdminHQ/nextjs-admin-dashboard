import { Avatar } from "@/components/tailgrids/core/avatar";
import { Card, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/tailgrids/core/table";
import { MenuDotsIcon } from "@/utils/icon";
import { topChannelsData } from "./data";

export default function TopChannels() {
  return (
    <Card>
      <CardHeader className="mb-6 ">
        <CardTitle>Top Channels</CardTitle>
        <button className="p-1.5 rounded-lg bg-button-primary-outline-background hover:bg-button-primary-outline-hover-background transition-colors shadow-xs">
          <MenuDotsIcon />
        </button>
      </CardHeader>
      {/* table */}
      <TableRoot className="border-none">
        <TableHeader>
          <TableRow className="[&_th]:border-t">
            <TableHead className="text-text-tertiary font-semibold text-xs px-6 py-2">
              Source
            </TableHead>
            <TableHead className="text-text-tertiary font-semibold text-xs px-6 py-2">
              Visitors
            </TableHead>
            <TableHead className="text-text-tertiary font-semibold text-xs px-6 py-2">
              Revenues
            </TableHead>
            <TableHead className="text-text-tertiary font-semibold text-xs px-6 py-2">
              Sales
            </TableHead>
            <TableHead className="w-[127px] text-text-tertiary font-semibold text-xs px-6 py-2">
              Conversion
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topChannelsData.map((channel, index) => (
            <TableRow key={index}>
              <TableCell className="px-6 py-3">
                <div className="flex items-center gap-3">
                  <Avatar fallback={channel.name.charAt(0)} src={channel.icon} />
                  <span className="font-medium text-text-primary text-sm whitespace-nowrap">
                    {channel.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-3 text-text-primary leading-5 font-normal text-sm">
                {channel.visitors}
              </TableCell>
              <TableCell className="px-6 py-3 text-green-600 leading-5 text-sm font-medium">
                {channel.revenues}
              </TableCell>
              <TableCell className="px-6 py-3 text-text-primary leading-5 font-medium text-sm">
                {channel.sales}
              </TableCell>
              <TableCell className="px-6 py-3 text-text-primary leading-5 font-medium text-sm">
                {channel.conversion}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Card>
  );
}
