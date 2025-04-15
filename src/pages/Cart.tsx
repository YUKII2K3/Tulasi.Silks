
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

const Cart = () => {
  // Empty cart state
  const cartItems = [];
  
  return (
    <Layout>
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-playfair font-bold text-center mb-2">Your Cart</h1>
          <p className="text-center text-gray-600 mb-8">Review your items before checkout</p>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            {cartItems.length > 0 ? (
              <div className="space-y-8">
                {/* Cart items would go here */}
                <div className="flex justify-between items-center pt-8 border-t">
                  <span className="text-xl font-semibold">Total:</span>
                  <span className="text-xl font-semibold text-saree-maroon">₹0.00</span>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-saree-gold hover:bg-saree-gold/90 px-8">
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag size={32} className="text-gray-400" />
                </div>
                <h2 className="text-2xl font-playfair mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">Add items to your cart to proceed with checkout</p>
                <Button 
                  className="bg-saree-maroon hover:bg-saree-light-maroon"
                  onClick={() => window.location.href = '/shop'}
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
