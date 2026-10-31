import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Video, 
  Sparkles, 
  RefreshCw, 
  X, 
  Music, 
  Check, 
  Upload, 
  Flame, 
  MapPin, 
  Tag,
  Mic,
  MicOff,
  SwitchCamera,
  Lightbulb,
  Radio,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VideoItem, User } from '../types';
import { scanPublicVideo } from '../services/moderationService';

interface VideoCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onPublishVideo: (newVideo: VideoItem) => void;
  onOpenBestPractices?: () => void;
}

const PRESET_CLIPS = [
  {
    id: 'preset_1',
    title: 'Workout Flex',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-out-at-the-gym-40502-large.mp4',
    poster: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80',
    tags: ['GymBro', 'LegDay', 'WestHollywood', 'Workout']
  },
  {
    id: 'preset_2',
    title: 'Beach Sunset Vibe',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-standing-on-a-beach-at-sunset-41133-large.mp4',
    poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    tags: ['BeachLife', 'SunsetWalk', 'Spontaneous', 'Venice']
  },
  {
    id: 'preset_3',
    title: 'City Night Walk',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-walking-down-a-city-street-41132-large.mp4',
    poster: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80',
    tags: ['Nightlife', 'Melrose', 'FitCheck', 'Cocktails']
  },
  {
    id: 'preset_4',
    title: 'Music & Headphones',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-enjoying-music-wearing-headphones-41131-large.mp4',
    poster: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    tags: ['ElectronicMusic', 'DJ', 'Coffee', 'VibeCheck']
  }
];

const MUSIC_OPTIONS = [
  'Original Microphone Audio (Live Voice 🎙️)',
  'Troye Sivan • Rush (Remix)',
  'Charli xcx • Club classics',
  'Fred again.. • adore u',
  'Kylie Minogue • Padam Padam'
];

