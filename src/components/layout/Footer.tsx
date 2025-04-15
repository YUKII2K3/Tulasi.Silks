
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, ExternalLink } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Footer = () => {
  const { storeInfo } = useTheme();
  
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-playfair font-semibold text-saree-maroon mb-4">{storeInfo.storeName}</h3>
            <p className="text-gray-600 mb-4">
              {storeInfo.storeDescription}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-saree-gold">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-saree-gold">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-saree-gold">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="font-playfair font-medium text-gray-800 mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-saree-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-saree-gold transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/care" className="text-gray-600 hover:text-saree-gold transition-colors">
                  Saree Care Guide
                </Link>
              </li>
              <li>
                <Link to="/sizing" className="text-gray-600 hover:text-saree-gold transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-saree-gold transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="md:col-span-1">
            <h4 className="font-playfair font-medium text-gray-800 mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/silk" className="text-gray-600 hover:text-saree-gold transition-colors">
                  Silk Sarees
                </Link>
              </li>
              <li>
                <Link to="/category/cotton" className="text-gray-600 hover:text-saree-gold transition-colors">
                  Cotton Sarees
                </Link>
              </li>
              <li>
                <Link to="/category/designer" className="text-gray-600 hover:text-saree-gold transition-colors">
                  Designer Sarees
                </Link>
              </li>
              <li>
                <Link to="/category/bridal" className="text-gray-600 hover:text-saree-gold transition-colors">
                  Bridal Collection
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-gray-600 hover:text-saree-gold transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-1">
            <h4 className="font-playfair font-medium text-gray-800 mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="text-saree-gold mt-1 mr-2" />
                <a 
                  href={storeInfo.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-saree-gold group"
                >
                  <span>
                    {storeInfo.storeName}, <br/>
                    {storeInfo.storeAddress}, <br/>
                    {storeInfo.storeCity}, {storeInfo.storeState} {storeInfo.storeZip} <br/>
                    India
                  </span>
                  <span className="inline-flex items-center text-saree-gold ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={12} />
                  </span>
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-saree-gold mr-2" />
                <a href={`tel:${storeInfo.storePhone}`} className="text-gray-600 hover:text-saree-gold">
                  {storeInfo.storePhone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="text-saree-gold mr-2" />
                <a href={`mailto:${storeInfo.storeEmail}`} className="text-gray-600 hover:text-saree-gold">
                  {storeInfo.storeEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {storeInfo.storeName}. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/terms" className="hover:text-saree-gold">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-saree-gold">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
