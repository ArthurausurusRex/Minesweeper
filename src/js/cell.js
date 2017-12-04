import React from 'react'
import '../style/cell.css'

function Cell(props) {
    return(
        <button
            className={setClassName(props.value)}
            onClick={props.onClick}
            onContextMenu={props.onContextMenu}
        >
            {props.value['show'] ? showBomb(props.value['value']) : props.value['hasFlag'] ? showFlag() : ''}
        </button>
    )
}

function setClassName(value){
    if (value['show']){
        if (value['value']===null){
            return "cell"
        }
        else {
            if(value['clicked']) {
                return "cell losing"
            }
            else {return "cell"}
        }
    }
    else {
        return "cell hidden"
    }
}

function showBomb(value){
    if(value === 'X') {
        return (<i className="fa fa-bomb"></i>)
    }
    else{return value}
}

function showFlag(){
    return (<i className="fa fa-flag"></i> )
}
export default Cell