  
   import { SearchParamsProps } from "@/types"
   import QuestionsCard from "../cards/QuestionsCard"
   import { getUserQuestions } from "@/lib/actions/user.action"
import Pagination from "./Pagination"


   interface Props extends SearchParamsProps {
      userId: string,
      clerkId: string | null,
   }

   const QuestionTab = async ({searchParams, userId, clerkId}: Props) => {
      const result = await getUserQuestions({
         userId,
          page:searchParams.page ? +searchParams.page : 1,
         })

       return(
          <>
            {result.questions.map((question) => (
                 <QuestionsCard
                 key={question._id}
                 _id = {question._id}
                 clerkId= {clerkId}
                 author = {question.author}
                 answers = {question.answers}
                 createdAt = {question.createdAt}
                 tags = {question.tags}
                 upvotes = {question.upvotes}
                 views = {question.views}
                 title = {question.title}
               />
            ))}

               <div className="mt-10">
                  <Pagination
                     pageNumber={searchParams?.page ? +searchParams.page : 1}
                     isNext={result.isNext}
                  />
               </div>
          </>
       )
   }


   export default QuestionTab