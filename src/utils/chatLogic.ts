import { knowledgeBase } from '@/data/knowledgeBase';

export function findResponse(userMessage: string, language: string = 'en'): string {
  // Default to English if the language is not supported
  if (!knowledgeBase[language]) {
    language = 'en';
  }
  
  // Convert user message to lowercase for case-insensitive matching
  const message = userMessage.toLowerCase();
  
  // Default response if no match is found
  let defaultResponse = '';
  
  if (language === 'en') {
    defaultResponse = `As a police assistance chatbot, I can provide information on various topics like filing complaints, legal rights, emergency procedures, and more. Could you please provide more details about your question?`;
  } else if (language === 'hi') {
    defaultResponse = `एक पुलिस सहायता चैटबॉट के रूप में, मैं शिकायत दर्ज करने, कानूनी अधिकारों, आपातकालीन प्रक्रियाओं और अन्य विषयों पर जानकारी प्रदान कर सकता हूं। कृपया अपने प्रश्न के बारे में अधिक विवरण प्रदान करें।`;
  } else if (language === 'ta') {
    defaultResponse = `காவல்துறை உதவி சேட்பாட்டாக, புகார்கள் தாக்கல் செய்தல், சட்ட உரிமைகள், அவசரகால நடைமுறைகள் மற்றும் பல விஷயங்களில் நான் தகவல்களை வழங்க முடியும். உங்கள் கேள்வி பற்றிய கூடுதல் விவரங்களை வழங்கவும்.`;
  } else if (language === 'te') {
    defaultResponse = `పోలీస్ సహాయ చాట్‌బాట్‌గా, ఫిర్యాదులు దాఖలు చేయడం, చట్టపరమైన హక్కులు, అత్యవసర విధానాలు మరియు మరిన్ని అంశాలపై నేను సమాచారాన్ని అందించగలను. దయచేసి మీ ప్రశ్న గురించి మరిన్ని వివరాలను అందించండి.`;
  } else if (language === 'kn') {
    defaultResponse = `ಪೊಲೀಸ್ ಸಹಾಯ ಚಾಟ್‌ಬಾಟ್ ಆಗಿ, ದೂರುಗಳನ್ನು ಸಲ್ಲಿಸುವುದು, ಕಾನೂನು ಹಕ್ಕುಗಳು, ತುರ್ತು ಕಾರ್ಯವಿಧಾನಗಳು ಮತ್ತು ಇನ್ನೂ ಹೆಚ್ಚಿನ ವಿಷಯಗಳ ಬಗ್ಗೆ ನಾನು ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸಬಲ್ಲೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪ್ರಶ್ನೆಯ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ವಿವರಗಳನ್ನು ಒದಗಿಸಿ.`;
  } else if (language === 'ml') {
    defaultResponse = `ഒരു പോലീസ് സഹായ ചാറ്റ്ബോട്ട് എന്ന നിലയിൽ, പരാതികൾ ഫയൽ ചെയ്യുന്നത്, നിയമപരമായ അവകാശങ്ങൾ, അടിയന്തിര നടപടിക്രമങ്ങൾ തുടങ്ങിയ വിഷയങ്ങളിൽ എനിക്ക് വിവരങ്ങൾ നൽകാൻ കഴിയും. ദയവായി നിങ്ങളുടെ ചോദ്യത്തെക്കുറിച്ച് കൂടുതൽ വിവരങ്ങൾ നൽകുക.`;
  }
  
  // Check each entry in the knowledge base for the selected language
  for (const entry of knowledgeBase[language]) {
    // Check if any keywords match the user message
    if (entry.keywords.some((keyword: string) => message.includes(keyword.toLowerCase()))) {
      return entry.response;
    }
  }
  
  // If no match is found, return the default response
  return defaultResponse;
}

// Export other chat-related functions here if needed 