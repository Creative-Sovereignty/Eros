import React, { useState } from 'react';
import { SponsoredAdData } from '../types';
import { X, ExternalLink, Copy, Check, Sparkles, Tag, ShieldCheck } from 'lucide-react';

interface SponsoredAdModalProps {
  ad: SponsoredAdData | null;
  isOpen: boolean;
  onClose: () => void;
  onRewardClaim?: (reward: string) => void;
}

export const SponsoredAdModal: React.FC<SponsoredAdModalProps> = ({
  ad,
  isOpen,
  onClose,
  onRewardClaim
}) => {
  const [copied, setCopied] = useState(false);
  const [claimed, setClaimed] = useState(false);

  if (!isOpen || !ad) return null;

  const handleCopyCode = () => {
    if (ad.promoCode) {
      navigator.clipboard.writeText(ad.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClaim = () => {
    setClaimed(true);
    if (ad.rewardType && onRewardClaim) {
      onRewardClaim(ad.rewardType);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Banner Glow Header */}
        <div className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-6 text-black flex flex-col justify-between">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-black/30 hover:bg-black/50 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-black/30 text-[10px] font-bold text-white tracking-widest uppercase">
              {ad.badgeText}
            </span>
            {ad.discountBadge && (
              <span className="px-2.5 py-0.5 rounded-full bg-yellow-300 text-black text-[10px] font-black tracking-wide">
                {ad.discountBadge}
              </span>
            )}
          </div>

          <h3 className="text-xl font-black text-white leading-tight">
            {ad.brandName}
          </h3>
          <p className="text-xs text-amber-100 mt-1 font-medium">
            {ad.headline}
          </p>
        </div>

        {/* Ad Details Body */}
        <div className="p-6 space-y-5">
          <p className="text-xs text-zinc-300 leading-relaxed">
            {ad.description}
          </p>

          {/* Promo Code Box */}
          {ad.promoCode && (
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">Pulse Exclusive Code</span>
                  <span className="text-sm font-mono font-bold text-amber-400">{ad.promoCode}</span>
                </div>
              </div>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          )}

          {/* Ad Support Transparency */}
          <div className="flex items-center gap-2 text-[11px] text-zinc-500 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80">
            <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Sponsored partner vetted for Pulse 18+ community standards.</span>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2">
            <button
              onClick={handleClaim}
              className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                claimed
                  ? 'bg-emerald-500 text-black'
                  : 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black shadow-lg shadow-amber-500/20 active:scale-[0.99]'
              }`}
            >
              {claimed ? (
                <>
                  <Check className="w-4 h-4" />
                  Perk Activated!
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" />
                  {ad.ctaText}
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs text-zinc-400 hover:text-white transition text-center"
            >
              Return to Video Feed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
