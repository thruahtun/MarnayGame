import PUBG from "@/assets/images/pubj.jpg";
import Ml from "../assets/images/mobilelegend.jpg";

interface Game {
    id: number;
    name: string;
    coverImage: string;
}




export const gamesNames: Game[] = [
    {
        id: 1,
        name: "PUBG MOBILE",
        coverImage: PUBG
    },
    {
        id: 2,
        name: "MOBILE LEGENDS",
        coverImage: Ml
    }
]