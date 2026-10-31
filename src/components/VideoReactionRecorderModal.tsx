import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Video, 
  Mic, 
  MicOff, 
  RefreshCw, 
  X, 
  Play, 
  Pause, 
  Check, 
  Sparkles, 
  Flame, 
  Volume2, 
  VolumeX, 
  SwitchCamera, 
  Upload, 
  Smile, 
  ArrowRight,
  ShieldCheck,
  Radio,
  Layers,
  Move
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VideoItem, User, VideoReaction } from '../types';

interface VideoReactionRecorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetVideo: VideoItem | null;
  currentUser: User;
  onPublishReaction: (videoId: string, reaction: VideoReaction) => void;
}

const REACTION_PRESET_CLIPS = [
  {
    id: 'react_clip_1',
    title: 'Smiling Wave & Wink',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-walking-down-a-city-street-41132-large.mp4',
    poster: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80',
    defaultEmoji: '🔥',
    defaultCaption: 'That energy is infectious 🔥 Say hi when you are in WeHo!'
  },
  {
    id: 'react_clip_2',
    title: 'Music Headphone Vibe',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-enjoying-music-wearing-headphones-41131-large.mp4',
    poster: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    defaultEmoji: '⚡',
    defaultCaption: 'Love this track choice! Adding to my playlist right now 🎧'
  },
  {
    id: 'react_clip_3',
    title: 'Sunset Beach Cheers',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-standing-on-a-beach-at-sunset-41133-large.mp4',
    poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    defaultEmoji: '🍸',
    defaultCaption: 'Sunset drinks in Venice or WeHo? First round is on me 🍸'
  },
  {
    id: 'react_clip_4',
    title: 'Post-Workout Nod',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-out-at-the-gym-40502-large.mp4',
    poster: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80',
    defaultEmoji: '💪',
    defaultCaption: 'Need a gym spotter tomorrow? Hit me up, let’s get it! 💪'
  }
];

const REACTION_EMOJIS = [
  { emoji: '🔥', label: 'Fire' },
  { emoji: '🍸', label: 'Drinks' },
  { emoji: '😍', label: 'Obsessed' },
  { emoji: '⚡', label: 'Electric' },
  { emoji: '😈', label: 'Flirty' },
  { emoji: '👑', label: 'King' },
  { emoji: '💪', label: 'Workout' },
  { emoji: '😂', label: 'Laugh' }
];

const QUICK_CAPTION_PROMPTS = [
  "Spot me tomorrow at the gym! 💪",
  "Down for WeHo drinks tonight? 🍸",
  "That smile is dangerous 🔥",
  "Let's link up this weekend!",
  "Best 10s video on my feed today ✨"
];

