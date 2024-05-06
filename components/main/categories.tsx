"use client";

import Link from "next/link";
import { Category } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaCat } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getCategories } from "@/actions/fetch";

export default function Categories (): JSX.Element
{
  const [ categories, setCategories ] = useState<Category[]>( [] );
  
  useEffect( (): void =>
  {
    const fetchCategories = async (): Promise<void> =>
    {
      const result: Category[] = await getCategories();
      setCategories( result );
    };
    
    fetchCategories().then();
  }, [] );
  
  return (
    <div className="w-[calc(100% - 24px)] my-[12px] mx-[12px] bg-muted py-14 rounded-xl">
      <h2 className="text-[32px] leading-[34px] font-bold text-center text-primary mb-[56px]">
        Categories
      </h2>
      <div className="grid w-full bg-inherit grid-cols-9 gap-x-0 items-stretch">
        {categories?.map( ( c: Category, i: number ) =>
          ( <Link
            className="inline-block text-center text-decoration-none grid-row-1 mb-10 px-6 text-blue-800 hover:scale-125 transition"
            key={i}
            href={`/${c.name.toLowerCase()}/`}
          >
            <Avatar className="w-[88px] h-[88px] flex-shrink-0 mx-auto block">
              <AvatarImage src={c.image || undefined} />
              <AvatarFallback className={"bg-popover"}>
                <FaCat className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
            <span className="text-base font-bold inline-flex justify-center text-center">{c.name.trim()}</span>
          </Link> ) )
        }
      </div>
    </div>
  );
}