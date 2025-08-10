// Mock cybersecurity chatbot API that doesn't require an API key
import { NextResponse } from 'next/server';
import { getTranslation } from '@/utils/translations';
import { findResponse as findChatResponse } from '@/utils/chatLogic';

// IMPORTANT! Set the runtime to edge for better performance
export const runtime = 'edge';

// Multilingual knowledge base
const knowledgeBase: Record<string, any[]> = {
  en: [
    {
      keywords: ['fir', 'first information report', 'police report'],
      response: `Filing a First Information Report (FIR):

1. When to File an FIR:
   - For cognizable offenses (serious crimes)
   - Criminal incidents
   - Theft or robbery
   - Assault or violence
   - Missing persons

2. How to File an FIR:
   - Visit the nearest police station
   - Provide detailed incident information
   - Get FIR copy (it's your right)
   - Note down FIR number
   
3. Required Information:
   - Your personal details
   - Date, time, place of incident
   - Detailed description of incident
   - Names of accused (if known)
   - List of witnesses (if any)
   - Description of stolen/damaged property

4. Important Rights:
   - Police MUST register your FIR
   - Free copy of FIR is mandatory
   - Can file Zero FIR at any police station
   - Can approach court if FIR refused`
    },
    {
      keywords: ['complaint', 'grievance', 'report'],
      response: `Filing Police Complaints:

1. Types of Complaints:
   - Against police personnel
   - Non-registration of FIR
   - Police inaction
   - Misconduct or corruption
   - Service-related issues

2. Complaint Procedures:
   a) Station Level:
      - Meet Station House Officer (SHO)
      - Submit written complaint
      - Get acknowledgment receipt
      
   b) Higher Authorities:
      - Superintendent of Police
      - Police Commissioner
      - State Police Complaint Authority
      - Home Ministry Portal

3. Online Complaints:
   - Police department website
   - State grievance portal
   - National crime reporting portal
   - Email to concerned authorities

4. Follow-up Process:
   - Keep complaint reference number
   - Regular status checks
   - Escalation if no action taken
   - Document all communication`
    },
    {
      keywords: ['investigation', 'case status', 'inquiry'],
      response: `Police Investigation Process:

1. Investigation Stages:
   - FIR Registration
   - Crime scene examination
   - Evidence collection
   - Witness statements
   - Suspect interrogation
   - Forensic analysis
   - Chargesheet filing

2. Victim/Complainant Rights:
   - Regular case updates
   - Copy of statements
   - Information about arrests
   - Status of investigation
   - Reasons for delay

3. Timeline Guidelines:
   - Investigation completion: 90 days
   - Chargesheet filing: 60-90 days
   - Court committal: 15 days
   
4. How to Track Progress:
   - Contact Investigation Officer
   - Visit police station
   - Online case status
   - Through court records
   - RTI application`
    },
    {
      keywords: ['emergency', 'helpline', 'contact'],
      response: `Emergency Helplines & Contacts:

1. Emergency Numbers:
   - Police Emergency: 100
   - Women Helpline: 1091
   - Child Helpline: 1098
   - Senior Citizen Helpline: 1291
   - Traffic Police: 1095
   - Anti-corruption: 1031
   - Cyber Crime: 1930

2. When to Call:
   - Crime in progress
   - Accidents/Medical emergency
   - Domestic violence
   - Missing persons
   - Suspicious activities
   - Sexual harassment
   
3. Information to Provide:
   - Your location (exact address)
   - Nature of emergency
   - Number of people involved
   - Any injuries/weapons
   - Vehicle details (if applicable)

4. Important Tips:
   - Stay calm while calling
   - Speak clearly
   - Follow dispatcher instructions
   - Don't disconnect until told
   - Save these numbers in phone`
    },
    {
      keywords: ['law', 'section', 'ipc', 'punishment', 'legal'],
      response: `Common Legal Sections & Punishments:

1. Indian Penal Code (IPC):
   - Section 302: Murder (Death/Life imprisonment)
   - Section 376: Rape (7 years to life imprisonment)
   - Section 354: Sexual harassment (1-5 years)
   - Section 392: Robbery (10 years)
   - Section 420: Cheating (7 years)
   - Section 324: Assault (3 years)
   - Section 379: Theft (3 years)

2. Criminal Procedure Code (CrPC):
   - Section 154: FIR Registration
   - Section 161: Witness Statement
   - Section 41: Arrest Powers
   - Section 164: Magistrate Statement
   
3. Bail Provisions:
   - Bailable offenses
   - Non-bailable offenses
   - Anticipatory bail
   - Regular bail procedures

4. Rights During Trial:
   - Right to fair trial
   - Right to legal aid
   - Right to speedy justice
   - Right to appeal`
    },
    {
      keywords: ['rights', 'arrest', 'detention'],
      response: `Your Rights During Arrest/Detention:

1. Fundamental Rights:
   - Right to know reason for arrest
   - Right to legal representation
   - Right to inform family/friends
   - Right to medical examination
   - Right to be produced before magistrate within 24 hours

2. Police Must:
   - Show arrest warrant (except caught in act)
   - Wear name tags and uniforms
   - Prepare arrest memo
   - Allow meeting with lawyer
   - Inform about bail rights

3. Women's Special Rights:
   - Arrest only by female officers
   - No arrest after sunset/before sunrise
   - Presence of female constable
   - Special protection in custody

4. Safeguards:
   - No forced confession
   - No torture/harassment
   - Right to free legal aid
   - Right to meet family
   - Right to medical treatment`
    },
  {
    keywords: ['password', 'strong', 'secure'],
    response: `Strong passwords are essential for cybersecurity. Here are some tips:
    
1. Use at least 12 characters
2. Include uppercase and lowercase letters, numbers, and special characters
3. Avoid using personal information or common words
4. Use a different password for each account
5. Consider using a password manager to generate and store complex passwords securely`
  },
  {
    keywords: ['phishing', 'email', 'scam'],
    response: `Phishing is a common cyber attack where attackers impersonate legitimate entities to steal sensitive information. To protect yourself:
    
1. Be suspicious of unexpected emails, especially those creating urgency
2. Check the sender's email address carefully for misspellings or unusual domains
3. Hover over links before clicking to see the actual URL
4. Never provide sensitive information in response to an email request
5. Use multi-factor authentication when available
6. Report suspicious emails to your IT department or email provider`
  },
  {
    keywords: ['malware', 'virus', 'ransomware', 'protection'],
    response: `To protect against malware, viruses, and ransomware:
    
1. Keep your operating system and software updated
2. Use reputable antivirus/anti-malware software and keep it updated
3. Be cautious when downloading files or clicking on links
4. Back up your important data regularly to an offline storage device
5. Use a firewall and consider using a VPN for additional protection
6. Avoid using public Wi-Fi for sensitive transactions
7. Be wary of suspicious email attachments, especially executable files`
  },
  {
    keywords: ['two-factor', '2fa', 'multi-factor', 'mfa', 'authentication'],
    response: `Multi-factor authentication (MFA) or two-factor authentication (2FA) adds an extra layer of security:
    
1. It requires something you know (password) and something you have (like a phone)
2. Even if your password is compromised, attackers still can't access your account
3. Common forms include SMS codes, authenticator apps, security keys, and biometrics
4. Enable 2FA/MFA on all accounts that offer it, especially email, banking, and social media
5. Authenticator apps (like Google Authenticator or Authy) are more secure than SMS-based 2FA`
  },
  {
    keywords: ['vpn', 'virtual private network'],
    response: `Virtual Private Networks (VPNs) enhance your online security and privacy:
    
1. They encrypt your internet traffic, making it unreadable to interceptors
2. VPNs mask your IP address and location
3. They're especially important when using public Wi-Fi networks
4. Look for VPNs with no-logs policies, strong encryption, and kill switches
5. Be aware that free VPNs may collect and sell your data
6. VPNs don't make you completely anonymous online or protect against all threats`
  },
  {
    keywords: ['social engineering', 'manipulation'],
    response: `Social engineering attacks manipulate people into breaking security procedures:
    
1. Types include phishing, pretexting, baiting, quid pro quo, and tailgating
2. Attackers exploit human psychology and trust rather than technical vulnerabilities
3. Be skeptical of unsolicited contacts requesting sensitive information
4. Verify identities through official channels before providing information
5. Follow security policies and procedures consistently
6. Report suspicious interactions to your security team`
  },
  {
    keywords: ['firewall', 'network security'],
    response: `Firewalls are crucial for network security:
    
1. They monitor and filter incoming and outgoing network traffic
2. Firewalls act as a barrier between trusted and untrusted networks
3. They can be hardware-based, software-based, or both
4. Modern firewalls can detect and block sophisticated attacks
5. Ensure your firewall is properly configured and regularly updated
6. Both personal and network firewalls are important for comprehensive protection`
  },
  {
    keywords: ['encryption', 'encrypt'],
    response: `Encryption is fundamental to data security:
    
1. It converts readable data into a coded format that only authorized parties can decrypt
2. End-to-end encryption ensures only the sender and recipient can read messages
3. Common encryption types include symmetric (single key) and asymmetric (public/private key pairs)
4. HTTPS websites use TLS/SSL encryption to secure data transmission
5. Encrypt sensitive files, devices, and communications whenever possible
6. Use strong, unique passwords for encrypted data`
  },
  {
    keywords: ['backup', 'data recovery'],
    response: `Regular backups are essential for data protection:
    
1. Follow the 3-2-1 backup rule: 3 copies, 2 different media types, 1 copy offsite
2. Automate backups to ensure consistency
3. Regularly test your backups to verify they can be restored
4. Consider both full and incremental backup strategies
5. Encrypt your backups to protect sensitive data
6. Cloud backups offer convenience but consider security and privacy implications`
  },
  {
    keywords: ['update', 'patch', 'software'],
    response: `Keeping software updated is critical for security:
    
1. Updates often contain patches for security vulnerabilities
2. Enable automatic updates when possible
3. Regularly check for updates for your operating system, applications, and firmware
4. Prioritize security-related updates
5. Be cautious with end-of-life software that no longer receives security updates
6. Create a patch management strategy for organizational environments`
    },
    {
      keywords: ['police', 'law enforcement', 'emergency'],
      response: `For police assistance and emergencies:

1. Emergency: Dial 911 for immediate threats or crimes in progress
2. Non-Emergency: Contact your local police department's non-emergency line
3. Online Reporting: Many departments offer online reporting for non-urgent matters
4. File a Report: Visit your nearest police station in person
5. Anonymous Tips: Use Crime Stoppers or your local anonymous reporting system`
    },
    {
      keywords: ['complaint', 'report crime', 'file report'],
      response: `To file a police complaint or report:

1. Emergency situations: Call 911 immediately
2. Non-emergency reports can be filed:
   - In person at your local police station
   - Online through your department's website
   - By phone through non-emergency numbers
3. Have ready:
   - Date, time, and location of incident
   - Detailed description of what happened
   - Any evidence or documentation
   - Witness information (if available)`
    },
    {
      keywords: ['legal', 'rights', 'law'],
      response: `Important legal information:

1. Your Rights:
   - Right to remain silent
   - Right to legal representation
   - Right to file a complaint
   - Right to record police in public
2. Legal Resources:
   - Legal aid services
   - Public defender's office
   - Civil rights organizations
   - Bar association referrals`
    },
    {
      keywords: ['emergency', 'urgent', 'immediate help'],
      response: `For Emergency Situations:

1. IMMEDIATE DANGER: Call 911 immediately if:
   - Crime in progress
   - Medical emergency
   - Fire or hazardous situations
   - Suspicious activity in progress
   - Traffic accidents with injuries

2. What to tell emergency operators:
   - Your exact location
   - Nature of emergency
   - Your name and contact number
   - Any immediate safety concerns
   - Description of suspects (if applicable)

3. Stay on the line until instructed to hang up.`
    },
    {
      keywords: ['file', 'report', 'complaint', 'document'],
      response: `How to File a Police Report:

1. Online Reporting (Non-Emergency):
   - Property crimes
   - Lost property
   - Vandalism
   - Minor theft
   - Harassment

2. In-Person Reporting (Required for):
   - Violent crimes
   - Domestic violence
   - Sexual assault
   - Major theft
   - Missing persons

3. Required Information:
   - Date, time, location of incident
   - Detailed description of events
   - Names and contact info of involved parties
   - Photos or video evidence (if available)
   - Witness information
   - Value of damaged/stolen property

4. After Filing:
   - Note your report number
   - Request a copy for your records
   - Ask about victim services
   - Follow up procedures`
    },
    {
      keywords: ['rights', 'legal', 'law', 'arrest'],
      response: `Your Legal Rights:

1. If Stopped by Police:
   - Right to remain silent
   - Right to refuse searches (without warrant)
   - Right to ask if you're free to leave
   - Right to record the interaction
   - Right to ask for officer identification

2. If Under Arrest:
   - Right to remain silent (Miranda Rights)
   - Right to an attorney
   - Right to phone call
   - Right to know charges against you
   - Right to humane treatment

3. Victim Rights:
   - Right to be informed of proceedings
   - Right to protection from harassment
   - Right to restitution
   - Right to victim services
   - Right to be heard in court

4. How to Exercise Your Rights:
   - State clearly that you're exercising your rights
   - Request an attorney if questioned
   - Document everything
   - File complaints for rights violations
   - Contact legal aid if needed`
    },
    {
      keywords: ['procedure', 'process', 'steps', 'how to'],
      response: `Police Procedures Guide:

1. Non-Emergency Reports:
   - Call local police non-emergency number
   - Use online reporting system
   - Visit nearest police station
   - Mail-in reports for minor incidents

2. Evidence Collection:
   - Take photos/videos
   - Preserve physical evidence
   - Get witness contact information
   - Keep all related documents
   - Save security camera footage

3. Follow-up Process:
   - Contact detective assigned
   - Provide additional information
   - Check case status online
   - Request copy of report
   - Update victim statement

4. Complaint Resolution:
   - Internal affairs process
   - Civilian review boards
   - State oversight agencies
   - Legal remedies available
   - Appeals process`
    },
    {
      keywords: ['victim', 'support', 'help', 'assistance'],
      response: `Victim Support Services:

1. Immediate Assistance:
   - Emergency shelter
   - Medical care
   - Crisis counseling
   - Safety planning
   - Transportation

2. Legal Support:
   - Victim advocates
   - Court accompaniment
   - Protection orders
   - Legal aid referrals
   - Immigration assistance

3. Financial Help:
   - Victim compensation
   - Emergency funds
   - Property replacement
   - Medical expenses
   - Lost wages claims

4. Long-term Support:
   - Counseling services
   - Support groups
   - Job assistance
   - Housing help
   - Child care resources`
    }
  ],
  hi: [
    {
      keywords: ['fir', 'report', 'complaint', 'file'],
      response: `एफआईआर दर्ज करने की प्रक्रिया:

1. एफआईआर कब दर्ज करें:
   - गंभीर अपराधों के लिए
   - आपराधिक घटनाओं के लिए
   - चोरी या डकैती
   - हमला या हिंसा
   - लापता व्यक्ति

2. एफआईआर कैसे दर्ज करें:
   - निकटतम पुलिस स्टेशन जाएं
   - विस्तृत घटना जानकारी प्रदान करें
   - एफआईआर की प्रति प्राप्त करें (यह आपका अधिकार है)
   - एफआईआर नंबर नोट करें`
    },
    // Add more Hindi entries
  ],
  ta: [
    {
      keywords: ['fir', 'report', 'complaint', 'file'],
      response: `முதல் தகவல் அறிக்கை (FIR) தாக்கல் செய்தல்:

1. FIR எப்போது தாக்கல் செய்ய வேண்டும்:
   - கடுமையான குற்றங்களுக்கு
   - குற்றவியல் சம்பவங்கள்
   - திருட்டு அல்லது கொள்ளை
   - தாக்குதல் அல்லது வன்முறை
   - காணாமல் போன நபர்கள்

2. FIR எப்படி தாக்கல் செய்வது:
   - அருகிலுள்ள காவல் நிலையத்திற்குச் செல்லவும்
   - விரிவான சம்பவ தகவலை வழங்கவும்
   - FIR நகலைப் பெறுங்கள் (இது உங்கள் உரிமை)
   - FIR எண்ணைக் குறித்து வைக்கவும்`
    },
    // Add more Tamil entries
  ],
  te: [
    // Telugu entries
  ],
  kn: [
    // Kannada entries
  ],
  ml: [
    // Malayalam entries
  ]
};

// Function to find the best response based on user input and language
function findResponse(userMessage: string, language: string = 'en'): string {
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

// Define message types
type Message = {
  content: string;
  role: string;
};

export async function POST(req: Request): Promise<Response> {
  try {
    const { message, language = 'en' } = await req.json();
    
    // Use the imported function with its new name
    const response = findChatResponse(message, language);
    
    // Return the response
    return new Response(JSON.stringify({ response }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return new Response(JSON.stringify({ 
      error: 'An error occurred while processing your request' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 