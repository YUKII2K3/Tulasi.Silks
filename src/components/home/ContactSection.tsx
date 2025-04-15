
import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const ContactSection = () => {
  const { storeInfo } = useTheme();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-semibold text-center mb-12">Contact Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-playfair font-semibold mb-6">Contact Details</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="text-saree-gold mr-4 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-gray-800">Phone</h4>
                  <p className="text-gray-600">{storeInfo.storePhone}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="text-saree-gold mr-4 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-gray-800">Email</h4>
                  <a href={`mailto:${storeInfo.storeEmail}`} className="text-gray-600 hover:text-saree-gold">
                    {storeInfo.storeEmail}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-saree-gold mr-4 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-gray-800">Location</h4>
                  <p className="text-gray-600">
                    {storeInfo.storeName}, <br />
                    {storeInfo.storeAddress}, <br />
                    {storeInfo.storeCity}, {storeInfo.storeState} {storeInfo.storeZip} <br />
                    India
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 h-48 overflow-hidden rounded-md">
              <a 
                href={storeInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative h-full"
              >
                <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-0 transition-all flex items-center justify-center z-10">
                  <div className="bg-white bg-opacity-80 rounded-md px-3 py-2 flex items-center">
                    <ExternalLink size={16} className="mr-1" />
                    <span className="text-sm font-medium">Open in Google Maps</span>
                  </div>
                </div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.454723151395!2d78.4158517!3d17.4841618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91df6b3c8b9d%3A0xb58f9f3b78c7eee8!2sTulasi%20Silks!5e0!3m2!1sen!2sin!4v1661234567890!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Tulasi Silks Location"
                  className="w-full h-full"
                ></iframe>
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-saree-cream p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-playfair font-semibold mb-6">Drop Us a Line</h3>
            
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-saree-gold"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-saree-gold"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-saree-gold"
                  placeholder="How can we help?"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-saree-gold"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-saree-gold hover:bg-opacity-90 text-white px-4 py-3 rounded-md transition-colors"
              >
                SEND
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
