export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Light Mode Grid Pattern */}
      <div
        className="absolute inset-0 opacity-40 dark:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(100,116,139,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,0.18) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Dark Mode Grid Pattern */}
      <div
        className="absolute inset-0 hidden opacity-30 dark:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.15) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Blue Aurora */}
      <div className="hero-aurora-blue absolute left-[10%] top-[10%] h-[450px] w-[450px] rounded-full bg-blue-500/20 blur-[120px] dark:bg-blue-600/30" />

      {/* Cyan Aurora */}
      <div className="hero-aurora-cyan absolute right-[5%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-400/15 blur-[120px] dark:bg-cyan-500/25" />

      {/* Purple Aurora */}
      <div className="hero-aurora-purple absolute bottom-[-15%] left-[35%] h-[500px] w-[500px] rounded-full bg-violet-500/15 blur-[140px] dark:bg-violet-600/25" />

      {/* Top Glow */}
      <div className="absolute left-1/2 top-[-300px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[150px] dark:bg-blue-500/15" />

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}