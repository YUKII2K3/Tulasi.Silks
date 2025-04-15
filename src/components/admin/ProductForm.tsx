import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ImageUploader from './ImageUploader';
import { useLanguage } from '@/contexts/LanguageContext';
import ProductPreview from './ProductPreview';

interface ProductFormData {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  showInHero: boolean;
  showInFeatured: boolean;
  showInCategories: boolean;
}

const ProductForm = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: '',
    showInHero: false,
    showInFeatured: false,
    showInCategories: false
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save to localStorage for now (replace with API call later)
      const products = JSON.parse(localStorage.getItem('saree-shop-products') || '[]');
      const newProduct = {
        ...formData,
        id: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      products.push(newProduct);
      localStorage.setItem('saree-shop-products', JSON.stringify(products));

      // Show success message
      toast.success(t('productAddSuccess'), {
        duration: 3000,
        onAutoClose: () => {
          // Show preview after success message
          setShowPreview(true);
        }
      });
    } catch (error) {
      toast.error(t('errorSaving'), {
        description: t('tryAgain')
      });
    }
  };

  const handlePreviewClose = () => {
    setShowPreview(false);
    navigate('/'); // Redirect to homepage
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <ImageUploader
          value={formData.image}
          onChange={(url) => setFormData({ ...formData, image: url })}
          label={t('uploadImage')}
          placeholder={t('selectFromGallery')}
        />

        <div>
          <Label htmlFor="name">{t('productName')}</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="price">{t('price')}</Label>
          <Input
            id="price"
            type="number"
            required
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          />
        </div>

        <div>
          <Label htmlFor="category">{t('category')}</Label>
          <Input
            id="category"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="description">{t('description')}</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <Label>{t('displayOptions')}</Label>
          
          <TooltipProvider>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showInFeatured"
                checked={formData.showInFeatured}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, showInFeatured: checked as boolean })
                }
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="showInFeatured" className="cursor-pointer">
                    {t('showInFeatured')}
                  </Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('showInFeaturedHelp')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>

          {/* Similar tooltips for other display options */}
        </div>
      </div>

      <Button type="submit" className="w-full">
        {t('saveProduct')}
      </Button>

      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium mb-4">{t('previewTitle')}</h3>
            <ProductPreview product={formData} />
            <div className="mt-4 flex justify-end space-x-4">
              <Button variant="outline" onClick={handlePreviewClose}>
                {t('goToHomepage')}
              </Button>
              <Button onClick={() => setShowPreview(false)}>
                {t('addAnother')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default ProductForm; 