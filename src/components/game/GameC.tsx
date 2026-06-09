
import { CircleCheckBig } from "lucide-react";
import { Link } from "react-router";

import type { GameAccount } from "@/lib/gamesAccounts";
import denoeProfileImage from "@/assets/images/denoe-profile.jpg";



const GameC = ({ account }: { account: GameAccount }) => {
    return (
        <Link
          to={`/accounts/${account.id}`}
          className="block w-full min-w-0 overflow-hidden rounded-lg shadow-md hover:bg-slate-900/80 border border-slate-800/80 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]  transition-all duration-300"
        >
          <div className="relative group">
            <img
              src={account.image}
              alt="Game Cover"
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
            />
            <p className="text-sm text-green-500 rounded-sm py-0.5 px-1 bg-green-600/20 mt-1 flex items-center gap-1 absolute top-2 right-2">
              <CircleCheckBig className="w-4 h-4" /> For rental
            </p>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between gap-2 border-b border-b-mauve-500 pb-2">
              <h3 className="text-md font-bold ">{account.name}</h3>
              <p className="text-sm text-gray-400">{account.date}</p>
            </div>

            <div className="mt-4 flex items-center justify-between gap-10 md:gap-15 xs:gap-20">
              <div className=" flex items-center gap-3">
                <img
                  src={denoeProfileImage}
                  alt="Denoe profile"
                  className="h-12 w-12 shrink-0 rounded-full border border-slate-700 object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-base font-bold text-white">
                    Denoe
                  </p>
                  <p className="truncate text-sm font-medium text-slate-400">
                    Verified Seller
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-400 mr-2">
                  MMK {account.price}
                </p>
              </div>
            </div>
          </div>
        </Link>
    );  
}
 
export default GameC;  
