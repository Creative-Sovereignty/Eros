import { User, VideoItem, Comment, ChatThread, SponsoredAdData, VirtualGift, CoinPackage, ConnectionRequest, PrivateFolderItem, VideoReaction } from '../types';

export const INITIAL_CURRENT_USER: User = {
  id: 'current_user_me',
  name: 'Alex Rivera',
  username: 'alex_r',
  age: 26,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Architect by day, vinyl collector by night. Looking for good conversation, gym motivation, and spontaneous rooftop drinks 🍸',
  height: `6'1" (185 cm)`,
  distanceMiles: 0,
  locationName: 'West Hollywood, CA',
  isVerifiedAge: true,
  verificationMethod: 'facial_liveness',
  verificationDate: '2026-10-12',
  certificateId: 'PLS-VER-98240-X19',
  tribe: 'Creative',
  lookingFor: 'Dating & Romance',
  isOnline: true,
  lastActive: 'Just now',
    tags: ['Architecture', 'Gym', 'Vinyl', 'Espresso', 'Dog Lover'],
    vibes: ['Artistic', 'Night Owl', 'Vinyl Head']
  };

export const POPULAR_VIBES = [
  'Gym Rat',
  'Night Owl',
  'Artistic',
  'Foodie',
  'Vinyl Head',
  'Rooftop Lounger',
  'Caffeine Addict',
  'Nature Seeker',
  'Hopeless Romantic',
  'Techie',
  'Beach Bum',
  'Fashion Forward',
  'Early Bird',
  'Spontaneous',
  'Gamer'
];

