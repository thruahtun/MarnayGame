import type { Game } from "@/lib/api";

interface PopularGameCardProps {
  games: Game[];
  onSelectGame: (gameName: string) => void;
}



const PopularGameCard = ({ games, onSelectGame }: PopularGameCardProps) => {
  return (
    <>
      {games.map((game) => (
        <div
          key={game.id}
          onClick={() => onSelectGame(game.name)}
          className="relative overflow-hidden rounded-lg border border-slate-800/80 shadow-md transition-all duration-300 hover:border-purple-500/40 hover:bg-slate-900/80 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
        >
          {game.image_url ? (
            <img
              src={game.image_url}
              alt={game.name}
              className="h-48 w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105 sm:h-52 md:h-56"
            />
          ) : (
            <div className="h-48 w-full bg-slate-900" />
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10 text-white">
            <h3 className="line-clamp-2 text-lg font-bold leading-snug tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-400">
              {game.name}
            </h3>
          </div>
        </div>
      ))}
    </>
  );
};
 
export default PopularGameCard;
