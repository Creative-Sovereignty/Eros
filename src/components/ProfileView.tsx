import React, { useState } from 'react';
import { User, VideoItem, AgeVerificationState, Tribe, LookingFor, UserWallet, PrivateFolderItem } from '../types';
import { 
  ShieldCheck, 
  MapPin, 
  Ruler, 
  Sparkles, 
  Video, 
  Plus, 
  Edit3, 
  Save, 
  Zap, 
  Gift, 
  CheckCircle2, 
  Award, 
  Lock, 
  Coins,
  Crown,
  Flame,
  Clock,
  ShieldAlert,
  KeyRound,
  Lightbulb,
  Camera,
  Mic,
  Ghost,
  EyeOff,
  Globe,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfileViewProps {
  currentUser: User;
  userVideos: VideoItem[];
  verificationState: AgeVerificationState;
  isAdFreeUser: boolean;
  wallet: UserWallet;
  privateItemsCount: number;
  onToggleAdFree: () => void;
  onOpenVerificationModal: () => void;
  onOpenVideoCreator: () => void;
  onOpenRewardedModal: () => void;
  onOpenMonetizationModal: (initialTab?: 'coins' | 'boost' | 'vip' | 'gifts') => void;
  onOpenPrivateFolder: () => void;
  onUpdateProfile: (updated: Partial<User>) => void;
  onOpenLostPassword?: () => void;
  onOpenBestPractices?: () => void;
  isIncognitoMode?: boolean;
  onToggleIncognito?: () => void;
  onOpenLandingPage?: () => void;
}

const TRIBES: Tribe[] = [
  'Jock', 'Twink', 'Otter', 'Bear', 'Geek', 'Creative', 'Daddy', 'Discreet', 'Queer', 'Guy Next Door'
];

const LOOKING_FOR_OPTIONS: LookingFor[] = [
  'Dating & Romance',
  'Right Now / Spontaneous',
  'Drinks & Nightlife',
  'Gym & Fitness Partner',
  'Friends & Networking',
  'Long-term Relationship'
];

import { POPULAR_VIBES } from '../data/mockData';

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  userVideos,
  verificationState,
  isAdFreeUser,
  wallet,
  privateItemsCount,
  onToggleAdFree,
  onOpenVerificationModal,
  onOpenVideoCreator,
  onOpenRewardedModal,
  onOpenMonetizationModal,
  onOpenPrivateFolder,
  onUpdateProfile,
  onOpenLostPassword,
  onOpenBestPractices,
  isIncognitoMode = false,
  onToggleIncognito,
  onOpenLandingPage
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [height, setHeight] = useState(currentUser.height);
  const [tribe, setTribe] = useState<Tribe>(currentUser.tribe);
  const [lookingFor, setLookingFor] = useState<LookingFor>(currentUser.lookingFor);
  const [tagInput, setTagInput] = useState(currentUser.tags.join(', '));
  const [selectedVibes, setSelectedVibes] = useState<string[]>(currentUser.vibes || ['Artistic', 'Night Owl']);
  const [customVibeInput, setCustomVibeInput] = useState('');
  const [savedToast, setSavedToast] = useState(false);

  const toggleVibe = (vibe: string) => {
    setSelectedVibes(prev =>
      prev.includes(vibe) ? prev.filter(v => v !== vibe) : [...prev, vibe]
    );
  };

  const handleAddCustomVibe = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const trimmed = customVibeInput.trim();
    if (trimmed && !selectedVibes.includes(trimmed)) {
      setSelectedVibes(prev => [...prev, trimmed]);
      setCustomVibeInput('');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTags = tagInput.split(',').map(t => t.trim()).filter(Boolean);
    onUpdateProfile({
      name,
      bio,
      height,
      tribe,
      lookingFor,
      tags: updatedTags,
      vibes: selectedVibes
    });
    setIsEditing(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);

    confetti({ particleCount: 30, spread: 50 });
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 space-y-5">
      {/* Toast */}
      {savedToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-black font-extrabold text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-1.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4" /> Profile Updated Successfully!
        </div>
      )}

      {/* Profile Header Card */}
      <div className="relative bg-zinc-950 border border-zinc-800 rounded-3xl p-6 overflow-hidden shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative flex-shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-400 shadow-xl"
            />
            {currentUser.isVerifiedAge && (
              <div
                className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-amber-400 to-orange-400 text-black p-1.5 rounded-full shadow-lg"
                title="18+ Verified Account"
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-black text-white">{currentUser.name}</h2>
                <span className="text-amber-400 font-extrabold text-lg">{currentUser.age}</span>
                {currentUser.isVerifiedAge && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/30">
                    18+ VERIFIED
                  </span>
                )}
              </div>

              <button
                onClick={() => setIsEditing(prev => !prev)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-amber-400 text-xs font-semibold transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>

            <p className="text-xs text-zinc-400">@{currentUser.username}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-zinc-300 pt-1">
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                {currentUser.locationName}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-zinc-400">
                <Ruler className="w-3.5 h-3.5" />
                {currentUser.height}
              </span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-amber-300">
                {currentUser.tribe}
              </span>
            </div>

            {/* Active Vibes Display */}
            {currentUser.vibes && currentUser.vibes.length > 0 && (
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1.5">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                  <Sparkles className="w-3 h-3" /> Vibes:
                </span>
                {currentUser.vibes.map(vibe => (
                  <span
                    key={vibe}
                    className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-rose-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-semibold flex items-center gap-1 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {vibe}
                  </span>
                ))}
              </div>
            )}

            <p className="text-xs text-zinc-200 mt-2 leading-relaxed max-w-xl">
              {currentUser.bio}
            </p>
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="pt-4 border-t border-zinc-800/80 space-y-4 animate-in fade-in duration-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Edit Your Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-zinc-400 font-semibold block mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 font-semibold block mb-1">Height</label>
                <input
                  type="text"
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 font-semibold block mb-1">Tribe / Category</label>
                <select
                  value={tribe}
                  onChange={e => setTribe(e.target.value as Tribe)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {TRIBES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 font-semibold block mb-1">Looking For</label>
                <select
                  value={lookingFor}
                  onChange={e => setLookingFor(e.target.value as LookingFor)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {LOOKING_FOR_OPTIONS.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 font-semibold block mb-1">Bio / 10-Second Vibe Intro</label>
              <textarea
                rows={3}
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            {/* VIBE TAGS EDITING SECTION */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Your Vibe Tags (Select or Add)
                </label>
                <span className="text-[10px] text-zinc-400">
                  {selectedVibes.length} selected
                </span>
              </div>

              {/* Selected Vibes Pills */}
              {selectedVibes.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pb-1">
                  {selectedVibes.map(vibe => (
                    <span
                      key={vibe}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-semibold"
                    >
                      {vibe}
                      <button
                        type="button"
                        onClick={() => toggleVibe(vibe)}
                        className="p-0.5 hover:text-white rounded-full"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Popular Vibe Options to pick */}
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 block">Popular Vibes:</span>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto scrollbar-none">
                  {POPULAR_VIBES.map(vibe => {
                    const isSelected = selectedVibes.includes(vibe);
                    return (
                      <button
                        key={vibe}
                        type="button"
                        onClick={() => toggleVibe(vibe)}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition ${
                          isSelected
                            ? 'bg-amber-400 text-black border-amber-400 shadow-sm'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{vibe}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add Custom Vibe Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={customVibeInput}
                  onChange={e => setCustomVibeInput(e.target.value)}
                  onKeyDown={handleAddCustomVibe}
                  placeholder="Type a custom vibe (e.g. Gym Rat, Night Owl)..."
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={handleAddCustomVibe}
                  disabled={!customVibeInput.trim()}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-xs font-bold text-amber-300 transition"
                >
                  Add Vibe
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 font-semibold block mb-1">Tags / Interests (comma separated)</label>
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition"
            >
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </form>
        )}
      </div>

      {/* INCOGNITO STEALTH MODE MODULE */}
      <div className="bg-gradient-to-r from-zinc-950 via-purple-950/20 to-zinc-950 border border-purple-500/30 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition ${
              isIncognitoMode
                ? 'bg-pink-500/20 border-pink-500/50 text-pink-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500'
            }`}>
              <Ghost className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Incognito Stealth Camouflage
                </h3>
                <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold ${
                  isIncognitoMode
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40'
                    : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {isIncognitoMode ? 'ACTIVE' : 'OFF'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Fuzzes your proximity distance within ~1.5 miles, cloaks online dot, and enables silent stream viewing.
              </p>
            </div>
          </div>

          {onToggleIncognito && (
            <button
              onClick={onToggleIncognito}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                isIncognitoMode
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
              }`}
            >
              {isIncognitoMode ? <EyeOff className="w-4 h-4" /> : <Ghost className="w-4 h-4" />}
              <span>{isIncognitoMode ? 'Disable Stealth' : 'Enable Stealth'}</span>
            </button>
          )}
        </div>
      </div>

      {/* PRIVATE FOLDER VAULT MODULE WITH 35-HOUR AUTO-LOCK */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-rose-500/40 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  My Private Folder (35h Auto-Relock Vault)
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-[9px] font-bold">
                  ENCRYPTED
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Store private photos/videos. Grants given to other members auto-relock in 35 hours.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenPrivateFolder}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-black text-xs font-black uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition"
          >
            Manage Vault ({privateItemsCount})
          </button>
        </div>

        <div className="p-3 bg-black/40 rounded-2xl border border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <Clock className="w-4 h-4 text-rose-400" />
            <span>Strict 35-Hour Auto-Expiration Timer Enforced</span>
          </div>
          <span className="text-[11px] text-rose-300 font-semibold">Exempt from Public Feed Scanning</span>
        </div>
      </div>

      {/* EROS STORE & MONETIZATION WALLET */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Eros Wallet & Monetization
              </h3>
              <p className="text-xs text-zinc-400">
                Balance: <strong className="text-amber-400 font-mono">{wallet.coins} Coins</strong> • VIP: {wallet.isVipMember ? '★ Active' : 'Standard'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenMonetizationModal('boost')}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/30 text-xs font-bold transition flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5" />
              Boost
            </button>
            <button
              onClick={() => onOpenMonetizationModal('coins')}
              className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black transition"
            >
              Refill Coins
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <button
            onClick={() => onOpenMonetizationModal('vip')}
            className="p-3 bg-zinc-900 border border-zinc-800 hover:border-amber-400 rounded-2xl text-left transition"
          >
            <Crown className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-xs font-bold text-white block">VIP Gold Pass</span>
            <span className="text-[10px] text-zinc-400 block">Advanced search & ad-free</span>
          </button>

          <button
            onClick={() => onOpenMonetizationModal('boost')}
            className="p-3 bg-zinc-900 border border-zinc-800 hover:border-amber-400 rounded-2xl text-left transition"
          >
            <Zap className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-xs font-bold text-white block">Radar Surge Boost</span>
            <span className="text-[10px] text-zinc-400 block">5x-10x profile visibility</span>
          </button>

          <button
            onClick={() => onOpenMonetizationModal('gifts')}
            className="p-3 bg-zinc-900 border border-zinc-800 hover:border-amber-400 rounded-2xl text-left transition"
          >
            <Gift className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-xs font-bold text-white block">Luxury Virtual Gifts</span>
            <span className="text-[10px] text-zinc-400 block">Send drinks, crowns, diamonds</span>
          </button>
        </div>
      </div>

      {/* 18+ AGE VERIFICATION SECURITY BADGE MODULE */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-amber-500/30 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Pulse 18+ Age Security Certificate</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-xs text-zinc-400">Strict Adult Identity & Biometric Verification Protocol</p>
            </div>
          </div>

          <button
            onClick={onOpenVerificationModal}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/30 text-xs font-bold transition"
          >
            Manage / Re-verify
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-zinc-800/80 text-xs">
          <div className="p-2.5 bg-black/40 rounded-xl border border-zinc-800/80">
            <span className="text-[10px] text-zinc-500 block uppercase font-bold">Certificate ID</span>
            <span className="font-mono text-amber-400 text-xs font-bold truncate block">
              {verificationState.certificateId || 'PLS-VER-98240-X19'}
            </span>
          </div>

          <div className="p-2.5 bg-black/40 rounded-xl border border-zinc-800/80">
            <span className="text-[10px] text-zinc-500 block uppercase font-bold">Status</span>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 18+ Confirmed
            </span>
          </div>

          <div className="p-2.5 bg-black/40 rounded-xl border border-zinc-800/80">
            <span className="text-[10px] text-zinc-500 block uppercase font-bold">Method</span>
            <span className="text-zinc-200 text-xs font-semibold capitalize">
              {verificationState.method?.replace('_', ' ') || 'Facial Liveness'}
            </span>
          </div>

          <div className="p-2.5 bg-black/40 rounded-xl border border-zinc-800/80">
            <span className="text-[10px] text-zinc-500 block uppercase font-bold">Safety Pledge</span>
            <span className="text-amber-300 text-xs font-semibold">Agreed & Signed</span>
          </div>
        </div>
      </div>

      {/* USER'S 10-SECOND VIDEO REELS */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              My 10-Second Reels ({userVideos.length})
            </h3>
          </div>
          <button
            onClick={onOpenVideoCreator}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            Record 10s Video
          </button>
        </div>

        {userVideos.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-zinc-800 rounded-2xl space-y-2">
            <p className="text-xs font-semibold text-zinc-300">No 10-second videos uploaded yet</p>
            <p className="text-[11px] text-zinc-500">Record a 10s webcam clip or upload a video to appear on the nearby stream.</p>
            <button
              onClick={onOpenVideoCreator}
              className="mt-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-xs font-bold inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Record Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {userVideos.map(vid => (
              <div
                key={vid.id}
                className="relative aspect-[9/13] rounded-2xl overflow-hidden border border-zinc-800 group"
              >
                <img src={vid.posterUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-amber-400">
                  10s
                </div>

                <div className="absolute bottom-2 inset-x-2 text-[10px] text-white">
                  <div className="flex items-center gap-1 text-red-400 font-bold">
                    <Flame className="w-3 h-3 fill-red-400" />
                    <span>{vid.likesCount}</span>
                  </div>
                  <p className="truncate text-zinc-300 text-[10px] mt-0.5">{vid.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FIRST-TIME VIDEO UPLOADING BEST PRACTICES MODULE */}
      {onOpenBestPractices && (
        <div className="bg-gradient-to-r from-purple-950/40 via-zinc-950 to-pink-950/40 border border-purple-500/40 rounded-3xl p-5 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Video Uploading Best Practices Guide
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[9px] font-bold">
                  CREATOR TIPS
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Master 9:16 vertical framing, mic audio clarity, the 2-second hook, and private vault discretion.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBestPractices}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition whitespace-nowrap ml-3"
          >
            Open Guide →
          </button>
        </div>
      )}

      {/* ACCOUNT CREDENTIALS & LOST PASSWORD RECOVERY MODULE */}
      <div className="bg-zinc-950 border border-purple-900/40 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-500/40 text-pink-400 flex items-center justify-center flex-shrink-0">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Account Credentials & Password
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-mono text-[9px] font-bold">
                  ENCRYPTED 2FA
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Forgot your login or want to reset your credentials? Use our self-service recovery vault.
              </p>
            </div>
          </div>

          {onOpenLostPassword && (
            <button
              onClick={onOpenLostPassword}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-purple-500/40 hover:border-pink-500 text-cyan-300 hover:text-pink-300 font-bold text-xs transition whitespace-nowrap ml-3 flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Reset Password</span>
            </button>
          )}
        </div>
      </div>

      {/* PUBLIC MARKETING & LANDING PAGE ACCESS */}
      {onOpenLandingPage && (
        <div className="bg-gradient-to-r from-zinc-950 via-purple-950/20 to-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Public Landing Page & Overview
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-mono text-[9px] font-bold">
                  PORTAL
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Explore the public showcase, subscription pricing tiers, blog guides, and download links.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenLandingPage}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-pink-500/40 hover:border-pink-500 text-pink-300 hover:text-white font-bold text-xs transition whitespace-nowrap ml-3 flex items-center gap-1.5"
          >
            <span>View Landing Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};
