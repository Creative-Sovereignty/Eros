import React, { useState } from 'react';
import { X, Heart, Send, ShieldCheck } from 'lucide-react';
import { Comment, User } from '../types';

interface CommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  comments: Comment[];
  currentUser: User;
  onAddComment: (videoId: string, text: string) => void;
  onLikeComment: (videoId: string, commentId: string) => void;
}

export const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
  isOpen,
  onClose,
  videoId,
  comments,
  currentUser,
  onAddComment,
  onLikeComment
}) => {
  const [newComment, setNewComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(videoId, newComment.trim());
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg mx-auto bg-zinc-950 border-t border-zinc-800 rounded-t-3xl overflow-hidden shadow-2xl max-h-[75vh] flex flex-col animate-in slide-in-from-bottom duration-200">
        {/* Handle & Header */}
        <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="w-10 h-1 bg-zinc-700 rounded-full mx-auto absolute top-2 inset-x-0" />
          <div className="text-center w-full">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition absolute right-4 top-3"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Comment List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-10 text-zinc-500 text-xs">
              No comments yet. Be the first to spark the conversation!
            </div>
          ) : (
            comments.map(c => (
              <div key={c.id} className="flex items-start gap-3">
                <img
                  src={c.user.avatar}
                  alt={c.user.name}
                  className="w-8 h-8 rounded-full object-cover border border-zinc-800"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white truncate">{c.user.name}</span>
                    {c.user.isVerifiedAge && (
                      <span className="text-amber-400" title="18+ Verified">
                        <ShieldCheck className="w-3 h-3 fill-amber-400/20" />
                      </span>
                    )}
                    <span className="text-[10px] text-zinc-500">• {c.createdAt}</span>
                  </div>
                  <p className="text-xs text-zinc-200 mt-0.5 leading-relaxed break-words">{c.text}</p>
                </div>
                <button
                  onClick={() => onLikeComment(videoId, c.id)}
                  className="flex flex-col items-center gap-0.5 text-zinc-400 hover:text-red-400 pt-1"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${c.isLiked ? 'fill-red-500 text-red-500' : ''}`}
                  />
                  <span className="text-[10px]">{c.likes}</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* New Comment Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-zinc-800 bg-zinc-900/80 flex items-center gap-2">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-7 h-7 rounded-full object-cover border border-amber-500/50"
          />
          <input
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Add a comment or compliment..."
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-full px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className={`p-2 rounded-full transition ${
              newComment.trim()
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30'
                : 'text-zinc-600 bg-zinc-800'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
