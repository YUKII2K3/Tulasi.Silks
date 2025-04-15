// Cloudinary configuration
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Debug logging for environment variables
console.log('Cloudinary Config:', {
  cloudName: CLOUD_NAME,
  uploadPreset: UPLOAD_PRESET
});

if (!CLOUD_NAME || !UPLOAD_PRESET) {
  console.error('Missing Cloudinary configuration:', {
    cloudName: !CLOUD_NAME ? 'Missing' : 'Set',
    uploadPreset: !UPLOAD_PRESET ? 'Missing' : 'Set'
  });
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
      const missingVars = [];
      if (!CLOUD_NAME) missingVars.push('VITE_CLOUDINARY_CLOUD_NAME');
      if (!UPLOAD_PRESET) missingVars.push('VITE_CLOUDINARY_UPLOAD_PRESET');
      
      throw new Error(`Missing Cloudinary configuration. Missing variables: ${missingVars.join(', ')}`);
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

    console.log('Attempting upload with config:', {
      cloudName: CLOUD_NAME,
      uploadPreset: UPLOAD_PRESET,
      fileType: file.type,
      fileSize: file.size
    });

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Cloudinary error response:', responseData);
      throw new Error(
        responseData.error?.message || responseData.message || `Upload failed with status: ${response.status}`
      );
    }

    const data = responseData as CloudinaryResponse;
    console.log('Cloudinary upload successful:', {
      url: data.secure_url,
      publicId: data.public_id,
      format: data.format
    });
    
    if (!data.secure_url) {
      throw new Error('Invalid response: Missing secure_url');
    }

    return data;
  } catch (error) {
    console.error('Upload error details:', error);
    if (error instanceof Error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }
    throw new Error('Image upload failed: Unknown error');
  }
}; 