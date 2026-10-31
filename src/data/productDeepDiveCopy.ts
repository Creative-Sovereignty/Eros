export interface CopySnippet {
  id: string;
  category: 'headlines' | 'hooks' | 'ad_scripts' | 'feature_pitches' | 'refund_guarantee' | 'app_store_aso' | 'email_sequences' | 'faq_objections';
  title: string;
  copy: string;
  targetPlatform?: string;
  tone: string;
  tags: string[];
}

export const PRODUCT_DEEP_DIVE_BIBLE: {
  productName: string;
  tagline: string;
  positioning: string;
  elevatorPitch: string;
  targetAudience: string;
  corePillars: {
    title: string;
    subhead: string;
    description: string;
    highlights: string[];
  }[];
  snippets: CopySnippet[];
} = {
  productName: 'EROSDREAMZ',
  tagline: '10-Second Vibes Meet Nearby Sparks.',
  positioning: 'The high-octane intersection of TikTok short-form video and Grindr hyper-local proximity for modern men.',
  elevatorPitch:
    'ErosDreamz incinerates catfishing and dating fatigue with raw, authentic 10-second video feeds, a real-time radar grid, cryptographic 35-hour auto-relock private vaults, and a strict 18+ biometric liveness firewall. No still selfies from 2019. No endless texting with ghosts. Real energy. Real proximity. Real heat.',
  targetAudience:
    'Modern gay, bi, trans, and queer men (18+) who demand instant visual chemistry, uncompromising digital privacy, and zero wasted time in city nightlife hubs.',
  corePillars: [
    {
      title: 'The 10-Second Vibe Reel Engine',
      subhead: 'Motion Speaks Louder Than Still Selfies',
      description:
        'Still photos lie; 10 seconds of motion, voice, and unfiltered eye contact never do. ErosDreamz replaces the static profile grid with a lightning-fast vertical video stream engineered for instant emotional and physical resonance.',
      highlights: [
        'Zero photo manipulation: 10s maximum runtime forces authenticity',
        'Built-in soundtrack tags and live vibe indicators',
        'Instant flame taps and audio reactions right from the feed'
      ]
    },
    {
      title: 'Hyper-Local Proximity Radar Pulse',
      subhead: 'Sparks Within Walking Distance',
      description:
        'A real-time radar grid dynamically mapping active guys within 0.1 to 25 miles. Whether you are at a rooftop lounge in West Hollywood, Chelsea, Boystown, or traveling, your radar displays living proof of who is nearby right now.',
      highlights: [
        'Real-time distance sorting down to tenths of a mile',
        'Tribe and looking-for filters (Jock, Twink, Bear, Otter, Creative, Daddy)',
        'Stealth Ghost Mode for incognito browsing whenever desired'
      ]
    },
    {
      title: 'The 35-Hour Auto-Relock Vault',
      subhead: 'Zero Permanent Footprint Privacy',
      description:
        'Intimacy requires absolute digital trust. ErosDreamz features an industry-first 35-hour auto-relocking private vault. When you grant private media access to a match, the cryptographic key automatically expires in 35 hours unless re-approved.',
      highlights: [
        'Automatic time-based token revocation at exactly 35 hours',
        'Emergency 1-tap "Kill Switch" to wipe access across all users',
        'Anti-screenshot watermarking and zero server-side leaks'
      ]
    },
    {
      title: '18+ Biometric Liveness Firewall',
      subhead: 'Impenetrable Security at the Gates',
      description:
        'Every profile on ErosDreamz is anchored by an AI facial liveness scan and age-gate verification protocol. No bots, no underage users, no stolen celebrity pictures. Just genuine men ready to connect.',
      highlights: [
        'Real-time 3D facial mesh liveness detection',
        'Cryptographic certificate ID issued to verified profiles',
        'Community zero-tolerance moderation backed by AI text & video filters'
      ]
    },
    {
      title: 'The 100% Satisfaction & 14-Day Refund Firewall',
      subhead: 'Frictionless Trust and Zero-Risk Exploration',
      description:
        'We stand behind ErosDreamz with an ironclad, no-questions-asked refund policy. Unused Eros Coins are refundable within 14 days, and VIP Gold memberships carry a 30-day money-back guarantee. Trust is earned upfront.',
      highlights: [
        '100% refund on unspent coin packs within 14 days',
        '30-day money-back satisfaction guarantee for VIP Gold subscribers',
        'Self-service instant refund claim station inside my.erosdreamz.app'
      ]
    }
  ],
  snippets: [
    // HEADLINES & PUNCHY HOOKS
    {
      id: 'h1',
      category: 'headlines',
      title: 'Main Brand Hero Headline',
      tone: 'Bold, Electric, Direct',
      copy: '10-Second Vibes Meet Nearby Sparks. Stop Swiping Ghosts.',
      tags: ['Hero', 'Homepage', 'Above the Fold']
    },
    {
      id: 'h2',
      category: 'headlines',
      title: 'Anti-Catfish Punchline',
      tone: 'Irreverent, High Energy',
      copy: 'No Selfies From 2019. Just 10 Seconds of Real Heat.',
      tags: ['Anti-Catfish', 'Social Ads', 'ASO']
    },
    {
      id: 'h3',
      category: 'headlines',
      title: 'Nightlife & Spontaneity Hook',
      tone: 'Playful, Nightlife-Driven',
      copy: 'Who’s Out Tonight in WeHo? Check the Radar. Spark in 10s.',
      tags: ['Nightlife', 'Radar', 'Local']
    },
    {
      id: 'h4',
      category: 'headlines',
      title: 'Privacy & Control Power Slogan',
      tone: 'Confident, Protective',
      copy: 'Your Media. Your Rules. 35-Hour Auto-Relocking Vaults.',
      tags: ['Privacy', 'Vault', 'Security']
    },
    {
      id: 'h5',
      category: 'headlines',
      title: 'Speed & Action Hook',
      tone: 'Fast, Urgent',
      copy: 'Less Texting, More Chemistry. See Him Move Before You Say Hey.',
      tags: ['Conversion', 'Headline', 'Punchy']
    },

    // SOCIAL HOOKS (TIKTOK / REELS / TWITTER)
    {
      id: 'hk1',
      category: 'hooks',
      title: 'TikTok Viral Opening Hook #1',
      tone: 'Shocking, Relatable',
      copy: 'Dating apps in 2026 are broken because everyone looks completely different than their 3-year-old pictures. ErosDreamz fixed this with 10-second video check-ins only. Watch what happened when I turned on the radar in West Hollywood...',
      tags: ['TikTok', 'Reels', 'Viral']
    },
    {
      id: 'hk2',
      category: 'hooks',
      title: 'TikTok Viral Opening Hook #2 (Privacy Angle)',
      tone: 'Intriguing, Technical',
      copy: 'Why did 150,000 guys switch to ErosDreamz this month? Two words: 35-Hour Vaults. You share your private folder, and the app automatically locks it down in 35 hours flat. No permanent leaks. Here’s how it works.',
      tags: ['TikTok', 'Privacy', 'Reels']
    },
    {
      id: 'hk3',
      category: 'hooks',
      title: 'Twitter / X High-Engagement Thread Starter',
      tone: 'Authoritative, Controversial',
      copy: 'The "photo dating app" is officially dead. If you cannot hear a man’s voice or see his natural smile in motion within 10 seconds, you are wasting 3 weeks of messaging a fantasy. ErosDreamz is TikTok meets the radar grid—and it’s changing city dating forever. 🧵👇',
      tags: ['Twitter', 'Thread', 'Thought Leadership']
    },

    // AD SCRIPTS (VIDEO & DISPLAY)
    {
      id: 'ad1',
      category: 'ad_scripts',
      title: '30-Second TikTok / Meta Video Ad Script',
      tone: 'Fast-Paced, Dynamic, Authentic',
      copy: `[SCENE START]
0:00 - 0:03 [Visual: Fast cuts of handsome guys waving, laughing, checking in from rooftop bars and gyms on phone screens]
VOICEOVER: "Stop wasting hours chatting with profiles that haven’t been updated since 2020."

0:04 - 0:09 [Visual: Screen recording of ErosDreamz 10-second vertical video stream with glowing neon cyan/pink UI]
VOICEOVER: "Meet ErosDreamz. 10-second video vibes only. Real energy. Real voice. 100% verified 18+ liveness."

0:10 - 0:17 [Visual: User taps the radar tab. Nearby markers light up showing guys 0.2 miles away]
VOICEOVER: "Turn on the nearby radar to see who’s around your block right now. Drop an instant flame tap or send a cocktail."

0:18 - 0:24 [Visual: 35-Hour Vault icon clicks shut with neon lock animation]
VOICEOVER: "Plus, our 35-Hour Auto-Relock Vault protects your private moments automatically. Total control."

0:25 - 0:30 [Visual: App logo sparks. "Download on iOS & Android - erosdreamz.app"]
VOICEOVER: "Download ErosDreamz today. 10-second vibes meet nearby sparks."
[END SCENE]`,
      tags: ['Video Ad', 'Meta Ads', 'TikTok Ads']
    },
    {
      id: 'ad2',
      category: 'ad_scripts',
      title: 'Instagram Carousel Ad (5-Slide Storyboard)',
      tone: 'High Fashion, Cyber-Dark Luxury',
      copy: `SLIDE 1: "Tired of getting catfished? 💔 Still photos lie. Motion doesn't."
SLIDE 2: "10-Second Vibe Feed: Hear his voice, see his laugh, feel the chemistry instantly."
SLIDE 3: "Real-Time Proximity Radar: Guys nearby in your city right now. Filter by tribe & intentions."
SLIDE 4: "35-Hour Auto-Relock Vault: Share confidential moments that automatically self-destruct in 35h."
SLIDE 5: "100% Satisfaction & 14-Day Refund Guarantee. Tap to Launch ErosDreamz Now."`,
      tags: ['Instagram', 'Carousel', 'Display Ad']
    },

    // FEATURE PITCHES & DEEP DIVES
    {
      id: 'fp1',
      category: 'feature_pitches',
      title: 'The 10-Second Reel (Deep Dive Pitch)',
      tone: 'Evocative, Sensory',
      copy: 'In 10 seconds, human intuition decodes micro-expressions, posture, charisma, and vocal inflection that 1,000 photos could never convey. ErosDreamz curates a cinematic, swipe-free stream of active creators. You don’t just browse—you feel the room.',
      tags: ['Video', 'USP', 'Feature']
    },
    {
      id: 'fp2',
      category: 'feature_pitches',
      title: 'The Hyper-Local Radar Pulse (Deep Dive Pitch)',
      tone: 'Tech-Forward, Urban',
      copy: 'Built on sub-second spatial indexing, our Radar Pulse computes dynamic proximity without exposing precise GPS coordinates. Discover gym partners 0.2 miles away, drinks at 8 PM across the street, or community friends attending the same festival.',
      tags: ['Radar', 'Location', 'Feature']
    },
    {
      id: 'fp3',
      category: 'feature_pitches',
      title: 'The 35-Hour Auto-Relock Vault Protocol',
      tone: 'Security-Minded, Trust-Building',
      copy: 'Existing apps treat private media as an afterthought. ErosDreamz treats privacy as cryptographic law. Media placed in your private folder requires deliberate access keys with hardcoded 35-hour expiration limits. When the clock hits zero, the door locks automatically.',
      tags: ['Vault', 'Encryption', 'Feature']
    },

    // REFUND FIREWALL & SATISFACTION GUARANTEE COPY
    {
      id: 'rf1',
      category: 'refund_guarantee',
      title: 'The 100% Satisfaction & 14-Day Refund Firewall Statement',
      tone: 'Reassuring, Ironclad, Transparent',
      copy: `THE EROSDREAMZ REFUND FIREWALL GUARANTEE:
We refuse to trap anyone into subscriptions or unspent digital currency.
1. UNUSED EROS COINS: 100% refundable within 14 days of purchase. If you don't spend them, they're your money.
2. VIP GOLD SATISFACTION: If within 30 days of activating VIP Gold you feel ErosDreamz didn't elevate your dating life, submit an instant claim in our portal for a full prorated or total refund.
3. INSTANT SELF-SERVICE: Submit claims with 1 click directly in my.erosdreamz.app/billing. No customer support runaround. No hidden fine print.`,
      tags: ['Refund', 'Firewall', 'Guarantee', 'Trust']
    },
    {
      id: 'rf2',
      category: 'refund_guarantee',
      title: 'Checkout Page Guarantee Micro-Copy',
      tone: 'Concise, Friction-Eliminating',
      copy: '🛡️ Backed by the ErosDreamz 14-Day Refund Firewall. Cancel anytime with one tap. 100% money-back guarantee on unspent coins.',
      tags: ['Checkout', 'Micro-Copy', 'Conversion']
    },

    // APP STORE OPTIMIZATION (ASO)
    {
      id: 'aso1',
      category: 'app_store_aso',
      title: 'App Store / Google Play Title & Subtitle',
      tone: 'Search-Optimized, Punchy',
      copy: `Title: ErosDreamz: Male Video Dating & Nearby Radar
Subtitle: 10-Second Vibe Reels, West Hollywood & City Radar, 35h Private Vault`,
      tags: ['ASO', 'App Store', 'Google Play']
    },
    {
      id: 'aso2',
      category: 'app_store_aso',
      title: 'Full App Store Description',
      tone: 'Compelling, Structured, Keyword-Rich',
      copy: `Welcome to ErosDreamz—the world's first 10-second video dating and hyper-local proximity radar app built exclusively for modern men (18+).

WHY EROSDREAMZ IS DIFFERENT:
• 10-SECOND VIBE REELS: Skip static photos from five years ago. Watch authentic 10-second clips showing real motion, workouts, travel, and nightlife.
• LIVE PROXIMITY RADAR: Discover men nearby within 0.1 to 25 miles in real time. Filter by tribes (Jock, Otter, Bear, Twink, Creative, Daddy) and what you're looking for right now.
• 35-HOUR AUTO-RELOCK VAULT: Share intimate media with complete peace of mind. Access permissions automatically revoke after 35 hours unless renewed.
• 18+ LIVENESS FIREWALL: Zero bots. Zero underage users. Zero catfishing. AI-backed 3D facial liveness verification gives every user confidence.
• EROS COIN ECONOMY: Send luxury virtual gifts, boost your radar placement during peak weekend hours, and unlock VIP Gold ad-free browsing.
• THE REFUND FIREWALL: 100% satisfaction guarantee. 14-day refund window on unused coins with instant self-service claims.

Download ErosDreamz today and spark real chemistry in 10 seconds.`,
      tags: ['ASO', 'App Store Description', 'Keywords']
    },

    // EMAIL SEQUENCES & DRIP CAMPAIGNS
    {
      id: 'em1',
      category: 'email_sequences',
      title: 'Welcome Email (Day 0: After Login Firewall Passed)',
      tone: 'Warm, Seductive, Action-Oriented',
      copy: `Subject: Welcome to the Firewall 🔥 Your 10-second vibe awaits
Body:
Hey handsome,

Welcome to ErosDreamz. You just passed the 18+ Biometric Firewall into the most energetic male dating network on the planet.

Here is your 60-second quickstart checklist:
1. Upload your first 10-Second Vibe Reel (smile, say hi, or share your weekend vibe).
2. Tap "Nearby Radar" to see who is within walking distance right now.
3. Drop a Flame Tap or virtual cocktail to break the ice.

Remember: Your digital privacy is protected by our 35-Hour Auto-Relock Vault. You are in total control.

Ready to spark?
Launch the Stream: https://erosdreamz.app

Stay hot,
The ErosDreamz Team`,
      tags: ['Email', 'Welcome', 'Retention']
    },

    // FAQ & OBJECTION CRUSHERS
    {
      id: 'faq1',
      category: 'faq_objections',
      title: 'Objection Crusher: Why 10 seconds instead of photos?',
      tone: 'Direct, Evidentiary',
      copy: 'Photos can be filtered, angled, and taken in 2018. A 10-second video with live audio captures genuine posture, charisma, eye contact, and vocal tone. It saves you weeks of chatting with someone you have zero real-life chemistry with.',
      tags: ['FAQ', 'Objection', 'Video']
    },
    {
      id: 'faq2',
      category: 'faq_objections',
      title: 'Objection Crusher: What happens when the 35 hours end?',
      tone: 'Clear, Technical, Reassuring',
      copy: 'At the 35-hour mark, our cryptographic authorization token expires on device and server. The recipient can no longer see or download files in your private folder unless you explicitly tap "Renew Access". You can also revoke access instantly at any second.',
      tags: ['FAQ', 'Objection', 'Vault']
    },
    {
      id: 'faq3',
      category: 'faq_objections',
      title: 'Objection Crusher: How fast are refunds processed?',
      tone: 'Honest, Instant',
      copy: 'Our Refund Firewall is automated. When you request a refund for unspent Eros Coins or an accidental subscription within our 14-day window via my.erosdreamz.app, claims under $50 are reviewed and processed back to your original payment method automatically within 24-48 hours.',
      tags: ['FAQ', 'Objection', 'Refund']
    }
  ]
};
