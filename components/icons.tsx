import React from 'react';

export const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const IconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`h-4 w-4 ${className}`}>{children}</div>
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
