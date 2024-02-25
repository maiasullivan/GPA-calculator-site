import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// pretify: opt + shift + F
// HC = higher credit

function App() {
  const [totalWeight, setTotalWeight] = useState(0);

  const gradeMap = {
    HD: 4,
    DI: 3,
    CR: 2,
    PA: 1,
    NN: 0,
  };

  const [grades, setGrades] = useState({
    HD: 0,
    DI: 0,
    CR: 0,
    PA: 0,
    NN: 0,
  });

  const [gradesHC, setGradesHC] = useState({
    HD: 0,
    DI: 0,
    CR: 0,
    PA: 0,
    NN: 0,
  });

  const updateGrades = (category, change, isHC = false) => {
    if (
      change < 0 &&
      (isHC ? gradesHC[category] <= 0 : grades[category] <= 0)
    ) {
      return;
    }

    if (isHC) {
      setGradesHC((prevGrades) => ({
        ...prevGrades,
        [category]: prevGrades[category] + change,
      }));
    } else {
      setGrades((prevGrades) => ({
        ...prevGrades,
        [category]: prevGrades[category] + change,
      }));
    }
    setTotalWeight((totalWeight) => totalWeight + (isHC ? 24 : 12));
  };

  function weight() {}

  function computeGPA() {
    let totalWeightedGrade = 0;
    let totalWeight = 0;

    Object.keys(grades).forEach((key) => {
      totalWeightedGrade += grades[key] * gradeMap[key] * 12;
      totalWeight += grades[key] * 12;
    });

    Object.keys(gradesHC).forEach((key) => {
      totalWeightedGrade += gradesHC[key] * gradeMap[key] * 24;
      totalWeight += gradesHC[key] * 24;
    });

    if (totalWeight === 0) {
      return 0;
    }

    return totalWeightedGrade / totalWeight;
  }

  return (
    <>
      <div>{/* Logo section */}</div>
      <h1>GPA Calculator</h1>
      <p>Select your current results</p>
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