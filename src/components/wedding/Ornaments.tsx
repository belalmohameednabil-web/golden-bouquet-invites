import { cn } from "@/lib/utils";

export function CallaLilies({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 420" fill="none" aria-hidden className={cn("pointer-events-none", className)}>
      <path d="M67 413C91 309 117 213 160 107M127 410C125 323 143 240 205 169M91 325C61 281 38 245 25 202M140 257C190 238 218 209 238 174" stroke="currentColor" strokeWidth="2" opacity=".65"/>
      <path d="M157 111C116 99 104 58 122 20c47 18 69 50 35 91Z" fill="var(--color-ivory)" stroke="currentColor" strokeWidth="2"/>
      <path d="M159 109c2-29-1-52-14-72" stroke="var(--color-gold)" strokeWidth="5" strokeLinecap="round"/>
      <path d="M206 171c-42 7-66-27-61-67 48 0 75 20 61 67Z" fill="var(--color-ivory)" stroke="currentColor" strokeWidth="2"/>
      <path d="M204 168c-7-25-16-43-32-56" stroke="var(--color-gold)" strokeWidth="5" strokeLinecap="round"/>
      <path d="M91 323c-45-5-68-35-65-76 40 5 69 31 65 76Z" fill="none" stroke="currentColor" strokeWidth="2" opacity=".45"/>
      <path d="M141 257c18-36 47-51 82-45-12 37-38 56-82 45Z" fill="none" stroke="currentColor" strokeWidth="2" opacity=".45"/>
    </svg>
  );
}

export function Hydrangea({ className }: { className?: string }) {
  const blooms = [[48,44],[83,31],[113,51],[139,34],[166,57],[58,78],[94,72],[128,83],[159,88],[75,111],[111,113],[145,119]];
  return <svg viewBox="0 0 220 210" aria-hidden className={cn("pointer-events-none", className)}>{blooms.map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`} fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".72"><path d="M0 0c-17-8-22 12-7 17C-18 31 1 38 7 21c16 10 26-8 10-18C23-13 2-19 0 0Z"/><circle r="2" fill="var(--color-gold)" stroke="none"/></g>)}<path d="M108 123c-7 31-1 58 17 78M91 131c-19 21-32 41-34 69" fill="none" stroke="currentColor" strokeWidth="2" opacity=".5"/></svg>;
}

export function Chandelier({ className }: { className?: string }) {
  const arms = [-78, -47, -16, 16, 47, 78];
  return (
    <svg viewBox="0 0 220 190" fill="none" aria-hidden className={cn("pointer-events-none", className)}>
      <path d="M110 0v30" stroke="currentColor" strokeWidth="2" opacity=".75"/>
      <path d="M92 30h36l-7 13H99Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M110 43v58" stroke="currentColor" strokeWidth="2" opacity=".75"/>
      {arms.map((x) => {
        const y = 60 + Math.abs(x) * 0.05;
        return (
          <g key={x}>
            <path d={`M110 ${y}C ${110 + x * 0.55} ${y - 4} ${110 + x} ${y + 8} ${110 + x} ${y + 24}`} stroke="currentColor" strokeWidth="2" fill="none" opacity=".8"/>
            <ellipse cx={110 + x} cy={y + 27} rx="6" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <path d={`M${110 + x} ${y + 23}c-4-9 4-9 0-17`} fill="var(--color-gold)" stroke="none" opacity=".95"/>
          </g>
        );
      })}
      <path d="M32 84c34 24 122 24 156 0" stroke="currentColor" strokeWidth="1.5" opacity=".4"/>
      {[...Array(9)].map((_, i) => (
        <path key={i} d={`M${34 + i * 19} ${86 + Math.sin(i) * 3}l4 15-4 6-4-6Z`} fill="var(--color-gold)" opacity=".6"/>
      ))}
    </svg>
  );
}

export function GoldDivider({ className }: { className?: string }) {
  return <svg viewBox="0 0 240 32" aria-hidden className={className}><path d="M0 16h91m58 0h91M102 16c8-2 14-8 18-16 4 8 10 14 18 16-8 2-14 8-18 16-4-8-10-14-18-16Z" fill="none" stroke="currentColor" strokeWidth="1"/><circle cx="120" cy="16" r="3" fill="currentColor"/></svg>;
}

export function VillaIllustration({ className }: { className?: string }) {
  return <svg viewBox="0 0 600 330" fill="none" aria-hidden className={className}><g stroke="currentColor" strokeWidth="2"><path d="M32 285h536M84 282V149l216-109 216 109v133M53 153h494M111 143v-27h378v27M165 282V173h270v109M246 282V183h108v99M219 122h162M300 40V10m0 0 37 17h-37"/><path d="M111 173h50v59h-50zm328 0h50v59h-50zM185 173h35v42h-35zm195 0h35v42h-35z"/><path d="M260 215c0-28 18-47 40-47s40 19 40 47M50 282c10-35 28-54 48-56m452 56c-10-35-28-54-48-56"/><circle cx="300" cy="95" r="20"/><path d="M300 75v40m-20-20h40" opacity=".5"/></g></svg>;
}
