import formatCurrency from "@/app/utils/formatCurrency";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/button";
import { FiPlus } from "react-icons/fi";

const productList = [
  {
    name: "SportsOn Slowlivin",
    category: "Running",
    price: 329000,
    imageUrl: "product-1.png",
  },
  {
    name: "SportsOn Rockets Tennis",
    category: "Tennis",
    price: 999000,
    imageUrl: "product-2.png",
  },
  {
    name: "SportsOn Hyperfast Shoes",
    category: "Running",
    price: 119000,
    imageUrl: "product-3.png",
  },
  {
    name: "SportsOn HyperSoccer v2",
    category: "Football",
    price: 458000,
    imageUrl: "product-4.png",
  },
  {
    name: "SportsOn Slowlivin v2",
    category: "Running",
    price: 329000,
    imageUrl: "product-5.png",
  },
  {
    name: "SportsOn Baskell Ball",
    category: "Baskelball",
    price: 219000,
    imageUrl: "product-6.png",
  },
  {
    name: "SportsOn Rockets Tennis",
    category: "Running",
    price: 250000,
    imageUrl: "product-7.png",
  },
  {
    name: "SportsOn Hyperfast Shoes v2",
    category: "Running",
    price: 157000,
    imageUrl: "product-8.png",
  },
];

const ProductsSection = () => {
  return (
    <section id="products-section" className="container mx-auto px-24">
      <h2 className="font-bold italic text-center text-primary text-4xl mb-14">
        OUR
        <span className="ml-2 text-dark">PRODUCTS</span>
      </h2>
      <div className="grid grid-cols-4 gap-5 mt-5 mb-40">
        {productList.map((product, index) => (
          <Link href="#" key={index} className="bg-white hover:drop-shadow-xl duration-300 p-1.5">
            <div className="bg-primary-light aspect-square w-full flex justify-center items-center relative">
              <Image
                src={`/images/products/${product.imageUrl}`}
                alt="product.name"
                width={300}
                height={300}
                className="aspect-square object-contain"
              />
              <Button className="w-10 h-10 p-2! absolute right-3 top-3">
                <FiPlus size={24} />
              </Button>
            </div>
            <h3 className="font-medium text-lg mb-1.5 px-2">{product.name}</h3>
            <div className="flex justify-between mb-8 px-2">
              <div className="text-gray-500">{product.category}</div>
              <div className="font-medium text-primary">{formatCurrency(product.price)}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
