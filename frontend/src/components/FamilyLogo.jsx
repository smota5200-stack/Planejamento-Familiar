export default function FamilyLogo({ classname = "" }) {
  return (
    <svg
      viewBox="0 0 800 800"
      className={`${classname}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background - Transparente */}
      <rect width="800" height="800" fill="transparent" />

      {/* ADULT CENTER (Dark Blue #003d66) - MAIN FIGURE */}
      {/* Head */}
      <circle cx="400" cy="120" r="55" fill="#003d66" />
      
      {/* Body and Arms Spread */}
      <ellipse cx="400" cy="300" rx="90" ry="140" fill="#003d66" />
      
      {/* Shoulder bridge */}
      <path d="M 310 200 Q 400 180 490 200" stroke="#003d66" strokeWidth="45" fill="none" strokeLinecap="round" />
      
      {/* Legs */}
      <rect x="350" y="430" width="35" height="150" rx="18" fill="#003d66" />
      <rect x="415" y="430" width="35" height="150" rx="18" fill="#003d66" />

      {/* ADULT LEFT (Dark Blue #003d66) */}
      {/* Head */}
      <circle cx="230" cy="220" r="42" fill="#003d66" />
      
      {/* Body bending */}
      <ellipse cx="220" cy="350" rx="55" ry="95" fill="#003d66" />
      
      {/* Arms bent */}
      <path d="M 165 280 Q 140 310 165 340" stroke="#003d66" strokeWidth="35" fill="none" strokeLinecap="round" />
      
      {/* Legs */}
      <rect x="195" y="440" width="28" height="120" rx="14" fill="#003d66" />
      <rect x="245" y="440" width="28" height="120" rx="14" fill="#003d66" />

      {/* CHILD LEFT SMALL (Teal #17a2b8) */}
      {/* Head */}
      <circle cx="130" cy="380" r="35" fill="#17a2b8" />
      
      {/* Body */}
      <ellipse cx="120" cy="480" rx="42" ry="75" fill="#17a2b8" />
      
      {/* Arm raised */}
      <path d="M 78 420 Q 50 400 65 360" stroke="#17a2b8" strokeWidth="28" fill="none" strokeLinecap="round" />
      
      {/* Legs */}
      <rect x="85" y="545" width="24" height="90" rx="12" fill="#17a2b8" />
      <rect x="155" y="545" width="24" height="90" rx="12" fill="#17a2b8" />

      {/* CHILD RIGHT LARGE (Teal #17a2b8) */}
      {/* Head */}
      <circle cx="670" cy="280" r="45" fill="#17a2b8" />
      
      {/* Body bending right */}
      <ellipse cx="690" cy="420" rx="65" ry="105" fill="#17a2b8" />
      
      {/* Arm raised on right side */}
      <path d="M 740 360 Q 765 340 750 290" stroke="#17a2b8" strokeWidth="35" fill="none" strokeLinecap="round" />
      
      {/* Legs */}
      <rect x="640" y="515" width="30" height="115" rx="15" fill="#17a2b8" />
      <rect x="710" y="515" width="30" height="115" rx="15" fill="#17a2b8" />

      {/* CHILD BOTTOM RIGHT SMALL (Teal #17a2b8) */}
      {/* Head */}
      <circle cx="740" cy="380" r="32" fill="#17a2b8" />
      
      {/* Body */}
      <ellipse cx="750" cy="470" rx="38" ry="70" fill="#17a2b8" />
      
      {/* Legs */}
      <rect x="720" y="535" width="22" height="85" rx="11" fill="#17a2b8" />
      <rect x="780" y="535" width="22" height="85" rx="11" fill="#17a2b8" />
    </svg>
  )
}
