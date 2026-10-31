import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Zap, CheckCircle2, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RewardedAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardEarned: (rewardName: string) => void;
}

export const RewardedAdModal: React.FC<RewardedAdModalProps> = ({
  isOpen,
  onClose,
  onRewardEarned
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [completed, setCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let timer: number;
    if (isPlaying && secondsRemaining > 0) {
      timer = window.setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setCompleted(true);
            setIsPlaying(false);
            onRewardEarned('3x Radar Boosts & Unlimited Super Flames');
            confetti({ particleCount: 60, spread: 60 });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, secondsRemaining, onRewardEarned]);

  const handleStartWatch = () => {
    setIsPlaying(true);
    setSecondsRemaining(10);
    setCompleted(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Rewarded Ad Boost</h3>
              <p className="text-[10px] text-zinc-400">Ad-Supported Free Rewards</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player or Start Screen */}
        <div className="relative aspect-[9/12] w-full bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src="https://assets.mixkit.co/videos/preview/mixkit-bartender-serving-a-drink-41137-large.mp4"
            className="w-full h-full object-cover"
            playsInline
            muted={false}
          />

          {!isPlaying && !completed && (
            <div className="absolute inset-0 bg-black/75 p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400">
                <Award className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">Watch a 10s Sponsor Clip</h4>
                <p className="text-xs text-zinc-300">
                  Earn <span className="text-amber-400 font-bold">3 Free Radar Boosts</span> & reach 5x more guys nearby!
                </p>
              </div>
              <button
                onClick={handleStartWatch}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition"
              >
                <Play className="w-4 h-4 fill-black" />
                Watch 10s Sponsor Clip
              </button>
            </div>
          )}

          {isPlaying && (
            <>
              {/* Countdown Bar */}
              <div className="absolute top-3 inset-x-3 h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/20">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000"
                  style={{ width: `${((10 - secondsRemaining) / 10) * 100}%` }}
                />
              </div>

              {/* Countdown Pill */}
              <div className="absolute top-6 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono font-bold text-amber-400 border border-amber-500/40">
                Ad • {secondsRemaining}s remaining
              </div>

              {/* Sponsor Watermark */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">Sponsored</span>
                  <span className="text-xs font-bold text-white">Velvet Sky Rooftop</span>
                </div>
                <span className="text-[11px] text-zinc-400">Reward after clip</span>
              </div>
            </>
          )}

          {completed && (
            <div className="absolute inset-0 bg-black/85 p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Reward Unlocked!</h4>
                <p className="text-xs text-zinc-300 mt-1">
                  You earned <span className="text-emerald-400 font-bold">3x Radar Boosts</span> for supporting Pulse with ads.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition"
              >
                Claim & Return
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
