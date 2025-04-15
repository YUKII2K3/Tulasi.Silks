import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'telugu' | 'tamil' | 'hindi' | 'english';

interface Translations {
  [key: string]: {
    telugu: string;
    tamil: string;
    hindi: string;
    english: string;
  };
}

const translations: Translations = {
  productAddSuccess: {
    telugu: "✅ ఉత్పత్తి విజయవంతంగా జోడించబడింది!",
    tamil: "✅ தயாரிப்பு வெற்றிகரமாக சேர்க்கப்பட்டது!",
    hindi: "✅ उत्पाद सफलतापूर्वक जोड़ा गया!",
    english: "✅ Product added successfully!"
  },
  previewTitle: {
    telugu: "👀 ఇది ఎలా కనిపిస్తుంది:",
    tamil: "👀 இது எப்படி தெரியும்:",
    hindi: "👀 यह कैसा दिखेगा:",
    english: "👀 This is how it will look:"
  },
  showInFeatured: {
    telugu: "ఈ ఉత్పత్తిని హోమ్‌పేజీలో చూపించు",
    tamil: "இந்த தயாரிப்பை முகப்பு பக்கத்தில் காட்டு",
    hindi: "इस उत्पाद को होमपेज पर दिखाएं",
    english: "Show this product on homepage"
  },
  uploadImage: {
    telugu: "చిత్రాన్ని అప్‌లోడ్ చేయండి",
    tamil: "படத்தை பதிவேற்றவும்",
    hindi: "छवि अपलोड करें",
    english: "Upload Image"
  },
  selectFromGallery: {
    telugu: "గ్యాలరీ నుండి ఎంచుకోండి",
    tamil: "கேலரியில் இருந்து தேர்ந்தெடுக்கவும்",
    hindi: "गैलरी से चुनें",
    english: "Select from Gallery"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('telugu');

  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language') as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.english || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 