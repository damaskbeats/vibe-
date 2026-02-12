
import React, { useState, useEffect } from 'react';
import { MENU_ITEMS } from './constants';
import { MenuItem, CartItem } from './types';
import { MenuCard } from './components/MenuCard';
import { AIBarista } from './components/AIBarista';
import { generate3DLogo } from './services/imageService';
import { 
  ShoppingBasket, Leaf, Croissant, X, ChevronRight, Wind, 
  Loader2, Coffee, Moon, Sun 
} from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [recommendedItem, setRecommendedItem] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLogoLoading, setIsLogoLoading] = useState(true);
  const [theme, setTheme] = useState<'warm' | 'cool'>('warm');

  useEffect(() => {
    const fetchLogo = async () => {
      const url = await generate3DLogo();
      setLogoUrl(url);
      setIsLogoLoading(false);
    };
    fetchLogo();
  }, []);

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    if (item.name === recommendedItem) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const total = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  const toggleTheme = () => {
    setTheme(prev => prev === 'warm' ? 'cool' : 'warm');
  };

  return (
    <div className={`min-h-screen relative font-sans text-espresso selection:bg-forest selection:text-oat transition-colors duration-500 ${theme === 'cool' ? 'theme-cool' : ''}`}>
      <div className="rain-overlay" />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-oat/80 backdrop-blur-md border-b border-cream py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center overflow-hidden border border-espresso/5 shadow-inner">
            {isLogoLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-espresso/20" />
            ) : logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Socrates Logo" 
                className="w-full h-full object-cover scale-110 animate-logo-entrance logo-hover cursor-pointer" 
              />
            ) : (
              <div className="w-full h-full bg-espresso flex items-center justify-center text-oat font-serif text-xl italic">S</div>
            )}
          </div>
          <h1 className="font-serif text-2xl tracking-tight italic font-bold hidden sm:block">SOCRATES</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-6">
          <button 
            onClick={toggleTheme}
            className="p-2.5 hover:bg-cream rounded-full transition-all group relative overflow-hidden"
            title={theme === 'warm' ? 'Switch to Cool Minimalist' : 'Switch to Warm Cozy'}
          >
            <div className="relative z-10">
              {theme === 'warm' ? (
                <Moon className="w-5 h-5 text-espresso group-hover:text-forest transition-colors" />
              ) : (
                <Sun className="w-5 h-5 text-espresso group-hover:text-forest transition-colors" />
              )}
            </div>
            <div className="absolute inset-0 bg-forest/5 scale-0 group-hover:scale-100 transition-transform rounded-full"></div>
          </button>

          <button 
            onClick={scrollToMenu}
            className="bg-forest text-oat px-5 py-2 rounded-full font-serif italic text-sm md:text-base hover:bg-espresso transition-all hover:shadow-[0_4px_12px_-2px_rgba(58,90,64,0.3)] active:scale-95"
          >
            Order Now
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-cream rounded-full transition-colors group"
          >
            <ShoppingBasket className="w-6 h-6 text-espresso group-hover:text-forest transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-forest text-oat text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-oat font-bold">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-24">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-moss/10 text-forest rounded-full text-sm font-medium border border-moss/20">
              <Wind className="w-4 h-4" />
              <span>{theme === 'warm' ? 'Cozy Rainy Morning Special' : 'Crisp Minimalist Morning'}</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight">
              Savor the <span className="italic text-forest">{theme === 'warm' ? 'Philosophical' : 'Essential'}</span> Silence.
            </h2>
            <p className="text-xl text-espresso/60 font-accent italic leading-relaxed max-w-md">
              A boutique escape where every bean is curated, and every dialogue begins with the examined life.
            </p>
            <div className="flex gap-4 pt-4">
              <button onClick={scrollToMenu} className="bg-espresso text-oat px-8 py-4 rounded-full font-serif text-lg hover:bg-forest transition-colors">
                Explore Menu
              </button>
              <button className="border border-espresso/20 px-8 py-4 rounded-full font-serif text-lg hover:bg-cream transition-colors">
                The Dialectic
              </button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-clay/20 rounded-organic blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700"></div>
            <div className="relative overflow-hidden rounded-organic floating-paper shadow-2xl">
               <img 
                src={theme === 'warm' 
                  ? "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
                  : "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                } 
                alt="Cafe Interior" 
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              {logoUrl && (
                <div className="absolute bottom-8 right-8 w-32 h-32 rounded-2xl bg-oat/90 backdrop-blur-md p-1 shadow-2xl border border-white/50 animate-float overflow-hidden">
                  <img 
                    src={logoUrl} 
                    alt="3D Logo Mark" 
                    className="w-full h-full object-cover rounded-xl animate-logo-entrance logo-hover cursor-pointer" 
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* AI Barista Tool */}
        <AIBarista onRecommendation={(name) => {
          setRecommendedItem(name);
          scrollToMenu();
        }} />

        {/* Menu Grid */}
        <section id="menu-section" className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="font-serif text-4xl italic">Handcrafted Menu</h2>
              <p className="font-accent text-espresso/50">Small batches, prepared with deep intention.</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {['All', 'Coffee', 'Tea', 'Pastry', 'Specialty'].map((cat) => (
                <button key={cat} className="whitespace-nowrap px-6 py-2 rounded-full border border-espresso/10 hover:border-forest hover:text-forest transition-all font-medium text-sm">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MENU_ITEMS.map((item) => (
              <MenuCard 
                key={item.id} 
                item={item} 
                onAdd={addToCart} 
                isRecommended={item.name === recommendedItem}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Cart Drawer */}
      <div className={`fixed inset-0 z-50 transition-transparency ${isCartOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-espresso/40 backdrop-blur-sm transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsCartOpen(false)}
        />
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-oat shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 border-b border-cream flex justify-between items-center">
            <h3 className="font-serif text-2xl italic">Your Morning Tray</h3>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-cream rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-slide-up-fade">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-forest/5 rounded-full blur-2xl animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-cream rounded-organic flex items-center justify-center shadow-inner border border-espresso/5 animate-float group">
                     {logoUrl ? (
                       <img src={logoUrl} className="w-16 h-16 opacity-40 grayscale group-hover:opacity-100 transition-all duration-700" alt="logo" />
                     ) : (
                       <Coffee className="w-10 h-10 text-espresso/20" />
                     )}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-serif text-2xl italic text-espresso tracking-tight">An empty vessel...</h4>
                  <p className="font-accent italic text-espresso/50 leading-relaxed max-w-[280px] mx-auto">
                    "Much like the mind before the first pour, your tray awaits the warmth of a companion."
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    scrollToMenu();
                  }}
                  className="mt-10 group flex items-center gap-2 text-forest font-serif italic text-lg hover:text-espresso transition-all duration-300"
                >
                  Seek your companion
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl floating-paper">
                  <img src={item.image} className="w-20 h-20 object-cover rounded-xl" alt={item.name} />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between">
                      <h4 className="font-serif text-lg">{item.name}</h4>
                      <button onClick={() => removeFromCart(item.id)} className="text-espresso/30 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-accent text-moss">Qty: {item.quantity}</p>
                      <p className="font-bold text-forest">R{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-8 bg-cream space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-espresso/60 italic">
                <span>Gratitude (Tax)</span>
                <span>R{(total * 0.15).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-serif text-2xl">
                <span>Total Amount</span>
                <span>R{(total * 1.15).toFixed(2)}</span>
              </div>
            </div>
            <button 
              disabled={cart.length === 0}
              className="w-full bg-forest text-oat py-4 rounded-full font-serif text-xl hover:bg-espresso transition-colors disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
              Order & Pour
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-xs text-espresso/40 font-accent italic">
              * Estimated preparation time: 8-12 minutes of slow-brewed care.
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-cream/50 py-12 px-6 border-t border-cream text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex justify-center gap-4 text-forest mb-4 items-center">
            <Leaf className="w-6 h-6" />
            {logoUrl && <img src={logoUrl} className="w-10 h-10 rounded-lg shadow-sm animate-logo-entrance logo-hover cursor-pointer" alt="footer logo" />}
            <Croissant className="w-6 h-6" />
          </div>
          <h4 className="font-serif text-xl italic text-espresso">SOCRATES</h4>
          <p className="font-accent text-espresso/40 italic">
            124 Rainy Meadow Lane, Artisanal District<br />
            Mon-Sun: Early Light until Dusk
          </p>
          <div className="pt-6 text-[10px] tracking-widest text-espresso/20 uppercase">
            © 2024 SOCRATES • Naturally Sourced • Slow Brewed
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
