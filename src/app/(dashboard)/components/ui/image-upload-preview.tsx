import Image from "next/image";
import { useRef } from "react";
import { FiEdit, FiUploadCloud } from "react-icons/fi";

type TImageUploadPreviewProps = {
  label?: string;
  value?: string | null;
  onChange: (file: File) => void;
  className?: string;
};

const ImageUploadPreview = ({ label, value, onChange, className }: TImageUploadPreviewProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange(file);
    }
  };

  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <div
        onClick={handleImageClick}
        className="border-2 border-dashed border-primary bg-primary/5 rounded-lg h-50 flex flex-col justify-center items-center cursor-pointer">
        {value ? (
          <div className="max-w-47.5 relative">
            <Image src={value} alt="preview product" className="w-full h-full object-cover rounded-lg" width={190} height={190} />
            <div className="opacity-0 hover:opacity-100 absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-lg">
              <div className="flex items-center gap-2 text-white">
                <FiEdit size={20} />
                <span className="text-sm font-medium">Change Image</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <FiUploadCloud className="text-primary" size={24} />
            <span className="text-sm font-medium">Click to Upload</span>
          </>
        )}
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default ImageUploadPreview;
