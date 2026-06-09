import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useStore } from "@/context/StoreContext";
import { Gamepad2, Moon, Search, ShoppingCart, Sun, ChevronRight } from "lucide-react";
import { gamesAccounts } from "@/lib/gamesAccounts";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { theme, toggleTheme, cart, setCartOpen, searchQuery, setSearchQuery } =
    useStore();

  const isStorePage = location.pathname === "/";

  // Dropdown UI states
  const [showDesktopDropdown, setShowDesktopDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target as Node)
      ) {
        setShowDesktopDropdown(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setShowMobileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter suggestion results - only match game accounts
  const suggestions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return { accounts: [], count: 0 };

    const matchingAccounts = gamesAccounts
      .filter(
        (acc) =>
          acc.name.toLowerCase().includes(q) ||
          acc.gameType.toLowerCase().replace("-", " ").includes(q)
      )
      .slice(0, 4); // Show up to 4 account suggestions

    return {
      accounts: matchingAccounts,
      count: matchingAccounts.length,
    };
  }, [searchQuery]);

  // Navigate to dedicated search page
  const handleSearchSubmit = (queryStr: string) => {
    if (!queryStr.trim()) return;
    navigate(`/search?q=${encodeURIComponent(queryStr)}`);
    setShowDesktopDropdown(false);
    setShowMobileDropdown(false);

    // Blur inputs
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  // Render suggestion dropdown
  const renderDropdown = (show: boolean, onClose: () => void) => {
    if (!show || !searchQuery.trim()) return null;

    const hasResults = suggestions.count > 0;

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-slate-950/95 dark:bg-zinc-950/95 backdrop-blur-lg border border-slate-800/80 rounded-2xl shadow-2xl p-4 z-50 text-left w-full overflow-hidden max-h-[380px] overflow-y-auto scrollbar-thin animate-in fade-in slide-in-from-top-2 duration-150">
        {!hasResults ? (
          <div className="py-6 text-center text-slate-500 text-xs">
            No instant matches for &ldquo;<span className="text-purple-400 font-bold">{searchQuery}</span>&rdquo;
            <button
              type="button"
              onClick={() => handleSearchSubmit(searchQuery)}
              className="block mx-auto mt-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
            >
              Search full database ➜
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Marketplace Accounts Section */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 block border-b border-slate-800/60 pb-1">
                Accounts Marketplace
              </span>
              <div className="space-y-1">
                {suggestions.accounts.map((acc) => (
                  <Link
                    key={acc.id}
                    to={`/accounts/${acc.id}`}
                    onClick={onClose}
                    className="w-full flex items-center gap-3 p-1.5 hover:bg-slate-900/60 rounded-xl transition-colors text-left group cursor-pointer"
                  >
                    <img
                      src={acc.image}
                      alt={acc.name}
                      className="w-8 h-8 object-cover rounded-lg bg-slate-900 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-slate-200 group-hover:text-pink-400 transition-colors truncate block">
                        {acc.name}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {acc.gameType === "mobile-legends" ? "Mobile Legends" : "PUBG"} Account
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-400 shrink-0">
                      MMK {acc.price}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer: View All results */}
            <button
              type="button"
              onClick={() => handleSearchSubmit(searchQuery)}
              className="w-full py-2 border-t border-slate-850 hover:bg-slate-900/60 rounded-b-xl text-center text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer mt-1"
            >
              <span>See all matches for &ldquo;{searchQuery}&rdquo;</span>
              <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <header className="fixed top-0 z-40 w-full bg-slate-950/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="p-2 rounded-xl bg-purple-600/10 group-hover:border-purple-500/40 transition-colors">
              <Gamepad2 className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
            </div>
            <span className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-400">
              MARNAY
            </span>
          </Link>

          <div className="sm:hidden flex items-center gap-2 shrink-0">
            {/* Theme Toggler */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                toggleTheme();
              }}
              className="flex size-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
              title="Toggle Theme"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-purple-400" />
              )}
            </button>

            {/* Cart Icon */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex size-10 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-600/10 hover:bg-purple-600/25 text-purple-400 hover:text-purple-300 transition-all cursor-pointer"
              title="Open Cart"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-purple-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          <div className="hidden sm:flex items-center justify-between gap-6 min-w-md">
            {/* Search Bar with Suggestion Overlay */}
            <div ref={desktopSearchRef} className="flex-1 min-w-sm hidden sm:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder={
                  isStorePage
                    ? "Search game accounts, ranks, skins..."
                    : "Search accounts..."
                }
                value={searchQuery}
                onFocus={() => setShowDesktopDropdown(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDesktopDropdown(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit(searchQuery);
                  }
                }}
                className="w-full bg-slate-900/60 dark:bg-zinc-900/60 border border-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 transition-all"
              />
              {renderDropdown(showDesktopDropdown, () => setShowDesktopDropdown(false))}
            </div>

            {/* Signin or Signup Button */}
            <div className="flex-1 min-w-25 hidden sm:block relative">
              <Link
                to="/signup"
                className="px-3 w-full text-center py-2 text-white bg-pink-500 rounded-lg text-md font-medium absolute right-4 top-1/2 -translate-y-1/2"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div ref={mobileSearchRef} className="px-4 pb-3 sm:hidden block relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search accounts..."
              value={searchQuery}
              onFocus={() => setShowMobileDropdown(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowMobileDropdown(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit(searchQuery);
                }
              }}
              className="w-full bg-slate-900/60 border border-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 transition-all"
            />
          </div>
          {renderDropdown(showMobileDropdown, () => setShowMobileDropdown(false))}
        </div>
      </header>
    </>
  );
};

export default Header;
