import React, { useState } from "react";
import ReactWordcloud from "react-wordcloud";
import select from "jquery";
import './Topic_wordCloud.css'
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
//data come through props from perent component....
const Topic_WordCloud = ({ data, clickData }) => {
  const [count, setCount] = useState([]);
  const [clicked, setclicked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [change, setChange] = useState(false)
  const topicArray = [];
  var countArray = [];
  var scoreArray = [];
  var sortArray = [];
  var temp = [];
  data.map((post) => {
    post.senti_score.map((senti) => {
      var score = senti.score;
      senti.topic.map((topics) => {
        var json = {
          text: topics,
          score: score,
        };
        topicArray.push(json);
      });
    });
  });
  for (var i = 0; i < topicArray.length; i++) {
    if (temp.indexOf(topicArray[i].text) === -1) {
      temp.push(topicArray[i].text);
      var _data = {};
      _data.text = topicArray[i].text;
      _data.score = topicArray[i].score;
      _data.value = 1;
      countArray.push(_data);
    } else {
      for (var j = 0; j < countArray.length; j++) {
        if (countArray[j].text === topicArray[i].text) {
          var _x = parseInt(countArray[j].value) + 1;
          countArray[j].value = _x;
        }
      }
    }
  }
 
  // required properties to display topic word cloud....
  const callbacks = {
    //  set color according to his sentiments score......
    getWordColor: (word) =>
      word.score >= 0.8
        ? "#288952"
        : word.score >= 0.7 && word.score <= 0.79
        ? "#3a9252"
        : word.score >= 0.6 && word.score <= 0.69
        ? "#4c9b52"
        : word.score >= 0.5 && word.score <= 0.59
        ? "#5ea522"
        : word.score >= 0.4 && word.score <= 0.49
        ? "#81b752"
        : word.score >= 0.3 && word.score <= 0.39
        ? "#93c151"
        : word.score >= 0.2 && word.score <= 0.29
        ? "#b7d351"
        : word.score >= 0.1 && word.score <= 0.19
        ? "#dae651"
        : word.score >= 0.09 && word.score >= -0.09
        ? "#fef851"
        : word.score >= -0.1 && word.score >= -0.19
        ? "#fbd64d"
        : word.score >= -0.2 && word.score >= -0.29
        ? "#f9b449"
        : word.score >= -0.3 && word.score >= -0.39
        ? "#f79145"
        : word.score >= -0.4 && word.score >= -0.49
        ? "#f58043"
        : word.score >= -0.5 && word.score >= -0.59
        ? "#f35e3f"
        : word.score >= { from: -0.6, to: -0.69 }
        ? "#f14d3d"
        : word.score >= -0.1 && word.score >= -0.19
        ? "#f03c3b"
        : word.score <= -8
        ? "#ef2b39"
        : "red",
    onWordClick: console.log,
    // create hover on word...
    onWordMouseOver: (word, event) => {
      const isActive = "onWordMouseOver" !== "onWordMouseOut";
      const element = event.target;
      const text = select(element);
      text
        .attr("font-size", isActive ? "150%" : word.size)
        .attr("font-weight", isActive ? "bold" : "unbold");
    },
    onWordMouseOut: (word, event) => {
      const isActive = "onWordMouseOut" !== "onWordMouseOver";
      const element = event.target;
      const text = select(element);
      text
      .attr('font-size', isActive ? word.size : '150%')
      .attr('font-weight', isActive ? 'unbold' : 'bold')
    },
    // show tooltip....

    getWordTooltip: (word) =>
      ` (Count: ${word.value}) (Score: ${word.score})`,
  };
  const options = {
    deterministic: true,
    rotations: 1,
    rotationAngles: [0],
    fontSizes: [15, 40],
  };
  var words;

  const handleChange = (e) => {
    setChange(true)
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      currentList = words;
      newList = currentList.filter(item => {
        const lc = item.text.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = countArray;
      filtered.length = 0
    }
      setFiltered(newList)
  }

   if(filtered.length > 0){
    words = filtered
  }else{
    if(clicked){
      words = count
   }else{
      words = countArray
   }
  }

  return (
    <div className="topic_map">
       <form class="d-flex">
        <input class="form-control" type="search" onChange={handleChange} placeholder="Search Topics" aria-label="Search"/>
      </form>
      <div style={{ marginTop: "1rem" }}>
        <ReactWordcloud
          callbacks={callbacks}
          options={options}
          words={words}
        ></ReactWordcloud>
      </div>
    </div>
  );
};
export default Topic_WordCloud;
