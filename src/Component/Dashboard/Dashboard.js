import React from "react";
import "./Dashboard.css";
import Topic_WordCloud from "../Topic_wordCloud/Topic_wordCloud";
import WordCloud from "../WordCloud/WordCloud";
import NetworkMap from "../NetworkMap/NetworkMap";
import EntityGraph from "../EntityGraph/EntityGraph";
import NetworkMapSample from "../NetworkMap/NetworkMapSample";
// import datas from "../../db.json";
import axios from "axios";

class Dashboard extends React.Component {
  state = {
    date: [],
    email: [1],
    avarageScore: [1],
    data: [],
    dataChild: [],
    isData: false,
    lowestAverageSentiment: [0],
    topAverageSentiment: [0],
    averageResponseRate: [0],
    timeFilter: null,
    isLoggedIn: false,
    datas: []
  };

  componentDidMount(){
    axios.get("https://zentyment.herokuapp.com/customer").then(res => {
      this.setState({
        datas: res.data.docs  
      })
    })
    this.filterValue('365');
  }
  
  componentDidUpdate(prevProps, prevState) {

    if (prevState.datas !== this.state.datas) {
        this.filterValue('365')
    }}
  
   
  filterValue = (value) => {
  
    this.setState({
      timeFilter: value
    })
    if (this.state.isData === false) {
      this.setState({
        isData: true,
      });
    } else {
      this.setState({
        isData: false,
      });
    }
    let dataArray = [];
    let filterEmail = [];
    let filterScore = [];
    let entityArray = [];
    //for comparision with date and click date
    var ourDate = new Date();
    var pastDate = ourDate.getDate();
    //passing value for get date
    if (value === "1") {
      pastDate = ourDate.getDate() - 1;
    } else if (value === "3") {
      pastDate = ourDate.getDate() - 3;
    } else if (value === "7") {
      pastDate = ourDate.getDate() - 7;
    } else if (value === "14") {
      pastDate = ourDate.getDate() - 14;
    } else if (value === "30") {
      pastDate = ourDate.getDate() - 30;
    } else if (value === "90") {
      pastDate = ourDate.getDate() - 90;
    } else if (value === "180") {
      pastDate = ourDate.getDate() - 180;
    } else if (value === "365") {
      pastDate = ourDate.getDate() - 365;
    }
    ourDate.setDate(pastDate);
    const newDate = Date.parse(ourDate);
    //filter data from json using create date and time propery....
    const dateFiter = this.state.datas.filter(
      (d) => Date.parse(d.createdDateTime) >= newDate
    );
    dateFiter.map((id) => {
      dataArray.push(id);
      filterEmail.push(id.id);
      id.senti_score.map((senti) => {
        senti.entities.map((entity) => {
          console.log(entity)
          entityArray.push(entity);
        });
      });
      id.senti_score.map((score) => {
        filterScore.push(score.score);
      });
    });
    //if there is no data available display value...
    var emailCount = 0;
    var scoreCount = 0;
    if (filterEmail != null && filterEmail.length > 0) {
      emailCount = filterEmail.length;
    }
    if (filterScore != null && filterScore.length > 0) {
      // calculation for average sentiment score.....
      var sum = 0;
      for (var i in filterScore) {
        sum += filterScore[i];
      }
      scoreCount = sum / filterScore.length;
    }
    this.setState({
      email: emailCount,
      avarageScore: scoreCount,
      data: dataArray,
    });
  };
  //function for get child data from entity word map.....
  changeChilData = (child) => {
    this.setState({ dataChild: child });
  };
  logout = () => {
    localStorage.clear();
    this.setState({
      isLoggedIn: false
    })
    window.location.href = "/";
  };

