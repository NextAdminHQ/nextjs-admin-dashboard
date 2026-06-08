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
import { topProducts } from "./data";

export default function TopProductsTable() {
  return (
    <Card>
      <CardHeader className="mb-6 ">
        <CardTitle>Top Product</CardTitle>
        <button className="p-1.5 rounded-lg bg-button-primary-outline-background hover:bg-button-primary-outline-hover-background transition-colors shadow-xs">
          <MenuDotsIcon />
        </button>
      </CardHeader>
      {/* table */}
      <TableRoot className="border-none">
        <TableHeader>
          <TableRow className="[&_th]:border-t">
            <TableHead className="text-text-secondary font-semibold text-xs leading-4 px-6 py-2">
              Rep Name
            </TableHead>
            <TableHead className="text-text-secondary font-semibold text-xs leading-4 px-6 py-2">
              Category
            </TableHead>
            <TableHead className="text-text-secondary font-semibold text-xs leading-4 px-6 py-2">
              Price
            </TableHead>
            <TableHead className="text-text-secondary font-semibold text-xs leading-4 px-6 py-2">
              Sold
            </TableHead>
            <TableHead className="w-[127px] text-text-secondary font-semibold text-xs leading-4 px-6 py-2">
              Profit
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topProducts.map((product, index) => (
            <TableRow key={index}>
              <TableCell className="px-6 py-3">
                <div className="flex items-center gap-3">
                  <Avatar
                    fallback={product.name.charAt(0)}
                    src={product.image}
                    className="bg-gray-100 rounded-full"
                  />
                  <span className="font-medium text-text-primary text-sm whitespace-nowrap">
                    {product.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-3 text-text-primary leading-5 font-normal text-sm">
                {product.category}
              </TableCell>
              <TableCell className="px-6 py-3 text-text-secondary leading-5 text-sm font-medium">
                {product.price}
              </TableCell>
              <TableCell className="px-6 py-3 text-text-primary leading-5 font-medium text-sm">
                {product.sold}
              </TableCell>
              <TableCell className="px-6 py-3 text-green-600 leading-5 font-medium text-sm">
                {product.profit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Card>
  );
}
