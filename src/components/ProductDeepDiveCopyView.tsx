import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Flame, 
  ShieldCheck, 
  BookOpen, 
  Download, 
  Search, 
  ArrowRight, 
  RotateCcw, 
  Globe, 
  ExternalLink,
  Share2,
  Lock,
  Layers,
  Zap,
  Tag
} from 'lucide-react';
import { PRODUCT_DEEP_DIVE_BIBLE, CopySnippet } from '../data/productDeepDiveCopy';

interface ProductDeepDiveCopyViewProps {
  onOpenAppStream: () => void;
  onOpenPortal: () => void;
  onOpenRefundPolicy: () => void;
  onLockFirewall: () => void;
}

export const ProductDeepDiveCopyView: React.FC<ProductDeepDiveCopyViewProps> = ({
  onOpenAppStream,
  onOpenPortal,
  onOpenRefundPolicy,
  onLockFirewall
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [exportNotification, setExportNotification] = useState(false);

  const categories = [
    { id: 'all', label: 'All Copy Assets', icon: Layers },
    { id: 'headlines', label: 'Headlines & Taglines', icon: Sparkles },
    { id: 'hooks', label: 'TikTok & Viral Hooks', icon: Flame },
    { id: 'ad_scripts', label: 'Video & Ad Scripts', icon: Zap },
    { id: 'feature_pitches', label: 'Feature Deep Dives', icon: BookOpen },
    { id: 'refund_guarantee', label: 'Refund Firewall Copy', icon: RotateCcw },
    { id: 'app_store_aso', label: 'App Store ASO', icon: Tag },
    { id: 'email_sequences', label: 'Email Drips', icon: Share2 },
    { id: 'faq_objections', label: 'Objection Crushers', icon: ShieldCheck }
  ];

  const handleCopy = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleExportAll = () => {
    let fullMarkdown = `# ERISDREAMZ // HIGH-OCTANE PRODUCT DEEP DIVE & COPYWRITING BIBLE
Tagline: ${PRODUCT_DEEP_DIVE_BIBLE.tagline}
Positioning: ${PRODUCT_DEEP_DIVE_BIBLE.positioning}
Elevator Pitch: ${PRODUCT_DEEP_DIVE_BIBLE.elevatorPitch}
Target Audience: ${PRODUCT_DEEP_DIVE_BIBLE.targetAudience}

---
## CORE PRODUCT PILLARS
${PRODUCT_DEEP_DIVE_BIBLE.corePillars
  .map(
    p => `### ${p.title} (${p.subhead})
${p.description}
Highlights:
${p.highlights.map(h => `- ${h}`).join('\n')}
`
  )
  .join('\n\n')}

---
## COPYWRITING SNIPPETS & AD ASSETS
${PRODUCT_DEEP_DIVE_BIBLE.snippets
  .map(
    s => `### [${s.category.toUpperCase()}] ${s.title} (Tone: ${s.tone})
${s.copy}
Tags: ${s.tags.join(', ')}
`
  )
  .join('\n\n')}
`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullMarkdown);
      setExportNotification(true);
      setTimeout(() => setExportNotification(false), 2500);
    }
  };

  const filteredSnippets = PRODUCT_DEEP_DIVE_BIBLE.snippets.filter(s => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      !searchQuery ||
      s.title.toLowerCase().includes(query) ||
      s.copy.toLowerCase().includes(query) ||
      s.tags.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#08080C] text-zinc-100 flex flex-col font-sans select-none antialiased">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#08080C]/95 backdrop-blur-xl border-b border-purple-900/30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-0.5 shadow-lg shadow-pink-500/25">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-pink-400">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm sm:text-base tracking-tight text-white">
                EROSDREAMZ COPYWRITING BIBLE
              </span>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
                PROD DEEP DIVE v2.6
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">
              High-Energy Marketing Deck, Viral Hooks & Conversion Assets
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportAll}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 text-pink-300 border border-pink-500/40 text-xs font-bold transition shadow-sm"
            title="Export complete copywriting bible to clipboard as Markdown"
          >
            {exportNotification ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-pink-400" />}
            <span>{exportNotification ? 'Copied Full Deck!' : 'Export All (MD)'}</span>
          </button>

          <button
            onClick={onOpenPortal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-cyan-300 border border-cyan-400/30 text-xs font-bold transition"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>my.erosdreamz</span>
          </button>

          <button
            onClick={onOpenAppStream}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-extrabold text-xs shadow-md shadow-pink-500/25 hover:scale-105 transition flex items-center gap-1.5"
          >
            <Flame className="w-4 h-4 fill-current" />
            <span>Open App Feed</span>
          </button>

          <button
            onClick={onLockFirewall}
            className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-pink-400 border border-zinc-800 transition"
            title="Lock to Login Firewall"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Hero Product Positioning Card */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-purple-950/30 to-[#0c0c14] border border-purple-900/50 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-4xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-mono font-bold">
              <Zap className="w-3.5 h-3.5 text-pink-400" />
              <span>THE EXECUTIVE BRAND DECK & COPYWRITING VAULT</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {PRODUCT_DEEP_DIVE_BIBLE.productName}:{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                {PRODUCT_DEEP_DIVE_BIBLE.tagline}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
              {PRODUCT_DEEP_DIVE_BIBLE.elevatorPitch}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-zinc-800/80 text-xs">
              <div className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800">
                <span className="text-zinc-500 font-mono uppercase block text-[10px]">Positioning Statement</span>
                <span className="text-zinc-200 font-medium">{PRODUCT_DEEP_DIVE_BIBLE.positioning}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800">
                <span className="text-zinc-500 font-mono uppercase block text-[10px]">Target Audience</span>
                <span className="text-zinc-200 font-medium">{PRODUCT_DEEP_DIVE_BIBLE.targetAudience}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5 Core Pillars Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>Core Architectural Pillars & Value Propositions</span>
            </h2>
            <span className="text-xs font-mono text-zinc-500">5 Foundational Pillars</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {PRODUCT_DEEP_DIVE_BIBLE.corePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-zinc-950 border border-zinc-900 hover:border-pink-500/40 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-widest mb-1">
                    Pillar 0{idx + 1}
                  </div>
                  <h3 className="text-sm font-black text-white mb-1 group-hover:text-cyan-300 transition">
                    {pillar.title}
                  </h3>
                  <div className="text-[11px] text-zinc-400 font-medium mb-3 italic">
                    "{pillar.subhead}"
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>

                <ul className="space-y-1.5 text-[10px] text-zinc-300 border-t border-zinc-900 pt-3">
                  {pillar.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-1.5">
                      <span className="text-cyan-400">▹</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Filter and Search Bar for Copywriting Snippets */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-pink-400" />
                <span>Copywriting Bank & Ad Assets (1-Click Copy)</span>
              </h2>
              <p className="text-xs text-zinc-400">
                Tap the copy icon on any hook, headline, or script to instantly paste into your ads and socials.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search copy by keyword..."
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-pink-500 rounded-2xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none pl-9"
              />
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(c => {
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    selectedCategory === c.id
                      ? 'bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black shadow-md shadow-pink-500/20'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>

          {/* Snippets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSnippets.map(snippet => {
              const isCopied = copiedId === snippet.id;
              return (
                <div
                  key={snippet.id}
                  className="p-5 rounded-3xl bg-zinc-950 border border-purple-900/40 hover:border-pink-500/50 transition flex flex-col justify-between group space-y-4 relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 text-cyan-400 border border-zinc-800">
                        {snippet.category.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        Tone: {snippet.tone}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-2 group-hover:text-pink-300 transition">
                      {snippet.title}
                    </h3>

                    <div className="p-3.5 rounded-2xl bg-black/60 border border-zinc-900 font-mono text-xs text-zinc-200 whitespace-pre-line leading-relaxed selection:bg-pink-500 selection:text-black">
                      {snippet.copy}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-900">
                    <div className="flex flex-wrap gap-1">
                      {snippet.tags.map((t, idx) => (
                        <span key={idx} className="text-[9px] font-mono text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleCopy(snippet.copy, snippet.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        isCopied
                          ? 'bg-emerald-500 text-black'
                          : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800'
                      }`}
                      title="Copy to clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA to Action */}
        <section className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-pink-950/40 border border-pink-500/40 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Ready to deploy this copy to erosdreamz.app?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto">
            Experience the actual 10-second video stream, radar proximity grid, 35-hour private vault, and login firewall in action right now.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={onOpenAppStream}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 hover:scale-105 transition flex items-center gap-2"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>Launch Live Feed</span>
            </button>
            <button
              onClick={onOpenRefundPolicy}
              className="px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-emerald-400 font-bold text-xs border border-emerald-500/40 transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Open Refund Firewall Station</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
