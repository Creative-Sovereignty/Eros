import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Check, X, ShieldCheck, Flag } from 'lucide-react';
import { ContentReport } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'video' | 'user' | 'message';
  targetId: string;
  targetName: string;
  onSubmitReport: (report: Omit<ContentReport, 'id' | 'reportedAt' | 'status'>) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetName,
  onSubmitReport
}) => {
  const [category, setCategory] = useState<ContentReport['category']>('inappropriate_public');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport({
      targetType,
      targetId,
      targetName,
      category,
      description: description.trim() || 'User flagged violation of ErosDreamz community standards.'
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Report Community Violation</h3>
              <p className="text-[10px] text-zinc-400">Strict Adult Safety & Trust Enforcement</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Report Submitted to Trust & Safety</h4>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Thank you for keeping ErosDreamz safe. Our automated AI moderator and human review team will investigate within 1 hour.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">Target Being Reported</span>
                <span className="text-white font-semibold">{targetName} ({targetType})</span>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Violation Category
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'inappropriate_public', label: 'Inappropriate Content on Public Stream', desc: 'Explicit sexual content shown on public FYP' },
                    { id: 'underage_suspect', label: 'Suspected Minor / Underage Account', desc: 'Zero tolerance: strictly 18+ adult network' },
                    { id: 'harassment', label: 'Harassment or Non-consensual Behavior', desc: 'Unwanted advances, threats, or abuse' },
                    { id: 'hate_speech', label: 'Hate Speech or Bigotry', desc: 'Discrimination based on identity or race' },
                    { id: 'spam_scam', label: 'Spam, Commercial Solicitation, or Scam', desc: 'External payment links, crypto, or bots' }
                  ].map(cat => (
                    <label
                      key={cat.id}
                      className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition ${
                        category === cat.id
                          ? 'bg-red-500/10 border-red-500/50 text-white'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="report_cat"
                        checked={category === cat.id}
                        onChange={() => setCategory(cat.id as any)}
                        className="mt-0.5 text-red-500 focus:ring-red-500"
                      />
                      <div className="text-xs">
                        <span className="font-semibold block text-zinc-200">{cat.label}</span>
                        <span className="text-[10px] text-zinc-500 block">{cat.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Additional Details (Optional)
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Provide any context to help safety reviewers..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-500/20 transition active:scale-95"
              >
                Submit Report to Safety Team
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
