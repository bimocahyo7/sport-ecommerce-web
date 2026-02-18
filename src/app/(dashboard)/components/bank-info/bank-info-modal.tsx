/* eslint-disable react-hooks/set-state-in-effect */
import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import { Bank } from "@/app/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createBank, updateBank } from "@/app/services/bank.service";

type TBankInfoModalProps = {
  bank: Bank | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const BankInfoModal = ({ bank, isOpen, onClose, onSuccess }: TBankInfoModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
  });

  const isEditMode = bank !== null;

  useEffect(() => {
    if (bank) {
      setFormData({
        bankName: bank.bankName,
        accountName: bank.accountName,
        accountNumber: bank.accountNumber,
      });
    } else {
      setFormData({
        bankName: "",
        accountName: "",
        accountNumber: "",
      });
    }
  }, [bank, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditMode && bank) {
        await updateBank(bank._id, formData);
        toast.success("Bank updated successfully");
      } else {
        await createBank(formData);
        toast.success("Bank created successfully");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save bank", error);
      toast.error("Failed to save bank");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Bank" : "Add New Bank"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 w-full">
          <div className="input-group-admin">
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              placeholder="e.g. Mandiri, BCA, BRI"
              value={formData.bankName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group-admin">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              placeholder="123124344234234"
              value={formData.accountNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group-admin">
            <label htmlFor="accountName">Account Holder</label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              placeholder="Holder Name as registered on the account"
              value={formData.accountName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <Button type="submit" className="ml-auto mt-3 rounded-lg" disabled={isLoading}>
          {isLoading ? "Saving..." : isEditMode ? "Update Bank" : "Create Bank"}
        </Button>
      </form>
    </Modal>
  );
};

export default BankInfoModal;
