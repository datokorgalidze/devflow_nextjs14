 import Question from "@/components/forms/Question";
 import { auth } from "@clerk/nextjs";
 import { redirect } from "next/navigation";
 import { getUserById } from "@/lib/actions/user.action";
 import { Metadata } from "next";





 export const metadata: Metadata = {
   title: "Ask Question | Next Dev Overflow",
 };







  const Page = async ( ) => {
    const { userId } = auth()
  
    
    if(!userId) redirect('/sign-in')

   const mongooseUser = await getUserById({userId})


   
    return(
        <div>
            <h1 className="h1-bold text-dark100_light900 mb-9">
                Ask a Question
            </h1>
            <div>
                <Question mongoUserId = {JSON.stringify(mongooseUser?._id)}/>
            </div>
        </div>
    )  
}

export default Page;