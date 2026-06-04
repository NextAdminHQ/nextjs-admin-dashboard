import { Avatar } from "@/components/tailgrids/core/avatar";
import { ArrowUpIcon, MenuDotsIcon } from "@/utils/icon";

const products = [
  {
    name: "Keyboard H32",
    sales: "1,284",
    rank: 1,
    revenue: "$192.3k",
    change: "10.98%",
    fallback: "KB",
  },
  {
    name: "Mouse M12 Pro",
    sales: "985",
    rank: 2,
    revenue: "$143.7k",
    change: "8.72%",
    fallback: "MO",
  },
  {
    name: "Gaming Chair X5",
    sales: "732",
    rank: 3,
    revenue: "$117.4k",
    change: "7.61%",
    fallback: "GC",
  },
  {
    name: "Wireless Headset V7",
    sales: "1,120",
    rank: 4,
    revenue: "$210.5k",
    change: "4.55%",
    fallback: "WH",
  },
  {
    name: "4K Monitor S24",
    sales: "640",
    rank: 5,
    revenue: "$156.2k",
    change: "2.49%",
    fallback: "4K",
  },
];

export default function TopProducts() {
  return (
    <div className="border-[0.5px] border-card-border bg-card-background rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-text-primary font-semibold leading-6">Top Product</p>
        <button className="p-1.5 rounded-lg bg-button-primary-outline-background hover:bg-button-primary-outline-hover-background transition-colors">
          <MenuDotsIcon />
        </button>
      </div>
      {/* Product list */}
      <div className="mt-6 flex flex-col ">
        {products.map((product) => (
          <div
            key={product.rank}
            className="flex items-center justify-between py-3 border-b border-border-primary last:border-0 last:pb-0 first:pt-0"
          >
            <div className="flex items-center gap-3">
              <Avatar fallback={product.fallback} size="md" />
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
    </div>
  );
}
