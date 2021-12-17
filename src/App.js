import React from 'react';
import './App.css';
import Dashboard from './Component/Dashboard/Dashboard';
import {Switch, Route, Redirect } from 'react-router-dom';
import Login from './Component/Login/Login';
import Uploads from './Component/Uploads';

function App() {
  const token = JSON.parse(localStorage.getItem("users"))
  
  return (
    <div className="App">
     <Switch>
     <Route path="/uploads" component={Uploads}></Route>
       <Route exact path="/"  render={() =>token != null ? <Redirect to='/dashboard' /> : <Login />}></Route>
       <Route exact  render={() => token == null ? <Redirect to='/' /> : <Dashboard />}></Route>
       
     </Switch>
    </div>
  );
}
export default App;