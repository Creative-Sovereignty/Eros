import React, { useState } from 'react';
import { 
  Coins, 
  Zap, 
  Crown, 
  Gift, 
  Check, 
  CreditCard, 
  Sparkles, 
  X, 
  Flame, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  SlidersHorizontal
} from 'lucide-react';
import { UserWallet, CoinPackage, VirtualGift, User } from '../types';
import { COIN_PACKAGES, VIRTUAL_GIFTS } from '../data/mockData';
import confetti from 'canvas-confetti';

interface MonetizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: UserWallet;
  onPurchaseCoins: (coins: number, priceString: string) => void;
  onActivateBoost: (minutes: number, cost: number) => void;
  onUpgradeVip: () => void;
  // If sending gift:
  giftRecipient?: User | null;
  onSendGift?: (gift: VirtualGift, recipient: User) => void;
  initialTab?: 'coins' | 'boost' | 'vip' | 'gifts';
}

export const MonetizationModal: React.FC<MonetizationModalProps> = ({
  isOpen,
  onClose,
  wallet,
  onPurchaseCoins,
  onActivateBoost,
  onUpgradeVip,
  giftRecipient,
  onSendGift,
  initialTab = 'coins'
}) => {
  const [tab, setTab] = useState<'coins' | 'boost' | 'vip' | 'gifts'>(initialTab);
  const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);
  const [selectedGift, setSelectedGift] = useState<VirtualGift | null>(null);

  if (!isOpen) return null;

  const handleBuyPackage = (pkg: CoinPackage) => {
    setSelectedPackage(pkg);
    setPaymentProcessing(true);

    setTimeout(() => {
      onPurchaseCoins(pkg.coins, pkg.price);
      setPaymentProcessing(false);
      setPaymentSuccess(`Successfully added ${pkg.coins} coins!`);

      confetti({ particleCount: 70, spread: 65 });

      setTimeout(() => {
        setPaymentSuccess(null);
        setSelectedPackage(null);
      }, 2000);
    }, 1200);
  };

  const handleBoostSelect = (minutes: number, cost: number) => {
    if (wallet.coins < cost) {
      setTab('coins');
      return;
    }
    onActivateBoost(minutes, cost);
    confetti({ particleCount: 60, spread: 55 });
    onClose();
  };

  const handleSendGiftSubmit = () => {
    if (!selectedGift || !giftRecipient || !onSendGift) return;
    if (wallet.coins < selectedGift.coinCost) {
      setTab('coins');
      return;
    }
    onSendGift(selectedGift, giftRecipient);
    confetti({ particleCount: 80, spread: 70 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Header with Coin Balance */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 p-0.5 text-black flex items-center justify-center font-black">
              <Coins className="w-4 h-4 fill-black" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Eros Store & Monetization
              </h3>
              <p className="text-[11px] text-zinc-400">Boosts, Premium Features & Gifts</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-amber-500/30">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono font-bold text-xs text-amber-300">{wallet.coins} Coins</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-4 px-4 py-2.5 bg-zinc-900/40 border-b border-zinc-800/80 gap-1.5">
          <button
            onClick={() => setTab('coins')}
            className={`py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              tab === 'coins' ? 'bg-amber-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            Coins
          </button>

          <button
            onClick={() => setTab('boost')}
            className={`py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              tab === 'boost' ? 'bg-amber-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Boost
          </button>

          <button
            onClick={() => setTab('vip')}
            className={`py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              tab === 'vip' ? 'bg-amber-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            VIP Gold
          </button>

          <button
            onClick={() => setTab('gifts')}
            className={`py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              tab === 'gifts' ? 'bg-amber-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            Gifts
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* TAB 1: COIN STORE */}
          {tab === 'coins' && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-base font-black text-white">Refill Eros Coins</h4>
                <p className="text-xs text-zinc-400">
                  Use coins to send virtual luxury gifts, boost your profile, and unlock perks.
                </p>
              </div>

              {paymentSuccess && (
                <div className="p-3 bg-emerald-500 text-black font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 animate-bounce">
                  <Check className="w-4 h-4" /> {paymentSuccess}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COIN_PACKAGES.map(pkg => (
                  <div
                    key={pkg.id}
                    className={`relative p-4 rounded-2xl border transition flex flex-col justify-between ${
                      pkg.popular
                        ? 'bg-gradient-to-b from-amber-950/30 to-zinc-900 border-amber-400 ring-1 ring-amber-400/40 shadow-lg'
                        : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {pkg.bonusText && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black text-[10px] font-black uppercase">
                        {pkg.bonusText}
                      </span>
                    )}

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                        <Coins className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-lg font-black text-white block">{pkg.coins} Coins</span>
                        <span className="text-xs text-zinc-400">Instant credit</span>
                      </div>
                    </div>

                    <button
                      disabled={paymentProcessing}
                      onClick={() => handleBuyPackage(pkg)}
                      className="mt-4 w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs transition flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      Buy for {pkg.price}
                    </button>
                  </div>
                ))}
              </div>

              {/* Secure Payment Badges */}
              <div className="pt-2 flex items-center justify-center gap-4 text-zinc-500 text-[11px]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Encrypted 256-bit Checkout
                </span>
                <span>•</span>
                <span>Apple Pay & Google Pay Supported</span>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE BOOST */}
          {tab === 'boost' && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 mb-1">
                  <Zap className="w-6 h-6 fill-amber-400" />
                </div>
                <h4 className="text-base font-black text-white">Supercharge Your Profile Visibility</h4>
                <p className="text-xs text-zinc-400">
                  Boost your profile to the top of nearby radar grids and get 10x stream distribution.
                </p>
              </div>

              {wallet.activeBoostUntil && wallet.activeBoostUntil > Date.now() ? (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-center space-y-1">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
                    ⚡ Profile Boost Currently Active!
                  </span>
                  <p className="text-xs text-white font-mono">
                    Surge active for another {Math.ceil((wallet.activeBoostUntil - Date.now()) / (1000 * 60))} minutes
                  </p>
                </div>
              ) : null}

              <div className="space-y-2.5">
                {[
                  { title: '30-Minute Radar Surge', duration: 30, cost: 100, desc: '5x more profile views in nearby distance grid' },
                  { title: '1-Hour Stream Spotlight', duration: 60, cost: 200, desc: '10x distribution on For You Page video feed' },
                  { title: '3-Hour Prime Time Surge', duration: 180, cost: 450, desc: 'Top placement across both Radar and Video Stream' }
                ].map(b => (
                  <div
                    key={b.title}
                    className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between hover:border-amber-400/50 transition"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{b.title}</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-mono font-bold">
                          {b.cost} Coins
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400">{b.desc}</p>
                    </div>

                    <button
                      onClick={() => handleBoostSelect(b.duration, b.cost)}
                      className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition ${
                        wallet.coins >= b.cost
                          ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:scale-105 active:scale-95 shadow-md shadow-amber-500/20'
                          : 'bg-zinc-800 text-zinc-500 hover:text-amber-400'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      {wallet.coins >= b.cost ? 'Activate' : 'Need Coins'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: VIP GOLD PASS */}
          {tab === 'vip' && (
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/20 via-orange-600/10 to-zinc-900 border border-amber-500/40 text-center space-y-2">
                <Crown className="w-8 h-8 text-amber-400 mx-auto" />
                <h4 className="text-lg font-black text-white">ErosDreamz VIP Gold Pass</h4>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                  Experience elite connections with zero restrictions and premium algorithms.
                </p>
                <div className="text-2xl font-black text-amber-400 pt-1">
                  $14.99 <span className="text-xs font-medium text-zinc-400">/ month</span>
                </div>
              </div>

              {/* VIP Perks List */}
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2.5 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                  Included VIP Privileges
                </span>
                {[
                  'Advanced Search Filters: Height, intent, verified-only, and tribe precision',
                  '100% Ad-Free Experience across the entire app',
                  '5 Free Super Flames & Priority Delivery Daily',
                  'See Who Viewed Your 10-Second Reels',
                  'Exclusive VIP Gold Profile Border & Crown Badge'
                ].map(perk => (
                  <div key={perk} className="flex items-center gap-2 text-zinc-200">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  onUpgradeVip();
                  confetti({ particleCount: 70, spread: 60 });
                  onClose();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30 transition active:scale-98"
              >
                {wallet.isVipMember ? '★ VIP Pass Active (Manage)' : 'Upgrade to VIP Gold ($14.99)'}
              </button>
            </div>
          )}

          {/* TAB 4: VIRTUAL GIFTS */}
          {tab === 'gifts' && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-base font-black text-white">
                  {giftRecipient ? `Send Virtual Gift to ${giftRecipient.name}` : 'Eros Virtual Luxury Gifts'}
                </h4>
                <p className="text-xs text-zinc-400">
                  Gifts appear with animated visual effects directly in their inbox.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {VIRTUAL_GIFTS.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGift(g)}
                    className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center justify-between ${
                      selectedGift?.id === g.id
                        ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/50 scale-[1.02]'
                        : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-3xl mb-1">{g.icon}</span>
                    <span className="text-xs font-bold text-white block">{g.name}</span>
                    <span className="text-[10px] text-zinc-400 block line-clamp-1">{g.description}</span>
                    <span className="mt-2 text-xs font-mono font-bold text-amber-400">
                      {g.coinCost} Coins
                    </span>
                  </button>
                ))}
              </div>

              {selectedGift && (
                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedGift.icon}</span>
                    <div>
                      <span className="text-xs font-bold text-white block">Selected: {selectedGift.name}</span>
                      <span className="text-[11px] text-amber-400 font-mono">{selectedGift.coinCost} Coins</span>
                    </div>
                  </div>

                  <button
                    disabled={wallet.coins < selectedGift.coinCost}
                    onClick={handleSendGiftSubmit}
                    className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
                      wallet.coins >= selectedGift.coinCost
                        ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-md'
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    {wallet.coins >= selectedGift.coinCost ? 'Send Gift' : 'Need More Coins'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
