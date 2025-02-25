  import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
  import Filter from "@/components/shared/Filter";
  import { UserFilters } from "@/costants/filter";
  import { getAllUser } from "@/lib/actions/user.action";
  import Link from "next/link";
  import UserCard from "@/components/cards/UserCard";
  import { SearchParamsProps } from "@/types";
  import Pagination from "@/components/shared/Pagination";
  import { Metadata } from "next";


  export const metadata: Metadata = {
    title: "Community | Next Dev Overflow",
  };
  

    const Page = async ({searchParams}: SearchParamsProps) => {
        
        const result = await getAllUser({
            searchQuery:searchParams.q,
            filter: searchParams.filter,
            page: searchParams.page ? +searchParams.page : 1
        })

        return(
           <>
               <h1 className="h1-bold text-dark100_light900">All Users</h1>

                <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearchbar
                    route="/community"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search for amazing minds"
                    otherClasses="flex-1"
                />

                <Filter
                    filters={UserFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                />
                </div>

              <section className="mt-12 flex flex-wrap gap-4">

              {result.users.length > 0 ? (
                    result.users.map((user) => <UserCard key={user._id} user={user} />)
                    ) : (
                    <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
                        <p>No users found</p>
                        <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
                        Join  Us!
                        </Link>
                    </div>
                    )}
              </section>
              <div className="mt-10">
                <Pagination
                    pageNumber={searchParams?.page ? +searchParams.page : 1}
                    isNext={result.isNext}
                />
            </div>  
           </>
        )
    }



    export default Page;