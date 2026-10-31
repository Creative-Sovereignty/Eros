import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  ScanFace, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Zap, 
  UserCheck,
  Ghost
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { User } from '../types';
import { ErosLogo } from './ErosLogo';

interface LoginFirewallGateProps {
  onUnlockSuccess: () => void;
  onOpenLostPassword: () => void;
  onOpenRefundPolicy?: () => void;
  onOpenPortal?: () => void;
  onOpenCopywritingBible?: () => void;
  onOpenLandingPage?: (tab?: any) => void;
  currentUser: User;
  isIncognito?: boolean;
}

export const LoginFirewallGate: React.FC<LoginFirewallGateProps> = ({
  onUnlockSuccess,
  onOpenLostPassword,
  onOpenLandingPage,
  currentUser,
  isIncognito = true
}) => {
  const [authMode, setAuthMode] = useState<'biometric' | 'password' | 'pin'>('biometric');
  const [username, setUsername] = useState('alex_r');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [pinDigits, setPinDigits] = useState(['', '', '', '']);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('Position face in frame for instant unlock');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Trigger simulated biometric liveness scan
  const handleStartBiometricScan = () => {
    setIsScanning(true);
    setScanMessage('Scanning Biometrics...');

    setTimeout(() => {
      setScanMessage('Verifying 18+ credentials...');
    }, 800);

    setTimeout(() => {
      setScanMessage('Authorized ✓');
    }, 1500);

    setTimeout(() => {
      setIsScanning(false);
      confetti({
        particleCount: 50,
        spread: 55,
        colors: ['#06b6d4', '#ec4899', '#a855f7']
      });
      onUnlockSuccess();
    }, 1900);
  };

  // Password submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setLoginError('Please enter username or email.');
      return;
    }
    setLoginError(null);
    confetti({ particleCount: 35, spread: 45 });
    onUnlockSuccess();
  };

  // PIN entry
  const handlePinPress = (digit: string) => {
    const firstEmpty = pinDigits.findIndex(d => d === '');
    if (firstEmpty !== -1) {
      const newDigits = [...pinDigits];
      newDigits[firstEmpty] = digit;
      setPinDigits(newDigits);

      if (firstEmpty === 3) {
        setTimeout(() => {
          confetti({ particleCount: 45, spread: 50 });
          onUnlockSuccess();
        }, 250);
      }
    }
  };

  const handlePinBackspace = () => {
    const lastFilled = [...pinDigits].reverse().findIndex(d => d !== '');
    if (lastFilled !== -1) {
      const idx = 3 - lastFilled;
      const newDigits = [...pinDigits];
      newDigits[idx] = '';
      setPinDigits(newDigits);
    }
  };

  return (
    <div className="min-h-screen bg-[#060609] text-zinc-100 flex flex-col font-sans select-none antialiased relative overflow-hidden">
      {/* Discreet Ambient Lighting */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Discreet Incognito Header */}
      <header className="sticky top-0 z-30 bg-[#060609]/90 backdrop-blur-xl border-b border-zinc-900 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <ErosLogo size="md" glow={true} />

        <div className="flex items-center gap-2">
          {onOpenLandingPage && (
            <button
              onClick={onOpenLandingPage}
              className="px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-pink-300 hover:text-pink-200 border border-zinc-800 hover:border-pink-500/40 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <span>Landing Page</span>
              <ArrowRight className="w-3 h-3 text-pink-400" />
            </button>
          )}

          {/* Incognito Status Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 text-xs font-medium">
            <Ghost className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Incognito Session</span>
          </div>
        </div>
      </header>

      {/* Main Sign-In Gateway Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 z-10">
        <div className="w-full max-w-md bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Accent Line */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-cyan-500/60 via-pink-500/60 to-purple-500/60" />

          {/* Clean Discreet Title with ErosLogo */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <ErosLogo size="lg" layout="stacked" showTagline={false} glow={true} />
            </div>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
              Secure, discreet access to your 10s streams and proximity radar.
            </p>
          </div>

          {/* Discreet Auth Switcher */}
          <div className="grid grid-cols-3 bg-zinc-900/90 p-1 rounded-2xl mb-6 border border-zinc-800">
            <button
              onClick={() => {
                setAuthMode('biometric');
                setLoginError(null);
              }}
              className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                authMode === 'biometric'
                  ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ScanFace className="w-3.5 h-3.5" />
              <span>Face Scan</span>
            </button>

            <button
              onClick={() => {
                setAuthMode('pin');
                setLoginError(null);
              }}
              className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                authMode === 'pin'
                  ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>PIN Pass</span>
            </button>

            <button
              onClick={() => {
                setAuthMode('password');
                setLoginError(null);
              }}
              className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                authMode === 'password'
                  ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Password</span>
            </button>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 text-xs font-semibold">
              {loginError}
            </div>
          )}

          {/* MODE 1: BIOMETRIC SCAN */}
          {authMode === 'biometric' && (
            <div className="space-y-5 text-center">
              <div 
                onClick={handleStartBiometricScan}
                className="relative w-36 h-36 mx-auto rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-pink-500/50 cursor-pointer flex items-center justify-center overflow-hidden transition group"
              >
                {isScanning ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85">
                    <div className="w-24 h-24 rounded-full border-2 border-cyan-400 border-t-pink-500 animate-spin flex items-center justify-center">
                      <ScanFace className="w-10 h-10 text-cyan-400" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-zinc-400 group-hover:text-pink-400 transition">
                    <ScanFace className="w-12 h-12 text-pink-400 transition-transform group-hover:scale-105" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                      Tap to Scan
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="text-xs font-medium text-cyan-300">
                  {scanMessage}
                </div>
                <p className="text-[11px] text-zinc-500">
                  Quick touch / face verification
                </p>
              </div>

              <button
                type="button"
                onClick={handleStartBiometricScan}
                disabled={isScanning}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 hover:opacity-95 active:scale-95 transition flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>{isScanning ? 'Authenticating...' : 'Instant Face Unlock'}</span>
              </button>
            </div>
          )}

          {/* MODE 2: 4-DIGIT PIN */}
          {authMode === 'pin' && (
            <div className="space-y-5">
              {/* Digit indicators */}
              <div className="flex justify-center gap-3">
                {pinDigits.map((digit, idx) => (
                  <div
                    key={idx}
                    className={`w-12 h-14 rounded-2xl border flex items-center justify-center text-xl font-mono font-black transition ${
                      digit
                        ? 'border-pink-500 bg-pink-500/20 text-white shadow-[0_0_12px_rgba(236,72,153,0.3)]'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-600'
                    }`}
                  >
                    {digit ? '•' : ''}
                  </div>
                ))}
              </div>

              {/* Number Pad */}
              <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      if (item === 'C') {
                        setPinDigits(['', '', '', '']);
                      } else if (item === '⌫') {
                        handlePinBackspace();
                      } else {
                        handlePinPress(item);
                      }
                    }}
                    className="h-12 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-pink-500/40 text-white font-mono font-bold text-sm transition active:scale-90"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setPinDigits(['2', '0', '2', '6']);
                    setTimeout(() => {
                      confetti({ particleCount: 40, spread: 50 });
                      onUnlockSuccess();
                    }, 350);
                  }}
                  className="text-[11px] text-cyan-400 hover:underline font-mono"
                >
                  ⚡ Quick Auto-PIN (2026)
                </button>
              </div>
            </div>
          )}

          {/* MODE 3: PASSWORD */}
          {authMode === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Username or Email
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="alex_r"
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={onOpenLostPassword}
                    className="text-[11px] text-zinc-400 hover:text-pink-400 underline transition"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3 top-2.5 text-zinc-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 hover:opacity-95 active:scale-95 transition flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Enter App</span>
              </button>
            </form>
          )}

          {/* Quick Incognito Session Pass */}
          <div className="mt-6 pt-5 border-t border-zinc-900">
            <button
              onClick={() => {
                confetti({ particleCount: 45, spread: 55 });
                onUnlockSuccess();
              }}
              className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800 hover:border-cyan-400/50 text-zinc-200 text-xs font-bold transition flex items-center justify-center gap-2 group"
            >
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>Continue Incognito as Alex ({currentUser.age})</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-0.5 transition" />
            </button>
          </div>
        </div>
      </main>

      {/* Discreet Minimalist Footer */}
      <footer className="py-4 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500 border-t border-zinc-900/60 bg-[#060609]">
        <div>Discreet 18+ Male Video Dating & Proximity • Encrypted & Private</div>
        {onOpenLandingPage && (
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => onOpenLandingPage('privacy')}
              className="text-zinc-500 hover:text-pink-400 transition"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLandingPage('terms')}
              className="text-zinc-500 hover:text-pink-400 transition"
            >
              Terms
            </button>
            <button
              onClick={() => onOpenLandingPage('safety')}
              className="text-zinc-500 hover:text-pink-400 transition"
            >
              Safety
            </button>
            <button
              onClick={() => onOpenLandingPage('landing')}
              className="text-zinc-400 hover:text-pink-400 transition underline underline-offset-4 decoration-zinc-700 hover:decoration-pink-500 font-medium"
            >
              Explore Public Landing →
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};
