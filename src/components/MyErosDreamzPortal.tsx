import React, { useState } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  CreditCard, 
  RotateCcw, 
  Lock, 
  Compass, 
  Smartphone, 
  User as UserIcon, 
  Crown, 
  Coins, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Eye, 
  EyeOff, 
  Flame, 
  Zap, 
  KeyRound, 
  FileText,
  Clock,
  Trash2,
  X
} from 'lucide-react';
import { User, UserWallet, PrivateFolderItem, PrivateFolderGrant, BillingTransaction } from '../types';

interface MyErosDreamzPortalProps {
  currentUser: User;
  wallet: UserWallet;
  privateItems: PrivateFolderItem[];
  privateGrants: Record<string, PrivateFolderGrant>;
  onOpenRefundPolicy: (txnId?: string) => void;
  onOpenAppStream: () => void;
  onOpenCopywritingBible: () => void;
  onRevokeAllGrants: () => void;
  onClose?: () => void;
  onLockFirewall: () => void;
}

export const MyErosDreamzPortal: React.FC<MyErosDreamzPortalProps> = ({
  currentUser,
  wallet,
  privateItems,
  privateGrants,
  onOpenRefundPolicy,
  onOpenAppStream,
  onOpenCopywritingBible,
  onRevokeAllGrants,
  onClose,
  onLockFirewall
}) => {
  const [activePortalTab, setActivePortalTab] = useState<'overview' | 'billing_refunds' | 'vault' | 'radar_privacy' | 'pwa_sync'>('overview');
  const [ghostMode, setGhostMode] = useState(false);
  const [distanceFuzzing, setDistanceFuzzing] = useState(true);
  const [broadcastRadius, setBroadcastRadius] = useState(15);
  const [autoLockHours, setAutoLockHours] = useState(35);
  const [showReceiptModal, setShowReceiptModal] = useState<BillingTransaction | null>(null);

  const transactions: BillingTransaction[] = [
    {
      id: 'TXN-90821-COIN',
      itemTitle: '500 Eros Coins Refill Pack',
      type: 'coins',
      amountUsd: 4.99,
      date: 'October 27, 2026',
      paymentMethod: 'Apple Pay (•••• 4921)',
      status: 'completed',
      refundableCoins: 350,
      isEligibleForRefund: true
    },
    {
      id: 'TXN-88124-VIP',
      itemTitle: 'VIP Gold Elite Membership (Monthly)',
      type: 'vip_monthly',
      amountUsd: 14.99,
      date: 'October 15, 2026',
      paymentMethod: 'Mastercard (•••• 8820)',
      status: 'completed',
      isEligibleForRefund: true
    },
    {
      id: 'TXN-71209-COIN',
      itemTitle: '1,200 Eros Coins Deluxe Pack',
      type: 'coins',
      amountUsd: 9.99,
      date: 'September 12, 2026',
      paymentMethod: 'Google Pay',
      status: 'completed',
      refundableCoins: 0,
      isEligibleForRefund: false
    }
  ];

  const grantKeys = Object.keys(privateGrants);

  return (
    <div className="min-h-screen bg-[#09090E] text-zinc-100 flex flex-col font-sans select-none antialiased">
      {/* Subdomain Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#09090E]/95 backdrop-blur-xl border-b border-purple-900/40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 p-0.5 shadow-md shadow-pink-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-cyan-400">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm sm:text-base font-black text-white tracking-tight">
                my.erosdreamz.app
              </span>
              <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Member Hub
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">
              Self-Service Billing, 35h Vaults & Radar Console
            </span>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onOpenRefundPolicy()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/40 text-xs font-bold transition"
            title="Open Refund Policy & Instant Claim Station"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refund Center</span>
          </button>

          <button
            onClick={onOpenCopywritingBible}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-bold transition"
            title="View Product Deep Dive & Copywriting Bible"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden md:inline">Copywriting Bible</span>
          </button>

          <button
            onClick={onOpenAppStream}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-extrabold text-xs shadow-md shadow-pink-500/25 hover:scale-105 transition flex items-center gap-1.5"
          >
            <Flame className="w-4 h-4 fill-current" />
            <span>Launch erosdreamz.app</span>
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

      {/* Main Portal Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 space-y-2 flex-shrink-0">
          <div className="p-4 rounded-3xl bg-zinc-950 border border-purple-900/40 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-2xl object-cover border border-purple-500/30"
              />
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1">
                  <span>{currentUser.name}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-xs text-zinc-400 font-mono">@{currentUser.username}</div>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-400">
                  {wallet.isVipMember ? 'VIP Gold Elite' : 'Standard Member'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800/80 flex justify-between text-xs font-mono">
              <span className="text-zinc-400">Eros Coins:</span>
              <span className="text-cyan-300 font-bold">{wallet.coins}</span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <nav className="space-y-1">
            <button
              onClick={() => setActivePortalTab('overview')}
              className={`w-full p-3 rounded-2xl text-xs font-bold transition flex items-center gap-2.5 ${
                activePortalTab === 'overview'
                  ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-lg shadow-pink-500/20'
                  : 'bg-zinc-950/80 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-900'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Account Overview</span>
            </button>

            <button
              onClick={() => setActivePortalTab('billing_refunds')}
              className={`w-full p-3 rounded-2xl text-xs font-bold transition flex items-center gap-2.5 ${
                activePortalTab === 'billing_refunds'
                  ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-lg shadow-pink-500/20'
                  : 'bg-zinc-950/80 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-900'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Billing & Refund Center</span>
            </button>

            <button
              onClick={() => setActivePortalTab('vault')}
              className={`w-full p-3 rounded-2xl text-xs font-bold transition flex items-center gap-2.5 ${
                activePortalTab === 'vault'
                  ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-lg shadow-pink-500/20'
                  : 'bg-zinc-950/80 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-900'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>35h Private Vault Console</span>
            </button>

            <button
              onClick={() => setActivePortalTab('radar_privacy')}
              className={`w-full p-3 rounded-2xl text-xs font-bold transition flex items-center gap-2.5 ${
                activePortalTab === 'radar_privacy'
                  ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-lg shadow-pink-500/20'
                  : 'bg-zinc-950/80 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Radar Stealth & Privacy</span>
            </button>

            <button
              onClick={() => setActivePortalTab('pwa_sync')}
              className={`w-full p-3 rounded-2xl text-xs font-bold transition flex items-center gap-2.5 ${
                activePortalTab === 'pwa_sync'
                  ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-lg shadow-pink-500/20'
                  : 'bg-zinc-950/80 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-900'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile Sync & PWA Install</span>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <section className="flex-1 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activePortalTab === 'overview' && (
            <div className="space-y-6">
              {/* Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-950 via-purple-950/40 to-zinc-950 border border-purple-900/40 relative overflow-hidden">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-mono font-bold mb-3 border border-cyan-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Liveness Certificate: PLS-VER-98240-X19</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    Welcome to your my.erosdreamz Control Deck
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                    Manage your account security, review your purchases backed by the 14-day refund firewall, control 35-hour private folder permissions, and tune radar visibility.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={onOpenAppStream}
                      className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-extrabold text-xs shadow-md hover:scale-105 transition flex items-center gap-2"
                    >
                      <Flame className="w-4 h-4 fill-current" />
                      <span>Launch Stream</span>
                    </button>
                    <button
                      onClick={() => onOpenRefundPolicy()}
                      className="px-5 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-emerald-400 font-bold text-xs border border-emerald-500/40 transition flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Refund Policy & Claims</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Plan Status</span>
                    <Crown className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-xl font-black text-white">
                    {wallet.isVipMember ? 'VIP Gold Elite' : 'Free Vibe Tier'}
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    {wallet.isVipMember ? 'Ad-free • Priority placement' : 'Upgrade to VIP for ad-free stream'}
                  </div>
                </div>

                <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Eros Coins</span>
                    <Coins className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-xl font-black text-cyan-300 font-mono">
                    {wallet.coins} Coins
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Protected by 14-day unspent coin refund
                  </div>
                </div>

                <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Vault Keys Active</span>
                    <Lock className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-xl font-black text-purple-300 font-mono">
                    {grantKeys.length} Granted
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Auto-relocking in ≤ 35 hours
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BILLING & REFUND CENTER */}
          {activePortalTab === 'billing_refunds' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-xl font-black text-white">Billing & Refund Center</h3>
                  <p className="text-xs text-zinc-400">
                    All purchases are backed by the ErosDreamz 100% Satisfaction & 14-Day Refund Firewall.
                  </p>
                </div>
                <button
                  onClick={() => onOpenRefundPolicy()}
                  className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold transition flex items-center gap-1.5 self-start"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>File a Refund Claim</span>
                </button>
              </div>

              {/* Transactions Ledger */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-zinc-400 tracking-wider">
                  Recent Purchases & Eligibility
                </h4>
                {transactions.map(txn => (
                  <div
                    key={txn.id}
                    className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-zinc-900 text-zinc-400 border border-zinc-800">
                        <CreditCard className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{txn.itemTitle}</span>
                          {txn.isEligibleForRefund && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              Refund Eligible
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-zinc-400 font-mono">
                          {txn.id} • {txn.date} • {txn.paymentMethod}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="text-right">
                        <div className="text-base font-black text-white font-mono">
                          ${txn.amountUsd.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-emerald-400 font-mono">
                          Status: {txn.status}
                        </div>
                      </div>

                      {txn.isEligibleForRefund ? (
                        <button
                          onClick={() => onOpenRefundPolicy(txn.id)}
                          className="px-3 py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/30 text-xs font-bold transition flex items-center gap-1"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Refund</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowReceiptModal(txn)}
                          className="px-3 py-1.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs font-bold transition"
                        >
                          Receipt
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Refund Terms Summary Box */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The ErosDreamz Refund Guarantee Highlights</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  We process eligible refund requests within 24-48 hours directly back to your payment card or Apple/Google Pay. If you purchased coins accidentally or within the last 14 days without spending them, you are 100% covered.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: 35H PRIVATE VAULT CONSOLE */}
          {activePortalTab === 'vault' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-xl font-black text-white">35-Hour Auto-Relock Vault Console</h3>
                  <p className="text-xs text-zinc-400">
                    Cryptographic key manager for your private photos and clips. Keys automatically expire at 35 hours.
                  </p>
                </div>
                {grantKeys.length > 0 && (
                  <button
                    onClick={onRevokeAllGrants}
                    className="px-4 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/40 text-xs font-bold transition flex items-center gap-1.5 self-start"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Emergency Kill-Switch (Revoke All)</span>
                  </button>
                )}
              </div>

              {/* Vault Config */}
              <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Default Expiration Time Lock</h4>
                    <p className="text-xs text-zinc-400">Maximum allowed duration before shared media auto-relocks.</p>
                  </div>
                  <span className="text-sm font-mono font-black text-cyan-400">{autoLockHours} Hours</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="48"
                  value={autoLockHours}
                  onChange={e => setAutoLockHours(parseInt(e.target.value))}
                  className="w-full accent-pink-500"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>6 Hours (Strict)</span>
                  <span className="text-pink-400 font-bold">35 Hours (Industry Standard)</span>
                  <span>48 Hours (Max)</span>
                </div>
              </div>

              {/* Active Granted Keys */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-zinc-400 tracking-wider">
                  Active Access Keys ({grantKeys.length})
                </h4>
                {grantKeys.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 text-center text-xs text-zinc-500">
                    No active private vault keys currently granted. Your vault is 100% locked.
                  </div>
                ) : (
                  grantKeys.map(targetId => {
                    const grant = privateGrants[targetId];
                    const remainingHours = Math.max(0, Math.round((grant.expiresAt - Date.now()) / (1000 * 60 * 60)));
                    return (
                      <div
                        key={targetId}
                        className="p-4 rounded-2xl bg-zinc-950 border border-purple-900/40 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-purple-950/40 text-purple-400 border border-purple-500/30">
                            <KeyRound className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Recipient ID: {targetId}</div>
                            <div className="text-[11px] text-zinc-400 font-mono">
                              Granted: {new Date(grant.grantedAt).toLocaleDateString()} • Auto-relocks in ~{remainingHours}h
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={onRevokeAllGrants}
                          className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-red-400 border border-zinc-800 text-xs font-bold transition"
                        >
                          Revoke Key
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 4: RADAR STEALTH & PRIVACY */}
          {activePortalTab === 'radar_privacy' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-800">
                <h3 className="text-xl font-black text-white">Radar Stealth & Proximity Console</h3>
                <p className="text-xs text-zinc-400">
                  Control how you appear to other men on the nearby proximity radar.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-900 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Ghost Mode (Incognito Radar)</span>
                      {ghostMode && <span className="text-[9px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">ACTIVE</span>}
                    </h4>
                    <p className="text-xs text-zinc-400 max-w-md mt-1">
                      Browse nearby streams and radar grid invisibly. Your profile marker will not appear to others.
                    </p>
                  </div>
                  <button
                    onClick={() => setGhostMode(prev => !prev)}
                    className={`w-12 h-7 rounded-full p-1 transition ${ghostMode ? 'bg-purple-600' : 'bg-zinc-800'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition transform ${ghostMode ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-900 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Distance Fuzzing Protection</h4>
                    <p className="text-xs text-zinc-400 max-w-md mt-1">
                      Rounds your distance to the nearest ~0.5 mile instead of displaying exact feet for location security.
                    </p>
                  </div>
                  <button
                    onClick={() => setDistanceFuzzing(prev => !prev)}
                    className={`w-12 h-7 rounded-full p-1 transition ${distanceFuzzing ? 'bg-cyan-500' : 'bg-zinc-800'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition transform ${distanceFuzzing ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-white">Broadcast Proximity Radius</span>
                    <span className="font-mono text-cyan-400 font-bold">{broadcastRadius} Miles</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={broadcastRadius}
                    onChange={e => setBroadcastRadius(parseInt(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span>1 Mile (Neighborhood)</span>
                    <span>10 Miles (City Core)</span>
                    <span>25 Miles (Metro Area)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MOBILE PWA SYNC */}
          {activePortalTab === 'pwa_sync' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-800">
                <h3 className="text-xl font-black text-white">Mobile Device Sync & PWA Install</h3>
                <p className="text-xs text-zinc-400">
                  Run ErosDreamz directly on your iPhone or Android with native camera and microphone streaming.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-black text-lg">
                    
                  </div>
                  <h4 className="text-base font-bold text-white">iOS Safari (Add to Home Screen)</h4>
                  <ol className="text-xs text-zinc-400 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>Open <strong>erosdreamz.app</strong> in Safari on your iPhone.</li>
                    <li>Tap the <strong>Share</strong> button at bottom center.</li>
                    <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
                    <li>Launch full-screen with native haptics and 10s video recording!</li>
                  </ol>
                </div>

                <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-emerald-400 text-black flex items-center justify-center font-black text-lg">
                    ▶
                  </div>
                  <h4 className="text-base font-bold text-white">Android Chrome (Install Web App)</h4>
                  <ol className="text-xs text-zinc-400 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>Open <strong>erosdreamz.app</strong> in Chrome on Android.</li>
                    <li>Tap the <strong>three dots menu (⋮)</strong> top-right.</li>
                    <li>Select <strong>"Install app"</strong> or "Add to Home screen".</li>
                    <li>Enjoy instant push alerts and nearby radar background updates!</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Simulated Receipt Modal */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-purple-900/50 rounded-3xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
              <h4 className="text-sm font-bold text-white">Transaction Receipt</h4>
              <button onClick={() => setShowReceiptModal(null)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs space-y-2 text-zinc-300 font-mono">
              <div className="flex justify-between"><span className="text-zinc-500">Invoice:</span><span>{showReceiptModal.id}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Item:</span><span>{showReceiptModal.itemTitle}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Date:</span><span>{showReceiptModal.date}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Payment:</span><span>{showReceiptModal.paymentMethod}</span></div>
              <div className="flex justify-between border-t border-zinc-800 pt-2"><span className="font-bold">Total Paid:</span><span className="font-bold text-white">${showReceiptModal.amountUsd.toFixed(2)} USD</span></div>
            </div>
            <button
              onClick={() => setShowReceiptModal(null)}
              className="w-full py-2.5 rounded-xl bg-zinc-900 text-white font-bold text-xs"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
