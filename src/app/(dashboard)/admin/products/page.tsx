import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";

const ProductManagement = () => {

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Product Management</h1>
          <p className="opacity-50">Manage your inventory, prices and stock.</p>
        </div>
        <Button className="rounded-lg">
          <FiPlus size={24} />
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default ProductManagement;