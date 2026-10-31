import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Download, 
  CheckCircle2, 
  FileText, 
  Globe, 
  ArrowLeft, 
  Clock, 
  Compass, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  Trash2,
  Check
} from 'lucide-react';
import { ErosLogo } from '../ErosLogo';

interface PrivacyPolicyViewProps {
  onBackToLanding: () => void;
  onNavigateTab: (tab: 'privacy' | 'terms' | 'safety' | 'support' | 'landing') => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({
  onBackToLanding,
  onNavigateTab
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [eraseRequested, setEraseRequested] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('intro');

  const handleDownloadArchive = () => {
    const mockUserData = {
      app: 'ErosDreamz - Male Video Dating & Radar',
      exportDate: new Date().toISOString(),
      account: {
        userId: 'user_alex_23',
        username: 'alex_r',
        verificationStatus: '18+_verified',
        verificationMethod: 'facial_liveness_biometrics',
        certificateHash: 'PLS-VER-98240-X19',
        verifiedAt: '2026-10-12T14:20:00Z',
        safetyPledgeAgreed: true
      },
      privacySettings: {
        radarFuzzingRadiusMeters: 250,
        incognitoSessionActive: true,
        vaultAutoRelockDurationHours: 35,
        thirdPartyDataSharing: false,
        adTrackingConsent: false
      },
      retentionPolicy: {
        vaultSelfDestruct: '35 hours from grant',
        rawBiometricsStored: false,
        exactGpsCoordinatesStored: false
      }
    };

    const blob = new Blob([JSON.stringify(mockUserData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `erosdreamz-privacy-archive-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const sections = [
    { id: 'intro', title: '1. Introduction & Core Privacy Pledge' },
    { id: 'biometrics', title: '2. 18+ Verification & Facial Liveness' },
    { id: 'vaults', title: '3. 35-Hour Auto-Relocking Vault Architecture' },
    { id: 'radar', title: '4. Geolocation Radar & Distance Obfuscation' },
    { id: 'data-collected', title: '5. Information We Collect & Why' },
    { id: 'videos', title: '6. 10-Second Video Streams & Reactions' },
    { id: 'sharing', title: '7. Zero Third-Party Data Selling' },
    { id: 'retention', title: '8. Data Retention & Right to be Forgotten' },
    { id: 'rights', title: '9. GDPR, CCPA & Global User Rights' },
    { id: 'contact', title: '10. Data Protection Officer (DPO) Contact' }
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

        {/* Quick Legal Hub Tabs */}
        <div className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => onNavigateTab('privacy')}
            className="px-3 py-1.5 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30"
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
            className="px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white transition"
          >
            Support Desk
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950/40 via-zinc-900 to-pink-950/30 border border-purple-800/30 p-8 sm:p-12 mb-12">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-pink-500 p-0.5 shadow-xl shadow-pink-500/20 flex-shrink-0">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-pink-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Version 4.2 • Effective Date: October 31, 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
              ErosDreamz Privacy Policy
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Your intimate life, identity, and proximity deserve absolute sovereignty. ErosDreamz is engineered with on-device biometric liveness, ephemeral 35-hour auto-relocking vaults, and fuzzy proximity masking to ensure your real-world safety.
            </p>
          </div>
        </div>

        {/* Core Guarantees 4-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-800/80">
          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
            <div className="text-amber-400 font-mono text-xs font-bold uppercase mb-1">Zero Data Selling</div>
            <p className="text-xs text-zinc-400 leading-snug">We never sell your identity, sexual orientation, or video reels to data brokers or advertisers.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
            <div className="text-cyan-400 font-mono text-xs font-bold uppercase mb-1">On-Device Liveness</div>
            <p className="text-xs text-zinc-400 leading-snug">Biometric verification is processed locally. We store verification tokens, never your raw facial geometry.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
            <div className="text-pink-400 font-mono text-xs font-bold uppercase mb-1">35-Hour Auto-Relock</div>
            <p className="text-xs text-zinc-400 leading-snug">Private vault share tokens automatically self-destruct after 35 hours unless manually renewed.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
            <div className="text-purple-400 font-mono text-xs font-bold uppercase mb-1">Fuzzy Radar Masking</div>
            <p className="text-xs text-zinc-400 leading-snug">Coordinates are injected with a 150m–300m randomized offset to prevent trilateration of your home address.</p>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sticky Sidebar TOC + In-Depth Legal Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table of Contents (Sticky on Desktop) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              Table of Contents
            </h3>
            <nav className="space-y-1">
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveSection(s.id);
                    const el = document.getElementById(s.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition flex items-center justify-between ${
                    activeSection === s.id
                      ? 'bg-pink-500/15 text-pink-300 font-bold border border-pink-500/30'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <span className="truncate">{s.title}</span>
                </button>
              ))}
            </nav>

            {/* User Privacy Tools Card */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-2">
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                Your Privacy Controls
              </span>
              <button
                onClick={handleDownloadArchive}
                className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-cyan-300 flex items-center justify-center gap-2 transition"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Archive Downloaded ✓</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Data Archive</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setEraseRequested(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-zinc-900/60 hover:bg-red-950/40 border border-zinc-800 hover:border-red-500/40 text-xs font-bold text-zinc-400 hover:text-red-400 flex items-center justify-center gap-2 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Request Account Deletion</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Articles */}
        <div className="lg:col-span-8 space-y-10 text-sm leading-relaxed text-zinc-300">
          {/* Section 1 */}
          <section id="intro" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-pink-400">1.</span> Introduction & Core Privacy Pledge
            </h2>
            <p>
              ErosDreamz Inc. (&quot;ErosDreamz&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the ErosDreamz video dating and proximity radar platform for adult men (18+). We understand that online dating, sexuality, and real-time geolocation involve sensitive personal information.
            </p>
            <p>
              Our guiding architecture is <strong className="text-white">Privacy by Design</strong>: we collect only the minimal data necessary to provide reliable 10-second video feeds, nearby radar matching, and strict anti-bot adult age verification. We operate with an uncompromising zero-tolerance stance against data-broker monetization.
            </p>
          </section>

          {/* Section 2 */}
          <section id="biometrics" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-cyan-400">2.</span> 18+ Verification & Facial Liveness
            </h2>
            <p>
              To maintain an exclusively adult, bot-free community, all members are required to pass an 18+ verification step before unlocking private folders and full messaging.
            </p>
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs space-y-2">
              <div className="font-bold text-cyan-300 uppercase tracking-wide">On-Device Facial Landmark Processing</div>
              <p className="text-zinc-300">
                When you perform the facial liveness scan, the mathematical landmark calculations run within your device&apos;s browser sandbox or local mobile runtime. ErosDreamz does <strong>not</strong> store your raw facial geometry, 3D face mesh, or biometric templates in our databases.
              </p>
              <p className="text-zinc-300">
                Upon successful confirmation, our system generates an immutable verification certificate token (e.g., <code className="text-cyan-300">PLS-VER-98240-X19</code>). Only this signed verification state is stored on your profile record.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="vaults" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-pink-400">3.</span> 35-Hour Auto-Relocking Vault Architecture
            </h2>
            <p>
              Traditional dating apps suffer from perpetual photo leaks where private media remains accessible indefinitely. ErosDreamz solves this through our proprietary <strong className="text-white">35-Hour Time-Decay Vault Token System</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300">
              <li>
                <strong>Time-Bound Decryption Grants:</strong> When you share access to your private folder with another user, an encrypted access grant is created with an exact 35-hour expiration timestamp.
              </li>
              <li>
                <strong>Automatic Relock:</strong> When 35 hours elapse, the decryption keys expire on our edge servers, immediately locking the folder without requiring manual intervention.
              </li>
              <li>
                <strong>Instant Manual Revocation:</strong> You can revoke private folder access at any second with a single tap from the chat thread or vault settings.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="radar" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-purple-400">4.</span> Geolocation Radar & Distance Obfuscation
            </h2>
            <p>
              The ErosDreamz Nearby Radar lets you find men in your immediate vicinity. To protect your home address and routine locations:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300">
              <li>
                <strong>No Exact GPS Broadcasting:</strong> We never broadcast your exact latitude and longitude to other users.
              </li>
              <li>
                <strong>Gaussian Coordinate Jitter:</strong> Our distance calculation engine applies a randomized 150m to 300m offset to your spatial coordinates, preventing malicious actors from using trilateration to pinpoint your physical dwelling.
              </li>
              <li>
                <strong>Incognito Mode:</strong> When you toggle Incognito Mode, your profile is hidden from the public radar grid entirely while you can still browse others.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="data-collected" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-cyan-400">5.</span> Information We Collect & Why
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800">
                <span className="font-bold text-white text-xs block mb-1">A. Account Credentials</span>
                <span className="text-xs text-zinc-400">Username, email or mobile number, hashed PIN/password, and age affirmation.</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800">
                <span className="font-bold text-white text-xs block mb-1">B. Profile & Vibe Information</span>
                <span className="text-xs text-zinc-400">Tribes (Jock, Bear, Twink, Otter, etc.), interests, bio text, and optional looking-for preferences.</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800">
                <span className="font-bold text-white text-xs block mb-1">C. Video Content</span>
                <span className="text-xs text-zinc-400">Your uploaded 10-second video clips, soundtrack audio selections, and video reactions.</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800">
                <span className="font-bold text-white text-xs block mb-1">D. Wallet & Transaction History</span>
                <span className="text-xs text-zinc-400">Eros Coin balances, VIP subscription status, and purchase timestamps. Payment card details are tokenized directly by Apple App Store, Google Play, or Stripe; ErosDreamz never sees or stores your full credit card number.</span>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="videos" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-pink-400">6.</span> 10-Second Video Streams & Reactions
            </h2>
            <p>
              Your public video stream clips are visible to nearby verified members based on your filter radius. All video uploads are scanned by automated moderation systems to prevent illegal content, non-consensual media, or copyright violations.
            </p>
            <p>
              Video reactions are overlaid on the creator&apos;s clip. You can delete any video you have uploaded or reaction you have recorded at any time, immediately purging it from client caches and edge distribution networks.
            </p>
          </section>

          {/* Section 7 */}
          <section id="sharing" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-amber-400">7.</span> Zero Third-Party Data Selling
            </h2>
            <p>
              ErosDreamz does <strong className="text-white">NOT</strong> sell, rent, license, or trade your personal data, chat history, or media to third-party ad exchanges, data brokers, or marketing aggregates.
            </p>
            <p>
              We do not embed third-party surveillance SDKs (such as Facebook Pixel or cross-app ad tracking networks). Our business model is sustained through transparent VIP memberships and voluntary Eros Coin purchases—not surveillance capitalism.
            </p>
          </section>

          {/* Section 8 */}
          <section id="retention" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-emerald-400">8.</span> Data Retention & Right to be Forgotten
            </h2>
            <p>
              We retain account data only as long as your account remains active. If you choose to delete your ErosDreamz account:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300">
              <li>All uploaded 10s video reels and reactions are permanently erased.</li>
              <li>All private vault media files are securely shredded using cryptographic zeroization.</li>
              <li>Your chat threads are removed from the recipient&apos;s active inbox.</li>
              <li>Your verification certificate hash is retired.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section id="rights" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-cyan-400">9.</span> GDPR, CCPA & Global User Rights
            </h2>
            <p>
              Regardless of your geographic jurisdiction, ErosDreamz extends universal privacy rights to all members:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300">
              <li><strong>Right of Access:</strong> Download a full machine-readable JSON archive of your account data.</li>
              <li><strong>Right to Rectification:</strong> Edit or correct your profile data, age verification details, or preferences.</li>
              <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Complete and irreversible deletion of all records.</li>
              <li><strong>Right to Restriction & Objection:</strong> Disable radar visibility or switch to incognito browsing at will.</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section id="contact" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-pink-400">10.</span> Data Protection Officer (DPO) Contact
            </h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, our dedicated Data Protection Officer can be reached directly:
            </p>
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs space-y-2">
              <div className="text-white font-bold">ErosDreamz Data Protection Office</div>
              <div>Email: <a href="mailto:privacy@erosdreamz.app" className="text-pink-400 underline">privacy@erosdreamz.app</a></div>
              <div>Urgent Inquiries: <a href="mailto:dpo@erosdreamz.app" className="text-cyan-400 underline">dpo@erosdreamz.app</a></div>
              <div className="text-zinc-500 pt-1">Response time: Within 24 business hours.</div>
            </div>
          </section>
        </div>
      </div>

      {/* Account Erasure Confirmation Modal */}
      {eraseRequested && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-red-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white">Request Account Erasure</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Submitting an erasure request will permanently delete your account, 10-second video stream, 35-hour private vault, and all chat history. This action cannot be reversed.
            </p>
            <div className="flex items-center gap-3 pt-3">
              <button
                onClick={() => {
                  alert('Account erasure request recorded. You will receive a final confirmation email within 1 hour.');
                  setEraseRequested(false);
                }}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition"
              >
                Confirm Deletion Request
              </button>
              <button
                onClick={() => setEraseRequested(false)}
                className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
