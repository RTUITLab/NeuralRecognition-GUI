import React from 'react';
import './App.css';
import Field from './components/Field/field';
import Header from './components/Header/header';
import Menu from './components/Menu/menu';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="Content">
        <Menu></Menu>
        <Field></Field>
      </div>
    </div>
  );
}

export default App;
