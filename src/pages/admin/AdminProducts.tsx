
import React, { useState, useCallback, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Edit, Plus, Trash2, Search, Filter, FilterX } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  showInHero: boolean;
  showInFeatured: boolean;
  showInCategories: boolean;
  showInDeals: boolean;
  showInLimitedOffer: boolean;
  showInBlog: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Function to get products from localStorage or use default empty array
const getInitialProducts = (): Product[] => {
  const savedProducts = localStorage.getItem('saree-shop-products');
  if (savedProducts) {
    try {
      return JSON.parse(savedProducts);
    } catch (error) {
      console.error("Error parsing saved products:", error);
      return [];
    }
  }
  return [];
};

const AdminProducts = () => {
  const { isAdmin } = useAuth();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  
  const [products, setProducts] = useState<Product[]>(getInitialProducts());
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: 0,
    image: "",
    description: "",
    inStock: true,
    showInHero: false,
    showInFeatured: false,
    showInCategories: false,
    showInDeals: false,
    showInLimitedOffer: false,
    showInBlog: false
  });

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('saree-shop-products', JSON.stringify(products));
  }, [products]);

  // Filter products based on search query and category filter
  useEffect(() => {
    let result = [...products];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    setFilteredProducts(result);
  }, [products, searchQuery, categoryFilter]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
  };
  
  const handleAddProduct = () => {
    const nowDate = new Date();
    
    const product = {
      ...newProduct,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      createdAt: nowDate,
      updatedAt: nowDate
    };
    
    setProducts([...products, product]);
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      image: "",
      description: "",
      inStock: true,
      showInHero: false,
      showInFeatured: false,
      showInCategories: false,
      showInDeals: false,
      showInLimitedOffer: false,
      showInBlog: false
    });
    
    setIsAddDialogOpen(false);
    
    toast.success("Product added", {
      description: `${product.name} has been added to the catalog.`,
    });
  };
  
  const handleEditProduct = () => {
    if (!currentProduct) return;
    
    const updatedProduct = {
      ...currentProduct,
      updatedAt: new Date()
    };
    
    const updatedProducts = products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    
    setProducts(updatedProducts);
    setIsEditDialogOpen(false);
    
    toast.success("Product updated", {
      description: `${currentProduct.name} has been updated.`,
    });
  };
  
  const handleDeleteProduct = (id: number) => {
    const productToDelete = products.find(p => p.id === id);
    
    if (!productToDelete) return;
    
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    
    toast.success("Product deleted", {
      description: `${productToDelete?.name} has been removed from the catalog.`,
    });
  };
  
  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  // Product count statistics
  const productCounts = {
    total: products.length,
    hero: products.filter(p => p.showInHero).length,
    featured: products.filter(p => p.showInFeatured).length,
    categories: products.filter(p => p.showInCategories).length,
    deals: products.filter(p => p.showInDeals).length,
    limitedOffer: products.filter(p => p.showInLimitedOffer).length,
    blog: products.filter(p => p.showInBlog).length
  };

  // Get unique categories for filter
  const uniqueCategories = Array.from(new Set(products.map(p => p.category)))
    .filter(Boolean)
    .sort();

  return (
    <AdminLayout title="Products">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-medium">Product Catalog</h2>
          <div className="text-sm text-gray-500 mt-1">
            Total Products: {productCounts.total} 
            {productCounts.total > 0 && (
              <span className="hidden md:inline">
                | Hero: {productCounts.hero} 
                | Featured: {productCounts.featured} 
                | Categories: {productCounts.categories} 
                | Deals: {productCounts.deals}
                | Limited Offers: {productCounts.limitedOffer}
                | Blog: {productCounts.blog}
              </span>
            )}
          </div>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-saree-maroon hover:bg-saree-maroon/90">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new product to your catalog. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input 
                  id="name" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <ImageUploader 
                  value={newProduct.image} 
                  onChange={(value) => setNewProduct({...newProduct, image: value})}
                  aspectRatio="1/1"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="silk">Silk</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="bridal">Bridal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input 
                  id="price"
                  type="number" 
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <Label>Display Options</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="show-hero" 
                      checked={newProduct.showInHero}
                      onCheckedChange={(checked) => 
                        setNewProduct({...newProduct, showInHero: checked as boolean})
                      }
                    />
                    <label htmlFor="show-hero">Show in Hero Section</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="show-featured" 
                      checked={newProduct.showInFeatured}
                      onCheckedChange={(checked) => 
                        setNewProduct({...newProduct, showInFeatured: checked as boolean})
                      }
                    />
                    <label htmlFor="show-featured">Show in Featured Products</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="show-categories" 
                      checked={newProduct.showInCategories}
                      onCheckedChange={(checked) => 
                        setNewProduct({...newProduct, showInCategories: checked as boolean})
                      }
                    />
                    <label htmlFor="show-categories">Show in Categories</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="show-deals" 
                      checked={newProduct.showInDeals}
                      onCheckedChange={(checked) => 
                        setNewProduct({...newProduct, showInDeals: checked as boolean})
                      }
                    />
                    <label htmlFor="show-deals">Show in Deals</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="show-limited-offer" 
                      checked={newProduct.showInLimitedOffer}
                      onCheckedChange={(checked) => 
                        setNewProduct({...newProduct, showInLimitedOffer: checked as boolean})
                      }
                    />
                    <label htmlFor="show-limited-offer">Show in Limited Offers</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="show-blog" 
                      checked={newProduct.showInBlog}
                      onCheckedChange={(checked) => 
                        setNewProduct({...newProduct, showInBlog: checked as boolean})
                      }
                    />
                    <label htmlFor="show-blog">Show in Blog</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={handleAddProduct} 
                className="bg-saree-maroon hover:bg-saree-maroon/90"
                disabled={!newProduct.name || !newProduct.category}
              >
                Save Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Search and filter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <div className="flex space-x-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>
                      {categoryFilter === 'all' 
                        ? 'All Categories' 
                        : categoryFilter}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {(searchQuery || categoryFilter !== 'all') && (
                <Button variant="ghost" onClick={resetFilters} size="icon">
                  <FilterX className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="overflow-x-auto rounded-md shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  {searchQuery || categoryFilter !== 'all' ? (
                    <>
                      <p>No products match your search criteria</p>
                      <Button 
                        variant="link" 
                        onClick={resetFilters} 
                        className="mt-2 text-saree-maroon hover:text-saree-gold"
                      >
                        Clear filters
                      </Button>
                    </>
                  ) : (
                    <>No products yet. Click "Add Product" to create your first product.</>
                  )}
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {product.image ? (
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt={product.name} />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-500 text-xs">No image</span>
                        </div>
                      )}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="hidden md:flex flex-wrap gap-1 mt-1 max-w-xs">
                          {product.showInHero && <Badge variant="outline" className="text-xs">Hero</Badge>}
                          {product.showInFeatured && <Badge variant="outline" className="text-xs">Featured</Badge>}
                          {product.showInCategories && <Badge variant="outline" className="text-xs">Categories</Badge>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{product.price.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        onClick={() => openEditDialog(product)}
                        variant="outline" 
                        size="sm"
                        className="text-gray-600 hover:text-saree-maroon"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={() => handleDeleteProduct(product.id)}
                        variant="outline" 
                        size="sm"
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update product information. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Product Name</Label>
                <Input 
                  id="edit-name" 
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <ImageUploader 
                  value={currentProduct.image} 
                  onChange={(value) => setCurrentProduct({...currentProduct, image: value})}
                  aspectRatio="1/1"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  value={currentProduct.category}
                  onValueChange={(value) => setCurrentProduct({...currentProduct, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="silk">Silk</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="bridal">Bridal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price (₹)</Label>
                <Input 
                  id="edit-price"
                  type="number" 
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({...currentProduct, price: Number(e.target.value)})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <Label>Display Options</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-show-hero" 
                      checked={currentProduct.showInHero}
                      onCheckedChange={(checked) => 
                        setCurrentProduct({...currentProduct, showInHero: checked as boolean})
                      }
                    />
                    <label htmlFor="edit-show-hero">Show in Hero Section</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-show-featured" 
                      checked={currentProduct.showInFeatured}
                      onCheckedChange={(checked) => 
                        setCurrentProduct({...currentProduct, showInFeatured: checked as boolean})
                      }
                    />
                    <label htmlFor="edit-show-featured">Show in Featured Products</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-show-categories" 
                      checked={currentProduct.showInCategories}
                      onCheckedChange={(checked) => 
                        setCurrentProduct({...currentProduct, showInCategories: checked as boolean})
                      }
                    />
                    <label htmlFor="edit-show-categories">Show in Categories</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-show-deals" 
                      checked={currentProduct.showInDeals}
                      onCheckedChange={(checked) => 
                        setCurrentProduct({...currentProduct, showInDeals: checked as boolean})
                      }
                    />
                    <label htmlFor="edit-show-deals">Show in Deals</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-show-limited-offer" 
                      checked={currentProduct.showInLimitedOffer}
                      onCheckedChange={(checked) => 
                        setCurrentProduct({...currentProduct, showInLimitedOffer: checked as boolean})
                      }
                    />
                    <label htmlFor="edit-show-limited-offer">Show in Limited Offers</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-show-blog" 
                      checked={currentProduct.showInBlog}
                      onCheckedChange={(checked) => 
                        setCurrentProduct({...currentProduct, showInBlog: checked as boolean})
                      }
                    />
                    <label htmlFor="edit-show-blog">Show in Blog</label>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button 
              onClick={handleEditProduct} 
              className="bg-saree-maroon hover:bg-saree-maroon/90"
              disabled={!currentProduct?.name || !currentProduct?.category}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProducts;
