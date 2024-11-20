import React, { useEffect, useState } from "react";
import "./quiz.css";
import useData from "../../hooks/useData";
import { MoveNextQestion } from "../../hooks/FetchQuestion";
import { useFetchQuestion } from "../../hooks/FetchQuestion";
import Result from "../result/Result";
import { useSelector, useDispatch } from "react-redux";
import { calculateScore } from "../../redux/result_reducer";

import { setTrace } from "../../redux/question_reducer";
import ProgressBar from "../progressbar/ProgressBar";
import { Navigate } from "react-router-dom";
import { resetAllAction } from "../../redux/question_reducer";

const Quiz = () => {
  const { quiz } = useData();

  const [{ isLoading, apiData, serverError }] = useFetchQuestion();
  const questions = useSelector((state) => state.questions.queue);
  const trace = useSelector((state) => state.questions.trace);

  const question = questions[trace];
  const [isCorrect, setIsCorrect] = useState(false);
  // const { score } = useSelector((state) => state.result);
  const dispatch = useDispatch();
  const [userAnswer, setUserAnswer] = useState();
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  if (isLoading) return <h3>Isloading</h3>;
  if (serverError) return <h3>Isloading</h3>;

  useEffect(() => {
    // Check if there's a saved trace value in localStorage
    const savedTrace = localStorage.getItem("currentQuestionIndex");
    if (savedTrace !== null) {
      // If found, dispatch an action to set it in Redux
      dispatch(setTrace(parseInt(savedTrace, 10))); // Convert to number and set in Redux
    }
  }, [dispatch]);

  const sumbitAnswer = () => {
    console.log(userAnswer);

    try {
      if (userAnswer.length !== 0) {
        dispatch(MoveNextQestion());
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }

    setUserAnswer(null);
    setHasSubmitted(false);
  };

  const checkAnswer = (useranswer) => {
    setUserAnswer(useranswer);
    setHasSubmitted(true);
    if (useranswer === question.answer) {
      dispatch(calculateScore());
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const styling = (index) => {
    console.log(index, userAnswer, question.answer);
    if (hasSubmitted) {
      if (index === question.answer) {
        return "correct";
      }
      if (index !== question.answer && index === userAnswer) {
        return "incorrect";
      }
    }

    return "";
  };

  useEffect(() => {
    if (trace >= questions.length) {
      setIsQuizFinished(true);
    } else {
      setIsQuizFinished(false);
    }

    if (trace !== null) {
      // Every time trace updates, save it to localStorage
      localStorage.setItem("currentQuestionIndex", trace.toString());
    }
  }, [trace, questions.length]);

  return (
    <div className="quiz">
      {isQuizFinished ? (
        <Result icon={quiz.icon} title={quiz.title} />
      ) : (
        <>
          <div className="container">
            <div className="subject_title">
              <img src={quiz.icon} />
              <h2>{quiz.title}</h2>
            </div>

            <div>
              <i>
                Question {trace + 1} out of {questions.length}
              </i>
            </div>

            <div className="question">
              <h2>{question && question.question}</h2>
            </div>

            <ProgressBar progress={(trace * 100) / questions.length} />
          </div>

          <div className="container-answer">
            <div className={`answers ${hasSubmitted ? "disable" : ""}`}>
              {question &&
                question.options.map((option, i) => (
                  <div
                    onClick={() => checkAnswer(i)}
                    key={i}
                    className={`answer ${styling(i)}`}
                  >
                    {option}
                  </div>
                ))}
            </div>

            <button onClick={sumbitAnswer}>Submit Answer</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
