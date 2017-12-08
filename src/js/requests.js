/*
import React, { Component } from 'react';
import Request from 'react-http-request';


export default class GetRequest extends Component {
    render() {
        const topScoresUrl = '/api/scores/top';
        return (
            <Request
                url={topScoresUrl + '/' + props.difficulty}
                method='get'
                accept='application/json'
                verbose={true}
            >
                {
                    ({error, result, loading}) => {
                        if (loading) {
                            return <div>loading...</div>;
                        } else {
                            return <div>{ JSON.stringify(result) }</div>;
                        }
                    }
                }
            </Request>
        );
    }
}

export default class PostRequest extends Component {
    render() {
        const scoresUrl = '/api/scores';
        return (
            <Request
                url={scoresUrl}
                method='post'
                accept='application/json'
                verbose={true}
                send = {props.body}
            >
                {
                    ({error, result, loading}) => {
                        if (loading) {
                            return <div>loading...</div>;
                        } else {
                            console.log(result)
                        }
                    }
                }
            </Request>
        );
    }
}*/
