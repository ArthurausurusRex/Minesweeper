import React from 'react';
import '../style/game.css';
import Board from './board' ;
import GameInfos from './game-infos';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import AlertDialogue from './alert-dialog'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width : null,
            height : null,
            numOfBombs : null,
            cells : null,
            flagCount : null,
            stateOfGame : null,
            difficulty : 'intermediate',
            alert : false,
            win : false,
            score:0,
            highScores : {'beginner': Infinity, 'intermediate': Infinity, 'expert':Infinity },

        };
        this.handleCloseAlert=this.handleCloseAlert.bind(this);
        this.getScore=this.getScore.bind(this);
    }

    componentWillMount(){
        this.chooseDifficulty('intermediate')
    }

    getScore(score){
        score = score.getTime();
        const scores = this.state.highScores;
        let currentBestForDiff = scores[this.state.difficulty];
        if (currentBestForDiff > score && this.state.win){
            console.log(this.state.score)
            currentBestForDiff = score}
        scores[this.state.difficulty]=currentBestForDiff;
        this.setState({
            score : score,
            highScores : scores
        });
    }

    handleCloseAlert(){
        this.setState({alert: false})
        this.setState(setDifficulty(this.state.numOfBombs, this.state.width, this.state.height))
    }

    handleClickOnBomb(cells, i ,j){
        cells[i][j]['clicked'] = 'true';
        openCellsWithBombs(cells);
        this.setState({
            stateOfGame: 'ended',
            alert : true,
            win : false,
        });


    }

    handleClickOnNotBomb(cells, i,j){
        if (cells[i][j]['value'] === null) {
            cells = openCells(cells, i, j)
        }
        if(checkWin(cells)){
            this.setState({
                stateOfGame : 'ended',
                alert : true,
                win :true,
                });
            console.log(this.state.score)
            }
        else{
            this.setState({stateOfGame : 'running'})
        }
        return cells
    }

    chooseDifficulty(difficulty){
        this.setState({difficulty : difficulty});
        switch(difficulty) {
            case "beginner":
                this.setState(setDifficulty(10, 9, 9));
                break;
            case "intermediate" :
                this.setState(setDifficulty(40, 16, 16));
                break;
            case "expert" :
                this.setState(setDifficulty(99, 30, 16));
                break;
        }
    }

    handleClick(i,j) {
        let cells = this.state.cells.slice();
        if(this.state.stateOfGame === "ended"){
            return;
        }
        this.setState({
            stateOfGame : 'running',
        });
        if (cells[i][j]['hasFlag']) {
            return;
        }
        if(cells[i][j]['show']){
            if(cells[i][j]['value']){
                this.handleClickOnNumber(i,j)
            }
        }
        cells[i][j]['show'] = true;
        if (cells[i][j]['value'] === 'X') {
           this.handleClickOnBomb(cells, i, j)
        }
        else {
           cells = this.handleClickOnNotBomb(cells, i, j)
        }
        this.setState({
            cells : cells,
        })
    };

    handleClickOnNumber(i,j){
        const cells = this.state.cells.slice();
        const number = this.state.cells[i][j]['value'];
        let flagAround = 0;
        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                if (typeof(cells[i + k]) !== "undefined" && typeof(cells[i + k][j + l]) !== "undefined"){
                    if (cells[i + k][j + l]['hasFlag']) {
                        flagAround += 1;
                    }
                }
            }
        }
        if (flagAround === number){
            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    if (typeof(cells[i + k]) !== "undefined" && typeof(cells[i + k][j + l]) !== "undefined") {
                        if (k !== 0 || j !== 0) {
                            openNextCells(cells, i + k, j + l, false)
                        }
                    }
                }
            }
            if (checkLoss(cells)){
                this.setState({cells:cells, stateOfGame:'ended', alert:true})
            }
        }



    }

    handleRightClick(i,j){
        const cells = this.state.cells.slice();
        let flagCount = this.state.flagCount;
        if(flagCount <= 0 || this.state.stateOfGame === 'ended'){
            return;
        }
        if (cells[i][j]['show']===false){
            cells[i][j]['hasFlag']= !cells[i][j]['hasFlag'];
            flagCount += cells[i][j]['hasFlag'] ? -1 : 1
        }
        this.setState({
            cells : cells,
            flagCount : flagCount,
            stateOfGame : 'running'
        })

    }

    render() {
        return (
            <div className="game" style={{display:'flex'}}>
                <div>
                    <div style={{display:'flex', justifyContent:'center',
                        flexDirection:'column', boxShadow: '#999999 0px 0px 5px', padding:'5px'}}>
                        <h3 style={{margin:'3px', alignSelf:'center'}}>Difficulty</h3>
                        <RadioButtonGroup name="difficulty" defaultSelected="intermediate" onChange={(e, value) =>this.chooseDifficulty(value)} >
                            <RadioButton
                                value="beginner"
                                label="Beginner"
                                style={{width:'15%', display: 'flex', justifyContent:'center'}}
                            />
                            <RadioButton
                                value="intermediate"
                                label="Intermediate"
                                style={{width:'15%',display: 'flex', justifyContent:'center'}}
                            />
                            <RadioButton
                                value="expert"
                                label="Expert"
                                style={{width:'15%',display: 'flex', justifyContent:'center'}}
                            />
                        </RadioButtonGroup>
                    </div>
                    <div>
                        hint : try clicking on a <br/>number surrounded<br/> by enough flags
                    </div>
                </div>
                <div>
                    <AlertDialogue
                        alert = {this.state.alert}
                        onRequestClose ={this.handleCloseAlert}
                        win = {this.state.win}
                        score = {this.state.score}
                    />
                </div>
                <div className="game-board" id="game-board">
                    <div>
                        <GameInfos
                            getScore={this.getScore}
                            stateOfGame = {this.state.stateOfGame}
                            flagCount = {this.state.flagCount}
                            highScores = {this.state.highScores}
                            difficulty = {this.state.difficulty}
                        />
                    </div>
                    <Board
                        width = {this.state.width}
                        height = {this.state.height}
                        cells = {this.state.cells}
                        onClick = {(i,j) => this.handleClick(i,j)}
                        onContextMenu = {(i,j)=> this.handleRightClick(i,j)}
                    />
                </div>
            </div>
        );
    }
}

