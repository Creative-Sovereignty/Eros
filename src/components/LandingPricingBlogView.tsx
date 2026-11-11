import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Compass, 
  ShieldCheck, 
  Download, 
  Smartphone, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Crown, 
  Coins, 
  Lock, 
  Share2, 
  Heart, 
  MessageCircle, 
  X, 
  ExternalLink,
  Zap,
  Check,
  UserCheck,
  Globe,
  HelpCircle,
  Play,
  RotateCcw
} from 'lucide-react';

import { ErosLogo } from './ErosLogo';
import { PrivacyPolicyView } from './legal/PrivacyPolicyView';
import { TermsOfServiceView } from './legal/TermsOfServiceView';
import { SafetyCenterView } from './legal/SafetyCenterView';
import { SupportCenterView } from './legal/SupportCenterView';
import { PWAInstallButton } from './PWAInstallButton';

export type LandingHubTab = 'landing' | 'pricing' | 'blog' | 'downloads' | 'privacy' | 'terms' | 'safety' | 'support';

interface LandingPricingBlogViewProps {
  onClose?: () => void;
  onExploreApp: () => void;
  onUpgradeVip: () => void;
  onBuyCoins: () => void;
  onOpenPortal?: () => void;
  onOpenCopywritingBible?: () => void;
  onOpenRefundPolicy?: () => void;
  initialTab?: LandingHubTab;
}

