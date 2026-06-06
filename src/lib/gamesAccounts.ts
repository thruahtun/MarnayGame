import a from "@/assets/images/1.jpg";
import b from "@/assets/images/2.jpg";

export interface GameAccount {
    id: number,
    gameType: "mobile-legends" | "pubg",
    name: string,
    description: string,
    price: string,
    image: string,
    date?: string
}

export const gamesAccounts: GameAccount[] = [
  {
    id: 1,
    gameType: "mobile-legends",
    name: "Chou Epic Skin",
    description: "A fast-paced MOBA game where you battle against opponents in real-time.",
    price: "450,000",
    image: a,
    date: "27/5/2026"
  },
  {
    id: 2,
    gameType: "pubg",
    name: "PUBG Conqueror Account",
    description: "A battle royale game with intense combat and strategic gameplay.",
    price: "100,000",
    image: b,
    date: "27/5/2026"
  },
  {
    id: 3,
    gameType: "mobile-legends",
    name: "Chou Epic Skin",
    description: "A fast-paced MOBA game where you battle against opponents in real-time.",
    price: "450,000",
    image: a,
    date: "27/5/2026"
  },
  {
    id: 4,
    gameType: "pubg",
    name: "PUBG Royal Pass Account",
    description: "A battle royale game with intense combat and strategic gameplay.",
    price: "100,000",
    image: b,
    date: "27/5/2026"
  },
  {
    id: 5,
    gameType: "mobile-legends",
    name: "Chou Epic Skin",
    description: "A fast-paced MOBA game where you battle against opponents in real-time.",
    price: "450,000",
    image: a,
    date: "27/5/2026"
  }

];
