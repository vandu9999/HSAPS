import React from 'react';

interface PartnerLogoProps {
  logoType: 'motiva' | 'thallo' | 'allergan' | 'galderma' | 'merz';
  className?: string;
}

export default function PartnerLogo({ logoType, className = "h-10 w-auto" }: PartnerLogoProps) {
  switch (logoType) {
    case 'motiva':
      return (
        <svg viewBox="0 0 200 60" className={className}>
          <path d="M25 30 C25 15, 40 15, 40 30 C40 45, 25 45, 25 30 Z" fill="#800080" opacity="0.8"/>
          <path d="M18 39 C10 31, 23 22, 31 30 C39 38, 26 47, 18 39 Z" fill="#800080" opacity="0.6"/>
          <path d="M31 39 C39 31, 26 22, 18 30 C10 38, 23 47, 31 39 Z" fill="#800080" opacity="0.9"/>
          <text x="52" y="34" fontSize="18" fontWeight="bold" fill="currentColor" className="font-sans">Motiva</text>
          <text x="52" y="46" fontSize="9" fontWeight="bold" fill="#800080" letterSpacing="1.5">IMPLANTS</text>
        </svg>
      );
    case 'thallo':
      return (
        <svg viewBox="0 0 200 60" className={className}>
          <circle cx="25" cy="30" r="16" fill="#22c55e" opacity="0.8" />
          <path d="M25 18 Q21 24 25 30 Q29 36 25 42 Q27 36 26 30 Q25 24 25 18" fill="white" />
          <text x="52" y="38" fontSize="20" fontWeight="bold" fill="currentColor" className="font-sans" letterSpacing="0.5">THALLO</text>
        </svg>
      );
    case 'allergan':
      return (
        <svg viewBox="0 0 200 60" className={className}>
          <rect x="10" y="15" width="30" height="30" rx="6" fill="#003366" />
          <text x="25" y="36" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" className="font-serif">A</text>
          <text x="52" y="32" fontSize="16" fontWeight="extrabold" fill="currentColor" className="font-sans">Allergan</text>
          <text x="52" y="44" fontSize="8" fontWeight="bold" fill="#003366" letterSpacing="1.5">AESTHETICS</text>
        </svg>
      );
    case 'galderma':
      return (
        <svg viewBox="0 0 200 60" className={className}>
          <polygon points="25,12 40,30 25,48 10,30" fill="#008080" />
          <circle cx="25" cy="30" r="6" fill="white" />
          <text x="52" y="38" fontSize="18" fontWeight="black" fill="currentColor" className="font-sans" letterSpacing="1">GALDERMA</text>
        </svg>
      );
    case 'merz':
      return (
        <svg viewBox="0 0 200 60" className={className}>
          <circle cx="25" cy="30" r="15" fill="none" stroke="#e11d48" strokeWidth="3" />
          <path d="M20 22 L25 38 L30 22" stroke="#e11d48" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="52" y="32" fontSize="18" fontWeight="black" fill="currentColor" className="font-sans">MERZ</text>
          <text x="52" y="44" fontSize="8" fontWeight="bold" fill="#e11d48" letterSpacing="1">AESTHETICS</text>
        </svg>
      );
    default:
      return null;
  }
}