export const LandingPricingBlogView: React.FC<LandingPricingBlogViewProps> = ({
  onClose,
  onExploreApp,
  onUpgradeVip,
  onBuyCoins,
  onOpenPortal,
  onOpenCopywritingBible,
  onOpenRefundPolicy,
  initialTab = 'landing'
}) => {
  const [activeTab, setActiveTab] = useState<LandingHubTab>(initialTab);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadSent, setDownloadSent] = useState(false);

  const blogArticles = [
    {
      id: 'art_1',
      title: '10 Secrets to Capturing the Perfect 10-Second Vibe Reel',
      category: 'Video Creator Tips',
      readTime: '4 min read',
      date: 'October 28, 2026',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      summary: 'Learn how lighting, natural energy, and authentic 10-second clips multiply your spark rate and initiate chats instantly.',
      content: `
        On Pulse / ErosDreamz, you have precisely 10 seconds to make an unforgettable first impression. In a fast-moving stream of nearby men, standard selfies no longer cut it. Here is how top creators stand out:
        
        1. Lighting is King: Film near natural window light or ring light. Avoid heavy backlighting.
        2. Move Naturally: Don't pose like a statue. A genuine smile, a quick wave, or showing off your workout/dog builds instant emotional connection.
        3. Keep Audio Crisp: Use your phone microphone in a quiet room or wear wireless earbuds. Crisp voice notes or upbeat background tracks hook viewers immediately.
        4. Authentic Captions: Pair your video with a witty prompt like "Grab a drink in West Hollywood tonight?" to prompt immediate taps and messages.
      `
    },
    {
      id: 'art_2',
      title: 'Navigating West Hollywood & City Nightlife Dating Safely',
      category: 'Safety & Lifestyle',
      readTime: '6 min read',
      date: 'October 24, 2026',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      summary: 'Essential guidelines for meeting up in high-density urban zones, verifying IDs, and utilizing our 35-hour private vault.',
      content: `
        Meeting local guys for drinks or weekend rooftop hangouts should be exhilarating and secure. Pulse was built from the ground up with men's safety in mind:
        
        - 18+ Liveness Verification: Every verified badge on our platform requires facial liveness checks, eliminating catfishing and fake accounts.
        - Public Meeting First: Always meet in bustling venues like West Hollywood lounges or Chelsea cafes.
        - The 35-Hour Auto-Relock Vault: When sharing private moments, our industry-first 35-hour expiration timer ensures your media automatically relocks for ultimate peace of mind.
      `
    },
    {
      id: 'art_3',
      title: 'Why the 35-Hour Auto-Relock Vault Changes Mobile Privacy',
      category: 'Product Updates',
      readTime: '5 min read',
      date: 'October 19, 2026',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      summary: 'Deep dive into our cryptographic time-lock protocol designed to give you total control over your confidential folders.',
      content: `
        Privacy in modern dating apps is broken. Screenshots and permanent storage leave users vulnerable. That is why Pulse introduced the 35-Hour Auto-Relock Vault.
        
        When you grant access to your private folder to a trusted connection, access is strictly metered for 35 hours. Once the clock expires, files automatically relock unless access is actively renewed. You maintain 100% control over your digital footprint.
      `
    },
    {
      id: 'art_4',
      title: 'Top 5 Icebreakers That Spark Instant Chemistry in Chat',
      category: 'Dating Advice',
      readTime: '3 min read',
      date: 'October 15, 2026',
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
      summary: 'Skip the boring "hey" and master the art of starting engaging conversations backed by video reactions and flame taps.',
      content: `
        Saying "hey" has a 90% ignore rate. Instead, use ErosDreamz's interactive features to kick off meaningful banter:
        
        1. React to their 10s video soundtrack or background location.
        2. Send an instant Flame Tap with a customized prompt.
        3. Drop a virtual cocktail or crown gift to show appreciation.
        4. Ask about their weekend plans or favorite local spot in the city.
      `
    }
  ];

  const handleSendSmsDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadEmail.includes('@')) {
      alert('Please enter a valid email or phone number.');
      return;
    }
    setDownloadSent(true);
    setTimeout(() => {
      setDownloadSent(false);
      setDownloadEmail('');
      alert('Download link sent successfully! Check your inbox.');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-zinc-100 flex flex-col font-sans select-none antialiased">
      {/* Top Banner & Hub Navigation */}
      <header className="sticky top-0 z-50 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-purple-900/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ErosLogo size="md" glow={true} />
        </div>

        {/* Hub Navigation Tabs */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-900/90 border border-purple-900/40 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'landing'
                ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-lg shadow-pink-500/25'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Landing Page
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'pricing'
                ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-lg shadow-pink-500/25'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Crown className="w-4 h-4" />
            Pricing & VIP
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'blog'
                ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-lg shadow-pink-500/25'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Blog & Guides
          </button>
          <button
            onClick={() => setActiveTab('downloads')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'downloads'
                ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-lg shadow-pink-500/25'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            App Store Links
          </button>
        </div>

        {/* Action Button: Back to App */}
        <div className="flex items-center gap-2">
          {onOpenRefundPolicy && (
            <button
              onClick={onOpenRefundPolicy}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>Refunds</span>
            </button>
          )}

          {onOpenPortal && (
            <button
              onClick={onOpenPortal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-500/40 text-xs font-bold transition"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>my.erosdreamz</span>
            </button>
          )}

          {onOpenCopywritingBible && (
            <button
              onClick={onOpenCopywritingBible}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/40 text-xs font-bold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Copywriting</span>
            </button>
          )}

          <button
            onClick={onExploreApp}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black text-xs font-black shadow-lg shadow-pink-500/30 hover:scale-105 transition flex items-center gap-2"
          >
            <Flame className="w-4 h-4 fill-current" />
            Launch App
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition"
              title="Close Hub"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      {/* Mobile Subheader Tabs */}
      <div className="md:hidden flex items-center gap-1.5 overflow-x-auto scrollbar-none bg-zinc-950 border-b border-purple-900/30 px-3 py-2">
        <button
          onClick={() => setActiveTab('landing')}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap ${activeTab === 'landing' ? 'bg-pink-500 text-black' : 'text-zinc-400'}`}
        >
          Landing
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap ${activeTab === 'pricing' ? 'bg-pink-500 text-black' : 'text-zinc-400'}`}
        >
          Pricing
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap ${activeTab === 'blog' ? 'bg-pink-500 text-black' : 'text-zinc-400'}`}
        >
          Blog
        </button>
        <button
          onClick={() => setActiveTab('downloads')}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap ${activeTab === 'downloads' ? 'bg-pink-500 text-black' : 'text-zinc-400'}`}
        >
          Downloads
        </button>
        {['privacy', 'terms', 'safety', 'support'].includes(activeTab) && (
          <button
            className="text-xs font-bold px-3 py-1.5 rounded-xl bg-pink-500 text-black whitespace-nowrap capitalize"
          >
            {activeTab === 'privacy' && 'Privacy Policy'}
            {activeTab === 'terms' && 'Terms of Service'}
            {activeTab === 'safety' && 'Safety Center'}
            {activeTab === 'support' && 'Support Desk'}
          </button>
        )}
      </div>

      {/* CONTENT SWITCHER */}
      <div className="flex-1 flex flex-col">
        {/* 1. LANDING PAGE MODE */}
        {activeTab === 'landing' && (
          <div className="flex-1 flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32 px-6 flex flex-col items-center text-center bg-gradient-to-b from-[#0A0A0F] via-purple-950/20 to-[#0A0A0F]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.15)_0,transparent_70%)] pointer-events-none" />
              
              <div className="mb-8">
                <ErosLogo size="xl" layout="stacked" glow={true} />
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold mb-6 animate-pulse">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>The #1 Short-Form Video Dating & Nearby Radar App for Men</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-4xl text-white mb-6 leading-[1.1]">
                10-Second Vibes Meet <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">Nearby Sparks</span>
              </h1>

              <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed">
                Skip endless swiping. Discover real guys nearby through authentic 10-second video reels, live radar grids, secure 35-hour private vaults, and instant social chats.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center mb-16">
                <button
                  onClick={onExploreApp}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-black text-sm shadow-xl shadow-pink-500/30 hover:scale-105 transition flex items-center justify-center gap-3"
                >
                  <Flame className="w-5 h-5 fill-current" />
                  <span>Explore Live Feed Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('downloads')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm border border-zinc-800 transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download App</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full pt-8 border-t border-zinc-800/80">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-cyan-400 font-mono">150K+</span>
                  <span className="text-xs text-zinc-400 font-medium">Verified Active Guys</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-pink-500 font-mono">99.8%</span>
                  <span className="text-xs text-zinc-400 font-medium">Liveness Verified 18+</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-purple-400 font-mono">4.9 ★</span>
                  <span className="text-xs text-zinc-400 font-medium">App Store Rating</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-cyan-400 font-mono">35 Hrs</span>
                  <span className="text-xs text-zinc-400 font-medium">Secure Vault Auto-Relock</span>
                </div>
              </div>
            </section>

            {/* Core Features Grid */}
            <section className="py-20 px-6 bg-zinc-950/60 border-t border-zinc-900">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                    Engineered for Instant Chemistry
                  </h2>
                  <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
                    Every feature on ErosDreamz is meticulously crafted to eliminate guesswork and spark real connections.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-purple-900/40 p-8 rounded-3xl relative overflow-hidden group hover:border-pink-500/50 transition">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-pink-500 p-0.5 mb-6 shadow-lg shadow-pink-500/20">
                      <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-pink-400">
                        <Flame className="w-7 h-7 fill-current" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">10-Second Vibe Reels</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Record or upload dynamic 10-second clips showing your true energy, workouts, and night-out vibe. No boring text-only profiles.
                    </p>
                  </div>

                  <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-purple-900/40 p-8 rounded-3xl relative overflow-hidden group hover:border-cyan-500/50 transition">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-600 p-0.5 mb-6 shadow-lg shadow-cyan-500/20">
                      <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-cyan-400">
                        <Compass className="w-7 h-7" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Live Radar & Distance Grid</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Scan nearby guys within 1 to 25 miles in real-time. Filter by tribe, age, looking-for preferences, and online status instantly.
                    </p>
                  </div>

                  <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-purple-900/40 p-8 rounded-3xl relative overflow-hidden group hover:border-purple-500/50 transition">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 p-0.5 mb-6 shadow-lg shadow-purple-500/20">
                      <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-purple-400">
                        <Lock className="w-7 h-7" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">35-Hour Auto-Relock Vault</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Share confidential private folder items with absolute peace of mind. Files automatically relock after 35 hours unless renewed.
                    </p>
                  </div>
                </div>

                {/* The Legend of Eros's Crossed Arrows */}
                <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#0D0D14] to-slate-400/10 border border-amber-500/30 relative overflow-hidden">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <ErosLogo size="lg" layout="icon-only" glow={true} />
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                        <span>The Myth of the Dual Arrows</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                        The Gold Arrow of Passion & The Silver Arrow of Truth
                      </h3>
                      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-4">
                        In classical Roman lore, Cupid (Eros) wielded two sacred arrows: one of radiant <strong className="text-amber-400">Gold</strong> that sparks magnetic attraction and ignites desire, and one of moonlit <strong className="text-slate-200">Silver</strong> that turns away toxicity, protects your privacy, and clears the air.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-left">
                          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                            ✦ The Gold Arrow
                          </span>
                          <span className="text-xs text-zinc-300">
                            Draws you to real guys through 10-second video reels, live proximity radar, and genuine sparks.
                          </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-400/30 text-left">
                          <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block mb-1">
                            ✦ The Silver Arrow
                          </span>
                          <span className="text-xs text-zinc-300">
                            Wards off catfish and bots with strict 18+ facial verification and 35-hour auto-relocking vaults.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-6 bg-[#0A0A0F]">
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-black text-white mb-12">Loved by Guys Worldwide</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl text-left">
                    <div className="flex items-center gap-1 text-yellow-400 mb-3">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-zinc-300 text-sm mb-4">
                      "The 10-second video format is a game changer. You instantly know who you have chemistry with before messaging. Met my boyfriend in West Hollywood through the radar!"
                    </p>
                    <div className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="User" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="text-xs font-bold text-white">Lucas M. (28)</div>
                        <div className="text-[10px] text-cyan-400">Verified Vibe Creator</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl text-left">
                    <div className="flex items-center gap-1 text-yellow-400 mb-3">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-zinc-300 text-sm mb-4">
                      "The 35-hour private vault feature gives me total control over my privacy. Plus, the 18+ liveness verification keeps spam bots completely away."
                    </p>
                    <div className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80" alt="User" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="text-xs font-bold text-white">Julian S. (32)</div>
                        <div className="text-[10px] text-pink-400">VIP Gold Member</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl text-left">
                    <div className="flex items-center gap-1 text-yellow-400 mb-3">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-zinc-300 text-sm mb-4">
                      "Super fast, sleek cyberpunk aesthetic, and incredible local matches. Best dating app I've ever used."
                    </p>
                    <div className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="text-xs font-bold text-white">Mateo R. (25)</div>
                        <div className="text-[10px] text-purple-400">Verified Jock</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2. PRICING & VIP MODE */}
        {activeTab === 'pricing' && (
          <div className="flex-1 py-16 px-6 max-w-6xl mx-auto w-full">
            <div className="text-center mb-16">
              <span className="text-pink-400 text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 bg-pink-500/10 rounded-full border border-pink-500/20">
                Unlock Full Potential
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
                VIP Membership & Eros Coins
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
                Upgrade to VIP Gold for ad-free browsing, advanced radar filters, and unlimited profile boosts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Free Tier */}
              <div className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="text-zinc-400 text-xs font-mono font-bold uppercase mb-2">Standard Vibe</div>
                  <div className="text-3xl font-black text-white mb-6">Free</div>
                  <ul className="space-y-3 mb-8 text-sm text-zinc-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Browse 10s video stream</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Nearby radar (up to 5 mi)</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> 18+ Liveness verification</li>
                    <li className="flex items-center gap-2 text-zinc-500"><X className="w-4 h-4 text-zinc-600" /> Ad-free experience</li>
                  </ul>
                </div>
                <button
                  onClick={onExploreApp}
                  className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition"
                >
                  Current Plan
                </button>
              </div>

              {/* VIP Gold Tier (Most Popular) */}
              <div className="bg-gradient-to-b from-zinc-900 via-zinc-900 to-purple-950/60 border-2 border-pink-500 p-8 rounded-3xl flex flex-col justify-between relative shadow-2xl shadow-pink-500/20">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-pink-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  Most Popular ★
                </div>
                <div>
                  <div className="text-pink-400 text-xs font-mono font-bold uppercase mb-2">VIP Gold Elite</div>
                  <div className="text-3xl font-black text-white mb-1">$9.99 <span className="text-xs font-normal text-zinc-400">/ month</span></div>
                  <div className="text-[11px] text-cyan-400 font-medium mb-6">Billed annually ($119/yr) or $14.99 monthly</div>
                  <ul className="space-y-3 mb-8 text-sm text-zinc-200">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-pink-400" /> 100% Ad-free browsing</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-pink-400" /> Unlimited radar distance & filters</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-pink-400" /> Priority placement in nearby radar</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-pink-400" /> 35-Hour Auto-Relock Vault access</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-pink-400" /> See who liked your video</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    onUpgradeVip();
                    alert('★ VIP Gold Membership Activated Successfully!');
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-black text-xs shadow-lg shadow-pink-500/30 hover:scale-105 transition"
                >
                  Upgrade to VIP Gold
                </button>
              </div>

              {/* Eros Coin Refill Pack */}
              <div className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="text-cyan-400 text-xs font-mono font-bold uppercase mb-2">Eros Coin Vault</div>
                  <div className="text-3xl font-black text-white mb-6">500 Coins <span className="text-xs font-normal text-cyan-400">$4.99</span></div>
                  <ul className="space-y-3 mb-8 text-sm text-zinc-300">
                    <li className="flex items-center gap-2"><Coins className="w-4 h-4 text-cyan-400" /> Send virtual luxury gifts</li>
                    <li className="flex items-center gap-2"><Coins className="w-4 h-4 text-cyan-400" /> Activate Profile Surge Boost</li>
                    <li className="flex items-center gap-2"><Coins className="w-4 h-4 text-cyan-400" /> Send direct Super Flame messages</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Never expires</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    onBuyCoins();
                    alert('⚡ Added 500 Eros Coins to your wallet!');
                  }}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs transition"
                >
                  Refill Coins ($4.99)
                </button>
              </div>
            </div>

            {/* 100% Satisfaction & 14-Day Refund Firewall Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/30 via-zinc-900 to-cyan-950/30 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                  <RotateCcw className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white flex items-center gap-2">
                    <span>The ErosDreamz 100% Satisfaction & 14-Day Refund Firewall</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Zero Risk</span>
                  </h4>
                  <p className="text-xs text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                    Unused Eros Coins are 100% refundable within 14 days of purchase. VIP Gold subscriptions are backed by our 30-day money-back satisfaction guarantee. Self-service instant claim processing with no hassle.
                  </p>
                </div>
              </div>
              {onOpenRefundPolicy && (
                <button
                  onClick={onOpenRefundPolicy}
                  className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2 flex-shrink-0"
                >
                  <span>Open Refund Center</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* 3. BLOG & GUIDES MODE */}
        {activeTab === 'blog' && (
          <div className="flex-1 py-16 px-6 max-w-6xl mx-auto w-full">
            <div className="text-center mb-16">
              <span className="text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                Pulse Editorial
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
                Dating Tips, Safety & Creator Insights
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
                Expert advice on video creation, urban nightlife, and building meaningful connections.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogArticles.map(art => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="bg-zinc-900/80 border border-zinc-800 hover:border-pink-500/50 rounded-3xl overflow-hidden cursor-pointer group transition flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-cyan-400 border border-cyan-500/30">
                      {art.category}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono mb-2">
                        <span>{art.date}</span>
                        <span>•</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition mb-3">
                        {art.title}
                      </h3>
                      <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed mb-4">
                        {art.summary}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition">
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Article Modal Reader */}
            {selectedArticle && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-zinc-950 border border-purple-900/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="text-xs font-mono font-bold text-cyan-400 mb-2">{selectedArticle.category} • {selectedArticle.readTime}</div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">{selectedArticle.title}</h2>
                  <div className="text-xs text-zinc-500 font-mono mb-6">{selectedArticle.date}</div>

                  <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-64 object-cover rounded-2xl mb-6 border border-zinc-800" />

                  <div className="text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
                    {selectedArticle.content}
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(window.location.href);
                          alert('Article link copied to clipboard!');
                        }
                      }}
                      className="flex items-center gap-2 text-xs font-bold text-pink-400 hover:text-pink-300"
                    >
                      <Share2 className="w-4 h-4" />
                      Share Article
                    </button>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="px-6 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. APP STORE DOWNLOAD LINKS MODE */}
        {activeTab === 'downloads' && (
          <div className="flex-1 py-16 px-6 max-w-5xl mx-auto w-full">
            <div className="text-center mb-12">
              <span className="text-amber-400 text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/30">
                Direct Progressive Web App (PWA)
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
                Install on iPhone, Android & Desktop
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
                ErosDreamz is a direct-install Progressive Web App (PWA). Add it directly to your home screen for full-screen camera streaming, proximity radar, and 35-hour private vaults with zero App Store friction.
              </p>
            </div>

            {/* Featured PWA Direct Install Card */}
            <div className="mb-12">
              <PWAInstallButton variant="card" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Apple App Store */}
              <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-purple-900/40 p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-black text-xl mb-6 shadow-lg">
                    
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Apple App Store</h3>
                  <p className="text-zinc-400 text-sm mb-6">
                    Requires iOS 16.0 or later. Optimized for iPhone 13, 14, 15, 16, and iPad Pro with liveness camera support.
                  </p>
                  <div className="flex items-center gap-3 text-xs text-cyan-400 font-mono mb-8">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span>4.9 Star Rating • 42.8K Ratings</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Redirecting to Apple App Store... (Development Preview Mode)')}
                  className="w-full py-4 rounded-2xl bg-white hover:bg-zinc-200 text-black font-black text-sm flex items-center justify-center gap-3 shadow-xl transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download on the App Store</span>
                </button>
              </div>

              {/* Google Play Store */}
              <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-purple-900/40 p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-emerald-400 text-black flex items-center justify-center font-black text-xl mb-6 shadow-lg">
                    ▶
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Google Play Store</h3>
                  <p className="text-zinc-400 text-sm mb-6">
                    Requires Android 10.0 or later. Full support for camera streaming, geolocation radar, and instant push alerts.
                  </p>
                  <div className="flex items-center gap-3 text-xs text-cyan-400 font-mono mb-8">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span>4.8 Star Rating • 38.5K Reviews</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Redirecting to Google Play Store... (Development Preview Mode)')}
                  className="w-full py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-black text-sm flex items-center justify-center gap-3 shadow-xl transition"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Get it on Google Play</span>
                </button>
              </div>
            </div>

            {/* SMS / Email Link Sender */}
            <div className="bg-zinc-900/80 border border-zinc-800 p-8 rounded-3xl max-w-xl mx-auto text-center">
              <h3 className="text-xl font-bold text-white mb-2">Send Download Link to Mobile</h3>
              <p className="text-zinc-400 text-sm mb-6">Enter your email or phone number and we'll text you an instant install link.</p>
              
              <form onSubmit={handleSendSmsDownload} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={downloadEmail}
                  onChange={e => setDownloadEmail(e.target.value)}
                  placeholder="Enter email or mobile number..."
                  className="flex-1 bg-black border border-zinc-700 px-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:border-pink-500"
                />
                <button
                  type="submit"
                  disabled={downloadSent}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-bold text-sm shadow-md hover:scale-105 transition"
                >
                  {downloadSent ? 'Sending...' : 'Send Link'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 5. PRIVACY POLICY MODE */}
        {activeTab === 'privacy' && (
          <PrivacyPolicyView
            onBackToLanding={() => {
              setActiveTab('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 6. TERMS OF SERVICE MODE */}
        {activeTab === 'terms' && (
          <TermsOfServiceView
            onBackToLanding={() => {
              setActiveTab('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenRefundCenter={onOpenRefundPolicy}
          />
        )}

        {/* 7. SAFETY CENTER MODE */}
        {activeTab === 'safety' && (
          <SafetyCenterView
            onBackToLanding={() => {
              setActiveTab('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 8. SUPPORT DESK MODE */}
        {activeTab === 'support' && (
          <SupportCenterView
            onBackToLanding={() => {
              setActiveTab('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenRefundCenter={onOpenRefundPolicy}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-10 px-6 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <ErosLogo size="xs" layout="icon-only" glow={false} />
            <div>
              <span className="font-semibold text-zinc-400">© 2026 ErosDreamz Inc.</span> All rights reserved. Strictly 18+ Verified Male Community.
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button 
              onClick={() => {
                setActiveTab('privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className={`transition hover:text-white ${activeTab === 'privacy' ? 'text-pink-400 font-bold underline underline-offset-4' : 'text-zinc-400'}`}
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => {
                setActiveTab('terms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className={`transition hover:text-white ${activeTab === 'terms' ? 'text-pink-400 font-bold underline underline-offset-4' : 'text-zinc-400'}`}
            >
              Terms of Service
            </button>
            <button 
              onClick={() => {
                setActiveTab('safety');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className={`transition hover:text-white ${activeTab === 'safety' ? 'text-pink-400 font-bold underline underline-offset-4' : 'text-zinc-400'}`}
            >
              Safety Center
            </button>
            <button 
              onClick={() => {
                setActiveTab('support');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className={`transition hover:text-white ${activeTab === 'support' ? 'text-pink-400 font-bold underline underline-offset-4' : 'text-zinc-400'}`}
            >
              Support Desk
            </button>
            {onOpenRefundPolicy && (
              <button 
                onClick={onOpenRefundPolicy} 
                className="text-zinc-400 hover:text-emerald-400 transition"
              >
                Refund Center
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};
