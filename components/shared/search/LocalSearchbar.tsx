"use client"
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react";
import { formUrlQuery } from "@/lib/utils";
import { removeKeysFromQuery } from "@/lib/utils";


interface customInputProps {
    route: string;
    imgSrc: string;
    iconPosition:string;
    placeholder:string;
    otherClasses?:string;

}



const LocalSearchbar = ({
    route,
    imgSrc,
    iconPosition,
    placeholder,
    otherClasses
}: customInputProps) => {

     const router = useRouter()
     const searchParams = useSearchParams()
     const pathname = usePathname()

     const query = searchParams.get('q')

     const [search, setSearch] = useState(query || '')


     useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            if(search) {
                const newUrl = formUrlQuery ({
                    params:searchParams.toString(),
                    key:'q',
                    value:search
               })
              router.push(newUrl,{scroll:false}) 
            }else{
                if(pathname === route){
                    const newUrl = removeKeysFromQuery({
                        params:searchParams.toString(),
                        keysToRemove:['q'],
                    })
                    router.push(newUrl,{scroll:false}); 
                }
            }
         
        },300)
         return () => clearInterval(delayDebounceFn)
     },[search, query, route, router, searchParams, pathname])
    

    return(
        <div className="relative w-full">
            <div   className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-[10px] px-4 ${otherClasses}`}>
              { iconPosition === 'left' && 
              ( <Image
               src=  {imgSrc}
               alt="search"
               width={24}
               height={24}
               className="crusor-pointer"
              />)
              }
              <Input
                 type="text"
                 placeholder= {placeholder}
                 value= {search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="paragraph-regular no-focus placeholder text-dark400_light700 bg-transparent border-none shadow-none outline-none"
              />
             { iconPosition === 'right' && 
              ( <Image
               src=  {imgSrc}
               alt="search"
               width={24}
               height={24}
               className="crusor-pointer"
               />)
              }
            </div>
        </div>
    )
}


export default LocalSearchbar;