import React from "react";
import Cell from './cell'

class Board extends React.Component {


    renderCell(i,j) {
        return(
            <Cell
                key={[i,j]}
                value = {this.props.cells[i][j]}
                onClick={()=> this.props.onClick(i,j)}
                onContextMenu = {()=> this.props.onContextMenu(i,j)}
            />
        );
    }

    //disable right click menu on board
    componentDidMount() {
        document.getElementById('game-board').addEventListener('contextmenu', this._handleContextMenu);
    };

    componentWillUnmount() {
        document.getElementById('game-board').removeEventListener('contextmenu', this._handleContextMenu);
    };

    _handleContextMenu = (event) => {
        event.preventDefault();
        event.onmouseover;
    };

    render() {
        const rows = [];
        for (let i = 0; i < this.props.height; i ++){
            rows.push([]);
            for (let j=0; j < this.props.width; j ++){
                rows[i].push([i,j])
            }
        }

        const divRows =rows.map((row,i) =>
            <div className="board-row" key={i}>
                {row.map((_, j) => this.renderCell(i,j))}
            </div>
        );
        return (
            <div className="board-table">
                {divRows}
            </div>
        );
    }
}

export default Board