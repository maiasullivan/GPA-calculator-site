import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// pretify: opt + shift + F
// HC = higher credit

function App() {
  // Defining state variable to keep track of total weight and grades
  const [totalWeight, setTotalWeight] = useState(0);

  // Define a mapping of grades to their corresponding weights
  const gradeMap = {
    HD: 4,
    DI: 3,
    CR: 2,
    PA: 1,
    NN: 0,
  };

  // Define state variable with a dictionary to keep track of grades for 12 credit points
  const [grades, setGrades] = useState({
    HD: 0,
    DI: 0,
    CR: 0,
    PA: 0,
    NN: 0,
  });

  // Define state variable with a dictionary to keep track of grades for 24 credit points
  const [gradesHC, setGradesHC] = useState({
    HD: 0,
    DI: 0,
    CR: 0,
    PA: 0,
    NN: 0,
  });

  // Function to update the grades based on the mark, change, and whether it's higher credit (HC) or not
  const updateGrades = (mark, change, isHC = false) => {
    if (
      change < 0 &&
      (isHC ? gradesHC[mark] <= 0 : grades[mark] <= 0)
    ) {
      return;
    }

    // Update grades based on whether it's HC or not
    if (isHC) {
      setGradesHC((prevGrades) => ({
        // takes a callback function as an argument to receive the previous state and return the new state object
        // Use the previous state (prevGrades) to avoid race conditions
        ...prevGrades, // Spread operator copies all the key-value pairs from prevGrades into the new state object
                        // Ensures that other state values are retained and not lost during the update
        [mark]: prevGrades[mark] + change, // Update the specific mark with the new value
      }));
    } else {
      setGrades((prevGrades) => ({
        ...prevGrades,
        [mark]: prevGrades[mark] + change,
      }));
    }
    // Update the total weight based on whether it's HC or not
    setTotalWeight((totalWeight) => totalWeight + (isHC ? 24 : 12));
  };

  // Function to compute the GPA based on the current grades and total weight
  function computeGPA() {
    let totalWeightedGrade = 0;
    let creditsAttempted = 0;

    // Iterate through all grades that are worth 12 credit points
    Object.keys(grades).forEach((key) => {
      // Calculate the weighted grade for the current grade (HD, DI, CR, ect): grade value * grade count * credit points
      totalWeightedGrade += grades[key] * gradeMap[key] * 12;
      // Accumulate the total weight (credit points) based on the current grade
      creditsAttempted += grades[key] * 12;
    });

    // Iterate through all grades that are worth 24 credit points
    Object.keys(gradesHC).forEach((key) => {
      totalWeightedGrade += gradesHC[key] * gradeMap[key] * 24;
      creditsAttempted += gradesHC[key] * 24;
    });

    // Avoid division by zero
    if (creditsAttempted === 0) {
      return 0;
    }

    // GPA is computed by dividing the total weighted grade points earned by the total credit points attempted
    return totalWeightedGrade / totalWeight;
  }

  return (
    <>
      <div>{/* Logo section */}</div>
      <h1>GPA Calculator</h1>
      <p>Select your current results:</p>
      <div className="card">
        <p>
          12 credit points: &ensp;
          <button onClick={() => updateGrades("HD", 1)}>
            High Distinctions: {grades["HD"]}
          </button>{" "}
          <button
            className="smallButton"
            onClick={() => updateGrades("HD", -1)}
          >
            -
          </button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => updateGrades("DI", 1)}>
            Distinctions: {grades["DI"]}
          </button>{" "}
          <button
            className="smallButton"
            onClick={() => updateGrades("DI", -1)}
          >
            -
          </button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => updateGrades("CR", 1)}>
            Credits: {grades["CR"]}
          </button>{" "}
          <button
            className="smallButton"
            onClick={() => updateGrades("CR", -1)}
          >
            -
          </button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => updateGrades("PA", 1)}>
            Passes: {grades["PA"]}
          </button>{" "}
          <button
            className="smallButton"
            onClick={() => updateGrades("PA", -1)}
          >
            -
          </button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => updateGrades("NN", 1)}>
            Fails: {grades["NN"]}
          </button>{" "}
          <button
            className="smallButton"
            onClick={() => updateGrades("NN", -1)}
          >
            -
          </button>
        </p>
        <p>
          24 credit points: &ensp;
          <button onClick={() => updateGrades("HD", 1, true)}>
            High Distinctions: {gradesHC["HD"]}
          </button>{" "}
          <button
            className="smallButton"
            onClick={() => updateGrades("HD", -1, true)}
          >
            -
          </button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => updateGrades("DI", 1, true)}>
            Distinctions: {gradesHC["DI"]}
          </button>{" "}
          <button
            className="smallButton"
            onClick={() => updateGrades("DI", -1, true)}
          >
            -
          </button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => updateGrades("CR", 1, true)}>
            Credits: {gradesHC["CR"]}
          </button>{" "}
          <button
            className="smallButton"
            onClick={() => updateGrades("CR", -1, true)}
          >
            -
          </button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => updateGrades("PA", 1, true)}>
            Passes: {gradesHC["PA"]}
          </button>{" "}
          <button
            className="smallButton"
            onClick={() => updateGrades("PA", -1, true)}
          >
            -
          </button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => updateGrades("NN", 1, true)}>
            Fails: {gradesHC["NN"]}
          </button>{" "}
          <button
            className="smallButton"
            onClick={() => updateGrades("NN", -1, true)}
          >
            -
          </button>
        </p>
      </div>
      <h3>Current GPA: {computeGPA()}</h3>
      <p className="read-the-docs">By Maia Sullivan</p>
    </>
  );
}

export default App;