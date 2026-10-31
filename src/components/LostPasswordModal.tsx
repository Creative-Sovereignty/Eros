import React, { useState } from 'react';
import { 
  KeyRound, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Lock, 
  RefreshCw, 
  Sparkles,
  Smartphone,
  Eye,
  EyeOff
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LostPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordResetSuccess?: (newPass: string) => void;
}

export const LostPasswordModal: React.FC<LostPasswordModalProps> = ({
  isOpen,
  onClose,
  onPasswordResetSuccess
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [emailOrUsername, setEmailOrUsername] = useState('alex_r');
  const [recoveryMethod, setRecoveryMethod] = useState<'email' | 'sms'>('email');
  const [code, setCode] = useState(['8', '4', '9', '2', '0', '1']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrUsername.trim()) {
      setErrorMsg('Please enter your registered email or username.');
      return;
    }
    setErrorMsg(null);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 700);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      setErrorMsg('Please enter the complete 6-digit verification code.');
      return;
    }
    setErrorMsg(null);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 600);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }
    setErrorMsg(null);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onPasswordResetSuccess) {
        onPasswordResetSuccess(newPassword);
      }
      setStep(4);
      confetti({
        particleCount: 70,
        spread: 60,
        colors: ['#06b6d4', '#ec4899', '#a855f7']
      });
    }, 800);
  };

  const handleDigitChange = (index: number, val: string) => {
    const newCode = [...code];
    newCode[index] = val.slice(-1);
    setCode(newCode);
    // Auto advance focus
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-box-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-zinc-950 border border-purple-900/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header with Cyan-Pink-Purple Accent */}
        <div className="p-4 border-b border-purple-900/30 bg-zinc-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 p-0.5 text-black flex items-center justify-center font-black">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-pink-400">
                <KeyRound className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Account Recovery & Password Reset
              </h3>
              <p className="text-[11px] text-zinc-400">ErosDreamz 18+ Secure Credential Vault</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-4 px-6 pt-3.5 pb-1 gap-2">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex flex-col gap-1">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  step >= s
                    ? 'bg-gradient-to-r from-cyan-400 to-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]'
                    : 'bg-zinc-800'
                }`}
              />
              <span className={`text-[9px] font-bold text-center ${step === s ? 'text-pink-400' : 'text-zinc-500'}`}>
                {s === 1 ? 'Lookup' : s === 2 ? 'Verify' : s === 3 ? 'New Pass' : 'Complete'}
              </span>
            </div>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: ACCOUNT LOOKUP */}
          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-base font-black text-white">Find Your Account</h4>
                <p className="text-xs text-zinc-400">
                  Enter your registered username or email to receive a secure recovery code.
                </p>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block mb-1">
                  Username or Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={emailOrUsername}
                    onChange={e => setEmailOrUsername(e.target.value)}
                    placeholder="e.g. alex_r or alex@example.com"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition"
                  />
                  <Mail className="w-4 h-4 text-zinc-500 absolute right-3 top-3" />
                </div>
              </div>

              {/* Delivery method options */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Delivery Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRecoveryMethod('email')}
                    className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                      recoveryMethod === 'email'
                        ? 'bg-pink-500/15 border-pink-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-pink-400" />
                    <div>
                      <span className="text-xs font-bold block">Email Link</span>
                      <span className="text-[10px] text-zinc-500">Fast & direct</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRecoveryMethod('sms')}
                    className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                      recoveryMethod === 'sms'
                        ? 'bg-cyan-500/15 border-cyan-400 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                    <div>
                      <span className="text-xs font-bold block">SMS 2FA</span>
                      <span className="text-[10px] text-zinc-500">Verified mobile</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-zinc-400 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Protected by ErosDreamz 18+ zero-knowledge cryptographic protocol.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 hover:from-cyan-300 hover:to-pink-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 transition active:scale-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Dispatching Code...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                    Send 6-Digit Recovery Code
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: VERIFICATION CODE ENTRY */}
          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-base font-black text-white">Enter 6-Digit Code</h4>
                <p className="text-xs text-zinc-400">
                  We sent a recovery code to your {recoveryMethod === 'email' ? 'email' : 'phone'}.
                </p>
              </div>

              {/* 6 Digit boxes */}
              <div className="flex justify-center gap-2 py-2">
                {code.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-box-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleDigitChange(idx, e.target.value)}
                    className="w-11 h-12 text-center text-lg font-mono font-bold bg-zinc-900 border border-purple-500/40 rounded-xl text-cyan-300 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                  />
                ))}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setCode(['8', '4', '9', '2', '0', '1'])}
                  className="text-[11px] text-cyan-400 hover:underline font-mono"
                >
                  ⚡ Auto-fill Demo Code (849201)
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 transition active:scale-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Verifying Code...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm Security Code
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-center text-xs text-zinc-400 hover:text-white"
              >
                ← Back to account lookup
              </button>
            </form>
          )}

          {/* STEP 3: SET NEW PASSWORD */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-base font-black text-white">Create New Password</h4>
                <p className="text-xs text-zinc-400">
                  Choose a strong, unique password for your ErosDreamz account.
                </p>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-pink-400 block mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters..."
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-3 text-zinc-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-pink-400 block mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password..."
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition"
                />
              </div>

              {/* Password strength checks */}
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1.5 text-[11px]">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <span className={newPassword.length >= 8 ? 'text-emerald-400' : 'text-zinc-600'}>✓</span>
                  <span>Minimum 8 characters</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <span className={/[0-9]/.test(newPassword) ? 'text-emerald-400' : 'text-zinc-600'}>✓</span>
                  <span>Contains numbers or special characters</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 transition active:scale-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Updating Credentials...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Save & Lock In New Password
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 4 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 p-0.5 mx-auto shadow-xl shadow-pink-500/30">
                <div className="w-full h-full bg-zinc-950 rounded-[22px] flex items-center justify-center text-cyan-400">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-black text-white">Password Successfully Reset!</h4>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                  Your ErosDreamz account has been securely updated. You can now use your new password to sign in on any device.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-purple-500/30 text-xs text-left space-y-1">
                <div className="flex justify-between text-zinc-400">
                  <span>Account Status:</span>
                  <span className="text-emerald-400 font-bold">18+ Verified & Secured</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Encryption:</span>
                  <span className="text-cyan-300 font-mono">Argon2 / SHA-256</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-extrabold text-xs uppercase tracking-wider transition active:scale-95"
              >
                Return to ErosDreamz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
