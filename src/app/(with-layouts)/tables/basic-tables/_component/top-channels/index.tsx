import { Avatar, AvatarFallback, AvatarImage } from "@/components/tailgrids/core/avatar";
import { Button } from "@/components/tailgrids/core/button";
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
      <CardHeader className="mb-6">
        <CardTitle>Top Channels</CardTitle>

        <Button iconOnly size="xs" variant="ghost">
          <MenuDotsIcon />
        </Button>
      </CardHeader>
      {/* table */}
      <TableRoot className="border-none">
        <TableHeader>
          <TableRow className="[&_th]:border-t">
            <TableHead className="px-6 py-2 text-xs font-semibold text-text-tertiary">
              Source
            </TableHead>
            <TableHead className="px-6 py-2 text-xs font-semibold text-text-tertiary">
              Visitors
            </TableHead>
            <TableHead className="px-6 py-2 text-xs font-semibold text-text-tertiary">
              Revenues
            </TableHead>
            <TableHead className="px-6 py-2 text-xs font-semibold text-text-tertiary">
              Sales
            </TableHead>
            <TableHead className="w-31.75 px-6 py-2 text-xs font-semibold text-text-tertiary">
              Conversion
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topChannelsData.map((channel, index) => (
            <TableRow key={index}>
              <TableCell className="px-6 py-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={channel.icon} alt={channel.name} />
                    <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <span className="text-sm font-medium whitespace-nowrap text-text-primary">
                    {channel.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-3 text-sm leading-5 font-normal text-text-primary">
                {channel.visitors}
              </TableCell>
              <TableCell className="px-6 py-3 text-sm leading-5 font-medium text-green-600">
                {channel.revenues}
              </TableCell>
              <TableCell className="px-6 py-3 text-sm leading-5 font-medium text-text-primary">
                {channel.sales}
              </TableCell>
              <TableCell className="px-6 py-3 text-sm leading-5 font-medium text-text-primary">
                {channel.conversion}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Card>
  );
}
