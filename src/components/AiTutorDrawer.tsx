import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  RotateCcw,
  Zap,
  Globe,
  Loader2,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';
import { MathView } from './MathView';
import { AppLanguage } from '../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  context: {
    topic?: string;
    subject?: string;
    subtopic?: string;
    contextType: 'lesson' | 'practice' | 'term' | 'general';
    lessonContext?: any;
    questionContext?: any;
  };
  appLanguage?: AppLanguage;
  onSelectAppLanguage?: (lang: AppLanguage) => void;
}

export const AiTutorDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  context,
  appLanguage = 'en',
  onSelectAppLanguage,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      text:
        appLanguage === 'tl'
          ? `Mabuhay, Engineer! Nandito ako upang tumulong sa pagsusuri ng circuits, power systems, at electrical mathematics. Pwede kang magtanong sa Tagalog, Bisaya, o English.`
          : appLanguage === 'ceb'
          ? `Maayong adlaw, Engineer! Ania ko aron motabang sa pagsusi sa circuits, power systems, ug electrical mathematics. Pwede kang mangutana sa Bisaya, Tagalog, o English.`
          : `Hello, Engineer! I am here to help you work through circuits, power systems, and technical calculations. Ask questions or request step-by-step problem walkthroughs.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState<'English' | 'Filipino' | 'Cebuano'>(() => {
    if (appLanguage === 'tl') return 'Filipino';
    if (appLanguage === 'ceb') return 'Cebuano';
    return 'English';
  });

  // Sync when parent appLanguage changes
  useEffect(() => {
    if (appLanguage === 'tl') setLanguage('Filipino');
    else if (appLanguage === 'ceb') setLanguage('Cebuano');
    else setLanguage('English');
  }, [appLanguage]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [aiStatus, setAiStatus] = useState<{ connected: boolean; message: string }>({
    connected: true,
    message: 'Server-side AI Ready',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Check backend server health
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setAiStatus({
          connected: data.aiAvailable,
          message: data.message,
        });
      })
      .catch(() => {
        setAiStatus({
          connected: false,
          message: 'Offline Tutor Mode active',
        });
      });
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Abort speech/synthesis when drawer closes
  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
      setIsListening(false);
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      setMicError(null);
    }
  }, [isOpen]);

  // Speech Recognition setup (Voice Input)
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'English' ? 'en-US' : 'fil-PH';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
        setMicError(null);
      };

      recognition.onerror = (e: any) => {
        setIsListening(false);
        const errType = e?.error;
        console.warn('SpeechRecognition error:', errType);
        if (errType === 'not-allowed' || errType === 'service-not-allowed') {
          setMicError('Microphone access blocked. Note: Browsers block microphone access inside sandboxed preview iframes. Please open this app in a direct browser tab (using the button below) to enable microphone!');
        } else if (errType === 'no-speech') {
          setMicError('No voice detected. Please speak clearly into your microphone.');
        } else if (errType === 'audio-capture') {
          setMicError('No microphone hardware detected on this device.');
        } else if (errType === 'network') {
          setMicError('Network error connecting to speech service.');
        } else {
          setMicError(`Speech error (${errType || 'unknown'}). Try typing below.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
    };
  }, [language]);

  const toggleListening = async () => {
    setMicError(null);
    if (!recognitionRef.current) {
      setMicError('Speech recognition is not supported in this browser. Please type your question below.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch (_) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
      setIsListening(false);
    } else {
      // First explicitly request microphone media permissions
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach((track) => track.stop());
        } catch (permErr: any) {
          console.warn('Microphone permission rejected:', permErr);
          setMicError('Microphone permission denied. Note: Browsers block microphone access inside sandboxed preview iframes. Please open this app in a direct browser tab (using the button below) to enable microphone!');
          setIsListening(false);
          return;
        }
      }

      try {
        recognitionRef.current.lang = language === 'English' ? 'en-US' : 'fil-PH';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err: any) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
        setIsListening(false);
        setMicError('Could not start microphone. Please try clicking again or typing.');
      }
    }
  };

  // Text-to-speech spoken playback
  const speakText = (text: string) => {
    // If speaking, stop it
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    // Clean text of markdown and LaTeX symbols for natural speech
    const cleanSpeech = text
      .replace(/\$([^$]+)\$/g, 'formula $1')
      .replace(/[*#_`]/g, '')
      .replace(/Q_c/g, 'Q sub c')
      .replace(/V_LL/g, 'V line to line')
      .replace(/V_LN/g, 'V line to neutral')
      .replace(/√3/g, 'square root of 3');

    const utterance = new SpeechSynthesisUtterance(cleanSpeech.slice(0, 400));
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: String(Date.now()),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          topic: context.topic,
          subject: context.subject,
          subtopic: context.subtopic,
          contextType: context.contextType,
          lessonContext: context.lessonContext,
          questionContext: context.questionContext,
          language,
          history: messages.slice(-5).map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (!response.ok) throw new Error('Tutor service unavailable');
      const data = await response.json();
      const assistantMsgText = data.text || 'I could not generate a response. Please rephrase your question.';
      const assistantMsg: Message = {
        id: String(Date.now() + 1),
        role: 'assistant',
        text: assistantMsgText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (autoSpeak && assistantMsgText) {
        speakText(assistantMsgText);
      }
    } catch (err: any) {
      const fallbackText = 'The tutor is unavailable right now. Please try again in a moment; you can continue the visual lesson and practice questions.';
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: 'assistant',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      if (autoSpeak) {
        speakText(fallbackText);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-[#14243A] text-slate-100 shadow-2xl border-l border-slate-700/80 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#167D82]/20 border border-[#167D82]/40 flex items-center justify-center text-[#167D82]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Engr. Ramos (AI Tutor)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#167D82]/30 text-teal-300 font-mono">
                Study assistant
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 truncate max-w-[240px]">
              {context.topic || 'REE Licensure Mentor'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="p-1.5 rounded-lg bg-red-950/80 text-red-300 border border-red-700/50 hover:bg-red-900 flex items-center gap-1 text-[11px]"
              title="Stop spoken voice"
            >
              <VolumeX className="w-3.5 h-3.5" /> Stop
            </button>
          )}

          {/* Language selector */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
            <button
              onClick={() => {
                setLanguage('English');
                onSelectAppLanguage?.('en');
              }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                language === 'English' ? 'bg-[#167D82] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => {
                setLanguage('Filipino');
                onSelectAppLanguage?.('tl');
              }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                language === 'Filipino' ? 'bg-[#167D82] text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Taglish / Filipino Review style"
            >
              FIL (Tagalog)
            </button>
            <button
              onClick={() => {
                setLanguage('Cebuano');
                onSelectAppLanguage?.('ceb');
              }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                language === 'Cebuano' ? 'bg-[#167D82] text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Bisaya / Cebuano reviewee style"
            >
              CEB (Bisaya)
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Context Awareness Chip Bar */}
      <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-800/80 text-[11px] flex items-center justify-between text-slate-400">
        <span className="truncate">
          Focus: <span className="text-amber-400 font-semibold">{context.topic || 'General Review'}</span>
        </span>
        <span className="text-[10px] text-teal-400 font-mono">PRBEE Res. 40 s. 2024</span>
      </div>

      {/* Chat Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed text-sm ${
                msg.role === 'user'
                  ? 'bg-[#167D82] text-white rounded-br-xs'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-xs'
              }`}
            >
              {/* Formatted message content */}
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>

            <div className="flex items-center gap-2 mt-1 px-1">
              <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
              {msg.role === 'assistant' && (
                <button
                  onClick={() => speakText(msg.text)}
                  className="text-slate-400 hover:text-[#167D82] p-0.5 rounded transition-colors"
                  title="Read aloud"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-[#167D82]" />
            <span>
              {language === 'Filipino'
                ? 'Kasalukuyang nagkukuwenta at nagpapaliwanag si Engr. Ramos...'
                : language === 'Cebuano'
                ? 'Gakwenta ug nag-andam si Engr. Ramos sa iyang tubag...'
                : 'Engr. Ramos is solving & formulating answer...'}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-3 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
        {language === 'Filipino' ? (
          <>
            <button
              onClick={() =>
                handleSend(
                  'Ipaliwanag mo sa akin ito nang napakasimple sa Tagalog, na parang 10 years old ako. Bigyan mo ako ng kwento sa totoong buhay.'
                )
              }
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>🧸 Ipaliwanag nang Simple</span>
            </button>
            <button
              onClick={() =>
                handleSend(
                  'Magpakita ka ng halimbawa gamit ang napakadadaling numero tulad ng 2, 5, o 10 sa bawat hakbang.'
                )
              }
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>🍼 Madaling Numero (1, 2, 3)</span>
            </button>
            <button
              onClick={() =>
                handleSend(
                  'Bigyan mo ako ng pahiwatig (hint) sa problemang ito nang hindi sinasabi ang huling sagot.'
                )
              }
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1"
            >
              <span>💡 Pahiwatig (Hint)</span>
            </button>
            <button
              onClick={() => {
                setLanguage('Cebuano');
                onSelectAppLanguage?.('ceb');
                handleSend('Engr. Ramos, palihog i-explain pud kini kanako sa Binisaya!');
              }}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>🌴 I-Bisaya palihog</span>
            </button>
          </>
        ) : language === 'Cebuano' ? (
          <>
            <button
              onClick={() =>
                handleSend(
                  'I-explain palihog sa akoa kini sa yano kaayong paagi sa Bisaya, nga morag 10 anyos ko. Hatagi ko og istorya sa tinuod nga kinabuhi.'
                )
              }
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>🧸 I-explain og Yano</span>
            </button>
            <button
              onClick={() =>
                handleSend(
                  'Pakitai ko og pananglitan gamit ang ginagmay ug sayon nga numero sama sa 2, 5, o 10 sa matag lakang.'
                )
              }
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>🍼 Ginagmayng Numero</span>
            </button>
            <button
              onClick={() =>
                handleSend(
                  'Hatagi ko og hint o giya niining problemang kuryente nga dili ihatag ang tubag.'
                )
              }
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1"
            >
              <span>💡 Hatagi ko og Hint</span>
            </button>
            <button
              onClick={() => {
                setLanguage('Filipino');
                onSelectAppLanguage?.('tl');
                handleSend('Engr. Ramos, paki-explain din po ito sa Tagalog!');
              }}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>🇵🇭 I-Tagalog naman</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() =>
                handleSend(
                  'Explain this to me in super simple words, like I am 10 years old. Give me an everyday real-life story.'
                )
              }
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>🧸 Explain Like I'm 10</span>
            </button>
            <button
              onClick={() => {
                setLanguage('Filipino');
                onSelectAppLanguage?.('tl');
                handleSend('Engr. Ramos, ipaliwanag mo po ito sa akin sa Tagalog gamit ang simpleng mga salita.');
              }}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>🇵🇭 Explain in Tagalog</span>
            </button>
            <button
              onClick={() => {
                setLanguage('Cebuano');
                onSelectAppLanguage?.('ceb');
                handleSend('Engr. Ramos, palihog i-explain kini sa akoa sa Bisaya / Cebuano!');
              }}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>🌴 Explain in Bisaya</span>
            </button>
            <button
              onClick={() =>
                handleSend(
                  'Show me a baby-step example using very easy small numbers like 2, 5, or 10.'
                )
              }
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>🍼 Easy Small Numbers</span>
            </button>
            <button
              onClick={() => handleSend('Give me a hint without spoiling the final answer.')}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1"
            >
              <span>💡 Give Hint</span>
            </button>
          </>
        )}
      </div>

      {/* Input area */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 space-y-2">
        {/* Mic Error Banner */}
        {micError && (
          <div className="flex flex-col gap-2 text-xs bg-amber-950/90 text-amber-200 border border-amber-700/90 p-3 rounded-lg">
            <div className="flex items-start gap-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{micError}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 self-end">
              <a
                href={window.location.origin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px] transition-colors shadow-xs"
              >
                Open Direct Tab ↗️
              </a>
              <button
                onClick={() => setMicError(null)}
                className="text-[10px] font-bold text-slate-400 hover:text-white px-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Listening live banner */}
        {isListening && (
          <div className="flex items-center justify-between text-xs bg-red-950/80 text-red-300 border border-red-800/80 px-3 py-1.5 rounded-lg animate-pulse">
            <div className="flex items-center gap-1.5 font-medium">
              <Mic className="w-3.5 h-3.5 text-red-400" />
              <span>Listening live... Speak into microphone.</span>
            </div>
            <button
              onClick={toggleListening}
              className="text-[10px] underline font-bold hover:text-white"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={toggleListening}
            className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
              isListening
                ? 'bg-red-600 border-red-500 text-white animate-pulse shadow-md'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-750'
            }`}
            title={isListening ? 'Listening... Click to stop' : 'Ask live via microphone'}
          >
            {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5 text-slate-400" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              language === 'Filipino'
                ? 'Magtanong kay Engr. Ramos (o pindutin ang mic para Magsalita nang Live)...'
                : language === 'Cebuano'
                ? 'Pangutana kay Engr. Ramos (o pindota ang mic para Magsulti nang Live)...'
                : 'Ask Engr. Ramos or click mic to Speak Live...'
            }
            className="flex-1 bg-slate-950 text-white placeholder-slate-500 rounded-xl px-3.5 py-2.5 text-sm border border-slate-700 focus:outline-hidden focus:border-[#167D82]"
          />

          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
              autoSpeak
                ? 'bg-teal-950 border-teal-600 text-teal-300'
                : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}
            title={autoSpeak ? 'Live Voice Response Enabled (Click to Mute)' : 'Click to Enable Voice Response'}
          >
            {autoSpeak ? <Volume2 className="w-4 h-4 text-teal-300" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            disabled={!input.trim() || isLoading}
            onClick={() => handleSend()}
            className={`p-2.5 rounded-xl font-semibold transition-all ${
              input.trim() && !isLoading
                ? 'bg-[#167D82] text-white hover:bg-[#167D82]/90 shadow-md'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
