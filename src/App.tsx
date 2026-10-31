import React, { useState, useEffect } from 'react';
import { 
  User, 
  VideoItem, 
  Comment, 
  ChatThread, 
  ChatMessage, 
  SponsoredAdData, 
  AgeVerificationState,
  ConnectionRequest,
  ConnectionStatus,
  VirtualGift,
  UserWallet,
  PrivateFolderItem,
  PrivateFolderGrant,
  ContentReport,
  MatchFilterSettings,
  VideoReaction
} from './types';
import { 
  INITIAL_CURRENT_USER, 
  MOCK_USERS, 
  MOCK_VIDEOS, 
  MOCK_COMMENTS, 
  MOCK_CHAT_THREADS,
  INITIAL_CONNECTION_REQUESTS,
  INITIAL_PRIVATE_FOLDER_ITEMS,
  INITIAL_OTHER_PRIVATE_FOLDERS,
  INITIAL_VIDEO_REACTIONS
} from './data/mockData';
import { scanTextContent, INITIAL_REPORTS } from './services/moderationService';
import { Navbar, AppNavTab } from './components/Navbar';
import { VideoFeed } from './components/VideoFeed';
import { RadarGrid } from './components/RadarGrid';
import { MessagesView } from './components/MessagesView';
import { ProfileView } from './components/ProfileView';
import { AgeVerificationModal } from './components/AgeVerificationModal';
import { VideoCreatorModal } from './components/VideoCreatorModal';
import { VideoReactionRecorderModal } from './components/VideoReactionRecorderModal';
import { CommentsDrawer } from './components/CommentsDrawer';
import { UserProfileModal } from './components/UserProfileModal';
import { SponsoredAdModal } from './components/SponsoredAdModal';
import { RewardedAdModal } from './components/RewardedAdModal';
import { MonetizationModal } from './components/MonetizationModal';
import { PrivateFolderModal } from './components/PrivateFolderModal';
import { ReportModal } from './components/ReportModal';
import { MatchFilterModal } from './components/MatchFilterModal';
import { ConnectionRequestsModal } from './components/ConnectionRequestsModal';
import { LostPasswordModal } from './components/LostPasswordModal';
import { UploadBestPracticesModal } from './components/UploadBestPracticesModal';
import { LoginFirewallGate } from './components/LoginFirewallGate';
import { RefundPolicyModal } from './components/RefundPolicyModal';
import { LandingPricingBlogView } from './components/LandingPricingBlogView';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const THIRTY_FIVE_HOURS_MS = 35 * 60 * 60 * 1000;

