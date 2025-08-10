'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Lock, Eye, Key } from 'lucide-react';
import { getTranslation } from '@/utils/translations';

// Define tips for all languages
const tipsByLanguage = {
  en: [
    {
      icon: <Shield className="h-5 w-5 text-green-500" />,
      title: "Use Strong Passwords",
      content: "Create unique passwords with at least 12 characters including numbers, symbols, and mixed case letters."
    },
    {
      icon: <Lock className="h-5 w-5 text-green-500" />,
      title: "Enable 2FA",
      content: "Two-factor authentication adds an extra layer of security to your accounts."
    },
    {
      icon: <Eye className="h-5 w-5 text-green-500" />,
      title: "Watch for Phishing",
      content: "Be cautious of suspicious emails, messages, or calls asking for personal information."
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      title: "Keep Software Updated",
      content: "Regularly update your operating system and applications to patch security vulnerabilities."
    },
    {
      icon: <Key className="h-5 w-5 text-green-500" />,
      title: "Use a Password Manager",
      content: "Password managers help you create and store strong, unique passwords securely."
    }
  ],
  hi: [
    {
      icon: <Shield className="h-5 w-5 text-green-500" />,
      title: "मजबूत पासवर्ड का उपयोग करें",
      content: "नंबर, प्रतीक और मिश्रित केस अक्षरों सहित कम से कम 12 वर्णों के साथ अद्वितीय पासवर्ड बनाएं।"
    },
    {
      icon: <Lock className="h-5 w-5 text-green-500" />,
      title: "2FA सक्षम करें",
      content: "दो-कारक प्रमाणीकरण आपके खातों में सुरक्षा की एक अतिरिक्त परत जोड़ता है।"
    },
    {
      icon: <Eye className="h-5 w-5 text-green-500" />,
      title: "फ़िशिंग के लिए देखें",
      content: "व्यक्तिगत जानकारी मांगने वाले संदिग्ध ईमेल, संदेशों या कॉलों के प्रति सावधान रहें।"
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      title: "सॉफ्टवेयर अपडेट रखें",
      content: "सुरक्षा कमजोरियों को पैच करने के लिए नियमित रूप से अपने ऑपरेटिंग सिस्टम और एप्लिकेशन अपडेट करें।"
    },
    {
      icon: <Key className="h-5 w-5 text-green-500" />,
      title: "पासवर्ड मैनेजर का उपयोग करें",
      content: "पासवर्ड मैनेजर आपको मजबूत, अद्वितीय पासवर्ड बनाने और सुरक्षित रूप से स्टोर करने में मदद करते हैं।"
    }
  ],
  ta: [
    {
      icon: <Shield className="h-5 w-5 text-green-500" />,
      title: "வலுவான கடவுச்சொற்களைப் பயன்படுத்துங்கள்",
      content: "எண்கள், சின்னங்கள் மற்றும் கலப்பு எழுத்துகளை உள்ளடக்கிய குறைந்தது 12 எழுத்துகளுடன் தனித்துவமான கடவுச்சொற்களை உருவாக்கவும்."
    },
    {
      icon: <Lock className="h-5 w-5 text-green-500" />,
      title: "2FA ஐ இயக்கவும்",
      content: "இரண்டு-காரணி அங்கீகாரம் உங்கள் கணக்குகளுக்கு கூடுதல் பாதுகாப்பு அடுக்கைச் சேர்க்கிறது."
    },
    {
      icon: <Eye className="h-5 w-5 text-green-500" />,
      title: "ஃபிஷிங்கைக் கவனியுங்கள்",
      content: "தனிப்பட்ட தகவல்களைக் கேட்கும் சந்தேகத்திற்குரிய மின்னஞ்சல்கள், செய்திகள் அல்லது அழைப்புகளைப் பற்றி எச்சரிக்கையாக இருங்கள்."
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      title: "மென்பொருளை புதுப்பித்த நிலையில் வைத்திருங்கள்",
      content: "பாதுகாப்பு பலவீனங்களை சரிசெய்ய உங்கள் இயக்க முறைமை மற்றும் பயன்பாடுகளை தொடர்ந்து புதுப்பிக்கவும்."
    },
    {
      icon: <Key className="h-5 w-5 text-green-500" />,
      title: "கடவுச்சொல் மேலாளரைப் பயன்படுத்துங்கள்",
      content: "கடவுச்சொல் மேலாளர்கள் வலுவான, தனித்துவமான கடவுச்சொற்களை உருவாக்கவும் பாதுகாப்பாக சேமிக்கவும் உதவுகின்றன."
    }
  ],
  te: [
    {
      icon: <Shield className="h-5 w-5 text-green-500" />,
      title: "బలమైన పాస్‌వర్డ్‌లను ఉపయోగించండి",
      content: "సంఖ్యలు, చిహ్నాలు మరియు మిశ్రమ కేస్ అక్షరాలతో కలిపి కనీసం 12 అక్షరాలతో ప్రత్యేకమైన పాస్‌వర్డ్‌లను సృష్టించండి."
    },
    {
      icon: <Lock className="h-5 w-5 text-green-500" />,
      title: "2FA ని ప్రారంభించండి",
      content: "రెండు-కారక ప్రమాణీకరణ మీ ఖాతాలకు అదనపు భద్రతా పొరను జోడిస్తుంది."
    },
    {
      icon: <Eye className="h-5 w-5 text-green-500" />,
      title: "ఫిషింగ్ కోసం చూడండి",
      content: "వ్యక్తిగత సమాచారాన్ని అడిగే అనుమానాస్పద ఇమెయిల్‌లు, సందేశాలు లేదా కాల్‌ల గురించి జాగ్రత్తగా ఉండండి."
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      title: "సాఫ్ట్‌వేర్‌ని నవీకరించి ఉంచండి",
      content: "భద్రతా లోపాలను పరిష్కరించడానికి మీ ఆపరేటింగ్ సిస్టమ్ మరియు అప్లికేశన్‌లను క్రమం తప్పకుండా నవీకరించండి."
    },
    {
      icon: <Key className="h-5 w-5 text-green-500" />,
      title: "పాస్‌వర్డ్ మేనేజర్‌ని ఉపయోగించండి",
      content: "పాస్‌వర్డ్ మేనేజర్‌లు నీవు బలమైన, ప్రత్యేకమైన పాస్‌వర్డ్‌లను సృష్టించడానికి మరియు సురక్షితంగా నిల్వ చేయడానికి సహాయపడುతాయి."
    }
  ],
  kn: [
    {
      icon: <Shield className="h-5 w-5 text-green-500" />,
      title: "ಬಲವಾದ ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ಬಳಸಿ",
      content: "ಸಂಖ್ಯೆಗಳು, ಚಿಹ್ನೆಗಳು ಮತ್ತು ಮಿಶ್ರ ಕೇಸ್ ಅಕ್ಷರಗಳನ್ನು ಒಳಗೊಂಡಂತೆ ಕನಿಷ್ಠ 12 ಅಕ್ಷರಗಳೊಂದಿಗೆ ಅನನ್ಯ ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ರಚಿಸಿ."
    },
    {
      icon: <Lock className="h-5 w-5 text-green-500" />,
      title: "2FA ಅನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ",
      content: "ಎರಡು-ಅಂಶ ದೃಢೀಕರಣವು ನಿಮ್ಮ ಖಾತೆಗಳಿಗೆ ಹೆಚ್ಚುವರಿ ಭದ್ರತಾ ಪದರವನ್ನು ಸೇರಿಸುತ್ತದೆ."
    },
    {
      icon: <Eye className="h-5 w-5 text-green-500" />,
      title: "ಫಿಷಿಂಗ್ ಗಾಗಿ ನೋಡಿ",
      content: "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಕೇಳುವ ಅನುಮಾನಾಸ್ಪದ ಇಮೇಲ್‌ಗಳು, ಸಂದೇಶಗಳು ಅಥವಾ ಕರೆಗಳ ಬಗ್ಗೆ ಎಚ್ಚರಿಕೆಯಿಂದಿರಿ."
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      title: "ಸಾಫ್ಟ್‌ವೇರ್ ಅನ್ನು ನವೀಕರಿಸಿ",
      content: "ಭದ್ರತಾ ದುರ್ಬಲತೆಗಳನ್ನು ಪ್ಯಾಚ್ ಮಾಡಲು ನಿಮ್ಮ ಆಪರೇಟಿಂಗ್ ಸಿಸ್ಟಮ್ ಮತ್ತು ಅಪ್ಲಿಕೇಶನ್‌ಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ನವೀಕರಿಸಿ."
    },
    {
      icon: <Key className="h-5 w-5 text-green-500" />,
      title: "ಪಾಸ್‌ವರ್ಡ್ ಮ್ಯಾನೇಜರ್ ಬಳಸಿ",
      content: "ಪಾಸ್‌ವರ್ಡ್ ಮ್ಯಾನೇಜರ್‌ಗಳು ನೀವು ಬಲವಾದ, ಅನನ್ಯ ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ರಚಿಸಲು ಮತ್ತು ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ."
    }
  ],
  ml: [
    {
      icon: <Shield className="h-5 w-5 text-green-500" />,
      title: "ശക്തമായ പാസ്‌വേഡുകൾ ഉപയോഗിക്കുക",
      content: "നമ്പറുകൾ, ചിഹ്നങ്ങൾ, മിശ്രിത കേസ് അക്ഷരങ്ങൾ എന്നിവ ഉൾപ്പെടെ കുറഞ്ഞത് 12 അക്ഷരങ്ങളുള്ള അനന്യമായ പാസ്‌വേഡുകൾ സൃഷ്ടിക്കുക."
    },
    {
      icon: <Lock className="h-5 w-5 text-green-500" />,
      title: "2FA പ്രവർത്തനക്ഷമമാക്കുക",
      content: "രണ്ട്-ഘടക ആധികാരികത നിങ്ങളുടെ അക്കൗണ്ടുകളിൽ ഒരു അധിക സുരക്ഷാ പാളി ചേർക്കുന്നു."
    },
    {
      icon: <Eye className="h-5 w-5 text-green-500" />,
      title: "ഫിഷിംഗിനായി ശ്രദ്ധിക്കുക",
      content: "വ്യക്തിഗത വിവരങ്ങൾ ചോദിക്കുന്ന സംശയാസ്പദമായ ഇമെയിലുകൾ, സന്ദേശങ്ങൾ അല്ലെങ്കിൽ കോളുകളെക്കുറിച്ച് ജാഗ്രത പുലർത്തുക."
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      title: "സോഫ്റ്റ്‌വെയർ അപ്ഡേറ്റ് ചെയ്തു സൂക്ഷിക്കുക",
      content: "സുരക്ഷാ ദുർബലതകൾ പരിഹരിക്കുന്നതിന് നിങ്ങളുടെ ഓപ്പറേറ്റിംഗ് സിസ്റ്റവും ആപ്ലിക്കേഷനുകളും ക്രമമായി അപ്ഡേറ്റ് ചെയ്യുക."
    },
    {
      icon: <Key className="h-5 w-5 text-green-500" />,
      title: "പാസ്‌വേഡ് മാനേജർ ഉപയോഗിക്കുക",
      content: "പാസ്‌വേഡ് മാനേജർമാർ നിങ്ങൾക്ക് ശക്തവും അനന്യവുമായ പാസ്‌വേഡുകൾ സൃഷ്ടിക്കാനും സുരക്ഷിതമായി സംഭരിക്കാനും സഹായിക്കുന്നു."
    }
  ]
};

