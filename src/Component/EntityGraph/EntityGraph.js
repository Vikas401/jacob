import React from 'react';
import CanvasJSReact from '../../canvas/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const EntityGraph = ({ data, clickData }) => {
  const points1 = [];
  const points = [];
  const points2 = [];
  const points3 = [];
  data.map((post) => {
    var dateAndTime = post.createdDateTime;
    post.senti_score.map((senti) => {
      var _data = {};
      _data.x = new Date(dateAndTime);
      _data.y = senti.score;
      points.push(_data)
    })
  })
  // clickdata come through props from onclick event of entity word map...
  clickData.map((post) => {
    var dateAndTime = post.date;
    var sentiScore = post.score
    var _data2 = {};
    _data2.x = new Date(dateAndTime);
    _data2.y = -1;
    var _data1 = {};
    _data1.x = new Date(dateAndTime);
    _data1.y = 1;

    var _data = {};
    _data.x = new Date(dateAndTime);
    _data.y = sentiScore;
    points1.push(_data)
    points2.push(_data1)
    points3.push(_data2)

  })
 //properties required to create canvas graph....
  const entityGraph = {
    theme: "",
    animationEnabled: true,
    title: {
      text: "100% stacked area chart",
      fontSize: 20
    },
    axisX: {
      title: "Time",
      valueFormatString: "MMM",
    },
    axisY: {
      title: "Sentiments",
      minimum: -1,
      maximum: 1,
      interval: .2,
    },
    toolTip: {
      shared: true
    },
    data: [
      {
        margin: "left",
        type: "rangeArea",
        markerType: "none",
        lineDashType: "line",
        color: "#990000",
        type: "splineArea",
        markerBorderColor: "",
        markerBorderThickness: 2,
        yValueFormatString: "#.00",
        dataPoints: points2
      },
      {
        type: "rangeArea",
        name: "sentiscore",
        legendMarkerType: "square",
        markerType: "circle",
        xValueFormatString: "01.00",
        color: "#00CC66",
        type: "area",
        markerBorderColor: "",
        markerBorderThickness: 2,
        yValueFormatString: "#.00",
        dataPoints: points1
      },
      {
        type: "column",
        markerType: "none",
        lineDashType: "line",
        color: "#0F2DA8",
        type: "splineArea",
        markerBorderColor: "",
        markerBorderThickness: 2,
        yValueFormatString: "#.00",
        dataPoints: points3
      },
   ]
  }
 return (
    <CanvasJSChart options={entityGraph} />
  )
}
export default EntityGraph;