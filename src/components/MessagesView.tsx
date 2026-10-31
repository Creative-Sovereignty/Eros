import React, { useState } from 'react';
import { User, ChatThread, ChatMessage, Message, VirtualGift } from '../types';
import { 
  Send, 
  ArrowLeft, 
  ShieldCheck, 
  Flame, 
  MapPin, 
  Smile, 
  Sparkles,
  Gift,
  Lock,
  Flag,
  UserCheck,
  Heart,
  Camera,
  Image,
  CheckCircle2,
  LockKeyhole,
  Check,
  CheckCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MessagesViewProps {
  threads: ChatThread[];
  currentUser: User;
  activeThreadId: string | null;
  onSelectThread: (threadId: string | null) => void;
  onSendMessage: (threadId: string, text: string, mediaType?: 'text' | 'flame' | 'location') => void;
  onOpenProfile: (user: User) => void;
  onOpenGiftModal?: (user: User) => void;
  onOpenPrivateFolder?: (user: User) => void;
  onReportMessage?: (user: User) => void;
  onOpenVideoCreator?: () => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  threads,
  currentUser,
  activeThreadId,
  onSelectThread,
  onSendMessage,
  onOpenProfile,
  onOpenGiftModal,
  onOpenPrivateFolder,
  onReportMessage,
  onOpenVideoCreator
}) => {
  const [inputText, setInputText] = useState('');
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'mutual'>('all');

  const currentThread = threads.find(t => t.id === activeThreadId) || null;

  // Mutual match threads (where both users like each other)
  const mutualThreads = threads.filter(t => t.isMutualMatch || t.bothLiked);

  const displayThreads = activeTabFilter === 'mutual' ? mutualThreads : threads;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !currentThread) return;

    onSendMessage(currentThread.id, inputText.trim(), 'text');
    setInputText('');

    if (currentThread.isMutualMatch) {
      confetti({
        particleCount: 20,
        spread: 45,
        colors: ['#06b6d4', '#ec4899', '#a855f7'],
        origin: { y: 0.8 }
      });
    }
  };

  const handleSendFlameReaction = () => {
    if (!currentThread) return;
    onSendMessage(currentThread.id, 'Sent a Flame reaction 🔥', 'flame');
  };

  const handleShareLocation = () => {
    if (!currentThread) return;
    onSendMessage(currentThread.id, `Shared proximity: Santa Monica Blvd, West Hollywood (0.3 mi away) 📍`, 'location');
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[calc(100vh-4rem)] md:h-[calc(100vh-4.5rem)] flex bg-zinc-950 md:border border-purple-900/40 md:rounded-3xl overflow-hidden shadow-2xl">
      
      {/* LEFT SIDEBAR: THREAD LIST & MUTUAL SPARKS */}
      <div className={`w-full md:w-80 flex-shrink-0 border-r border-zinc-800/80 flex flex-col bg-zinc-950 ${
        activeThreadId ? 'hidden md:flex' : 'flex'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-white flex items-center gap-1.5">
              <span>Messages & Sparks</span>
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            </h2>
            <p className="text-xs text-zinc-400">Private 1-on-1 verified chats</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 font-mono">
            {threads.reduce((acc, t) => acc + t.unreadCount, 0)} New
          </span>
        </div>

        {/* MUTUAL MATCHES QUICK BUBBLE CAROUSEL (Users that like each other) */}
        {mutualThreads.length > 0 && (
          <div className="p-3 bg-gradient-to-b from-purple-950/40 via-zinc-950 to-zinc-950 border-b border-purple-900/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 flex items-center gap-1">
                <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                Mutual Likes ({mutualThreads.length})
              </span>
              <span className="text-[9px] text-pink-300 font-semibold">Liked you back!</span>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1">
              {mutualThreads.map(thread => {
                const isSelected = thread.id === activeThreadId;
                return (
                  <button
                    key={`bubble_${thread.id}`}
                    onClick={() => onSelectThread(thread.id)}
                    className="flex flex-col items-center gap-1 flex-shrink-0 group focus:outline-none"
                    title={`Open private individual chat with ${thread.participant.name}`}
                  >
                    <div className="relative">
                      <div className={`w-13 h-13 rounded-full p-0.5 transition-transform duration-200 group-hover:scale-105 ${
                        isSelected
                          ? 'bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 ring-2 ring-pink-500/80 shadow-[0_0_12px_rgba(236,72,153,0.6)]'
                          : 'bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 shadow-md'
                      }`}>
                        <img
                          src={thread.participant.avatar}
                          alt={thread.participant.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-full p-1 text-white shadow-sm">
                        <Flame className="w-2.5 h-2.5 fill-white text-white" />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-300 max-w-[60px] truncate group-hover:text-pink-400 transition">
                      {thread.participant.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Filters: All vs Mutual Sparks */}
        <div className="grid grid-cols-2 p-2 bg-zinc-900/60 border-b border-zinc-800/80 gap-1.5 text-xs font-bold">
          <button
            onClick={() => setActiveTabFilter('all')}
            className={`py-1.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTabFilter === 'all'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>All Messages</span>
            <span className="text-[10px] text-zinc-400">({threads.length})</span>
          </button>
          <button
            onClick={() => setActiveTabFilter('mutual')}
            className={`py-1.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTabFilter === 'mutual'
                ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-pink-300 border border-pink-500/50 shadow-sm'
                : 'text-zinc-400 hover:text-pink-300'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
            <span>Mutual Likes</span>
            <span className="text-[10px] text-pink-400">({mutualThreads.length})</span>
          </button>
        </div>

        {/* Thread List */}
        <div className="flex-1 overflow-y-auto divide-y divide-zinc-900">
          {displayThreads.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500 space-y-1.5">
              <Sparkles className="w-6 h-6 text-pink-400 mx-auto opacity-60" />
              <p className="font-semibold text-zinc-400">No conversations in this view</p>
              <p className="text-[11px]">Send a Flame or Like a guy's 10s video on the stream to start a private chat!</p>
            </div>
          ) : (
            displayThreads.map(thread => {
              const isSelected = thread.id === activeThreadId;
              const isMutual = thread.isMutualMatch || thread.bothLiked;
              return (
                <button
                  key={thread.id}
                  onClick={() => onSelectThread(thread.id)}
                  className={`w-full p-3.5 flex items-center gap-3 text-left transition ${
                    isSelected
                      ? 'bg-zinc-900 border-l-4 border-pink-500'
                      : 'hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={thread.participant.avatar}
                      alt={thread.participant.name}
                      className={`w-12 h-12 rounded-full object-cover ${
                        isMutual ? 'border-2 border-pink-500 shadow-md shadow-pink-500/20' : 'border border-zinc-800'
                      }`}
                    />
                    {thread.participant.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-sm font-bold text-white truncate">
                          {thread.participant.name}
                        </span>
                        {isMutual && (
                          <span className="px-1.5 py-0.2 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-[9px] font-black tracking-tight flex items-center gap-0.5">
                            <Heart className="w-2.5 h-2.5 fill-pink-500 text-pink-500" />
                            Match
                          </span>
                        )}
                        {thread.participant.isVerifiedAge && (
                          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-500">{thread.lastMessageTime}</span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-0.5">
                      {thread.messages.length > 0 && thread.messages[thread.messages.length - 1].isMine && (
                        (() => {
                          const lastMsg = thread.messages[thread.messages.length - 1];
                          const status = lastMsg.readStatus || 'read';
                          return (
                            <span
                              className="flex items-center flex-shrink-0"
                              title={status === 'read' ? 'Read by recipient' : status === 'delivered' ? 'Delivered' : 'Sent'}
                            >
                              {status === 'read' ? (
                                <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
                              ) : status === 'delivered' ? (
                                <CheckCheck className="w-3.5 h-3.5 text-zinc-500" />
                              ) : (
                                <Check className="w-3.5 h-3.5 text-zinc-500" />
                              )}
                            </span>
                          );
                        })()
                      )}
                      <p className="text-xs text-zinc-400 truncate">
                        {thread.lastMessage}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 text-[10px] text-zinc-500">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>{thread.participant.distanceMiles} mi away</span>
                      <span>•</span>
                      <span className="text-zinc-400">{thread.participant.tribe}</span>
                    </div>
                  </div>

                  {thread.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 text-black text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {thread.unreadCount}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT AREA: ACTIVE CHAT THREAD */}
      <div className={`flex-1 flex flex-col bg-zinc-900/30 ${
        !activeThreadId ? 'hidden md:flex items-center justify-center' : 'flex'
      }`}>
        {currentThread ? (
          <>
            {/* Chat Top Header */}
            <div className="p-3.5 px-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectThread(null)}
                  className="md:hidden p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => onOpenProfile(currentThread.participant)}
                  className="relative flex items-center gap-2.5 text-left group"
                >
                  <img
                    src={currentThread.participant.avatar}
                    alt={currentThread.participant.name}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-800 group-hover:border-pink-500 transition"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white group-hover:text-pink-400 transition">
                        {currentThread.participant.name}
                      </span>
                      <span className="text-pink-400 font-semibold text-xs">{currentThread.participant.age}</span>
                      {currentThread.participant.isVerifiedAge && (
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-400 block">
                      {currentThread.participant.isOnline ? 'Active now' : currentThread.participant.lastActive} • {currentThread.participant.distanceMiles} mi away
                    </span>
                  </div>
                </button>
              </div>

              {/* Action shortcuts: Gift, Vault, Flame, Location, Report */}
              <div className="flex items-center gap-1.5">
                {onOpenGiftModal && (
                  <button
                    onClick={() => onOpenGiftModal(currentThread.participant)}
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-cyan-500/20 text-cyan-300 border border-zinc-800 transition"
                    title="Send Virtual Gift"
                  >
                    <Gift className="w-4 h-4" />
                  </button>
                )}

                {onOpenPrivateFolder && (
                  <button
                    onClick={() => onOpenPrivateFolder(currentThread.participant)}
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-pink-500/20 text-pink-400 border border-zinc-800 transition"
                    title="View Private Vault (35h Auto-lock)"
                  >
                    <Lock className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={handleSendFlameReaction}
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-pink-500/20 text-pink-400 border border-zinc-800 transition"
                  title="Send Quick Flame"
                >
                  <Flame className="w-4 h-4 fill-pink-500" />
                </button>

                <button
                  onClick={handleShareLocation}
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-purple-500/20 text-purple-300 border border-zinc-800 transition"
                  title="Share Distance / Location"
                >
                  <MapPin className="w-4 h-4" />
                </button>

                {onReportMessage && (
                  <button
                    onClick={() => onReportMessage(currentThread.participant)}
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-zinc-800 transition"
                    title="Report Message / Harassment"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              
              {/* MUTUAL MATCH HIGHLIGHT CARD (When users like each other!) */}
              {(currentThread.isMutualMatch || currentThread.bothLiked) && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-cyan-950/40 border border-pink-500/50 shadow-xl space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 p-0.5 text-black flex items-center justify-center font-bold">
                        <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-pink-400">
                          <Heart className="w-4 h-4 fill-pink-500" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-black text-white">
                            It's a Mutual Spark! You & {currentThread.participant.name.split(' ')[0]} like each other
                          </h4>
                          <span className="px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 font-mono font-bold text-[9px]">
                            1-ON-1 PRIVATE
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-300">
                          End-to-end encrypted private individual chat unlocked.
                        </p>
                      </div>
                    </div>

                    {onOpenPrivateFolder && (
                      <button
                        onClick={() => onOpenPrivateFolder(currentThread.participant)}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition flex items-center gap-1"
                        title="Grant or View 35-Hour Private Vault"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Private Vault</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Security info banner */}
              <div className="p-2.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 text-center max-w-sm mx-auto space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> 18+ Age Verified Individual Encrypted Chat
                </p>
                <p className="text-[10px] text-zinc-500">
                  Private folders remain locked and auto-expire in 35 hours when shared.
                </p>
              </div>

              {currentThread.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-xs shadow-md ${
                      msg.isMine
                        ? 'bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-black font-semibold rounded-br-none'
                        : 'bg-zinc-800/90 text-zinc-100 rounded-bl-none border border-zinc-700/60'
                    }`}
                  >
                    <p className="leading-relaxed break-words">{msg.text}</p>
                    <div
                      className={`text-[9.5px] flex items-center justify-end gap-1.5 mt-1 select-none ${
                        msg.isMine ? 'text-black/85 font-bold' : 'text-zinc-500'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {msg.isMine && (
                        <div
                          className="inline-flex items-center gap-0.5"
                          title={
                            (!msg.readStatus || msg.readStatus === 'read')
                              ? 'Read by user'
                              : msg.readStatus === 'delivered'
                              ? 'Delivered'
                              : 'Sent'
                          }
                        >
                          {(!msg.readStatus || msg.readStatus === 'read') ? (
                            <span className="inline-flex items-center gap-0.5 text-cyan-950 font-black">
                              <CheckCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span className="text-[8px] uppercase tracking-wider font-extrabold">Read</span>
                            </span>
                          ) : msg.readStatus === 'delivered' ? (
                            <span className="inline-flex items-center gap-0.5 text-black/60 font-semibold">
                              <CheckCheck className="w-3.5 h-3.5 stroke-[2]" />
                              <span className="text-[8px] font-medium">Delivered</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 text-black/50 font-semibold">
                              <Check className="w-3.5 h-3.5 stroke-[2]" />
                              <span className="text-[8px] font-medium">Sent</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Tap Suggestions Pill Bar */}
            <div className="px-4 py-2 bg-zinc-950/90 border-t border-zinc-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
              {[
                { label: 'Free tonight? 🍸', text: 'Hey! Are you free for drinks tonight? 🍸' },
                { label: 'Hit the gym? 💪', text: 'Want to hit a gym session together? 💪' },
                { label: 'Loved your 10s clip 🔥', text: 'Loved your 10-second video! Super handsome 🔥' },
                { label: 'Coffee date ☕', text: 'Care to grab a coffee nearby? ☕' }
              ].map(q => (
                <button
                  key={q.label}
                  onClick={() => onSendMessage(currentThread.id, q.text, 'text')}
                  className="px-3 py-1 rounded-full bg-zinc-900 border border-purple-500/30 text-[11px] font-medium text-cyan-300 hover:border-pink-500 hover:text-pink-300 whitespace-nowrap transition flex-shrink-0"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Message Input Box with 10s Record / Camera Shortcut */}
            <form onSubmit={handleSend} className="p-3 border-t border-zinc-800 bg-zinc-950 flex items-center gap-2">
              {onOpenVideoCreator && (
                <button
                  type="button"
                  onClick={onOpenVideoCreator}
                  className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-pink-400 border border-purple-500/30 transition flex-shrink-0"
                  title="Record 10s Video Note (Camera & Mic)"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder={`Message ${currentThread.participant.name.split(' ')[0]} in private chat...`}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`p-2.5 rounded-full transition ${
                  inputText.trim()
                    ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-md shadow-pink-500/25 active:scale-95'
                    : 'text-zinc-600 bg-zinc-900'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="p-8 text-center space-y-3 text-zinc-500">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-purple-900/40 flex items-center justify-center mx-auto text-pink-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-zinc-300">Select a private individual conversation</p>
            <p className="text-xs max-w-xs mx-auto">
              Choose a guy from your inbox or discover someone on the radar to start chatting. Mutual sparks unlock 1-on-1 private encrypted messaging!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
