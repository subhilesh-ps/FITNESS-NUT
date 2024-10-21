import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDeatils";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts");
        console.log(response); // Check the response status
        const json = await response.json();
        console.log(json); // Check the parsed JSON
        if (response.ok) {
          setWorkouts(json);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => <WorkoutDetails key={workout._id} workout={workout} />)}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
