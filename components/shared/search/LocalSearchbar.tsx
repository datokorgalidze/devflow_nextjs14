"use client"
import Image from "next/image";
import { Input } from "@/components/ui/input"


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
                 value=""
                 onChange={() => {}}
                 className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
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