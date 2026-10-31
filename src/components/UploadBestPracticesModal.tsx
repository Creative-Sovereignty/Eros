import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Camera, 
  Mic, 
  Lightbulb, 
  ShieldCheck, 
  Lock, 
  X, 
  ArrowRight, 
  Video, 
  Eye, 
  Zap,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface UploadBestPracticesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartRecording: () => void;
}

export const UploadBestPracticesModal: React.FC<UploadBestPracticesModalProps> = ({
  isOpen,
  onClose,
  onStartRecording
}) => {
  const [checklist, setChecklist] = useState({
    lighting: false,
    mic: false,
    hook: false,
    privacy: false
  });

  if (!isOpen) return null;

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => {
      const next = { ...prev, [key]: !prev[key] };
      if (Object.values(next).every(Boolean)) {
        confetti({
          particleCount: 35,
          spread: 60,
          colors: ['#06b6d4', '#ec4899', '#a855f7'],
          origin: { y: 0.7 }
        });
      }
      return next;
    });
  };

  const handleLaunchRecorder = () => {
    onClose();
    onStartRecording();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-purple-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header with Cyberpunk gradient styling */}
        <div className="p-5 border-b border-purple-900/40 bg-zinc-900/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 p-0.5 text-black flex items-center justify-center shadow-lg shadow-pink-500/25">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-pink-400">
                <Lightbulb className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  First-Time Upload Guide
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-purple-500/20 border border-cyan-400/40 text-[10px] font-extrabold text-cyan-300">
                  BEST PRACTICES
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                How to capture high-engagement 10-second videos that get you more mutual matches
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Best Practice Cards */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* Card 1: Lighting & Framing */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-purple-900/30 flex gap-3.5 hover:border-cyan-400/40 transition">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 flex items-center justify-center flex-shrink-0">
              <Camera className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-black uppercase text-cyan-300 flex items-center gap-1.5">
                1. Eye-Level Framing & Front Lighting
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Hold your device vertically at eye level in <strong>9:16 portrait mode</strong>. Stand facing a window or warm light source. Avoid dark silhouettes or harsh overhead lights.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] text-zinc-400">
                <span className="text-emerald-400 font-bold">✓ Pro tip:</span>
                <span>Direct eye contact with the camera lens creates an instant romantic spark!</span>
              </div>
            </div>
          </div>

          {/* Card 2: 10-Second Hook & Direct Intent */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-purple-900/30 flex gap-3.5 hover:border-pink-500/40 transition">
            <div className="w-9 h-9 rounded-xl bg-pink-500/15 border border-pink-500/40 text-pink-400 flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-black uppercase text-pink-400 flex items-center gap-1.5">
                2. The 2-Second Hook & Dating Vibe
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                You have 10 seconds! Introduce yourself in the first 2 seconds, state your location, and specify what you're seeking (e.g., <em>"Grabbing cocktails in West Hollywood tonight"</em>, <em>"Looking for a Saturday morning gym partner"</em>).
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] text-zinc-400">
                <span className="text-pink-400 font-bold">✓ Pro tip:</span>
                <span>Guys with a specific invite get 4x more direct taps & private chat responses.</span>
              </div>
            </div>
          </div>

          {/* Card 3: Mic Audio & Sound Clarity */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-purple-900/30 flex gap-3.5 hover:border-purple-500/40 transition">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/40 text-purple-300 flex items-center justify-center flex-shrink-0">
              <Mic className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-black uppercase text-purple-300 flex items-center gap-1.5">
                3. Clear Voice & Catchy Soundtracks
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Ensure your device microphone isn't muffled by fingers. Speak clearly with natural confidence, or pair your clip with one of our trending pop/club tracks (Troye Sivan, Charli xcx, Fred again..).
              </p>
            </div>
          </div>

          {/* Card 4: Discretion & 35-Hour Private Vault */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/30 via-zinc-900 to-purple-950/30 border border-rose-500/40 flex gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-400 flex items-center justify-center flex-shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-black uppercase text-rose-300 flex items-center gap-1.5">
                4. Public Stream vs. 35-Hour Private Vault
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                <strong>Public Feed</strong> is seen by everyone on the radar—keep it social, handsome, and clothed. Never display credit cards, keys, or exact home addresses.
              </p>
              <div className="p-2.5 rounded-xl bg-black/50 border border-rose-500/30 text-[11px] text-zinc-300 space-y-0.5">
                <span className="font-bold text-rose-400 block">🔒 Private Vault Protection:</span>
                <span>Any private or intimate content belongs strictly in your encrypted Private Folder. Access granted to other members automatically relocks after 35 hours and is exempt from public stream moderation.</span>
              </div>
            </div>
          </div>

          {/* Card 5: Interactive Pre-Recording Checklist */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Pre-Flight Checklist (Tap to Confirm)
            </h4>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => toggleCheck('lighting')}
                className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition ${
                  checklist.lighting
                    ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <span>☀️ Good lighting and camera at eye level</span>
                <span className={checklist.lighting ? 'text-cyan-400 font-bold' : 'text-zinc-600'}>
                  {checklist.lighting ? '✓ Done' : '○'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('mic')}
                className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition ${
                  checklist.mic
                    ? 'bg-pink-500/15 border-pink-500 text-pink-200'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <span>🎙️ Microphone unblocked & quiet background</span>
                <span className={checklist.mic ? 'text-pink-400 font-bold' : 'text-zinc-600'}>
                  {checklist.mic ? '✓ Done' : '○'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('hook')}
                className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition ${
                  checklist.hook
                    ? 'bg-purple-500/15 border-purple-400 text-purple-200'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <span>⚡ 10-second hook & dating invitation in mind</span>
                <span className={checklist.hook ? 'text-purple-400 font-bold' : 'text-zinc-600'}>
                  {checklist.hook ? '✓ Done' : '○'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('privacy')}
                className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition ${
                  checklist.privacy
                    ? 'bg-emerald-500/15 border-emerald-400 text-emerald-200'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <span>🔒 Safe for public stream (no sensitive documents)</span>
                <span className={checklist.privacy ? 'text-emerald-400 font-bold' : 'text-zinc-600'}>
                  {checklist.privacy ? '✓ Done' : '○'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions with Direct Record Button */}
        <div className="p-4 border-t border-purple-900/40 bg-zinc-900/80 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-bold transition"
          >
            Review Later
          </button>

          <button
            onClick={handleLaunchRecorder}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 hover:from-cyan-300 hover:to-pink-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 active:scale-95 transition flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4 stroke-[2.5]" />
            <Mic className="w-4 h-4 stroke-[2.5]" />
            <span>Record Now (Camera & Mic) →</span>
          </button>
        </div>

      </div>
    </div>
  );
};
