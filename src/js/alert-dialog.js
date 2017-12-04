import React from 'react';
import Dialog from 'material-ui/Dialog';
import '../style/alert-dialogue.css'


function AlertDialogue(props){

        return(
            <div>
                <Dialog
                    paperClassName={props.win ? "win" : "lose"}
                    title={props.win ? "YOU WIN !" : "YOU LOSE !"}
                    modal={false}
                    open={props.alert}
                    onRequestClose={props.onRequestClose}
                >
                {props.win ? "Your score : " + Math.round(props.score/1000) : "Maybe try an easier setting !"}
                </Dialog>
            </div>
        );
}
export default AlertDialogue
