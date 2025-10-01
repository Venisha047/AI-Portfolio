

import React from 'react';

export const LoadingSpinner: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
    <svg className={`animate-spin text-current ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const IconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`h-4 w-4 ${className}`}>{children}</div>
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export const ClockIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ChartBarIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

export const ClipboardListIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

export const LightbulbIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

export const GlobeIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.705 11A8.967 8.967 0 0112 8.5c2.505 0 4.756.956 6.5 2.5m-13 0a8.906 8.906 0 01-1.756-3.417m16.512 3.417a8.906 8.906 0 00-1.756-3.417M12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
);

export const BookOpenIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

export const FlameIcon: React.FC<{className?: string}> = ({className}) => (
  <IconWrapper className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M11.388 2.22a.75.75 0 00-1.06.056l-5.25 6.09A.75.75 0 005.25 9.5h2.25a.75.75 0 010 1.5H5.25a.75.75 0 00-.688.463l-2.25 4.5a.75.75 0 00.688 1.037h9.75a.75.75 0 00.65-.375l2.423-4.312a.75.75 0 00-.65-1.125H12.5a.75.75 0 010-1.5h2.25a.75.75 0 00.688-.463l2.25-4.5a.75.75 0 00-.688-1.037H8.774l2.614-3.024a.75.75 0 00.001-1.114z" />
    </svg>
  </IconWrapper>
);

export const SnowflakeIcon: React.FC<{className?: string}> = ({className}) => (
  <IconWrapper className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2.5a.75.75 0 01.75.75v1.252a.75.75 0 01-1.5 0V3.25a.75.75 0 01.75-.75zM8.443 4.443a.75.75 0 011.06 0l.94.94a.75.75 0 01-1.06 1.06l-.94-.94a.75.75 0 010-1.06zM17.5 10a.75.75 0 00-1.252.75H17.5a.75.75 0 000-1.5h-1.252a.75.75 0 001.252.75zM15.557 8.443a.75.75 0 010 1.06l-.94.94a.75.75 0 11-1.06-1.06l.94-.94a.75.75 0 011.06 0zM10 17.5a.75.75 0 01-.75-.75v-1.252a.75.75 0 011.5 0V16.75a.75.75 0 01-.75.75zM11.557 15.557a.75.75 0 01-1.06 0l-.94-.94a.75.75 0 011.06-1.06l.94.94a.75.75 0 010 1.06zM2.5 10a.75.75 0 001.252-.75H2.5a.75.75 0 000 1.5h1.252A.75.75 0 002.5 10zM4.443 11.557a.75.75 0 010-1.06l.94-.94a.75.75 0 011.06 1.06l-.94.94a.75.75 0 01-1.06 0zM10 8a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  </IconWrapper>
);

export const SugarIcon: React.FC<{className?: string}> = ({className}) => (
    <IconWrapper className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.218 10.395c.205-.32.332-.704.332-1.125a2.25 2.25 0 0 0-4.5 0c0 .421.127.805.332 1.125c.206.32.476.608.782.826l.497.356c.386.276.924.276 1.31 0l.497-.356a1.92 1.92 0 0 0 .782-.826ZM9.75 9.75c0 .421.127.805.332 1.125s.476.608.782.826l.497.356c.386.276.924.276 1.31 0l.497-.356a1.92 1.92 0 0 0 .782-.826c.205-.32.332-.704.332-1.125a2.25 2.25 0 0 0-4.5 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a8.955 8.955 0 0 1-1.834 5.433m-2.256-4.155c.205-.32.332-.704.332-1.125a2.25 2.25 0 0 0-4.5 0c0 .421.127.805.332 1.125s.476.608.782.826l.497.356c.386.276.924.276 1.31 0l.497-.356a1.92 1.92 0 0 0 .782-.826M9.75 16.5c0 .421.127.805.332 1.125s.476.608.782.826l.497.356c.386.276.924.276 1.31 0l.497-.356a1.92 1.92 0 0 0 .782-.826c.205-.32.332-.704.332-1.125a2.25 2.25 0 0 0-4.5 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a8.955 8.955 0 0 1 1.834-5.433m2.256 4.155c-.205.32-.332.704-.332 1.125a2.25 2.25 0 0 0 4.5 0c0-.421-.127-.805-.332-1.125a1.92 1.92 0 0 0-.782-.826l-.497-.356c-.386-.276-.924-.276-1.31 0l-.497.356a1.92 1.92 0 0 0-.782.826ZM15 4.5a2.25 2.25 0 0 0-4.5 0c0 .421.127.805.332 1.125s.476.608.782.826l.497.356c.386.276.924.276 1.31 0l.497-.356a1.92 1.92 0 0 0 .782-.826c.205-.32.332-.704.332-1.125Z" />
        </svg>
    </IconWrapper>
);

export const StrengthIcon: React.FC<{className?: string}> = ({className}) => (
  <IconWrapper className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M11.983 1.904a.75.75 0 00-1.292-.87L5.458 9.25h2.884a.75.75 0 01.623 1.22L6.017 18.096a.75.75 0 001.292.87l4.233-8.217h-2.884a.75.75 0 01-.623-1.22l2.948-7.646z" />
    </svg>
  </IconWrapper>
);

export const HeartIcon: React.FC<{ filled: boolean; className?: string }> = ({ filled, className = 'h-6 w-6' }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-200 ${className}`}
      fill={filled ? 'currentColor' : 'none'}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z"
      />
    </svg>
);

