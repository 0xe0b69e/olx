"use client";

import { Widget } from "@/components/widget";
import React from "react";
import { cn } from "@/lib/utils";
import { dosis } from "@/lib/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface EntryProps
{
  children: React.ReactNode;
  href: string;
}

export function SideBar (): JSX.Element
{
  return (
    <Widget
      paddings={false}
      className={"relative top-0 left-0 w-[180px] h-full flex flex-col items-center space-y-3 p-3"}
    >
      <Link href={"/dashboard"} className={"w-full bg-primary rounded-md p-2"}>
        <p className={cn( "font-bold text-2xl text-center", dosis.className )}>Dashboard</p>
      </Link>
      <Entry href={"products"}>
        Products
      </Entry>
    </Widget>
  )
}

function Entry ( { children, href }: EntryProps ): JSX.Element
{
  const pathname: string = usePathname();
  const path: string = `/dashboard/${href}`
  
  return (
    <Link
      className={cn(
        "w-full rounded-md p-2 text-center hover:scale-110 transition-all",
        pathname === path ? "bg-emerald-700" : "bg-popover"
      )}
      href={path}
    >
      {children}
    </Link>
  )
}