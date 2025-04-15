
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import DealsSection from '@/components/home/DealsSection';
import LimitedOffer from '@/components/home/LimitedOffer';
import ContactSection from '@/components/home/ContactSection';

const Index = () => {
  // In a real implementation, these would be determined by checking if products exist
  // in each category via API calls or context
  const showFeaturedProducts = false;
  const showDealsSection = false;
  const showLimitedOffer = false;

  return (
    <Layout>
      <Hero />
      <Categories />
      {showFeaturedProducts && <FeaturedProducts />}
      {showDealsSection && <DealsSection />}
      {showLimitedOffer && <LimitedOffer />}
      <ContactSection />
    </Layout>
  );
};

export default Index;
