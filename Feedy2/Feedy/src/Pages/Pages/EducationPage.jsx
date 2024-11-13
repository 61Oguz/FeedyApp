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
  calD,
  nutD,
} from "../../assets/EducationExplanations.js";
import { quizQuestions } from "../../assets/quizData.js";
import {
  how1,
  how2,
  how3,
  how4,
  how5,
  how6,
} from "../../assets/HowToAnswers.js";

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

  const [showHow1, setShowHow1] = useState(false);
  const [showHow2, setShowHow2] = useState(false);
  const [showHow3, setShowHow3] = useState(false);
  const [showHow4, setShowHow4] = useState(false);
  const [showHow5, setShowHow5] = useState(false);
  const [showHow6, setShowHow6] = useState(false);
  const [pyr, setPyr] = useState(false);

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
    setShowHow1(false);
    setShowHow2(false);
    setShowHow3(false);
    setShowHow4(false);
    setShowHow5(false);
    setShowHow6(false);
    setPyr(false);
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
    backgroundColor: "#ffffff",
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
      <h1 className={"info-Header"}>Welcome to the Information Page!</h1>
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
      <div>
        <button
          className={"quiz-start-button "}
          onClick={() => setShowQuiz(true)}
        >
          Take the Nutrition Quiz
        </button>
      </div>
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
      <div className="circle-menu">
        <div className="menu-item top-left" onClick={() => setShowFats(true)}>
          Fats
        </div>
        <div className="menu-item top-right" onClick={() => setShowCarbs(true)}>
          Carbs
        </div>
        <div
          className="menu-item bottom-left"
          onClick={() => setShowCalories(true)}
        >
          Calories
        </div>
        <div
          className="menu-item bottom-right"
          onClick={() => setShowProtein(true)}
        >
          Proteins
        </div>
        <div className="center-label">What is?</div>
      </div>
      <div className={"content-box-how"}>
        <h2 style={{ marginLeft: "130px" }}>How ?</h2>
        <button className={"edu-button2"} onClick={() => setShowHow1(true)}>
          to determine the daily calorie need?
        </button>
        <button className={"edu-button2"} onClick={() => setShowHow1(true)}>
          to determine the daily macronutrients need?
        </button>
        <button className={"edu-button2"} onClick={() => setShowHow2(true)}>
          does our body uses calories and macronutrients?
        </button>
        <button className={"edu-button2"} onClick={() => setShowHow3(true)}>
          is the relationship between macros and calories?
        </button>

        <button className={"edu-button2"} onClick={() => setShowHow4(true)}>
          can we identify healthy portions for different foods?
        </button>
        <button className={"edu-button2"} onClick={() => setShowHow5(true)}>
          can we make healthier choices when eating out or choosing snacks?
        </button>
        <button className={"edu-button2"} onClick={() => setShowHow6(true)}>
          can we follow a healthy diet ?
        </button>
      </div>
      <div className={"content-box-links"}>
        <h2 style={{ marginLeft: "110px" }}>Usefull Links</h2>
        <button
          className={"edu-button"}
          onClick={() =>
            window.open("https://www.myplate.gov/life-stages/kids", "_blank")
          }
        >
          MyPlate for Kids
        </button>
        <button
          className={"edu-button"}
          onClick={() =>
            window.open(
              "https://nutritionsource.hsph.harvard.edu/kids-healthy-eating-plate/",
              "_blank",
            )
          }
        >
          Kid’s Healthy Eating Plate
        </button>
        <button
          className={"edu-button"}
          onClick={() =>
            window.open(
              "https://www.myplate.gov/life-stages/kids Healthy Eating for Teens",
              "_blank",
            )
          }
        >
          MyPlate for Teens
        </button>
        <button
          className={"edu-button"}
          onClick={() =>
            window.open(
              "https://www.myplate.gov/tip-sheet/healthy-eating-teens",
              "_blank",
            )
          }
        >
          Healthy Eating for Teens
        </button>
      </div>
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
      {showCalories && (
        <div className="modal-container" onClick={handleClickOutsideModal}>
          <div className="modal-window1">
            <h3 className={"modal-headers"}>Calories </h3>
            <img
              src={"../src/assets/cal-pic.webp"}
              alt="Fats"
              className="modal-image"
            />
            <p style={{ textAlign: "start" }}>{calD}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
      {showHow1 && (
        <div className="modal-container" onClick={handleClickOutsideModal}>
          <div className="modal-window1">
            <h3 className={"modal-headers"}>
              How to determine the daily calorie need?{" "}
            </h3>
            <p style={{ textAlign: "start" }}>{how1}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}{" "}
      {showHow2 && (
        <div className="modal-container" onClick={handleClickOutsideModal}>
          <div className="modal-window1">
            <h3 className={"modal-headers"}>
              How can we determine daily macronutrient needs?{" "}
            </h3>
            <p style={{ textAlign: "start" }}>{how2}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}{" "}
      {showHow3 && (
        <div className="modal-container" onClick={handleClickOutsideModal}>
          <div className="modal-window1">
            <h3 className={"modal-headers"}>
              How does our body use calories and macronutrients?{" "}
            </h3>
            <p style={{ textAlign: "start" }}>{how3}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}{" "}
      {showHow4 && (
        <div className="modal-container" onClick={handleClickOutsideModal}>
          <div className="modal-window1">
            <h3 className={"modal-headers"}>
              What is the relationship between macros and calories?{" "}
            </h3>
            <p style={{ textAlign: "start" }}>{how4}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}{" "}
      {showHow5 && (
        <div className="modal-container" onClick={handleClickOutsideModal}>
          <div className="modal-window1">
            <h3 className={"modal-headers"}>
              How can we identify healthy portions for different foods?{" "}
            </h3>
            <p style={{ textAlign: "start" }}>{how5}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}{" "}
      {showHow6 && (
        <div className="modal-container" onClick={handleClickOutsideModal}>
          <div className="modal-window1">
            <h3 className={"modal-headers"}>
              How can we make healthier choices when eating out or choosing
              snacks?
            </h3>
            <p style={{ textAlign: "start" }}>{how6}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
      {pyr && (
        <div className="modal-container" onClick={handleClickOutsideModal}>
          <div className="modal-window1">
            <h3 className={"modal-headers"}>Nutrition Pyramid</h3>
            <p style={{ textAlign: "start" }}>{nutD}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
      <div className={"content-box-pyramid "}>
        <div className={"pyramid"}>
          <CanvasJSChart options={options} />
        </div>
        <button className={"pyramid-button"} onClick={() => setPyr(true)}>
          What is this Pyramid here ?
        </button>
      </div>
    </div>
  );
};

export default EducationPage;
