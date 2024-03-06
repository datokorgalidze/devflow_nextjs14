"use client"

import { HomePageFilters } from "@/costants/filter";
import { Button } from "../ui/button";



const HomeFilters = () => {
    const active = 'newest';
    return(
        <div className="mt-10 hidden flex-wrap md:flex gap-3">
            {HomePageFilters.map((item) =>(
                <Button
                  key={item.value}
                  onClick={()=>{}}
                  className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
                    active === item.value
                      ? "bg-primary-100 text-primary-500"
                      : "bg-light-800 text-light-500  hover:bg-light-700 dark:bg-dark-300 dark:hover:bg-dark-500"
                  }`}
                >
                   {item.name} 
                </Button>
            ))}
        </div>
    )
}


export default HomeFilters;