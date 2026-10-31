export type Tribe = 
  | 'Jock'
  | 'Twink'
  | 'Otter'
  | 'Bear'
  | 'Geek'
  | 'Creative'
  | 'Daddy'
  | 'Discreet'
  | 'Queer'
  | 'Guy Next Door';

export type LookingFor = 
  | 'Dating & Romance'
  | 'Right Now / Spontaneous'
  | 'Drinks & Nightlife'
  | 'Gym & Fitness Partner'
  | 'Friends & Networking'
  | 'Long-term Relationship';

export interface User {
  id: string;
  name: string;
  username: string;
  age: number;
  avatar: string;
  bio: string;
  height: string;
  distanceMiles: number;
  locationName: string;
  isVerifiedAge: boolean;
  verificationMethod?: 'facial_liveness' | 'id_scan';
  verificationDate?: string;
  certificateId?: string;
  tribe: Tribe;
  lookingFor: LookingFor;
  isOnline: boolean;
  lastActive: string;
  tags: string[];
  vibes?: string[];
}

export interface SponsoredAdData {
  id: string;
  brandName: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  badgeText: string;
  promoCode?: string;
  logoUrl?: string;
  discountBadge?: string;
  rewardType?: 'boost' | 'super_flame' | 'ad_free_hour';
}

export interface VideoReaction {
  id: string;
  videoId: string;
  userId: string;
  user: User;
  videoUrl: string;
  posterUrl?: string;
  durationSec: number;
  caption?: string;
  reactionEmoji?: string;
  position?: 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left';
  createdAt: string;
  likesCount?: number;
  isLiked?: boolean;
}

export interface VideoItem {
  id: string;
  userId: string;
  user: User;
  videoUrl: string;
  posterUrl: string;
  caption: string;
  musicTitle: string;
  durationSec: number;
  tags: string[];
  hashtags?: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: string;
  isSponsoredAd?: boolean;
  adData?: SponsoredAdData;
  reactions?: VideoReaction[];
  reactionsCount?: number;
}

export interface Comment {
  id: string;
  videoId: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    isVerifiedAge: boolean;
  };
  text: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export type MessageReadStatus = 'sent' | 'delivered' | 'read';

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isMine: boolean;
  mediaType?: 'text' | 'flame' | 'video' | 'location';
  mediaUrl?: string;
  readStatus?: MessageReadStatus;
}

// Support both 'Message' and 'ChatMessage' type names
export type Message = ChatMessage;

export interface ChatThread {
  id: string;
  participant: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
  isConnected?: boolean;
  isMutualMatch?: boolean;
  bothLiked?: boolean;
  matchedAt?: string;
  isPrivateChat?: boolean;
}

export interface AgeVerificationState {
  isVerified: boolean;
  dob?: string;
  verifiedAge?: number;
  method?: 'facial_liveness' | 'id_scan';
  certificateId?: string;
  verifiedAt?: string;
  safetyPledgeAgreed: boolean;
}

export type ConnectionStatus = 'none' | 'pending_sent' | 'pending_received' | 'connected' | 'declined';

export interface ConnectionRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  user: User;
  sentAt: string;
  status: 'pending' | 'accepted' | 'declined';
  introMessage?: string;
}

export interface VirtualGift {
  id: string;
  name: string;
  icon: string;
  coinCost: number;
  animation: 'sparkle' | 'flame' | 'burst' | 'crown' | 'cocktail';
  description: string;
}

export interface SentGift {
  id: string;
  giftId: string;
  gift: VirtualGift;
  fromUserId: string;
  toUserId: string;
  sentAt: string;
}

export interface UserWallet {
  coins: number;
  activeBoostUntil: number | null; // timestamp ms
  isVipMember: boolean;
  vipExpiresAt: string | null;
}

export interface CoinPackage {
  id: string;
  coins: number;
  price: string;
  numericPrice: number;
  bonusText?: string;
  popular?: boolean;
}

export interface PrivateFolderItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption?: string;
  addedAt: string;
}

export interface PrivateFolderGrant {
  targetUserId: string;
  grantedAt: number; // timestamp
  expiresAt: number; // timestamp (35 hours after grantedAt)
}

export interface PrivateFolderData {
  items: PrivateFolderItem[];
  accessGrants: Record<string, PrivateFolderGrant>; // targetUserId -> grant
}

export interface ModerationScanResult {
  isApproved: boolean;
  safetyScore: number;
  flaggedCategories: string[];
  explanation?: string;
}

export interface ContentReport {
  id: string;
  targetType: 'video' | 'user' | 'message';
  targetId: string;
  targetName: string;
  category: 'inappropriate_public' | 'underage_suspect' | 'harassment' | 'hate_speech' | 'spam_scam';
  description: string;
  reportedAt: string;
  status: 'reviewing' | 'action_taken' | 'dismissed';
}

export interface MatchFilterSettings {
  minAge: number;
  maxAge: number;
  maxDistance: number;
  selectedInterests: string[];
  onlineOnly: boolean;
  verifiedOnly: boolean;
  tribe: string;
  lookingFor: string;
}

export interface BillingTransaction {
  id: string;
  itemTitle: string;
  type: 'coins' | 'vip_monthly' | 'vip_yearly' | 'boost';
  amountUsd: number;
  date: string;
  paymentMethod: string;
  status: 'completed' | 'refunded' | 'processing_refund';
  refundableCoins?: number;
  isEligibleForRefund: boolean;
}

export interface RefundClaim {
  id: string;
  transactionId: string;
  itemTitle: string;
  amountRequested: number;
  userEmail: string;
  reason: 'accidental_purchase' | 'service_dissatisfaction' | 'unused_coins' | 'technical_issue' | 'other';
  notes: string;
  createdAt: string;
  status: 'approved_instant' | 'under_review' | 'completed';
  refundedTo: string;
  payoutEta: string;
}

