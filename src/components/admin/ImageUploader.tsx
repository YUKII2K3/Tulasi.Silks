
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Image, Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const file = acceptedFiles[0];
    
    if (!file) return;
    
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
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onChange(result);
      setIsLoading(false);
    };
    
    reader.onabort = () => {
      setError("File reading was aborted");
      setIsLoading(false);
    };
    
    reader.onerror = () => {
      setError("File reading has failed");
      setIsLoading(false);
    };
    
    reader.readAsDataURL(file);
  }, [onChange, maxSizeInMB]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
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
      {label && <div className="text-sm font-medium">{label}</div>}
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-lg overflow-hidden transition-colors",
          isDragActive ? "border-saree-maroon bg-saree-maroon/5" : "border-gray-300 hover:border-saree-maroon/70",
          previewUrl ? "p-0" : "p-6",
          error ? "border-red-500" : "",
          className
        )}
        style={{
          aspectRatio: aspectRatio
        }}
      >
        <input {...getInputProps()} />

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-saree-maroon" />
          </div>
        ) : null}

        {previewUrl ? (
          <div className="relative h-full w-full">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
              <Button
                type="button"
                variant="outline"
                className="bg-white hover:bg-white text-gray-800 mr-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Upload className="h-4 w-4 mr-1" />
                Change
              </Button>
              <Button
                type="button"
                variant="outline"
                className="bg-white hover:bg-white text-red-600 hover:text-red-700"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex flex-col items-center justify-center text-gray-500">
              <Image className="h-10 w-10 mb-2" />
              {isDragActive ? (
                <p className="text-saree-maroon">Drop the image here...</p>
              ) : (
                <>
                  <p>{placeholder}</p>
                  <p className="text-xs mt-1">
                    (Max size: {maxSizeInMB}MB)
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default ImageUploader;
