import React from 'react';
import './Dashboard.css';
import Analytics from '../../assets/images/analytics.svg';
import graph from '../../assets/images/graph.svg';
import Topic_WordCloud from '../Topic_wordCloud/Topic_wordCloud';
 import WordCloud from '../WordCloud/WordCloud';
import NetworkMap from '../NetworkMap/NetworkMap';
import EntityGraph from '../EntityGraph/EntityGraph';
import NetworkMapSample from '../NetworkMap/NetworkMapSample';

class Dashboard extends React.Component{
    state = {
        date: [],
        email: [1],
        avarageScore: [1],
        bcc: [1],
        data: [],
        dataChild: [],
        isData: false,
    }
    componentDidMount(){
        this.filterValue('365');
    }
    filterValue = (value) => {
        //iterigated for pass data on click on filter
        if (this.state.isData === false) {
          this.setState({
            isData: true
          })
        }
        else {
          this.setState({
            isData: false
          })
        }
        let dataArray = [];
        let filterEmail = [];
        let filterScore = [];
        let filterBcc = [];
        let entityArray = [];
        //for comparision with date and click date
        var ourDate = new Date();
        var pastDate = ourDate.getDate()
        //passing value for get date 
        if (value === '1') {
          pastDate = ourDate.getDate() - 1;
        } else if (value === '3') {
          pastDate = ourDate.getDate() - 3;
        } else if (value === '7') {
          pastDate = ourDate.getDate() - 7;
        } else if (value === '14') {
          pastDate = ourDate.getDate() - 14;
        } else if (value === '30') {
          pastDate = ourDate.getDate() - 30;
        } else if (value === '90') {
          pastDate = ourDate.getDate() - 90;
        } else if (value === '180') {
          pastDate = ourDate.getDate() - 180;
        } else if (value === '365') {
          pastDate = ourDate.getDate() - 365;
        }
        ourDate.setDate(pastDate);
        const newDate = Date.parse(ourDate);
        //filter data from json using create date and time propery....
        const dateFiter = this.props.datas.filter(d => Date.parse(d.createdDateTime) >= newDate)
        dateFiter.map((id) => {
          dataArray.push(id)
          filterEmail.push(id.id)
          id.senti_score.map((senti) => {
            senti.entities.map((entity) => {
              entityArray.push(entity)
            })
          })
          id.senti_score.map((score) => {
            filterScore.push(score.score)
            id.bccRecipients.map((bcc) => {
              filterBcc.push(bcc)
            })
          })
        })
        //if there is no data available display value...
        var emailCount = 0;
        var scoreCount = 0;
        var bccCount = 0;
        if (filterEmail != null && filterEmail.length > 0) {
           emailCount = filterEmail.length
        }
        if (filterScore != null && filterScore.length > 0) {
          // calculation for average sentiment score.....
          var sum = 0;
          for (var i in filterScore) {
            sum += filterScore[i]
          }
          scoreCount = sum / filterScore.length
        }
        if (bccCount != null && bccCount.length > 0) {
          bccCount = filterBcc.length
        }
        this.setState({
          email: emailCount,
          avarageScore: scoreCount,
          bcc: bccCount,
          data: dataArray
        })
      }
 //function for get child data from entity word map.....
  changeChilData = (child) => {
    this.setState({ dataChild: child })
  }

