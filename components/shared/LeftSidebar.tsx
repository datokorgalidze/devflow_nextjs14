"use client"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { sidebarLinks } from "@/costants"
import Link from "next/link"
import { SignedOut } from "@clerk/nextjs"
import { Button } from "../ui/button"
import { useAuth } from "@clerk/nextjs"
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation'

const LeftSidebar = () => {
    const pathname = usePathname();
    const {userId} = useAuth();
    const router = useRouter();
    const {signOut } = useClerk();
    return(
       <section  className="background-light900_dark200  justify-between
            light-border custom-scrollbar 
            sticky left-0 top-0 flex h-screen flex-col 
            overflow-y-auto border-r p-6 pt-36
            shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
           <div className="flex flex-1 flex-col gap-6 mb-5">
            {sidebarLinks.map((item) => {
                const isActive = (pathname.includes(item.route) && item.route.length > 1 || 
                pathname === item.route )
                if( item.route === '/profile'){
                   if(userId){
                     item.route = `${item.route}/${userId}`
                   }else{
                    return null
                   }
                }
                return(
                      <Link
                       key={item.route} 
                        href={item.route}
                        className={`${
                            isActive
                              ? "primary-gradient rounded-lg text-light-900"
                              : "text-dark300_light900"
                          } flex items-center justify-start gap-4 bg-transparent p-4 hover:primary-gradient  focus:text-light-900`}

                        >
                        <Image
                        className={`${isActive ? "" : "invert-colors"}`}
                        src={item.imgURL}
                        alt= {item.label}
                        width={20}
                        height={20}
                        />
                        <p className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}>
                          {item.label}
                        </p>
                       </Link>
                    
                    )
                })}
            </div>
             <SignedOut>
                   <div className="flex flex-col gap-3">                  
                         <Link
                           href = '/sign-in'
                         >
                            <Button className="small-medium btn-secondary
                             min-h-[41px] w-full
                              rounded-lg px-4 py-3 shadow-none">
                              <Image
                                src="/assets/icons/account.svg"
                                alt="log in"
                                width={20}
                                height={20}
                                className="invert-colors lg:hidden"
                              />  
                                <span className="primary-text-gradient max-lg:hidden">
                                   Log In
                                </span>
                            </Button>
                         </Link> 
                         </div>
                      </SignedOut>   
                         <Link
                           href = '/'
                           >
                            <Button  onClick={() => signOut(() => router.push("/"))}
                            className="small-medium light-border-2 btn-tertiary
                             text-dark400_light900 min-h-[41px] w-full
                              rounded-lg px-4 py-3 shadow-none">
                               <Image
                                src="/assets/icons/sign-up.svg"
                                alt="log out"
                                width={20}
                                height={20}
                                className="invert-colors lg:hidden"
                              />  
                                <span className="max-lg:hidden">
                                   Log Out
                                </span>
                            </Button>
                         </Link>  
                
               </section>
    )
}



export default LeftSidebar;