
import React, { useState } from 'react';
import { getBaristaRecommendation } from '../services/geminiService';
import { 
  Loader2, Sparkles, Quote, CloudRain, Sun, Cloud, Snowflake, Wind,
  Smile, Frown, Brain, Zap, Heart, Coffee
} from 'lucide-react';

interface AIBaristaProps {
  onRecommendation: (itemName: string) => void;
}

const WEATHER_OPTIONS = [
  { id: 'rainy', label: 'Rainy', icon: CloudRain },
  { id: 'sunny', label: 'Sunny', icon: Sun },
  { id: 'foggy', label: 'Foggy', icon: Cloud },
  { id: 'snowy', label: 'Snowy', icon: Snowflake },
  { id: 'windy', label: 'Windy', icon: Wind },
];

const MOOD_PRESETS = [
  { id: 'inspired', label: 'Inspired', icon: Sparkles, text: "I feel a surge of creative energy, like the first light of dawn breaking through the mist." },
  { id: 'melancholic', label: 'Melancholic', icon: Frown, text: "There is a quiet sadness today, a gentle rain falling within the soul." },
  { id: 'thoughtful', label: 'Thoughtful', icon: Brain, text: "My mind is a labyrinth of questions, seeking a thread of clarity amidst the shadows." },
  { id: 'energetic', label: 'Energetic', icon: Zap, text: "I am ready to seize the day with the strength of a thousand suns." },
  { id: 'peaceful', label: 'Peaceful', icon: Heart, text: "A profound stillness has settled over me, like a calm lake at twilight." },
  { id: 'weary', label: 'Weary', icon: Coffee, text: "The journey has been long, and I seek a moment of restorative warmth." },
];

export const AIBarista: React.FC<AIBaristaProps> = ({ onRecommendation }) => {
  const [mood, setMood] = useState('');
  const [weather, setWeather] = useState('rainy');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [activeMoodId, setActiveMoodId] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!mood) return;
    setLoading(true);
    const result = await getBaristaRecommendation(mood, weather);
    setResponse(result.recommendation);
    onRecommendation(result.item_name);
    setLoading(false);
  };

  const handleMoodSelect = (preset: typeof MOOD_PRESETS[0]) => {
    setMood(preset.text);
    setActiveMoodId(preset.id);
  };

  return (
    <section className="bg-espresso text-oat p-8 md:p-12 rounded-organic relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-moss/10 rounded-full blur-[80px] -ml-20 -mb-20"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        <div className="flex justify-center mb-2">
          <div className="p-4 bg-oat/5 border border-oat/10 rounded-full animate-float">
            <Sparkles className="w-8 h-8 text-clay" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="font-serif text-3xl md:text-5xl italic font-medium tracking-tight">
            Consult Socrates
          </h2>
          <p className="font-accent text-clay italic text-lg md:text-xl opacity-90 leading-relaxed">
            "An unexamined morning is not worth drinking. Tell me, what stirs in your soul today?"
          </p>
        </div>

        {/* Mood Presets */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {MOOD_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleMoodSelect(preset)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 border ${
                activeMoodId === preset.id 
                ? 'bg-forest/30 border-forest text-oat' 
                : 'bg-white/5 border-white/10 text-oat/60 hover:bg-white/10 hover:text-oat'
              }`}
            >
              <preset.icon size={20} className={activeMoodId === preset.id ? 'animate-pulse' : ''} />
              <span className="text-[10px] uppercase tracking-widest font-medium">{preset.label}</span>
            </button>
          ))}
        </div>
        
        <div className="space-y-6 mt-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-shrink-0 md:w-48">
                <select 
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  className="w-full bg-white/5 border border-oat/20 rounded-full px-6 py-4 text-oat focus:outline-none focus:ring-2 focus:ring-forest/50 transition-all text-lg appearance-none cursor-pointer hover:bg-white/10 h-full"
                >
                  {WEATHER_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id} className="bg-espresso text-oat">
                      {opt.label} Sky
                    </option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-oat/40">
                  {React.createElement(WEATHER_OPTIONS.find(o => o.id === weather)?.icon || CloudRain, { size: 20 })}
                </div>
              </div>

              <div className="flex-1 relative">
                <textarea 
                  value={mood}
                  onChange={(e) => {
                    setMood(e.target.value);
                    setActiveMoodId(null);
                  }}
                  placeholder="Describe your inner landscape... perhaps the way the light hits the floor, or a memory that won't leave you."
                  className="w-full bg-white/5 border border-oat/20 rounded-3xl px-8 py-5 text-oat placeholder-oat/30 focus:outline-none focus:ring-2 focus:ring-forest/50 transition-all text-lg min-h-[120px] resize-none font-accent italic"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handleAsk}
              disabled={loading || !mood}
              className="w-full md:w-auto bg-forest hover:bg-moss text-oat px-12 py-4 rounded-full font-serif text-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg hover:shadow-forest/20 active:scale-95 duration-200"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Ask Socrates'}
            </button>
          </div>
        </div>

        {response && (
          <div className="mt-12 p-8 md:p-12 bg-oat text-espresso rounded-organic floating-paper border border-white/50 relative text-left animate-slide-up-fade">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-forest text-oat px-5 py-1.5 rounded-full text-xs font-accent italic tracking-wide shadow-sm">
              Philosophical Counsel
            </div>
            
            <Quote className="w-10 h-10 text-forest/10 mb-6" />
            
            <div className="space-y-6">
              <p className="font-accent italic text-xl md:text-2xl leading-relaxed text-espresso/90 first-letter:text-4xl first-letter:font-serif first-letter:mr-1 first-letter:float-left">
                {response}
              </p>
            </div>
            
            <div className="mt-10 pt-6 border-t border-espresso/5 flex justify-between items-center">
              <div className="font-serif italic text-espresso/40 text-sm tracking-widest uppercase">
                — Socrates the Barista
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-forest/20 rounded-full" />)}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
