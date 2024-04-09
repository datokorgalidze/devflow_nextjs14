"use server";

import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Question from "@/database/question.model";
import interaction from "@/database/interaction.model";


   export async function  viewQuestion (params: ViewQuestionParams) {
      
        try{

            await connectToDatabase()

            const { userId, questionId} = params

            await Question.findByIdAndUpdate(questionId, {$inc: {views: 1 }})

            if (userId){
                const existingInterction = await interaction.findOne({
                    user: userId,
                    question: questionId,
                    action:"view"
                })

                if (existingInterction) return console.log("User has already viewed")
                
                await interaction.create({
                    user: userId,
                    question: questionId,
                    action:"view"
                })
            }       
        }catch(error){
           console.log(error)
           throw error 
        }
   }