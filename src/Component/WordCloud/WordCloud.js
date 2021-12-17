import React,{useState} from 'react';
import ReactWordcloud from 'react-wordcloud';
import select from 'jquery';
import './WordCloud.css';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const WordCloud = ({ data, childData }) => {
  const [count, setCount] = useState([]);
  const [clicked, setclicked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [change, setChange] = useState(false)
  const entityArray = [];
  var countArray = [];
  var scoreArray = [];
  var sortArray = [];
 
  var temp = [];
  data.map((post) => {
    var createDate = post.createdDateTime
    post.senti_score.map((senti) => {
      var score = senti.score
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
        .attr('font-size', isActive ? '170%' : word.size)
        .attr('font-weight', isActive ? 'bold' : 'unbold')
    },
    onWordMouseOut: (word, event) => {
   
      const isActive = 'onWordMouseOut' !== 'onWordMouseOver'
      const element = event.target
      const text = select(element)
      text.attr('font-size', isActive ? word.size : '170%')
      .attr('font-weight', isActive ? 'unbold' : 'bold')
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
  const size = [1200, 400];
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
    <div className="word_cloudMap">
         <form class="d-flex">
        <input class="form-control" type="search" onChange={handleChange} placeholder="Search Entity" aria-label="Search"/>
      </form>
      <ReactWordcloud
        callbacks={callbacks}
        options={options}
        // size={size}
        words={words} />
    </div>
  )
  
}
export default WordCloud;