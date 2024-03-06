 import Image from "next/image";
 import Link from "next/link";
 import { Button } from "../ui/button";

 interface Props {
    title: string;
    descr:string;
    link: string;
    linkTitle:string;
 }


 const NoResult = ({title, descr, link, linkTitle} : Props) => {
    return(
        <div className="flex flex-col w-full mt-10 items-center justify-center">
            <Image
             src= "/assets/images/light-illustration.png"
             alt="No result"
             width={270}
             height={200}
             className="block object-contain dark:hidden"
             style={{ width: "auto" }}
            />

           <Image
             src= "/assets/images/dark-illustration.png"
             alt="No result"
             width={270}
             height={200}
             className="hidden object-contain dark:flex"
             style={{ width: "auto" }}
            />

            <h2 className="h2-bold text-dark200_light900 mt-8  ">{title}</h2>
            <p className=" body-regular text-dark500_light700 my-3.5 text-center max-w-md">
               {descr}
            </p>
            <Link href= {link}>
             <Button className="paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
                 {linkTitle}
             </Button>
            </Link>
        </div>
    )
 }

 export default NoResult;