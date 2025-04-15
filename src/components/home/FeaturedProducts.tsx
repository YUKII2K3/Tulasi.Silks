
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Package } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  discountPrice?: number;
  isNew?: boolean;
  isSale?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  image, 
  discountPrice, 
  isNew, 
  isSale 
}) => {
  return (
    <div className="product-card">
      {/* Product Image with overlay */}
      <div className="relative group overflow-hidden">
        <Link to={`/product/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-72 object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* Status Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {isNew && (
            <span className="bg-saree-teal text-white text-xs font-bold px-2 py-1 rounded">
              NEW
            </span>
          )}
          {isSale && (
            <span className="bg-saree-burgundy text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </span>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-saree-gold hover:text-white transition-colors">
            <Heart size={18} />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-saree-gold hover:text-white transition-colors">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${id}`} className="block">
          <h3 className="font-medium text-gray-800 hover:text-saree-gold transition-colors mb-1">
            {name}
          </h3>
        </Link>
        <div className="flex items-center">
          {discountPrice ? (
            <>
              <span className="text-saree-maroon font-medium">${discountPrice}</span>
              <span className="text-gray-400 line-through ml-2">${price}</span>
            </>
          ) : (
            <span className="text-saree-maroon font-medium">${price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  // Empty products array - will be populated when the admin adds products
  const products: ProductCardProps[] = [];

  // If no products, show placeholder message
  if (products.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-playfair font-semibold">Popular Picks</h2>
          </div>
          
          <div className="text-center py-16">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">No featured products yet</h3>
            <p className="text-gray-400">Products added by the admin will appear here.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-playfair font-semibold">Popular Picks</h2>
          <div className="flex gap-2">
            <button className="text-gray-400 hover:text-saree-gold">
              &#8592;
            </button>
            <button className="text-gray-400 hover:text-saree-gold">
              &#8594;
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/shop" 
            className="inline-block border-2 border-saree-gold text-saree-gold px-6 py-3 rounded hover:bg-saree-gold hover:text-white transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
