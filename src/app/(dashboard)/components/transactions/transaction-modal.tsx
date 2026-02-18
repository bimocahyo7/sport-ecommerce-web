import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import Image from "next/image";
import priceFormatter from "@/app/utils/formatCurrency";
import { FiCheck, FiX } from "react-icons/fi";
import { Transaction } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import { useState } from "react";
import formatDate from "@/app/utils/formatDate";

type TTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onUpdateStatus: (id: string, status: "paid" | "rejected") => Promise<void>;
};

const TransactionModal = ({ isOpen, onClose, transaction, onUpdateStatus }: TTransactionModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!transaction) return null;

  const handleUpdateStatus = async (status: "paid" | "rejected") => {
    setIsLoading(true);
    try {
      await onUpdateStatus(transaction._id, status);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
      <div className="flex gap-6">
        <div>
          <h4 className="font-semibold text-sm mb-2">Payment Proof</h4>
          {transaction.paymentProof ? (
            <Image
              src={getImageUrl(transaction.paymentProof)}
              alt="payment proof"
              width={200}
              height={401}
              className="rounded-md object-contain"
            />
          ) : (
            <div className="w-50 h-75 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              No proof uploaded
            </div>
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-2">Order Details</h4>
          <div className="bg-gray-100 rounded-md flex flex-col gap-2.5 p-4 text-sm mb-5">
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Date</div>
              <div className="text-right">{formatDate(transaction.createdAt)}</div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Customer</div>
              <div className="text-right">{transaction.customerName}</div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Contact</div>
              <div className="text-right">{transaction.customerContact || "-"}</div>
            </div>
            <div className="flex justify-between gap-10 font-medium">
              <div className="opacity-50 whitespace-nowrap">Shipping Address</div>
              <div className="text-right">{transaction.customerAddress || "-"}</div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Status</div>
              <div className="text-right uppercase">{transaction.status}</div>
            </div>
          </div>

          <h4 className="font-semibold text-sm mb-2">Items Purchased</h4>
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            {transaction.purchasedItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-2 flex items-center gap-2">
                <div className="bg-gray-100 rounded aspect-square w-8 h-8 overflow-hidden">
                  <Image
                    src={getImageUrl(item.productId?.imageUrl)}
                    width={32}
                    height={32}
                    alt={item.productId.name}
                    className="object-contain"
                  />
                </div>
                <div className="font-medium text-sm flex-1">{item.productId.name}</div>
                <div className="font-medium ml-auto text-sm">{item.qty} units</div>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-sm mt-6">
            <h4 className="font-semibold">Total</h4>
            <div className="text-primary font-semibold">{priceFormatter(Number(transaction.totalPayment))}</div>
          </div>

          {transaction.status === "pending" && (
            <div className="flex justify-end gap-5 mt-12">
              <Button
                className="text-primary! bg-primary-light! rounded-md"
                size="small"
                onClick={() => handleUpdateStatus("rejected")}
                disabled={isLoading}>
                <FiX size={20} />
                {isLoading ? "Processing..." : "Reject"}
              </Button>
              <Button
                className="text-white! bg-[#50C252]! rounded-md"
                size="small"
                onClick={() => handleUpdateStatus("paid")}
                disabled={isLoading}>
                <FiCheck size={20} />
                {isLoading ? "Processing..." : "Approve"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;
