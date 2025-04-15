
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, storeInfo } = useTheme();
  const { user } = useAuth();
  
  // Create CSS variables for the theme
  const themeStyle = {
    '--primary-color': theme.primaryColor,
    '--secondary-color': theme.secondaryColor,
    '--base-font-size': `${theme.fontSize}px`,
    '--section-spacing': `${theme.sectionSpacing}px`,
    '--hero-height': `${theme.heroHeight}vh`,
    '--store-name': `"${storeInfo.storeName}"`,
  } as React.CSSProperties;

  // Apply theme to document body
  useEffect(() => {
    document.body.style.fontFamily = `${theme.fontFamily}, sans-serif`;
    document.body.style.fontSize = `${theme.fontSize}px`;
    
    // Set a document title including the store name
    document.title = `${storeInfo.storeName} - Handcrafted Sarees`;
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', storeInfo.storeDescription);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = storeInfo.storeDescription;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, [theme, storeInfo]);

  return (
    <div 
      className="flex flex-col min-h-screen" 
      style={themeStyle}
    >
      <style>{`
        /* Override Tailwind classes with CSS variables */
        .bg-saree-maroon {
          background-color: var(--primary-color) !important;
        }
        
        .bg-saree-gold {
          background-color: var(--secondary-color) !important;
        }
        
        .text-saree-maroon {
          color: var(--primary-color) !important;
        }
        
        .text-saree-gold {
          color: var(--secondary-color) !important;
        }
        
        .border-saree-maroon {
          border-color: var(--primary-color) !important;
        }
        
        .border-saree-gold {
          border-color: var(--secondary-color) !important;
        }
        
        section {
          padding-top: var(--section-spacing);
          padding-bottom: var(--section-spacing);
        }

        /* Ensure theme variables apply to all elements */
        :root {
          --primary-color: ${theme.primaryColor};
          --secondary-color: ${theme.secondaryColor};
        }
      `}</style>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
