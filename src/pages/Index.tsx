import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import DealsSection from '@/components/home/DealsSection';
import LimitedOffer from '@/components/home/LimitedOffer';
import ContactSection from '@/components/home/ContactSection';

const Index = () => {
  // Show sections if products exist
  const showFeaturedProducts = true;
  const showDealsSection = true;
  const showLimitedOffer = true;

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