export default function App() {
  // Login Firewall starts active at the app's beginning
  const [isFirewallLocked, setIsFirewallLocked] = useState<boolean>(true);
  const [showLandingPage, setShowLandingPage] = useState<boolean>(false);
  const [landingInitialTab, setLandingInitialTab] = useState<'landing' | 'pricing' | 'blog' | 'downloads' | 'privacy' | 'terms' | 'safety' | 'support'>('landing');

  const handleOpenLandingPage = (tab: any = 'landing') => {
    const validTabs = ['landing', 'pricing', 'blog', 'downloads', 'privacy', 'terms', 'safety', 'support'] as const;
    const targetTab = typeof tab === 'string' && (validTabs as readonly string[]).includes(tab)
      ? (tab as typeof validTabs[number])
      : 'landing';
    setLandingInitialTab(targetTab);
    setShowLandingPage(true);
  };
  const [currentTab, setCurrentTab] = useState<AppNavTab>('stream');
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_CURRENT_USER);
  const [videos, setVideos] = useState<VideoItem[]>(MOCK_VIDEOS);
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>(MOCK_COMMENTS);
  const [threads, setThreads] = useState<ChatThread[]>(MOCK_CHAT_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  // Refund Firewall state
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [refundTargetTxnId, setRefundTargetTxnId] = useState<string | undefined>(undefined);
  const [isLostPasswordOpen, setIsLostPasswordOpen] = useState(false);
  const [isBestPracticesOpen, setIsBestPracticesOpen] = useState(false);

  // Connection matching
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>(INITIAL_CONNECTION_REQUESTS);
  const [connectionStatuses, setConnectionStatuses] = useState<Record<string, ConnectionStatus>>({
    user_marcus: 'pending_received',
    user_kai: 'pending_received'
  });

  // Monetization & Wallet
  const [wallet, setWallet] = useState<UserWallet>({
    coins: 350,
    activeBoostUntil: null,
    isVipMember: false,
    vipExpiresAt: null
  });

  // Private Folder Vault (with 35-hour auto-relock)
  const [myPrivateItems, setMyPrivateItems] = useState<PrivateFolderItem[]>(INITIAL_PRIVATE_FOLDER_ITEMS);
  const [otherPrivateFolders, setOtherPrivateFolders] = useState<Record<string, PrivateFolderItem[]>>(INITIAL_OTHER_PRIVATE_FOLDERS);
  const [privateFolderGrants, setPrivateFolderGrants] = useState<Record<string, PrivateFolderGrant>>({
    user_marcus: {
      targetUserId: 'user_marcus',
      grantedAt: Date.now() - 2 * 60 * 60 * 1000,
      expiresAt: Date.now() + (33 * 60 * 60 * 1000) // 33 hours remaining
    }
  });

  // Match Filters
  const [filters, setFilters] = useState<MatchFilterSettings>({
    minAge: 18,
    maxAge: 60,
    maxDistance: 25,
    selectedInterests: [],
    onlineOnly: false,
    verifiedOnly: false,
    tribe: 'All',
    lookingFor: 'All'
  });

  // Content Moderation & Reports
  const [reports, setReports] = useState<ContentReport[]>(INITIAL_REPORTS);
  const [reportTarget, setReportTarget] = useState<{ type: 'video' | 'user' | 'message'; id: string; name: string } | null>(null);

  // Age verification state
  const [verificationState, setVerificationState] = useState<AgeVerificationState>(() => {
    const saved = localStorage.getItem('pulse_age_verification');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return {
      isVerified: true,
      dob: '2000-06-15',
      verifiedAge: 26,
      method: 'facial_liveness',
      certificateId: 'PLS-VER-98240-X19',
      verifiedAt: '2026-10-12T14:20:00Z',
      safetyPledgeAgreed: true
    };
  });

  // Modals state
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRewardedModalOpen, setIsRewardedModalOpen] = useState(false);
  const [activeSponsoredAd, setActiveSponsoredAd] = useState<SponsoredAdData | null>(null);
  const [inspectingUser, setInspectingUser] = useState<User | null>(null);
  const [commentingVideoId, setCommentingVideoId] = useState<string | null>(null);
  const [isAdFreeUser, setIsAdFreeUser] = useState<boolean>(false);

  // New Modals
  const [isMonetizationModalOpen, setIsMonetizationModalOpen] = useState(false);
  const [monetizationInitialTab, setMonetizationInitialTab] = useState<'coins' | 'boost' | 'vip' | 'gifts'>('coins');
  const [giftRecipient, setGiftRecipient] = useState<User | null>(null);
  const [isPrivateFolderModalOpen, setIsPrivateFolderModalOpen] = useState(false);
  const [targetPrivateFolderUser, setTargetPrivateFolderUser] = useState<User | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isConnectionRequestsModalOpen, setIsConnectionRequestsModalOpen] = useState(false);

  // Video Reactions (Overlay on 10s streams)
  const [videoReactionsMap, setVideoReactionsMap] = useState<Record<string, VideoReaction[]>>(INITIAL_VIDEO_REACTIONS);
  const [isReactionModalOpen, setIsReactionModalOpen] = useState(false);
  const [targetReactionVideo, setTargetReactionVideo] = useState<VideoItem | null>(null);

  // Incognito Stealth Mode
  const [isIncognitoMode, setIsIncognitoMode] = useState<boolean>(true);

  // Filter out ads if user is ad-free or has VIP Gold
  const displayVideos = (isAdFreeUser || wallet.isVipMember)
    ? videos.filter(v => !v.isSponsoredAd)
    : videos;

  // Adding a Video Reaction
  const handleAddVideoReaction = (videoId: string, reaction: VideoReaction) => {
    setVideoReactionsMap(prev => ({
      ...prev,
      [videoId]: [reaction, ...(prev[videoId] || [])]
    }));

    setVideos(prev =>
      prev.map(v => {
        if (v.id === videoId) {
          const currentReactions = v.reactions || [];
          return {
            ...v,
            reactions: [reaction, ...currentReactions],
            reactionsCount: (v.reactionsCount || currentReactions.length) + 1
          };
        }
        return v;
      })
    );
  };

  // Liking a Video Reaction
  const handleLikeReaction = (videoId: string, reactionId: string) => {
    setVideoReactionsMap(prev => {
      const list = prev[videoId] || [];
      return {
        ...prev,
        [videoId]: list.map(r => {
          if (r.id === reactionId) {
            const isLiked = !r.isLiked;
            return {
              ...r,
              isLiked,
              likesCount: (r.likesCount || 0) + (isLiked ? 1 : -1)
            };
          }
          return r;
        })
      };
    });

    setVideos(prev =>
      prev.map(v => {
        if (v.id === videoId && v.reactions) {
          return {
            ...v,
            reactions: v.reactions.map(r => {
              if (r.id === reactionId) {
                const isLiked = !r.isLiked;
                return {
                  ...r,
                  isLiked,
                  likesCount: (r.likesCount || 0) + (isLiked ? 1 : -1)
                };
              }
              return r;
            })
          };
        }
        return v;
      })
    );
  };

  // Liking a video
  const handleLikeVideo = (videoId: string) => {
    setVideos(prev =>
      prev.map(v => {
        if (v.id === videoId) {
          const isLiked = !v.isLiked;
          return {
            ...v,
            isLiked,
            likesCount: isLiked ? v.likesCount + 1 : v.likesCount - 1
          };
        }
        return v;
      })
    );
  };

  // Adding a comment
  const handleAddComment = (videoId: string, text: string) => {
    const scan = scanTextContent(text);
    if (!scan.isApproved) {
      alert(`AI Moderation Filter: ${scan.explanation}`);
      return;
    }

    const newComment: Comment = {
      id: `c_${Date.now()}`,
      videoId,
      user: {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        isVerifiedAge: currentUser.isVerifiedAge
      },
      text,
      createdAt: 'Just now',
      likes: 0,
      isLiked: false
    };

    setCommentsMap(prev => ({
      ...prev,
      [videoId]: [newComment, ...(prev[videoId] || [])]
    }));

    setVideos(prev =>
      prev.map(v => (v.id === videoId ? { ...v, commentsCount: v.commentsCount + 1 } : v))
    );
  };

  // Liking a comment
  const handleLikeComment = (videoId: string, commentId: string) => {
    setCommentsMap(prev => {
      const list = prev[videoId] || [];
      return {
        ...prev,
        [videoId]: list.map(c => {
          if (c.id === commentId) {
            const isLiked = !c.isLiked;
            return {
              ...c,
              isLiked,
              likes: isLiked ? c.likes + 1 : c.likes - 1
            };
          }
          return c;
        })
      };
    });
  };

  // Publishing a newly created 10-second video
  const handlePublishVideo = (newVideo: VideoItem) => {
    setVideos(prev => [newVideo, ...prev]);
    setCurrentTab('stream');
  };

  // Start chat thread
  const handleStartChat = (user: User) => {
    let existing = threads.find(t => t.participant.id === user.id);
    if (!existing) {
      existing = {
        id: `thread_${user.id}`,
        participant: user,
        lastMessage: 'Started new conversation',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: []
      };
      setThreads(prev => [existing!, ...prev]);
    }
    setActiveThreadId(existing.id);
    setCurrentTab('messages');
  };

  // Send message in thread (with AI moderation check)
  const handleSendMessage = (threadId: string, text: string, mediaType: 'text' | 'flame' | 'location' = 'text') => {
    // AI message text moderation
    if (mediaType === 'text') {
      const scan = scanTextContent(text);
      if (!scan.isApproved) {
        alert(`AI Security Flag: ${scan.explanation}`);
        return;
      }
    }

    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      senderId: currentUser.id,
      receiverId: '',
      text,
      timestamp: 'Just now',
      isMine: true,
      mediaType,
      readStatus: 'sent'
    };

    setThreads(prev =>
      prev.map(t => {
        if (t.id === threadId) {
          return {
            ...t,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...t.messages, newMsg]
          };
        }
        return t;
      })
    );

    // Progression 1: Delivered after 700ms
    setTimeout(() => {
      setThreads(prevThreads =>
        prevThreads.map(t => {
          if (t.id === threadId) {
            return {
              ...t,
              messages: t.messages.map(m =>
                m.id === newMsg.id ? { ...m, readStatus: 'delivered' } : m
              )
            };
          }
          return t;
        })
      );
    }, 700);

    // Progression 2: Read checkmarks after 1500ms
    setTimeout(() => {
      setThreads(prevThreads =>
        prevThreads.map(t => {
          if (t.id === threadId) {
            return {
              ...t,
              messages: t.messages.map(m =>
                m.id === newMsg.id ? { ...m, readStatus: 'read' } : m
              )
            };
          }
          return t;
        })
      );
    }, 1500);

    // Simulated authentic instant response after 2.3 seconds
    setTimeout(() => {
      const responses = [
        'Hey! Loved your 10-second check-in 🔥',
        'Hey handsome! Great to connect. Are you free this evening?',
        'West Hollywood is buzzing right now! Want to grab a drink? 🍸',
        'Appreciate the flame! Your energy is super attractive 🔥',
        'Hey! Just got back from a workout. How is your night going?'
      ];
      const randomReply = responses[Math.floor(Math.random() * responses.length)];

      const replyMsg: ChatMessage = {
        id: `m_reply_${Date.now()}`,
        senderId: 'partner',
        receiverId: currentUser.id,
        text: randomReply,
        timestamp: 'Just now',
        isMine: false
      };

      setThreads(prevThreads =>
        prevThreads.map(t => {
          if (t.id === threadId) {
            return {
              ...t,
              lastMessage: randomReply,
              lastMessageTime: 'Just now',
              messages: [...t.messages, replyMsg]
            };
          }
          return t;
        })
      );
    }, 2300);
  };

  // Send quick Tap from video or profile
  const handleSendTap = (user: User, prompt: string) => {
    let thread = threads.find(t => t.participant.id === user.id);
    if (!thread) {
      thread = {
        id: `thread_${user.id}`,
        participant: user,
        lastMessage: prompt,
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `m_tap_${Date.now()}`,
            senderId: currentUser.id,
            receiverId: user.id,
            text: prompt,
            timestamp: 'Just now',
            isMine: true
          }
        ]
      };
      setThreads(prev => [thread!, ...prev]);
    } else {
      handleSendMessage(thread.id, prompt, 'flame');
    }
  };

  // CONNECTION SYSTEM: Send Connection Request
  const handleSendConnectionRequest = (user: User) => {
    setConnectionStatuses(prev => ({
      ...prev,
      [user.id]: 'pending_sent'
    }));

    const newReq: ConnectionRequest = {
      id: `req_${Date.now()}`,
      fromUserId: currentUser.id,
      toUserId: user.id,
      user: user,
      sentAt: 'Just now',
      status: 'pending',
      introMessage: 'Sent you a connection request on ErosDreamz!'
    };

    setConnectionRequests(prev => [newReq, ...prev]);

    confetti({ particleCount: 40, spread: 50 });
    alert(`Connection request sent to ${user.name}!`);
  };

  // Accept Connection Request
  const handleAcceptConnectionRequest = (reqId: string, user: User) => {
    setConnectionRequests(prev =>
      prev.map(r => (r.id === reqId ? { ...r, status: 'accepted' } : r))
    );

    setConnectionStatuses(prev => ({
      ...prev,
      [user.id]: 'connected'
    }));

    // Start or unlock thread
    handleStartChat(user);
    setIsConnectionRequestsModalOpen(false);
  };

  // Decline Connection Request
  const handleDeclineConnectionRequest = (reqId: string) => {
    setConnectionRequests(prev =>
      prev.map(r => (r.id === reqId ? { ...r, status: 'declined' } : r))
    );
  };

  // MONETIZATION: Coins, Boost, VIP, Gifts
  const handlePurchaseCoins = (coins: number, priceString: string) => {
    setWallet(prev => ({
      ...prev,
      coins: prev.coins + coins
    }));
  };

  const handleActivateBoost = (minutes: number, cost: number) => {
    setWallet(prev => ({
      ...prev,
      coins: prev.coins - cost,
      activeBoostUntil: Date.now() + (minutes * 60 * 1000)
    }));
    alert(`⚡ Profile Surge Activated for ${minutes} minutes! Your profile is now prioritized in nearby radar.`);
  };

  const handleUpgradeVip = () => {
    setWallet(prev => ({
      ...prev,
      isVipMember: true,
      vipExpiresAt: '2027-10-15'
    }));
    setIsAdFreeUser(true);
    alert('★ Welcome to ErosDreamz VIP Gold! Advanced filters and ad-free access are now active.');
  };

  const handleSendGift = (gift: VirtualGift, recipient: User) => {
    if (wallet.coins < gift.coinCost) {
      alert('Insufficient coins. Refill your Eros Wallet to send this gift.');
      return;
    }

    setWallet(prev => ({ ...prev, coins: prev.coins - gift.coinCost }));

    // Send gift message into thread
    let thread = threads.find(t => t.participant.id === recipient.id);
    const giftText = `Sent a luxury virtual gift: ${gift.icon} ${gift.name} (${gift.coinCost} Coins)`;

    if (!thread) {
      thread = {
        id: `thread_${recipient.id}`,
        participant: recipient,
        lastMessage: giftText,
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `m_gift_${Date.now()}`,
            senderId: currentUser.id,
            receiverId: recipient.id,
            text: giftText,
            timestamp: 'Just now',
            isMine: true,
            mediaType: 'flame'
          }
        ]
      };
      setThreads(prev => [thread!, ...prev]);
    } else {
      handleSendMessage(thread.id, giftText, 'flame');
    }

    alert(`Sent ${gift.name} ${gift.icon} to ${recipient.name}!`);
  };

  // PRIVATE FOLDER: 35-Hour Auto-Relock Management
  const handleAddMyPrivateItem = (item: PrivateFolderItem) => {
    setMyPrivateItems(prev => [item, ...prev]);
  };

  const handleRemoveMyPrivateItem = (itemId: string) => {
    setMyPrivateItems(prev => prev.filter(i => i.id !== itemId));
  };

  const handleGrantAccess = (targetUserId: string) => {
    const now = Date.now();
    setPrivateFolderGrants(prev => ({
      ...prev,
      [targetUserId]: {
        targetUserId,
        grantedAt: now,
        expiresAt: now + THIRTY_FIVE_HOURS_MS // 35 hours strictly
      }
    }));
  };

  const handleRevokeAccess = (targetUserId: string) => {
    setPrivateFolderGrants(prev => {
      const copy = { ...prev };
      delete copy[targetUserId];
      return copy;
    });
  };

  // CONTENT MODERATION: Submit report
  const handleSubmitReport = (reportData: Omit<ContentReport, 'id' | 'reportedAt' | 'status'>) => {
    const newReport: ContentReport = {
      id: `rep_${Date.now()}`,
      ...reportData,
      reportedAt: 'Just now',
      status: 'reviewing'
    };
    setReports(prev => [newReport, ...prev]);
  };

  // Share action
  const handleShareVideo = (video: VideoItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert(`Copied link to ${video.user.name}'s 10-second video!`);
    }
  };

  // Verified callback
  const handleAgeVerified = (newState: AgeVerificationState) => {
    setVerificationState(newState);
    setCurrentUser(prev => ({
      ...prev,
      isVerifiedAge: true,
      verificationMethod: newState.method,
      certificateId: newState.certificateId
    }));
  };

  // Update profile
  const handleUpdateProfile = (updated: Partial<User>) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updated
    }));
  };

  const currentUserVideos = videos.filter(v => v.userId === currentUser.id);
  const pendingRequestsCount = connectionRequests.filter(r => r.status === 'pending').length;

  // 1. PUBLIC LANDING PAGE & GROWTH HUB (Accessible before or after login)
  if (showLandingPage) {
    return (
      <>
        <LandingPricingBlogView
          onClose={() => setShowLandingPage(false)}
          onExploreApp={() => {
            setShowLandingPage(false);
            setIsFirewallLocked(false);
          }}
          onUpgradeVip={handleUpgradeVip}
          onBuyCoins={() => {
            setMonetizationInitialTab('coins');
            setIsMonetizationModalOpen(true);
          }}
          onOpenRefundPolicy={() => setIsRefundModalOpen(true)}
          initialTab={landingInitialTab}
        />

        <RefundPolicyModal
          isOpen={isRefundModalOpen}
          onClose={() => {
            setIsRefundModalOpen(false);
            setRefundTargetTxnId(undefined);
          }}
          initialTransactionId={refundTargetTxnId}
        />
      </>
    );
  }

  // 2. THE DISCREET SIGN-IN GATE
  if (isFirewallLocked) {
    return (
      <>
        <LoginFirewallGate
          onUnlockSuccess={() => {
            setIsFirewallLocked(false);
          }}
          onOpenLostPassword={() => setIsLostPasswordOpen(true)}
          onOpenLandingPage={handleOpenLandingPage}
          currentUser={currentUser}
          isIncognito={isIncognitoMode}
        />

        {/* Lost Password Recovery directly from login gate */}
        <LostPasswordModal
          isOpen={isLostPasswordOpen}
          onClose={() => setIsLostPasswordOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans select-none antialiased">
      {/* Top Navbar & Mobile Bottom Tab */}
      <Navbar
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
        onOpenCreate={() => setIsCreateModalOpen(true)}
        onOpenRewardedModal={() => setIsRewardedModalOpen(true)}
        onOpenVerificationModal={() => setIsVerificationModalOpen(true)}
        onOpenMonetizationModal={tab => {
          setMonetizationInitialTab(tab || 'coins');
          setIsMonetizationModalOpen(true);
        }}
        onOpenPrivateFolder={() => {
          setTargetPrivateFolderUser(null);
          setIsPrivateFolderModalOpen(true);
        }}
        onOpenConnectionRequests={() => setIsConnectionRequestsModalOpen(true)}
        unreadCount={threads.reduce((acc, t) => acc + t.unreadCount, 0)}
        pendingRequestsCount={pendingRequestsCount}
        currentUser={currentUser}
        isAdFreeUser={isAdFreeUser || wallet.isVipMember}
        wallet={wallet}
        isIncognitoMode={isIncognitoMode}
        onToggleIncognito={() => setIsIncognitoMode(prev => !prev)}
        onOpenLandingPage={handleOpenLandingPage}
      />

      {/* Main Body Switcher */}
      <main className="flex-1 flex flex-col overflow-x-hidden pb-16 md:pb-0">
        {currentTab === 'stream' && (
          <VideoFeed
            videos={displayVideos}
            currentUser={currentUser}
            onLikeVideo={handleLikeVideo}
            onOpenComments={videoId => setCommentingVideoId(videoId)}
            onOpenProfile={user => setInspectingUser(user)}
            onOpenAdModal={ad => setActiveSponsoredAd(ad)}
            onOpenRewardedModal={() => setIsRewardedModalOpen(true)}
            onStartChat={handleStartChat}
            onSendTapMessage={handleSendTap}
            onShareVideo={handleShareVideo}
            onOpenGiftModal={user => {
              setGiftRecipient(user);
              setMonetizationInitialTab('gifts');
              setIsMonetizationModalOpen(true);
            }}
            onOpenPrivateFolder={user => {
              setTargetPrivateFolderUser(user);
              setIsPrivateFolderModalOpen(true);
            }}
            onReportVideo={video => {
              setReportTarget({
                type: 'video',
                id: video.id,
                name: `${video.user.name}'s 10s Video`
              });
            }}
            onOpenVideoReactionModal={video => {
              setTargetReactionVideo(video);
              setIsReactionModalOpen(true);
            }}
            onLikeReaction={handleLikeReaction}
          />
        )}

        {currentTab === 'radar' && (
          <RadarGrid
            users={MOCK_USERS}
            videos={videos}
            currentUser={currentUser}
            onSelectUserVideo={video => {
              const idx = displayVideos.findIndex(v => v.id === video.id);
              if (idx !== -1) {
                setCurrentTab('stream');
              } else {
                setVideos(prev => [video, ...prev]);
                setCurrentTab('stream');
              }
            }}
            onOpenProfile={user => setInspectingUser(user)}
            onStartChat={handleStartChat}
            onSendTap={handleSendTap}
            onOpenFilters={() => setIsFilterModalOpen(true)}
            filters={filters}
            connectionStatuses={connectionStatuses}
            onSendConnectionRequest={handleSendConnectionRequest}
            onOpenGiftModal={user => {
              setGiftRecipient(user);
              setMonetizationInitialTab('gifts');
              setIsMonetizationModalOpen(true);
            }}
            onOpenPrivateFolder={user => {
              setTargetPrivateFolderUser(user);
              setIsPrivateFolderModalOpen(true);
            }}
            isIncognitoMode={isIncognitoMode}
          />
        )}

        {currentTab === 'messages' && (
          <MessagesView
            threads={threads}
            currentUser={currentUser}
            activeThreadId={activeThreadId}
            onSelectThread={threadId => {
              setActiveThreadId(threadId);
              if (threadId) {
                setThreads(prev =>
                  prev.map(t => (t.id === threadId ? { ...t, unreadCount: 0 } : t))
                );
              }
            }}
            onSendMessage={handleSendMessage}
            onOpenProfile={user => setInspectingUser(user)}
            onOpenGiftModal={user => {
              setGiftRecipient(user);
              setMonetizationInitialTab('gifts');
              setIsMonetizationModalOpen(true);
            }}
            onOpenPrivateFolder={user => {
              setTargetPrivateFolderUser(user);
              setIsPrivateFolderModalOpen(true);
            }}
            onReportMessage={user => {
              setReportTarget({
                type: 'user',
                id: user.id,
                name: user.name
              });
            }}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            currentUser={currentUser}
            userVideos={currentUserVideos}
            verificationState={verificationState}
            isAdFreeUser={isAdFreeUser || wallet.isVipMember}
            wallet={wallet}
            privateItemsCount={myPrivateItems.length}
            onToggleAdFree={() => setIsAdFreeUser(prev => !prev)}
            onOpenVerificationModal={() => setIsVerificationModalOpen(true)}
            onOpenVideoCreator={() => setIsCreateModalOpen(true)}
            onOpenRewardedModal={() => setIsRewardedModalOpen(true)}
            onOpenMonetizationModal={tab => {
              setMonetizationInitialTab(tab || 'coins');
              setIsMonetizationModalOpen(true);
            }}
            onOpenPrivateFolder={() => {
              setTargetPrivateFolderUser(null);
              setIsPrivateFolderModalOpen(true);
            }}
            onUpdateProfile={handleUpdateProfile}
            isIncognitoMode={isIncognitoMode}
            onToggleIncognito={() => setIsIncognitoMode(prev => !prev)}
            onOpenLandingPage={handleOpenLandingPage}
          />
        )}
      </main>

      {/* MODALS */}
      {/* 1. Age Verification 18+ Security Flow */}
      <AgeVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        onVerified={handleAgeVerified}
        currentState={verificationState}
      />

      {/* 2. 10-Second Video Creator Studio (with AI Moderation) */}
      <VideoCreatorModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        currentUser={currentUser}
        onPublishVideo={handlePublishVideo}
      />

      {/* 3. Comments Drawer */}
      <CommentsDrawer
        isOpen={Boolean(commentingVideoId)}
        onClose={() => setCommentingVideoId(null)}
        videoId={commentingVideoId || ''}
        comments={commentingVideoId ? commentsMap[commentingVideoId] || [] : []}
        currentUser={currentUser}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
      />

      {/* 4. User Full Profile Modal */}
      <UserProfileModal
        user={inspectingUser}
        isOpen={Boolean(inspectingUser)}
        onClose={() => setInspectingUser(null)}
        onStartChat={handleStartChat}
        onSendTap={handleSendTap}
        userVideos={inspectingUser ? videos.filter(v => v.userId === inspectingUser.id) : []}
        onSelectVideo={() => {
          setInspectingUser(null);
          setCurrentTab('stream');
        }}
        connectionStatus={inspectingUser ? connectionStatuses[inspectingUser.id] || 'none' : 'none'}
        onSendConnectionRequest={handleSendConnectionRequest}
        onOpenGiftModal={user => {
          setGiftRecipient(user);
          setMonetizationInitialTab('gifts');
          setIsMonetizationModalOpen(true);
        }}
        onOpenPrivateFolder={user => {
          setTargetPrivateFolderUser(user);
          setIsPrivateFolderModalOpen(true);
        }}
        onReportUser={user => {
          setReportTarget({
            type: 'user',
            id: user.id,
            name: user.name
          });
        }}
      />

      {/* 5. Sponsored Ad Modal */}
      <SponsoredAdModal
        ad={activeSponsoredAd}
        isOpen={Boolean(activeSponsoredAd)}
        onClose={() => setActiveSponsoredAd(null)}
        onRewardClaim={reward => {
          alert(`Congratulations! Claimed: ${reward}`);
          setActiveSponsoredAd(null);
        }}
      />

      {/* 6. Rewarded Ad Station Modal */}
      <RewardedAdModal
        isOpen={isRewardedModalOpen}
        onClose={() => setIsRewardedModalOpen(false)}
        onRewardEarned={rewardName => {
          alert(`Reward Granted: ${rewardName}!`);
          setWallet(prev => ({ ...prev, coins: prev.coins + 75 }));
        }}
      />

      {/* 7. Monetization, Boosts & Virtual Gifts Store */}
      <MonetizationModal
        isOpen={isMonetizationModalOpen}
        onClose={() => {
          setIsMonetizationModalOpen(false);
          setGiftRecipient(null);
        }}
        wallet={wallet}
        onPurchaseCoins={handlePurchaseCoins}
        onActivateBoost={handleActivateBoost}
        onUpgradeVip={handleUpgradeVip}
        giftRecipient={giftRecipient}
        onSendGift={handleSendGift}
        initialTab={monetizationInitialTab}
      />

      {/* 8. Private Folder Vault (with 35h Auto-Relock & Exemption) */}
      <PrivateFolderModal
        isOpen={isPrivateFolderModalOpen}
        onClose={() => {
          setIsPrivateFolderModalOpen(false);
          setTargetPrivateFolderUser(null);
        }}
        targetUser={targetPrivateFolderUser}
        myItems={myPrivateItems}
        onAddMyItem={handleAddMyPrivateItem}
        onRemoveMyItem={handleRemoveMyPrivateItem}
        grants={privateFolderGrants}
        onGrantAccess={handleGrantAccess}
        onRevokeAccess={handleRevokeAccess}
        targetUserItems={targetPrivateFolderUser ? otherPrivateFolders[targetPrivateFolderUser.id] || [] : []}
        allUsers={MOCK_USERS}
      />

      {/* 9. Match Filters Drawer (Age, Distance, Interests) */}
      <MatchFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
        isVipMember={wallet.isVipMember}
        onOpenVipUpgrade={() => {
          setIsFilterModalOpen(false);
          setMonetizationInitialTab('vip');
          setIsMonetizationModalOpen(true);
        }}
      />

      {/* 10. Connection Requests Modal */}
      <ConnectionRequestsModal
        isOpen={isConnectionRequestsModalOpen}
        onClose={() => setIsConnectionRequestsModalOpen(false)}
        requests={connectionRequests}
        onAcceptRequest={handleAcceptConnectionRequest}
        onDeclineRequest={handleDeclineConnectionRequest}
        onOpenProfile={user => setInspectingUser(user)}
      />

      {/* 11. Community Violations Report Modal */}
      <ReportModal
        isOpen={Boolean(reportTarget)}
        onClose={() => setReportTarget(null)}
        targetType={reportTarget?.type || 'user'}
        targetId={reportTarget?.id || ''}
        targetName={reportTarget?.name || ''}
        onSubmitReport={handleSubmitReport}
      />

      {/* 12. 100% Satisfaction & 14-Day Refund Firewall Station */}
      <RefundPolicyModal
        isOpen={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
        userEmail={`${currentUser.username}@erosdreamz.app`}
        initialTransactionId={refundTargetTxnId}
      />

      {/* 13. Lost Password / Account Recovery Modal */}
      <LostPasswordModal
        isOpen={isLostPasswordOpen}
        onClose={() => setIsLostPasswordOpen(false)}
      />

      {/* 14. First-Time Video Upload Best Practices Guide */}
      <UploadBestPracticesModal
        isOpen={isBestPracticesOpen}
        onClose={() => setIsBestPracticesOpen(false)}
        onStartRecording={() => {
          setIsBestPracticesOpen(false);
          setIsCreateModalOpen(true);
        }}
      />

      {/* 15. 10-Second Video Reaction Studio Recorder Modal */}
      <VideoReactionRecorderModal
        isOpen={isReactionModalOpen}
        onClose={() => {
          setIsReactionModalOpen(false);
          setTargetReactionVideo(null);
        }}
        targetVideo={targetReactionVideo}
        currentUser={currentUser}
        onPublishReaction={handleAddVideoReaction}
      />
    </div>
  );
}

