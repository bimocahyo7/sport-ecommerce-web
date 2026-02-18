import { getImageUrl } from "@/app/lib/api";
import { Product } from "@/app/types";
import priceFormatter from "@/app/utils/formatCurrency";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

type TProductsProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

const ProductTable = ({ products, onEdit, onDelete }: TProductsProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Price</th>
            <th className="px-6 py-4 font-semibold">Stock</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b border-gray-200 last:border-b-0">
              <td className="px-6 py-4 font-medium">
                <div className="flex gap-2 items-center">
                  <div className="aspect-square bg-gray-100 rounded-md">
                    <Image
                      src={getImageUrl(product.imageUrl)}
                      width={52}
                      height={52}
                      alt={product.name}
                      className="aspect-square object-contain"
                    />
                  </div>
                  <span>{product.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-medium">
                <div className="rounded-md bg-gray-200 text-gray-700 px-2 py-1 w-fit">
                  {product.category?.name || "Uncategory"}
                </div>
              </td>
              <td className="px-6 py-4 font-medium">{priceFormatter(product.price)}</td>
              <td className="px-6 py-4 font-medium">{product.stock} units</td>
              <td className="px-6 py-7.5 flex items-center gap-3 text-gray-600">
                <button onClick={() => onEdit(product)} className="hover:text-primary transition-colors cursor-pointer">
                  <FiEdit2 size={20} />
                </button>
                <button
                  onClick={() => onDelete(product._id)}
                  className="hover:text-red-500 transition-colors cursor-pointer">
                  <FiTrash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
