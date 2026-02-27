export default function ApogeeLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Letter A */}
      <path d="M50 5 L20 95 H38 L43 80 H57 L62 95 H80 L50 5 Z M45 70 L50 50 L55 70 H45 Z" fill="#0F4C81" />
      
      {/* Orbit 1 */}
      <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(-25 50 50)" stroke="#9CA3AF" strokeWidth="3" />
      <circle cx="88" cy="35" r="4" fill="#6B7280" />
      
      {/* Orbit 2 */}
      <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(25 50 50)" stroke="#9CA3AF" strokeWidth="3" />
      <circle cx="12" cy="35" r="4" fill="#6B7280" />
    </svg>
  );
}