export default function SecurityTips() {
  // Use null as initial state to avoid hydration mismatch
  const [currentTip, setCurrentTip] = useState<number | null>(null);
  const [language, setLanguage] = useState('en');
  
  // Listen for language changes and set initial tip
  useEffect(() => {
    // Load initial language
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLanguage);

    // Set the initial tip after component mounts
    setCurrentTip(0);
    
    const interval = setInterval(() => {
      const tips = getTips();
      setCurrentTip((prev) => (prev === null ? 0 : (prev + 1) % tips.length));
    }, 8000);

    // Listen for language change events
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language);
      // Reset to first tip when language changes
      setCurrentTip(0);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    return () => {
      clearInterval(interval);
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  // Get tips for current language, fallback to English
  const getTips = () => {
    const langTips = tipsByLanguage[language as keyof typeof tipsByLanguage];
    return langTips && langTips.length > 0 ? langTips : tipsByLanguage.en;
  };

  // Show a loading state or first tip if currentTip is null
  const tips = getTips();
  const tipToShow = currentTip === null ? 0 : (currentTip % tips.length);

  // Add getTips to the dependency array
  useEffect(() => {
    getTips();
  }, [language, getTips]); // Add getTips to the dependency array

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
        <Shield className="mr-2 h-5 w-5 text-green-500" />
        {getTranslation('securityTip', language)}
      </h3>
      <div className="min-h-24">
        {tips.length > 0 && tipToShow !== null && (
          <div className="flex items-start mb-2">
            <div className="mr-2 mt-1">
              {tips[tipToShow].icon}
            </div>
            <div>
              <h4 className="font-medium text-white">{tips[tipToShow].title}</h4>
              <p className="text-sm text-gray-300">{tips[tipToShow].content}</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-2 space-x-1">
        {tips.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTip(index)}
            className={`h-2 w-2 rounded-full ${
              index === tipToShow ? 'bg-green-500' : 'bg-gray-600'
            }`}
            aria-label={`Tip ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 