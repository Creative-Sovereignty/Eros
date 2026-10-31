import React, { useState } from 'react';
import { User, VideoItem, MatchFilterSettings, ConnectionStatus } from '../types';
import { 
  MapPin, 
  ShieldCheck, 
  Flame, 
  SlidersHorizontal, 
  Sparkles, 
  MessageCircle, 
  Play, 
  Gift, 
  Lock, 
  UserPlus, 
  UserCheck,
  Compass,
  Layers,
  Ghost
} from 'lucide-react';

interface RadarGridProps {
  users: User[];
  videos: VideoItem[];
  currentUser: User;
  onSelectUserVideo: (video: VideoItem) => void;
  onOpenProfile: (user: User) => void;
  onStartChat: (user: User) => void;
  onSendTap: (user: User, prompt: string) => void;
  onOpenFilters: () => void;
  filters: MatchFilterSettings;
  connectionStatuses: Record<string, ConnectionStatus>;
  onSendConnectionRequest: (user: User) => void;
  onOpenGiftModal: (user: User) => void;
  onOpenPrivateFolder: (user: User) => void;
  isIncognitoMode?: boolean;
}

export const RadarGrid: React.FC<RadarGridProps> = ({
  users,
  videos,
  currentUser,
  onSelectUserVideo,
  onOpenProfile,
  onStartChat,
  onSendTap,
  onOpenFilters,
  filters,
  connectionStatuses,
  onSendConnectionRequest,
  onOpenGiftModal,
  onOpenPrivateFolder,
  isIncognitoMode = false
}) => {
  const [selectedTribe, setSelectedTribe] = useState<string>('All');
  const [activeHoveredUserId, setActiveHoveredUserId] = useState<string | null>(null);
  const [showMiniMap, setShowMiniMap] = useState<boolean>(true);
  const [selectedRegionCluster, setSelectedRegionCluster] = useState<string | null>(null);

  const tribesList = ['All', 'Jock', 'Creative', 'Otter', 'Guy Next Door', 'Twink', 'Bear', 'Daddy'];

  // Regional clusters of users
  const regionClusters = [
    { name: 'West Hollywood', subtitle: 'Santa Monica Blvd • Sunset Strip', count: users.filter(u => u.locationName.includes('West Hollywood')).length || 4, color: 'from-pink-500 to-purple-600', x: '35%', y: '40%' },
    { name: 'Silver Lake', subtitle: 'Reservoir • Sunset Junction', count: users.filter(u => u.locationName.includes('Silver Lake')).length || 3, color: 'from-cyan-400 to-blue-600', x: '68%', y: '28%' },
    { name: 'Downtown LA', subtitle: 'Arts District • Financial Core', count: users.filter(u => u.locationName.includes('Downtown')).length || 3, color: 'from-amber-400 to-orange-600', x: '58%', y: '65%' },
    { name: 'Santa Monica & Venice', subtitle: 'Boardwalk • Beachfront', count: users.filter(u => u.locationName.includes('Venice') || u.locationName.includes('Santa Monica')).length || 4, color: 'from-emerald-400 to-teal-600', x: '18%', y: '58%' }
  ];

  const filteredUsers = users.filter(u => {
    if (u.id === currentUser.id) return false;
    // Age filter
    if (u.age < filters.minAge || u.age > filters.maxAge) return false;
    // Distance filter
    if (u.distanceMiles > filters.maxDistance) return false;
    // Online only
    if (filters.onlineOnly && !u.isOnline) return false;
    // Verified only
    if (filters.verifiedOnly && !u.isVerifiedAge) return false;
    // Tribe filter
    if (selectedTribe !== 'All' && u.tribe !== selectedTribe) return false;
    // Region cluster filter
    if (selectedRegionCluster && !u.locationName.includes(selectedRegionCluster)) return false;
    // Interests filter
    if (filters.selectedInterests.length > 0) {
      const hasMatch = filters.selectedInterests.some(i => u.tags.includes(i));
      if (!hasMatch) return false;
    }
    return true;
  });

  const getUserVideo = (userId: string) => {
    return videos.find(v => v.userId === userId);
  };

  const activeFilterCount = (filters.selectedInterests.length > 0 ? 1 : 0) +
    (filters.minAge > 18 || filters.maxAge < 60 ? 1 : 0) +
    (filters.maxDistance < 50 ? 1 : 0) +
    (filters.onlineOnly ? 1 : 0) +
    (filters.verifiedOnly ? 1 : 0);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 space-y-4">
      {/* Incognito Stealth Bar if Active */}
      {isIncognitoMode && (
        <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-950/60 via-zinc-900 to-pink-950/40 border border-pink-500/30 flex items-center justify-between text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <Ghost className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="font-semibold text-white">Incognito Mode Active:</span>
            <span className="text-zinc-400 hidden sm:inline">Your exact distance is fuzzed for nearby users and your views are untracked.</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-bold">
            STEALTH
          </span>
        </div>
      )}

      {/* Top Radar Bar & Filters */}
      <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-3xl space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 p-0.5 text-black flex items-center justify-center font-bold shadow-md shadow-pink-500/20">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-cyan-400">
                <MapPin className="w-4 h-4 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-base font-black text-white tracking-wide">Nearby Video Radar & Map</h2>
              <p className="text-xs text-zinc-400">
                {filteredUsers.length} compatible guys matching your criteria
              </p>
            </div>
          </div>

          {/* Quick Toggle Controls & Match Filter Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMiniMap(!showMiniMap)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                showMiniMap
                  ? 'bg-cyan-400 text-black border-cyan-400 shadow-md shadow-cyan-400/20'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{showMiniMap ? 'Hide Map' : 'Show Mini-Map'}</span>
            </button>

            <button
              onClick={onOpenFilters}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                activeFilterCount > 0
                  ? 'bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 text-black border-transparent shadow-md shadow-pink-500/25'
                  : 'bg-zinc-900 border-purple-900/40 text-cyan-300 hover:border-pink-500'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-black text-pink-400 text-[10px] flex items-center justify-center font-mono">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MINI-MAP CLUSTER VIEW */}
        {showMiniMap && (
          <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-inner flex flex-col justify-between p-3">
            {/* Map Grid Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900/80 to-purple-950/30 pointer-events-none" />

            {/* Map Header bar */}
            <div className="relative z-10 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                  Regional Cluster Radar
                </span>
              </div>
              {selectedRegionCluster && (
                <button
                  onClick={() => setSelectedRegionCluster(null)}
                  className="px-2 py-0.5 rounded-lg bg-pink-500/20 border border-pink-500/40 text-[10px] font-bold text-pink-300 hover:bg-pink-500/30 transition"
                >
                  Clear Region: {selectedRegionCluster} ✕
                </button>
              )}
            </div>

            {/* Interactive Cluster Nodes */}
            <div className="absolute inset-0 z-10 pointer-events-auto">
              {regionClusters.map(cluster => {
                const isSelected = selectedRegionCluster === cluster.name;
                return (
                  <button
                    key={cluster.name}
                    onClick={() => setSelectedRegionCluster(isSelected ? null : cluster.name)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 ${
                      isSelected ? 'scale-110 z-20' : 'hover:scale-105'
                    }`}
                    style={{ left: cluster.x, top: cluster.y }}
                  >
                    <div className={`p-2.5 rounded-2xl bg-gradient-to-tr ${cluster.color} text-black font-extrabold shadow-xl border-2 ${
                      isSelected ? 'border-white ring-4 ring-pink-500/40' : 'border-zinc-950'
                    } flex items-center gap-1.5`}>
                      <MapPin className="w-3.5 h-3.5 fill-black text-black" />
                      <div className="text-left">
                        <span className="text-[11px] font-black text-black block whitespace-nowrap leading-tight">
                          {cluster.name}
                        </span>
                        <span className="text-[9px] font-mono text-black/80 font-bold block">
                          {cluster.count} Vibe Reels
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Footer Helper */}
            <div className="relative z-10 flex items-center justify-between text-[10px] text-zinc-400 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-xl border border-zinc-800">
              <span>Tap a regional cluster to filter 10s video feeds</span>
              <span className="text-cyan-400 font-bold">GPS Radar Active</span>
            </div>
          </div>
        )}

        {/* Tribe Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {tribesList.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTribe(t)}
              className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition border ${
                selectedTribe === t
                  ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black border-transparent font-bold shadow-md shadow-pink-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:border-purple-600 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Nearby Users with Video Previews & Quick Actions */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-16 bg-zinc-950 border border-zinc-800 rounded-3xl space-y-2">
          <p className="text-sm font-bold text-zinc-300">No guys found matching current filters</p>
          <p className="text-xs text-zinc-500">Try adjusting your age, distance, or interest filters.</p>
          <button
            onClick={onOpenFilters}
            className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-bold text-xs"
          >
            Adjust Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredUsers.map(user => {
            const userVideo = getUserVideo(user.id);
            const isHovered = activeHoveredUserId === user.id;
            const connStatus = connectionStatuses[user.id] || 'none';

            return (
              <div
                key={user.id}
                onMouseEnter={() => setActiveHoveredUserId(user.id)}
                onMouseLeave={() => setActiveHoveredUserId(null)}
                className="group relative aspect-[9/13] rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900 border border-purple-900/30 hover:border-pink-500 shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Background Video or Photo */}
                {isHovered && userVideo ? (
                  <video
                    src={userVideo.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                {/* Dark Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

                {/* Top Badge: Distance & Play Video / Vault */}
                <div className="relative z-10 p-2.5 flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-cyan-500/40 text-[10px] text-white shadow-md">
                      <span className={`w-1.5 h-1.5 rounded-full ${user.isOnline ? 'bg-cyan-400 animate-ping' : 'bg-zinc-500'}`} />
                      <span className="font-mono font-bold text-cyan-300">{user.distanceMiles} mi away</span>
                    </div>
                    {/* Visual Proximity Pulse Bar */}
                    <div className="w-20 bg-zinc-950/80 border border-zinc-800 rounded-full h-1 overflow-hidden p-0.5 flex items-center">
                      <div
                        className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 h-0.5 rounded-full"
                        style={{ width: `${Math.max(10, Math.min(100, 100 - (user.distanceMiles / 25) * 100))}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Private Vault shortcut */}
                    <button
                      onClick={() => onOpenPrivateFolder(user)}
                      className="bg-black/60 hover:bg-pink-500/20 text-pink-400 border border-white/10 p-1.5 rounded-full transition"
                      title="View Private Vault (35h lock)"
                    >
                      <Lock className="w-3 h-3" />
                    </button>

                    {/* 10s Video Reel Badge */}
                    {userVideo && (
                      <button
                        onClick={() => onSelectUserVideo(userVideo)}
                        className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 text-black p-1.5 rounded-full shadow-lg transition active:scale-90"
                        title="Watch 10s Video"
                      >
                        <Play className="w-3 h-3 fill-black" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom User Info & Instant Actions */}
                <div className="relative z-10 p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="text-sm font-extrabold text-white truncate drop-shadow">
                        {user.name.split(' ')[0]}
                      </span>
                      <span className="text-pink-400 font-bold text-xs">
                        {user.age}
                      </span>
                    </div>

                    {user.isVerifiedAge && (
                      <span className="text-cyan-400" title="18+ Verified">
                        <ShieldCheck className="w-4 h-4 fill-cyan-400/20" />
                      </span>
                    )}
                  </div>

                  <p className="text-[10px] text-zinc-300 line-clamp-1">
                    {user.bio}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    {/* Connect or Gift Actions */}
                    <div className="flex items-center gap-1">
                      {connStatus === 'connected' ? (
                        <span className="text-[9px] px-2 py-0.5 rounded-md bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold">
                          Matched
                        </span>
                      ) : connStatus === 'pending_sent' ? (
                        <span className="text-[9px] px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700 font-semibold">
                          Pending
                        </span>
                      ) : (
                        <button
                          onClick={() => onSendConnectionRequest(user)}
                          className="p-1.5 rounded-lg bg-zinc-950/80 hover:bg-cyan-500/20 text-cyan-300 border border-zinc-800 transition"
                          title="Send Connection Request"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => onOpenGiftModal(user)}
                        className="p-1.5 rounded-lg bg-zinc-950/80 hover:bg-pink-500/20 text-pink-400 border border-zinc-800 transition"
                        title="Send Virtual Gift"
                      >
                        <Gift className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Instant Action buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onSendTap(user, 'Sent a Flame reaction 🔥')}
                        className="p-1.5 rounded-lg bg-zinc-950/80 hover:bg-pink-500/20 text-pink-400 border border-zinc-800 transition"
                        title="Send Flame"
                      >
                        <Flame className="w-3.5 h-3.5 fill-pink-400" />
                      </button>
                      <button
                        onClick={() => onStartChat(user)}
                        className="p-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white transition shadow-sm"
                        title="Direct Chat"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      </button>
                      <button
                        onClick={() => onOpenProfile(user)}
                        className="p-1.5 rounded-lg bg-zinc-950/80 hover:bg-zinc-800 text-cyan-300 border border-zinc-800 transition text-[10px] font-bold"
                        title="View Full Profile"
                      >
                        Info
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
