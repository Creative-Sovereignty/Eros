import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  Clock, 
  ShieldCheck, 
  Plus, 
  X, 
  Trash2, 
  UserCheck, 
  Key, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Sparkles
} from 'lucide-react';
import { User, PrivateFolderItem, PrivateFolderGrant } from '../types';
import confetti from 'canvas-confetti';

interface PrivateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  // If viewing someone else's folder:
  targetUser?: User | null;
  // Current user's own items:
  myItems: PrivateFolderItem[];
  onAddMyItem: (item: PrivateFolderItem) => void;
  onRemoveMyItem: (itemId: string) => void;
  // Grants map: userId -> { targetUserId, grantedAt, expiresAt }
  grants: Record<string, PrivateFolderGrant>;
  onGrantAccess: (targetUserId: string) => void;
  onRevokeAccess: (targetUserId: string) => void;
  // Target user's items (if viewing someone else):
  targetUserItems?: PrivateFolderItem[];
  allUsers: User[];
}

export const PrivateFolderModal: React.FC<PrivateFolderModalProps> = ({
  isOpen,
  onClose,
  targetUser,
  myItems,
  onAddMyItem,
  onRemoveMyItem,
  grants,
  onGrantAccess,
  onRevokeAccess,
  targetUserItems = [],
  allUsers
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newCaption, setNewCaption] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [now, setNow] = useState(Date.now());

  // Update clock every 30 seconds for remaining hours/minutes
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const isViewingSelf = !targetUser;
  const targetUserId = targetUser?.id || '';
  const currentGrant = grants[targetUserId];
  const isTargetUnlocked = currentGrant && currentGrant.expiresAt > now;

  // Format 35h remaining time
  const formatTimeRemaining = (expiresAt: number) => {
    const diffMs = expiresAt - now;
    if (diffMs <= 0) return 'Expired (Relocked)';
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const handleUploadItem = (e: React.FormEvent) => {
    e.preventDefault();
    const url = newImageUrl.trim() || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
    const newItem: PrivateFolderItem = {
      id: `priv_user_${Date.now()}`,
      type: 'image',
      url,
      caption: newCaption.trim() || 'Private snapshot 🔒',
      addedAt: 'Just now'
    };
    onAddMyItem(newItem);
    setNewImageUrl('');
    setNewCaption('');
    setIsAdding(false);

    confetti({ particleCount: 30, spread: 45 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  {isViewingSelf ? 'My Private Folder' : `${targetUser?.name}'s Private Folder`}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold">
                  35-HR AUTO-LOCK
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                {isViewingSelf
                  ? 'Manage your confidential media and active grants'
                  : isTargetUnlocked
                  ? 'Access granted • Strictly auto-relocks in 35 hours'
                  : 'Encrypted vault. Request access or enter key.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* EXPLICIT POLICY EXEMPTION BANNER */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-950/40 to-zinc-900 border border-rose-500/30 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-rose-300 block">Private Vault Policy & Auto-Relock Protection</span>
              <p className="text-zinc-400 text-[11px] mt-0.5 leading-relaxed">
                Members may store personal media of their choice in this folder. Content here is excluded from the public stream AI scanner. All unlocks granted to other users are temporary and <strong className="text-rose-300">automatically relock after 35 hours</strong>.
              </p>
            </div>
          </div>

          {/* VIEWING SOMEONE ELSE'S FOLDER */}
          {!isViewingSelf && (
            <div>
              {!isTargetUnlocked ? (
                <div className="p-8 text-center bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-600">
                    <Lock className="w-8 h-8 text-rose-500/80" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white">This Folder is Locked</h4>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                      {targetUser?.name} keeps their private photos locked. You can request access, or unlock if they shared an invite.
                    </p>
                  </div>

                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        onGrantAccess(targetUserId);
                        confetti({ particleCount: 30, spread: 50 });
                      }}
                      className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-rose-500/20 active:scale-95 transition"
                    >
                      <Key className="w-4 h-4 fill-black" />
                      Simulate Unlock (35-Hour Pass)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Active Timer Pill */}
                  <div className="p-3 bg-zinc-900/90 border border-amber-500/30 rounded-2xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-amber-300 font-bold">
                      <Clock className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Auto-relocks in {formatTimeRemaining(currentGrant.expiresAt)}</span>
                    </div>
                    <button
                      onClick={() => onRevokeAccess(targetUserId)}
                      className="text-[11px] text-zinc-400 hover:text-rose-400 transition underline"
                    >
                      Lock now
                    </button>
                  </div>

                  {/* Grid of target user's private media */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {targetUserItems.map(item => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedImage(item.url)}
                        className="group relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 cursor-pointer hover:border-rose-400 transition"
                      >
                        <img src={item.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition" />
                        <div className="absolute bottom-2 inset-x-2 text-[10px] text-white bg-black/70 backdrop-blur-md px-2 py-1 rounded-xl truncate">
                          {item.caption}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEWING MY OWN FOLDER */}
          {isViewingSelf && (
            <div className="space-y-5">
              {/* Controls bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    My Stored Media ({myItems.length})
                  </span>
                </div>
                <button
                  onClick={() => setIsAdding(prev => !prev)}
                  className="px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Private Item
                </button>
              </div>

              {/* Add form */}
              {isAdding && (
                <form onSubmit={handleUploadItem} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 animate-in fade-in duration-200">
                  <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Add to Confidential Vault</h4>
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">Image URL</label>
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={e => setNewImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">Private Caption</label>
                    <input
                      type="text"
                      value={newCaption}
                      onChange={e => setNewCaption(e.target.value)}
                      placeholder="Mirror selfie, pool day, etc."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-rose-500 text-black font-bold text-xs"
                    >
                      Store in Vault
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-3 py-2 rounded-xl text-zinc-400 text-xs hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Grid of my items */}
              {myItems.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-zinc-800 rounded-2xl text-xs text-zinc-500">
                  Your private folder is empty. Add photos to selectively share with connections.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {myItems.map(item => (
                    <div
                      key={item.id}
                      className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 group"
                    >
                      <img src={item.url} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-between p-2">
                        <button
                          onClick={() => onRemoveMyItem(item.id)}
                          className="self-end p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <p className="text-[10px] text-white truncate">{item.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ACTIVE 35-HOUR USER UNLOCK MANAGEMENT */}
              <div className="pt-4 border-t border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Members With 35-Hour Access
                  </h4>
                  <span className="text-[10px] text-zinc-500">Auto-expires after 35 hours</span>
                </div>

                <div className="space-y-2">
                  {allUsers.slice(0, 4).map(user => {
                    const grant = grants[user.id];
                    const isUnlocked = grant && grant.expiresAt > now;

                    return (
                      <div
                        key={user.id}
                        className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover border border-zinc-700"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-white">{user.name}</span>
                              <span className="text-[10px] text-zinc-500">@{user.username}</span>
                            </div>
                            <span className="text-[10px] text-zinc-400 block">
                              {isUnlocked ? (
                                <span className="text-amber-400 font-medium flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Relocks in {formatTimeRemaining(grant.expiresAt)}
                                </span>
                              ) : (
                                'Locked • No access'
                              )}
                            </span>
                          </div>
                        </div>

                        {isUnlocked ? (
                          <button
                            onClick={() => onRevokeAccess(user.id)}
                            className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-rose-500/20 text-rose-400 border border-zinc-700 text-xs font-semibold transition"
                          >
                            Relock Now
                          </button>
                        ) : (
                          <button
                            onClick={() => onGrantAccess(user.id)}
                            className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition flex items-center gap-1"
                          >
                            <Unlock className="w-3.5 h-3.5" />
                            Grant 35h
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
