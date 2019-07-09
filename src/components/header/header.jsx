import React from 'react';
import './header.scss';

export default class PublicHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url: ''
        }
        this.changeUrl=this.changeUrl.bind(this);
        this.openPlay=this.openPlay.bind(this);
    }
    openPlay(){
        this.props.callBack(this.state.url)
    }
    changeUrl(event){
        this.setState({
            url: event.target.value
        })
    }
    render(){
        return (
            <header>
                <h1>智能在线视频解析系统</h1>
                <p>免费全网影视VIP视频vip会员免广告看电影！若播放异常，刷新，更换线路尝试哦！</p>
                <div className="hd-input">
                    <div className="input-warp">
                         <input placeholder="粘贴原视频播放地址" value={this.state.url} onChange={this.changeUrl} type="text"/>
                         <i className="icon-play" onClick={this.openPlay}></i>
                    </div>
                </div>
            </header>
        )
    }
}