import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import data from "../hooks/data.json";
const Home = () => {
  return (
    <div className="home">
      <div className="home_wrapper">
        <div className="title">
          <div>
            <p>
              Welcome to the <b>Frontend QUIZ</b>
            </p>
          </div>
          <p>Pick a subject to get started</p>
        </div>

        <div className="subject_wrapper">
          {data.quizzes.map((quiz, i) => (
            <Link key={i} className="subject" to={quiz.title}>
              <img src={quiz.icon} />
              {quiz.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
