import React, {Component} from 'react';
import './styles/game.scss'

function GameCell(number) {
  return <div key={number} className={number===0 ? "cell empty " :"cell "}><span>{number}</span></div>;
}

//winning order
const winPos = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];


export default class Game extends Component {
  constructor(props) {
  super(props);
  this.state={
    cells: winPos,
  }

  }
  componentDidMount(){
    window.addEventListener('keydown', this.keyboardEvent, false);
  }
  componentDidUpdate(){
    this.checkWin();
  }

  keyboardEvent =(e)=> {
    switch(e.keyCode) {
        case 38: this.key('up');    break;
        case 40: this.key('down');  break;
        case 37: this.key('left');  break;
        case 39: this.key('right'); break;
    }
  }
  checkWin(){
    if (this.state.cells.every(function(v,i) { return v === winPos[i]}))
    {
      alert("You win!!!");

    }
  }
  getEmptyCell(){
    return this.state.cells.indexOf(0);
  }
  key( type ){
    this.setState((prevState)=>{
      const newArr=prevState.cells.slice();
      switch( type ) {
          case 'up':

            if(prevState.cells.indexOf(0)<12)
            {
                newArr[prevState.cells.indexOf(0)]=prevState.cells[prevState.cells.indexOf(0)+4];
                newArr[prevState.cells.indexOf(0)+4]=0;

            }
              break;
          case 'down':

            if(prevState.cells.indexOf(0)>3)
            {

                newArr[prevState.cells.indexOf(0)]=prevState.cells[prevState.cells.indexOf(0)-4];
                newArr[prevState.cells.indexOf(0)-4]=0;

            }
              break;

          case 'left':

            if(!(prevState.cells.indexOf(0)%4===3))
            {

                newArr[prevState.cells.indexOf(0)]=prevState.cells[prevState.cells.indexOf(0)+1];
                newArr[prevState.cells.indexOf(0)+1]=0;

            }
              break;

          case 'right':

            if(!(prevState.cells.indexOf(0)%4===0))
            {

                newArr[prevState.cells.indexOf(0)]=prevState.cells[prevState.cells.indexOf(0)-1];
                newArr[prevState.cells.indexOf(0)-1]=0;

            }
              break;
      }

      return {cells: newArr}

    })
  }
  shuffle=(e)=>{

    for(var i=0; i < 3000; i++) {
        switch( Math.floor(Math.random() * (4)) + 1 ) {
            case 1: this.key('up');    break;
            case 2: this.key('down');  break;
            case 3: this.key('left');  break;
            case 4: this.key('right'); break;
        }
    }
  }
  render () {
      const {cells}=this.state;
      const renderedCells=cells.map(number=>GameCell(number));
      return (<div className="game">
        <div className="gameField">
          {renderedCells}
        </div>
        <button onClick={this.shuffle}>Shuffle</button>
      </div>)
  }
}
