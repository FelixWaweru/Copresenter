import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import voice from 'elevenlabs-node';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();
 
export default async function handler(req, res) {
  const voice = await ElevenLabs("Hello");

  res.status(200).json({ text: "Done" });
}

const ElevenLabs = async (text) => {
    const apiKey = process.env.ELEVEN_API_KEY;
    const voiceID = process.env.ELEVEN_VOICE_ID;

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false },
        })

    const filename = `/tmp/${uuidv4()}.mp3`;

    try {
        const res = await voice.textToSpeech(apiKey, voiceID, `${filename}`, text);
        console.log(res);

        const fileContent = fs.readFileSync(`${filename}`);

        try {
            const { data, error } = await supabase
                .storage
                .from('audio_files')
                .upload(filename, fileContent, {
                cacheControl: '3600',
                upsert: false
            });

            console.log(data, error)

            if(!error) {
                console.log(`Success, Audio saved as: ${filename}`);
            }
            }
            catch (error)
            {
                console.log(JSON.stringify(error));
            }
        } catch (error) {
            console.error(JSON.stringify(error));
        }
}