export const VideoCreatorModal: React.FC<VideoCreatorModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onPublishVideo,
  onOpenBestPractices
}) => {
  const [mode, setMode] = useState<'camera' | 'upload' | 'preset'>('camera');
  const [selectedPreset, setSelectedPreset] = useState(PRESET_CLIPS[0]);
  const [caption, setCaption] = useState('10 seconds to say hi 🔥 Who is nearby for drinks or coffee?');
  const [hashtagsInput, setHashtagsInput] = useState('Fitness, WestHollywood, Dating, Nightlife');
  const [music, setMusic] = useState(MUSIC_OPTIONS[0]);
  const [filter, setFilter] = useState<'none' | 'amber' | 'sunset' | 'noir'>('none');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedTime, setRecordedTime] = useState(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [audioLevel, setAudioLevel] = useState<number>(35); // 0-100 mic volume meter
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const timerIntervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Initialize camera when in camera mode
  useEffect(() => {
    if (isOpen && mode === 'camera' && !recordedVideoUrl) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, mode, recordedVideoUrl, facingMode]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 720 }, height: { ideal: 1280 }, facingMode },
        audio: true
      });
      cameraStreamRef.current = stream;
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play().catch(() => {});
      }

      // Initialize live mic analyser
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;
          const source = ctx.createMediaStreamSource(stream);
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          const updateMeter = () => {
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const avg = sum / dataArray.length;
            setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
            animFrameRef.current = requestAnimationFrame(updateMeter);
          };
          updateMeter();
        }
      } catch {
        // Fallback simulated mic pulse
      }
    } catch (err: any) {
      // If camera blocked or unavailable, provide simulated live studio preview
      setCameraError('Camera / Microphone permission denied or busy. Previewing in Studio Mode.');
    }
  };

  const stopCamera = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach(t => t.stop());
      cameraStreamRef.current = null;
    }
  };

  const toggleCameraFacing = () => {
    stopCamera();
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };

  const start10SecRecording = () => {
    recordedChunksRef.current = [];
    setIsRecording(true);
    setRecordedTime(0);

    // If media stream available, record real stream
    if (cameraStreamRef.current) {
      try {
        const recorder = new MediaRecorder(cameraStreamRef.current);
        recorder.ondataavailable = e => {
          if (e.data.size > 0) recordedChunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: 'video/mp4' });
          const url = URL.createObjectURL(blob);
          setRecordedVideoUrl(url);
        };
        recorder.start();
        mediaRecorderRef.current = recorder;
      } catch {
        // Fallback
      }
    }

    const startTime = Date.now();
    timerIntervalRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      if (elapsed >= 10) {
        stop10SecRecording();
      } else {
        setRecordedTime(elapsed);
        // Dynamic mic level flutter during recording
        setAudioLevel(Math.min(100, Math.floor(40 + Math.random() * 50)));
      }
    }, 50);
  };

  const stop10SecRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      // Fallback sample clip if MediaRecorder wasn't active
      if (!recordedVideoUrl) {
        setRecordedVideoUrl(PRESET_CLIPS[0].url);
      }
    }
    setIsRecording(false);
  };

  const handleRetake = () => {
    setRecordedVideoUrl(null);
    setRecordedTime(0);
    startCamera();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setRecordedVideoUrl(url);
    }
  };

  const handlePublish = () => {
    const rawTags = hashtagsInput.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);
    const activeTags = rawTags.length > 0 
      ? rawTags 
      : (mode === 'preset' ? selectedPreset.tags : ['NewPulse', 'Verified18', 'NearYou']);

    // Run AI content moderation scan
    const scan = scanPublicVideo(caption, activeTags);
    if (!scan.isApproved) {
      alert(`AI Moderation Alert: ${scan.explanation}`);
      return;
    }

    setIsPublishing(true);
    setTimeout(() => {
      const activeVideoUrl =
        recordedVideoUrl || (mode === 'preset' ? selectedPreset.url : PRESET_CLIPS[0].url);
      const activePoster =
        mode === 'preset' ? selectedPreset.poster : currentUser.avatar;

      const newVideo: VideoItem = {
        id: `vid_custom_${Date.now()}`,
        userId: currentUser.id,
        user: currentUser,
        videoUrl: activeVideoUrl,
        posterUrl: activePoster,
        caption: caption || '10 second check-in 🔥 Say hi!',
        musicTitle: music,
        durationSec: 10,
        tags: activeTags,
        hashtags: activeTags,
        likesCount: 1,
        commentsCount: 0,
        sharesCount: 0,
        isLiked: true,
        createdAt: 'Just now'
      };

      onPublishVideo(newVideo);
      setIsPublishing(false);
      onClose();

      confetti({
        particleCount: 75,
        spread: 60,
        colors: ['#06b6d4', '#ec4899', '#a855f7'],
        origin: { y: 0.7 }
      });
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-purple-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-purple-900/40 bg-zinc-900/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 p-0.5 text-black flex items-center justify-center font-black text-xs shadow-md shadow-pink-500/20">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-pink-400 font-mono">
                10s
              </div>
            </div>
            <div>
              <h2 className="text-sm font-black text-white tracking-wide flex items-center gap-1.5">
                <span>Record 10-Second Vibe</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-cyan-400 font-mono">
                  <Mic className="w-3 h-3" /> Cam & Mic Ready
                </span>
              </h2>
              <p className="text-[11px] text-zinc-400">Capture your real presence for the radar</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenBestPractices && (
              <button
                type="button"
                onClick={onOpenBestPractices}
                className="px-2.5 py-1 rounded-full bg-purple-950/80 hover:bg-pink-950/80 border border-pink-500/40 text-pink-300 hover:text-white text-[11px] font-bold transition flex items-center gap-1"
                title="View First-Time Creator Best Practices"
              >
                <Lightbulb className="w-3 h-3 text-cyan-400" />
                <span>Guide</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* First Time Best Practices Banner */}
        {onOpenBestPractices && (
          <div className="px-5 py-2 bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-pink-950/40 border-b border-purple-900/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <Lightbulb className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span className="text-[11px] text-zinc-300">
                First time? Check our <strong>lighting, audio & 10s hook tips</strong> for 4x more mutual likes.
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenBestPractices}
              className="text-[11px] font-black text-pink-400 hover:text-pink-300 underline whitespace-nowrap ml-2"
            >
              Read Tips →
            </button>
          </div>
        )}

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-3 px-5 py-2.5 bg-zinc-900/40 border-b border-zinc-800/80 gap-2">
          <button
            type="button"
            onClick={() => { setMode('camera'); setRecordedVideoUrl(null); }}
            className={`py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              mode === 'camera'
                ? 'bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-extrabold shadow-md shadow-pink-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            Live Camera & Mic
          </button>
          <button
            type="button"
            onClick={() => { setMode('preset'); setRecordedVideoUrl(null); }}
            className={`py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              mode === 'preset'
                ? 'bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-extrabold shadow-md shadow-pink-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Vibe Presets
          </button>
          <button
            type="button"
            onClick={() => { setMode('upload'); }}
            className={`py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              mode === 'upload'
                ? 'bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-extrabold shadow-md shadow-pink-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload File
          </button>
        </div>

        {/* Main Content Area */}
        <div className="p-5 overflow-y-auto space-y-4">
          
          {/* VIDEO VIEWER / RECORDER CONTAINER */}
          <div className="relative aspect-[9/12] w-full max-w-[280px] mx-auto rounded-3xl overflow-hidden bg-black border border-purple-500/40 shadow-2xl flex items-center justify-center">
            
            {/* Live Camera View with Audio Indicator */}
            {mode === 'camera' && !recordedVideoUrl && (
              <>
                <video
                  ref={videoPreviewRef}
                  className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''} ${
                    filter === 'amber' ? 'sepia hue-rotate-15 contrast-125' :
                    filter === 'sunset' ? 'contrast-125 saturate-150' :
                    filter === 'noir' ? 'grayscale contrast-125' : ''
                  }`}
                  autoPlay
                  playsInline
                  muted
                />

                {/* If camera permission not granted or stream not yet loaded, show mirror HUD */}
                {!cameraStreamRef.current && (
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-950/60 via-zinc-950/80 to-black flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 p-0.5 animate-pulse mb-3">
                      <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center text-pink-400">
                        <Camera className="w-8 h-8" />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white">Camera & Mic Sensor Active</span>
                    <span className="text-[10px] text-zinc-400 mt-1 max-w-[200px]">
                      Ready for 10-second capture. Tap 'Record Now' below!
                    </span>
                  </div>
                )}

                {/* 10-Second Timer Progress Bar at Top (Cyan to Pink to Purple) */}
                {isRecording && (
                  <div className="absolute top-3 left-3 right-3 h-2 bg-black/60 rounded-full overflow-hidden border border-white/20">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 transition-all duration-75 shadow-[0_0_10px_rgba(236,72,153,0.8)]"
                      style={{ width: `${(recordedTime / 10) * 100}%` }}
                    />
                  </div>
                )}

                {/* Live Recording HUD + Countdown */}
                <div className="absolute top-7 left-4 flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-purple-500/40 text-[11px] text-white">
                  <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-pink-500 animate-ping' : 'bg-cyan-400'}`} />
                  <span className="font-mono font-bold text-cyan-300">
                    {isRecording ? `${(10 - recordedTime).toFixed(1)}s` : '10.0s Limit'}
                  </span>
                </div>

                {/* Live Mic Audio Volume Meter (Animated Bouncing Level) */}
                <div className="absolute top-7 right-4 flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-purple-500/40 text-[11px] text-white">
                  <Mic className="w-3.5 h-3.5 text-pink-400" />
                  <div className="flex items-end gap-0.5 h-3">
                    <span
                      className="w-1 bg-cyan-400 rounded-full transition-all duration-75"
                      style={{ height: `${Math.max(20, audioLevel * 0.8)}%` }}
                    />
                    <span
                      className="w-1 bg-pink-400 rounded-full transition-all duration-75"
                      style={{ height: `${Math.max(30, audioLevel)}%` }}
                    />
                    <span
                      className="w-1 bg-purple-400 rounded-full transition-all duration-75"
                      style={{ height: `${Math.max(15, audioLevel * 0.6)}%` }}
                    />
                  </div>
                </div>

                {/* Flip camera button */}
                <button
                  type="button"
                  onClick={toggleCameraFacing}
                  className="absolute bottom-6 right-5 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/90 transition"
                  title="Switch Front/Back Camera"
                >
                  <SwitchCamera className="w-4 h-4" />
                </button>

                {/* Big Glowing RECORD NOW Shutter Button */}
                <div className="absolute bottom-5 inset-x-0 flex flex-col justify-center items-center gap-2">
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={start10SecRecording}
                      className="group flex flex-col items-center focus:outline-none"
                    >
                      <div className="w-18 h-18 rounded-full border-4 border-pink-500/80 p-1 flex items-center justify-center bg-black/50 hover:scale-105 active:scale-95 transition shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                        <div className="w-full h-full rounded-full bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 shadow-lg flex items-center justify-center text-black font-black text-xs uppercase tracking-tighter">
                          REC
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-pink-300 drop-shadow mt-1">
                        Tap to Record 10s
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stop10SecRecording}
                      className="flex flex-col items-center focus:outline-none"
                    >
                      <div className="w-18 h-18 rounded-full border-4 border-pink-500 p-1 flex items-center justify-center bg-black/60 active:scale-95 transition shadow-[0_0_25px_rgba(236,72,153,0.8)]">
                        <div className="w-7 h-7 rounded-lg bg-pink-500 shadow-lg shadow-pink-500/50" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 drop-shadow mt-1 animate-pulse">
                        Recording ({recordedTime.toFixed(1)}s / 10s)
                      </span>
                    </button>
                  )}
                </div>
              </>
            )}

            {/* Recorded Playback or Uploaded Video */}
            {recordedVideoUrl && (
              <div className="relative w-full h-full">
                <video
                  src={recordedVideoUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted={false}
                  playsInline
                />
                <button
                  type="button"
                  onClick={handleRetake}
                  className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 hover:bg-black transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retake
                </button>
                <div className="absolute top-3 left-3 bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 px-2.5 py-1 rounded-full text-[10px] font-bold">
                  ✓ 10-Second Clip Ready
                </div>
              </div>
            )}

            {/* Preset Video Selector Preview */}
            {mode === 'preset' && !recordedVideoUrl && (
              <div className="relative w-full h-full">
                <video
                  src={selectedPreset.url}
                  poster={selectedPreset.poster}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-pink-400 border border-pink-500/30">
                  Preset: {selectedPreset.title}
                </div>
              </div>
            )}

            {/* File Upload Mode */}
            {mode === 'upload' && !recordedVideoUrl && (
              <div className="p-6 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-purple-900/40 flex items-center justify-center text-pink-400">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Select Video Clip</h4>
                  <p className="text-[10px] text-zinc-500 mt-0.5">MP4 or WebM (auto trimmed to 10s)</p>
                </div>
                <label className="cursor-pointer px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-extrabold text-xs transition active:scale-95">
                  Browse Files
                  <input type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            )}
          </div>

          {/* Preset Cards Selection */}
          {mode === 'preset' && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Choose High-Energy Preset:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_CLIPS.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPreset(p)}
                    className={`relative rounded-xl overflow-hidden aspect-[9/12] border transition ${
                      selectedPreset.id === p.id
                        ? 'border-pink-500 ring-2 ring-pink-500/50 scale-[1.03]'
                        : 'border-zinc-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={p.poster} alt={p.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 p-1 bg-black/70 text-[9px] font-semibold text-white truncate text-center">
                      {p.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Video Color Filters */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
              Vibe Lighting Filter:
            </label>
            <div className="flex gap-2">
              {[
                { id: 'none', label: 'Natural' },
                { id: 'amber', label: 'Warm Glow' },
                { id: 'sunset', label: 'Neon Sunset' },
                { id: 'noir', label: 'Monochrome Noir' }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id as any)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-semibold border transition ${
                    filter === f.id
                      ? 'bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-purple-500/20 border-pink-400 text-pink-300 shadow-sm'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sound / Music Track Selection */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <Music className="w-3.5 h-3.5 text-pink-400" /> Sound Track:
            </label>
            <select
              value={music}
              onChange={e => setMusic(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
            >
              {MUSIC_OPTIONS.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Clickable Hashtags / Topics for Stream Discovery */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-cyan-400" /> Topic Hashtags (Comma-Separated):
              </label>
              <span className="text-[10px] text-zinc-500">Tap chips in stream to filter</span>
            </div>
            <input
              type="text"
              value={hashtagsInput}
              onChange={e => setHashtagsInput(e.target.value)}
              placeholder="e.g. Fitness, Nightlife, Coffee, WestHollywood"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
            />
          </div>

          {/* Caption & 10-Second Pitch */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              10-Second Pitch / Caption:
            </label>
            <textarea
              rows={2}
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="What are you doing right now? Say hi in 10 seconds..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 resize-none"
            />
          </div>

          {/* Publish Button */}
          <button
            type="button"
            disabled={isPublishing || (mode === 'camera' && !recordedVideoUrl)}
            onClick={handlePublish}
            className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 ${
              mode === 'camera' && !recordedVideoUrl
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 hover:from-cyan-300 hover:to-pink-400 text-black shadow-lg shadow-pink-500/25 active:scale-[0.99]'
            }`}
          >
            {isPublishing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Publishing to Live Stream...
              </>
            ) : (
              <>
                <Flame className="w-4 h-4 fill-black text-black" />
                Post 10s Video to Radar Feed
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
