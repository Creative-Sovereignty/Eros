import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  Sparkles, 
  Mail, 
  Clock, 
  ShieldCheck, 
  RotateCcw,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { ErosLogo } from '../ErosLogo';

interface SupportCenterViewProps {
  onBackToLanding: () => void;
  onNavigateTab: (tab: 'privacy' | 'terms' | 'safety' | 'support' | 'landing') => void;
  onOpenRefundCenter?: () => void;
}

export const SupportCenterView: React.FC<SupportCenterViewProps> = ({
  onBackToLanding,
  onNavigateTab,
  onOpenRefundCenter
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq_1');

  // Ticket Form State
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketCategory, setTicketCategory] = useState('account_verification');
  const [ticketPriority, setTicketPriority] = useState('normal');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{ id: string; eta: string } | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const faqs = [
    {
      id: 'faq_1',
      category: 'Verification',
      q: 'Why does ErosDreamz require an 18+ facial liveness verification?',
      a: 'To guarantee an authentic, strictly adult (18+) community free of automated spam bots, underage users, and fraudulent catfishes. The biometric scan runs on-device via local landmark algorithms; your raw face geometry is never stored in a central database.'
    },
    {
      id: 'faq_2',
      category: 'Private Vaults',
      q: 'How does the 35-Hour Auto-Relocking Vault work?',
      a: 'When you share private folder media with another user, an encrypted access grant is created with an exact 35-hour lifespan. When the timer expires, the cryptographic decryption tokens self-destruct on our edge servers, locking the media immediately unless you choose to renew it.'
    },
    {
      id: 'faq_3',
      category: 'Video Reels',
      q: 'How do 10-Second Video Reactions work?',
      a: 'While watching any 10-second video stream clip, tap the "React" button. You can record a simultaneous video response or audio remark, which then displays as an interactive picture-in-picture overlay on the original clip with attribution.'
    },
    {
      id: 'faq_4',
      category: 'Radar & Proximity',
      q: 'Can other users pinpoint my exact home address on the Radar?',
      a: 'Never. ErosDreamz never transmits exact GPS coordinates. The radar engine calculates relative distance and applies a randomized 150m–300m Gaussian fuzzing offset, ensuring nearby guys know you are in the area without compromising your exact residential location.'
    },
    {
      id: 'faq_5',
      category: 'Billing & Refunds',
      q: 'What is the refund policy for accidental Eros Coin purchases?',
      a: 'We offer an automated 24-Hour Refund Grace Window for accidental coin purchases or duplicate billing. You can submit an instant claim via our Refund Station or contact billing@erosdreamz.app.'
    },
    {
      id: 'faq_6',
      category: 'Privacy',
      q: 'How does Incognito Mode protect my session?',
      a: 'When you activate Incognito Mode, your profile card is immediately hidden from the public radar grid and live video streams. You can browse nearby feeds and message existing connections completely undetected.'
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketEmail.includes('@') || !ticketSubject || !ticketMessage) {
      alert('Please fill out all required fields with a valid email.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      setSubmittedTicket({
        id: `TKT-${randomNum}-EROS`,
        eta: ticketPriority === 'urgent' ? 'Under 1 hour' : 'Under 3 hours'
      });
      setTicketSubject('');
      setTicketMessage('');
    }, 1200);
  };

  const handleCopyTicketId = () => {
    if (submittedTicket) {
      navigator.clipboard.writeText(submittedTicket.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full text-zinc-200">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition group"
        >
          <ArrowLeft className="w-4 h-4 text-pink-400 group-hover:-translate-x-1 transition" />
          <span>Back to Landing Page</span>
        </button>

        {/* Legal Hub Tabs */}
        <div className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => onNavigateTab('privacy')}
            className="px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white transition"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onNavigateTab('terms')}
            className="px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white transition"
          >
            Terms of Service
          </button>
          <button
            onClick={() => onNavigateTab('safety')}
            className="px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white transition"
          >
            Safety Center
          </button>
          <button
            onClick={() => onNavigateTab('support')}
            className="px-3 py-1.5 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30"
          >
            Support Desk
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950/40 via-zinc-900 to-purple-950/30 border border-cyan-800/30 p-8 sm:p-12 mb-12 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-500 p-0.5 shadow-xl shadow-cyan-500/20 flex-shrink-0">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-cyan-400">
              <HelpCircle className="w-8 h-8" />
            </div>
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>24/7 Global Member Support Desk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
              How Can We Help You Today?
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Find instant answers to frequent questions, troubleshoot video streams or 18+ verification, or submit a support ticket to our 24/7 concierge team.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-8 relative max-w-xl">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. 18+ verification, radar distance, refund, vault)..."
            className="w-full pl-12 pr-4 py-3.5 bg-black/80 border border-zinc-700 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition"
          />
        </div>
      </div>

      {/* Main Grid: FAQ Accordion + Submit Ticket */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* FAQs (8 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>Frequently Asked Questions</span>
            </h2>
            <span className="text-xs text-zinc-500 font-mono">
              {filteredFaqs.length} results
            </span>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map(faq => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-zinc-950 border border-zinc-800/80 overflow-hidden transition"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-zinc-900/40 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {faq.category}
                      </span>
                      <span className="text-sm font-bold text-white">{faq.q}</span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 border-t border-zinc-900 bg-zinc-900/20 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {onOpenRefundCenter && (
            <div className="mt-6 p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-white text-sm">Need to Request a Refund?</h3>
                <p className="text-xs text-zinc-400">Claims within 24 hours of purchase are fast-tracked automatically.</p>
              </div>
              <button
                onClick={onOpenRefundCenter}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 transition flex-shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Refund Station</span>
              </button>
            </div>
          )}
        </div>

        {/* Submit Ticket Form (5 Columns) */}
        <div className="lg:col-span-5">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-pink-400 uppercase tracking-wider mb-1">
                <Mail className="w-3.5 h-3.5" />
                <span>Open a Support Ticket</span>
              </div>
              <h3 className="text-xl font-black text-white">Direct Concierge Dispatch</h3>
              <p className="text-xs text-zinc-400 mt-1">Our engineering and safety team will respond to your registered email.</p>
            </div>

            <form onSubmit={handleTicketSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Your Email *
                </label>
                <input
                  type="email"
                  value={ticketEmail}
                  onChange={e => setTicketEmail(e.target.value)}
                  placeholder="alex@example.com"
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={ticketCategory}
                    onChange={e => setTicketCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="account_verification">18+ Verification</option>
                    <option value="vault_relock">35h Private Vault</option>
                    <option value="billing_refund">Billing & Refunds</option>
                    <option value="video_audio">Video & Audio Feed</option>
                    <option value="safety_report">Safety or Harassment</option>
                    <option value="bug_feature">App Bug / Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Priority
                  </label>
                  <select
                    value={ticketPriority}
                    onChange={e => setTicketPriority(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="normal">Normal (under 6h)</option>
                    <option value="high">High (under 2h)</option>
                    <option value="urgent">Urgent Safety (&lt; 1h)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={e => setTicketSubject(e.target.value)}
                  placeholder="Brief summary of issue..."
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Message Description *
                </label>
                <textarea
                  rows={4}
                  value={ticketMessage}
                  onChange={e => setTicketMessage(e.target.value)}
                  placeholder="Describe what occurred, your device model, and any error messages..."
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Submitting Ticket...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 fill-current" />
                    <span>Send Support Ticket</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Ticket Confirmation Modal */}
      {submittedTicket && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">Ticket Submitted!</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              We have received your support request. Our specialized response unit has been notified.
            </p>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-mono">Ticket ID:</span>
                <button
                  onClick={handleCopyTicketId}
                  className="flex items-center gap-1 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300"
                >
                  <span>{submittedTicket.id}</span>
                  {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Target Response Time:</span>
                <span className="text-emerald-400 font-bold">{submittedTicket.eta}</span>
              </div>
            </div>

            <button
              onClick={() => setSubmittedTicket(null)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-bold text-xs uppercase tracking-wider transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
