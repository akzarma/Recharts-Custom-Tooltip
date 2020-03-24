import React from 'react';
import logo from './logo.svg';
import './App.css';
import BubbleChart from './components/BubbleChart';


function App() {
  return (
    <BubbleChart metaData={metaData} tooltipData={tooltipData} />
  );
}

const metaData = [
  {
    "title": "Title 1",
    "y": 3,
    "x": 2,
    "radius": 100,
  },
  {
    "title": "Title 1",
    "y": 3,
    "x": 3,
    "radius": 100,
  },
  {
    "title": "Title 1",
    "y": 3,
    "x": 4,
    "radius": 100,
  },
  {
    "title": "Title 1",
    "y": 2,
    "x": 2,
    "radius": 100,
  },
  {
    "title": "Title 1",
    "y": 2,
    "x": 1,
    "radius": 100,
  },
  {
    "title": "Title 1",
    "y": 5,
    "x": 3,
    "radius": 100,
  },
]

const tooltipData = [
  {
    "title": "Title 1",
    "y": 3,
    "x": 2,
    "radius": 100,
  },
  {
    "title": "Title 1",
    "y": 3,
    "x": 3,
    "radius": 100,
  },
  {
    "title": "Title 1",
    "y": 3,
    "x": 4,
    "radius": 100,
  },
  {
    "title": "Title 1",
    "y": 2,
    "x": 2,
    "radius": 100,
  },
  {
    "title": "Title 1",
    "y": 2,
    "x": 1,
    "radius": 100,
  },
]

export default App;
