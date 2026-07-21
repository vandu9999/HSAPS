import React from 'react';

export default function HcmcSkyline({ className = 'w-full h-28 text-white/20' }: { className?: string }) {
  return (
    <div className={`pointer-events-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1200 160"
        fill="currentColor"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {/* Background Subtle Buildings */}
        <path opacity="0.3" d="
          M0,160 L0,120 L30,120 L30,95 L50,95 L50,120 L75,120 L75,85 L105,85 L105,120 L130,120 L130,160 Z
          M150,160 L150,105 L180,105 L180,70 L210,70 L210,105 L230,105 L230,160 Z
          M380,160 L380,90 L410,90 L410,65 L440,65 L440,90 L470,90 L470,160 Z
          M650,160 L650,100 L680,100 L680,50 L710,50 L710,100 L740,100 L740,160 Z
          M920,160 L920,110 L950,110 L950,75 L980,75 L980,110 L1010,110 L1010,160 Z
        " />

        {/* Primary Landmark Skyline (Landmark 81, Bitexco, Ben Thanh motif & City Skyline) */}
        <path d="
          M0,160 L0,135 L20,135 L20,115 L45,115 L45,135 L70,135 L70,100 L90,100 L90,135 L120,135 L120,160
          
          /* Bitexco Tower Silhouette Motif */
          M160,160 L160,110 L185,110 Q195,60 190,40 L182,40 L182,36 L195,36 L195,15 L198,15 L198,36 L205,36 Q215,70 210,110 L235,110 L235,160
          
          M250,160 L250,125 L280,125 L280,105 L310,105 L310,125 L340,125 L340,160
          
          /* Modern Towers Group */
          M360,160 L360,95 L385,95 L385,75 L415,75 L415,95 L445,95 L445,160
          M465,160 L465,120 L495,120 L495,85 L525,85 L525,120 L555,120 L555,160
          
          /* Landmark 81 Spire Silhouette */
          M600,160 
          L600,100 L608,100 L608,80 L614,80 L614,60 L620,60 L620,40 L624,40 L624,20 L627,20 L627,0 L629,0 L629,20 L632,20 L632,40 L636,40 L636,60 L642,60 L642,80 L648,80 L648,100 L656,100 
          L656,160
          
          /* Financial Center & Saigon River Front */
          M675,160 L675,115 L705,115 L705,70 L735,70 L735,115 L765,115 L765,160
          M785,160 L785,130 L815,130 L815,95 L845,95 L845,130 L875,130 L875,160
          
          /* Ben Thanh Clock Tower Motif */
          M895,160 L895,135 L910,135 L910,110 L920,110 L920,95 L930,95 L930,90 L935,90 L935,95 L945,95 L945,110 L955,110 L955,135 L970,135 L970,160
          
          /* Eastern HCMC Skylines */
          M990,160 L990,115 L1020,115 L1020,80 L1050,80 L1050,115 L1080,115 L1080,160
          M1100,160 L1100,130 L1125,130 L1125,100 L1155,100 L1155,130 L1200,130 L1200,160
          Z
        " />

        {/* Windows and Accents */}
        <g fill="rgba(255,255,255,0.4)">
          {/* Landmark 81 Spire Lights */}
          <circle cx="628" cy="8" r="1.5" />
          <circle cx="628" cy="25" r="1" />
          
          {/* Bitexco Helipad Line */}
          <rect x="180" y="55" width="28" height="2" rx="1" />
          
          {/* Window dots in buildings */}
          <rect x="190" y="70" width="3" height="4" />
          <rect x="197" y="70" width="3" height="4" />
          <rect x="190" y="80" width="3" height="4" />
          <rect x="197" y="80" width="3" height="4" />
          
          <rect x="618" y="70" width="4" height="4" />
          <rect x="625" y="70" width="4" height="4" />
          <rect x="632" y="70" width="4" height="4" />
          <rect x="618" y="85" width="4" height="4" />
          <rect x="625" y="85" width="4" height="4" />
          <rect x="632" y="85" width="4" height="4" />
          <rect x="618" y="100" width="4" height="4" />
          <rect x="625" y="100" width="4" height="4" />
          <rect x="632" y="100" width="4" height="4" />
          
          <rect x="712" y="80" width="4" height="4" />
          <rect x="720" y="80" width="4" height="4" />
          <rect x="712" y="92" width="4" height="4" />
          <rect x="720" y="92" width="4" height="4" />

          {/* Ben Thanh Clock Face */}
          <circle cx="932.5" cy="118" r="3.5" fill="none" stroke="currentColor" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
