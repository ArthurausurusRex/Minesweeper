import React from 'react';
import Chronometer from './chronometer'


class GameInfos extends React.Component{

    render(){
        return (
            <div className="game-infos">
                <Chronometer
                    getScore={this.props.getScore}
                    stateOfGame={this.props.stateOfGame}
                />
                <div className="Best">
                    {this.props.highScores[this.props.difficulty]!==Infinity ? 'Your best: ' + Math.round(this.props.highScores[this.props.difficulty]/1000)+ 's' : ''}
                </div>

                <div className="flags">
                    <i className="fa fa-flag"></i>
                    {this.props.flagCount}
                </div>
            </div>
        )
    }

}


export default GameInfos