"use client";

import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import CategoryTable from "../../components/categories/category-table";
import CategoryModal from "../../components/categories/category-modal";

const CategoryManagement = () => {
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
          <h1 className="font-bold text-2xl">Category Management</h1>
          <p className="opacity-50">Organize your products into categories</p>
        </div>
        <Button className="rounded-lg" onClick={openModal}>
          <FiPlus size={24} />
          Add Category
        </Button>
      </div>
      <CategoryTable />
      <CategoryModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default CategoryManagement;
