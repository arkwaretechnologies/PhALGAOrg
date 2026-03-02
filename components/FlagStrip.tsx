export default function FlagStrip() {
  return (
    <div className="h-1.5 relative" style={{ background: 'linear-gradient(to right, #0038A8 50%, #CE1126 50%)' }}>
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-ph-white text-ph-gold text-sm border-2 border-ph-gold"
        aria-hidden
      >
        ☀
      </span>
    </div>
  )
}
