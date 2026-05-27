import { gamesNames } from "@/lib/gamesStores";


const PopularGameCard = () => {
    return (
      <>

      {
        gamesNames.map((game) => (
            <div key={game.id} className="rounded-lg shadow-md overflow-hidden  hover:bg-slate-900/80 border border-slate-800/80 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]  transition-all duration-300 relative">
                <img
                    src={game.coverImage}
                    alt="Game Cover"
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
                <div className="p-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <h3 className="text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-400">
                    {game.name}
                    </h3>
                </div>
            </div>
        ))
    }
      </>
    );
}
 
export default PopularGameCard;
