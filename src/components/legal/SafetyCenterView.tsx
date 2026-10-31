import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Heart, 
  PhoneCall, 
  Lock, 
  Eye, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Flag, 
  MapPin, 
  UserX, 
  Activity, 
  Compass, 
  ExternalLink 
} from 'lucide-react';
import { ErosLogo } from '../ErosLogo';

interface SafetyCenterViewProps {
  onBackToLanding: () => void;
  onNavigateTab: (tab: 'privacy' | 'terms' | 'safety' | 'support' | 'landing') => void;
  onOpenReportModal?: () => void;
}

export const SafetyCenterView: React.FC<SafetyCenterViewProps> = ({
  onBackToLanding,
  onNavigateTab,
  onOpenReportModal
}) => {
  // Interactive Pre-Meetup Checklist State
  const [checklist, setChecklist] = useState({
    videoVerified: false,
    publicPlace: false,
    toldBuddy: false,
    ownRide: false,
    soberMind: false,
    boundariesSet: false
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;

  const hotlines = [
    {
      name: 'The Trevor Project (LGBTQ+ Crisis Line)',
      phone: '1-866-488-7386',
      sms: 'Text START to 678-678',
      desc: '24/7 confidential crisis intervention and suicide prevention for queer youth and young adults.'
    },
    {
      name: 'LGBT National Help Center Hotline',
      phone: '1-888-843-4564',
      sms: 'Online chat available',
      desc: 'Peer counseling, safe space conversations, and local healthcare/testing referrals.'
    },
    {
      name: 'Trans Lifeline',
      phone: '1-877-565-8860',
      sms: 'Peer-run support',
      desc: 'Direct peer support run by and for trans individuals, with zero non-consensual police dispatching.'
    },
    {
      name: 'RAINN Sexual Assault Hotline',
      phone: '1-800-656-4673',
      sms: 'rainn.org live chat',
      desc: '24/7 free, confidential sexual assault support and medical/legal guidance.'
    },
    {
      name: 'National Domestic Violence Hotline',
      phone: '1-800-799-7233',
      sms: 'Text START to 88788',
      desc: 'Confidential support for anyone experiencing intimate partner abuse or threats.'
    }
  ];

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full text-zinc-200">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition group"
        >
          <ArrowLeft className="w-4 h-4 text-pink-400 group-hover:-translate-x-1 transition" />
          <span>Back to Landing Page</span>
        </button>

        {/* Legal & Safety Tabs */}
        <div className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => onNavigateTab('privacy')}
            className="px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white transition"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onNavigateTab('terms')}
            className="px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white transition"
          >
            Terms of Service
          </button>
          <button
            onClick={() => onNavigateTab('safety')}
            className="px-3 py-1.5 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30"
          >
            Safety Center
          </button>
          <button
            onClick={() => onNavigateTab('support')}
            className="px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white transition"
          >
            Support Desk
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-cyan-950/30 border border-emerald-800/30 p-8 sm:p-12 mb-12">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-cyan-400 p-0.5 shadow-xl shadow-cyan-500/20 flex-shrink-0">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-3">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Community Protection & Wellness Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
              ErosDreamz Safety Center
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Your physical safety, sexual wellness, and emotional autonomy come first. Here are verified protocols, emergency contacts, and practical steps to navigate gay & bi dating with absolute confidence.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Interactive Pre-Meetup Checklist */}
      <section className="mb-12 bg-zinc-950 border border-zinc-800/90 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
              <span>Interactive Safety Protocol</span>
            </div>
            <h2 className="text-2xl font-black text-white">Before-You-Meetup Checklist</h2>
            <p className="text-xs text-zinc-400 mt-1">Check off these 6 vital steps before meeting any guy in person.</p>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-2 text-xs font-bold">
            <span className={completedCount === 6 ? 'text-emerald-400' : 'text-pink-400'}>
              {completedCount} of 6 Complete
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              key: 'videoVerified' as const,
              title: '1. Watch Their 10s Live Video Reel',
              desc: 'Confirm their real-life appearance, voice, and vibe. Never meet someone with only static or blurry photos.'
            },
            {
              key: 'publicPlace' as const,
              title: '2. Meet in a Well-Lit Public Space',
              desc: 'Choose a busy coffee shop, lounge, outdoor park, or populated venue for the first encounter.'
            },
            {
              key: 'toldBuddy' as const,
              title: '3. Notify a Trusted Wingman or Friend',
              desc: 'Share their name, photo, meeting venue, and schedule a safety check-in call 45 minutes in.'
            },
            {
              key: 'ownRide' as const,
              title: '4. Arrange Independent Transportation',
              desc: 'Do not rely on them for a ride home. Drive yourself, take transit, or have an Uber/Lyft app ready.'
            },
            {
              key: 'soberMind' as const,
              title: '5. Protect Your Drinks & Mind',
              desc: 'Never leave drinks unattended. Maintain clarity of mind so you can assess safety in real time.'
            },
            {
              key: 'boundariesSet' as const,
              title: '6. Sovereign Exit Freedom',
              desc: 'You can leave at any second if you feel uncomfortable. No explanation or politeness is required.'
            }
          ].map(item => (
            <div
              key={item.key}
              onClick={() => toggleCheck(item.key)}
              className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                checklist[item.key]
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                  : 'bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700 text-zinc-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                  checklist[item.key] ? 'bg-emerald-500 text-black' : 'bg-zinc-800 border border-zinc-700'
                }`}
              >
                {checklist[item.key] && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-white mb-1">{item.title}</div>
                <div className="text-xs text-zinc-400 leading-snug">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Digital Safety & Anti-Scam Rules */}
      <section className="mb-12 space-y-6">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-400" />
          <span>Digital Safety, Anti-Scam & Blackmail Defense</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-3">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
              Rule 1: Never Send Money
            </div>
            <h3 className="text-lg font-bold text-white">Beware Financial Catfish</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Legitimate guys will never ask you for cash, gas money, plane tickets, gift cards, or crypto investments. If someone asks for money before or after meeting, block and report them immediately.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-3">
            <div className="text-pink-400 font-bold text-xs uppercase tracking-wider font-mono">
              Rule 2: Anti-Extortion Shield
            </div>
            <h3 className="text-lg font-bold text-white">Zero Tolerance for Blackmail</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              If an extortionist threatens to send private photos to friends or employers, do NOT pay them. Paying only invites further demands. Immediately screenshot evidence, block, report in-app, and file a report with the FBI IC3 or local authorities.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-3">
            <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider font-mono">
              Rule 3: Keep Banter On-App
            </div>
            <h3 className="text-lg font-bold text-white">Stay Under Platform Protection</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Scammers often try to rush you onto WhatsApp, Telegram, or Snapchat within the first 3 messages. Keep conversations on ErosDreamz until you have verified their live video and established trust.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Sexual Health & Wellness */}
      <section className="mb-12 p-8 rounded-3xl bg-gradient-to-r from-purple-950/20 via-zinc-950 to-pink-950/20 border border-purple-800/30 space-y-6">
        <div>
          <span className="text-xs font-mono font-bold text-pink-400 uppercase tracking-wider">
            Sexual Health & Wellbeing
          </span>
          <h2 className="text-2xl font-black text-white mt-1">
            Empowered Sexual Health & Harm Reduction
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-2xl">
            Knowledge is power. Open communication regarding sexual health reduces stigma and creates a safer, hotter sex-positive community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
              <Activity className="w-4 h-4" />
              <span>PrEP & PEP Fast Facts</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              <strong>PrEP (Pre-Exposure Prophylaxis):</strong> Daily or on-demand medication that reduces the risk of acquiring HIV from sex by roughly 99%.
            </p>
            <p className="text-xs text-zinc-300 leading-relaxed">
              <strong>PEP (Post-Exposure Prophylaxis):</strong> Emergency antiviral regimen taken within <strong className="text-white">72 hours</strong> after a potential HIV exposure. Visit an ER or sexual health clinic immediately if you need PEP.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Heart className="w-4 h-4 fill-current" />
              <span>U=U (Undetectable = Untransmittable)</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              People living with HIV who achieve and maintain an undetectable viral load through modern antiretroviral treatment cannot transmit HIV sexually to their partners.
            </p>
            <p className="text-xs text-zinc-300 leading-relaxed">
              ErosDreamz celebrates U=U and stands firmly against HIV criminalization, misinformation, and stigma.
            </p>
          </div>
        </div>
      </section>

      {/* 4. 24/7 Crisis & Emergency Hotlines */}
      <section className="mb-12 space-y-6">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Immediate Assistance
          </span>
          <h2 className="text-2xl font-black text-white mt-1">24/7 Support & Crisis Helplines</h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Free, confidential, specialized assistance whenever you need someone in your corner.
          </p>
        </div>

        <div className="space-y-4">
          {hotlines.map(h => (
            <div
              key={h.name}
              className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">{h.name}</h3>
                <p className="text-xs text-zinc-400 mt-1">{h.desc}</p>
                <div className="text-[11px] text-zinc-500 font-mono mt-1">Online / SMS: {h.sms}</div>
              </div>
              <a
                href={`tel:${h.phone.replace(/[^0-9]/g, '')}`}
                className="px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2 flex-shrink-0 transition"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {h.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 5. In-App Reporting & Blocking */}
      <section className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto">
          <Flag className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-white">See Something Suspicious? Report It Instantly</h2>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Our automated moderation service and 24/7 human review team investigate reports within minutes. Every video clip, message, and profile has a discreet Report flag.
        </p>
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => {
              if (onOpenReportModal) {
                onOpenReportModal();
              } else {
                alert('To report content, tap the flag icon on any video reel, message thread, or profile modal.');
              }
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 hover:scale-105 transition"
          >
            Report Inappropriate Content
          </button>
        </div>
      </section>
    </div>
  );
};
