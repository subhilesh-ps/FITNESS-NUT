import { createContext, useReducer } from "react";
export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [...state.workouts, action.payload],
      };
    default:
      return state;
  }
};
export const WorkoutsContextProvider = ({ Children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return <WorkoutsContextProvider value={{ ...state, dispatch }}>{Children}</WorkoutsContextProvider>;
};
