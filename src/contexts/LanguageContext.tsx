import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'pa' | 'te';

interface LanguageContextType {
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'crop.recommendations': 'Crop Recommendations',
    'location': 'Location',
    'soil': 'Soil',
    'season': 'Season',
    'suitable': 'Suitable',
    
    // Form
    'enter.location': 'Enter your location',
    'detect.location': 'Detect My Location',
    'select.soil': 'Select Soil Type',
    'select.season': 'Select Season',
    'get.recommendations': 'Get Crop Recommendations',
    
    // Soil types
    'clay': 'Clay',
    'sandy': 'Sandy',
    'loam': 'Loam',
    'black': 'Black Soil',
    'red': 'Red Soil',
    
    // Seasons
    'kharif': 'Kharif (Monsoon)',
    'rabi': 'Rabi (Winter)',
    'zaid': 'Zaid (Summer)',
    
    // Metrics
    'quintals.hectare': 'Quintals per hectare',
    'profit.hectare': 'Profit per hectare',
    'water.requirement': 'Water requirement',
    'fertilizer.advice': 'Fertilizer Advice',
    'pest.control': 'Pest Control',
    
    // Navigation
    'back.form': 'Back to Form',
  },
  hi: {
    // Header
    'crop.recommendations': 'फसल सुझाव',
    'location': 'स्थान',
    'soil': 'मिट्टी',
    'season': 'मौसम',
    'suitable': 'उपयुक्त',
    
    // Form
    'enter.location': 'अपना स्थान दर्ज करें',
    'detect.location': 'मेरा स्थान खोजें',
    'select.soil': 'मिट्टी का प्रकार चुनें',
    'select.season': 'मौसम चुनें',
    'get.recommendations': 'फसल सुझाव प्राप्त करें',
    
    // Soil types
    'clay': 'चिकनी मिट्टी',
    'sandy': 'रेतीली मिट्टी',
    'loam': 'दोमट मिट्टी',
    'black': 'काली मिट्टी',
    'red': 'लाल मिट्टी',
    
    // Seasons
    'kharif': 'खरीफ (बारिश)',
    'rabi': 'रबी (सर्दी)',
    'zaid': 'जायद (गर्मी)',
    
    // Metrics
    'quintals.hectare': 'क्विंटल प्रति हेक्टेयर',
    'profit.hectare': 'लाभ प्रति हेक्टेयर',
    'water.requirement': 'पानी की जरूरत',
    'fertilizer.advice': 'उर्वरक सलाह',
    'pest.control': 'कीड़े नियंत्रण',
    
    // Navigation
    'back.form': 'फॉर्म पर वापस जाएं',
  },
  pa: {
    // Header
    'crop.recommendations': 'ਫਸਲ ਸੁਝਾਅ',
    'location': 'ਸਥਾਨ',
    'soil': 'ਮਿੱਟੀ',
    'season': 'ਮੌਸਮ',
    'suitable': 'ਢੁਕਵਾਂ',
    
    // Form
    'enter.location': 'ਆਪਣਾ ਸਥਾਨ ਦਾਖਲ ਕਰੋ',
    'detect.location': 'ਮੇਰਾ ਸਥਾਨ ਲੱਭੋ',
    'select.soil': 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਚੁਣੋ',
    'select.season': 'ਮੌਸਮ ਚੁਣੋ',
    'get.recommendations': 'ਫਸਲ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ',
    
    // Soil types
    'clay': 'ਚਿਕਨੀ ਮਿੱਟੀ',
    'sandy': 'ਰੇਤਲੀ ਮਿੱਟੀ',
    'loam': 'ਦੋਮਟ ਮਿੱਟੀ',
    'black': 'ਕਾਲੀ ਮਿੱਟੀ',
    'red': 'ਲਾਲ ਮਿੱਟੀ',
    
    // Seasons
    'kharif': 'ਖਰੀਫ (ਮਾਨਸੂਨ)',
    'rabi': 'ਰਬੀ (ਸਰਦੀ)',
    'zaid': 'ਜ਼ਾਇਦ (ਗਰਮੀ)',
    
    // Metrics
    'quintals.hectare': 'ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਹੈਕਟੇਅਰ',
    'profit.hectare': 'ਲਾਭ ਪ੍ਰਤੀ ਹੈਕਟੇਅਰ',
    'water.requirement': 'ਪਾਣੀ ਦੀ ਲੋੜ',
    'fertilizer.advice': 'ਖਾਦ ਸਲਾਹ',
    'pest.control': 'ਕੀੜੇ ਨਿਯੰਤਰਣ',
    
    // Navigation
    'back.form': 'ਫਾਰਮ ਤੇ ਵਾਪਸ ਜਾਓ',
  },
  te: {
    // Header
    'crop.recommendations': 'పంట సిఫార్సులు',
    'location': 'ప్రాంతం',
    'soil': 'మట్టి',
    'season': 'కాలం',
    'suitable': 'అనుకూలమైన',
    
    // Form
    'enter.location': 'మీ ప్రాంతాన్ని నమోదు చేయండి',
    'detect.location': 'నా ప్రాంతాన్ని గుర్తించండి',
    'select.soil': 'మట్టి రకాన్ని ఎంచుకోండి',
    'select.season': 'కాలాన్ని ఎంచుకోండి',
    'get.recommendations': 'పంట సిఫార్సులు పొందండి',
    
    // Soil types
    'clay': 'మట్టి మట్టి',
    'sandy': 'ఇసుక మట్టి',
    'loam': 'లోమ్ మట్టి',
    'black': 'నల్ల మట్టి',
    'red': 'ఎర్ర మట్టి',
    
    // Seasons
    'kharif': 'ఖరీఫ్ (వర్షాకాలం)',
    'rabi': 'రబీ (శీతాకాలం)',
    'zaid': 'జాయిద్ (వేసవి)',
    
    // Metrics
    'quintals.hectare': 'క్వింటల్స్ పర్ హెక్టార్',
    'profit.hectare': 'లాభం పర్ హెక్టార్',
    'water.requirement': 'నీటి అవసరం',
    'fertilizer.advice': 'ఎరువుల సలహా',
    'pest.control': 'పురుగుల నియంత్రణ',
    
    // Navigation
    'back.form': 'ఫారమ్‌కు తిరిగి వెళ్లండి',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('hi'); // Default to Hindi

  const t = (key: string): string => {
    return translations[currentLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, t }}>
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