import { getImageUrl } from "@/app/lib/api";
import { Category } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

type TCategoriesProps = {
  categories: Category[];
};

const CategoriesSection = ({ categories }: TCategoriesProps) => {
  return (
    <section id="category-section" className="container mx-auto px-24 pb-40">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Browse by Categories</h2>
        <div className="flex items-center gap-2">
          <Link href="#" className="flex text-primary font-medium">
            See All Categories
          </Link>
          <FiArrowRight className="self-center text-primary" size={18} />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-12 mt-8">
        {categories.map((category) => (
          <div
            key={category._id}
            className="rounded-lg bg-linear-to-r from-[#F1F1F1] to-[#F7F7F7] w-full aspect-square flex justify-center">
            <div className="self-center">
              <Image
                src={getImageUrl(category.imageUrl)}
                width={86}
                height={86}
                alt={category.name}
                className="mb-2.5"
              />
              <div className="text-primary font-medium text-xl text-center">{category.name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
