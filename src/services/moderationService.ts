import { ModerationScanResult, ContentReport } from '../types';

// Sensitive / prohibited patterns for public streams and messages
const BANNED_PATTERNS = [
  { pattern: /\b(underage|jailbait|minor|teen\s*boy)\b/i, category: 'underage_risk', reason: 'Zero tolerance: strict 18+ policy for all interactions' },
  { pattern: /\b(wire\s*money|cashapp\s*me|send\s*btc|gift\s*card\s*code|venmo\s*advance)\b/i, category: 'commercial_scam', reason: 'Commercial solicitation or scam detection' },
  { pattern: /\b(hate|slur|kill\s*yourself|kys)\b/i, category: 'harassment', reason: 'Severe harassment and hate speech violation' }
];

export const scanTextContent = (text: string): ModerationScanResult => {
  if (!text) return { isApproved: true, safetyScore: 100, flaggedCategories: [] };

  const flagged: string[] = [];
  let explanation = '';

  for (const rule of BANNED_PATTERNS) {
    if (rule.pattern.test(text)) {
      flagged.push(rule.category);
      explanation = rule.reason;
    }
  }

  if (flagged.length > 0) {
    return {
      isApproved: false,
      safetyScore: 35,
      flaggedCategories: flagged,
      explanation
    };
  }

  return {
    isApproved: true,
    safetyScore: 99,
    flaggedCategories: []
  };
};

export const scanPublicVideo = (caption: string, tags: string[]): ModerationScanResult => {
  const combined = `${caption} ${tags.join(' ')}`;
  const textCheck = scanTextContent(combined);
  if (!textCheck.isApproved) {
    return textCheck;
  }

  // AI simulated video neural scan (checks public stream nudity / safety guidelines)
  const isSuspicious = /\b(nsfw|explicit|leaked)\b/i.test(combined);
  if (isSuspicious) {
    return {
      isApproved: false,
      safetyScore: 42,
      flaggedCategories: ['inappropriate_public_stream'],
      explanation: 'Public FYP Stream Guidelines: Explicit sexual content is prohibited on public feeds. Use your Private Folder instead.'
    };
  }

  return {
    isApproved: true,
    safetyScore: 98.6,
    flaggedCategories: [],
    explanation: 'AI Neural Frame Pass: Visual stream meets community standards for public distribution.'
  };
};

export const scanPrivateFolderItem = (): ModerationScanResult => {
  // Members may store what they want in the private folder. Auto-relocks after 35 hours.
  return {
    isApproved: true,
    safetyScore: 100,
    flaggedCategories: [],
    explanation: 'Private Folder Exemption: Personal vault content is encrypted and excluded from public AI feed indexing. Access auto-expires in 35 hours.'
  };
};

// In-memory list of submitted reports for admin review simulation
export const INITIAL_REPORTS: ContentReport[] = [
  {
    id: 'rep_101',
    targetType: 'user',
    targetId: 'user_suspect_1',
    targetName: '@spambot_deals',
    category: 'spam_scam',
    description: 'Sending unsolicited external cashapp links via tap messages.',
    reportedAt: '1 hour ago',
    status: 'action_taken'
  }
];
