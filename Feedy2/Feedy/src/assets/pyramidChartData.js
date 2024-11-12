export const pyramidChartOptions = {
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
