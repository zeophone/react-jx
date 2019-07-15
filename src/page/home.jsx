import React from 'react';
import Player from "../components/player/player.jsx";
import Support from "../components/support/support.jsx";

export default class Home extends React.Component {
    render(){
        return (
            <div>
                <Player></Player>
                <Support></Support>
            </div>
        )
    }
}