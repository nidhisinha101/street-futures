import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavigationProps {
  onShuffle?: () => void;
}

export function Navigation({ onShuffle }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleShuffleClick = () => {
    if (location.pathname === "/") {
      onShuffle?.();
    } else {
      navigate("/");
    }
  };

  const linkBase = "px-5 py-2.5 rounded-full font-sans text-sm tracking-wide transition-all duration-300 cursor-pointer select-none";
  const linkInactive = "text-foreground/50 hover:text-foreground/80";
  const linkActive = "text-foreground font-medium";

  return (
    <nav className="fixed bottom-7 left-0 right-0 z-50 px-4 pointer-events-none">
      <div
        className="max-w-fit mx-auto pointer-events-auto flex items-center gap-1 px-3 py-3 rounded-full"
        style={{
          background: "color-mix(in srgb, var(--background) 85%, transparent)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid color-mix(in srgb, var(--foreground) 10%, transparent)",
          boxShadow: "0 8px 32px color-mix(in srgb, var(--foreground) 8%, transparent)",
        }}
      >
        <button
          onClick={handleShuffleClick}
          className={`${linkBase} flex items-center gap-2 ${isActive("/") ? linkActive : linkInactive}`}
          style={isActive("/") ? { background: "color-mix(in srgb, var(--foreground) 8%, transparent)" } : {}}
        >
          {isActive("/") && <span style={{ color: "var(--kiln, #c4824a)", fontSize: "0.9rem" }}>✦</span>}
          Shuffle
        </button>

        <div className="w-px h-5 mx-1" style={{ background: "color-mix(in srgb, var(--foreground) 10%, transparent)" }} />

        <Link to="/view all" className={`${linkBase} flex items-center gap-2 ${isActive("/view all") ? linkActive : linkInactive}`}
          style={isActive("/view all") ? { background: "color-mix(in srgb, var(--foreground) 8%, transparent)" } : {}}>
          {isActive("/view all") && <span style={{ color: "var(--kiln, #c4824a)", fontSize: "0.9rem" }}>✦</span>}
          Gallery
        </Link>
        <Link to="/about" className={`${linkBase} flex items-center gap-2 ${isActive("/about") ? linkActive : linkInactive}`}
          style={isActive("/about") ? { background: "color-mix(in srgb, var(--foreground) 8%, transparent)" } : {}}>
          {isActive("/about") && <span style={{ color: "var(--kiln, #c4824a)", fontSize: "0.9rem" }}>✦</span>}
          About
        </Link>
        <Link to="/submit" className={`${linkBase} flex items-center gap-2 ${isActive("/submit") ? linkActive : linkInactive}`}
          style={isActive("/submit") ? { background: "color-mix(in srgb, var(--foreground) 8%, transparent)" } : {}}>
          {isActive("/submit") && <span style={{ color: "var(--kiln, #c4824a)", fontSize: "0.9rem" }}>✦</span>}
          Submit
        </Link>
      </div>
    </nav>
  );
}
