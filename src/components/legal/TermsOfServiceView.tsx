import React, { useState } from 'react';
import { 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  RotateCcw, 
  ArrowLeft, 
  AlertTriangle, 
  Coins, 
  Crown, 
  Lock, 
  Scale, 
  HelpCircle,
  ExternalLink,
  Flame
} from 'lucide-react';
import { ErosLogo } from '../ErosLogo';

interface TermsOfServiceViewProps {
  onBackToLanding: () => void;
  onNavigateTab: (tab: 'privacy' | 'terms' | 'safety' | 'support' | 'landing') => void;
  onOpenRefundCenter?: () => void;
}

export const TermsOfServiceView: React.FC<TermsOfServiceViewProps> = ({
  onBackToLanding,
  onNavigateTab,
  onOpenRefundCenter
}) => {
  const [activeSection, setActiveSection] = useState<string>('eligibility');

  const articles = [
    { id: 'eligibility', title: 'Article 1: Strictly 18+ Eligibility & Verification' },
    { id: 'conduct', title: 'Article 2: Community Code of Conduct & Zero-Tolerance' },
    { id: 'content', title: 'Article 3: 10-Second Video Reels & Content Ownership' },
    { id: 'vaults', title: 'Article 4: 35-Hour Private Vault Terms & Media Sharing' },
    { id: 'virtual-currency', title: 'Article 5: Eros Coins, VIP Subscriptions & Refunds' },
    { id: 'radar-safety', title: 'Article 6: Proximity Radar & Offline Meetups' },
    { id: 'termination', title: 'Article 7: Account Suspension & Termination' },
    { id: 'liability', title: 'Article 8: Limitation of Liability & Warranty Disclaimers' },
    { id: 'disputes', title: 'Article 9: Binding Arbitration & Class Action Waiver' },
    { id: 'modifications', title: 'Article 10: Changes to Terms & Contact' }
  ];

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
            className="px-3 py-1.5 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30"
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
            className="px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white transition"
          >
            Support Desk
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-950/40 via-zinc-900 to-purple-950/30 border border-pink-800/30 p-8 sm:p-12 mb-12">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 p-0.5 shadow-xl shadow-pink-500/20 flex-shrink-0">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-pink-400">
              <Scale className="w-8 h-8" />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold mb-3">
              <FileText className="w-3.5 h-3.5 text-pink-400" />
              <span>User Agreement • Last Updated: October 31, 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
              ErosDreamz Terms of Service
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              These Terms of Service constitute a legally binding agreement between you and ErosDreamz Inc. By accessing or using the ErosDreamz app, website, or associated services, you agree to comply with all terms herein.
            </p>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-zinc-800/80">
          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
            <div className="text-red-400 font-mono text-xs font-bold uppercase mb-1">Strictly 18+ Only</div>
            <p className="text-xs text-zinc-400 leading-snug">Zero minors permitted. Falsification of age results in immediate permanent ban and legal referral.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
            <div className="text-pink-400 font-mono text-xs font-bold uppercase mb-1">Consent & Safety First</div>
            <p className="text-xs text-zinc-400 leading-snug">Zero tolerance for non-consensual media, extortion, blackmail, or hate speech.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
            <div className="text-emerald-400 font-mono text-xs font-bold uppercase mb-1">24h Refund Grace Window</div>
            <p className="text-xs text-zinc-400 leading-snug">Accidental coin purchases or billing mistakes are protected by our automated refund workflow.</p>
          </div>
        </div>
      </div>

      {/* Main Layout: TOC + Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table of Contents */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              Articles Index
            </h3>
            <nav className="space-y-1">
              {articles.map(a => (
                <button
                  key={a.id}
                  onClick={() => {
                    setActiveSection(a.id);
                    const el = document.getElementById(a.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition flex items-center justify-between ${
                    activeSection === a.id
                      ? 'bg-pink-500/15 text-pink-300 font-bold border border-pink-500/30'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <span className="truncate">{a.title}</span>
                </button>
              ))}
            </nav>

            {onOpenRefundCenter && (
              <div className="pt-4 border-t border-zinc-800/80 space-y-2">
                <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Billing & Refunds
                </span>
                <button
                  onClick={onOpenRefundCenter}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/40 text-xs font-bold text-emerald-300 flex items-center justify-center gap-2 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Open Refund Center</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Articles Content */}
        <div className="lg:col-span-8 space-y-10 text-sm leading-relaxed text-zinc-300">
          {/* Article 1 */}
          <section id="eligibility" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-pink-400">Article 1.</span> Strictly 18+ Eligibility & Verification
            </h2>
            <p>
              ErosDreamz is strictly reserved for individuals who are at least <strong className="text-white">eighteen (18) years of age</strong> (or the legal age of majority in your jurisdiction). By registering or using the platform, you represent and warrant that:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300">
              <li>You are an adult male or identify within the adult male dating and social spectrum.</li>
              <li>You will submit to mandatory 18+ age verification and facial liveness checks as requested by the platform.</li>
              <li>You have never been convicted of a felony involving sexual assault or violent crimes, nor are you registered as a sex offender in any jurisdiction.</li>
              <li>You will not permit minors to access or view the ErosDreamz app on your device.</li>
            </ul>
          </section>

          {/* Article 2 */}
          <section id="conduct" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-red-400">Article 2.</span> Community Code of Conduct & Zero-Tolerance
            </h2>
            <p>
              We operate a community founded on enthusiastic consent, mutual respect, and adult discretion. You agree that you will <strong className="text-white">NOT</strong> under any circumstances:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl">
                <strong className="text-red-400 block mb-0.5">Non-Consensual Media & Blackmail</strong>
                Recording, screen-capturing, or redistributing private folder media, chat messages, or video streams without explicit written consent is grounds for immediate termination and referral to law enforcement.
              </div>
              <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl">
                <strong className="text-red-400 block mb-0.5">Commercial Solicitation & Prostitution</strong>
                Using ErosDreamz to solicit sex work, commercial escort services, or advertise illegal substances is strictly banned.
              </div>
              <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl">
                <strong className="text-red-400 block mb-0.5">Harassment & Hate Speech</strong>
                Racism, transphobia, biphobia, anti-queer slurs, doxxing, stalking, or sending repetitive unsolicited explicit media after being asked to stop is prohibited.
              </div>
            </div>
          </section>

          {/* Article 3 */}
          <section id="content" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-cyan-400">Article 3.</span> 10-Second Video Reels & Content Ownership
            </h2>
            <p>
              <strong>You retain 100% intellectual property ownership</strong> of any 10-second video clips, photos, or reaction clips you record and upload to ErosDreamz.
            </p>
            <p>
              By uploading a video to the public feed, you grant ErosDreamz a worldwide, non-exclusive, royalty-free, limited license to host, stream, display, and distribute that clip exclusively to other verified users within the service in accordance with your privacy and distance settings.
            </p>
            <p>
              This license terminates immediately when you delete your video or erase your account.
            </p>
          </section>

          {/* Article 4 */}
          <section id="vaults" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-pink-400">Article 4.</span> 35-Hour Private Vault Terms & Media Sharing
            </h2>
            <p>
              ErosDreamz provides Private Folders protected by a 35-Hour auto-relock mechanism. Granting access to your Private Folder creates a temporary, revocable viewing license:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300">
              <li>The recipient is strictly forbidden from downloading, saving, screenshotting, or reposting your private media.</li>
              <li>After 35 hours, all decryption tokens automatically expire, relocking the folder without notice.</li>
              <li>You may unilaterally revoke viewing permissions at any time prior to the 35-hour deadline.</li>
            </ul>
          </section>

          {/* Article 5 */}
          <section id="virtual-currency" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-amber-400">Article 5.</span> Eros Coins, VIP Subscriptions & Refunds
            </h2>
            <p>
              ErosDreamz offers virtual entertainment items including Eros Coins, Profile Boosts, and VIP Memberships:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300">
              <li><strong>No Real-World Cash Value:</strong> Coins and virtual gifts are digital entertainment tokens with no cash surrender value and cannot be exchanged for fiat currency.</li>
              <li><strong>VIP Subscriptions:</strong> Automatically renew at the close of each billing period (monthly or annual) unless cancelled at least 24 hours prior via your Apple App Store, Google Play, or ErosDreamz account settings.</li>
              <li>
                <strong>24-Hour Refund Grace Window:</strong> Accidental purchases, unintended renewals, or duplicate charges reported within 24 hours are eligible for immediate refund review through our Refund Center.
              </li>
            </ul>
          </section>

          {/* Article 6 */}
          <section id="radar-safety" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-purple-400">Article 6.</span> Proximity Radar & Offline Meetups
            </h2>
            <p>
              ErosDreamz provides nearby radar estimation tools to facilitate genuine social and romantic interactions. However, <strong>ErosDreamz does not conduct criminal background checks on all users</strong> beyond facial liveness age verification.
            </p>
            <p>
              You are solely responsible for your physical safety and interactions with other users, both on the platform and when meeting in person. Always follow the guidelines in our Safety Center.
            </p>
          </section>

          {/* Article 7 */}
          <section id="termination" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-red-400">Article 7.</span> Account Suspension & Termination
            </h2>
            <p>
              ErosDreamz reserves the right to immediately suspend, restrict, or permanently terminate your account, without refund of unused coins or memberships, if you violate these Terms, provide fraudulent verification, or pose a safety risk to other community members.
            </p>
          </section>

          {/* Article 8 */}
          <section id="liability" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-zinc-400">Article 8.</span> Limitation of Liability & Warranty Disclaimers
            </h2>
            <p>
              ErosDreamz is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. In no event shall ErosDreamz Inc., its directors, employees, or partners be liable for any indirect, incidental, punitive, or consequential damages resulting from user conduct or platform outages.
            </p>
          </section>

          {/* Article 9 */}
          <section id="disputes" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-cyan-400">Article 9.</span> Binding Arbitration & Class Action Waiver
            </h2>
            <p>
              Any dispute arising out of or relating to these Terms shall be resolved through binding, individual arbitration administered by the American Arbitration Association (AAA), rather than in court, with you and ErosDreamz each waiving the right to participate in a class-action lawsuit.
            </p>
          </section>

          {/* Article 10 */}
          <section id="modifications" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-pink-400">Article 10.</span> Changes to Terms & Contact
            </h2>
            <p>
              We may revise these Terms periodically. Continued use of ErosDreamz after changes are posted constitutes acceptance of the updated Terms. For legal inquiries, contact: <a href="mailto:legal@erosdreamz.app" className="text-pink-400 underline">legal@erosdreamz.app</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
