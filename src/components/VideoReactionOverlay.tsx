import React, { useState, useRef, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Heart, 
  Flame, 
  X, 
  Move, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  MessageSquare, 
  Sparkles,
  Camera,
  CornerDownRight,
  UserCheck
} from 'lucide-react';
import { VideoReaction, User } from '../types';

interface VideoReactionOverlayProps {
  reactions: VideoReaction[];
  activeReactionIndex: number;
  onChangeReactionIndex: (index: number) => void;
  onOpenProfile: (user: User) => void;
  onStartChat: (user: User) => void;
  onRecordNewReaction: () => void;
  onLikeReaction?: (reactionId: string) => void;
  isMainVideoPlaying: boolean;
  onCloseOverlay: () => void;
}

export const VideoReactionOverlay: React.FC<VideoReactionOverlayProps> = ({
  reactions,
  activeReactionIndex,
  onChangeReactionIndex,
  onOpenProfile,
  onStartChat,
  onRecordNewReaction,
  onLikeReaction,
  isMainVideoPlaying,
  onCloseOverlay
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState<'top_right' | 'top_left' | 'bottom_left'>('top_right');
  const [isLikedLocally, setIsLikedLocally] = useState<Record<string, boolean>>({});

  const reactionVideoRef = useRef<HTMLVideoElement>(null);

  const activeReaction = reactions[activeReactionIndex] || reactions[0];

  // Sync play/pause with main video stream
  useEffect(() => {
    if (reactionVideoRef.current) {
      if (isMainVideoPlaying) {
        reactionVideoRef.current.play().catch(() => {});
      } else {
        reactionVideoRef.current.pause();
      }
    }
  }, [isMainVideoPlaying, activeReactionIndex]);

  if (!activeReaction) return null;

  const handleNextReaction = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (activeReactionIndex + 1) % reactions.length;
    onChangeReactionIndex(nextIdx);
  };

  const handlePrevReaction = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (activeReactionIndex - 1 + reactions.length) % reactions.length;
    onChangeReactionIndex(prevIdx);
  };

  const handleCyclePosition = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (position === 'top_right') setPosition('top_left');
    else if (position === 'top_left') setPosition('bottom_left');
    else setPosition('top_right');
  };

  const handleHeartReaction = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLikedLocally(prev => ({
      ...prev,
      [activeReaction.id]: !prev[activeReaction.id]
    }));
    if (onLikeReaction) {
      onLikeReaction(activeReaction.id);
    }
  };

  // Determine positioning classes
  const getPositionClasses = () => {
    if (position === 'top_left') {
      return 'top-16 left-3';
    }
    if (position === 'bottom_left') {
      return 'bottom-24 left-3';
    }
    // Default: top-right (offset below top bar)
    return 'top-16 right-3';
  };

  const isLiked = isLikedLocally[activeReaction.id] ?? activeReaction.isLiked ?? false;
  const currentLikes = (activeReaction.likesCount || 0) + (isLikedLocally[activeReaction.id] && !activeReaction.isLiked ? 1 : 0);

  return (
    <div
      className={`absolute z-35 transition-all duration-300 pointer-events-auto select-none ${getPositionClasses()}`}
      onClick={e => e.stopPropagation()}
    >
      <div
        className={`relative rounded-2xl overflow-hidden border-2 border-pink-500/80 shadow-[0_0_20px_rgba(236,72,153,0.45)] bg-black/90 backdrop-blur-md transition-all duration-300 ${
          isExpanded ? 'w-48 sm:w-56 aspect-[9/16]' : 'w-32 sm:w-36 aspect-[9/14]'
        }`}
      >
        {/* Glow Header Badge */}
        <div className="absolute top-0 inset-x-0 z-20 bg-gradient-to-b from-black/90 via-black/50 to-transparent p-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1 min-w-0">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[9px] font-black uppercase tracking-wider text-cyan-300 font-mono truncate">
              Reaction
            </span>
            {reactions.length > 1 && (
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-pink-500/30 text-pink-300 border border-pink-500/40">
                {activeReactionIndex + 1}/{reactions.length}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Reposition corner button */}
            <button
              onClick={handleCyclePosition}
              className="p-1 rounded-md bg-black/50 hover:bg-zinc-800 text-zinc-300 hover:text-white transition"
              title="Move reaction to another corner"
            >
              <Move className="w-3 h-3" />
            </button>

            {/* Expand / Minimize size toggle */}
            <button
              onClick={e => {
                e.stopPropagation();
                setIsExpanded(prev => !prev);
              }}
              className="p-1 rounded-md bg-black/50 hover:bg-zinc-800 text-zinc-300 hover:text-white transition"
              title={isExpanded ? 'Minimize overlay' : 'Expand overlay'}
            >
              {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </button>

            {/* Close / Hide Overlay */}
            <button
              onClick={e => {
                e.stopPropagation();
                onCloseOverlay();
              }}
              className="p-1 rounded-md bg-black/50 hover:bg-red-500/80 text-zinc-300 hover:text-white transition"
              title="Hide reaction overlay"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Reaction Video Element */}
        <div className="relative w-full h-full bg-zinc-950">
          <video
            ref={reactionVideoRef}
            src={activeReaction.videoUrl}
            poster={activeReaction.posterUrl}
            className="w-full h-full object-cover"
            playsInline
            loop
            muted={isMuted}
            autoPlay
          />

          {/* Sound Toggle Floating Pill */}
          <button
            onClick={e => {
              e.stopPropagation();
              setIsMuted(prev => !prev);
            }}
            className="absolute bottom-1.5 right-1.5 z-20 p-1.5 rounded-full bg-black/75 hover:bg-black text-white border border-pink-500/40 shadow-lg backdrop-blur-md transition"
            title={isMuted ? 'Unmute reaction audio' : 'Mute reaction audio'}
          >
            {isMuted ? <VolumeX className="w-3 h-3 text-zinc-400" /> : <Volume2 className="w-3 h-3 text-pink-400" />}
          </button>

          {/* Heart / Like reaction button */}
          <button
            onClick={handleHeartReaction}
            className="absolute bottom-1.5 left-1.5 z-20 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-black/75 hover:bg-black text-white border border-pink-500/40 shadow-lg backdrop-blur-md transition"
            title="Like this video reaction"
          >
            <Heart className={`w-3 h-3 ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-zinc-300'}`} />
            <span className="text-[9px] font-bold font-mono">{currentLikes}</span>
          </button>
        </div>

        {/* Bottom Reaction Creator Info & Caption Bar */}
        <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-1.5 space-y-1">
          {/* Reaction Mood Tag & User */}
          <div className="flex items-center justify-between gap-1">
            <div
              onClick={e => {
                e.stopPropagation();
                onOpenProfile(activeReaction.user);
              }}
              className="flex items-center gap-1 cursor-pointer group min-w-0"
            >
              <img
                src={activeReaction.user.avatar}
                alt={activeReaction.user.name}
                className="w-4 h-4 rounded-full object-cover border border-cyan-400"
              />
              <span className="text-[10px] font-black text-white group-hover:text-cyan-300 truncate">
                {activeReaction.user.name.split(' ')[0]}
              </span>
              {activeReaction.user.isVerifiedAge && (
                <ShieldCheck className="w-2.5 h-2.5 text-cyan-400 flex-shrink-0" />
              )}
            </div>

            {/* Reaction Emoji Icon Badge */}
            {activeReaction.reactionEmoji && (
              <span className="text-xs flex-shrink-0 animate-bounce">
                {activeReaction.reactionEmoji}
              </span>
            )}
          </div>

          {/* Reaction Caption */}
          {activeReaction.caption && (
            <p className="text-[9px] text-zinc-200 line-clamp-2 leading-tight bg-black/50 p-1 rounded-md border border-white/10 font-medium">
              "{activeReaction.caption}"
            </p>
          )}

          {/* Multi-reaction carousel arrows */}
          {reactions.length > 1 && (
            <div className="flex items-center justify-between pt-0.5 border-t border-white/10">
              <button
                onClick={handlePrevReaction}
                className="p-0.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                title="Previous reaction"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <span className="text-[8px] font-mono text-zinc-400">
                Tap to flip
              </span>

              <button
                onClick={handleNextReaction}
                className="p-0.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                title="Next reaction"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Action below PiP: Add your own video reaction */}
      <div className="mt-1 flex items-center justify-center">
        <button
          onClick={e => {
            e.stopPropagation();
            onRecordNewReaction();
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-cyan-400/90 to-pink-500/90 hover:from-cyan-300 hover:to-pink-400 text-black text-[9px] font-black shadow-md shadow-pink-500/30 hover:scale-105 active:scale-95 transition"
        >
          <Camera className="w-2.5 h-2.5 stroke-[2.5]" />
          <span>Add Reaction</span>
        </button>
      </div>
    </div>
  );
};
