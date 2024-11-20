
import data from './data.json'
import { useLocation } from 'react-router-dom';


import React from 'react'

const useData = () => {

    const pathName=useLocation().pathname.slice(1);
    const quiz=data.quizzes.find(quiz=> quiz.title ===pathName)
    const QuizQuestions=quiz.questions;


    return {data,quiz,QuizQuestions} || [] ;
  
}

export default useData