export const MOCK_USERS: User[] = [
  {
    id: 'user_marcus',
    name: 'Marcus Vance',
    username: 'marcus_fit',
    age: 28,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Trainer & endurance runner. 10-second vibes over endless text scrolling! Free for acai or leg day?',
    height: `6'2" (188 cm)`,
    distanceMiles: 0.2,
    locationName: 'West Hollywood, CA',
    isVerifiedAge: true,
    verificationMethod: 'facial_liveness',
    verificationDate: '2026-10-10',
    certificateId: 'PLS-VER-88319-M28',
    tribe: 'Jock',
    lookingFor: 'Gym & Fitness Partner',
    isOnline: true,
    lastActive: 'Online now',
    tags: ['Fitness', 'HIIT', 'MealPrep', 'SunsetRun'],
    vibes: ['Gym Rat', 'Early Bird', 'Fitness Fiend']
  },
  {
    id: 'user_leo',
    name: 'Leo Chen',
    username: 'leo_sounds',
    age: 25,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Electronic music producer & barista. Show me your best cocktail spot or play me a track that makes you dance.',
    height: `5'10" (178 cm)`,
    distanceMiles: 0.5,
    locationName: 'Silver Lake, CA',
    isVerifiedAge: true,
    verificationMethod: 'id_scan',
    verificationDate: '2026-09-28',
    certificateId: 'PLS-VER-77401-L25',
    tribe: 'Creative',
    lookingFor: 'Drinks & Nightlife',
    isOnline: true,
    lastActive: 'Active 2m ago',
    tags: ['Synthesizers', 'Coffee', 'HouseMusic', 'Nightlife'],
    vibes: ['Night Owl', 'Artistic', 'Rooftop Lounger']
  },
  {
    id: 'user_dante',
    name: 'Dante Miller',
    username: 'dante_chef',
    age: 32,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    bio: 'Culinary director & natural wine enthusiast. I will cook for you if you pick the playlist. 🍝🍷',
    height: `6'0" (183 cm)`,
    distanceMiles: 1.1,
    locationName: 'Downtown LA, CA',
    isVerifiedAge: true,
    verificationMethod: 'facial_liveness',
    verificationDate: '2026-10-01',
    certificateId: 'PLS-VER-66290-D32',
    tribe: 'Otter',
    lookingFor: 'Dating & Romance',
    isOnline: false,
    lastActive: 'Active 18m ago',
    tags: ['Culinary', 'PastaMaster', 'NaturalWine', 'ArtGalleries'],
    vibes: ['Foodie', 'Hopeless Romantic', 'Artistic']
  },
  {
    id: 'user_kai',
    name: 'Kai Takahashi',
    username: 'kai_zen',
    age: 27,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    bio: 'Surfer, UX designer, always chasing the golden hour. Let’s grab matcha or catch dawn patrol.',
    height: `5'11" (180 cm)`,
    distanceMiles: 1.8,
    locationName: 'Venice Beach, CA',
    isVerifiedAge: true,
    verificationMethod: 'id_scan',
    verificationDate: '2026-10-04',
    certificateId: 'PLS-VER-55182-K27',
    tribe: 'Guy Next Door',
    lookingFor: 'Right Now / Spontaneous',
    isOnline: true,
    lastActive: 'Online now',
    tags: ['Surfing', 'Matcha', 'Design', 'BeachWalks'],
    vibes: ['Beach Bum', 'Nature Seeker', 'Spontaneous']
  },
  {
    id: 'user_julian',
    name: 'Julian Thorne',
    username: 'julian_t',
    age: 36,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    bio: 'Tech founder & mountain biker. Looking for someone grounded with dry humor and ambition.',
    height: `6'3" (190 cm)`,
    distanceMiles: 2.4,
    locationName: 'Santa Monica, CA',
    isVerifiedAge: true,
    verificationMethod: 'facial_liveness',
    verificationDate: '2026-09-15',
    certificateId: 'PLS-VER-44093-J36',
    tribe: 'Daddy',
    lookingFor: 'Long-term Relationship',
    isOnline: false,
    lastActive: 'Active 1h ago',
    tags: ['Tech', 'Cycling', 'Bourbon', 'Travel'],
    vibes: ['Techie', 'Early Bird', 'Rooftop Lounger']
  },
  {
    id: 'user_soren',
    name: 'Soren Lind',
    username: 'soren_scand',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    bio: 'Fashion editorial stylist visiting LA for the season. Tell me the thrift spots no one knows about.',
    height: `6'1" (185 cm)`,
    distanceMiles: 3.2,
    locationName: 'Melrose, CA',
    isVerifiedAge: true,
    verificationMethod: 'id_scan',
    verificationDate: '2026-10-11',
    certificateId: 'PLS-VER-33984-S24',
    tribe: 'Twink',
    lookingFor: 'Drinks & Nightlife',
    isOnline: true,
    lastActive: 'Online now',
    tags: ['Fashion', 'Vintage', 'Photography', 'Nightlife'],
    vibes: ['Fashion Forward', 'Artistic', 'Night Owl']
  },
  {
    id: 'user_elias',
    name: 'Elias Novak',
    username: 'elias_barbell',
    age: 30,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    bio: 'Powerlifter & software engineer. Big heart, heavy squats, cozy movie nights.',
    height: `5'9" (175 cm)`,
    distanceMiles: 4.5,
    locationName: 'Pasadena, CA',
    isVerifiedAge: true,
    verificationMethod: 'facial_liveness',
    verificationDate: '2026-08-20',
    certificateId: 'PLS-VER-22871-E30',
    tribe: 'Bear',
    lookingFor: 'Dating & Romance',
    isOnline: true,
    lastActive: 'Active 5m ago',
    tags: ['Powerlifting', 'Gaming', 'SciFi', 'Cooking'],
    vibes: ['Gym Rat', 'Gamer', 'Foodie']
  }
];

