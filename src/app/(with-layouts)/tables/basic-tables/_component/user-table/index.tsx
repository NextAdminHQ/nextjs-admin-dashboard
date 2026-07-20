import { Card, CardContent } from "@/components/tailgrids/core/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/tailgrids/core/table";
import { userTableData } from "./data";

export default function UserTable() {
  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="p-0">
        <TableRoot className="w-full rounded-none border-none">
          <TableHeader>
            <TableRow className="bg-background-gray-secondary_alt">
              <TableHead className="px-6 py-2.5 text-xs leading-4 font-semibold text-text-secondary">
                Name
              </TableHead>
              <TableHead className="px-6 py-2.5 text-xs leading-4 font-semibold text-text-secondary">
                Position
              </TableHead>
              <TableHead className="px-6 py-2.5 text-xs leading-4 font-semibold text-text-secondary">
                Email
              </TableHead>
              <TableHead className="px-6 py-2.5 text-xs leading-4 font-semibold text-text-secondary">
                Role
              </TableHead>
              <TableHead className="px-6 py-2.5 text-xs leading-4 font-semibold text-text-secondary">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {userTableData.map((user) => (
              <TableRow key={user.id} className="[&_td]:border-none">
                <TableCell className="h-16 px-6 py-3 text-sm leading-5 font-normal tracking-[-0.15px] text-text-primary">
                  {user.name}
                </TableCell>
                <TableCell className="h-16 px-6 py-3 text-sm leading-5 font-normal tracking-[-0.15px] text-text-primary">
                  {user.position}
                </TableCell>
                <TableCell className="h-16 px-6 py-3 text-sm leading-5 font-normal tracking-[-0.15px] whitespace-nowrap text-text-primary">
                  {user.email}
                </TableCell>
                <TableCell className="h-16 px-6 py-3 text-sm leading-5 font-normal tracking-[-0.15px] whitespace-nowrap text-text-primary">
                  {user.role}
                </TableCell>
                <TableCell className="h-16 px-6 py-3">
                  <button className="cursor-pointer text-sm leading-5 font-medium tracking-[-0.15px] whitespace-nowrap text-neutral-brand-color">
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </CardContent>
    </Card>
  );
}
