
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeSettings = {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize: number;
  sectionSpacing: number;
  heroHeight: number;
};

// Default theme settings
const defaultThemeSettings: ThemeSettings = {
  primaryColor: "#800000", // Default maroon
  secondaryColor: "#d4af37", // Default gold
  fontFamily: "Playfair Display",
  fontSize: 16,
  sectionSpacing: 60,
  heroHeight: 80,
};

// Store information type
export type StoreInfo = {
  storeName: string;
  storeAddress: string;
  storeCity: string;
  storeState: string;
  storeZip: string;
  storePhone: string;
  storeEmail: string;
  storeDescription: string;
  googleMapsUrl: string;
};

// Default store information
export const defaultStoreInfo: StoreInfo = {
  storeName: "Tulasi Silks",
  storeAddress: "Gandhi Street, Srikalahasti",
  storeCity: "Tirupati",
  storeState: "ANDHRA PRADESH",
  storeZip: "517644",
  storePhone: "+91 9848313261",
  storeEmail: "tulasimp@gmail.com",
  storeDescription: "Premium collection of handcrafted sarees from across India",
  googleMapsUrl: "https://maps.app.goo.gl/wHa1KoqNK6ihE4JF8"
};

type ThemeContextType = {
  theme: ThemeSettings;
  updateTheme: (newTheme: Partial<ThemeSettings>) => void;
  resetTheme: () => void;
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
  storeInfo: StoreInfo;
  updateStoreInfo: (info: Partial<StoreInfo>) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeSettings>(defaultThemeSettings);
  const [isDirty, setIsDirty] = useState(false);
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(defaultStoreInfo);

  // Load theme and store info from localStorage on initial mount
  useEffect(() => {
    // Load theme settings
    const savedTheme = localStorage.getItem('saree-shop-theme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        console.log("Loading saved theme:", parsedTheme);
        setTheme(parsedTheme);
      } catch (error) {
        console.error("Error parsing saved theme:", error);
        // If error, use default theme
        localStorage.removeItem('saree-shop-theme');
      }
    }
    
    // Load store information
    const savedStoreInfo = localStorage.getItem('saree-shop-store-info');
    if (savedStoreInfo) {
      try {
        const parsedStoreInfo = JSON.parse(savedStoreInfo);
        console.log("Loading saved store info:", parsedStoreInfo);
        setStoreInfo({
          ...defaultStoreInfo, // Ensure we have defaults for any missing fields
          ...parsedStoreInfo
        });
      } catch (error) {
        console.error("Error parsing saved store info:", error);
        localStorage.setItem('saree-shop-store-info', JSON.stringify(defaultStoreInfo));
      }
    } else {
      // Initialize with default values if it doesn't exist
      localStorage.setItem('saree-shop-store-info', JSON.stringify(defaultStoreInfo));
    }
  }, []);

  // Update theme function
  const updateTheme = (newTheme: Partial<ThemeSettings>) => {
    const updatedTheme = { ...theme, ...newTheme };
    console.log("Updating theme to:", updatedTheme);
    setTheme(updatedTheme);
    setIsDirty(true);
    
    // Save to localStorage immediately to ensure changes persist
    localStorage.setItem('saree-shop-theme', JSON.stringify(updatedTheme));
  };

  // Update store info function
  const updateStoreInfo = (newInfo: Partial<StoreInfo>) => {
    const updatedInfo = { ...storeInfo, ...newInfo };
    console.log("Updating store info:", updatedInfo);
    setStoreInfo(updatedInfo);
    
    // Save to localStorage immediately
    localStorage.setItem('saree-shop-store-info', JSON.stringify(updatedInfo));
  };

  // Reset theme function
  const resetTheme = () => {
    console.log("Resetting theme to defaults");
    setTheme(defaultThemeSettings);
    localStorage.setItem('saree-shop-theme', JSON.stringify(defaultThemeSettings));
    setIsDirty(false);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      updateTheme, 
      resetTheme,
      isDirty,
      setIsDirty,
      storeInfo,
      updateStoreInfo
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
