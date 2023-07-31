import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import voice from 'elevenlabs-node';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();
 
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const text = req.body.text;
    await ElevenLabs(text, res);
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
        const response = await voice.textToSpeech(apiKey, voiceID, `/tmp/${filename}`, text);
        console.log(response);

        const fileContent = fs.readFileSync(`/tmp/${filename}`);

        try {
            const { data, error } = await supabase
                .storage
                .from('audio_files')
                .upload(filename, fileContent, {
                cacheControl: '3600',
                upsert: false
            });

            console.log(data, error);

            if(!error) {
                console.log(`Success, Audio saved as: ${filename}`);
                const res = supabase
                    .storage
                    .from('avatars')
                    .getPublicUrl(filename);

                const publicURL = res.data;

                fs.unlink(`/tmp/${filename}`);

                res.status(200).json({ link: publicURL});
            }
            }
            catch (error)
            {
                console.log(JSON.stringify(error));
                res.status(500).json({ error: error});
            }
        } catch (error) {
            console.error(JSON.stringify(error));
            res.status(500).json({ error: error});
        }
}