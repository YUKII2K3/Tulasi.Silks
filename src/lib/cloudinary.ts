// Cloudinary configuration
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

if (!CLOUD_NAME || !UPLOAD_PRESET) {
  console.error('Missing Cloudinary configuration. Please check your environment variables.');
}

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  url: string;
}

interface CloudinaryError {
  message: string;
  error?: {
    message: string;
    http_code: number;
  };
}

export const uploadImageToCloudinary = async (file: File): Promise<CloudinaryResponse> => {
  try {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      throw new Error('Missing Cloudinary configuration. Please check your environment variables.');
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`File type ${file.type} is not supported. Please upload JPEG, PNG, WebP, or GIF images.`);
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('cloud_name', CLOUD_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json() as CloudinaryError;
      console.error('Cloudinary error:', errorData);
      throw new Error(
        errorData.error?.message || errorData.message || `Upload failed with status: ${response.status}`
      );
    }

    const data = await response.json() as CloudinaryResponse;
    console.log('Cloudinary upload successful:', data);
    
    if (!data.secure_url) {
      throw new Error('Invalid response: Missing secure_url');
    }

    return data;
  } catch (error) {
    console.error('Upload error:', error);
    if (error instanceof Error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }
    throw new Error('Image upload failed: Unknown error');
  }
}; 