export const ShareIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v12" />
    </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export const LeafIcon: React.FC<{ className?: string }> = ({className}) => (
  <IconWrapper className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a.75.75 0 01.75.75v.783c.422.032.837.09 1.242.178.49.108.955.286 1.383.53.447.256.832.592 1.148.987.316.395.568.84.748 1.321.18.48.288 1.003.326 1.548.037.544.028 1.1.005 1.657a22.5 22.5 0 01-.213 2.612c-.12.836-.312 1.636-.57 2.382a.75.75 0 01-1.404-.42c.244-.7.426-1.44.54-2.223.115-.783.188-1.58.21-2.387.023-.807.03-1.617-.004-2.422-.034-.805-.135-1.585-.3-2.327-.164-.743-.39-1.442-.676-2.08a5.216 5.216 0 00-.91-1.32c-.39-.447-.85-.81-1.363-1.073-.514-.263-1.08-.44-1.688-.532a.75.75 0 01-.617-.744V2.75A.75.75 0 0110 2zM8.25 2.75a.75.75 0 01-.75-.75c0-1.531-1.1-2.77-2.52-2.77a.75.75 0 00-.73.823 12.25 12.25 0 00-.34 4.343c-.1 1.62.008 3.24.28 4.815.204 1.18.52 2.316.926 3.38a.75.75 0 001.404-.42c-.386-1.01-.69-2.076-.885-3.195a23.63 23.63 0 01-.26-4.52c.038-1.14.12-2.274.25-3.39a.75.75 0 01.822-.67z" />
    </svg>
  </IconWrapper>
);

export const SparkleIcon: React.FC<{ className?: string }> = ({className}) => (
  <IconWrapper className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 2c.24 0 .47.02.7.05l.34.05a7.5 7.5 0 015.63 6.9l.04.34c.03.23.05.46.05.7s-.02.47-.05.7l-.04.34a7.5 7.5 0 01-6.9 5.63l-.34.04c-.23.03-.46.05-.7.05s-.47-.02-.7-.05l-.34-.04a7.5 7.5 0 01-5.63-6.9l-.04-.34a8.008 8.008 0 01-.05-.7s.02-.47.05-.7l.04-.34a7.5 7.5 0 016.9-5.63l.34-.04A8.008 8.008 0 0110 2zM6.53 7.853a.75.75 0 10-1.06 1.06l1.72 1.72-1.72 1.72a.75.75 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L9.31 10.63l1.72-1.72a.75.75 0 10-1.06-1.06L8.25 9.57l-1.72-1.72z" clipRule="evenodd" />
    </svg>
  </IconWrapper>
);

export const DropletIcon: React.FC<{ className?: string }> = ({className}) => (
  <IconWrapper className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2.5A5.5 5.5 0 004.5 8c0 2.224 1.54 5.25 5.5 9.5 3.96-4.25 5.5-7.276 5.5-9.5A5.5 5.5 0 0010 2.5z" />
    </svg>
  </IconWrapper>
);

export const BoltIcon: React.FC<{ className?: string }> = ({className}) => (
  <IconWrapper className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M11.983 1.904a.75.75 0 00-1.292-.87L5.458 9.25h2.884a.75.75 0 01.623 1.22L6.017 18.096a.75.75 0 001.292.87l4.233-8.217h-2.884a.75.75 0 01-.623-1.22l2.948-7.646z" />
    </svg>
  </IconWrapper>
);

export const DumbbellIcon: React.FC<{ className?: string }> = ({className}) => (
  <IconWrapper className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
    </svg>
  </IconWrapper>
);

export const XIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const TwitterIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.215 3.793 4.654-.65.178-1.336.228-2.023.188.618 1.956 2.413 3.38 4.545 3.42-1.77 1.385-3.996 2.16-6.42 2.16-.42 0-.834-.025-1.242-.073 2.28 1.464 4.993 2.32 7.898 2.32 9.478 0 14.655-7.854 14.655-14.655 0-.224-.005-.447-.015-.668.988-.71 1.848-1.6 2.541-2.636z"/>
    </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z"/>
    </svg>
);

export const PinterestIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.198-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.911 2.168-2.911 1.026 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.958-.283 1.194.599 2.168 1.777 2.168 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 .992.371 1.931.82 2.462.08.083.091.163.069.261-.04.101-.141.564-.183.722-.053.203-.207.275-.408.158-1.512-.662-2.479-2.92-2.479-4.629 0-3.755 2.748-7.252 7.85-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.627-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.343 2.308.535 3.55.535 6.607 0 11.971-5.36 11.971-11.987C23.97 5.39 18.592 0 12.017 0z"/>
    </svg>
);

export const LinkIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);
