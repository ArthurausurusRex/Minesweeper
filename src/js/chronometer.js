import React from 'react';



class Chronometer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            startTime: null,
            diff: 0,
            disabled: false,
            timerId : null
        }
    }

    tick() {
        const diff = new Date(new Date() - this.state.startTime);
        this.setState({diff: diff})
    }

    componentWillReceiveProps(nextProps){
        if (nextProps['stateOfGame'] === 'running' && this.props['stateOfGame'] !== 'running'){
            this.setState({
                startTime : new Date(),
                diff:0,
                timerId : setInterval(() => this.tick(), 1000)})
        }
        if (nextProps['stateOfGame']==='pristine'){
            if(this.state.timerId){
                clearInterval(this.state.timerId)
            }
            this.setState({diff : 0})
        }
        else if (nextProps['stateOfGame'] === 'ended' && this.props['stateOfGame'] === 'running'){
            if (this.state.diff){
                this.props.getScore(this.state.diff);
            }
            clearInterval(this.state.timerId);
        }

        else if (nextProps['stateOfGame'] === 'pristine' && this.props['stateOfGame'] === 'ended')
            this.setState({diff: 0})
    }


    render(){
        const diff = this.state.diff;

        const sec = diff ? Math.round(diff.getTime()/1000) : 0;

        return (
            <div className="chrono">
                {threeDigits(sec)}
            </div>
        )
    }
}

export default Chronometer

function threeDigits(n){
    if (n < 10){
        return '00' + n
    }
    else if (n < 100) {
        return '0' + n
    }
    else{
        return n + ''
    }

}