"use client"
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useRef } from "react";
import { formUrlQuery } from "@/lib/utils";
import { removeKeysFromQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";



const GlobalSearch = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const searchContainerRef = useRef(null)

    const query = searchParams.get('q');

    const [search, setSearch] = useState(query || '');

    const [isOpen, setIsOpen] = useState(false);


    useEffect (() => {
       const handleOutsideClick = (e: any) => {
          if(searchContainerRef.current && 
             // @ts-ignore 
            !searchContainerRef.current.contains(e.target))
          {
            setIsOpen(false);
            setSearch('');  
          }
       }

       setIsOpen(false);

       document.addEventListener("click", handleOutsideClick);
   
       return () => {
         document.removeEventListener("click", handleOutsideClick);
       };

    },[pathname])


    useEffect(() => {

       const delayDebounceFn = setTimeout(() => {
           if(search) {
               const newUrl = formUrlQuery ({
                   params:searchParams.toString(),
                   key:'global',
                   value:search
              })
             router.push(newUrl,{scroll:false}) 
           }else{
               if(query){
                   const newUrl = removeKeysFromQuery({
                       params:searchParams.toString(),
                       keysToRemove:['global', 'type'],
                   })
                   router.push(newUrl,{scroll:false}); 
               }
           }
        
       },300)
        return () => clearInterval(delayDebounceFn)
    },[search, query,  router, searchParams, pathname])

    return(
        <div className="relative w-full max-w-[600px] max-lg:hidden" ref={searchContainerRef}>
            <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
              <Image
               src= "/assets/icons/search.svg"
               alt="search"
               width={24}
               height={24}
               className="crusor-pointer"
              />
              <Input
                 type="text"
                 placeholder="Search globally..." 
                 value= {search}
                 className="paragraph-regular no-focus placeholder text-dark400_light700 bg-transparent border-none shadow-none outline-none"
                 onChange={(e) => {
                    setSearch(e.target.value);
                    if (! isOpen ) setIsOpen(true);
                    if(e.target.value === '' && isOpen) setIsOpen(false) 
                 }}
              />
            </div>
            {isOpen && <GlobalResult/>}
        </div>
    )
}

export default GlobalSearch;