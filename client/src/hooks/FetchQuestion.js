import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import data from "./data.json";
/**redux actions */

import * as actions from "../redux/question_reducer";
import useData from "./useData";
export const useFetchQuestion = () => {
  const dispatch = useDispatch();

  const { quiz, QuizQuestions } = useData();

  const [getData, setgetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    (async () => {
      try {
        let question = await QuizQuestions;
        if (QuizQuestions.length > 0) {
          setgetData((prev) => ({ ...prev, isLoading: false }));
          setgetData((prev) => ({
            ...prev,
            apiData: QuizQuestions,
          }));

          dispatch(actions.startExamAction(question));
        } else {
          throw new Error("No Question Avalibale");
        }
      } catch (error) {
        setgetData((prev) => ({ ...prev, isLoading: false }));
        setgetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);

  return [getData, setgetData] || [];
};

/**moveNextQuestion */

export const MoveNextQestion = () => async (dispatch) => {
  try {
    dispatch(actions.moveNextQestion());
  } catch (error) {
    console.log(error);
  }
};
