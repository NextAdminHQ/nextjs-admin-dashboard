import { topProducts } from "@/app/(withLayouts)/(home)/_component/topProducts/data";
import { Avatar } from "@/components/tailgrids/core/avatar";
import { Card, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
import { ArrowUpIcon, MenuDotsIcon } from "@/utils/icon";

export default function TopProducts() {
  return (
    <Card>
      {/* Header */}
      <CardHeader className="mb-6">
        <CardTitle>Top Product</CardTitle>
        <button className="p-1.5 rounded-lg bg-button-primary-outline-background hover:bg-button-primary-outline-hover-background transition-colors">
          <MenuDotsIcon />
        </button>
      </CardHeader>
      {/* Product list */}
      <div className="flex flex-col">
        {topProducts.map((product) => (
          <div
            key={product.rank}
            className="flex items-center justify-between py-3 border-b border-border-primary last:border-0 last:pb-0 first:pt-0"
          >
            <div className="flex items-center gap-3">
              <Avatar fallback={product.name.charAt(0)} src={product.image} size="md" className="bg-gray-100 rounded-full"/>
              <div>
                <p className="text-text-primary font-medium leading-5 text-sm mb-1">
                  {product.name}
                </p>
                <small className="text-text-tertiary text-xs leading-4 block">
                  {product.sales} sales · #{product.rank}
                </small>
              </div>
            </div>
            <div className="">
              <p className="text-text-primary font-medium text-sm leading-5">{product.revenue}</p>
              <p className="text-green-500 text-xs leading-4 flex items-center justify-end gap-1 mt-1">
                {product.change} <ArrowUpIcon className="text-green-600" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