  render() {
    console.log(this.state.data)
        const {
      email,
      avarageScore,
      lowestAverageSentiment,
      topAverageSentiment,
      averageResponseRate,
    } = this.state;
    const avarageScoreDc = Number.parseFloat(avarageScore).toFixed(4);
    return (     
      <> 
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col-auto col-md-1 col-xl-2 col-xs-1 col-xs-1 px-sm-2 px-0 sidebar">
            <h5 className="time_filter">Time Filter</h5>
            <select
              id="lang"
              onChange={(event) => this.filterValue(event.target.value)}
            >
              <option value="1">1 Day</option>
              <option value="3">3 Day</option>
              <option value="7">1 Week</option>
              <option value="14">2 Week</option>
              <option value="30">1 Month</option>
              <option value="90">1 Quarter</option>
              <option value="180">2 Quarter</option>
              <option selected value="365">
                1 Year
              </option>
            </select>
          </div>
          <div class="col py-3">
            <nav class="navbar navbar-expand-lg navbar-light">
              <div class="container-fluid">
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarTogglerDemo01"
                  aria-controls="navbarTogglerDemo01"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="#">
                  <h1>
                    <u>Dash</u>board
                  </h1>
                </a>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                  <form class="d-flex">
                    {/* <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"> */}
                    <div class="dropdown">
                      <a
                        href="#"
                        class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                        id="dropdownUser1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div class="test rounded-circle">ZA</div>
                      </a>
                      <ul class="dropdown-menu text-small shadow bubble">
                        <li>
                          <a
                            class="dropdown-item"
                            href="#"
                            onClick={this.logout}
                          >
                            My Zenty Profile
                          </a>
                          <a
                            class="dropdown-item"
                            href="uploads"
                          >
                            Upload Data File
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* </div> */}

                    <button
                      class="btn btn-outline-success"
                      type="button"
                      onClick={this.logout}
                    >
                      Logout
                    </button>
                  </form>
                </div>
              </div>
            </nav>
            <div class="container-fluid topic_container">
              <div
                class="col-md-12 text-center"
                style={{ padding: "0px 30px" }}
              >
                <div class="row topic_row">
                  <div class="col-sm-6 traffic">
                    <div className="row">
                      <div class="col-sm-3 avg">
                        <h6 style={{ marginBottom: "2rem" }}>Email Traffic</h6>
                        <h3>{email}</h3>
                      </div>
                      <div class="col-sm-3 avg">
                        <h6 style={{ marginBottom: "2rem" }}>
                          Average Sentiment
                        </h6>
                        <h3
                          style={
                            avarageScoreDc >= 0
                              ? { color: "green" }
                              : { color: "red" }
                          }
                        >
                          {avarageScoreDc}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6 topic_col">
                    <div className="topic">
                      <h3>
                        <u>Topic</u> Cloud
                      </h3>
                    </div>
                    <div className="topic_cloud">
                      <Topic_WordCloud
                        data={this.state.data}
                        clickData={this.state.dataChild}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid topic_container">
              <div class="col-md-12 word_col">
                <div className="word">
                  <h3>
                    <u>Word</u> Cloud
                  </h3>
                </div>
                <div className="topic_cloud">
                  <WordCloud
                    data={this.state.data}
                    childData={{
                      dataChild: this.state.dataChild,
                      changeChilData: this.changeChilData.bind(this),
                    }}
                  />
                </div>
              </div>
            </div>
            <div class="container-fluid topic_container">
              <div class="col-md-12">
                <div class="row topic_row">
                  <div class="col-sm-6 topic_col">
                    <div className="topic">
                      <h3>
                        <u>Network</u> Map
                      </h3>
                    </div>
                    <div className="topic_cloud">
                      {this.state.isData ? (
                        <NetworkMap data={this.state.data} />
                      ) : (
                        <NetworkMapSample data={this.state.data} />
                      )}
                    </div>
                  </div>
                  <div class="col-sm-6 topic_col">
                    <div className="topic">
                      <h3>
                        <u>Average Sentiment </u> over time
                      </h3>
                    </div>
                    <div className="topic_cloud">
                      <EntityGraph
                        data={this.state.data}
                        clickData={this.state.dataChild}
                        timeFilter= {this.state.timeFilter}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}
export default Dashboard;