export const SPONSORED_ADS: SponsoredAdData[] = [
  {
    id: 'ad_lhomme',
    brandName: `L'HOMME Grooming Lab`,
    headline: 'Precision Skincare Designed for Men',
    description: 'Elevate your routine with activated charcoal detox, soothing peptide post-shave balm, and SPF 50 invisible mist.',
    ctaText: 'Get 25% Off First Kit',
    ctaUrl: 'https://example.com/lhomme-offer',
    badgeText: 'SPONSORED BRAND',
    promoCode: 'PULSE25',
    discountBadge: '25% OFF',
    rewardType: 'boost'
  },
  {
    id: 'ad_rooftop',
    brandName: 'VELVET SKY Rooftop Lounge',
    headline: 'Sunset Sessions & Craft Mixology Tonight',
    description: 'Show your Pulse 18+ Verified badge at the door for complimentary signature welcome cocktail and VIP line bypass.',
    ctaText: 'Claim Free Cocktail Pass',
    ctaUrl: 'https://example.com/velvet-sky',
    badgeText: 'NATIVE PARTNER',
    promoCode: 'PULSEVIP',
    discountBadge: 'FREE DRINK',
    rewardType: 'super_flame'
  },
  {
    id: 'ad_festival',
    brandName: 'CIRCUIT NEON 2026',
    headline: 'The Biggest Music & Dance Gathering of the Summer',
    description: '3 Days of world-class international DJs, pool parties, and immersive light installations. Limited Tier-1 passes remaining.',
    ctaText: 'Explore Lineup & Passes',
    ctaUrl: 'https://example.com/circuit-neon',
    badgeText: 'EVENT SPONSOR',
    promoCode: 'FESTIVALPASS',
    discountBadge: '$40 OFF'
  }
];

// Initial video reactions for 10-second streams (overlay picture-in-picture clips)
export const INITIAL_VIDEO_REACTIONS: Record<string, VideoReaction[]> = {
  vid_marcus_1: [
    {
      id: 'react_m1_1',
      videoId: 'vid_marcus_1',
      userId: 'current_user_me',
      user: INITIAL_CURRENT_USER,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-walking-down-a-city-street-41132-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      durationSec: 8,
      caption: "Gold's WeHo tomorrow 7am! Spot me on squats bro 💪",
      reactionEmoji: '🔥',
      position: 'top_right',
      createdAt: '35m ago',
      likesCount: 24,
      isLiked: true
    },
    {
      id: 'react_m1_2',
      videoId: 'vid_marcus_1',
      userId: 'user_kai',
      user: MOCK_USERS[3], // Kai Takahashi
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-standing-on-a-beach-at-sunset-41133-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      durationSec: 6,
      caption: 'Post-workout acai or rooftop drinks? Let’s go 🍸',
      reactionEmoji: '🍸',
      position: 'top_right',
      createdAt: '1h ago',
      likesCount: 15,
      isLiked: false
    }
  ],
  vid_leo_1: [
    {
      id: 'react_leo_1',
      videoId: 'vid_leo_1',
      userId: 'user_kai',
      user: MOCK_USERS[3],
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-standing-on-a-beach-at-sunset-41133-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      durationSec: 7,
      caption: 'That drop is filthy 🔥 Save me a guestlist spot for Silver Lake!',
      reactionEmoji: '⚡',
      position: 'top_right',
      createdAt: '2h ago',
      likesCount: 31,
      isLiked: false
    }
  ],
  vid_kai_1: [
    {
      id: 'react_kai_1',
      videoId: 'vid_kai_1',
      userId: 'user_marcus',
      user: MOCK_USERS[0],
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-out-at-the-gym-40502-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      durationSec: 9,
      caption: 'Venice sunset looks incredible! Boardwalk tacos after? 🌅',
      reactionEmoji: '😍',
      position: 'top_right',
      createdAt: '3h ago',
      likesCount: 22,
      isLiked: true
    }
  ]
};

