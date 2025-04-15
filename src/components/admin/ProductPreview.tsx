import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductPreviewProps {
  product: {
    name: string;
    price: number;
    image: string;
    description: string;
  };
}

const ProductPreview = ({ product }: ProductPreviewProps) => {
  const { t } = useLanguage();

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="aspect-square relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg">{product.name}</h3>
        <p className="text-saree-maroon font-medium mt-1">
          ₹{product.price.toLocaleString()}
        </p>
        <p className="text-gray-600 mt-2 text-sm line-clamp-2">
          {product.description}
        </p>
      </div>
      <div className="bg-gray-50 p-4 border-t">
        <p className="text-sm text-gray-600">
          {t('previewNote')}
        </p>
      </div>
    </div>
  );
};

export default ProductPreview; 