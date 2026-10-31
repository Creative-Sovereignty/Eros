import React, { useState } from 'react';
import { UserCheck, Check, X, ShieldCheck, MapPin, MessageCircle, HeartHandshake } from 'lucide-react';
import { ConnectionRequest, User } from '../types';
import confetti from 'canvas-confetti';

interface ConnectionRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: ConnectionRequest[];
  onAcceptRequest: (reqId: string, user: User) => void;
  onDeclineRequest: (reqId: string) => void;
  onOpenProfile: (user: User) => void;
}

export const ConnectionRequestsModal: React.FC<ConnectionRequestsModalProps> = ({
  isOpen,
  onClose,
  requests,
  onAcceptRequest,
  onDeclineRequest,
  onOpenProfile
}) => {
  if (!isOpen) return null;

  const pendingRequests = requests.filter(r => r.status === 'pending');

  const handleAccept = (req: ConnectionRequest) => {
    onAcceptRequest(req.id, req.user);
    confetti({ particleCount: 70, spread: 65 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Connection Requests ({pendingRequests.length})
              </h3>
              <p className="text-[11px] text-zinc-400">Guys wanting to connect and chat directly</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Requests List */}
        <div className="p-4 overflow-y-auto space-y-3">
          {pendingRequests.length === 0 ? (
            <div className="py-12 text-center space-y-2 text-zinc-500 text-xs">
              <UserCheck className="w-8 h-8 mx-auto text-zinc-600" />
              <p className="font-semibold text-zinc-300">No pending connection requests</p>
              <p>Explore the nearby radar or send requests to guys you like!</p>
            </div>
          ) : (
            pendingRequests.map(req => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-400/40 transition"
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => {
                      onOpenProfile(req.user);
                      onClose();
                    }}
                    className="relative flex-shrink-0"
                  >
                    <img
                      src={req.user.avatar}
                      alt={req.user.name}
                      className="w-12 h-12 rounded-full object-cover border border-zinc-700"
                    />
                    {req.user.isVerifiedAge && (
                      <span className="absolute -bottom-1 -right-1 bg-amber-400 text-black p-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" />
                      </span>
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">{req.user.name}</span>
                      <span className="text-amber-400 font-bold text-xs">{req.user.age}</span>
                      <span className="text-[10px] text-zinc-500">• {req.sentAt}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                      <span className="flex items-center gap-1 text-amber-300">
                        <MapPin className="w-3 h-3" />
                        {req.user.distanceMiles} mi away
                      </span>
                      <span>•</span>
                      <span>{req.user.tribe}</span>
                    </div>

                    {req.introMessage && (
                      <p className="text-xs text-zinc-300 bg-zinc-950/70 p-2 rounded-xl border border-zinc-800/80 italic">
                        "{req.introMessage}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => onDeclineRequest(req.id)}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
                    title="Decline"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleAccept(req)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    Accept & Chat
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