// High quality reliable video clips
export const MOCK_VIDEOS: VideoItem[] = [
  {
    id: 'vid_marcus_1',
    userId: 'user_marcus',
    user: MOCK_USERS[0],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-out-at-the-gym-40502-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    caption: '10 second check-in after leg day 💪 Who wants to spot tomorrow or grab post-workout fuel? West Hollywood locals hit me up!',
    musicTitle: 'Troye Sivan • Rush (Remix)',
    durationSec: 10,
    tags: ['Fitness', 'WestHollywood', 'LegDay', 'LookingForGymBro'],
    hashtags: ['Fitness', 'LegDay', 'GymBro', 'WestHollywood'],
    likesCount: 1420,
    commentsCount: 88,
    sharesCount: 34,
    isLiked: false,
    createdAt: '2 hours ago',
    reactions: INITIAL_VIDEO_REACTIONS['vid_marcus_1'],
    reactionsCount: 2
  },
  {
    id: 'vid_leo_1',
    userId: 'user_leo',
    user: MOCK_USERS[1],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-enjoying-music-wearing-headphones-41131-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    caption: 'Testing this drop before my set in Silver Lake this Friday 🎧 Vibing with someone who loves deep melodic beats.',
    musicTitle: 'Fred again.. • adore u (Club Edit)',
    durationSec: 10,
    tags: ['DJ', 'SilverLake', 'ElectronicMusic', 'NightVibes'],
    hashtags: ['ElectronicMusic', 'NightVibes', 'SilverLake', 'HouseMusic'],
    likesCount: 2840,
    commentsCount: 194,
    sharesCount: 112,
    isLiked: true,
    createdAt: '4 hours ago',
    reactions: INITIAL_VIDEO_REACTIONS['vid_leo_1'],
    reactionsCount: 1
  },
  {
    id: 'vid_ad_1',
    userId: 'ad_sponsor_lhomme',
    user: {
      id: 'sponsor_lhomme',
      name: `L'HOMME Grooming`,
      username: 'lhomme_official',
      age: 28,
      avatar: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
      bio: 'Premium daily essentials for modern men. Clean formulas, effortless confidence.',
      height: 'Official Partner',
      distanceMiles: 0,
      locationName: 'Sponsored Nationwide',
      isVerifiedAge: true,
      tribe: 'Creative',
      lookingFor: 'Friends & Networking',
      isOnline: true,
      lastActive: 'Sponsored',
      tags: ['Skincare', 'Grooming', 'SelfCare', 'ExclusiveOffer'],
      vibes: ['Artistic', 'Rooftop Lounger']
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-glass-of-perfume-41712-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    caption: '🔥 Elevate your date night scent. Get 25% off our signature Bergamot & Cedarwood kit with code PULSE25.',
    musicTitle: 'Sponsored Audio • L\'HOMME Soundlab',
    durationSec: 10,
    tags: ['Sponsored', 'MenGrooming', 'DateNight', 'SpecialPromo'],
    hashtags: ['DateNight', 'MenGrooming', 'SelfCare'],
    likesCount: 890,
    commentsCount: 24,
    sharesCount: 56,
    isSponsoredAd: true,
    adData: SPONSORED_ADS[0],
    createdAt: 'Promoted'
  },
  {
    id: 'vid_kai_1',
    userId: 'user_kai',
    user: MOCK_USERS[3],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-standing-on-a-beach-at-sunset-41133-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    caption: 'Golden hour at Venice pier 🌅 The water is incredible today. Who wants to join for fish tacos and sunset beers?',
    musicTitle: 'Charli xcx • Everything is romantic',
    durationSec: 10,
    tags: ['BeachLife', 'VeniceBeach', 'GoldenHour', 'Spontaneous'],
    hashtags: ['BeachLife', 'GoldenHour', 'VeniceBeach', 'Spontaneous'],
    likesCount: 3120,
    commentsCount: 215,
    sharesCount: 87,
    isLiked: false,
    createdAt: '5 hours ago',
    reactions: INITIAL_VIDEO_REACTIONS['vid_kai_1'],
    reactionsCount: 1
  },
  {
    id: 'vid_dante_1',
    userId: 'user_dante',
    user: MOCK_USERS[2],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-garnishing-a-plate-with-herbs-41315-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    caption: 'Handmade cacio e pepe from scratch tonight 🍝 Table for two? Send a flame if you love good carbs and better wine.',
    musicTitle: 'Original Audio • Dante Kitchen Records',
    durationSec: 10,
    tags: ['ChefVibes', 'PastaLover', 'DowntownLA', 'WineAndDine'],
    hashtags: ['Culinary', 'Foodie', 'WineAndDine', 'DowntownLA'],
    likesCount: 4210,
    commentsCount: 342,
    sharesCount: 165,
    isLiked: true,
    createdAt: '6 hours ago'
  },
  {
    id: 'vid_ad_2',
    userId: 'ad_sponsor_rooftop',
    user: {
      id: 'sponsor_rooftop',
      name: 'Velvet Sky Lounge',
      username: 'velvetskylounge',
      age: 21,
      avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
      bio: 'Open-air rooftop views over Los Angeles skyline. Signature mezcal infusions & live house sets.',
      height: 'Sunset to 2AM',
      distanceMiles: 0.8,
      locationName: 'Downtown Los Angeles, CA',
      isVerifiedAge: true,
      tribe: 'Creative',
      lookingFor: 'Drinks & Nightlife',
      isOnline: true,
      lastActive: 'Sponsored',
      tags: ['CocktailBar', 'Rooftop', 'LADatenight', 'Exclusive'],
      vibes: ['Night Owl', 'Rooftop Lounger']
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bartender-serving-a-drink-41137-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    caption: '🍸 Tonight on the roof: 2-for-1 mezcal palomas for verified Pulse members before 10 PM. Show app at the bar!',
    musicTitle: 'Velvet Sky DJ Residency • Summer Beats',
    durationSec: 10,
    tags: ['Sponsored', 'Cocktails', 'Nightlife', 'FreeDrinkPass'],
    hashtags: ['Cocktails', 'Nightlife', 'Rooftop', 'DateNight'],
    likesCount: 1680,
    commentsCount: 45,
    sharesCount: 78,
    isSponsoredAd: true,
    adData: SPONSORED_ADS[1],
    createdAt: 'Promoted'
  },
  {
    id: 'vid_soren_1',
    userId: 'user_soren',
    user: MOCK_USERS[5],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-walking-down-a-city-street-41132-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    caption: 'Found the most incredible vintage leather jacket on Melrose Avenue today ✨ Quick fit check, yes or no?',
    musicTitle: 'Kylie Minogue • Padam Padam',
    durationSec: 10,
    tags: ['FitCheck', 'Melrose', 'VintageFashion', 'Style'],
    hashtags: ['FashionForward', 'VintageFashion', 'FitCheck', 'Melrose'],
    likesCount: 1950,
    commentsCount: 142,
    sharesCount: 52,
    isLiked: false,
    createdAt: '8 hours ago'
  }
];

export const MOCK_COMMENTS: Record<string, Comment[]> = {
  vid_marcus_1: [
    {
      id: 'c1',
      videoId: 'vid_marcus_1',
      user: {
        name: 'Kai Takahashi',
        username: 'kai_zen',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
        isVerifiedAge: true
      },
      text: 'Need that quad routine ASAP 🔥',
      createdAt: '1h ago',
      likes: 24,
      isLiked: false
    },
    {
      id: 'c2',
      videoId: 'vid_marcus_1',
      user: {
        name: 'Dante Miller',
        username: 'dante_chef',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        isVerifiedAge: true
      },
      text: 'I can supply the post-workout protein bowl anytime you say 😉',
      createdAt: '45m ago',
      likes: 38,
      isLiked: true
    },
    {
      id: 'c3',
      videoId: 'vid_marcus_1',
      user: {
        name: 'Leo Chen',
        username: 'leo_sounds',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        isVerifiedAge: true
      },
      text: 'The dedication is crazy bro, looking great',
      createdAt: '20m ago',
      likes: 12,
      isLiked: false
    }
  ],
  vid_leo_1: [
    {
      id: 'c4',
      videoId: 'vid_leo_1',
      user: {
        name: 'Marcus Vance',
        username: 'marcus_fit',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        isVerifiedAge: true
      },
      text: 'Adding this to my running playlist right now! Are you on Spotify?',
      createdAt: '2h ago',
      likes: 19,
      isLiked: true
    },
    {
      id: 'c5',
      videoId: 'vid_leo_1',
      user: {
        name: 'Julian Thorne',
        username: 'julian_t',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        isVerifiedAge: true
      },
      text: 'Silver Lake venue this weekend? Coming by with a crew.',
      createdAt: '1h ago',
      likes: 15,
      isLiked: false
    }
  ],
  vid_dante_1: [
    {
      id: 'c6',
      videoId: 'vid_dante_1',
      user: {
        name: 'Alex Rivera',
        username: 'alex_r',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        isVerifiedAge: true
      },
      text: 'That pecorino emulsion looks Michelin level 🤤 Save a plate!',
      createdAt: '3h ago',
      likes: 42,
      isLiked: true
    }
  ]
};

export const MOCK_CHAT_THREADS: ChatThread[] = [
  {
    id: 'thread_marcus',
    participant: MOCK_USERS[0],
    lastMessage: 'Hey! Saw your 10-second gym clip, looking super solid 🔥 Free this evening?',
    lastMessageTime: '10:42 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'user_marcus',
        receiverId: 'current_user_me',
        text: 'Hey handsome! Saw you are only 0.2 miles away near Santa Monica Blvd.',
        timestamp: '10:35 AM',
        isMine: false
      },
      {
        id: 'm2',
        senderId: 'current_user_me',
        receiverId: 'user_marcus',
        text: 'Hey Marcus! Yeah just grabbed a cold brew around the corner 👋',
        timestamp: '10:38 AM',
        isMine: true,
        readStatus: 'read'
      },
      {
        id: 'm3',
        senderId: 'user_marcus',
        receiverId: 'current_user_me',
        text: 'Hey! Saw your 10-second gym clip, looking super solid 🔥 Free this evening?',
        timestamp: '10:42 AM',
        isMine: false
      }
    ]
  },
  {
    id: 'thread_leo',
    participant: MOCK_USERS[1],
    lastMessage: 'Sent you a flame! Let’s link up for the DJ set this Friday',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'm4',
        senderId: 'user_leo',
        receiverId: 'current_user_me',
        text: 'Loved your architectural sketch reel! Very cool vibe.',
        timestamp: 'Yesterday 8:15 PM',
        isMine: false
      },
      {
        id: 'm5',
        senderId: 'current_user_me',
        receiverId: 'user_leo',
        text: 'Appreciate it Leo! That track you posted is stuck in my head.',
        timestamp: 'Yesterday 8:30 PM',
        isMine: true,
        readStatus: 'read'
      },
      {
        id: 'm6',
        senderId: 'user_leo',
        receiverId: 'current_user_me',
        text: 'Sent you a flame! Let’s link up for the DJ set this Friday',
        timestamp: 'Yesterday 8:45 PM',
        isMine: false
      }
    ]
  },
  {
    id: 'thread_dante',
    participant: MOCK_USERS[2],
    lastMessage: 'Natural orange wine is chilling right now 🍷',
    lastMessageTime: 'Oct 14',
    unreadCount: 0,
    messages: [
      {
        id: 'm7',
        senderId: 'user_dante',
        receiverId: 'current_user_me',
        text: 'Natural orange wine is chilling right now 🍷',
        timestamp: 'Oct 14 6:10 PM',
        isMine: false
      }
    ]
  }
];

