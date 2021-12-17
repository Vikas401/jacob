import { geoClipRectangle } from "d3";
import React from "react";
import CanvasJSReact from "../../canvas/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const EntityGraph = ({ data, clickData, timeFilter }) => {
  var sum = 0;
  var newMonth;
  var totalScore = {};
  var janArray = [],
    febArray = [],
    marchArray = [],
    aprilArray = [],
    mayArray = [],
    juneArray = [],
    julyArray = [],
    augArray = [],
    sepArray = [],
    octArray = [],
    novArray = [],
    decArray = [];
  var janAvgArray = [],
    febAvgArray = [],
    marchAvgArray=[],aprilAvgArray=[],mayAvgArray=[],juneAvgArray=[],julyAvgArray=[],augAvgArray=[],septAvgArray=[],octAvgArray=[],novAvgArray=[];
  data.map((datas) => {
    var d = new Date(datas.createdDateTime);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    newMonth = months[d.getMonth()];
    datas.senti_score.map((score) => {
      if (newMonth === "January") {
        sum += score.score;
        totalScore = {
          score: sum,
          date: datas.createdDateTime,
        };
        janArray.push(totalScore);
      } else if (newMonth === "February") {
        sum += score.score;
        totalScore = {
          score: sum,
          date: datas.createdDateTime,
        };
        febArray.push(totalScore);
      }else if (newMonth === "March") {
        sum += score.score;
        totalScore = {
          score: sum,
          date: datas.createdDateTime,
        };
        marchArray.push(totalScore);
      }else if (newMonth === "April") {
        sum += score.score;
        totalScore = {
          score: sum,
          date: datas.createdDateTime,
        };
        aprilArray.push(totalScore);
      }else if (newMonth === "May") {
        sum += score.score;
        totalScore = {
          score: sum,
          date: datas.createdDateTime,
        };
        mayArray.push(totalScore);
      }else if (newMonth === "June") {
        sum += score.score;
        totalScore = {
          score: sum,
          date: datas.createdDateTime,
        };
        juneArray.push(totalScore);
      }else if (newMonth === "July") {
        sum += score.score;
        totalScore = {
          score: sum,
          date: datas.createdDateTime,
        };
        julyArray.push(totalScore);
      }else if (newMonth === "August") {
        sum += score.score;
        totalScore = {
          score: sum,
          date: datas.createdDateTime,
        };
        augArray.push(totalScore);
      }else if (newMonth === "September") {
        sum += score.score;
        totalScore = {
          score: sum,
          date: datas.createdDateTime,
        };
        sepArray.push(totalScore);
      }else if (newMonth === "October") {
        sum += score.score;
        totalScore = {
          score: sum,
          date: datas.createdDateTime,
        };
        octArray.push(totalScore);
      }else if (newMonth === "November") {
        sum += score.score;
        totalScore = {
          score: sum,
          date: datas.createdDateTime,
        };
        novArray.push(totalScore);
      }
    });
  });

  var janAvarageSentiScore;
  var janDate;
  janArray.map((avg) => {
    if (avg.score != undefined || avg.score != null) {
      janAvarageSentiScore = avg.score / janArray.length;
      janDate = avg.date;
    }
  });
  var janScores = {
    score: janAvarageSentiScore,
    date: janDate,
  };
  janAvgArray.push(janScores);

  var febAvarageSentiScore;
  var febDate;
  febArray.map((avg) => {
    if (avg.score != undefined || avg.score != null) {
      febAvarageSentiScore = avg.score / febArray.length;
      febDate = avg.date;
    }
  });
  var febScore = {
    score: febAvarageSentiScore,
    date: febDate,
  };
  febAvgArray.push(febScore);

  var marchAvarageSentiScore;
  var marchDate;
  marchArray.map((avg) => {
    if (avg.score != undefined || avg.score != null) {
      marchAvarageSentiScore = avg.score / marchArray.length;
      marchDate = avg.date;
    }
  });
  var marchScores = {
    score: marchAvarageSentiScore,
    date: marchDate,
  };
  marchAvgArray.push(marchScores);

  var aprilAvarageSentiScore;
  var aprilDate;
  aprilArray.map((avg) => {
    if (avg.score != undefined || avg.score != null) {
      aprilAvarageSentiScore = avg.score / aprilArray.length;
      aprilDate = avg.date;
    }
  });
  var aprilScores = {
    score: aprilAvarageSentiScore,
    date: aprilDate,
  };
  aprilAvgArray.push(aprilScores);

  var mayAvarageSentiScore;
  var mayDate;
  mayArray.map((avg) => {
    if (avg.score != undefined || avg.score != null) {
      mayAvarageSentiScore = avg.score / mayArray.length;
      mayDate = avg.date;
    }
  });
  var mayScores = {
    score: mayAvarageSentiScore,
    date: mayDate,
  };
  mayAvgArray.push(mayScores);

  var juneAvarageSentiScore;
  var juneDate;
  juneArray.map((avg) => {
    if (avg.score != undefined || avg.score != null) {
      juneAvarageSentiScore = avg.score / juneArray.length;
      juneDate = avg.date;
    }
  });
  var juneScores = {
    score: juneAvarageSentiScore,
    date: juneDate,
  };
  juneAvgArray.push(juneScores);

  var julyAvarageSentiScore;
  var julyDate;
  julyArray.map((avg) => {
    if (avg.score != undefined || avg.score != null) {
      julyAvarageSentiScore = avg.score / julyArray.length;
      julyDate = avg.date;
    }
  });
  var julyScores = {
    score: julyAvarageSentiScore,
    date: julyDate,
  };
  julyAvgArray.push(julyScores);

  var augAvarageSentiScore;
  var augDate;
  augArray.map((avg) => {
    if (avg.score != undefined || avg.score != null) {
      augAvarageSentiScore = avg.score / augArray.length;
      augDate = avg.date;
    }
  });
  var augScores = {
    score: augAvarageSentiScore,
    date: augDate,
  };
  augAvgArray.push(augScores);

  var septAvarageSentiScore;
  var septDate;
  sepArray.map((avg) => {
    if (avg.score != undefined || avg.score != null) {
      septAvarageSentiScore = avg.score / sepArray.length;
      septDate = avg.date;
    }
  });
  var sepScores = {
    score: septAvarageSentiScore,
    date: septDate,
  };
  septAvgArray.push(sepScores);

  var octAvarageSentiScore;
  var octDate;
  octArray.map((avg) => {
    if (avg.score != undefined || avg.score != null) {
      octAvarageSentiScore = avg.score / octArray.length;
      octDate = avg.date;
    }
  });
  var octScores = {
    score: octAvarageSentiScore,
    date: octDate,
  };
  octAvgArray.push(octScores);

  var novAvarageSentiScore;
  var novDate;
  novArray.map((avg) => {
    if (avg.score != undefined || avg.score != null) {
      novAvarageSentiScore = avg.score / novArray.length;
      novDate = avg.date;
    }
  });
  var novScores = {
    score: novAvarageSentiScore,
    date: novDate,
  };
  novAvgArray.push(novScores);


  var averageSentimentArray = [...janAvgArray, ...febAvgArray, ...marchAvgArray, ...aprilAvgArray, ...mayAvgArray, ...juneAvgArray, ...julyAvgArray];

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
      points.push(_data);
    });
  });
  // clickdata come through props from onclick event of entity word map...
  averageSentimentArray.map((post) => {
    var dateAndTime = post.date;
    var _data2 = {};
    _data2.x = new Date(dateAndTime);
    _data2.y = -1;
    var _data1 = {};
    _data1.x = new Date(dateAndTime);
    _data1.y = 1;

    var _data = {};
    _data.x = new Date(dateAndTime);
    _data.y = post.score;
    points1.push(_data);
    points2.push(_data1);
    points3.push(_data2);
  });

  //properties required to create canvas graph....
  const entityGraph = {
    theme: "",
    animationEnabled: true,
    title: {
      text: "100% stacked area chart",
      fontSize: 20,
    },
    axisX: {
      title: "Time",
      valueFormatString: "MMM",
      interval: 2
    },
    axisY: {
      title: "Sentiments",
      minimum: -1,
      maximum: 1,
      interval: 0.2,
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        // margin: "left",
        type: "rangeArea",
        markerType: "none",
        lineDashType: "line",
        color: "#990000",
        type: "splineArea",
        markerBorderColor: "",
        markerBorderThickness: 2,
        yValueFormatString: "#.00",
        dataPoints: points2,
      },
      {
        type: "rangeArea",
        name: "Avg sentiscore",
        legendMarkerType: "square",
        markerType: "circle",
        xValueFormatString: "01.00",
        color: "#00CC66",
        type: "area",
        markerBorderColor: "",
        markerBorderThickness: 2,
        yValueFormatString: "#.00",
        dataPoints: points1,
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
        dataPoints: points3,
      },
    ],
  };
  return <CanvasJSChart options={entityGraph} />;
};
export default EntityGraph;