export const VideoReactionRecorderModal: React.FC<VideoReactionRecorderModalProps> = ({
  isOpen,
  onClose,
  targetVideo,
  currentUser,
  onPublishReaction
}) => {
  const [recordMode, setRecordMode] = useState<'camera' | 'preset' | 'upload'>('camera');
  const [selectedPreset, setSelectedPreset] = useState(REACTION_PRESET_CLIPS[0]);
  const [selectedEmoji, setSelectedEmoji] = useState('🔥');
  const [caption, setCaption] = useState("Down for WeHo drinks tonight? Let's link up 🍸");
  const [overlayPosition, setOverlayPosition] = useState<'top_right' | 'top_left' | 'bottom_right' | 'bottom_left'>('top_right');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  
  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [audioMeter, setAudioMeter] = useState(40);
  const [showOriginalPip, setShowOriginalPip] = useState(true);

  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const recordedVideoReviewRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);

  // Initialize camera stream when entering camera mode
  useEffect(() => {
    if (!isOpen || recordMode !== 'camera' || recordedVideoUrl) return;

    let isMounted = true;

    async function initCamera() {
      try {
        setCameraError(null);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(t => t.stop());
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode, width: { ideal: 720 }, height: { ideal: 1280 } },
          audio: true
        });

        if (!isMounted) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        streamRef.current = stream;
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = stream;
          videoPreviewRef.current.play().catch(() => {});
        }
      } catch (err: any) {
        if (!isMounted) return;
        console.warn('Camera access error:', err);
        setCameraError('Camera access not granted or unavailable. You can use our high-res reaction presets below.');
        setRecordMode('preset');
      }
    }

    initCamera();

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
    };
  }, [isOpen, recordMode, facingMode, recordedVideoUrl]);

  // Clean up timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!isOpen || !targetVideo) return null;

  const startRecording = () => {
    if (!streamRef.current) {
      alert('Camera stream not ready. Please use presets or grant camera access.');
      return;
    }

    recordedChunksRef.current = [];
    try {
      const recorder = new MediaRecorder(streamRef.current, { mimeType: 'video/webm' });
      recorder.ondataavailable = e => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = window.setInterval(() => {
        setRecordingSeconds(prev => {
          if (prev >= 9) {
            stopRecording();
            return 10;
          }
          return prev + 1;
        });
      }, 1000);
    } catch {
      // Fallback
      alert('MediaRecorder unavailable on this browser. Switching to instant presets.');
      setRecordMode('preset');
    }
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleRetake = () => {
    setRecordedVideoUrl(null);
    setRecordingSeconds(0);
    recordedChunksRef.current = [];
  };

  const handlePublish = () => {
    setIsPublishing(true);

    const videoUrlToUse = 
      recordMode === 'camera' && recordedVideoUrl
        ? recordedVideoUrl
        : recordMode === 'preset'
        ? selectedPreset.url
        : selectedPreset.url;

    const posterUrlToUse =
      recordMode === 'preset'
        ? selectedPreset.poster
        : currentUser.avatar;

    setTimeout(() => {
      const newReaction: VideoReaction = {
        id: `react_${Date.now()}`,
        videoId: targetVideo.id,
        userId: currentUser.id,
        user: currentUser,
        videoUrl: videoUrlToUse,
        posterUrl: posterUrlToUse,
        durationSec: recordingSeconds > 0 ? recordingSeconds : 8,
        caption: caption.trim() || undefined,
        reactionEmoji: selectedEmoji,
        position: overlayPosition,
        createdAt: 'Just now',
        likesCount: 1,
        isLiked: true
      };

      onPublishReaction(targetVideo.id, newReaction);
      setIsPublishing(false);
      onClose();

      confetti({
        particleCount: 70,
        spread: 65,
        colors: ['#06b6d4', '#ec4899', '#a855f7']
      });
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-purple-900/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Studio Header */}
        <div className="p-4 border-b border-purple-900/30 bg-zinc-900/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 p-0.5 shadow-lg shadow-pink-500/20">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-pink-400">
                <Camera className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                  10s Video Reaction Studio
                </h3>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Live Overlay Mode
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                React to <strong className="text-white font-bold">{targetVideo.user.name}</strong> • Displays as PiP on their 10s video stream
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Video Preview Banner */}
        <div className="px-5 py-2.5 bg-zinc-900/60 border-b border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={targetVideo.user.avatar}
              alt={targetVideo.user.name}
              className="w-7 h-7 rounded-full object-cover border border-pink-500/50"
            />
            <div className="truncate">
              <span className="font-bold text-white mr-1.5">{targetVideo.user.name}</span>
              <span className="text-zinc-400 truncate">"{targetVideo.caption}"</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-pink-400 px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20 flex-shrink-0">
            Original Video
          </span>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-zinc-200">
          
          {/* Mode Switcher: Camera / Presets */}
          <div className="grid grid-cols-2 bg-zinc-900/90 p-1 rounded-2xl border border-zinc-800">
            <button
              onClick={() => {
                setRecordMode('camera');
                setRecordedVideoUrl(null);
              }}
              className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                recordMode === 'camera'
                  ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Live Camera & Mic</span>
            </button>

            <button
              onClick={() => {
                setRecordMode('preset');
                setRecordedVideoUrl(null);
              }}
              className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                recordMode === 'preset'
                  ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Reaction Presets</span>
            </button>
          </div>

          {cameraError && recordMode === 'camera' && (
            <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs">
              {cameraError}
            </div>
          )}

          {/* VIEWPORT: RECORDING OR PRESET SELECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Viewport Box: Camera or Preset Preview */}
            <div className="relative aspect-[9/14] sm:aspect-[9/13] rounded-3xl overflow-hidden bg-black border-2 border-purple-500/50 shadow-xl flex items-center justify-center">
              
              {/* MODE 1: Camera Viewport */}
              {recordMode === 'camera' && (
                <>
                  {!recordedVideoUrl ? (
                    <>
                      <video
                        ref={videoPreviewRef}
                        playsInline
                        muted
                        autoPlay
                        className="w-full h-full object-cover mirror"
                      />

                      {/* Top Recording HUD */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20">
                        {isRecording ? (
                          <div className="flex items-center gap-2 bg-red-600/90 text-white px-3 py-1 rounded-full text-xs font-mono font-bold animate-pulse">
                            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                            <span>REC 0:0{recordingSeconds} / 0:10</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-cyan-300 font-mono border border-cyan-400/40">
                            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                            <span>10s Liveness Cap</span>
                          </div>
                        )}

                        {/* Switch Front/Back camera */}
                        <button
                          onClick={() => setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'))}
                          disabled={isRecording}
                          className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition"
                          title="Switch Camera"
                        >
                          <SwitchCamera className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Picture-in-Picture of Original Video while recording */}
                      {showOriginalPip && (
                        <div className="absolute top-12 left-3 w-20 aspect-[9/16] rounded-xl overflow-hidden border border-pink-500/70 shadow-lg z-20 bg-zinc-900 pointer-events-none">
                          <video
                            src={targetVideo.videoUrl}
                            poster={targetVideo.posterUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-0 inset-x-0 text-center text-[7px] font-bold bg-black/70 text-pink-300">
                            Original
                          </span>
                        </div>
                      )}

                      {/* Bottom Recording Control Shutter */}
                      <div className="absolute bottom-4 inset-x-0 flex flex-col items-center gap-2 z-20">
                        <div className="text-[11px] font-mono text-white/90 drop-shadow-md">
                          {isRecording ? 'Tap to finish reaction' : 'Tap shutter to record 10-second reaction'}
                        </div>

                        <button
                          onClick={isRecording ? stopRecording : startRecording}
                          className={`w-16 h-16 rounded-full p-1 border-4 transition-all ${
                            isRecording
                              ? 'border-red-500 scale-105'
                              : 'border-white hover:scale-105'
                          }`}
                        >
                          <div
                            className={`w-full h-full rounded-full transition-all ${
                              isRecording ? 'bg-red-500 rounded-lg scale-75' : 'bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600'
                            }`}
                          />
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Recorded Video Review */
                    <>
                      <video
                        ref={recordedVideoReviewRef}
                        src={recordedVideoUrl}
                        playsInline
                        loop
                        autoPlay
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute top-3 right-3 z-20">
                        <button
                          onClick={handleRetake}
                          className="px-3 py-1 rounded-full bg-black/75 hover:bg-black text-pink-300 border border-pink-500/40 text-xs font-bold transition flex items-center gap-1.5"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Retake</span>
                        </button>
                      </div>

                      <div className="absolute bottom-3 inset-x-3 bg-black/75 backdrop-blur-md p-2 rounded-2xl border border-emerald-500/40 text-center text-xs text-emerald-400 font-bold z-20">
                        ✓ 10-Second Reaction Captured!
                      </div>
                    </>
                  )}
                </>
              )}

              {/* MODE 2: Preset Selection Viewport */}
              {recordMode === 'preset' && (
                <>
                  <video
                    src={selectedPreset.url}
                    poster={selectedPreset.poster}
                    playsInline
                    loop
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-cyan-300 border border-cyan-400/40 z-20">
                    {selectedPreset.title}
                  </div>
                </>
              )}
            </div>

            {/* Controls & Configuration Column */}
            <div className="space-y-4 flex flex-col justify-between">
              
              {/* If in Preset Mode, list presets */}
              {recordMode === 'preset' && (
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block mb-2">
                    Select Reaction Vibe Clip
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {REACTION_PRESET_CLIPS.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setSelectedPreset(p);
                          setSelectedEmoji(p.defaultEmoji);
                          setCaption(p.defaultCaption);
                        }}
                        className={`p-2 rounded-2xl border text-left transition flex items-center gap-2 ${
                          selectedPreset.id === p.id
                            ? 'bg-pink-500/20 border-pink-500 text-white shadow-md'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <img src={p.poster} alt={p.title} className="w-10 h-12 rounded-xl object-cover" />
                        <div className="min-w-0">
                          <span className="text-xs font-bold block truncate text-white">{p.title}</span>
                          <span className="text-[10px] text-pink-400">{p.defaultEmoji} 10s Clip</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reaction Mood Emoji Picker */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-pink-400 block mb-2">
                  Reaction Mood Tag
                </label>
                <div className="flex flex-wrap gap-2">
                  {REACTION_EMOJIS.map(item => (
                    <button
                      key={item.emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(item.emoji)}
                      className={`w-9 h-9 rounded-2xl text-lg flex items-center justify-center transition ${
                        selectedEmoji === item.emoji
                          ? 'bg-gradient-to-tr from-cyan-400 to-pink-500 text-black shadow-lg scale-110'
                          : 'bg-zinc-900 border border-zinc-800 hover:bg-zinc-800'
                      }`}
                      title={item.label}
                    >
                      {item.emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reaction Caption & Witty Prompts */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Reaction Caption Note
                  </label>
                  <span className="text-[10px] text-zinc-500">{caption.length}/100</span>
                </div>
                <input
                  type="text"
                  maxLength={100}
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  placeholder="Drop a witty 10-second response..."
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-pink-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                />

                {/* Quick prompt suggestions */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {QUICK_CAPTION_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCaption(prompt)}
                      className="text-[10px] text-zinc-400 hover:text-cyan-300 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800 transition"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Default PiP Overlay Corner Placement */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-purple-300 block mb-2">
                  Default Overlay Corner
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'top_right', label: 'Top R' },
                    { id: 'top_left', label: 'Top L' },
                    { id: 'bottom_left', label: 'Bottom L' },
                    { id: 'bottom_right', label: 'Bottom R' }
                  ].map(pos => (
                    <button
                      key={pos.id}
                      type="button"
                      onClick={() => setOverlayPosition(pos.id as any)}
                      className={`py-1.5 rounded-xl text-[10px] font-bold border transition ${
                        overlayPosition === pos.id
                          ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Publish Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={isPublishing || (recordMode === 'camera' && !recordedVideoUrl && !selectedPreset)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 hover:from-cyan-300 hover:to-pink-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 hover:scale-[1.02] active:scale-95 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isPublishing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Attaching Reaction Overlay...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Post Video Reaction ({selectedEmoji})</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
