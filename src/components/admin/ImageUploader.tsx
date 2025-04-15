import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Image, Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

interface ImageUploaderProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  maxSizeInMB?: number;
  label?: string;
  aspectRatio?: string; // e.g., "1/1", "16/9"
  placeholder?: string;
}

const ImageUploader = ({
  value,
  onChange,
  className,
  maxSizeInMB = 5,
  label = "Product Image",
  aspectRatio = "1/1",
  placeholder = "Drag & drop an image here, or click to select"
}: ImageUploaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(value);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPreviewUrl(value);
  }, [value]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    const file = acceptedFiles[0];
    
    if (!file) {
      setError("No file selected");
      return;
    }
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setError(`File type ${file.type} is not supported. Please upload JPEG, PNG, WebP, or GIF images.`);
      toast.error("Unsupported file type", {
        description: "Please upload a JPEG, PNG, WebP, or GIF image"
      });
      return;
    }
    
    // Check file size (convert MB to bytes)
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setError(`File size must be less than ${maxSizeInMB}MB`);
      toast.error(`File too large`, {
        description: `Maximum file size is ${maxSizeInMB}MB`
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create a temporary preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      const cloudinaryResponse = await uploadImageToCloudinary(file);
      setPreviewUrl(cloudinaryResponse.secure_url);
      onChange(cloudinaryResponse.secure_url);
      
      toast.success("Image uploaded successfully", {
        description: "Your image has been uploaded and will be displayed on the website."
      });
    } catch (error) {
      let errorMessage = "Failed to upload image. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      toast.error("Upload failed", {
        description: errorMessage
      });
      console.error('Upload error:', error);
      // Reset preview if upload fails
      setPreviewUrl(value);
    } finally {
      setIsLoading(false);
    }
  }, [onChange, maxSizeInMB, value]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/gif': ['.gif']
    },
    maxSize: maxSizeInMB * 1024 * 1024,
    multiple: false
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      setError("Invalid file type. Please upload an image.");
      toast.error("Invalid file type", {
        description: "Please upload a valid image file (JPEG, PNG, WebP, GIF)"
      });
    }
  }, [fileRejections]);

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(undefined);
    onChange("");
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
          isDragActive ? "border-saree-gold bg-saree-cream" : "border-gray-300 hover:border-saree-gold",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-saree-gold" />
            <p className="mt-2 text-sm text-gray-500">Uploading to Cloudinary...</p>
          </div>
        ) : previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="mx-auto max-h-48 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">{placeholder}</p>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUploader;
