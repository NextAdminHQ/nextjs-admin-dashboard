import { products } from "@/components/Layouts/sidebar/data/product-items";
import Image from "next/image";

export default function Products() {
  function ProductItem({
    isAvailale,
    imgURL,
    title,
    description,
    amount,
  }: {
    isAvailale: boolean;
    imgURL: string;
    title: string;
    description: string;
    amount: number;
  }) {
    return (
      <article
        className={`relative flex flex-row-reverse gap-3 rounded-2xl border-[1px] border-neutral-200 bg-white p-3 ${!isAvailale && `opacity-75`}`}
      >
        <Image
          src={imgURL}
          width={100}
          height={100}
          alt={`alt image for ${title}`}
          className="h-32 w-32 rounded-lg"
        />
        <div className="flex h-full flex-col items-end justify-between gap-2">
          <div className="flex flex-col items-end gap-2">
            <h4 className="text-xl">{title}</h4>
            <h5 style={{ direction: "rtl" }}>{description}</h5>
          </div>
          <h6 className="text-lg font-medium">{amount}</h6>
        </div>
        <button className="absolute bottom-0 left-0 m-3 rounded-lg bg-red-600 px-3 py-1 text-white transition-all duration-200 hover:shadow-[0_4px_10px_rgba(255,0,0,0.63)]">
          Edit
        </button>
      </article>
    );
  }

  return (
    <main className="relative h-full w-full">
      <div className="absolute right-0 top-0 w-full">
        <button className="rounded-lg bg-blue-500 px-3 py-1 text-white">
          Add Product
        </button>
      </div>
      <section className="grid w-full grid-cols-1 gap-3 xl:grid-cols-2">
        {products.map((product, index) => (
          <ProductItem
            key={index}
            isAvailale={true}
            imgURL={`https://cdnimg.webstaurantstore.com/images/products/large/581976/2438215.jpg`}
            title={product.Title}
            description={product.Description}
            amount={product.Price.CurrentPrice}
          />
        ))}
      </section>
    </main>
  );
}
