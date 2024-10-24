import React, { useState } from "react";
import DefaultSideBar from "../Components/GeneralComponents/DefaultSideBar.jsx";
import Header from "../Components/GeneralComponents/Header.jsx";
import useAuth from "../../Hooks/useAuth.jsx";
import "../styles/EducationPage.css";
import CanvasJSReact from "@canvasjs/react-charts";

import educationExplanations, {
  carbD,
  protD,
  fatD,
} from "../../assets/EducationExplanations.js";

const quizQuestions = [
  {
    question: "What is the primary function of protein in the body?",
    options: ["Energy storage", "Building muscle", "Hydration", "Digestion"],
    answer: "Building muscle",
  },
  {
    question: "Which macronutrient provides the most energy per gram?",
    options: ["Carbs", "Fats", "Protein", "Water"],
    answer: "Fats",
  },
  {
    question: "What is the main source of energy for the body?",
    options: ["Vitamins", "Carbs", "Protein", "Minerals"],
    answer: "Carbs",
  },
];

const EducationPage = () => {
  const [showWarning, setShowWarning] = useState(true);
  const [showProtein, setShowProtein] = useState(false);
  const [showCarbs, setShowCarbs] = useState(false);
  const [showFats, setShowFats] = useState(false);
  const [showCalories, setShowCalories] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  const { user, handleLogout } = useAuth();
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleWarningClose = () => {
    setShowWarning(false);
  };

  const handleCloseModal = () => {
    setShowProtein(false);
    setShowCarbs(false);
    setShowFats(false);
    setShowCalories(false);
  };

  const handleClickOutsideModal = (e) => {
    if (e.target.className.includes("modal-container")) {
      handleCloseModal();
    }
  };

  const handleQuizAnswer = (answer) => {
    setUserAnswers({ ...userAnswers, [currentQuestion]: answer });
  };

  const handleQuizNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleQuizPrevious = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleQuizSubmit = () => {
    let totalScore = 0;
    quizQuestions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        totalScore++;
      }
    });
    setScore(totalScore);
    setIsQuizComplete(true);
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
    setCurrentQuestion(0);
    setUserAnswers({});
    setIsQuizComplete(false);
    setScore(0);
  };

  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  let dataPoint;
  let total;
  const options = {
    animationEnabled: true,
    backgroundColor: "#76ebb0",
    title: {
      text: "Nutrition Pyramid",
    },
    legend: {
      horizontalAlign: "right",
      verticalAlign: "center",
      reversed: true,
    },
    data: [
      {
        type: "pyramid",
        showInLegend: true,
        legendText: "{label}",
        indexLabel: "{label}",
        toolTipContent: "<b>{label}</b>: {y}",
        dataPoints: [
          { label: "Energy Balance/ Calories", y: 1000 },
          { label: "Macronutrients", y: 750 },
          { label: "Micronutrients", y: 800 },
          { label: "Meal Timing", y: 300 },
          { label: "Supplements", y: 250 },
        ],
      },
    ],
  };

  // Calculate percentage
  dataPoint = options.data[0].dataPoints;
  total = dataPoint[0].y;
  for (let i = 0; i < dataPoint.length; i++) {
    if (i === 0) {
      options.data[0].dataPoints[i].percentage = 100;
    } else {
      options.data[0].dataPoints[i].percentage = (
        (dataPoint[i].y / total) *
        100
      ).toFixed(2);
    }
  }

  return (
    <div className={showQuiz ? "blurred-background" : ""}>
      <DefaultSideBar user={user} logout={handleLogout} />
      <Header logout={handleLogout} user={user} />

      <div>
        {showWarning && (
          <div
            className={`tutorial-window-container ${showWarning ? "blurred" : ""}`}
            onClick={handleClickOutsideModal}
          >
            <div className="tutorial-window">
              <h2 style={{ textAlign: "center" }}>
                Welcome to the Nutrition Education Page!
              </h2>
              <p>
                Hey there! This page is designed to give some information about
                the nutrition basics. You can click close to dismiss this
                message.
              </p>
              <button onClick={handleWarningClose}>Close</button>
            </div>
          </div>
        )}
      </div>

      {/* Quiz Trigger */}
      <div>
        <button className={"edu-button"} onClick={() => setShowQuiz(true)}>
          Take the Nutrition Quiz
        </button>
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="modal-container">
          <div className="modal-window">
            {/* "X" button to close the quiz */}
            <button className="close-button" onClick={handleCloseQuiz}>
              X
            </button>

            {!isQuizComplete ? (
              <div>
                <h3>{quizQuestions[currentQuestion].question}</h3>
                <div>
                  {quizQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <button
                        key={index}
                        className={`quiz-option ${userAnswers[currentQuestion] === option ? "selected" : ""}`}
                        onClick={() => handleQuizAnswer(option)}
                      >
                        {option}
                      </button>
                    ),
                  )}
                </div>

                <div className="quiz-navigation">
                  {currentQuestion > 0 && (
                    <button onClick={handleQuizPrevious}>Previous</button>
                  )}
                  {currentQuestion < quizQuestions.length - 1 ? (
                    <button onClick={handleQuizNext}>Next</button>
                  ) : (
                    <button onClick={handleQuizSubmit}>Submit Quiz</button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h3>Quiz Complete!</h3>
                <p>
                  You answered {score} out of {quizQuestions.length} questions
                  correctly.
                </p>
                <button className={"close-button"} onClick={handleCloseQuiz}>
                  Close Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal triggers */}
      <div className={"content-box-what"}>
        <div className={"pop-up"}>
          <h2 style={{ marginLeft: "110px" }}>What is ?</h2>
          <button className={"edu-button"} onClick={() => setShowProtein(true)}>
            Protein
          </button>
          <button className={"edu-button"} onClick={() => setShowCarbs(true)}>
            Carbs
          </button>
          <button className={"edu-button"} onClick={() => setShowFats(true)}>
            Fats
          </button>
          <button
            className={"edu-button"}
            onClick={() => setShowCalories(true)}
          >
            Calories
          </button>
        </div>
      </div>

      {/* How to Section */}
      <div className={"content-box-how"}>
        <div className={"pop-up2"}>
          <h2 style={{ marginLeft: "130px" }}>How ?</h2>
          <button
            className={"edu-button2"}
            onClick={() => setShowProtein(true)}
          >
            Protein
          </button>
          <button className={"edu-button2"} onClick={() => setShowCarbs(true)}>
            Carbs
          </button>
          <button className={"edu-button2"} onClick={() => setShowFats(true)}>
            Fats
          </button>
          <button
            className={"edu-button2"}
            onClick={() => setShowCalories(true)}
          >
            Calories
          </button>
          <button
            className={"edu-button2"}
            onClick={() => setShowCalories(true)}
          >
            Calories
          </button>
          <button
            className={"edu-button2"}
            onClick={() => setShowCalories(true)}
          >
            Calories
          </button>
          <button
            className={"edu-button2"}
            onClick={() => setShowCalories(true)}
          >
            Calories
          </button>
          <button
            className={"edu-button2"}
            onClick={() => setShowCalories(true)}
          >
            Calories
          </button>
        </div>
      </div>

      <div className={"content-box-links"}>
        <div className={"pop-up3"}>
          <h2 style={{ marginLeft: "110px" }}>Usefull Links</h2>
          <button className={"edu-button"} onClick={() => setShowProtein(true)}>
            Protein
          </button>
          <button className={"edu-button"} onClick={() => setShowCarbs(true)}>
            Carbs
          </button>
          <button className={"edu-button"} onClick={() => setShowFats(true)}>
            Fats
          </button>
          <button
            className={"edu-button"}
            onClick={() => setShowCalories(true)}
          >
            Calories
          </button>
        </div>
      </div>

      {/* Modal for Protein */}
      {showProtein && (
        <div className="modal-container" onClick={handleClickOutsideModal}>
          <div className="modal-window1">
            <h3 className={"modal-headers"}>Proteins </h3>
            <img
              src={"../src/assets/prot-pic.jpg"}
              alt="Protein"
              className="modal-image"
            />
            <p style={{ textAlign: "start" }}>{protD}</p>

            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}

      {/* Modal for Carbs */}
      {showCarbs && (
        <div className="modal-container" onClick={handleClickOutsideModal}>
          <div className="modal-window1">
            <h3 className={"modal-headers"}>Carbohydrates</h3>
            <img src={"../src/assets/carb-pic.webp"} className="modal-image" />
            <p style={{ textAlign: "start" }}>{carbD}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}

      {/* Modal for Fats */}
      {showFats && (
        <div className="modal-container" onClick={handleClickOutsideModal}>
          <div className="modal-window1">
            <h3 className={"modal-headers"}>Fats</h3>
            <img
              src={"../src/assets/fat-pic.jpg"}
              alt="Fats"
              className="modal-image"
            />
            <p style={{ textAlign: "start" }}>{fatD}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}

      {/* Modal for Calories */}
      {showCalories && (
        <div className="modal-container" onClick={handleClickOutsideModal}>
          <div className="modal-window">
            <h3 className={"modal-headers"}>Calories </h3>
            <img
              src="Feedy2/Feedy/src/assets/fat-pic.jpg"
              alt="Calories"
              className="modal-image"
            />
            <p>Calories are the unit of energy that fuel our body.</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}

      <div className={"content-box-pyramid "}>
        {/* Nutrition Pyramid */}
        <div className={"pyramid"}>
          <CanvasJSChart
            options={options}
            /*onRef={ref => this.chart = ref}*/
          />
        </div>
        <button
          className={"pyramid-button"}
          onClick={() => setShowCalories(true)}
        >
          What is this Pyramid here ?
        </button>
      </div>
    </div>
  );
};

export default EducationPage;
