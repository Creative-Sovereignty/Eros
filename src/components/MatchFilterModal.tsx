import React, { useState } from 'react';
import { SlidersHorizontal, X, Check, Sparkles, Crown } from 'lucide-react';
import { MatchFilterSettings } from '../types';

interface MatchFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: MatchFilterSettings;
  onApplyFilters: (filters: MatchFilterSettings) => void;
  isVipMember: boolean;
  onOpenVipUpgrade: () => void;
}

const ALL_INTERESTS = [
  'Fitness', 'Nightlife', 'Coffee', 'Architecture', 'Surfing', 
  'Culinary', 'ElectronicMusic', 'Fashion', 'Gaming', 'Travel', 'ArtGalleries'
];

export const MatchFilterModal: React.FC<MatchFilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  isVipMember,
  onOpenVipUpgrade
}) => {
  const [minAge, setMinAge] = useState(filters.minAge);
  const [maxAge, setMaxAge] = useState(filters.maxAge);
  const [maxDistance, setMaxDistance] = useState(filters.maxDistance);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(filters.selectedInterests);
  const [onlineOnly, setOnlineOnly] = useState(filters.onlineOnly);
  const [verifiedOnly, setVerifiedOnly] = useState(filters.verifiedOnly);
  const [tribe, setTribe] = useState(filters.tribe);

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      minAge,
      maxAge,
      maxDistance,
      selectedInterests,
      onlineOnly,
      verifiedOnly,
      tribe,
      lookingFor: filters.lookingFor
    });
    onClose();
  };

  const handleReset = () => {
    setMinAge(18);
    setMaxAge(60);
    setMaxDistance(15);
    setSelectedInterests([]);
    setOnlineOnly(false);
    setVerifiedOnly(false);
    setTribe('All');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Matching Filters
              </h3>
              <p className="text-[11px] text-zinc-400">Discover guys by age, distance & interests</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* 1. AGE RANGE SLIDER */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white uppercase tracking-wider">Age Range</span>
              <span className="font-mono text-amber-400 font-bold">{minAge} - {maxAge} years old</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-zinc-500 block">Min Age (18+)</label>
                <input
                  type="range"
                  min={18}
                  max={60}
                  value={minAge}
                  onChange={e => {
                    const val = Number(e.target.value);
                    if (val <= maxAge) setMinAge(val);
                  }}
                  className="w-full accent-amber-400"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 block">Max Age</label>
                <input
                  type="range"
                  min={18}
                  max={70}
                  value={maxAge}
                  onChange={e => {
                    const val = Number(e.target.value);
                    if (val >= minAge) setMaxAge(val);
                  }}
                  className="w-full accent-amber-400"
                />
              </div>
            </div>
          </div>

          {/* 2. MAXIMUM DISTANCE */}
          <div className="space-y-2 pt-2 border-t border-zinc-800/80">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white uppercase tracking-wider">Maximum Distance</span>
              <span className="font-mono text-amber-400 font-bold">Within {maxDistance} miles</span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              value={maxDistance}
              onChange={e => setMaxDistance(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-zinc-500">
              <span>1 mile</span>
              <span>15 miles</span>
              <span>50 miles</span>
            </div>
          </div>

          {/* 3. INTERESTS & TAGS MULTI-SELECT */}
          <div className="space-y-2 pt-2 border-t border-zinc-800/80">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white uppercase tracking-wider">Interests & Hobbies</span>
              <span className="text-[10px] text-zinc-500">{selectedInterests.length} selected</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ALL_INTERESTS.map(interest => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                      isSelected
                        ? 'bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/20'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    #{interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. ADVANCED PREMIUM FILTERS */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Premium Search Criteria
                </span>
              </div>
              {!isVipMember && (
                <button
                  onClick={onOpenVipUpgrade}
                  className="text-[10px] text-amber-400 font-bold uppercase tracking-wider hover:underline"
                >
                  Unlock with VIP
                </button>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs text-zinc-300 cursor-pointer">
                <span>Online Now Only</span>
                <input
                  type="checkbox"
                  checked={onlineOnly}
                  onChange={e => setOnlineOnly(e.target.checked)}
                  className="rounded text-amber-400 focus:ring-amber-400"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-zinc-300 cursor-pointer">
                <span>18+ Biometrically Verified Only</span>
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={e => setVerifiedOnly(e.target.checked)}
                  className="rounded text-amber-400 focus:ring-amber-400"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/80 flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 transition active:scale-95"
          >
            Apply Match Filters
          </button>
        </div>
      </div>
    </div>
  );
};
