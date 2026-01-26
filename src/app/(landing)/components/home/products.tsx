"use client"

import formatCurrency from "@/app/utils/formatCurrency";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/button";
import { FiPlus } from "react-icons/fi";
import { getImageUrl } from "@/app/lib/api";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { Product } from "@/app/types";

type TProductsProps = {
  products: Product[];
};

const ProductsSection = ({ products }: TProductsProps) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <section id="products-section" className="container mx-auto px-24">
      <h2 className="font-bold italic text-center text-primary text-4xl mb-14">
        OUR
        <span className="ml-2 text-dark">PRODUCTS</span>
      </h2>
      <div className="grid grid-cols-4 gap-5 mt-5 mb-40">
        {products.map((product) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className="bg-white hover:drop-shadow-xl duration-300 p-1.5">
            <div className="bg-primary-light aspect-square w-full flex justify-center items-center relative">
              <Image
                src={getImageUrl(product.imageUrl)}
                alt={product.name}
                width={300}
                height={300}
                className="aspect-square object-contain"
              />
              <Button
                className="w-10 h-10 p-2! absolute right-3 top-3"
                onClick={(e) => {
                  handleAddToCart(e, product);
                }}>
                <FiPlus size={24} />
              </Button>
            </div>
            <h3 className="font-medium text-lg mb-1.5 px-2">{product.name}</h3>
            <div className="flex justify-between mb-8 px-2">
              <div className="text-gray-500">{product.category?.name}</div>
              <div className="font-medium text-primary">{formatCurrency(product.price)}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
