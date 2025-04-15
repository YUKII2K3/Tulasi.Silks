
import React from 'react';
import Layout from '@/components/layout/Layout';
import ContactSection from '@/components/home/ContactSection';

const Contact = () => {
  return (
    <Layout>
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-playfair font-bold text-center mb-8">Contact</h1>
        </div>
      </div>
      <ContactSection />
    </Layout>
  );
};

export default Contact;
