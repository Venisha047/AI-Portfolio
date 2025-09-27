import React from 'react';

export const HeartIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transition-colors duration-200 ${filled ? 'text-red-500' : 'text-white/80 hover:text-white'}`}
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

export const PlusIcon: React.FC<{ inQueue: boolean }> = ({ inQueue }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transition-all duration-300 ${inQueue ? 'text-blue-400 rotate-45' : 'text-white/80 hover:text-white'}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);


export const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v12" />
    </svg>
);

export const XIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// Badge Icons
const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="h-4 w-4 text-primary/70">{children}</div>
);

export const LeafIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a.75.75 0 01.75.75v.783c.422.032.837.09 1.242.178.49.108.955.286 1.383.53.447.256.832.592 1.148.987.316.395.568.84.748 1.321.18.48.288 1.003.326 1.548.037.544.028 1.1.005 1.657a22.5 22.5 0 01-.213 2.612c-.12.836-.312 1.636-.57 2.382a.75.75 0 01-1.404-.42c.244-.7.426-1.44.54-2.223.115-.783.188-1.58.21-2.387.023-.807.03-1.617-.004-2.422-.034-.805-.135-1.585-.3-2.327-.164-.743-.39-1.442-.676-2.08a5.216 5.216 0 00-.91-1.32c-.39-.447-.85-.81-1.363-1.073-.514-.263-1.08-.44-1.688-.532a.75.75 0 01-.617-.744V2.75A.75.75 0 0110 2zM8.25 2.75a.75.75 0 01-.75-.75c0-1.531-1.1-2.77-2.52-2.77a.75.75 0 00-.73.823 12.25 12.25 0 00-.34 4.343c-.1 1.62.008 3.24.28 4.815.204 1.18.52 2.316.926 3.38a.75.75 0 001.404-.42c-.386-1.01-.69-2.076-.885-3.195a23.63 23.63 0 01-.26-4.52c.038-1.14.12-2.274.25-3.39a.75.75 0 01.822-.67z" />
    </svg>
  </IconWrapper>
);

export const SnowflakeIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2.5a.75.75 0 01.75.75v1.252a.75.75 0 01-1.5 0V3.25a.75.75 0 01.75-.75zM8.443 4.443a.75.75 0 011.06 0l.94.94a.75.75 0 01-1.06 1.06l-.94-.94a.75.75 0 010-1.06zM17.5 10a.75.75 0 00-1.252.75H17.5a.75.75 0 000-1.5h-1.252a.75.75 0 001.252.75zM15.557 8.443a.75.75 0 010 1.06l-.94.94a.75.75 0 11-1.06-1.06l.94-.94a.75.75 0 011.06 0zM10 17.5a.75.75 0 01-.75-.75v-1.252a.75.75 0 011.5 0V16.75a.75.75 0 01-.75.75zM11.557 15.557a.75.75 0 01-1.06 0l-.94-.94a.75.75 0 011.06-1.06l.94.94a.75.75 0 010 1.06zM2.5 10a.75.75 0 001.252-.75H2.5a.75.75 0 000 1.5h1.252A.75.75 0 002.5 10zM4.443 11.557a.75.75 0 010-1.06l.94-.94a.75.75 0 011.06 1.06l-.94.94a.75.75 0 01-1.06 0zM10 8a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  </IconWrapper>
);

export const FlameIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M11.388 2.22a.75.75 0 00-1.06.056l-5.25 6.09A.75.75 0 005.25 9.5h2.25a.75.75 0 010 1.5H5.25a.75.75 0 00-.688.463l-2.25 4.5a.75.75 0 00.688 1.037h9.75a.75.75 0 00.65-.375l2.423-4.312a.75.75 0 00-.65-1.125H12.5a.75.75 0 010-1.5h2.25a.75.75 0 00.688-.463l2.25-4.5a.75.75 0 00-.688-1.037H8.774l2.614-3.024a.75.75 0 00.001-1.114z" />
    </svg>
  </IconWrapper>
);

export const BoltIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M11.983 1.904a.75.75 0 00-1.292-.87L5.458 9.25h2.884a.75.75 0 01.623 1.22L6.017 18.096a.75.75 0 001.292.87l4.233-8.217h-2.884a.75.75 0 01-.623-1.22l2.948-7.646z" />
    </svg>
  </IconWrapper>
);

export const DumbbellIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
    </svg>
  </IconWrapper>
);

export const SparkleIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 2c.24 0 .47.02.7.05l.34.05a7.5 7.5 0 015.63 6.9l.04.34c.03.23.05.46.05.7s-.02.47-.05.7l-.04.34a7.5 7.5 0 01-6.9 5.63l-.34.04c-.23.03-.46.05-.7.05s-.47-.02-.7-.05l-.34-.04a7.5 7.5 0 01-5.63-6.9l-.04-.34a8.008 8.008 0 01-.05-.7s.02-.47.05-.7l.04-.34a7.5 7.5 0 016.9-5.63l.34-.04A8.008 8.008 0 0110 2zM6.53 7.853a.75.75 0 10-1.06 1.06l1.72 1.72-1.72 1.72a.75.75 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L9.31 10.63l1.72-1.72a.75.75 0 10-1.06-1.06L8.25 9.57l-1.72-1.72z" clipRule="evenodd" />
    </svg>
  </IconWrapper>
);

export const DropletIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2.5A5.5 5.5 0 004.5 8c0 2.224 1.54 5.25 5.5 9.5 3.96-4.25 5.5-7.276 5.5-9.5A5.5 5.5 0 0010 2.5z" />
    </svg>
  </IconWrapper>
);