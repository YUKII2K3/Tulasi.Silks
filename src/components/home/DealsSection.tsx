
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Gift } from 'lucide-react';

const DealsSection = () => {
  // Flag to check if we have products for deals section
  const hasDealsProducts = false;
  const hasNewArrivals = false;

  if (!hasDealsProducts && !hasNewArrivals) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sales Banner Placeholder */}
            <div className="bg-saree-cream rounded-lg overflow-hidden shadow-sm relative p-8">
              <div className="max-w-sm">
                <h3 className="text-2xl font-playfair font-semibold mb-2">
                  Sales
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover our exclusive collection at special prices. Limited time offer.
                </p>
                <div className="inline-block bg-saree-gold text-white px-3 py-1 rounded-full text-sm font-bold mb-6">
                  UP TO 30% OFF
                </div>
                <Link 
                  to="/sales" 
                  className="inline-flex items-center text-saree-maroon hover:text-saree-gold transition-colors"
                >
                  Shop Now <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              <div className="absolute bottom-0 right-0 flex items-end justify-end p-4">
                <div className="bg-white bg-opacity-80 p-3 rounded-full">
                  <ShoppingBag size={40} className="text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* New Arrivals Banner Placeholder */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm relative p-8">
              <div className="max-w-sm">
                <h3 className="text-2xl font-playfair font-semibold mb-2">
                  New Arrivals!
                </h3>
                <p className="text-gray-600 mb-4">
                  Be the first to explore our latest collection of trendsetting designs.
                </p>
                <div className="inline-block bg-saree-maroon text-white px-3 py-1 rounded-full text-sm font-bold mb-6">
                  JUST LANDED
                </div>
                <Link 
                  to="/new-arrivals" 
                  className="inline-flex items-center text-saree-maroon hover:text-saree-gold transition-colors"
                >
                  Explore <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              <div className="absolute bottom-0 right-0 flex items-end justify-end p-4">
                <div className="bg-white bg-opacity-80 p-3 rounded-full">
                  <Gift size={40} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sales Banner */}
          <div className="bg-saree-cream rounded-lg overflow-hidden shadow-sm relative p-8">
            <div className="max-w-sm">
              <h3 className="text-2xl font-playfair font-semibold mb-2">
                Sales
              </h3>
              <p className="text-gray-600 mb-4">
                Discover our exclusive collection at special prices. Limited time offer.
              </p>
              <div className="inline-block bg-saree-gold text-white px-3 py-1 rounded-full text-sm font-bold mb-6">
                UP TO 30% OFF
              </div>
              <Link 
                to="/sales" 
                className="inline-flex items-center text-saree-maroon hover:text-saree-gold transition-colors"
              >
                Shop Now <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            {/* Image will be loaded from product data when admin adds it */}
          </div>
          
          {/* New Arrivals Banner */}
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm relative p-8">
            <div className="max-w-sm">
              <h3 className="text-2xl font-playfair font-semibold mb-2">
                New Arrivals!
              </h3>
              <p className="text-gray-600 mb-4">
                Be the first to explore our latest collection of trendsetting designs.
              </p>
              <div className="inline-block bg-saree-maroon text-white px-3 py-1 rounded-full text-sm font-bold mb-6">
                JUST LANDED
              </div>
              <Link 
                to="/new-arrivals" 
                className="inline-flex items-center text-saree-maroon hover:text-saree-gold transition-colors"
              >
                Explore <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            {/* Image will be loaded from product data when admin adds it */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
