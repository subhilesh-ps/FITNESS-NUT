import { createContext, useReducer } from "react";
export const WorkoutsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };

    default:
      return state;
  }
};
// eslint-disable-next-line react/prop-types
export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return <WorkoutsContext.Provider value={{ ...state, dispatch }}>{children}</WorkoutsContext.Provider>;
};
