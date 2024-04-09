import { getQuestionById } from "@/lib/actions/question.action";
import Image from "next/image";
import Link from "next/link";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Matric from "@/components/shared/Matric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Answer from "@/components/forms/Answer";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import AllAnswers from "@/components/shared/AllAnswers";
import Votes from "@/components/shared/Votes";
import { URLProps } from "@/types";
import { Metadata } from "next";





export const metadata: Metadata = {
  title: "Questions | Next Dev Overflow",
};





   const Page = async ({params, searchParams}: URLProps) => {
   
      const {userId: clerkId} = auth();
      
      let mongoUser;

      if (clerkId ){
         mongoUser = await getUserById({userId: clerkId})
      }

      const result = await getQuestionById({questionId: params.id})

   

     return(
        <>
          <div className="flex-start flex-col w-full">
             <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link href={`/profile/${result.author.clerkId}`}
                   className="flex items-center justify-start gap-1"
                >
                   <Image
                   src={result.author.picture}
                   alt="author picture"
                   className="rounded-full"
                   width={22}
                   height={22}
                   />
                   <p className="paragraph-semibold text-dark300_light700">
                     {result.author.name} 
                   </p>
                </Link>
                <div className="flex justify-end">

                      <Votes
                        type="Question"
                        itemId={JSON.stringify(result._id)}
                        userId={mongoUser ? JSON.stringify(mongoUser._id) : ''} // Ensure userId is always a string
                        upvotes={result?.upvotes.length}
                        hasupVoted={mongoUser ? result.upvotes.includes(mongoUser._id) : ''} // Check if mongoUser is defined
                        downvotes={result?.downvotes.length}
                        hasdownVoted={mongoUser ? result.downvotes.includes(mongoUser?._id) : ''} // Check if mongoUser is defined
                        hasSaved={mongoUser ? mongoUser.saved.includes(result._id) : ''} // Check if mongoUser is defined
                        />
                </div>
             </div>
             <h2 className="h2-semibold text-dark200_light900 text-left mt-3.5 w-full">
                {result.title}
             </h2>
          </div>
          <div className="mb-8 mt-5 flex flex-wrap gap-4">
                <Matric
                imgUrl="/assets/icons/clock.svg"
                alt="clock icon"
                value={` asked ${getTimestamp(result.createdAt)}`}
                title="Asked"
                textStyles="small-medium text-dark400_light800"
                />
                <Matric
                imgUrl="/assets/icons/message.svg"
                alt="message"
                value={formatAndDivideNumber(result.answers.length)}
                title="Answers"
                textStyles="small-medium text-dark400_light800"
                />
                <Matric
                imgUrl="/assets/icons/eye.svg"
                alt="eye"
                value={formatAndDivideNumber(result.views)}
                title="Views"
                textStyles="small-medium text-dark400_light800"
                />
            </div>
            <ParseHTML data={result.content} />
            <div className="flex mt-8 flex-wrap gap-2">
                {result.tags.map((tag:any) => (
                    <RenderTag
                      key={tag._id}
                      _id = {tag._id}
                      name = {tag.name}
                      showCount={false}
                    />
                ))}
            </div>

            <AllAnswers
               questionId={result._id}
               userId={mongoUser ? mongoUser._id : ''}
               totalAnswers={result.answers.length}
               page={searchParams?.page}
               filter = {searchParams?.filter}
            />

            <Answer
              question={result.content}
              questionId={JSON.stringify(result._id)}
              authorId={mongoUser ?  JSON.stringify(mongoUser._id) : ''}
            />
        </>
     )
   }



   export default Page;