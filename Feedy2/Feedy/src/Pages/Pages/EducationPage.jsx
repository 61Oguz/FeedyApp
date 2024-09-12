import React, {useState} from 'react';
import DefaultSideBar from "../Components/GeneralComponents/DefaultSideBar.jsx";
import Header from "../Components/GeneralComponents/Header.jsx";
import useAuth from "../../Hooks/useAuth.jsx";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../styles/EducationPage.css";

import CanvasJSReact from '@canvasjs/react-charts';


const EducationPage = () => {
    const [showWarning, setShowWarning] = useState(true);
    const {user, handleLogout} = useAuth();
    if (!user) {
        return <div>Loading...</div>;
    }

    const handleWarningClose = () => {
        setShowWarning(false);
    };

    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    let dataPoint;
    let total;
    const options = {
        animationEnabled: true,
        title: {
            text: "Nutrition Pyramid"
        },
        legend: {
            horizontalAlign: "right",
            verticalAlign: "center",
            reversed: true
        },
        data: [{
            type: "pyramid",
            showInLegend: true,
            legendText: "{label}",
            indexLabel: "{label}",
            toolTipContent: "<b>{label}</b>: {y}",
            dataPoints: [
                { label: "Energy Balance/ Calories", y: 1000},
                { label: "Macronutrients", y: 750},
                { label: "Micronutrients", y: 800},
                { label: "Meal Timing", y: 300},
                { label: "Supplements", y: 250}
            ]
        }]
    }
    //calculate percentage
    dataPoint = options.data[0].dataPoints;
    total = dataPoint[0].y;
    for(let i = 0; i < dataPoint.length; i++) {
        if(i === 0) {
            options.data[0].dataPoints[i].percentage = 100;
        } else {
            options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
        }
    }
    return (
        <div>
            <DefaultSideBar user={user} logout={handleLogout}/>
            <Header logout={handleLogout} user={user}/>

            <div>
                {showWarning && (
                    <div
                        className={`tutorial-window-container ${showWarning ? 'blurred' : ''}`}
                    >
                        <div className="tutorial-window">
                            <h2 style={{textAlign:"center"}}> Welcome to the Nutrition Education Page!</h2>
                            <p>
                                Hey there! this page is designed to give some information about the nutrition basics. You can click close to dismiss
                                this message.
                            </p>
                            <button onClick={handleWarningClose}>Close</button>
                        </div>
                    </div>
                )}
            </div>

            <div className={"pop-up"}>
                <h2 style={{marginLeft: "110px"}}>What is ?</h2>
                <Popup trigger={<button> Protein</button>} position="bottom center">
                    <div className="education-box">
                        <h3>Protein inhalt</h3>
                    </div>
                </Popup> <Popup trigger={<button> Carbs</button>} position="bottom center">
                <div className="education-box">
                    <h3>Protein inhalt</h3>
                </div>
            </Popup> <Popup trigger={<button> Fats</button>} position="bottom center">
                <div className="education-box">
                    <h3>Protein inhalt</h3>
                </div>
            </Popup> <Popup trigger={<button> Calories</button>} position="bottom center">
                <div className="education-box">
                    <h3>Protein inhalt</h3>
                </div>
            </Popup>
            </div>

            <div className={"pyramid"}>
                <CanvasJSChart options={options}
                    /*onRef={ref => this.chart = ref}*/
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>

        </div>
    );
};

export default EducationPage;