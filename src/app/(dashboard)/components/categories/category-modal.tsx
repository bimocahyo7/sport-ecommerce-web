import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useEffect, useState } from "react";
import { Category } from "@/app/types";
import { createCategory, updateCategory } from "@/app/services/category.service";
import { getImageUrl } from "@/app/lib/api";
import { toast } from "react-toastify";

type TCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category: Category | null;
};

const CategoryModal = ({ category, isOpen, onClose, onSuccess }: TCategoryModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const isEditMode = category !== null;

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || "",
      });
      setImagePreview(getImageUrl(category.imageUrl));
      setImageFile(null);
    } else {
      setFormData({
        name: "",
        description: "",
      });
      setImagePreview(null);
      setImageFile(null);
    }
  }, [category, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      data.append("description", formData.description);

      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditMode && category) {
        await updateCategory(category._id, data);
        toast.success("Category updated successfully");
      } else {
        await createCategory(data);
        toast.success("Category created successfully");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save category", error);
      toast.error("Failed to save category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Category" : "Add New Category"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-7">
          <div className="w-64 min-w-64">
            <ImageUploadPreview label="Category Image" value={imagePreview} onChange={handleImageChange} />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="input-group-admin">
              <label htmlFor="name">Category Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Running, Football, Tennis"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group-admin">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                rows={5}
                placeholder="Category Details..."
                value={formData.description}
                onChange={handleInputChange}></textarea>
            </div>
          </div>
        </div>
        <Button type="submit" className="ml-auto mt-3 rounded-lg" disabled={isLoading}>
          {isLoading ? "Saving..." : isEditMode ? "Update Category" : "Create Category"}
        </Button>
      </form>
    </Modal>
  );
};

export default CategoryModal;
