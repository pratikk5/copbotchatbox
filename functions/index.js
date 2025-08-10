const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

exports.chatResponse = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }

    try {
      const { message, language = 'en' } = req.body;
      
      // Your chat logic here
      // ...
      
      return res.status(200).json({ response: 'Your response here' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Internal Server Error');
    }
  });
}); 