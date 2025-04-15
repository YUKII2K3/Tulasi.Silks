import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid3X3, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryProps {
  id: string;
  name: string;
  description: string;
  image?: string;
  count: number;
  slug: string;
}

const CategoryCard: React.FC<CategoryProps> = ({ name, description, image, count, slug }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/category/${slug}`} className="block relative">
        <div className="w-full h-52 bg-gray-100">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-4">
                <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Grid3X3 size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500">No image available</p>
              </div>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
          <h3 className="text-xl font-playfair font-semibold">{name}</h3>
          <div className="flex items-center mt-1">
            <Tag size={14} className="mr-1" />
            <p className="text-sm">{count > 0 ? `${count} products` : 'No products yet'}</p>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <Button asChild variant="outline" className="w-full justify-center">
          <Link to={`/category/${slug}`}>
            Browse Collection
          </Link>
        </Button>
      </div>
    </div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    // Get all products
    const savedProducts = localStorage.getItem('saree-shop-products');
    if (savedProducts) {
      try {
        const products = JSON.parse(savedProducts);
        
        // Group products by category and create category objects
        const categoryMap = products.reduce((acc: { [key: string]: any }, product: any) => {
          if (product.category) {
            const slug = product.category.toLowerCase().replace(/\s+/g, '-');
            if (!acc[slug]) {
              acc[slug] = {
                id: slug,
                name: product.category,
                description: `Explore our collection of ${product.category.toLowerCase()} sarees`,
                image: product.showInCategories ? product.image : undefined,
                count: 1,
                slug
              };
            } else {
              acc[slug].count += 1;
              if (product.showInCategories && !acc[slug].image) {
                acc[slug].image = product.image;
              }
            }
          }
          return acc;
        }, {});

        setCategories(Object.values(categoryMap));
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }
  }, []);

  if (categories.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-semibold mb-8 text-center">Shop by Category</h2>
          <div className="text-center py-16">
            <Grid3X3 size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">No categories yet</h3>
            <p className="text-gray-400">Categories will appear here when products are added</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-semibold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
