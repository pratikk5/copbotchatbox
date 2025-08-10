// Define translation types for all UI elements
export type TranslationKey = 
  | 'welcome'
  | 'askAbout'
  | 'fileComplaint'
  | 'legalRights'
  | 'emergency'
  | 'investigation'
  | 'sendMessage'
  | 'typing'
  | 'errorMessage'
  | 'policeAssistant'
  | 'available24_7'
  | 'securityTip'
  | 'policeAssistanceTip'
  | 'about'
  | 'aboutContent'
  | 'emergencyContacts'
  | 'police'
  | 'womenHelpline'
  | 'childHelpline'
  | 'trafficPolice'
  | 'cyberCrime'
  | 'footer'
  | 'poweredBy'
  | 'emergencyNote'
  | 'emergencyTip1'
  | 'emergencyTip2'
  | 'emergencyTip3'
  | 'policeEmergency'
  | 'medicalEmergency'
  | 'nationalEmergency'
  | 'call'
  | 'stayCalm'
  | 'shareLocation'
  | 'saveNumbers';

// Add this export at the top of the file
export type LanguageCode = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml';

// Define translations for each language
export const translations = {
  en: {
    welcome: 'Police Assistance & Legal Guidance',
    askAbout: 'Ask me about:',
    fileComplaint: 'How to file an FIR or police complaint',
    legalRights: 'Your legal rights during police interaction',
    emergency: 'Emergency helpline numbers',
    investigation: 'Police investigation procedures',
    sendMessage: 'Send',
    typing: 'Thinking',
    errorMessage: 'An error occurred. Please try again.',
    policeAssistant: 'Police Assistant',
    available24_7: 'Available 24/7',
    securityTip: 'Security Tip',
    policeAssistanceTip: 'Police Assistance Tip',
    about: 'About',
    aboutContent: 'This police assistance chatbot provides information and guidance on various police procedures, legal rights, and emergency services.',
    emergencyContacts: 'Emergency Contacts',
    police: 'Police',
    womenHelpline: 'Women Helpline',
    childHelpline: 'Child Helpline',
    trafficPolice: 'Traffic Police',
    cyberCrime: 'Cyber Crime',
    footer: 'All rights reserved.',
    poweredBy: 'Powered by AI and Next.js',
    emergencyNote: 'Click on any contact to make an immediate call. Available 24/7.',
    emergencyTip1: 'Stay calm and speak clearly when calling',
    emergencyTip2: 'Share your exact location first',
    emergencyTip3: 'Keep these numbers saved in your phone',
    policeEmergency: 'Police Emergency',
    medicalEmergency: 'Medical Emergency',
    nationalEmergency: 'National Emergency',
    call: 'Call',
    stayCalm: 'Stay calm and speak clearly when calling',
    shareLocation: 'Share your exact location first',
    saveNumbers: 'Keep these numbers saved in your phone'
  },
  hi: {
    welcome: 'पुलिस सहायता और कानूनी मार्गदर्शन',
    askAbout: 'मुझसे पूछें:',
    fileComplaint: 'एफआईआर या पुलिस शिकायत कैसे दर्ज करें',
    legalRights: 'पुलिस बातचीत के दौरान आपके कानूनी अधिकार',
    emergency: 'आपातकालीन हेल्पलाइन नंबर',
    investigation: 'पुलिस जांच प्रक्रियाएं',
    sendMessage: 'भेजें',
    typing: 'सोच रहा हूँ',
    errorMessage: 'एक त्रुटि हुई। कृपया पुन: प्रयास करें।',
    policeAssistant: 'पुलिस सहायक',
    available24_7: '24/7 उपलब्ध',
    securityTip: 'सुरक्षा टिप',
    policeAssistanceTip: 'पुलिस सहायता टिप',
    about: 'परिचय',
    aboutContent: 'यह पुलिस सहायता चैटबॉट विभिन्न पुलिस प्रक्रियाओं, कानूनी अधिकारों और आपातकालीन सेवाओं पर जानकारी और मार्गदर्शन प्रदान करता है।',
    emergencyContacts: 'आपातकालीन संपर्क',
    police: 'पुलिस',
    womenHelpline: 'महिला हेल्पलाइन',
    childHelpline: 'चाइल्ड हेल्पलाइन',
    trafficPolice: 'ट्रैफिक पुलिस',
    cyberCrime: 'साइबर क्राइम',
    footer: 'सर्वाधिकार सुरक्षित।',
    poweredBy: 'AI और Next.js द्वारा संचालित',
    emergencyNote: 'तत्काल कॉल करने के लिए किसी भी संपर्क पर क्लिक करें। 24/7 उपलब्ध।',
    emergencyTip1: 'कॉल करते समय शांत रहें और स्पष्ट रूप से बोलें',
    emergencyTip2: 'पहले अपना सटीक स्थान साझा करें',
    emergencyTip3: 'इन नंबरों को अपने फोन में सेव करके रखें',
    policeEmergency: 'पुलिस आपातकाल',
    medicalEmergency: 'चिकित्सा आपातकाल',
    nationalEmergency: 'राष्ट्रीय आपातकाल',
    call: 'कॉल करें',
    stayCalm: 'कॉल करते समय शांत रहें और स्पष्ट रूप से बोलें',
    shareLocation: 'पहले अपना सटीक स्थान साझा करें',
    saveNumbers: 'इन नंबरों को अपने फोन में सेव करें'
  },
  ta: {
    welcome: 'காவல்துறை உதவி மற்றும் சட்ட வழிகாட்டுதல்',
    askAbout: 'என்னிடம் கேளுங்கள்:',
    fileComplaint: 'FIR அல்லது காவல்துறை புகார் எப்படி தாக்கல் செய்வது',
    legalRights: 'காவல்துறை தொடர்பின் போது உங்கள் சட்ட உரிமைகள்',
    emergency: 'அவசர உதவி எண்கள்',
    investigation: 'காவல்துறை விசாரணை நடைமுறைகள்',
    sendMessage: 'அனுப்பு',
    typing: 'சிந்திக்கிறேன்',
    errorMessage: 'பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.',
    policeAssistant: 'காவல்துறை உதவியாளர்',
    available24_7: '24/7 கிடைக்கும்',
    securityTip: 'பாதுகாப்பு குறிப்பு',
    policeAssistanceTip: 'காவல்துறை உதவி குறிப்பு',
    about: 'பற்றி',
    aboutContent: 'இந்த காவல்துறை உதவி சேட்பாட் பல்வேறு காவல்துறை நடைமுறைகள், சட்ட உரிமைகள் மற்றும் அவசர சேவைகள் பற்றிய தகவல்களை வழங்குகிறது.',
    emergencyContacts: 'அவசர தொடர்புகள்',
    police: 'காவல்துறை',
    womenHelpline: 'பெண்கள் உதவி எண்',
    childHelpline: 'குழந்தைகள் உதவி எண்',
    trafficPolice: 'ட்ராஃபிக் போலிஸ்',
    cyberCrime: 'சைபர் குற்றம்',
    footer: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    poweredBy: 'AI மற்றும் Next.js ஆல் இயக்கப்படுகிறது',
    emergencyNote: 'உடனடி அழைப்பிற்கு எந்த தொடர்பையும் கிளிக் செய்யவும். 24/7 கிடைக்கும்.',
    emergencyTip1: 'அடியந்திர கேள்விக்கு நிலையாகவும் கொள்ளும் மற்றும் வெளிப்படையாக பேசும்',
    emergencyTip2: 'முதலில் உங்கள் நிலையை பகிரும்',
    emergencyTip3: 'இந்த எண்களை உங்கள் தொலைப்பின்னல் சேமிக்கவும்',
    policeEmergency: 'காவல்துறை உதவி',
    medicalEmergency: 'மருத்துவ உதவி',
    nationalEmergency: 'அராண்டிய உதவி',
    call: 'அழைக்க',
    stayCalm: 'அழைக்கும்போது அமைதியாக இருந்து தெளிவாகப் பேசுங்கள்',
    shareLocation: 'முதலில் உங்கள் நிலையை பகிரும்',
    saveNumbers: 'இந்த எண்களை உங்கள் தொலைபேசியில் சேமித்து வைக்கவும்'
  },
  te: {
    welcome: 'పోలీస్ సహాయం మరియు చట్టపరమైన మార్గదర్శకత',
    askAbout: 'నన్ను అడగండి:',
    fileComplaint: 'FIR లేదా పోలీస్ ఫిర్యాదు ఎలా దాఖలు చేయాలి',
    legalRights: 'పోలీస్ సంభాషణ సమయంలో మీ చట్టపరమైన హక్కులు',
    emergency: 'అత్యవసర హెల్ప్‌లైన్ నంబర్లు',
    investigation: 'పోలీస్ దర్యాప్తు విధానాలు',
    sendMessage: 'పంపు',
    typing: 'ఆలోచిస్తುన్నాను',
    errorMessage: 'లోపం సంభవించింది. దయచేసి మళ్లీ ప్రయత್నించండి.',
    policeAssistant: 'పోలీస్ సహాయకుడు',
    available24_7: '24/7 అందుబాటులో ఉంది',
    securityTip: 'భద్రతా చిట్కా',
    policeAssistanceTip: 'పోలీస్ సహాయ చిట్కా',
    about: 'గురించి',
    aboutContent: 'ఈ పోలీస్ సహాయ చాట್‌బాట್ వివిధ పోలీస్ విధానాలు, చట్టపరమైన హక్కులు మత్తు తుర్తు సేవెగళ బగ్గె మాహితి మత్తు మార్గదర్శనవన్ను అందిస్తుంది.',
    emergencyContacts: 'అత్యవసర సంప్రదింపులు',
    police: 'పోలీస్',
    womenHelpline: 'మహిళల హెల్ప్‌లైన్',
    childHelpline: 'చైల్డ్ హెల్ప్‌లైన్',
    trafficPolice: 'ట్రాఫిక్ పోలీస్',
    cyberCrime: 'సైబర్ క్రైమ్',
    footer: 'ఎల్లా హక్కులు రిజర్వ్ చేయబడ్డాయి.',
    poweredBy: 'AI మత్తు Next.js నింద చాలిత',
    emergencyNote: 'వెంటనే కాల్ చేయడానికి ఏదైనా కాంటాక్ట్‌పై క్లిక్ చేయండి. 24/7 అందుబాటులో ఉంది.',
    emergencyTip1: 'అటియన్తిర అడగాన్నాన్ని శాంతమైనాన్ని మరియు స్పష్టమైనాన్ని పేచినాన్ని',
    emergencyTip2: 'మొదటిగా మీ సట్టున్న స్థానాన్ని పంచినాన్ని',
    emergencyTip3: 'ఈ సంఖ్యలను మీ ఫోన్లో భద్రపరచండి',
    policeEmergency: 'పోలీస్ తುర్తు',
    medicalEmergency: 'మరుత్తువ ఉత్తరం',
    nationalEmergency: 'అరాణ్య ఉత్తరం',
    call: 'కాల్ చేయండి',
    stayCalm: 'కాల్ చేసేటప్పుడు ప్రశాంతంగా ఉండి స్పష్టంగా మాట్లాడండి',
    shareLocation: 'మొదట మీ ఖచ్చితమైన స్థానాన్ని షేర్ చేయండి',
    saveNumbers: 'ఈ నంబర్లను మీ ఫోన్‌లో సేవ్ చేసుకోండి'
  },
  kn: {
    welcome: 'ಪೊಲೀಸ್ ಸಹಾಯ ಮತ್ತು ಕಾನೂನು ಮಾರ್ಗದರ್ಶನ',
    askAbout: 'ನನ್ನನ್ನು ಕೇಳಿ:',
    fileComplaint: 'FIR ಅಥವಾ ಪೊಲೀಸ್ ದೂರನ್ನು ಹೇಗೆ ಸಲ್ಲಿಸುವುದು',
    legalRights: 'ಪೊಲೀಸ್ ಸಂವಹನದ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮ ಕಾನೂನು ಹಕ್ಕುಗಳು',
    emergency: 'ತುರ್ತು ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆಗಳು',
    investigation: 'ಪೊಲೀಸ್ ತನಿಖಾ ವಿಧಾನಗಳು',
    sendMessage: 'ಕಳುಹಿಸಿ',
    typing: 'ಯೋಚಿಸುತ್ತೇನೆ',
    errorMessage: 'ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    policeAssistant: 'ಪೊಲೀಸ್ ಸಹಾಯಕ',
    available24_7: '24/7 ಲಭ್ಯವಿದೆ',
    securityTip: 'ಭದ್ರತಾ ಸಲಹೆ',
    policeAssistanceTip: 'ಪೊಲೀಸ್ ಸಹಾಯ ಸಲಹೆ',
    about: 'ಬಗ್ಗೆ',
    aboutContent: 'ಈ ಪೊಲೀಸ್ ಸಹಾಯ ಚಾಟ್‌ಬಾಟ್ ವಿವಿಧ ಪೊಲೀಸ್ ಕಾರ್ಯವಿಧಾನಗಳು, ಕಾನೂನು ಹಕ್ಕುಗಳು ಮತ್ತು ತುರ್ತು ಸೇವೆಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ಮತ್ತು ಮಾರ್ಗದರ್ಶನವನ್ನು ಒದಗಿಸುತ್ತದೆ.',
    emergencyContacts: 'ತುರ್ತು ಸಂಪರ್ಕಗಳು',
    police: 'ಪೊಲೀಸ್',
    womenHelpline: 'ಮಹಿಳಾ ಸಹಾಯವಾಣಿ',
    childHelpline: 'ಚೈಲ್ಡ್ ಹೆಲ್ಪ್‌ಲೈನ್',
    trafficPolice: 'ಟ್ರಾಫಿಕ್ ಪೊಲೀಸ್',
    cyberCrime: 'ಸೈಬರ್ ಕ್ರೈಮ್',
    footer: 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
    poweredBy: 'AI ಮತ್ತು Next.js ನಿಂದ ಚಾಲಿತ',
    emergencyNote: 'ತಕ್ಷಣದ ಕರೆಗಾಗಿ ಯಾವುದೇ ಸಂಪರ್ಕವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ. 24/7 ಲಭ್ಯವಿದೆ.',
    emergencyTip1: 'ತುರ್ತು ಸಹಾಯವಾಣಿ ಸಹಾಯದಲ್ಲಿ ನಿಲ್ಲಿಸಿ ಮತ್ತು ಸ್ಪಷ್ಟವಾಗಿ ಮಾರ್ಗದರ್ಶನ ಮಾಡಿ',
    emergencyTip2: 'ಮೊದಲು ನಿಮ್ಮ ನಿಲ್ಲಿಸಿದ ಸ್ಥಳವನ್ನು ಪಂಚಿಸಿ',
    emergencyTip3: 'ಈ ಸಂಖ್ಯೆಗಳನ್ನು ನಿಮ್ಮ ಫೋನ್ಲೋ ಭದ್ರಪರಿಸಿ',
    policeEmergency: 'ಪೊಲೀಸ್ ತುರ್ತು',
    medicalEmergency: 'ವೈದ್ಯಕೀಯ ತುರ್ತು',
    nationalEmergency: 'ರಾಷ್ಟ್ರೀಯ ತುರ್ತು',
    call: 'ಕರೆ ಮಾಡಿ',
    stayCalm: 'ಕರೆ ಮಾಡುವಾಗ ಶಾಂತವಾಗಿರಿ ಮತ್ತು ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ',
    shareLocation: 'ಮೊದಲು ನಿಮ್ಮ ನಿಖರವಾದ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ',
    saveNumbers: 'ಈ ಸಂಖ್ಯೆಗಳನ್ನು ನಿಮ್ಮ ಫೋನ್‌ನಲ್ಲಿ ಉಳಿಸಿ'
  },
  ml: {
    welcome: 'പോലീസ് സഹായവും നിയമ മാർഗ്ഗനിർദ്ദേശവും',
    askAbout: 'എന്നോട് ചോദിക്കൂ:',
    fileComplaint: 'എഫ്‌ഐആർ അല്ലെങ്കിൽ പോലീസ് പരാതി എങ്ങനെ ഫയൽ ചെയ്യാം',
    legalRights: 'പോലീസ് ഇടപെടലിനിടെ നിങ്ങളുടെ നിയമപരമായ അവകാശങ്ങൾ',
    emergency: 'അടിയന്തിര ഹെൽപ്പ്‌ലൈൻ നമ്പറുകൾ',
    investigation: 'പോലീസ് അന്വേഷണ നടപടിക്രമങ്ങൾ',
    sendMessage: 'അയയ്ക്കുക',
    typing: 'ചിന്തിക്കുന്നു',
    errorMessage: 'ഒരു പിശക് സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക.',
    policeAssistant: 'പോലീസ് അസിസ്റ്റന്റ്',
    available24_7: '24/7 ലഭ്യമാണ്',
    securityTip: 'സുരക്ഷാ നുറുങ്ങ്',
    policeAssistanceTip: 'പോലീസ് സഹായ നുറുങ്ങ്',
    about: 'കുറിച്ച്',
    aboutContent: 'ഈ പോലീസ് സഹായ ചാറ്റ്ബോട്ട് വിവിധ പോലീസ് നടപടിക്രമങ്ങൾ, നിയമപരമായ അവകാശങ്ങൾ, അടിയന്തിര സേവനങ്ങൾ എന്നിവയെക്കുറിച്ചുള്ള വിവരങ്ങളും മാർഗനിർദ്ദേശങ്ങളും നൽകുന്നു.',
    emergencyContacts: 'അടിയന്തിര സമ്പർക്കങ്ങൾ',
    police: 'പോലീസ്',
    womenHelpline: 'വനിതാ ഹെൽപ്പ്‌ലൈൻ',
    childHelpline: 'ചൈൽഡ് ഹെൽപ്പ്‌ലൈൻ',
    trafficPolice: 'ട്രാഫിക് പോലീസ്',
    cyberCrime: 'സൈബർ ക്രൈം',
    footer: 'എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.',
    poweredBy: 'AI, Next.js എന്നിവ ഉപയോഗിച്ച് പ്രവർത്തിക്കുന്നു',
    emergencyNote: 'ഉടൻ വിളിക്കാൻ ഏതെങ്കിലും കോൺടാക്റ്റിൽ ക്ലിക്ക് ചെയ്യുക. 24/7 ലഭ്യമാണ്.',
    emergencyTip1: 'അടിയന്തിര ഹെൽപ്പ്‌ലൈൻ സഹായവാണ് ശാംതമെൖന്ന് മാര്ഗദര്ശനം പേചിയുക',
    emergencyTip2: 'മുന്നില്ലെന്ന് നിങ്ങളുടെ സ്ഥാനം പക്കിയുക',
    emergencyTip3: 'ഈ സംഖ്യകൾ നിങ്ങളുടെ ഫോണിൽ ഭദ്രപ്പരിച്ചു',
    policeEmergency: 'കാവല്തുറൈ സഹായവാണി',
    medicalEmergency: 'മര്ത്തുവ സഹായവാണി',
    nationalEmergency: 'രാണ്ടിയ സഹായവാണി',
    call: 'വിളിക്കുക',
    stayCalm: 'വിളിക്കുമ്പോൾ ശാന്തമായി ഇരിക്കുകയും വ്യക്തമായി സംസാരിക്കുകയും ചെയ്യുക',
    shareLocation: 'ആദ്യം നിങ്ങളുടെ കൃത്യമായ സ്ഥാനം പങ്കിടുക',
    saveNumbers: 'ഈ നമ്പറുകൾ നിങ്ങളുടെ ഫോണിൽ സേവ് ചെയ്തിരിക്കുക'
  }
};

// Improved getTranslation function with better debugging
export function getTranslation(key: TranslationKey | string, language: LanguageCode | string = 'en'): string {
  // For debugging
  console.log(`Getting translation for key: ${key}, language: ${language}`);
  
  // Default to English if the language is not supported
  const lang = translations[language as LanguageCode] ? language : 'en';
  
  // Return the translation or the key itself if not found
  return translations[lang as LanguageCode][key as TranslationKey] || translations['en'][key as TranslationKey] || key;
}
