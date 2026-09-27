import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';
const appDirectory = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: '5mb' }));

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health / Status endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    aiAvailable: !!ai,
    message: ai
      ? 'Gemini AI Assistant connected'
      : 'GEMINI_API_KEY not configured. App operating in offline/local assistance mode.',
  });
});

// AI Tutor Chat endpoint
app.post('/api/tutor/chat', async (req, res) => {
  try {
    const {
      message,
      topic,
      subject,
      subtopic,
      contextType,
      lessonContext,
      questionContext,
      language = 'English',
      history = [],
    } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      return res.json({
        text: 'The AI tutor needs a GEMINI_API_KEY on the server. You can still use the visual lessons and practice questions. Ask the site owner to configure the key to enable conversation.',
        offline: true,
      });
    }

    const languageInstruction =
      language === 'Filipino'
        ? 'Respond primarily in natural conversational Filipino (Taglish / Tagalog as used by Filipino electrical engineering reviewees and instructors in Manila review centers like Multi-Vector, Excel, or Brainbox), while keeping technical electrical engineering terms, units, and formulas in English.'
        : language === 'Cebuano'
        ? 'Respond in natural conversational Cebuano / Bisaya (as used by Visayas and Mindanao engineering reviewees and instructors), keeping technical engineering formulas, variables, and units in English.'
        : 'Respond in clear, professional English with an encouraging, rigorous engineering tone.';

    const systemInstruction = `You are Engr. Ramos, a master mentor and Professional Electrical Engineer (PEE) preparing a candidate for the Philippine Registered Electrical Engineer (REE) Licensure Examination governed by the Professional Regulatory Board of Electrical Engineering (PRBEE Resolution No. 40, s. 2024).

Your role:
1. Master all three REE subjects: Mathematics (25%), Engineering Sciences and Allied Subjects [ESAS] (30%), and Electrical Engineering Professional Subjects (45%).
2. Teach following the pedagogical sequence: See it → Understand it → Use it → Solve it faster → Recall it later.
3. ${languageInstruction}
4. When helping with practice questions:
   - NEVER immediately blurt out the final letter answer.
   - Give progressive hints: First, identify the relevant governing principle (e.g. "Is the load delta or wye? Are we looking for apparent or real power?").
   - Second hint: Point out the key formula and critical traps (e.g., factor of sqrt(3) between line and phase voltage in wye, or lagging vs leading power factor).
   - Only reveal the shortest valid solution when the student explicitly requests it.
5. Emphasize PRC board exam reality:
   - Analytical speed and accuracy: Direct formulas, phasor transformations, and circuit equations.
   - Dimensional analysis and unit checks.
   - Eliminating impossible choices (e.g., efficiency > 100%, negative magnitude, unrealistic power factor).
6. Format formulas cleanly using standard text or LaTeX ($...$). Define symbols and SI units clearly.
7. Keep responses concise, clear, and direct. Avoid excessive pleasantries.
8. SIMPLIFIED MATH & ALGEBRA ADAPTATION: Many students lack a formal algebra background. When explaining math or algebraic steps:
   - Break equations down line-by-line showing the exact balancing step (e.g., "To isolate x, divide both sides by 4").
   - Use simple small numbers (1, 2, 5, 10, 12) and clear physical balance scale analogies.
   - Show how 3-variable formulas like V = I · R can be rearranged without heavy algebra.`;

    let contextSnippet = `Topic: ${topic || 'General REE'}\nSubject: ${subject || 'Engineering'}\nSubtopic: ${subtopic || 'Concept'}\nMode: ${contextType || 'Discussion'}\n`;
    if (lessonContext) {
      contextSnippet += `Current Lesson Context:\n- Title: ${lessonContext.title || ''}\n- Key Formula: ${lessonContext.formula || ''}\n- Summary: ${lessonContext.summary || ''}\n`;
    }
    if (questionContext) {
      contextSnippet += `Current Practice Question:\n- Question: ${questionContext.prompt}\n- Choices:\n  A: ${questionContext.choices?.A}\n  B: ${questionContext.choices?.B}\n  C: ${questionContext.choices?.C}\n  D: ${questionContext.choices?.D}\n- User Selected: ${questionContext.selected || 'None yet'}\n- Hints Already Used: ${questionContext.hintsGiven || 0}\n`;
    }

    // Build contents
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      for (const turn of history.slice(-6)) {
        contents.push({
          role: turn.role === 'user' ? 'user' : 'model',
          parts: [{ text: turn.text }],
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [
        {
          text: `[SYSTEM CONTEXT]\n${contextSnippet}\n\n[STUDENT QUESTION/MESSAGE]\n${message}`,
        },
      ],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    res.json({
      text: response.text || 'No response generated.',
      offline: false,
    });
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({
      error: 'Failed to generate tutor response',
      details: error.message,
    });
  }
});

// TTS audio generation endpoint using gemini-3.8-flash-lite-tts
app.post('/api/tutor/tts', async (req, res) => {
  try {
    const { text, voice = 'Kore' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    if (!ai) {
      return res.status(503).json({ error: 'Gemini API not configured for server-side TTS' });
    }

    const ttsResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text.slice(0, 500), // Keep concise for speech playback
              speechMetadata: {
                style: 'Clear, encouraging Filipino-accented English engineering mentor',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice as any },
          },
        },
      },
    });

    const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: 'No audio returned from model' });
    }

    res.json({ audio: base64Audio, format: 'pcm', sampleRate: 24000 });
  } catch (err: any) {
    console.error('Error generating TTS:', err);
    res.status(500).json({ error: 'TTS generation failed', details: err.message });
  }
});

// Mount Vite or serve static files
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(appDirectory, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PRC REE Master Reviewer running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
