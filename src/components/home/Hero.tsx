import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

interface HeroProduct {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [heroProducts, setHeroProducts] = useState<HeroProduct[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  useEffect(() => {
    // Load products from localStorage
    const savedProducts = localStorage.getItem('saree-shop-products');
    if (savedProducts) {
      try {
        const allProducts = JSON.parse(savedProducts);
        const heroProducts = allProducts.filter((p: any) => p.showInHero);
        setHeroProducts(heroProducts);
      } catch (error) {
        console.error("Error loading hero products:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Auto-slide every 5 seconds if there are multiple images
    if (heroProducts.length > 1) {
      const timer = setInterval(() => {
        handleNextSlide();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [heroProducts.length, currentSlide]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleNextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
      setTimeout(() => setIsAnimating(false), 500); // Match this with CSS transition duration
    }
  };

  const handlePrevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
      setTimeout(() => setIsAnimating(false), 500); // Match this with CSS transition duration
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const heroStyle = {
    height: `${theme.heroHeight || 80}vh`,
    minHeight: '400px',
  };

  return (
    <div className="relative bg-saree-cream overflow-hidden" style={heroStyle}>
      {heroProducts.length > 0 ? (
        <div className="relative h-full">
          {/* Slides Container */}
          <div className="absolute inset-0">
            {heroProducts.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40">
                  <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="text-white max-w-2xl animate-fade-in">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4">
                        {product.name}
                      </h1>
                      <p className="text-lg mb-8">
                        {product.description}
                      </p>
                      <Button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="bg-saree-gold hover:bg-saree-gold/90 text-white"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {heroProducts.length > 1 && (
            <>
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-20"
                disabled={isAnimating}
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-20"
                disabled={isAnimating}
              >
                <ArrowRight className="h-6 w-6" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {heroProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-white' : 'bg-white/50'
                    }`}
                    disabled={isAnimating}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="md:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-800 mb-4">
              Explore our collection of exquisite sarees for all occasions
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover elegance by fabric, design, or occasion
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex w-full max-w-md mb-8">
              <input
                type="text"
                placeholder="Search for your perfect saree here..."
                className="px-4 py-3 w-full border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-saree-gold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-saree-gold text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors flex items-center"
              >
                <Search size={18} className="mr-1" /> SEARCH
              </button>
            </form>
            
            <Button 
              onClick={() => navigate('/shop')}
              className="bg-saree-maroon hover:bg-saree-maroon/90 text-white px-6 py-3 rounded"
            >
              Shop Now <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
