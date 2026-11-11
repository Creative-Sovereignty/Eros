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
  showBadge = false,
  showTagline = true,
  className = '',
  glow = true
}) => {
  // Dimensions based on size prop
  const iconDimensions = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
    xl: 'w-40 h-40 sm:w-52 sm:h-52'
  }[size];

  const textSize = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-3xl sm:text-4xl'
  }[size];

  const taglineSize = {
    xs: 'text-[8px]',
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm'
  }[size];

  // Authentic Original Circular Artwork with crossed Silver & Gold Bows
  const IconMark = (
    <div
      className={`relative ${iconDimensions} aspect-square flex-shrink-0 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-400/50 via-slate-400/30 to-amber-300/60 transition-transform duration-300 group-hover:scale-105 select-none ${
        glow ? 'shadow-[0_0_24px_rgba(245,158,11,0.35),0_0_12px_rgba(148,163,184,0.35)]' : 'shadow-md'
      }`}
      title="ErosDreamz - Original Crossed Bows Seal"
    >
      {/* Background ambient radial glow: Warm Gold & Celestial Silver */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/25 via-sky-500/15 to-slate-200/25 blur-sm pointer-events-none" />

      {/* High-Definition Original Artwork Seal */}
      <div className="w-full h-full rounded-full overflow-hidden relative z-10 border border-slate-700/60 bg-[#060a14] flex items-center justify-center">
        <img
          src="/assets/erosdreamz_logo_original.jpg"
          alt="ErosDreamz Original Emblem"
          className="w-full h-full object-cover object-center scale-[1.04] select-none pointer-events-none"
          loading="eager"
          onError={(e) => {
            // Fallback to aistudio path if needed
            (e.currentTarget as HTMLImageElement).src = '/assets/aistudio/1791247855115_90f84b79.jpg';
          }}
        />
      </div>
    </div>
  );

  // Icon only layout
  if (layout === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{IconMark}</div>;
  }

  // Stacked layout (for Login Gate, Hero Banner, etc.)
  if (layout === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center text-center gap-3 ${className}`}>
        {IconMark}

        {/* At smaller sizes, display the accompanying metallic typography */}
        {size !== 'xl' && (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className={`font-serif tracking-widest font-extrabold ${textSize} flex items-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]`}>
                <span className="bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  EROS
                </span>
                <span className="bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent ml-2">
                  DREAMZ
                </span>
              </span>

              {showBadge && (
                <span className="font-mono font-bold text-[9px] px-2 py-0.5 rounded bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-300 border border-amber-500/30">
                  PWA
                </span>
              )}
            </div>

            {showTagline && (
              <span className={`${taglineSize} font-medium uppercase tracking-[0.2em] text-zinc-400/90 mt-1 flex items-center gap-1.5`}>
                <span className="text-amber-400 font-bold">✦</span>
                <span>Male Video Dating & Radar</span>
                <span className="text-slate-300 font-bold">✦</span>
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Horizontal layout (for Navbar, Top Header, etc.)
  return (
    <div className={`inline-flex flex-row items-center gap-3 ${className}`}>
      {IconMark}

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={`font-serif tracking-widest font-extrabold ${textSize} flex items-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]`}>
            <span className="bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              EROS
            </span>
            <span className="bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent ml-2">
              DREAMZ
            </span>
          </span>

          {showBadge && (
            <span className="font-mono font-bold text-[9px] px-2 py-0.5 rounded bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-300 border border-amber-500/30">
              PWA
            </span>
          )}
        </div>

        {showTagline && (
          <span className={`${taglineSize} font-medium uppercase tracking-[0.16em] text-zinc-400/90 mt-0.5 flex items-center gap-1.5`}>
            <span className="text-amber-400 font-bold">✦</span>
            <span>Male Video Dating & Radar</span>
            <span className="text-slate-300 font-bold">✦</span>
          </span>
        )}
      </div>
    </div>
  );
};
