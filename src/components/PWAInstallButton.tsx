import React, { useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, CheckCircle2, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'compact' | 'prominent' | 'card';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'compact'
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  // If already installed and running as standalone PWA, hide install triggers
  if (isInstalled) {
    return null;
  }

  // Card variant for Landing Page / Downloads tab
  if (variant === 'card') {
    return (
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-amber-500/30 flex flex-col justify-between ${className}`}>
        <div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-black text-xl mb-6 shadow-lg shadow-amber-500/20">
            <Smartphone className="w-6 h-6" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase mb-3">
            <span>Direct Web App (PWA)</span>
          </div>
          <h3 className="text-2xl font-black text-white mb-2">Install Without App Stores</h3>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            Zero App Store delays, zero surveillance. Install ErosDreamz directly to your Home Screen on iPhone, iPad, Android, or Mac/PC desktop.
          </p>
          <div className="space-y-2 mb-8 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Full-screen standalone native experience</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Camera streaming & proximity radar enabled</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Auto-updates with zero manual downloads</span>
            </div>
          </div>
        </div>

        {isInstallable ? (
          <button
            onClick={install}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-black font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-amber-500/25 hover:scale-102 transition"
          >
            <Download className="w-4 h-4 stroke-[3]" />
            <span>Install ErosDreamz PWA</span>
          </button>
        ) : isIOS ? (
          <>
            <button
              onClick={() => setShowIOSModal(true)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-slate-200 via-white to-slate-200 text-black font-black text-sm flex items-center justify-center gap-3 shadow-xl transition"
            >
              <Smartphone className="w-4 h-4" />
              <span>Install on iPhone / iPad (PWA)</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowIOSModal(true)}
            className="w-full py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm flex items-center justify-center gap-3 transition"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Add to Home Screen (PWA Instructions)</span>
          </button>
        )}

        {/* Guided iOS / Browser Install Instructions Modal */}
        {showIOSModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-zinc-950 border border-slate-700/80 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative text-left">
              <button
                onClick={() => setShowIOSModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-black text-white mb-2">Install ErosDreamz</h3>
              <p className="text-xs text-zinc-400 mb-6">
                Install directly as a Progressive Web App on your home screen in two quick taps:
              </p>

              <div className="space-y-4 text-xs text-zinc-200 mb-6">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-0.5">Tap the Share Button</span>
                    <span className="text-zinc-400">At the bottom of Safari or browser toolbar (the square icon with arrow pointing up).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="w-7 h-7 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-0.5">Select &apos;Add to Home Screen&apos;</span>
                    <span className="text-zinc-400">Scroll down the share sheet and tap <strong>Add to Home Screen</strong>.</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSModal(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-xs uppercase tracking-wider transition"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Compact / Prominent variant for Navbar & Header
  return (
    <>
      {isInstallable ? (
        <button
          onClick={install}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 hover:scale-105 transition ${className}`}
          title="Install ErosDreamz as a Progressive Web App"
        >
          <Download className="w-3.5 h-3.5 stroke-[3]" />
          <span>Install PWA</span>
        </button>
      ) : isIOS ? (
        <button
          onClick={() => setShowIOSModal(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-amber-500/40 text-amber-300 text-xs font-semibold transition ${className}`}
          title="Install on iPhone / iPad"
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-400" />
          <span>Install PWA</span>
        </button>
      ) : (
        <button
          onClick={() => setShowIOSModal(true)}
          className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium transition ${className}`}
          title="Install PWA"
        >
          <Download className="w-3.5 h-3.5 text-zinc-400" />
          <span>Get App</span>
        </button>
      )}

      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-slate-700/80 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative text-left">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-white mb-2">Install ErosDreamz PWA</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Install ErosDreamz directly to your home screen with zero App Store downloads:
            </p>

            <div className="space-y-4 text-xs text-zinc-200 mb-6">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <span className="font-bold text-white block mb-0.5">Tap the Share Icon</span>
                  <span className="text-zinc-400">At the bottom of Safari (or browser menu).</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="w-7 h-7 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <span className="font-bold text-white block mb-0.5">Tap &apos;Add to Home Screen&apos;</span>
                  <span className="text-zinc-400">Scroll down and choose <strong>Add to Home Screen</strong>.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-xs uppercase tracking-wider transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};
