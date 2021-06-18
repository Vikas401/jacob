import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import select from 'jquery';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const WordCloud = ({ data, childData }) => {
 
  const entityArray = [];
  var countArray = [];
  const scoreArray = [];
  var sortArray = [];
  var temp = [];
  data.map((post) => {
    var createDate = post.createdDateTime
    post.senti_score.map((senti) => {
      var score = senti.score
      // senti.topic.map((topics) => {
       senti.entities.map((entity) => {
        var json = {
          text: entity,
          score: score,
          date: createDate,
        }
        entityArray.push(json)
      })
    })
  })
  for (var i = 0; i < entityArray.length; i++) {
    if (temp.indexOf(entityArray[i].text) === -1) {
      temp.push(entityArray[i].text);
      var _data = {};
      _data.text = entityArray[i].text;
      _data.score = entityArray[i].score;;
      _data.value = 1;
      countArray.push(_data);
    } else {
      for (var j = 0; j < countArray.length; j++) {
        if (countArray[j].text === entityArray[i].text) {
          var _x = parseInt(countArray[j].value) + 1;
          countArray[j].value = _x;
        }
      }
    }

  }
const handleClick = () => {
  countArray.map(value => {
    var countObject ={
      count:value.value,
      text:value.text
    };
    scoreArray.push(countObject)
 })
 scoreArray.sort(function (a, b) {
  return b.count - a.count;
});

 scoreArray.slice(0,10).map(value => {
   sortArray.push(value)
 })
 countArray = sortArray
}

  const callbacks = {
    getWordColor: word =>
      word.score >= 0.8 ? "#288952" : word.score >= 0.7 && word.score <= 0.79 ? "#3a9252" : word.score >= 0.6 && word.score <= 0.69 ? "#4c9b52" :
        word.score >= 0.5 && word.score <= 0.59 ? "#5ea522" : word.score >= 0.4 && word.score <= 0.49 ? "#81b752" : word.score >= 0.3 && word.score <= 0.39 ? "#93c151" :
          word.score >= 0.2 && word.score <= 0.29 ? "#b7d351" : word.score >= 0.1 && word.score <= 0.19 ? "#dae651" : word.score <= 0.09 && word.score >= -0.09 ? "#fef851" :
            word.score <= -0.1 && word.score >= -0.19 ? "#fbd64d" : word.score <= -0.2 && word.score >= -0.29 ? "#f9b449" : word.score <= -0.3 && word.score >= -0.39 ? "#f79145" :
              word.score <= -0.4 && word.score >= -0.49 ? "#f58043" : word.score <= -0.5 && word.score >= -0.59 ? "#f35e3f" : word.score <= { from: -0.6, to: -0.69 } ? "#f14d3d" :
                word.score <= -0.7 && word.score >= -0.79 ? "#f03c3b" : word.score <= -8 ? "#ef2b39" : "red"
 ,
    onWordClick: (word) => {
      const selectedWord = entityArray.filter(d => d.text === word.text)
      childData.changeChilData(selectedWord)
    },
    onWordMouseOver: (word, event) => {
      const isActive = 'onWordMouseOver' !== 'onWordMouseOut'
      const element = event.target
      const text = select(element)
      text
        .attr('font-size', isActive ? '200%' : '100%')
        .attr('font-weight', isActive ? 'bold' : 'unbold')
    },
    onWordMouseOut: (word, event) => {
      const isActive = 'onWordMouseOut' !== 'onWordMouseOver'
      const element = event.target
      const text = select(element)
      text.attr('font-size', isActive ? '100%' : '200%')
    },
    getWordTooltip: word => `(Count: ${word.value}) (Score: ${word.score})`
  }
  const options = {
    deterministic: true,
    randomSeed: 'seed0',
    rotations: 1,
    rotationAngles: [0],
    fontSizes: [10,40],
  };
  var words = countArray
  console.log(words)
  return (
    <div>
       <button type="button" className="btn btn-primary" onClick={handleClick}>Top 10 Entities</button>
      <ReactWordcloud
        callbacks={callbacks}
        options={options}
        words={words} />
    </div>
  )
}
export default WordCloud;