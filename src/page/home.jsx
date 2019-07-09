import React from 'react';
import PublicHeader from "../components/header/header.jsx";
import Player from "../components/player/player.jsx";

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            url:''
        }
        this.changeUrl=this.changeUrl.bind(this)
    }
    changeUrl(url){
        this.setState({
            url: url
        })
    }
    render(){
        return (
            <div>
                <PublicHeader callBack={this.changeUrl}></PublicHeader>
                <Player videoUrl={this.state.url}></Player>
            </div>
        )
    }
}