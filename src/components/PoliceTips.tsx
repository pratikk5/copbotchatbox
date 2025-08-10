'use client';

import { useState, useEffect } from 'react';
import { Shield, Phone, FileText, Scale, AlertCircle } from 'lucide-react';
import { getTranslation } from '@/utils/translations';

// Define tips for all languages
const policeTipsByLanguage = {
  en: [
    {
      icon: <Phone className="h-5 w-5 text-blue-500" />,
      title: "Emergency Contacts",
      content: "Call 911 for emergencies. Save your local police non-emergency number for other situations."
    },
    {
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      title: "Filing Reports",
      content: "Document incidents promptly. Keep copies of all reports and correspondence."
    },
    {
      icon: <Scale className="h-5 w-5 text-blue-500" />,
      title: "Know Your Rights",
      content: "Understand your legal rights and when to request legal representation."
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      title: "Evidence Preservation",
      content: "Preserve evidence and document incidents with photos, videos, or written notes."
    }
  ],
  hi: [
    {
      icon: <Phone className="h-5 w-5 text-blue-500" />,
      title: "आपातकालीन संपर्क",
      content: "आपात स्थिति के लिए 100 पर कॉल करें। अन्य स्थितियों के लिए अपने स्थानीय पुलिस गैर-आपातकालीन नंबर को सहेजें।"
    },
    {
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      title: "रिपोर्ट दर्ज करना",
      content: "घटनाओं को तुरंत दस्तावेज करें। सभी रिपोर्ट और पत्राचार की प्रतियां रखें।"
    },
    {
      icon: <Scale className="h-5 w-5 text-blue-500" />,
      title: "अपने अधिकारों को जानें",
      content: "अपने कानूनी अधिकारों और कानूनी प्रतिनिधित्व का अनुरोध करने के समय को समझें।"
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      title: "सबूत संरक्षण",
      content: "फोटो, वीडियो या लिखित नोट्स के साथ सबूत और दस्तावेज़ घटनाओं को संरक्षित करें।"
    }
  ],
  ta: [
    {
      icon: <Phone className="h-5 w-5 text-blue-500" />,
      title: "அவசர தொடர்புகள்",
      content: "அவசரநிலைகளுக்கு 100 ஐ அழைக்கவும். மற்ற சூழ்நிலைகளுக்கு உங்கள் உள்ளூர் காவல்துறை அவசரமற்ற எண்ணை சேமிக்கவும்."
    },
    {
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      title: "அறிக்கைகளை தாக்கல் செய்தல்",
      content: "சம்பவங்களை உடனடியாக ஆவணப்படுத்தவும். அனைத்து அறிக்கைகள் மற்றும் கடிதத் தொடர்புகளின் நகல்களை வைத்திருங்கள்."
    },
    {
      icon: <Scale className="h-5 w-5 text-blue-500" />,
      title: "உங்கள் உரிமைகளை அறிந்து கொள்ளுங்கள்",
      content: "உங்கள் சட்ட உரிமைகளையும், சட்ட பிரதிநிதித்துவத்தை எப்போது கோர வேண்டும் என்பதையும் புரிந்து கொள்ளுங்கள்."
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      title: "ஆதாரங்களை பாதுகாத்தல்",
      content: "புகைப்படங்கள், வீடியோக்கள் அல்லது எழுத்துப்பூர்வ குறிப்புகளுடன் ஆதாரங்களை பாதுகாத்து சம்பவங்களை ஆவணப்படுத்தவும்."
    }
  ],
  te: [
    {
      icon: <Phone className="h-5 w-5 text-blue-500" />,
      title: "అత్యవసర సంప్రదింపులు",
      content: "అత్యవసర పరిస్థితులకు 100కి కాల్ చేయండి. ఇతర పరిస్థితుల కోసం మీ స్థానిక పోలీస్ నాన్-ఎమర్జెన్సీ నంబర్‌ను సేవ్ చేయండి."
    },
    {
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      title: "నివేదికలు దాఖలు చేయడం",
      content: "సంఘటనలను వెంటనే డాక్యుమెంట్ చేయండి. అన్ని నివేదికలు మరియు ఉత్తర ప్రత్యుత్తరాల కాపీలను ఉంచండి."
    },
    {
      icon: <Scale className="h-5 w-5 text-blue-500" />,
      title: "మీ హక్కులను తెలుసుకోండి",
      content: "మీ చట్టపరమైన హక్కులను మరియు చట్టపరమైన ప్రాతినిధ్యాన్ని ఎప్పుడు అభ్యర్థించాలో అర్థం చేసుకోండి."
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      title: "సాక్ష్యాల భద్రత",
      content: "ఫోటోలు, వీడియోలు అథవా రాతపూర్వక గమనికలతో సాక్ష్యాలను భద్రపరచండి మత್తು సంఘటనలను డాక్యుమెంట్ చేయండి."
    }
  ],
  kn: [
    {
      icon: <Phone className="h-5 w-5 text-blue-500" />,
      title: "ತುರ್ತು ಸಂಪರ್ಕಗಳು",
      content: "ತುರ್ತು ಪರಿಸ್ಥಿತಿಗಳಿಗೆ 100 ಕ್ಕೆ ಕರೆ ಮಾಡಿ. ಇತರ ಸಂದರ್ಭಗಳಿಗಾಗಿ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಪೊಲೀಸ್ ತುರ್ತಲ್ಲದ ಸಂಖ್ಯೆಯನ್ನು ಉಳಿಸಿ."
    },
    {
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      title: "ವರದಿಗಳನ್ನು ಸಲ್ಲಿಸುವುದು",
      content: "ಘಟನೆಗಳನ್ನು ತಕ್ಷಣವೇ ದಾಖಲಿಸಿ. ಎಲ್ಲಾ ವರದಿಗಳು ಮತ್ತು ಪತ್ರವ್ಯವಹಾರಗಳ ಪ್ರತಿಗಳನ್ನು ಇಟ್ಟುಕೊಳ್ಳಿ."
    },
    {
      icon: <Scale className="h-5 w-5 text-blue-500" />,
      title: "ನಿಮ್ಮ ಹಕ్ಕುಗಳನ್ನು ತಿಳಿದುಕೊಳ್ಳಿ",
      content: "ನಿಮ್ಮ ಕಾನೂನು ಹಕ్ಕುಗಳನ್ನು ಮತ್ತು ಯಾವಾಗ ಕಾನೂನು ಪ್ರಾತಿನಿಧ್ಯವನ್ನು ಕೇಳಬೇಕು ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ."
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      title: "ಸಾಕ్ಷ್ಯ ಸಂರಕ್ಷಣೆ",
      content: "ಫೋಟೋಗಳು, ವೀಡಿಯೊಗಳು ಅಥವಾ ಬರೆದ ಟಿಪ್ಪಣಿಗಳೊಂದಿಗೆ ಸಾಕ్ಷ್ಯಗಳನ್ನು ಸಂರಕ್ಷಿಸಿ ಮತ್ತು ಘಟನೆಗಳನ್ನು ದಾಖಲಿಸಿ."
    }
  ],
  ml: [
    {
      icon: <Phone className="h-5 w-5 text-blue-500" />,
      title: "അടിയന്തിര കോൺടാക്റ്റുകൾ",
      content: "അടിയന്തിര സാഹചര്യങ്ങൾക്ക് 100-ലേക്ക് വിളിക്കുക. മറ്റ് സാഹചര്യങ്ങൾക്കായി നിങ്ങളുടെ പ്രാദേശിക പോലീസ് നോൺ-എമർജൻസി നമ്പർ സേവ് ചെയ്യുക."
    },
    {
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      title: "റിപ്പോർട്ടുകൾ ഫയൽ ചെയ്യുന്നു",
      content: "സംഭവങ്ങൾ ഉടൻ തന്നെ രേഖപ്പെടുത്തുക. എല്ലാ റിപ്പോർട്ടുകളുടെയും കത്തിടപാടുകളുടെയും പകർപ്പുകൾ സൂക്ഷിക്കുക."
    },
    {
      icon: <Scale className="h-5 w-5 text-blue-500" />,
      title: "നിങ്ങളുടെ അവകാശങ്ങൾ അറിയുക",
      content: "നിങ്ങളുടെ നിയമപരമായ അവകാശങ്ങളും എപ്പോൾ നിയമ പ്രാതിനിധ്യം ആവശ്യപ്പെടണമെന്നും മനസ്സിലാക്കുക."
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      title: "തെളിവ് സംരക്ഷണം",
      content: "ഫോട്ടോകൾ, വീഡിയോകൾ അല്ലെങ്കിൽ എഴുതിയ കുറിപ്പുകൾ എന്നിവയുപയോഗിച്ച് തെളിവുകൾ സംരക്ഷിക്കുകയും സംഭവങ്ങൾ രേഖപ്പെടുത്തുകയും ചെയ്യുക."
    }
  ]
};

export default function PoliceTips() {
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
    const langTips = policeTipsByLanguage[language as keyof typeof policeTipsByLanguage];
    return langTips && langTips.length > 0 ? langTips : policeTipsByLanguage.en;
  };

  // Show a loading state or first tip if currentTip is null
  const tips = getTips();
  const tipToShow = currentTip === null ? 0 : (currentTip % tips.length);

  // Add getTips to the dependency array
  useEffect(() => {
    getTips();
  }, [language, getTips]); // Add getTips to the dependency array

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg mt-4">
      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
        <Shield className="mr-2 h-5 w-5 text-blue-500" />
        {getTranslation('policeAssistanceTip', language)}
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
              index === tipToShow ? 'bg-blue-500' : 'bg-gray-600'
            }`}
            aria-label={`Tip ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 