import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = () => {
      const savedProducts = localStorage.getItem('saree-shop-products');
      if (savedProducts) {
        try {
          const products = JSON.parse(savedProducts);
          const foundProduct = products.find((p: any) => p.id.toString() === id);
          if (foundProduct) {
            setProduct(foundProduct);
          }
        } catch (error) {
          console.error("Error loading product:", error);
        }
      }
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-24 bg-gray-200 rounded mb-8"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-medium text-gray-800 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/shop')}>
            Continue Shopping
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4">
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-medium text-saree-maroon mb-6">
              ₹{product.price.toLocaleString()}
            </p>
            <div className="prose max-w-none mb-8">
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="space-y-4">
              <Button className="w-full bg-saree-maroon hover:bg-saree-maroon/90">
                Add to Cart
              </Button>
              <Button variant="outline" className="w-full">
                Add to Wishlist
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 border-t pt-8">
              <h3 className="font-medium text-lg mb-4">Product Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Category: {product.category}</li>
                <li>SKU: {product.id}</li>
                <li>Availability: In Stock</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails; 