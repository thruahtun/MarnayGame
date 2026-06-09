import {
  ArrowLeft,
  BadgeDollarSign,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  MessageCircle,
  PhoneCall,
  Send,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router";

import denoeProfileImage from "@/assets/images/denoe-profile.jpg";
import { gamesAccounts } from "@/lib/gamesAccounts";

const gameTypeLabels = {
  "mobile-legends": "Mobile Legends",
  pubg: "PUBG",
};

const AccountDetailPage = () => {
  const { accountId } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageDirection, setImageDirection] = useState<"next" | "previous">(
    "next",
  );
  const account = gamesAccounts.find(
    (item) => item.id === Number(accountId),
  );
  const detailAccount = account ?? gamesAccounts[0];

  const gameLabel = gameTypeLabels[detailAccount.gameType];
  const relatedImages = useMemo(() => {
    const images = detailAccount.galleryImages?.length
      ? detailAccount.galleryImages
      : [
          detailAccount.image,
          ...gamesAccounts
            .filter((item) => item.gameType === detailAccount.gameType)
            .map((item) => item.image),
        ];

    return Array.from(new Set(images));
  }, [detailAccount]);
  const selectedImage = relatedImages[selectedImageIndex] || detailAccount.image;
  const hasMultipleImages = relatedImages.length > 1;

  // useEffect(() => {
  //   setSelectedImageIndex(0);
  // }, [detailAccount.id]);

  const showPreviousImage = () => {
    setImageDirection("previous");
    setSelectedImageIndex((currentIndex) =>
      currentIndex === 0 ? relatedImages.length - 1 : currentIndex - 1,
    );
  };

  const showNextImage = () => {
    setImageDirection("next");
    setSelectedImageIndex(
      (currentIndex) => (currentIndex + 1) % relatedImages.length,
    );
  };

  const showGalleryImage = (imageIndex: number) => {
    if (imageIndex === selectedImageIndex) {
      return;
    }

    setImageDirection(imageIndex > selectedImageIndex ? "next" : "previous");
    setSelectedImageIndex(imageIndex);
  };

  if (!account) {
    return <Navigate to="/see-more/mobile-legends" replace />;
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to={`/see-more/${account.gameType}`}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {gameLabel} accounts
      </Link>

      <section className="grid grid-cols-1 gap-6 rounded-lg border border-slate-800 bg-slate-900/60 p-4 sm:p-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg border border-slate-800 bg-black">
            <div className="relative h-[210px] overflow-hidden xs:h-[230px] sm:h-[320px]">
              <img
                key={selectedImage}
                src={selectedImage}
                alt={account.name}
                className={`account-carousel-image account-carousel-image-${imageDirection} absolute inset-0 h-full w-full object-contain`}
              />
              <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/15 px-3 py-2 text-sm font-bold text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                For rental
              </span>
              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/75 text-slate-200 transition-colors hover:bg-slate-900 hover:text-white"
                    aria-label="Previous account image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/75 text-slate-200 transition-colors hover:bg-slate-900 hover:text-white"
                    aria-label="Next account image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </div>

          {hasMultipleImages && (
            <div className="flex gap-2 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/70 p-2 sm:gap-3 sm:p-3">
              {relatedImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => showGalleryImage(index)}
                  className={`h-14 w-24 shrink-0 overflow-hidden rounded-lg border-2 bg-slate-900 transition-all xs:h-16 xs:w-28 sm:h-20 sm:w-36 ${
                    selectedImageIndex === index
                      ? "border-pink-400 shadow-[0_0_16px_rgba(244,114,182,0.28)]"
                      : "border-slate-800 opacity-70 hover:border-slate-500 hover:opacity-100"
                  }`}
                  aria-label={`Show account image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${account.name} related screenshot ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center rounded-lg border border-slate-800 bg-slate-950/35 p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-purple-300">
              <Gamepad2 className="h-4 w-4" />
              {gameLabel}
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2">
              <CalendarDays className="h-4 w-4" />
              {account.date}
            </span>
          </div>

          <div className="mt-6 space-y-2">
            <h1 className="break-words text-xl font-black tracking-wide text-white sm:text-2xl">
              {account.name}
            </h1>
            <p className="text-xs leading-7 text-slate-400 sm:text-sm">
              {account.description}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
              <BadgeDollarSign className="h-5 w-5 text-pink-400" />
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                Price
              </p>
              <p className="mt-1 text-lg lg:text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-400">
                MMK {account.price}
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                Status
              </p>
              <p className="mt-1 text-lg font-black text-white">
                Verified listing
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-slate-800 bg-slate-950/50 p-4">
            <div className="flex items-center gap-3">
              <img
                src={denoeProfileImage}
                alt="Denoe profile"
                className="h-14 w-14 shrink-0 rounded-full border border-slate-700 object-cover"
              />
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-lg font-black text-white">
                  <UserRound className="h-4 w-4 text-slate-400" />
                  Denoe
                </p>
                <p className="text-sm font-medium text-slate-400">
                  Verified Seller
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <a
              href="https://t.me/MarnayGameStore"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-sky-600"
            >
              <Send className="h-4 w-4" />
              Telegram
            </a>
            <a
              href="https://m.me/MarnayGameStore"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              <MessageCircle className="h-4 w-4" />
              Messenger
            </a>
            <a
              href="viber://chat?number=+959251355782"
              target="_blank"
              rel="noreferrer"
              className="inline-flex col-span-2 items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-3 text-sm font-bold text-white hover:bg-purple-700 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Viber</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountDetailPage;
