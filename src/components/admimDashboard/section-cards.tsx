"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CircleCheckBig, ShoppingBag, WalletCards } from "lucide-react"

export function SectionCards() {
  return (
    <div className="grid grid-cols-3 p-2 gap-1 sm:gap-2 md:gap-3 lg:gap-5 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-3 @xl/main:grid-cols-3 @5xl/main:grid-cols-3 dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader className=" p-2 -mt-3 md:p-3">
          <CardDescription className="text-[9px] md:text-[15px]">
            Available Accounts
          </CardDescription>
          <CardAction className="hidden md:block">
            <Badge variant="outline" className="p-3">
              <CircleCheckBig />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className=" p-2 -mt-6 -mb-2 md:p-3">
          <CardTitle className="md:text-2xl text-md font-semibold tabular-nums @[250px]/card:text-3xl">
            15
          </CardTitle>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className=" p-2 -mt-3 md:p-3">
          <CardDescription className="text-[9px] md:text-[15px]">
            Sold Accounts
          </CardDescription>
          <CardAction className="hidden md:block">
            <Badge variant="outline">
              <ShoppingBag />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className=" p-2 -mt-6 -mb-2 md:p-3">
          <CardTitle className="md:text-2xl text-md font-semibold tabular-nums @[250px]/card:text-3xl">
            10
          </CardTitle>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="p-2 -mt-3 md:p-3">
          <CardDescription className="text-[9px] md:text-[15px]">
            Total Accounts
          </CardDescription>
          <CardAction className="hidden md:block">
            <Badge variant="outline">
              <WalletCards />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className=" p-2 -mt-6 -mb-2 md:p-3">
          <CardTitle className="md:text-2xl text-md font-semibold tabular-nums @[250px]/card:text-3xl">
            25
          </CardTitle>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className=" p-2 -mt-3 md:p-3">
          <CardDescription className="text-[9px] md:text-[15px]">
            Total Spending
          </CardDescription>
        </CardHeader>
        <CardFooter className=" p-2 -mt-6 -mb-2 md:p-3">
          <CardTitle className="md:text-2xl text-md font-semibold tabular-nums @[250px]/card:text-3xl">
            3000000ks
          </CardTitle>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className=" p-2 -mt-3 md:p-3">
          <CardDescription className="text-[9px] md:text-[15px]">
            Total Revenue
          </CardDescription>
        </CardHeader>
        <CardFooter className=" p-2 -mt-6 -mb-2 md:p-3">
          <CardTitle className="md:text-2xl text-md font-semibold tabular-nums @[250px]/card:text-3xl">
            26000000ks
          </CardTitle>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className=" p-2 -mt-3">
          <CardDescription className="text-[9px] md:text-[15px]">Profit</CardDescription>
        </CardHeader>
        <CardFooter className=" p-2 -mt-6 -mb-2">
          <CardTitle className="md:text-2xl text-md font-semibold tabular-nums @[250px]/card:text-3xl">
            40000ks
          </CardTitle>
        </CardFooter>
      </Card>
    </div>
  );
}
