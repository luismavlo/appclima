import React from "react";
import reactDom from "react-dom";
import App from './App';
import './index.css'

const divRoot = document.querySelector('#root');

reactDom.render(<App />, divRoot);