    render(){
      console.log(this.state.data);
        const { email, avarageScore, bcc } = this.state;
        const avarageScoreDc = Number.parseFloat(avarageScore).toFixed(4);
        return(
            <div id="dashboard">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 col-sm-3 col-xs-12 sidebar">
                        </div>
                        <div className="col-md-10 col-sm-9 col-xs-12 contain">
                           <div className="heading">
                               <h1><u>Dash</u>board</h1>
                           </div>
                        <div className="second_row">
                          <div className="row">
                            <div className="col-md-6 col-sm-12 col-xs-12">
                              <h3 className="head"><u>Time</u> filter</h3>
                                <div className="time_filter">
                                  <div className="list">
                                    <ul class="nav">
                                      <li class="nav-item">
                                         <a class="nav-link active" href="#" onClick={() => this.filterValue('1')}>1 Day</a>
                                      </li>
                                      <li class="nav-item">
                                         <a class="nav-link sec" href="#" onClick={() => this.filterValue('3')}>3 Day</a>
                                      </li>
                                      <li class="nav-item">
                                         <a class="nav-link third" href="#"onClick={() => this.filterValue('7')}>1 Week</a>
                                      </li>
                                      <li class="nav-item">
                                         <a class="nav-link forth" href="#" onClick={() => this.filterValue('14')}>2 Week</a>
                                      </li>
                                      <li class="nav-item">
                                         <a class="nav-link" href="#" onClick={() => this.filterValue('30')}>1 Month</a>
                                      </li>
                                      <li class="nav-item">
                                         <a class="nav-link" href="#" onClick={() => this.filterValue('90')}>1 Quarter</a>
                                      </li>
                                      <li class="nav-item">
                                         <a class="nav-link" href="#" onClick={() => this.filterValue('180')}>2 Quarter</a>
                                      </li>
                                      <li class="nav-item">
                                        <a class="nav-link" href="#" onClick={() => this.filterValue('365')}>1 Year</a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="contain2">
                                  <div className="row">
                                    <div className="col-md-1 col-sm-2 col-xs-6 flag1">
                                      <div>
                                        <img src={Analytics} alt="" />
                                      </div>
                                    </div>
                                    <div className="col-md-4 col-sm-2 col-xs-6 flag2">
                                      <h6>Email Traffic</h6>
                                        <h3>{email}</h3>
                                    </div>
                                    <div className="col-md-1 col-sm-2 col-xs-6 flag1">
                                      <div>
                                        <img src={graph} alt="" />
                                      </div>
                                    </div>
                                    <div className="col-md-4 col-sm-2 col-xs-6 flag2">
                                      <h6>Average Sentiment</h6>
                                      <h3 style={avarageScoreDc >= 0 ? { color: 'green' } : { color: 'red' }}>{avarageScoreDc}</h3>
                                    </div>
                                    {/* <div className="col-md-1 col-sm-2 col-xs-6 flag1">
                                      <div>
                                        <img src={Analytics} alt="" />
                                      </div>
                                    </div>
                                    <div className="col-md-2 col-sm-2 col-xs-6 flag2">
                                      <h6>BCC's</h6>
                                      <h3>{bcc}</h3>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                              <h3 className="head"><u>Topic</u> Cloud</h3>
                              <div className="topic_cloud">
                                <Topic_WordCloud data={this.state.data} clickData={this.state.dataChild}/>
                              </div>
                            </div>
                          </div> 
                        </div>
                      <div className="col-md-12 col-sm-12 col-xs-12 word_cloud">
                        <div className="entity">
                        <h3 className="head"><u>Entity</u> Map</h3>
                        </div>
                        <div className="topic_cloud">
                          <WordCloud data={this.state.data} childData={{
                            dataChild: this.state.dataChild,
                            changeChilData: this.changeChilData.bind(this)
                          }} />                                 
                        </div>
                      </div>
                     <div className="row graphs">
                        <div className="col-md-6 col-sm-12 col-xs-12 ">
                        <h3 className="head"><u>Network</u> Map</h3>
                        <div className="topic_cloud">
                           {this.state.isData ? <NetworkMap data={this.state.data} /> : <NetworkMapSample data={this.state.data}/>}
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12 col-xs-12">
                        <h3 className="head"><u>Average Sentiment </u> over time</h3>
                        <div className="topic_cloud">
                          <EntityGraph data={this.state.data} clickData={this.state.dataChild} />
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
             </div>
           </div>
        )
    }
}
export default Dashboard;