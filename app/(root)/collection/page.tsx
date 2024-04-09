
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/Filter";
import { QuestionFilters } from "@/costants/filter";
import NoResult from "@/components/shared/NoResult";
import QuestionsCard from "@/components/cards/QuestionsCard";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import { Metadata } from "next";





export const metadata: Metadata = {
  title: "Collection | Next Dev Overflow",
};






async function Home({searchParams}: SearchParamsProps) {

    const {userId} = auth()

    if( !userId ) return null
  
  const result = await getSavedQuestions({
      clerkId:userId,
      searchQuery:searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1
  })
  

  return (
    <> 
      
        <h1 className="h1-bold text-dark100_light900">
          Saved Questions
          </h1>
     
     
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar 
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for question"
          otherClasses="flex-1"
        />

        <Filter
          filters = {QuestionFilters}
          otherClasses = "min-h-[56px] sm:min-w-[170px]"
          
        />
      </div>

    

      <div className="flex flex-col w-full gap-6 mt-10">
         {result.questions.length > 0 ? 
           result.questions.map((question: any ) => (
             <QuestionsCard
               key={question._id}
               _id = {question._id}
               author = {question.author}
               answers = {question.answers}
               createdAt = {question.createdAt}
               tags = {question.tags}
               upvotes = {question.upvotes}
               views = {question.views}
               title = {question.title}
             />
           ))
           : <NoResult
              title = "There’s no saved question to show"
              descr = "Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"   
              link = "/ask-question"
              linkTitle = "Ask a Qusestion"
           /> 
         }
      </div> 
          <div className="mt-10">
              <Pagination
                  pageNumber={searchParams?.page ? +searchParams.page : 1}
                  isNext={result.isNext}
              />
           </div> 
    </>
  )
}

export default Home;