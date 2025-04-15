
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ShoppingBag, ArrowLeft, Tag, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Convert slug to display name
  const getCategoryName = (slug: string | undefined) => {
    if (!slug) return 'Category';
    
    // Convert slug to title case
    return slug.charAt(0).toUpperCase() + slug.slice(1) + ' Sarees';
  };
  
  // Get description based on category slug
  const getCategoryDescription = (slug: string | undefined) => {
    switch(slug) {
      case 'silk':
        return 'Luxurious silk sarees crafted with precision and care. Perfect for weddings, special occasions, and traditional ceremonies.';
      case 'cotton':
        return 'Comfortable, breathable cotton sarees ideal for daily wear and casual occasions. Stay cool and stylish with our cotton collection.';
      case 'designer':
        return 'Exclusive designer sarees featuring innovative patterns, unique embellishments, and contemporary designs for the modern fashion enthusiast.';
      case 'traditional':
        return 'Timeless traditional sarees that celebrate India\'s rich cultural heritage and craftsmanship with authentic designs and techniques.';
      case 'modern':
        return 'Trendy and contemporary sarees for the fashion-forward woman who loves to stand out with bold patterns and innovative designs.';
      case 'bridal':
        return 'Exquisite bridal sarees featuring rich embroidery, premium fabrics, and intricate detailing to make your special day even more memorable.';
      default:
        return 'Explore our collection of beautiful sarees in this category.';
    }
  };
  
  return (
    <Layout>
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-600 hover:text-saree-maroon">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to="/categories" className="text-gray-600 hover:text-saree-maroon">
                    Categories
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">{getCategoryName(slug)}</span>
                </div>
              </li>
            </ol>
          </nav>
          
          <div className="flex items-center gap-4 mb-6">
            <Link to="/categories" className="inline-flex items-center text-gray-600 hover:text-saree-maroon">
              <ArrowLeft size={16} className="mr-1" />
              Back to Categories
            </Link>
            
            <Separator orientation="vertical" className="h-6" />
            
            <div className="flex items-center text-gray-600">
              <Tag size={16} className="mr-1" />
              <span>{getCategoryName(slug)}</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h1 className="text-4xl font-playfair font-bold mb-3">{getCategoryName(slug)}</h1>
            <p className="text-gray-600 mb-6 max-w-3xl">{getCategoryDescription(slug)}</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                Filter Options
              </Button>
              
              <span className="text-gray-500">0 products</span>
            </div>
          </div>
          
          {/* Empty state */}
          <div className="bg-white rounded-lg p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No products in this category yet</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Products will appear here after they are added from the admin panel
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline">
                <Link to="/shop">Browse All Products</Link>
              </Button>
              <Button asChild className="bg-saree-maroon hover:bg-saree-maroon/90">
                <Link to="/categories">Explore Other Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
