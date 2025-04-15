
import React, { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const heroStyle = {
    height: `${theme.heroHeight}vh`,
    minHeight: '400px',
  };

  return (
    <div className="relative bg-saree-cream py-16 md:py-24" style={heroStyle}>
      <div className="container mx-auto px-4 md:px-6 h-full">
        <div className="flex flex-col md:flex-row items-center h-full">
          {/* Text Content */}
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
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
            
            <Button asChild className="bg-saree-maroon hover:bg-saree-light-maroon text-white px-6 py-3 rounded">
              <a href="/shop">Shop Now <ArrowRight size={16} className="ml-2" /></a>
            </Button>
          </div>
          
          {/* Empty Hero Image Placeholder */}
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-gray-100 rounded-lg p-10 flex flex-col items-center justify-center w-full h-80">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-center">Hero image will appear here after uploading in admin panel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
