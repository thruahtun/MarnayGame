
import { CircleCheckBig } from "lucide-react";

import type { GameAccount } from "@/lib/gamesAccounts";



const GameC = ({ account }: { account: GameAccount }) => {
    return (
      <>
          <div className="overflow-hidden min-w-[300px] rounded-lg shadow-md hover:bg-slate-900/80 border border-slate-800/80 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]  transition-all duration-300">
            <img
              src={account.image}
              alt="Game Cover"
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
            />
            <div className="p-4">
              <div className="flex items-center justify-between gap-2 border-b border-b-mauve-500 pb-2">
                <h3 className="text-md font-bold ">{account.name}</h3>
                <p className="text-sm text-gray-400">{account.date}</p>
              </div>

              <div className="flex items-center gap-2 mt-5 justify-between">
                <p className="text-sm text-gray-400">
                  Skins: <span className="text-white">400</span>
                </p>
                <p className="text-sm text-green-500 rounded-sm py-0.5 px-1 bg-green-500/20 mt-1 flex items-center gap-1">
                  <CircleCheckBig className="w-4 h-4" /> Available
                </p>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <p className="text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-400 mr-2">
                  MMK 48,000
                </p>
              </div>
            </div>
          </div>
      </>
    )  
}
 
export default GameC;  