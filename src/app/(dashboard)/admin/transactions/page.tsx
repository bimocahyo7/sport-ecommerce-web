"use client";

import TransactionTable from "../../components/transactions/transaction-table";
import TransactionModal from "../../components/transactions/transaction-modal";
import { useState } from "react";

const TransactionManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Transaction Management</h1>
          <p className="opacity-50">Verify incoming payments and manage orders.</p>
        </div>
      </div>
      <TransactionTable onViewDetails={handleViewDetails} />
      <TransactionModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default TransactionManagement;
