import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useEffect, useState } from "react";
import { Product, Category } from "@/app/types";
import { createProduct, updateProduct } from "@/app/services/product.service";
import { getAllCategories } from "@/app/services/category.service";
import { getImageUrl } from "@/app/lib/api";
import { toast } from "react-toastify";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: Product | null;
};

const ProductModal = ({ product, isOpen, onClose, onSuccess }: TProductModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
    description: "",
  });

  const isEditMode = product !== null;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Populate form saat edit
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        categoryId: product.category?._id || "",
        description: product.description || "",
      });
      setImagePreview(getImageUrl(product.imageUrl));
      setImageFile(null);
    } else {
      setFormData({
        name: "",
        price: "",
        stock: "",
        categoryId: "",
        description: "",
      });
      setImagePreview(null);
      setImageFile(null);
    }
  }, [product, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("categoryId", formData.categoryId);
      data.append("description", formData.description);

      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditMode && product) {
        await updateProduct(product._id, data);
        toast.success("Product updated successfully");
      } else {
        await createProduct(data);
        toast.success("Product created successfully");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save product", error);
      toast.error("Failed to save product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Product" : "Add New Product"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-7">
          <div className="min-w-50">
            <ImageUploadPreview label="Product Image" value={imagePreview} onChange={handleImageChange} />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="input-group-admin">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Running Shoes"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="input-group-admin">
                <label htmlFor="price">Price (IDR)</label>
                <input
                  type="number"
                  min="1"
                  id="price"
                  name="price"
                  placeholder="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group-admin">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  min="0"
                  id="stock"
                  name="stock"
                  placeholder="0"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="input-group-admin">
              <label htmlFor="categoryId">Category</label>
              <select
                name="categoryId"
                id="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                required>
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="input-group-admin">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={4}
            placeholder="Product Details..."
            value={formData.description}
            onChange={handleInputChange}></textarea>
        </div>
        <Button type="submit" className="ml-auto mt-3 rounded-lg" disabled={isLoading}>
          {isLoading ? "Saving..." : isEditMode ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ProductModal;
