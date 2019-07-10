import React from 'react';
import PublicHeader from "../components/header/header.jsx";
import Player from "../components/player/player.jsx";

export default class Home extends React.Component {
    render(){
        return (
            <div>
                <PublicHeader></PublicHeader>
                <Player></Player>
            </div>
        )
    }
}