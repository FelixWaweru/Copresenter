import { createClient } from '@supabase/supabase-js'
import voice from 'elevenlabs-node';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
require('dotenv').config();
 
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const text = req.body.text;
    const publicURL = await ElevenLabs(text, res);

    res.status(200).json(publicURL);
}

const ElevenLabs = async (text, res) => {
    const apiKey = process.env.ELEVEN_API_KEY;
    const voiceID = process.env.ELEVEN_VOICE_ID;

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false },
        })

    const filename = `${uuidv4()}.mp3`;

    
    try {
        const response = await textToSpeechArrayBuffer(apiKey, voiceID, text);
        console.log(response)
        
        try {
            const { data, error } = await supabase
                .storage
                .from('audio_files')
                .upload(filename, response, {
                    contentType: 'audio/mpeg'
                });

            console.log(data, error);

            if(!error) {
                console.log(`Success, Audio saved as: ${filename}`);
                const res = supabase
                    .storage
                    .from('audio_files')
                    .getPublicUrl(filename);

                const publicURL = res.data;

                return publicURL;
            }
            }
        catch (error)
        {
            console.log(JSON.stringify(error));
            return { error: error};
        }
    } catch (error) {
        console.error(JSON.stringify(error));
        return { error: error};
    }
}

const textToSpeechArrayBuffer = async (apiKey, voiceID, textInput) => {
    	const voiceURL = `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}/stream`;
		const stabilityValue =  0;
		const similarityBoostValue = 0;

		const response = await axios({
			method: 'POST',
			url: voiceURL,
			data: {
				text: textInput,
				voice_settings: {
					stability: stabilityValue,
					similarity_boost: similarityBoostValue
				},
				model_id: undefined
			},
			headers: {
				'Accept': 'audio/mpeg',
				'xi-api-key': apiKey,
				'Content-Type': 'application/json',
			},
			responseType: 'arraybuffer'
		});

        return response.data;
}