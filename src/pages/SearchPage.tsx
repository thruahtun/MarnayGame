import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { gamesAccounts } from "@/lib/gamesAccounts";
import denoeProfileImage from "@/assets/images/denoe-profile.jpg";
import {
  Search,
  ArrowUpDown,
  X,
  CircleCheckBig,
  Gamepad2,
  Filter,
} from "lucide-react";

type SortOption = "relevance" | "price-asc" | "price-desc";

// Utility to parse price string to number
const parsePrice = (priceStr: string): number => {
  return Number(priceStr.replace(/,/g, ""));
};

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  // Component local states
  const [localQuery, setLocalQuery] = useState(initialQuery);
  const [selectedSort, setSelectedSort] = useState<SortOption>("relevance");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  // Sync state if query param changes
  useEffect(() => {
    setLocalQuery(initialQuery);
  }, [initialQuery]);

  // Account genre categories
  const allGenres = ["All", "MOBA", "Battle Royale"];

  // Handle local query submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: localQuery });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedSort("relevance");
    setMinPrice("");
    setMaxPrice("");
    setSelectedGenre("All");
  };

  // Helper to highlight text matching the query
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="bg-purple-500/30 text-purple-200 px-0.5 rounded font-bold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Filtering & Sorting Logic for Marketplace Accounts
  const searchResults = useMemo(() => {
    const query = initialQuery.toLowerCase().trim();

    let filteredAccounts = gamesAccounts.filter((account) => {
      // Search term matching
      const matchesQuery =
        !query ||
        account.name.toLowerCase().includes(query) ||
        account.description.toLowerCase().includes(query) ||
        account.gameType.toLowerCase().replace("-", " ").includes(query);

      // Genre filter (accounts mapped to MOBA/Battle Royale)
      const accountGenre =
        account.gameType === "mobile-legends" ? "MOBA" : "Battle Royale";
      const matchesGenre = selectedGenre === "All" || selectedGenre === accountGenre;

      // Price filter
      const priceVal = parsePrice(account.price);
      const matchesMinPrice = !minPrice || priceVal >= Number(minPrice);
      const matchesMaxPrice = !maxPrice || priceVal <= Number(maxPrice);

      return matchesQuery && matchesGenre && matchesMinPrice && matchesMaxPrice;
    });

    // Sort Results
    if (selectedSort === "price-asc") {
      filteredAccounts = [...filteredAccounts].sort(
        (a, b) => parsePrice(a.price) - parsePrice(b.price)
      );
    } else if (selectedSort === "price-desc") {
      filteredAccounts = [...filteredAccounts].sort(
        (a, b) => parsePrice(b.price) - parsePrice(a.price)
      );
    }

    return {
      accounts: filteredAccounts,
      totalCount: filteredAccounts.length,
    };
  }, [initialQuery, selectedGenre, minPrice, maxPrice, selectedSort]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-wider uppercase text-white flex items-center gap-2.5">
            <Search className="w-8 h-8 text-purple-400" />
            <span>Search Accounts</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {initialQuery ? (
              <>
                Showing {searchResults.totalCount} results for &ldquo;
                <span className="text-purple-400 font-bold">{initialQuery}</span>
                &rdquo;
              </>
            ) : (
              "Browse and search across verified gaming accounts (Mobile Legends & PUBG)"
            )}
          </p>
        </div>

        {/* Direct search input refinement */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search accounts, skins, ranks..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-200 placeholder-slate-500 transition-all"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Main Content Grid: Filters Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        
        {/* Left Side: Advanced Filters Panel */}
        <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 space-y-6 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold uppercase tracking-widest text-slate-200 flex items-center gap-2">
                <Filter className="w-4 h-4 text-purple-400" />
                Refine Search
              </span>
              {(selectedSort !== "relevance" ||
                minPrice !== "" ||
                maxPrice !== "" ||
                selectedGenre !== "All") && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-pink-400 hover:text-pink-300 transition-colors font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 font-bold">Sort By</label>
              <div className="relative mt-2">
                <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value as SortOption)}
                  className="h-10 w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 pl-9 pr-8 text-xs font-semibold text-slate-200 outline-none transition-colors focus:border-purple-500 cursor-pointer"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs">▼</span>
              </div>
            </div>

            {/* Genre Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 font-bold">Category</label>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {allGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedGenre === genre
                        ? "bg-pink-500 text-white"
                        : "bg-slate-950/60 hover:bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-850 hover:border-slate-800"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Limits */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 font-bold">Price Range (MMK)</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-purple-500 placeholder:text-slate-600"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-purple-500 placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Right Side: Results List */}
        <div className="space-y-10">
          
          {/* Section: Marketplace Accounts */}
          {searchResults.accounts.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-lg font-black tracking-wide text-white uppercase flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-pink-400" />
                <span>Marketplace Accounts ({searchResults.accounts.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.accounts.map((account) => {
                  const gameLabel = account.gameType === "mobile-legends" ? "Mobile Legends" : "PUBG";
                  return (
                    <Link
                      key={account.id}
                      to={`/accounts/${account.id}`}
                      className="block w-full min-w-0 overflow-hidden rounded-2xl shadow-md hover:bg-slate-900/80 border border-slate-800/80 hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all duration-300 bg-slate-900/40"
                    >
                      <div className="relative group aspect-[16/10] overflow-hidden bg-slate-800">
                        <img
                          src={account.image}
                          alt={account.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <p className="text-xs text-green-400 rounded-sm py-0.5 px-1.5 bg-green-600/20 mt-1 flex items-center gap-1 absolute top-2 right-2 border border-green-500/20">
                          <CircleCheckBig className="w-3.5 h-3.5" /> For rental
                        </p>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20">
                            {gameLabel}
                          </span>
                          <p className="text-xs text-slate-500">{account.date || "Recent"}</p>
                        </div>

                        <h3 className="text-sm font-bold text-white leading-tight">
                          {highlightText(account.name, initialQuery)}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {highlightText(account.description, initialQuery)}
                        </p>

                        <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-850">
                          <div className="flex items-center gap-2">
                            <img
                              src={denoeProfileImage}
                              alt="Denoe profile"
                              className="h-8 w-8 shrink-0 rounded-full border border-slate-800 object-cover"
                            />
                            <div className="min-w-0">
                              <p className="truncate text-xs font-bold text-slate-300">Denoe</p>
                              <p className="truncate text-[10px] text-slate-500 font-medium">Verified Seller</p>
                            </div>
                          </div>
                          <p className="text-sm font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-400">
                            MMK {account.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="py-24 flex flex-col items-center justify-center text-center space-y-5 border border-dashed border-slate-800 rounded-3xl bg-slate-900/10">
              <div className="w-16 h-16 rounded-full bg-slate-900/60 border border-slate-850 flex items-center justify-center text-slate-500">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold text-slate-300">No account results found</p>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  We couldn&apos;t find any gaming accounts matching &ldquo;
                  <span className="text-purple-400 font-bold">{initialQuery}</span>
                  &rdquo;. Try adjusting your keywords or clearing the filters.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl px-5 py-2.5 text-xs font-bold shadow-lg shadow-purple-600/10 transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
