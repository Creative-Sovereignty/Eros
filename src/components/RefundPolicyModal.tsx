import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Coins, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  FileText, 
  AlertCircle, 
  ArrowRight, 
  X, 
  Sparkles,
  CreditCard,
  Send,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RefundClaim, BillingTransaction } from '../types';

interface RefundPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  onClaimSubmitted?: (claim: RefundClaim) => void;
  initialTransactionId?: string;
}

export const RefundPolicyModal: React.FC<RefundPolicyModalProps> = ({
  isOpen,
  onClose,
  userEmail = 'alex_r@erosdreamz.app',
  onClaimSubmitted,
  initialTransactionId
}) => {
  const [activeTab, setActiveTab] = useState<'policy' | 'submit_claim' | 'my_claims'>('policy');
  
  // Simulated available transactions for refund
  const [transactions, setTransactions] = useState<BillingTransaction[]>([
    {
      id: 'TXN-90821-COIN',
      itemTitle: '500 Eros Coins Refill Pack',
      type: 'coins',
      amountUsd: 4.99,
      date: '2026-10-27 (3 days ago)',
      paymentMethod: 'Apple Pay (•••• 4921)',
      status: 'completed',
      refundableCoins: 350,
      isEligibleForRefund: true
    },
    {
      id: 'TXN-88124-VIP',
      itemTitle: 'VIP Gold Elite Membership (1 Month)',
      type: 'vip_monthly',
      amountUsd: 14.99,
      date: '2026-10-15 (15 days ago)',
      paymentMethod: 'Mastercard (•••• 8820)',
      status: 'completed',
      isEligibleForRefund: true
    },
    {
      id: 'TXN-71209-COIN',
      itemTitle: '1,200 Eros Coins Deluxe Pack',
      type: 'coins',
      amountUsd: 9.99,
      date: '2026-09-12 (48 days ago)',
      paymentMethod: 'Google Pay',
      status: 'completed',
      refundableCoins: 0,
      isEligibleForRefund: false
    }
  ]);

  // Claims state
  const [claims, setClaims] = useState<RefundClaim[]>([
    {
      id: 'RFND-2026-9021',
      transactionId: 'TXN-66102-COIN',
      itemTitle: '200 Eros Coins Trial',
      amountRequested: 1.99,
      userEmail,
      reason: 'accidental_purchase',
      notes: 'Accidentally tapped purchase during livestream preview.',
      createdAt: '2026-10-20',
      status: 'completed',
      refundedTo: 'Apple Pay (•••• 4921)',
      payoutEta: 'Settled to Bank Oct 22'
    }
  ]);

  // Claim form state
  const [selectedTxnId, setSelectedTxnId] = useState<string>(initialTransactionId || 'TXN-90821-COIN');
  const [reason, setReason] = useState<RefundClaim['reason']>('unused_coins');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedClaim, setSubmittedClaim] = useState<RefundClaim | null>(null);

  if (!isOpen) return null;

  const selectedTxn = transactions.find(t => t.id === selectedTxnId);

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTxn) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newClaim: RefundClaim = {
        id: `RFND-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        transactionId: selectedTxn.id,
        itemTitle: selectedTxn.itemTitle,
        amountRequested: selectedTxn.amountUsd,
        userEmail,
        reason,
        notes: notes || 'Standard satisfaction guarantee request under 14-day policy.',
        createdAt: 'Just now',
        status: 'approved_instant',
        refundedTo: selectedTxn.paymentMethod,
        payoutEta: 'Approved instantly (1-2 business days to card)'
      };

      setClaims(prev => [newClaim, ...prev]);
      setTransactions(prev =>
        prev.map(t => (t.id === selectedTxn.id ? { ...t, status: 'processing_refund', isEligibleForRefund: false } : t))
      );
      setSubmittedClaim(newClaim);
      setIsSubmitting(false);
      setActiveTab('my_claims');

      if (onClaimSubmitted) {
        onClaimSubmitted(newClaim);
      }

      confetti({
        particleCount: 50,
        spread: 60,
        colors: ['#06b6d4', '#10b981', '#ec4899']
      });
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-purple-900/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header with Trust Firewall Badge */}
        <div className="p-4 sm:p-5 border-b border-purple-900/30 bg-zinc-900/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 p-0.5 shadow-lg shadow-pink-500/20">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-cyan-400">
                <RotateCcw className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                  The ErosDreamz Refund Firewall
                </h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  100% Guaranteed
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                14-Day Unspent Coin Refund • 30-Day VIP Satisfaction • Zero-Hassle Self Service
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

        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-800 bg-zinc-950 px-4 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('policy')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition flex items-center gap-1.5 border-b-2 ${
              activeTab === 'policy'
                ? 'border-cyan-400 text-cyan-300 bg-zinc-900/60'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Policy Terms & Rules</span>
          </button>
          <button
            onClick={() => setActiveTab('submit_claim')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition flex items-center gap-1.5 border-b-2 ${
              activeTab === 'submit_claim'
                ? 'border-pink-500 text-pink-300 bg-zinc-900/60'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4 text-pink-400" />
            <span>Claim Refund Now</span>
          </button>
          <button
            onClick={() => setActiveTab('my_claims')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition flex items-center gap-1.5 border-b-2 ${
              activeTab === 'my_claims'
                ? 'border-purple-500 text-purple-300 bg-zinc-900/60'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 text-purple-400" />
            <span>My Claims & Receipts ({claims.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-zinc-200">
          
          {/* TAB 1: POLICY TERMS */}
          {activeTab === 'policy' && (
            <div className="space-y-6">
              {/* Highlight Hero Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-purple-950/30 to-pink-950/30 border border-cyan-500/40 relative overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex-shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white">Our Ironclad Anti-Trap Guarantee</h4>
                    <p className="text-xs text-zinc-300 leading-relaxed mt-1">
                      Traditional dating apps trick you into annual contracts and non-refundable coin traps. ErosDreamz was built by and for men who respect honesty. If you aren't thrilled or didn't spend your coins, we return your money instantly.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Core Rules */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                    <Coins className="w-4 h-4" />
                    <span>Unspent Coins (14d)</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    100% refundable within 14 days of purchase as long as the coins remain in your wallet.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2 text-pink-400 font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>VIP Gold (30d)</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Try VIP Gold for up to 30 days. If you don't spark chemistry or love the radar, request a full refund.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                    <RotateCcw className="w-4 h-4" />
                    <span>Instant Automated Approval</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Claims under $50 qualify for instant algorithmic approval directly back to Apple Pay, Google Pay, or card.
                  </p>
                </div>
              </div>

              {/* Policy Checklist Details */}
              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3">
                <h5 className="text-xs font-black uppercase text-zinc-300 tracking-wider">
                  How The Refund Flow Works:
                </h5>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Select any eligible transaction from your past 30 days right here or in <strong className="text-cyan-300 font-mono">my.erosdreamz.app</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Choose your reason (e.g., accidental purchase, unspent coins, dissatisfied with service).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Receive instant confirmation with a traceable <strong className="text-pink-300 font-mono">RFND-2026</strong> reference number. Funds re-appear on your card in 1-2 business days.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lock className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>Your account remains 18+ verified and fully in good standing even if you request a refund. No penalties.</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('submit_claim')}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 hover:scale-105 transition flex items-center gap-2"
                >
                  <span>Submit a Refund Claim</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SUBMIT CLAIM */}
          {activeTab === 'submit_claim' && (
            <form onSubmit={handleSubmitClaim} className="space-y-5">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block mb-2">
                  Select Transaction to Refund
                </label>
                <div className="space-y-2">
                  {transactions.map(txn => (
                    <div
                      key={txn.id}
                      onClick={() => txn.isEligibleForRefund && setSelectedTxnId(txn.id)}
                      className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                        selectedTxnId === txn.id
                          ? 'bg-pink-500/15 border-pink-500 text-white'
                          : txn.isEligibleForRefund
                          ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          : 'bg-zinc-950 border-zinc-900 text-zinc-600 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${selectedTxnId === txn.id ? 'bg-pink-500 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>{txn.itemTitle}</span>
                            {txn.isEligibleForRefund ? (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400">Eligible</span>
                            ) : (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-500">Expired window</span>
                            )}
                          </div>
                          <div className="text-[10px] text-zinc-400 font-mono">
                            {txn.id} • {txn.date} • {txn.paymentMethod}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-white">${txn.amountUsd.toFixed(2)}</div>
                        <div className="text-[10px] text-cyan-400 font-mono">{txn.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTxn && (
                <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-zinc-400 block">Eligible Refund Amount:</span>
                    <span className="text-base font-black text-cyan-300">${selectedTxn.amountUsd.toFixed(2)} USD</span>
                  </div>
                  <div className="text-right text-[11px] text-zinc-400 font-mono">
                    Direct credit to {selectedTxn.paymentMethod}
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Reason for Request
                </label>
                <select
                  value={reason}
                  onChange={e => setReason(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="unused_coins">Unused Eros Coins (Within 14-day window)</option>
                  <option value="service_dissatisfaction">VIP Gold Satisfaction Guarantee (Within 30 days)</option>
                  <option value="accidental_purchase">Accidental or duplicate purchase</option>
                  <option value="technical_issue">App technical or streaming issue</option>
                  <option value="other">Other reason</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Tell us what happened so we can improve the app..."
                  rows={3}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-pink-500 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Protected by ErosDreamz Automatic Refund Processing Engine. No dispute fees.</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('policy')}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedTxn?.isEligibleForRefund}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 hover:scale-105 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Processing Instant Refund...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm & Process Refund (${selectedTxn?.amountUsd.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: MY CLAIMS */}
          {activeTab === 'my_claims' && (
            <div className="space-y-4">
              {submittedClaim && (
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/50 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Refund Claim Submitted Successfully!</span>
                  </div>
                  <div className="text-xs text-zinc-300">
                    Your claim for <strong className="text-white">${submittedClaim.amountRequested.toFixed(2)}</strong> ({submittedClaim.itemTitle}) has been approved instantly.
                  </div>
                  <div className="text-[11px] font-mono text-cyan-300">
                    Claim ID: {submittedClaim.id} • Payout: {submittedClaim.payoutEta}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h5 className="text-xs font-black uppercase text-zinc-400 tracking-wider">
                  Claims History ({claims.length})
                </h5>
                {claims.map(c => (
                  <div key={c.id} className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white">{c.itemTitle}</div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {c.status === 'approved_instant' ? 'Instant Approved' : 'Completed'}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono">
                      {c.id} • Txn: {c.transactionId} • ${c.amountRequested.toFixed(2)} USD
                    </div>
                    <div className="text-xs text-zinc-300 italic">"{c.notes}"</div>
                    <div className="text-[10px] text-cyan-400 font-mono pt-1 border-t border-zinc-800/60">
                      Destination: {c.refundedTo} • {c.payoutEta}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
