
import Link from "next/link";
import Image from "next/image";
import RenderTag from "./RenderTag";
import { getTopPopularTags } from "@/lib/actions/tag.actions";
import { getHotQuestions } from "@/lib/actions/question.action";






  

const RightSidebar = async () => {
     const hotQuestions = await getHotQuestions();
    const popularTags = await getTopPopularTags();
    return(
        <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
            <div>
               <h3 className="h3-bold text-dark200_light900">
                 Top questions
               </h3>
               <div className="flex mt-7 flex-col w-full gap-[30px]">
                   {hotQuestions.map((question) =>(
                   
                      <Link 
                        href={`/question/${question._id}`}
                        key={question._id}
                        className="flex justify-between items-center gap-7 cursor-pointer"
                      >
                        <p className="body-medium text-dark500_light700">
                            {question.title}   
                        </p>
                        <Image
                          src = "/assets/icons/chevron-right.svg"
                          alt="chevron-right"
                          width={20}
                          height={20}
                          className="invert-colors"
                        />
                      </Link> 
                   ))} 
               </div>
            </div>
            <div className="mt-16">
               <h3 className="h3-bold text-dark200_light900">
                 Popular Tags
               </h3>
               <div className="flex flex-col mt-7 gap-4">
                  {popularTags.map((tag) => (
                    <RenderTag
                      key={tag._id}
                      name = {tag.name}
                      _id = {tag._id}
                      totalQuestions={tag.numberOfQuestions}
                      showCount
                    />
                  ))}
               </div>
            </div>
        </section>
    )
}



export default RightSidebar;