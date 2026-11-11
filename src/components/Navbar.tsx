import React from 'react';
import { 
  Flame, 
  Compass, 
  Plus, 
  MessageCircle, 
  User as UserIcon, 
  ShieldCheck, 
  Coins, 
  Lock, 
  HeartHandshake, 
  Camera, 
  Mic, 
  Ghost,
  EyeOff,
  Globe
} from 'lucide-react';
import { User, UserWallet } from '../types';
import { ErosLogo } from './ErosLogo';
import { PWAInstallButton } from './PWAInstallButton';

export type AppNavTab = 'stream' | 'radar' | 'messages' | 'profile';

interface NavbarProps {
  currentTab: AppNavTab | string;
  onChangeTab: (tab: any) => void;
  onOpenCreate: () => void;
  onOpenRewardedModal: () => void;
  onOpenVerificationModal: () => void;
  onOpenMonetizationModal: (initialTab?: 'coins' | 'boost' | 'vip' | 'gifts') => void;
  onOpenPrivateFolder: () => void;
  onOpenConnectionRequests: () => void;
  unreadCount: number;
  pendingRequestsCount: number;
  currentUser: User;
  isAdFreeUser: boolean;
  wallet: UserWallet;
  isIncognitoMode?: boolean;
  onToggleIncognito?: () => void;
  onLockFirewall?: () => void;
  onOpenLandingPage?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onChangeTab,
  onOpenCreate,
  onOpenVerificationModal,
  onOpenMonetizationModal,
  onOpenPrivateFolder,
  onOpenConnectionRequests,
  unreadCount,
  pendingRequestsCount,
  currentUser,
  wallet,
  isIncognitoMode = false,
  onToggleIncognito,
  onOpenLandingPage
}) => {
  return (
    <>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#060609]/95 backdrop-blur-md border-b border-zinc-800/80 px-4 h-16 flex items-center justify-between">
        {/* Brand Logo with Prominent ErosLogo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onChangeTab('stream')}
            className="group text-left focus:outline-none flex items-center"
            title="ErosDreamz - Home"
          >
            <ErosLogo size="md" glow={true} />
          </button>
        </div>

        {/* Center Desktop Navigation Tabs (Clean Client Focus) */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 p-1 rounded-2xl">
          <button
            onClick={() => onChangeTab('stream')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentTab === 'stream'
                ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-md shadow-pink-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 fill-current" />
            Stream
          </button>

          <button
            onClick={() => onChangeTab('radar')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentTab === 'radar'
                ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-md shadow-pink-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            Radar
          </button>

          <button
            onClick={() => onChangeTab('messages')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 relative ${
              currentTab === 'messages'
                ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-md shadow-pink-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Messages
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping absolute top-1.5 right-1.5" />
            )}
          </button>
        </nav>

        {/* Top Right: Incognito Mode, Coins, Requests, 18+ Verification & Create */}
        <div className="flex items-center gap-2">
          {/* Incognito Stealth Mode Toggle */}
          {onToggleIncognito && (
            <button
              onClick={onToggleIncognito}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${
                isIncognitoMode
                  ? 'bg-purple-950/80 text-pink-300 border border-pink-500/60 shadow-[0_0_12px_rgba(236,72,153,0.3)]'
                  : 'bg-zinc-900/90 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
              title={isIncognitoMode ? 'Incognito Mode Active: Distance hidden, stealth browsing' : 'Enable Incognito Stealth Mode'}
            >
              <Ghost className={`w-3.5 h-3.5 ${isIncognitoMode ? 'text-pink-400 animate-pulse' : 'text-zinc-400'}`} />
              <span className="hidden sm:inline">
                {isIncognitoMode ? 'Incognito ON' : 'Incognito'}
              </span>
            </button>
          )}

          {/* Landing Page Link */}
          {onOpenLandingPage && (
            <button
              onClick={onOpenLandingPage}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-pink-500/40 text-xs font-semibold transition"
              title="View Public Landing Page & Features"
            >
              <Globe className="w-3.5 h-3.5 text-pink-400" />
              <span>Landing Page</span>
            </button>
          )}

          {/* In-App PWA Install Action */}
          <PWAInstallButton />

          {/* Eros Coins Pill */}
          <button
            onClick={() => onOpenMonetizationModal('coins')}
            className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-cyan-300 border border-cyan-400/40 px-2.5 py-1.5 rounded-full text-xs font-mono font-bold transition shadow-sm"
            title="Refill Eros Coins"
          >
            <Coins className="w-3.5 h-3.5 text-cyan-400" />
            <span>{wallet.coins}</span>
          </button>

          {/* Connection Requests Icon */}
          <button
            onClick={onOpenConnectionRequests}
            className="relative p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-pink-400 border border-zinc-800 transition"
            title="Connection Requests"
          >
            <HeartHandshake className="w-4 h-4" />
            {pendingRequestsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                {pendingRequestsCount}
              </span>
            )}
          </button>

          {/* Private Vault shortcut */}
          <button
            onClick={onOpenPrivateFolder}
            className="hidden sm:flex items-center gap-1 bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/30 px-2.5 py-1.5 rounded-full text-xs font-bold transition"
            title="Open Confidential Vault"
          >
            <Lock className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden lg:inline">Vault</span>
          </button>

          {/* 18+ Age Security Status Pill */}
          <button
            onClick={onOpenVerificationModal}
            className="flex items-center gap-1 bg-zinc-900 hover:bg-zinc-800 text-cyan-300 border border-cyan-400/30 px-2.5 py-1.5 rounded-full text-xs font-bold transition"
            title="18+ Verified Profile"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="hidden xl:inline">18+</span>
          </button>

          {/* Record Now 10s button */}
          <button
            onClick={onOpenCreate}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 hover:opacity-95 text-black px-3 py-1.5 rounded-2xl text-xs font-black shadow-md shadow-pink-500/25 active:scale-95 transition"
            title="Record 10-Second Vibe"
          >
            <Camera className="w-4 h-4 stroke-[2.5]" />
            <Mic className="w-4 h-4 stroke-[2.5]" />
            <span>Record</span>
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => onChangeTab('profile')}
            className={`w-9 h-9 rounded-2xl p-0.5 border transition ${
              currentTab === 'profile'
                ? 'border-pink-500 ring-2 ring-pink-500/30'
                : 'border-zinc-800 hover:border-zinc-600'
            }`}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full rounded-[14px] object-cover"
            />
          </button>
        </div>
      </header>

      {/* Bottom Mobile Navigation Bar (Clean Client Focus) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#060609]/95 backdrop-blur-lg border-t border-zinc-800/80 px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => onChangeTab('stream')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition ${
            currentTab === 'stream' ? 'text-pink-400' : 'text-zinc-500'
          }`}
        >
          <Flame className={`w-5 h-5 ${currentTab === 'stream' ? 'fill-pink-500 text-pink-500' : ''}`} />
          <span className="text-[10px] font-bold">Stream</span>
        </button>

        <button
          onClick={() => onChangeTab('radar')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition ${
            currentTab === 'radar' ? 'text-cyan-400' : 'text-zinc-500'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-bold">Radar</span>
        </button>

        {/* Center Big "+" Record Button */}
        <button
          onClick={onOpenCreate}
          className="w-12 h-10 -mt-2 rounded-2xl bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 p-0.5 shadow-lg shadow-pink-500/30 flex items-center justify-center active:scale-90 transition"
        >
          <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-pink-400">
            <Plus className="w-5 h-5 stroke-[3]" />
          </div>
        </button>

        <button
          onClick={() => onChangeTab('messages')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl relative transition ${
            currentTab === 'messages' ? 'text-purple-400' : 'text-zinc-500'
          }`}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-bold">Messages</span>
          {unreadCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-pink-500 absolute top-1 right-2 animate-ping" />
          )}
        </button>

        <button
          onClick={() => onChangeTab('profile')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition ${
            currentTab === 'profile' ? 'text-cyan-400' : 'text-zinc-500'
          }`}
        >
          <UserIcon className="w-5 h-5" />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </nav>
    </>
  );
};
