import React from 'react';
import './App.css';
import Field from './components/Field/field';
import Header from './components/Header/header';
import Menu from './components/Menu/menu';

class App extends React.Component<{}, AppState> {
  componentWillMount() {
    this.setState({
      moveVel: 1,
      returnVel: 5
    });

    window.onresize = () => {
      window.location.reload();
    }
  }

  checkKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <div className="Content">
          <Menu></Menu>
          <Field moveVelocity={this.state.moveVel} returnVelocity={this.state.returnVel}></Field>
          <div className="Settings">
            <label>Скорость движения: </label>
            <input value={this.state.moveVel} onKeyDown={this.checkKey} onKeyPress={this.checkKey} onChange={(e) => this.setState({ moveVel: parseInt(e.target.value) })} type="number" min="1" max="100" />
            <label>Скорость возврата: </label>
            <input value={this.state.returnVel} onKeyDown={this.checkKey} onKeyPress={this.checkKey} onChange={(e) => this.setState({ returnVel: parseInt(e.target.value) })} type="number" min="1" max="100" />
          </div>
        </div>
      </div>
    );
  }
}

type AppState = {
  moveVel: number,
  returnVel: number
}

export default App;