// ========================================
export default Game;


function checkWin(cells) {
    for (let i = 0; i < cells.length; i++){
        for (let j = 0; j < cells[i].length; j++){
            if (!cells[i][j]['show'] && cells[i][j]['value'] !== 'X')
                return false
        }
    }
    return true;
}

function checkLoss(cells) {
    for (let i = 0; i < cells.length; i++){
        for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j]['show'] && cells[i][j]['value'] === 'X') {
                cells[i][j]['clicked'] = true
                return true
            }
        }
    }
}

function placeBombs(numOfBombs, height, width){
    const numOfCells = height * width;
    const cells = [];
    for (let i = 0; i < height; i ++){
        cells.push([]);
        for (let j = 0; j< width; j++){
            cells[i].push({'value':null, 'show':false, 'hasFlag':false})
        }
    }
    const voidCells = [];
    for (let i = 0; i < numOfCells; i++){
        voidCells.push(i)
    }

    for (let i = 0 ; i < numOfBombs; i++){
        let indexOfPos = Math.floor(Math.random() * (voidCells.length - 1));
        let posOfBomb = voidCells.splice(indexOfPos, 1)[0];
        let xBomb = Math.floor(posOfBomb / width);
        let yBomb = posOfBomb % width;
        cells[xBomb][yBomb]['value'] = 'X';
        countAdjacentCells(xBomb, yBomb, cells)
    }
    return cells
}

function countAdjacentCells(i, j, cells){
    for (let k = -1; k <= 1; k++){
        for (let l = -1; l <= 1; l++){
            if (typeof(cells[i+k])!== "undefined" && typeof(cells[i+k][j+l]) !== "undefined"){
                if (cells[i+k][j+l]['value'] !== 'X'){
                    cells[i+k][j+l]['value'] += 1
                }
            }
        }
    }
}

function openCells(cells, i, j) {
    cells[i][j]['show']=true;
    for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
            if (typeof(cells[i + k]) !== "undefined" && typeof(cells[i + k][j + l]) !== "undefined") {
                if (k !== 0 || j !== 0) {
                    openNextCells(cells, i + k, j + l)
                }
            }
        }
    }
    return cells
}

function openCellsWithBombs(cells){
    for(let i = 0; i < cells.length; i ++){
        for(let j = 0; j <cells[i].length; j ++){
            if(cells[i][j]['value']==='X'){
                cells[i][j]['show']= true;
            }
        }
    }
    return cells

}

function openNextCells(cells, i, j, protection = true){
    if (cells[i][j]['show'] === true){}
    else if (cells[i][j]['value']==='X' && !cells[i][j]['hasFlag']){
        if (!protection){
            cells[i][j]['show']=true;
            cells[i][j]['clicked']=true;
        }
    }
    else if (cells[i][j]['hasFlag']){}
    else if (cells[i][j]['value'] === null){openCells(cells, i,j)}
    else{cells[i][j]['show'] = true}
}

function setDifficulty(numOfBombs, width, height){
    const cells = placeBombs(numOfBombs, height ,width);
    return ({
        stateOfGame : 'pristine',
        numOfBombs : numOfBombs,
        width: width,
        height: height,
        cells : cells,
        flagCount : numOfBombs,
        win : false,
    })
}



