
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid3X3 } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  link: string;
  description: string;
}

// Improved category card with description
const CategoryCard: React.FC<CategoryCardProps> = ({ title, link, description }) => {
  return (
    <Link to={link} className="category-card block transform transition duration-300 hover:scale-105">
      <div className="aspect-square relative overflow-hidden rounded-md bg-white shadow-sm hover:shadow-md">
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center">
            <Grid3X3 size={32} className="text-gray-400" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
          <h3 className="font-playfair text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-200 mt-1 line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
};

const Categories = () => {
  // Enhanced category data with descriptions
  const categories = [
    { 
      title: 'Silk Sarees', 
      link: '/category/silk',
      description: 'Luxurious silk sarees for special occasions'
    },
    { 
      title: 'Cotton Sarees', 
      link: '/category/cotton',
      description: 'Comfortable cotton sarees for everyday wear'
    },
    { 
      title: 'Designer Sarees', 
      link: '/category/designer',
      description: 'Unique designer collections for the fashion-forward'
    },
    { 
      title: 'Traditional Sarees', 
      link: '/category/traditional',
      description: 'Classic designs celebrating Indian heritage'
    },
    { 
      title: 'Modern Sarees', 
      link: '/category/modern',
      description: 'Contemporary styles for the modern woman'
    },
    { 
      title: 'Bridal Sarees', 
      link: '/category/bridal',
      description: 'Exquisite bridal collections for your special day'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-semibold mb-3">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our diverse collection of sarees categorized by fabric, style, and occasion</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              title={category.title}
              link={category.link}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
