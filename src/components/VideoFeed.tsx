import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Flame, 
  MessageCircle, 
  Share2, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  Tag, 
  ExternalLink,
  Send,
  Zap,
  Check,
  Gift,
  Lock,
  Flag,
  Smile,
  Heart,
  X,
  Camera,
  Mic,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VideoItem, User, SponsoredAdData, VideoReaction } from '../types';
import { ICEBREAKER_TAPS } from '../data/mockData';
import { VideoReactionOverlay } from './VideoReactionOverlay';

interface VideoFeedProps {
  videos: VideoItem[];
  currentUser: User;
  onLikeVideo: (videoId: string) => void;
  onOpenComments: (videoId: string) => void;
  onOpenProfile: (user: User) => void;
  onOpenAdModal: (ad: SponsoredAdData) => void;
  onOpenRewardedModal: () => void;
  onStartChat: (user: User) => void;
  onSendTapMessage: (user: User, message: string) => void;
  onShareVideo: (video: VideoItem) => void;
  onOpenGiftModal?: (user: User) => void;
  onOpenPrivateFolder?: (user: User) => void;
  onReportVideo?: (video: VideoItem) => void;
  onOpenCreate?: () => void;
  onOpenBestPractices?: () => void;
  onOpenVideoReactionModal?: (video: VideoItem) => void;
  onLikeReaction?: (videoId: string, reactionId: string) => void;
}

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number; // percentage from left
  y: number; // percentage from bottom
  size: number;
  rotation: number;
}

const QUICK_REACTION_EMOJIS = [
  { emoji: '🔥', label: 'Fire' },
  { emoji: '💖', label: 'Heart' },
  { emoji: '😈', label: 'Flirt' },
  { emoji: '🤤', label: 'Drool' },
  { emoji: '⚡', label: 'Electric' },
  { emoji: '👑', label: 'Crown' },
  { emoji: '🍸', label: 'Drink' },
  { emoji: '✨', label: 'Sparks' }
];

