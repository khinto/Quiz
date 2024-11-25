import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trace } from "../../redux/question_reducer";
import "./result.css";
import { resetResultAction } from "../../redux/result_reducer";
import { resetAllAction } from "../../redux/question_reducer";
import { useLocation, useNavigate } from "react-router-dom";
const Result = ({ icon, title }) => {
  const { score } = useSelector((state) => state.result);
  const trace = useSelector((state) => state.questions.trace);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/");
    dispatch(resetResultAction());
    dispatch(resetAllAction());
    sessionStorage.removeItem(`currentQuestionIndex_${title}`);
  };

  return (
    <div className="result">
      <div className="title">
        <p>Quiz Completed!</p>
        <h1>You Scored...</h1>
      </div>
      <div className="result-score-wrapper">
        <div className="result-score">
          <div className="title-wrapper">
            <img src={icon} alt="" />
            <h2>{title}</h2>
          </div>
          <div className="score-wrapp">
            <p>{score}</p>
            <p>out of {trace}</p>
          </div>
        </div>
        <button className="retry-button" onClick={() => returnHome()}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Result;
