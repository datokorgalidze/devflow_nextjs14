 import Question from "@/components/forms/Question";
 import { auth } from "@clerk/nextjs";
 import { redirect } from "next/navigation";
 import { getUserById } from "@/lib/actions/user.action";

const Page = async ( ) => {
    // const { userId } = auth()
    const userId =  "12345"
    
    if(!userId) redirect('/sign-in')

   const mongooseUser = await getUserById({userId})

//    console.log("myuser:",mongooseUser)
   
    return(
        <div>
            <h1 className="h1-bold text-dark100_light900 mb-9">
                Ask a Question
            </h1>
            <div>
                <Question mongoUserId = {JSON.stringify(mongooseUser._id)}/>
            </div>
        </div>
    )  
}

export default Page;