export const VideoFeed: React.FC<VideoFeedProps> = ({
  videos,
  currentUser,
  onLikeVideo,
  onOpenComments,
  onOpenProfile,
  onOpenAdModal,
  onOpenRewardedModal,
  onStartChat,
  onSendTapMessage,
  onShareVideo,
  onOpenGiftModal,
  onOpenPrivateFolder,
  onReportVideo,
  onOpenCreate,
  onOpenBestPractices,
  onOpenVideoReactionModal,
  onLikeReaction
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showTapMenu, setShowTapMenu] = useState(false);
  const [tapSuccessMessage, setTapSuccessMessage] = useState<string | null>(null);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [showReactionsBar, setShowReactionsBar] = useState(true);
  const [activeHashtagFilter, setActiveHashtagFilter] = useState<string | null>(null);

  // Video reaction overlay management
  const [activeReactionIndexMap, setActiveReactionIndexMap] = useState<Record<string, number>>({});
  const [hiddenReactionOverlays, setHiddenReactionOverlays] = useState<Record<string, boolean>>({});

  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartY = useRef<number>(0);

  // Filter video feed by hashtag / topic if active
  const displayVideos = activeHashtagFilter
    ? videos.filter(v => {
        const matchesHashtag = (v.hashtags || []).some(
          h => h.toLowerCase() === activeHashtagFilter.toLowerCase()
        );
        const matchesTag = (v.tags || []).some(
          t => t.toLowerCase() === activeHashtagFilter.toLowerCase()
        );
        return matchesHashtag || matchesTag;
      })
    : videos;

  const effectiveVideos = displayVideos.length > 0 ? displayVideos : videos;
  const currentVideo = effectiveVideos[currentIndex] || effectiveVideos[0] || videos[0];

  // Adjust index if displayVideos shrinks
  useEffect(() => {
    if (currentIndex >= effectiveVideos.length) {
      setCurrentIndex(0);
    }
  }, [effectiveVideos.length, currentIndex]);

  const handleToggleHashtagFilter = (tag: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeHashtagFilter?.toLowerCase() === tag.toLowerCase()) {
      setActiveHashtagFilter(null);
    } else {
      setActiveHashtagFilter(tag);
      setCurrentIndex(0);
      confetti({
        particleCount: 22,
        spread: 50,
        colors: ['#06b6d4', '#ec4899', '#a855f7'],
        origin: { y: 0.8 }
      });
    }
  };

  // Auto loop/advance and progress tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setProgress(0);
    video.currentTime = 0;
    
    // Play attempt
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }

    const handleTimeUpdate = () => {
      if (video.duration) {
        // Enforce 10-second cap
        const maxDuration = Math.min(video.duration, 10);
        const current = video.currentTime;
        setProgress((current / maxDuration) * 100);

        if (current >= maxDuration) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentIndex, currentVideo]);

  const goToNextVideo = useCallback(() => {
    if (currentIndex < effectiveVideos.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowTapMenu(false);
    }
  }, [currentIndex, effectiveVideos.length]);

  const goToPrevVideo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowTapMenu(false);
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        goToNextVideo();
      } else if (e.key === 'ArrowUp') {
        goToPrevVideo();
      } else if (e.key === 'm' || e.key === 'M') {
        setIsMuted(prev => !prev);
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextVideo, goToPrevVideo]);

  // Touch swipe support & wheel navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    if (diff > 30) {
      goToNextVideo();
    } else if (diff < -30) {
      goToPrevVideo();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 25) {
      if (e.deltaY > 0) {
        goToNextVideo();
      } else {
        goToPrevVideo();
      }
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Trigger floating emoji reaction
  const triggerEmojiReaction = (emoji: string, originX?: number, originY?: number) => {
    const id = Date.now() + Math.random();
    const x = originX !== undefined ? originX : 40 + Math.random() * 45; // random spread near right/center
    const y = originY !== undefined ? originY : 20 + Math.random() * 15;
    const size = 32 + Math.floor(Math.random() * 24);
    const rotation = (Math.random() - 0.5) * 36;

    setFloatingEmojis(prev => [...prev.slice(-15), { id, emoji, x, y, size, rotation }]);

    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== id));
    }, 2400);

    // Cyan, Hot Pink, and Purple celebratory sparkles
    confetti({
      particleCount: 16,
      spread: 55,
      colors: ['#06b6d4', '#ec4899', '#a855f7'],
      origin: { x: (x / 100), y: 0.7 }
    });

    if (!currentVideo.isLiked) {
      onLikeVideo(currentVideo.id);
    }
  };

  const handleDoubleTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((rect.bottom - e.clientY) / rect.height) * 100;

    // Trigger burst of hot pink hearts, cyan sparks, and purple flames
    const randomPick = ['💖', '🔥', '⚡', '😈'][Math.floor(Math.random() * 4)];
    triggerEmojiReaction(randomPick, xPct, yPct);
    triggerEmojiReaction('💖', xPct + (Math.random() * 10 - 5), yPct + 5);
  };

  const handleQuickTapSend = (prompt: string) => {
    onSendTapMessage(currentVideo.user, prompt);
    setTapSuccessMessage(`Sent: "${prompt}"`);
    setShowTapMenu(false);
    setTimeout(() => setTapSuccessMessage(null), 2500);

    confetti({
      particleCount: 30,
      spread: 55,
      colors: ['#06b6d4', '#ec4899', '#a855f7']
    });
  };

  return (
    <div
      className="relative w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-4.5rem)] flex items-center justify-center bg-black overflow-hidden select-none touch-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Central Mobile-Proportioned Video Container */}
      <div className="relative w-full h-full max-w-[460px] bg-zinc-950 md:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border-x md:border border-purple-900/40">
        
        {/* 10-Second Progress Indicator at top (Story / Reel style) with Cyan-HotPink-Purple Gradient */}
        <div className="absolute top-2 inset-x-3 z-30 flex items-center gap-1.5">
          <div className="h-1.5 flex-1 bg-white/20 backdrop-blur-md rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 shadow-[0_0_12px_rgba(236,72,153,0.8)] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-mono font-black text-cyan-300 bg-purple-950/80 px-2 py-0.5 rounded-full border border-pink-500/40 shadow-sm shadow-pink-500/20">
            10s
          </span>
        </div>

        {/* Top Floating Controls Bar */}
        <div className="absolute top-7 inset-x-4 z-30 flex items-center justify-between gap-2">
          {/* Radar Proximity Pill (Cyan & Hot Pink glow) */}
          <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/30 text-xs text-white shadow-lg shrink min-w-0">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 animate-pulse flex-shrink-0" />
            <span className="font-bold text-pink-300 truncate">
              {currentVideo.isSponsoredAd ? 'Sponsored' : `${currentVideo.user.distanceMiles} mi away`}
            </span>
            <span className="text-zinc-500 hidden sm:inline">•</span>
            <span className="text-zinc-300 truncate max-w-[100px] hidden sm:inline">
              {currentVideo.user.locationName}
            </span>
          </div>

          {/* Active Hashtag Filter indicator if filtered */}
          {activeHashtagFilter && (
            <div className="flex items-center gap-1.5 bg-purple-950/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-pink-500/60 shadow-[0_0_12px_rgba(236,72,153,0.4)] text-xs text-white animate-in fade-in duration-150">
              <Tag className="w-3 h-3 text-cyan-400" />
              <span className="text-[11px] text-zinc-300">Topic:</span>
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-pink-400 to-purple-300">
                #{activeHashtagFilter}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">({effectiveVideos.length})</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHashtagFilter(null);
                }}
                className="p-0.5 rounded-full hover:bg-white/20 text-pink-300 hover:text-white transition ml-0.5"
                title="Clear topic filter"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Top Right: Record Now, Best Practices, Boost & Sound */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Record Now Button (Direct Camera & Mic) */}
            {onOpenCreate && (
              <button
                onClick={onOpenCreate}
                className="flex items-center gap-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 hover:from-cyan-300 hover:to-pink-400 text-black px-2.5 py-1.5 rounded-full text-xs font-black shadow-lg shadow-pink-500/25 active:scale-95 transition"
                title="Record 10s Video Now (Camera & Mic)"
              >
                <Camera className="w-3.5 h-3.5 stroke-[2.5]" />
                <Mic className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden xs:inline">Record Now</span>
              </button>
            )}

            {/* First-Time Uploading Best Practices Guide */}
            {onOpenBestPractices && (
              <button
                onClick={onOpenBestPractices}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-purple-500/40 text-pink-300 hover:text-white flex items-center justify-center transition shadow-md"
                title="First-Time Uploading Best Practices"
              >
                <Lightbulb className="w-4 h-4 text-cyan-400" />
              </button>
            )}

            {/* Rewarded Ad station shortcut (Cyan / Purple gradient) */}
            <button
              onClick={onOpenRewardedModal}
              className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-pink-500/30 text-cyan-300 border border-cyan-400/40 px-2 py-1.5 rounded-full text-xs font-bold transition shadow-lg"
              title="Watch 10s ad to get 3x Radar Boosts"
            >
              <Zap className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
              <span>Boost</span>
            </button>

            {/* Mute Toggle */}
            <button
              onClick={() => setIsMuted(prev => !prev)}
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-purple-500/30 text-white flex items-center justify-center hover:bg-black/80 transition"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-pink-400" />}
            </button>
          </div>
        </div>

        {/* Video Player Display */}
        <div
          className="relative w-full h-full flex items-center justify-center bg-zinc-950 cursor-pointer"
          onClick={togglePlayPause}
          onDoubleClick={handleDoubleTap}
        >
          <video
            ref={videoRef}
            src={currentVideo.videoUrl}
            poster={currentVideo.posterUrl}
            className="w-full h-full object-cover"
            playsInline
            loop
            muted={isMuted}
          />

          {/* Pause Overlay indicator */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/35 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-black/75 backdrop-blur-md border border-pink-500/40 flex items-center justify-center text-white shadow-xl shadow-pink-500/20">
                <Play className="w-8 h-8 fill-pink-400 text-pink-400 ml-1" />
              </div>
            </div>
          )}

          {/* FLOATING OVERLAY REACTIONS (TikTok / Instagram Live Style) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
            {floatingEmojis.map(f => (
              <div
                key={f.id}
                className="absolute animate-float-up filter drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]"
                style={{
                  left: `${f.x}%`,
                  bottom: `${f.y}%`,
                  fontSize: `${f.size}px`,
                  transform: `rotate(${f.rotation}deg)`
                }}
              >
                {f.emoji}
              </div>
            ))}
          </div>

          {/* Tap sent banner toast */}
          {tapSuccessMessage && (
            <div className="absolute top-20 inset-x-6 z-40 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 animate-bounce">
              <Check className="w-4 h-4 stroke-[3]" />
              {tapSuccessMessage}
            </div>
          )}

          {/* VIDEO REACTION PICTURE-IN-PICTURE OVERLAY */}
          {!currentVideo.isSponsoredAd && currentVideo.reactions && currentVideo.reactions.length > 0 && !hiddenReactionOverlays[currentVideo.id] && (
            <VideoReactionOverlay
              reactions={currentVideo.reactions}
              activeReactionIndex={activeReactionIndexMap[currentVideo.id] || 0}
              onChangeReactionIndex={newIdx => setActiveReactionIndexMap(prev => ({ ...prev, [currentVideo.id]: newIdx }))}
              onOpenProfile={onOpenProfile}
              onStartChat={onStartChat}
              onRecordNewReaction={() => onOpenVideoReactionModal?.(currentVideo)}
              onLikeReaction={rId => onLikeReaction?.(currentVideo.id, rId)}
              isMainVideoPlaying={isPlaying}
              onCloseOverlay={() => setHiddenReactionOverlays(prev => ({ ...prev, [currentVideo.id]: true }))}
            />
          )}

          {/* Floating Pill when reaction overlay was closed by user */}
          {!currentVideo.isSponsoredAd && currentVideo.reactions && currentVideo.reactions.length > 0 && hiddenReactionOverlays[currentVideo.id] && (
            <div className="absolute top-16 right-3 z-30 pointer-events-auto">
              <button
                onClick={e => {
                  e.stopPropagation();
                  setHiddenReactionOverlays(prev => ({ ...prev, [currentVideo.id]: false }));
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 hover:bg-black text-cyan-300 border border-cyan-400/50 shadow-xl text-xs font-bold backdrop-blur-md transition hover:scale-105 active:scale-95"
                title="Show Video Reactions Overlay"
              >
                <Camera className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                <span>Reactions ({currentVideo.reactions.length})</span>
              </button>
            </div>
          )}
        </div>

        {/* FLOATING QUICK REACTION EMOJI PICKER BAR (OVERLAY ON VIDEO) */}
        {!currentVideo.isSponsoredAd && showReactionsBar && (
          <div className="absolute bottom-20 left-4 z-30 flex items-center gap-1.5 p-1.5 rounded-full bg-black/65 backdrop-blur-lg border border-pink-500/40 shadow-2xl shadow-purple-950/60 max-w-[270px] overflow-x-auto scrollbar-none animate-in fade-in duration-200">
            {QUICK_REACTION_EMOJIS.map(item => (
              <button
                key={item.emoji}
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  triggerEmojiReaction(item.emoji);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-base hover:scale-130 active:scale-95 hover:bg-white/10 transition-transform duration-150 flex-shrink-0"
                title={`Send ${item.label}`}
              >
                {item.emoji}
              </button>
            ))}
          </div>
        )}

        {/* Right Interaction Action Rail (TikTok / Grindr hybrid with Cyan, Hot Pink & Purple accents) */}
        <div className="absolute right-3 bottom-24 z-30 flex flex-col items-center gap-3">
          {/* Record 10s Clip Quick Action with Camera & Mic */}
          {onOpenCreate && (
            <button
              onClick={onOpenCreate}
              className="flex flex-col items-center group"
              title="Record 10-Second Vibe (Live Camera & Mic)"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 p-0.5 shadow-lg shadow-pink-500/30 group-hover:scale-110 active:scale-95 transition">
                <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center text-pink-400">
                  <Camera className="w-5 h-5 fill-pink-500/20" />
                </div>
              </div>
              <span className="text-[10px] font-black text-cyan-300 mt-0.5 drop-shadow-md">
                Record
              </span>
            </button>
          )}

          {/* User Profile Avatar with Cyan-Pink-Purple Ring */}
          <div className="relative group">
            <button
              onClick={() => onOpenProfile(currentVideo.user)}
              className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 shadow-xl shadow-pink-500/20 hover:scale-105 active:scale-95 transition"
            >
              <img
                src={currentVideo.user.avatar}
                alt={currentVideo.user.name}
                className="w-full h-full rounded-full object-cover"
              />
            </button>
            {currentVideo.user.isVerifiedAge && (
              <div
                className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-cyan-400 to-pink-500 text-black rounded-full p-0.5 shadow-md"
                title="Verified 18+ Adult"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          {/* Flame / Like Button (Hot Pink Accent) */}
          <button
            onClick={() => {
              onLikeVideo(currentVideo.id);
              triggerEmojiReaction('🔥');
            }}
            className="flex flex-col items-center group"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                currentVideo.isLiked
                  ? 'bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-[0_0_18px_rgba(236,72,153,0.8)] scale-110'
                  : 'bg-black/60 backdrop-blur-md border border-pink-500/30 text-pink-400 hover:bg-black/80'
              }`}
            >
              <Flame
                className={`w-6 h-6 transition-transform group-hover:scale-110 ${
                  currentVideo.isLiked ? 'fill-white text-white' : 'text-pink-400'
                }`}
              />
            </div>
            <span className="text-[11px] font-bold text-white mt-1 drop-shadow-md">
              {currentVideo.likesCount}
            </span>
          </button>

          {/* Video Reaction Button (Camera & PiP Overlay trigger) */}
          {!currentVideo.isSponsoredAd && onOpenVideoReactionModal && (
            <div className="relative flex flex-col items-center">
              <button
                onClick={() => {
                  if (currentVideo.reactions && currentVideo.reactions.length > 0 && hiddenReactionOverlays[currentVideo.id]) {
                    setHiddenReactionOverlays(prev => ({ ...prev, [currentVideo.id]: false }));
                  } else {
                    onOpenVideoReactionModal(currentVideo);
                  }
                }}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  currentVideo.reactions && currentVideo.reactions.length > 0 && !hiddenReactionOverlays[currentVideo.id]
                    ? 'bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 text-black shadow-[0_0_16px_rgba(6,182,212,0.8)] scale-105 active:scale-95'
                    : 'bg-black/60 backdrop-blur-md border border-cyan-400/40 text-cyan-300 hover:bg-black/80 hover:text-white'
                }`}
                title="Record or View Video Reaction Overlay"
              >
                <Camera className="w-5 h-5 fill-current" />
              </button>
              <span className="text-[11px] font-bold text-white mt-1 drop-shadow-md flex items-center gap-0.5">
                <span>React</span>
                {(currentVideo.reactionsCount || currentVideo.reactions?.length || 0) > 0 && (
                  <span className="text-[9px] font-mono text-cyan-300 font-extrabold">
                    ({currentVideo.reactionsCount || currentVideo.reactions?.length})
                  </span>
                )}
              </span>
            </div>
          )}

          {/* Woo / Tap Quick-Action (Purple Accent) */}
          {!currentVideo.isSponsoredAd && (
            <div className="relative flex flex-col items-center">
              <button
                onClick={() => setShowTapMenu(prev => !prev)}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  showTapMenu
                    ? 'bg-purple-500 text-white shadow-[0_0_18px_rgba(168,85,247,0.8)]'
                    : 'bg-black/60 backdrop-blur-md border border-purple-500/30 text-purple-300 hover:bg-black/80'
                }`}
                title="Send Quick Tap / Icebreaker"
              >
                <Sparkles className="w-5 h-5" />
              </button>
              <span className="text-[11px] font-bold text-white mt-1 drop-shadow-md">
                Tap
              </span>

              {/* Quick Icebreaker Popup Menu */}
              {showTapMenu && (
                <div className="absolute right-14 bottom-0 w-60 bg-zinc-950/95 border border-purple-500/40 rounded-2xl p-2.5 shadow-2xl backdrop-blur-md z-50 space-y-1.5 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-1 border-b border-zinc-800 px-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">
                      Send Instant Tap to {currentVideo.user.name.split(' ')[0]}
                    </span>
                  </div>
                  {ICEBREAKER_TAPS.map(t => (
                    <button
                      key={t.text}
                      onClick={() => handleQuickTapSend(t.prompt)}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-purple-950/50 text-xs text-zinc-200 flex items-center gap-2 transition"
                    >
                      <span className="text-base">{t.emoji}</span>
                      <span className="font-semibold truncate">{t.text}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      onStartChat(currentVideo.user);
                      setShowTapMenu(false);
                    }}
                    className="w-full mt-1 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-purple-500/20 text-cyan-300 hover:from-cyan-500/30 hover:to-pink-500/30 font-bold text-[11px] text-center border border-cyan-400/40 transition"
                  >
                    Custom Direct Chat 💬
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Virtual Gift Button (Cyan Accent) */}
          {!currentVideo.isSponsoredAd && onOpenGiftModal && (
            <button
              onClick={() => onOpenGiftModal(currentVideo.user)}
              className="flex flex-col items-center group"
              title="Send Virtual Luxury Gift"
            >
              <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-cyan-400/40 text-cyan-300 flex items-center justify-center hover:bg-cyan-400 hover:text-black transition shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                <Gift className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[11px] font-bold text-white mt-1 drop-shadow-md">
                Gift
              </span>
            </button>
          )}

          {/* Private Vault Button (Hot Pink Accent) */}
          {!currentVideo.isSponsoredAd && onOpenPrivateFolder && (
            <button
              onClick={() => onOpenPrivateFolder(currentVideo.user)}
              className="flex flex-col items-center group"
              title="View Private Vault (35h lock)"
            >
              <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-pink-500/40 text-pink-400 flex items-center justify-center hover:bg-pink-500 hover:text-white transition shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[11px] font-bold text-white mt-1 drop-shadow-md">
                Vault
              </span>
            </button>
          )}

          {/* Comments Button (Purple Accent) */}
          <button
            onClick={() => onOpenComments(currentVideo.id)}
            className="flex flex-col items-center group"
          >
            <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-purple-500/30 text-purple-200 flex items-center justify-center hover:bg-black/80 transition">
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[11px] font-bold text-white mt-1 drop-shadow-md">
              {currentVideo.commentsCount}
            </span>
          </button>

          {/* Share Profile / Video */}
          <button
            onClick={() => onShareVideo(currentVideo)}
            className="flex flex-col items-center group"
          >
            <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-black/80 transition">
              <Share2 className="w-5 h-5 text-zinc-200 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[11px] font-bold text-white mt-1 drop-shadow-md">
              Share
            </span>
          </button>

          {/* Report Button */}
          {!currentVideo.isSponsoredAd && onReportVideo && (
            <button
              onClick={() => onReportVideo(currentVideo)}
              className="flex flex-col items-center text-zinc-500 hover:text-pink-400 transition"
              title="Report Violation"
            >
              <div className="w-9 h-9 rounded-full bg-black/40 border border-white/10 flex items-center justify-center">
                <Flag className="w-3.5 h-3.5" />
              </div>
            </button>
          )}
        </div>

        {/* Bottom Metadata & Profile Overlay */}
        <div className="absolute bottom-4 inset-x-4 z-20 space-y-2 pointer-events-auto pr-16">
          {/* Sponsored Ad Banner Overlay (if ad) */}
          {currentVideo.isSponsoredAd && currentVideo.adData && (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-900/90 via-pink-900/90 to-cyan-950/90 backdrop-blur-md border border-pink-500/30 shadow-xl flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-black uppercase text-cyan-300">
                    SPONSORED
                  </span>
                  <span className="text-xs font-bold text-white truncate">
                    {currentVideo.adData.brandName}
                  </span>
                </div>
                <p className="text-[11px] text-pink-200 truncate mt-0.5">
                  {currentVideo.adData.headline}
                </p>
              </div>
              <button
                onClick={() => onOpenAdModal(currentVideo.adData!)}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-xs whitespace-nowrap shadow transition"
              >
                {currentVideo.adData.ctaText.split(' ')[0]} Deal →
              </button>
            </div>
          )}

          {/* User Name, Age & Tribe Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onOpenProfile(currentVideo.user)}
              className="text-base font-black text-white hover:text-pink-400 transition flex items-center gap-1.5 drop-shadow-md"
            >
              <span>{currentVideo.user.name}</span>
              <span className="text-pink-400 font-extrabold">{currentVideo.user.age}</span>
            </button>

            {currentVideo.user.isVerifiedAge && (
              <div
                className="flex items-center gap-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 text-cyan-300 px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md"
                title="Cryptographically 18+ Age Verified"
              >
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                <span>18+ VERIFIED</span>
              </div>
            )}

            <span className="px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-200 text-[10px] font-semibold backdrop-blur-md">
              {currentVideo.user.tribe}
            </span>
          </div>

          {/* Clickable Hashtags Chips below video title (Tap tag to filter stream by specific topic) */}
          {((currentVideo.hashtags && currentVideo.hashtags.length > 0) ? currentVideo.hashtags : currentVideo.tags || []).length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              {((currentVideo.hashtags && currentVideo.hashtags.length > 0) ? currentVideo.hashtags : currentVideo.tags || []).map((tag, idx) => {
                const isSelected = activeHashtagFilter?.toLowerCase() === tag.toLowerCase();
                return (
                  <button
                    key={`${tag}-${idx}`}
                    type="button"
                    onClick={(e) => handleToggleHashtagFilter(tag, e)}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all duration-150 flex items-center gap-1 shadow-md active:scale-95 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black shadow-[0_0_12px_rgba(236,72,153,0.7)] font-black ring-1 ring-white/60'
                        : 'bg-black/65 hover:bg-zinc-900 backdrop-blur-md border border-purple-500/40 hover:border-pink-500 text-cyan-300 hover:text-pink-300'
                    }`}
                    title={isSelected ? `Clear filter #${tag}` : `Filter stream by #${tag}`}
                  >
                    <span className={isSelected ? 'text-black font-extrabold' : 'text-pink-400 font-extrabold'}>#</span>
                    <span>{tag}</span>
                    {isSelected && <X className="w-3 h-3 text-black stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Caption */}
          <p className="text-xs text-white/95 leading-snug drop-shadow line-clamp-2">
            {currentVideo.caption}
          </p>

          {/* Music track ticker with spinning disk */}
          <div className="flex items-center gap-2 pt-1 text-xs text-white/80">
            <div className="w-4 h-4 rounded-full bg-purple-950 border border-pink-500 flex items-center justify-center animate-spin">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
            <span className="truncate text-[11px] font-medium tracking-tight">
              {currentVideo.musicTitle}
            </span>
          </div>
        </div>

        {/* Up / Down navigation buttons on Desktop (Cyan & Hot Pink accents) */}
        <div className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 flex-col gap-3">
          <button
            disabled={currentIndex === 0}
            onClick={goToPrevVideo}
            className={`w-10 h-10 rounded-full bg-zinc-900 border border-purple-900/40 text-white flex items-center justify-center transition shadow-lg ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-zinc-800 hover:border-cyan-400 hover:text-cyan-300'
            }`}
            title="Previous Video (Arrow Up)"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            disabled={currentIndex === effectiveVideos.length - 1}
            onClick={goToNextVideo}
            className={`w-10 h-10 rounded-full bg-zinc-900 border border-purple-900/40 text-white flex items-center justify-center transition shadow-lg ${
              currentIndex === effectiveVideos.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-zinc-800 hover:border-pink-500 hover:text-pink-300'
            }`}
            title="Next Video (Arrow Down)"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
