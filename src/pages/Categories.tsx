
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Grid3X3, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryProps {
  id: number;
  name: string;
  description: string;
  count: number;
  slug: string;
}

const CategoryCard: React.FC<CategoryProps> = ({ name, description, count, slug }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/category/${slug}`} className="block relative">
        <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Grid3X3 size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500">No image available</p>
          </div>
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
  const categories = [
    {
      id: 1,
      name: 'Silk Sarees',
      description: 'Luxurious silk sarees crafted from the finest silk yarns, featuring intricate patterns and designs.',
      count: 0,
      slug: 'silk'
    },
    {
      id: 2,
      name: 'Cotton Sarees',
      description: 'Comfortable and breathable cotton sarees perfect for daily wear and casual occasions.',
      count: 0,
      slug: 'cotton'
    },
    {
      id: 3,
      name: 'Designer Sarees',
      description: 'Contemporary designer sarees with innovative patterns and embellishments for a modern look.',
      count: 0,
      slug: 'designer'
    },
    {
      id: 4,
      name: 'Traditional Sarees',
      description: 'Classic traditional sarees that showcase India\'s rich cultural heritage and craftsmanship.',
      count: 0,
      slug: 'traditional'
    },
    {
      id: 5,
      name: 'Modern Sarees',
      description: 'Trendy and contemporary sarees for the fashion-forward woman who loves to stand out.',
      count: 0,
      slug: 'modern'
    },
    {
      id: 6,
      name: 'Bridal Sarees',
      description: 'Exquisite bridal sarees featuring rich embroidery, embellishments, and premium fabrics.',
      count: 0,
      slug: 'bridal'
    }
  ];

  return (
    <Layout>
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-playfair font-bold mb-2">Saree Categories</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Find the perfect saree by fabric, style, and occasion</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(category => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
