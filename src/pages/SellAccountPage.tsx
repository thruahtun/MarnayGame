import { Link, useParams } from "react-router";
import { ArrowLeft, BadgeDollarSign, MessageCircle, PhoneCall, Send, ShieldCheck, Sparkles } from "lucide-react";
import mobileLegendImage from "@/assets/images/mobilelegend.jpg";
import pubgImage from "@/assets/images/pubj.jpg";

const telegramLink = "https://t.me/MarnayGameStore";
const viberLink = "viber://chat?number=%2B959000000000";

const sellerPageData = {
  "mobile-legends": {
    name: "Mobile Legend",
    image: mobileLegendImage,
    headline: "Heroes, skins, rank, diamonds, and linked account status.",
    accent: "MOBA seller desk",
  },
  pubg: {
    name: "PUBG",
    image: pubgImage,
    headline: "Tier, outfits, weapon skins, UC, and inventory highlights.",
    accent: "Battle royale desk",
  },
};

const SellAccountPage = () => {
  const { gameType } = useParams();
  const page = sellerPageData[gameType as keyof typeof sellerPageData] || sellerPageData["mobile-legends"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-pink-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to store</span>
      </Link>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 items-stretch">
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
          <div className="relative min-h-[360px]">
            <img
              src={page.image}
              alt={`${page.name} seller account`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/10" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-widest font-bold text-pink-400">
                Seller Account Link
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-black text-white">
                Sell {page.name} Account
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Submit your account details for review. Clear photos, accurate stats, and contact information help buyers make faster decisions.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Contact Seller Team</h2>
              <p className="text-sm text-slate-500">Choose Telegram or Viber to start your sale.</p>
            </div>
          </div>

          {/* <div className="rounded-lg border border-pink-500/20 bg-pink-500/10 p-5">
            <p className="text-xs uppercase tracking-widest font-bold text-pink-300">
              {page.accent}
            </p>
            <p className="mt-3 text-2xl font-black leading-tight text-white">
              Send screenshots and account value details directly to our team.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {page.headline} We review the information, confirm the listing quality, and help prepare it for buyers.
            </p>
          </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <p className="mt-3 text-sm font-bold text-white">Fast Review</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Share rank, skins, price, and contact preference.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
              <BadgeDollarSign className="w-5 h-5 text-emerald-400" />
              <p className="mt-3 text-sm font-bold text-white">Buyer Ready</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                We shape the listing so buyers can scan it quickly.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={telegramLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-4 py-3 text-sm font-bold text-white hover:bg-sky-600 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Telegram</span>
            </a>
            <a
              href={viberLink}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-3 text-sm font-bold text-white hover:bg-purple-700 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Viber</span>
            </a>
          </div>

          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 flex gap-3 text-sm text-emerald-100">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <p>
              Do not send passwords first. Share screenshots and basic account details, then wait for verification guidance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellAccountPage;
