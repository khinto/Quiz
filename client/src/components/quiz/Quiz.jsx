import React, { useEffect, useState } from "react";
import "./quiz.css";
import useData from "../../hooks/useData";
import { MoveNextQestion } from "../../hooks/FetchQuestion";
import { useFetchQuestion } from "../../hooks/FetchQuestion";
import Result from "../result/Result";
import { useSelector, useDispatch } from "react-redux";
import { calculateScore } from "../../redux/result_reducer";

import { resetTrace, setTrace } from "../../redux/question_reducer";
import ProgressBar from "../progressbar/ProgressBar";

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
    const storageKey = `currentQuestionIndex_${quiz.title}`;
    dispatch(resetTrace());
    const savedTrace = sessionStorage.getItem(storageKey);
    if (savedTrace !== null) {
      dispatch(setTrace(parseInt(savedTrace, 10)));
    }
  }, [dispatch, quiz.title]);

  const sumbitAnswer = () => {
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

  const restartQuiz = () => {
    sessionStorage.removeItem(`currentQuestionIndex_${quiz.title}`);
    window.location.reload();
  };

  const styling = (index) => {
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
      const storageKey = `currentQuestionIndex_${quiz.title}`;
      sessionStorage.setItem(storageKey, trace.toString());
    }
  }, [trace, questions.length, quiz.title]);

  return (
    <div className="quiz">
      <div className="subject_title">
        <img src={quiz.icon} />
        <h2>{quiz.title}</h2>
      </div>
      <div className="quiz_wrapper">
        {isQuizFinished ? (
          <Result icon={quiz.icon} title={quiz.title} />
        ) : (
          <>
            <div className="container">
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
              <button onClick={restartQuiz}>Restart</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