export const ICEBREAKER_TAPS = [
  { emoji: '🔥', text: 'Flame / Hot Vibe', prompt: 'Sent a Flame reaction 🔥' },
  { emoji: '🍸', text: 'Drinks Tonight?', prompt: 'Hey! Are you free for drinks tonight? 🍸' },
  { emoji: '💪', text: 'Gym Partner?', prompt: 'Need a gym spotter or workout buddy? 💪' },
  { emoji: '👀', text: 'Looking Good', prompt: 'Just wanted to say you look incredible in this video 👀' },
  { emoji: '☕', text: 'Coffee Date', prompt: 'Care to grab a coffee nearby sometime today? ☕' },
  { emoji: '📍', text: 'Super Nearby', prompt: 'Noticed you are super close by! What are you up to? 📍' }
];

export const VIRTUAL_GIFTS: VirtualGift[] = [
  {
    id: 'gift_cocktail',
    name: 'Craft Mezcal',
    icon: '🍸',
    coinCost: 50,
    animation: 'cocktail',
    description: 'Send a stylish rooftop drink to break the ice.'
  },
  {
    id: 'gift_flame',
    name: 'Super Flame',
    icon: '🔥',
    coinCost: 100,
    animation: 'flame',
    description: 'Light up their screen with an intense animated flame burst.'
  },
  {
    id: 'gift_lightning',
    name: 'Pulse Spark',
    icon: '⚡',
    coinCost: 150,
    animation: 'burst',
    description: 'Instant spark that prioritizes your message in their inbox.'
  },
  {
    id: 'gift_crown',
    name: 'Golden Crown',
    icon: '👑',
    coinCost: 300,
    animation: 'crown',
    description: 'Show royal admiration and elevate their profile status.'
  },
  {
    id: 'gift_diamond',
    name: 'Eros Diamond',
    icon: '💎',
    coinCost: 500,
    animation: 'sparkle',
    description: 'The premier luxury gift for an undeniable match.'
  }
];

