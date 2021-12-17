import React from "react";
import Graph from 'react-graph-vis'

class NetworkMap extends React.Component {

  state = {
    graph: null,
  }
  componentDidMount() {
    const nodeArray = [];
    const edgeArray = [];
    this.props.data.map((post) => {
      // create a object which required to display nodes on graph ......
      var temp = {}
      for (var i = 0; i < post.sender.length; i++) {
        if (post.sender[i] !== undefined) {
          temp.id = post.sender[i]
          temp.title = post.sender[i]
        }
      }
      post.senti_score.map((senti) => {
        var sentiScore = senti.score;
        //  set colors according to sentiment score.....
        if (sentiScore >= 0.8) {
          temp.color = "#288952"
        } else if (sentiScore >= 0.7 && sentiScore <= 0.79) {
          temp.color = "#3a9252"
        } else if (sentiScore >= 0.6 && sentiScore <= 0.69) {
          temp.color = "#4c9b52"
        } else if (sentiScore >= 0.5 && sentiScore <= 0.59) {
          temp.color = "#5ea522"
        } else if (sentiScore >= 0.4 && sentiScore <= 0.49) {
          temp.color = "#81b752"
        } else if (sentiScore >= 0.3 && sentiScore <= 0.39) {
          temp.color = "#93c151"
        } else if (sentiScore >= 0.2 && sentiScore <= 0.29) {
          temp.color = "#b7d351"
        } else if (sentiScore >= 0.1 && sentiScore <= 0.19) {
          temp.color = "#dae651"
        } else if (sentiScore === 0) {
          temp.color = "#fef851"
        } else if (sentiScore >= 0.09 && sentiScore <= -0.09) {
          temp.color = "#fef851"
        } else if (sentiScore <= -0.1 && sentiScore <= -0.19) {
          temp.color = "#fbd64d"
        } else if (sentiScore <= -0.2 && sentiScore <= -0.29) {
          temp.color = "#f9b449"
        } else if (sentiScore <= -0.3 && sentiScore <= -0.39) {
          temp.color = "#f79145"
        } else if (sentiScore <= -0.4 && sentiScore <= -0.49) {
          temp.color = "#f58043"
        } else if (sentiScore <= -0.5 && sentiScore <= -0.59) {
          temp.color = "#f35e3f"
        } else if (sentiScore <= -0.6 && sentiScore <= -0.69) {
          temp.color = "#f14d3d"
        } else if (sentiScore <= -0.7 && sentiScore <= -0.79) {
          temp.color = "#f03c3b"
        } else if (sentiScore <= -0 - 8) {
          temp.color = "#ef2b39"
        } else {
          temp.color = "#ef2b39"
        }
        temp.senti_score = sentiScore
      })
      nodeArray.push(temp)
      //  create object for display edges on graph.....
      var temp2 = {};
      for (var j = 0; j < post.toRecipients.length; j++) {
        
        if (post.toRecipients[j] !== undefined ) {
          temp2 = {
            from: post.sender[0],
            to: post.toRecipients[j],
            // scores: post.senti_score[0].score
          }
          post.senti_score.map((senti) => {
            var sentiScore = senti.score;
          if (temp2.score >= 0.8) {
            temp2.color = "#288952"
          } else if (sentiScore >= 0.7 && sentiScore <= 0.79) {
            temp2.color = "#3a9252"
          } else if (sentiScore >= 0.6 && sentiScore <= 0.69) {
            temp2.color = "#4c9b52"
          } else if (sentiScore >= 0.5 && sentiScore <= 0.59) {
            temp2.color = "#5ea522"
          } else if (sentiScore >= 0.4 && sentiScore <= 0.49) {
            temp2.color = "#81b752"
          } else if (sentiScore >= 0.3 && sentiScore <= 0.39) {
            temp2.color = "#93c151"
          } else if (sentiScore >= 0.2 && sentiScore <= 0.29) {
            temp2.color = "#b7d351"
          } else if (sentiScore >= 0.1 && sentiScore <= 0.19) {
            temp2.color = "#dae651"
          } else if (sentiScore === 0) {
            temp2.color = "#fef851"
          } else if (sentiScore >= 0.09 && sentiScore <= -0.09) {
            temp2.color = "#fef851"
          } else if (sentiScore <= -0.1 && sentiScore <= -0.19) {
            temp2.color = "#fbd64d"
          } else if (sentiScore <= -0.2 && sentiScore <= -0.29) {
            temp2.color = "#f9b449"
          } else if (sentiScore <= -0.3 && sentiScore <= -0.39) {
            temp2.color = "#f79145"
          } else if (sentiScore <= -0.4 && sentiScore <= -0.49) {
            temp2.color = "#f58043"
          } else if (sentiScore <= -0.5 && sentiScore <= -0.59) {
            temp2.color = "#f35e3f"
          } else if (sentiScore <= -0.6 && sentiScore <= -0.69) {
            temp2.color = "#f14d3d"
          } else if (sentiScore <= -0.7 && sentiScore <= -0.79) {
            temp2.color = "#f03c3b"
          } else if (sentiScore <= -0 - 8) {
            temp2.color = "#ef2b39"
          } else {
            temp2.color = "#ef2b39"
          }
          temp.senti_score = sentiScore
        })
          edgeArray.push(temp2)
        }
      }
    })
    // filter data for duplicate id in json.....
    let filterArray = nodeArray.filter((ele, ind) => ind === nodeArray.findIndex(elem => elem.id === ele.id))
    var graphs = {
      nodes: filterArray,
      edges: edgeArray
    };
    this.setState({
      graph: graphs
    })
  }
  render() {
    const options = {
      dragNetwork: false,
      layout: {
        randomSeed: 12
      },
      physics: {
        enabled: false,
      },
      tooltip: {
        fontColor: "white",
        fontSize: 10, // px
        color: {
          border: "#666",
          background: "green"
        }
      },
      interaction: {
        hover: true,
        hoverConnectedEdges: true,
        dragNodes: false,
      },
      nodes: {
        borderWidth: 2,
        borderWidthSelected: 3,
        chosen: true,
      },
      edges: {
        hoverWidth: 1.5,
        label: undefined,
        labelHighlightBold: true,
        smooth: {
          type: "curvedCCW"
       }
     },
    }
    return (
      <div className="network" >
        {this.state.graph &&
          <Graph style={{height:"400px", width:"100%"}}
            graph={this.state.graph}
            options={options}
          />
        }
      </div>
   );
  }
}
export default NetworkMap;