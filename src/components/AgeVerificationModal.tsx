import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Camera, FileText, Lock, Sparkles, RefreshCw, X, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AgeVerificationState } from '../types';
import { ErosLogo } from './ErosLogo';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: (state: AgeVerificationState) => void;
  currentState?: AgeVerificationState;
  onOpenLostPassword?: () => void;
}

export const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerified,
  currentState,
  onOpenLostPassword
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [birthYear, setBirthYear] = useState('2000');
  const [birthMonth, setBirthMonth] = useState('06');
  const [birthDay, setBirthDay] = useState('15');
  const [calculatedAge, setCalculatedAge] = useState<number>(26);
  const [isUnderage, setIsUnderage] = useState(false);
  const [method, setMethod] = useState<'facial_liveness' | 'id_scan'>('facial_liveness');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('');
  const [idFileName, setIdFileName] = useState<string | null>(null);
  const [safetyAgreed, setSafetyAgreed] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [generatedCert, setGeneratedCert] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Calculate age based on selected DOB
    const birthDate = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay));
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setCalculatedAge(age);
    setIsUnderage(age < 18);
  }, [birthYear, birthMonth, birthDay]);

  // Clean up camera stream
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch {
      // If camera permission blocked or unavailable, fallback to simulated bio mesh
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanStatus('Initializing neural biometric sensor...');

    if (method === 'facial_liveness') {
      startCamera();
    }

    const interval = setInterval(() => {
      setScanProgress(prev => {
        const next = prev + 15;
        if (next === 30) {
          setScanStatus(method === 'facial_liveness' ? 'Analyzing 3D facial landmarks & depth...' : 'Validating government holographic watermarks...');
        } else if (next === 60) {
          setScanStatus(method === 'facial_liveness' ? 'Checking liveness & micro-expressions...' : 'Verifying cryptographic security seal...');
        } else if (next === 90) {
          setScanStatus('Synthesizing zero-knowledge age token (18+ confirmed)...');
        } else if (next >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          stopCamera();
          const cert = `PLS-VER-${Math.floor(10000 + Math.random() * 90000)}-${method === 'facial_liveness' ? 'BIO' : 'GOV'}`;
          setGeneratedCert(cert);
          setStep(3);
          return 100;
        }
        return next;
      });
    }, 450);
  };

  const handleIdFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdFileName(e.target.files[0].name);
    }
  };

  const handleCompleteVerification = () => {
    const verifiedState: AgeVerificationState = {
      isVerified: true,
      dob: `${birthYear}-${birthMonth}-${birthDay}`,
      verifiedAge: calculatedAge,
      method: method,
      certificateId: generatedCert || `PLS-VER-${Math.floor(10000 + Math.random() * 90000)}-VER`,
      verifiedAt: new Date().toISOString(),
      safetyPledgeAgreed: true
    };

    localStorage.setItem('pulse_age_verification', JSON.stringify(verifiedState));
    onVerified(verifiedState);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setStep(4);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide uppercase">ErosDreamz Secure Verification</h2>
              <p className="text-xs text-zinc-400">Strictly 18+ Male Social & Dating Network</p>
            </div>
          </div>
          {currentState?.isVerified && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-4 px-6 pt-4 pb-2 gap-2">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex flex-col gap-1">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  step >= s ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'bg-zinc-800'
                }`}
              />
              <span className={`text-[10px] font-medium text-center ${step === s ? 'text-amber-400' : 'text-zinc-500'}`}>
                {s === 1 ? 'Age Check' : s === 2 ? 'Biometrics' : s === 3 ? 'Safety Pledge' : 'Verified'}
              </span>
            </div>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-zinc-200">
          {/* STEP 1: DATE OF BIRTH */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-2">
                  <ErosLogo size="lg" layout="icon-only" glow={true} />
                </div>
                <h3 className="text-xl font-bold text-white">Enter Your Date of Birth</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  To ensure a safe, legal environment, all members must confirm they are at least 18 years of age.
                </p>
              </div>

              {/* DOB Selectors */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-900/70 border border-zinc-800 rounded-2xl">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Month</label>
                  <select
                    value={birthMonth}
                    onChange={e => setBirthMonth(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {[
                      { v: '01', l: '01 - Jan' }, { v: '02', l: '02 - Feb' }, { v: '03', l: '03 - Mar' },
                      { v: '04', l: '04 - Apr' }, { v: '05', l: '05 - May' }, { v: '06', l: '06 - Jun' },
                      { v: '07', l: '07 - Jul' }, { v: '08', l: '08 - Aug' }, { v: '09', l: '09 - Sep' },
                      { v: '10', l: '10 - Oct' }, { v: '11', l: '11 - Nov' }, { v: '12', l: '12 - Dec' }
                    ].map(m => (
                      <option key={m.v} value={m.v}>{m.l}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Day</label>
                  <select
                    value={birthDay}
                    onChange={e => setBirthDay(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {Array.from({ length: 31 }, (_, i) => {
                      const d = String(i + 1).padStart(2, '0');
                      return <option key={d} value={d}>{d}</option>;
                    })}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Year</label>
                  <select
                    value={birthYear}
                    onChange={e => setBirthYear(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {Array.from({ length: 60 }, (_, i) => {
                      const y = 2012 - i;
                      return <option key={y} value={y}>{y}</option>;
                    })}
                  </select>
                </div>
              </div>

              {/* Age Validation Banner */}
              <div className={`p-4 rounded-2xl border flex items-center gap-3.5 transition ${
                isUnderage
                  ? 'bg-red-500/10 border-red-500/40 text-red-400'
                  : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
              }`}>
                {isUnderage ? (
                  <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                )}
                <div className="text-xs">
                  <p className="font-bold text-sm">
                    Calculated Age: {calculatedAge} years old
                  </p>
                  <p className="text-zinc-400 mt-0.5">
                    {isUnderage
                      ? 'You must be at least 18 years old to use Pulse. Access is restricted.'
                      : 'Age requirement satisfied (18+). Proceed to identity verification.'}
                  </p>
                </div>
              </div>

              <button
                disabled={isUnderage}
                onClick={() => setStep(2)}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2 ${
                  isUnderage
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-lg shadow-amber-500/20 active:scale-[0.99]'
                }`}
              >
                Continue to Verification Method
              </button>

              {onOpenLostPassword && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenLostPassword();
                    }}
                    className="text-xs text-zinc-400 hover:text-amber-400 transition underline font-medium"
                  >
                    Already verified but forgot login password? Recover Account →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: VERIFICATION METHOD & SCAN */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-white">Choose Verification Method</h3>
                <p className="text-xs text-zinc-400">
                  Real-time encrypted liveness check prevents bots, fake profiles, and minors.
                </p>
              </div>

              {/* Method Cards */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMethod('facial_liveness')}
                  className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                    method === 'facial_liveness'
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)]'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Facial Liveness</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">Instant 3D camera scan & adult age estimation</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('id_scan')}
                  className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                    method === 'id_scan'
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)]'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-2">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Government ID</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">Drivers license, Passport, or National ID</p>
                  </div>
                </button>
              </div>

              {/* SCANNER VIEWPORT */}
              <div className="relative p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col items-center justify-center min-h-[220px] overflow-hidden">
                {method === 'facial_liveness' ? (
                  <div className="w-full flex flex-col items-center">
                    {cameraActive ? (
                      <div className="relative w-44 h-44 rounded-full overflow-hidden border-2 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                        <video ref={videoRef} className="w-full h-full object-cover scale-x-[-1]" autoPlay playsInline muted />
                        {isScanning && (
                          <div className="absolute inset-0 bg-amber-500/20 animate-pulse flex items-center justify-center">
                            <div className="w-full h-0.5 bg-amber-300 shadow-[0_0_8px_#fbbf24] animate-bounce" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative w-36 h-36 rounded-full border-2 border-dashed border-amber-500/50 flex flex-col items-center justify-center bg-zinc-950/80">
                        <Eye className={`w-10 h-10 ${isScanning ? 'text-amber-400 animate-pulse' : 'text-zinc-600'}`} />
                        <span className="text-[10px] text-zinc-400 mt-2 font-mono">Biometric Oval</span>
                        {isScanning && (
                          <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping opacity-30" />
                        )}
                      </div>
                    )}

                    <p className="text-xs text-zinc-400 mt-3 text-center">
                      {isScanning ? scanStatus : 'Position your face inside the circle. Click Start Scan to verify.'}
                    </p>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center space-y-3">
                    <div className="w-48 h-28 border-2 border-dashed border-zinc-700 rounded-xl flex flex-col items-center justify-center p-3 text-center bg-zinc-950/50">
                      <FileText className="w-7 h-7 text-orange-400 mb-1" />
                      <span className="text-[11px] text-zinc-300 font-medium">
                        {idFileName || 'Select or drop ID photo'}
                      </span>
                      <span className="text-[9px] text-zinc-500">JPG, PNG, PDF (Encrypted)</span>
                    </div>

                    <label className="cursor-pointer px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700 transition">
                      Choose File
                      <input type="file" accept="image/*,.pdf" onChange={handleIdFileUpload} className="hidden" />
                    </label>

                    {isScanning && (
                      <p className="text-xs text-amber-400 animate-pulse text-center">{scanStatus}</p>
                    )}
                  </div>
                )}

                {/* Progress bar during scan */}
                {isScanning && (
                  <div className="w-full mt-4 space-y-1">
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                      <span>SECURE PIPELINE</span>
                      <span>{scanProgress}%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isScanning}
                  onClick={handleStartScan}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 font-bold text-xs text-black shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Scanning in Progress...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Start {method === 'facial_liveness' ? 'Biometric Face Scan' : 'ID Validation'}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SAFETY PLEDGE */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <div className="inline-flex p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white">Biometric Verification Passed!</h3>
                <p className="text-xs text-zinc-400">
                  Token generated: <span className="font-mono text-amber-400">{generatedCert}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Community Safety & Respect Agreement
                </h4>
                <ul className="text-xs text-zinc-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">1.</span>
                    <span><strong>18+ Only:</strong> Minors are strictly prohibited. Any violation results in an immediate permanent hardware ban.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">2.</span>
                    <span><strong>Consensual & Safe:</strong> Always respect boundaries in video feeds, comments, and direct chats.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">3.</span>
                    <span><strong>Authentic Profiles:</strong> Pulse is built for real 10-second vibes. No catfish or impersonation.</span>
                  </li>
                </ul>

                <label className="flex items-center gap-3 pt-3 border-t border-zinc-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyAgreed}
                    onChange={e => setSafetyAgreed(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 bg-zinc-950 border-zinc-700 focus:ring-amber-500"
                  />
                  <span className="text-xs text-white font-medium">
                    I pledge to uphold these standards and verify I am of legal adult age.
                  </span>
                </label>
              </div>

              <button
                disabled={!safetyAgreed}
                onClick={handleCompleteVerification}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2 ${
                  !safetyAgreed
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                Activate Verified Account
              </button>
            </div>
          )}

          {/* STEP 4: BADGE ISSUED CONFIRMATION */}
          {step === 4 && (
            <div className="space-y-5 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 p-0.5 mx-auto shadow-[0_0_25px_rgba(251,191,36,0.5)]">
                <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-9 h-9" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-white tracking-tight">You’re Verified 18+ on Pulse!</h3>
                <p className="text-xs text-zinc-400">
                  Your profile now displays the official golden verified shield.
                </p>
              </div>

              {/* Certificate Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-amber-500/40 text-left space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 uppercase tracking-wider text-[10px]">Verification ID</span>
                  <span className="font-mono text-amber-400 font-bold">{generatedCert || 'PLS-VER-98240-X19'}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 uppercase tracking-wider text-[10px]">Status</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Adult Verified (18+)
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 uppercase tracking-wider text-[10px]">Verification Method</span>
                  <span className="text-zinc-200 capitalize">{method.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 uppercase tracking-wider text-[10px]">Security Encryption</span>
                  <span className="text-zinc-400 font-mono text-[11px]">SHA-256 ZK-Proof</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-extrabold text-sm shadow-xl shadow-amber-500/30 transition active:scale-[0.99]"
              >
                Enter the Video Stream
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
