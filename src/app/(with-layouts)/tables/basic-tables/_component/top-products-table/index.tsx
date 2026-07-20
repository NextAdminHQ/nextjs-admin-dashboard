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
import { topProducts } from "./data";

export default function TopProductsTable() {
  return (
    <Card>
      <CardHeader className="mb-6">
        <CardTitle>Top Product</CardTitle>

        <Button iconOnly size="xs" variant="ghost">
          <MenuDotsIcon />
        </Button>
      </CardHeader>
      {/* table */}
      <TableRoot className="border-none">
        <TableHeader>
          <TableRow className="[&_th]:border-t">
            <TableHead className="px-6 py-2 text-xs leading-4 font-semibold text-text-secondary">
              Rep Name
            </TableHead>
            <TableHead className="px-6 py-2 text-xs leading-4 font-semibold text-text-secondary">
              Category
            </TableHead>
            <TableHead className="px-6 py-2 text-xs leading-4 font-semibold text-text-secondary">
              Price
            </TableHead>
            <TableHead className="px-6 py-2 text-xs leading-4 font-semibold text-text-secondary">
              Sold
            </TableHead>
            <TableHead className="w-31.75 px-6 py-2 text-xs leading-4 font-semibold text-text-secondary">
              Profit
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {topProducts.map((product, index) => (
            <TableRow key={index}>
              <TableCell className="px-6 py-3">
                <div className="flex items-center gap-3">
                  <Avatar className="bg-gray-100">
                    <AvatarImage src={product.image} alt={product.name} />
                    <AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium whitespace-nowrap text-text-primary">
                    {product.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-3 text-sm leading-5 font-normal text-text-primary">
                {product.category}
              </TableCell>
              <TableCell className="px-6 py-3 text-sm leading-5 font-medium text-text-secondary">
                {product.price}
              </TableCell>
              <TableCell className="px-6 py-3 text-sm leading-5 font-medium text-text-primary">
                {product.sold}
              </TableCell>
              <TableCell className="px-6 py-3 text-sm leading-5 font-medium text-green-600">
                {product.profit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Card>
  );
}
