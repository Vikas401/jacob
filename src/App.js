import React from 'react';
import './App.css';
import Dashboard from './Component/Dashboard/Dashboard';
import data from './db.json';

function App() {
  return (
    <div className="App">
      <Dashboard datas={data}/>
    </div>
  );
}
export default App;
