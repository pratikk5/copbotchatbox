const handleLanguageChange = (newLanguage: string) => {
  localStorage.setItem('selectedLanguage', newLanguage);
  
  // Dispatch a custom event when language changes
  window.dispatchEvent(new Event('languageChange'));
  
  // ... rest of your language change handling code ...
}; 