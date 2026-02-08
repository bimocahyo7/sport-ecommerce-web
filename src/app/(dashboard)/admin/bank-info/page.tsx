"use client";

import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import BankInfoList from "../../components/bank-info/bank-info-list";
import BankInfoModal from "../../components/bank-info/bank-info-modal";

const BankInfoManagement = () => {
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
          <h1 className="font-bold text-2xl">Bank Info Management</h1>
          <p className="opacity-50">Manage destination accounts for customer transfers.</p>
        </div>
        <Button className="rounded-lg" onClick={openModal}>
          <FiPlus size={24} />
          Add Bank Account
        </Button>
      </div>
      <BankInfoList />
      <BankInfoModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default BankInfoManagement;
