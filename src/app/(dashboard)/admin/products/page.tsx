"use client";

import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import ProductTable from "../../components/products/product-table";
import ProductModal from "../../components/products/product-modal";
import { useState } from "react";

const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Product Management</h1>
          <p className="opacity-50">Manage your inventory, prices and stock.</p>
        </div>
        <Button className="rounded-lg" onClick={openModal}>
          <FiPlus size={24} />
          Add Product
        </Button>
      </div>
      <ProductTable />
      <ProductModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ProductManagement;