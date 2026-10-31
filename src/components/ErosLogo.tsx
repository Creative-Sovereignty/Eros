import React from 'react';

interface ErosLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'stacked' | 'icon-only';
  showBadge?: boolean;
  showTagline?: boolean;
  className?: string;
  glow?: boolean;
}

export const ErosLogo: React.FC<ErosLogoProps> = ({
  size = 'md',
  layout = 'horizontal',
  showBadge = true,
  showTagline = true,
  className = '',
  glow = true
}) => {
  // Dimensions based on size prop
  const iconDimensions = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }[size];

  const textSize = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl'
  }[size];

  const taglineSize = {
    xs: 'text-[8px]',
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm'
  }[size];

  const badgeSize = {
    xs: 'text-[7px] px-1 py-0.2',
    sm: 'text-[8px] px-1.5 py-0.5',
    md: 'text-[9px] px-2 py-0.5',
    lg: 'text-[11px] px-2.5 py-0.5',
    xl: 'text-xs px-3 py-1'
  }[size];

  // High-Definition Cupid's Crossed Arrows (Gold of Attraction & Silver of Flight/Boundaries)
  const IconMark = (
    <div
      className={`relative ${iconDimensions} flex-shrink-0 flex items-center justify-center rounded-2xl bg-[#08080d] border border-amber-500/25 p-1 transition-transform duration-300 group-hover:scale-105 ${
        glow ? 'shadow-[0_0_24px_rgba(245,158,11,0.25),0_0_12px_rgba(236,72,153,0.3)]' : 'shadow-md'
      }`}
      title="Eros's Crossed Arrows: Gold for Attraction, Silver for Boundaries"
    >
      {/* Background ambient radial glow: Warm Gold & Moonlit Silver-Pink */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-pink-500/15 to-slate-200/20 blur-[2px] pointer-events-none" />

      {/* High-Definition Crisp Vector Emblem */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
      >
        <defs>
          {/* Gold Arrow Gradients (Attraction & Passion) */}
          <linearGradient id="goldShaftGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          <linearGradient id="goldHeadGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          <linearGradient id="goldFeatherGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          {/* Silver Arrow Gradients (Protection, Boundaries & Flight) */}
          <linearGradient id="silverShaftGrad" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="40%" stopColor="#94a3b8" />
            <stop offset="75%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          <linearGradient id="silverHeadGrad" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="45%" stopColor="#cbd5e1" />
            <stop offset="85%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          <linearGradient id="silverFeatherGrad" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>

          {/* Cupid Wings Silhouette (Subtle & Ethereal) */}
          <linearGradient id="cupidWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
          </linearGradient>

          {/* Central Nexus Heart & Spark */}
          <linearGradient id="nexusHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2a85" />
            <stop offset="50%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>

          <radialGradient id="sparkHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
          </radialGradient>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Ethereal Cupid Wings framing the crossed arrows */}
        <path
          d="M 14 52 C 14 36, 26 24, 46 20 C 40 30, 32 38, 20 42 C 30 43, 40 40, 46 34 C 38 46, 28 54, 16 58 C 24 55, 34 50, 40 46 C 30 60, 20 68, 12 70 C 14 62, 14 56, 14 52 Z"
          fill="url(#cupidWingGrad)"
        />
        <path
          d="M 86 52 C 86 36, 74 24, 54 20 C 60 30, 68 38, 80 42 C 70 43, 60 40, 54 34 C 62 46, 72 54, 84 58 C 76 55, 66 50, 60 46 C 70 60, 80 68, 88 70 C 86 62, 86 56, 86 52 Z"
          fill="url(#cupidWingGrad)"
        />

        {/* 2. THE SILVER ARROW (Points Up-Left from (85,85) to (15,15)) */}
        {/* Silver Shaft */}
        <line
          x1="82"
          y1="82"
          x2="22"
          y2="22"
          stroke="url(#silverShaftGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Silver Shaft Highlight for metallic cylinder gleam */}
        <line
          x1="80"
          y1="80"
          x2="24"
          y2="24"
          stroke="#ffffff"
          strokeWidth="0.8"
          strokeOpacity="0.8"
        />

        {/* Silver Arrowhead (Sharp Chiseled Point at top-left) */}
        <path
          d="M 12 12 L 28 17 L 23 23 L 17 28 Z"
          fill="url(#silverHeadGrad)"
          stroke="#e2e8f0"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        {/* Silver Head Facet & Spine */}
        <path
          d="M 12 12 L 23 23"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M 12 12 L 28 17 L 23 23 Z"
          fill="#ffffff"
          fillOpacity="0.35"
        />

        {/* Silver Fletching / Feathers (at bottom-right (82,82)) */}
        {/* Upper Vane */}
        <path
          d="M 72 72 L 80 66 L 86 72 L 78 78 Z"
          fill="url(#silverFeatherGrad)"
          stroke="#cbd5e1"
          strokeWidth="0.5"
        />
        <line x1="75" y1="69" x2="83" y2="69" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.7" />
        <line x1="78" y1="74" x2="84" y2="74" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.7" />

        {/* Lower Vane */}
        <path
          d="M 72 72 L 66 80 L 72 86 L 78 78 Z"
          fill="url(#silverFeatherGrad)"
          stroke="#cbd5e1"
          strokeWidth="0.5"
        />
        <line x1="69" y1="75" x2="69" y2="83" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.7" />
        <line x1="74" y1="78" x2="74" y2="84" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.7" />

        {/* Silver Nock Notch */}
        <circle cx="85" cy="85" r="1.6" fill="#cbd5e1" />

        {/* 3. THE GOLD ARROW (Crosses over to point Up-Right from (15,85) to (85,15)) */}
        {/* Gold Shaft */}
        <line
          x1="18"
          y1="82"
          x2="78"
          y2="22"
          stroke="url(#goldShaftGrad)"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        {/* Gold Shaft Highlight */}
        <line
          x1="20"
          y1="80"
          x2="76"
          y2="24"
          stroke="#ffffff"
          strokeWidth="0.9"
          strokeOpacity="0.85"
        />

        {/* Gold Arrowhead (Lethal Cupid Heart-Broadhead at top-right) */}
        <path
          d="M 88 12 L 83 28 L 77 23 L 72 17 Z"
          fill="url(#goldHeadGrad)"
          stroke="#fef08a"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        {/* Gold Head Facet & Spine */}
        <path
          d="M 88 12 L 77 23"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M 88 12 L 83 28 L 77 23 Z"
          fill="#ffffff"
          fillOpacity="0.4"
        />

        {/* Gold Fletching / Feathers (at bottom-left (18,82)) */}
        {/* Upper Vane */}
        <path
          d="M 28 72 L 34 80 L 28 86 L 22 78 Z"
          fill="url(#goldFeatherGrad)"
          stroke="#f59e0b"
          strokeWidth="0.5"
        />
        <line x1="31" y1="75" x2="31" y2="83" stroke="#fef08a" strokeWidth="0.6" strokeOpacity="0.8" />
        <line x1="26" y1="78" x2="26" y2="84" stroke="#fef08a" strokeWidth="0.6" strokeOpacity="0.8" />

        {/* Lower Vane */}
        <path
          d="M 28 72 L 20 66 L 14 72 L 22 78 Z"
          fill="url(#goldFeatherGrad)"
          stroke="#f59e0b"
          strokeWidth="0.5"
        />
        <line x1="25" y1="69" x2="17" y2="69" stroke="#fef08a" strokeWidth="0.6" strokeOpacity="0.8" />
        <line x1="22" y1="74" x2="16" y2="74" stroke="#fef08a" strokeWidth="0.6" strokeOpacity="0.8" />

        {/* Gold Nock Notch */}
        <circle cx="15" cy="85" r="1.6" fill="#f59e0b" />

        {/* 4. CENTRAL NEXUS: Where Gold (Desire) & Silver (Truth) Cross */}
        {/* Subtle Nexus Energy Aura */}
        <circle cx="50" cy="50" r="9" fill="url(#sparkHalo)" opacity="0.6" />

        {/* Ornate Gold & Silver Cross-Tie Bezel */}
        <circle cx="50" cy="50" r="6.5" fill="#09090f" stroke="url(#goldHeadGrad)" strokeWidth="1.2" />

        {/* Cupid's Heart Gem at Nexus */}
        <path
          d="M 50 46 C 48.2 43.5 44.5 43.5 43.5 46.2 C 42.5 48.5 45.5 51.5 50 54.5 C 54.5 51.5 57.5 48.5 56.5 46.2 C 55.5 43.5 51.8 43.5 50 46 Z"
          fill="url(#nexusHeartGrad)"
          filter="url(#glowFilter)"
        />

        {/* 4-Pointed Sparkle / Destiny Glint */}
        <path
          d="M 50 44 L 50.8 48.5 L 55 49 L 50.8 49.5 L 50 54 L 49.2 49.5 L 45 49 L 49.2 48.5 Z"
          fill="#ffffff"
          opacity="0.9"
        />
        <circle cx="50" cy="49" r="1" fill="#ffffff" />
      </svg>

      {/* Gold & Silver Corner Dualism Accents */}
      <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-amber-400/80 rounded-tr-sm pointer-events-none shadow-[0_0_4px_rgba(251,191,36,0.5)]" title="Gold Arrow of Attraction" />
      <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-slate-300/80 rounded-tl-sm pointer-events-none shadow-[0_0_4px_rgba(226,232,240,0.5)]" title="Silver Arrow of Boundaries" />
    </div>
  );

  if (layout === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{IconMark}</div>;
  }

  return (
    <div
      className={`inline-flex ${
        layout === 'stacked'
          ? 'flex-col items-center text-center gap-3'
          : 'flex-row items-center gap-3'
      } ${className}`}
    >
      {IconMark}

      <div className={layout === 'stacked' ? 'flex flex-col items-center' : 'flex flex-col'}>
        <div className="flex items-center gap-2">
          <span
            className={`font-black tracking-tight leading-none ${textSize} text-white flex items-center`}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-400 bg-clip-text text-transparent drop-shadow-sm font-black">
              EROS
            </span>
            <span className="text-white tracking-[0.18em] font-extrabold ml-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              DREAMZ
            </span>
          </span>

          {showBadge && (
            <span
              className={`font-mono font-black uppercase rounded bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm shadow-pink-500/30 ${badgeSize}`}
            >
              10s
            </span>
          )}
        </div>

        {showTagline && (
          <span
            className={`${taglineSize} font-semibold uppercase tracking-wider text-zinc-400/90 mt-1 flex items-center gap-1.5`}
          >
            <span className="text-amber-400 font-bold" title="Gold Arrow of Desire">✦</span>
            <span>Male Video Dating & Radar</span>
            <span className="text-slate-300 font-bold" title="Silver Arrow of Boundaries">✦</span>
          </span>
        )}
      </div>
    </div>
  );
};
