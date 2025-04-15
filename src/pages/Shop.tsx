
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingBag, Search, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  isNew?: boolean;
  discount?: number;
  rating?: number;
}

const Shop = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Extract search query from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      setSearchQuery(query);
      toast({
        title: "Search initiated",
        description: `Showing results for "${query}"`,
      });
    }
  }, [location.search, toast]);
  
  // Sample categories
  const categories = ['Silk', 'Cotton', 'Designer', 'Traditional', 'Modern', 'Bridal'];
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search updated",
        description: `Showing results for "${searchQuery}"`,
      });
    }
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  // Sample product data structure (empty for now)
  const products: Product[] = [];

  return (
    <Layout>
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-playfair font-bold text-center mb-2">Shop All Sarees</h1>
          <p className="text-center text-gray-600 mb-8">Discover our exquisite collection</p>
          
          {/* Search bar (appears if there's a search query) */}
          {searchQuery && (
            <div className="mb-6">
              <div className="flex items-center justify-center max-w-2xl mx-auto">
                <form onSubmit={handleSearch} className="flex w-full">
                  <input
                    type="text"
                    placeholder="Search sarees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 w-full border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-saree-gold"
                  />
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="bg-gray-200 px-3 flex items-center justify-center"
                  >
                    <X size={16} className="text-gray-500" />
                  </button>
                  <button
                    type="submit"
                    className="bg-saree-gold text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors flex items-center"
                  >
                    <Search size={18} className="mr-1" /> Search
                  </button>
                </form>
              </div>
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 font-playfair">Filters</h2>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Range</h3>
                <Slider 
                  defaultValue={[0, 10000]} 
                  min={0} 
                  max={30000} 
                  step={500}
                  onValueChange={(value) => setPriceRange(value)}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox 
                        id={`category-${category}`} 
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="ml-2">{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sort By */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Sort By</h3>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="bestselling">Bestselling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full bg-saree-maroon hover:bg-saree-maroon/90">Apply Filters</Button>
            </div>
            
            {/* Products Grid */}
            <div className="lg:w-3/4">
              {products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Product cards would go here if there were products */}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">
                    {searchQuery ? `No products found for "${searchQuery}"` : "No products found"}
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md">
                    Products will appear here after they are added from the admin panel
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