export const COIN_PACKAGES: CoinPackage[] = [
  {
    id: 'pack_starter',
    coins: 250,
    price: '$2.99',
    numericPrice: 2.99,
    bonusText: 'Starter'
  },
  {
    id: 'pack_popular',
    coins: 750,
    price: '$7.99',
    numericPrice: 7.99,
    bonusText: '+15% Free Coins',
    popular: true
  },
  {
    id: 'pack_best_value',
    coins: 1800,
    price: '$14.99',
    numericPrice: 14.99,
    bonusText: '+30% Bonus Value'
  },
  {
    id: 'pack_vip',
    coins: 4000,
    price: '$29.99',
    numericPrice: 29.99,
    bonusText: 'High Roller VIP'
  }
];

export const INITIAL_CONNECTION_REQUESTS: ConnectionRequest[] = [
  {
    id: 'req_marcus',
    fromUserId: 'user_marcus',
    toUserId: 'current_user_me',
    user: MOCK_USERS[0],
    sentAt: '12m ago',
    status: 'pending',
    introMessage: 'Loved your 10-second architecture reel! Would love to connect and grab a smoothie after workouts.'
  },
  {
    id: 'req_kai',
    fromUserId: 'user_kai',
    toUserId: 'current_user_me',
    user: MOCK_USERS[3],
    sentAt: '1h ago',
    status: 'pending',
    introMessage: 'Saw you are only 1.8 miles away. Sunset surf or beach walk sometime?'
  }
];

export const INITIAL_PRIVATE_FOLDER_ITEMS: PrivateFolderItem[] = [
  {
    id: 'priv_1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    caption: 'Private rooftop pool snap from last weekend 🌊',
    addedAt: '2 days ago'
  },
  {
    id: 'priv_2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    caption: 'Post-gym mirror check 💪',
    addedAt: 'Yesterday'
  }
];

export const INITIAL_OTHER_PRIVATE_FOLDERS: Record<string, PrivateFolderItem[]> = {
  user_marcus: [
    {
      id: 'priv_m1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
      caption: 'Exclusive training physique update 🏋️‍♂️',
      addedAt: '3 days ago'
    },
    {
      id: 'priv_m2',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      caption: 'Venice beach sunset unedited',
      addedAt: '1 day ago'
    }
  ],
  user_dante: [
    {
      id: 'priv_d1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      caption: 'Late night kitchen tasting notes 🍷',
      addedAt: '4 days ago'
    }
  ]
};
