// Cloudinary configuration
const CLOUD_NAME = 'dnjwnszba';
const UPLOAD_PRESET = 'vastraa';
const API_KEY = 'f5poP6LdNdxH7wlNV2y831SbbhY';

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
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('cloud_name', CLOUD_NAME);
    formData.append('api_key', API_KEY);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json() as CloudinaryError;
      throw new Error(
        errorData.error?.message || errorData.message || `Upload failed with status: ${response.status}`
      );
    }

    const data = await response.json() as CloudinaryResponse;
    console.log('Cloudinary response:', data);
    
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