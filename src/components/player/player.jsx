import React from "react";
import './player.scss';
import live from './live.js';
import 'dplayer/dist/DPlayer.min.css';
import DPlayer from 'dplayer';


export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ports: ["aHR0cDovL3ZpcC5haTY3NS5jb20vbGluZXM/dXJsPQ==", "aHR0cHM6Ly9qeC42MThnLmNvbS8/dXJsPQ==", "aHR0cDovL3l1bi4zNjBkeS53YW5nLz91cmw9", "aHR0cHM6Ly9hcGkubGhoLmxhL3ZpcC8/dXJsPQ=="],
            search:'aHR0cDovL3ZpcC5haTY3NS5jb20vbGluZXM/bmFtZT0=',
            url: '',
            origin: '',
            line: 0,
            searchName: '',
            ifFull: false,
            isLive: false,
            m3u8:'',
            on:-1
        }
        this.changeOrigin = this.changeOrigin.bind(this);
        this.changeName = this.changeName.bind(this);
        this.openPlay = this.openPlay.bind(this);
        this.openLive = this.openLive.bind(this);
        this.searchPlay = this.searchPlay.bind(this);
    }
    handleCheck(i) {
        this.setState({
            line: i
        },()=>{
           if (this.state.origin === '') return;
           this.setState({
                url: window.atob(this.state.ports[this.state.line]) + this.state.origin
            }) 
        })
        
        
    }
    openLive(i){
        this.setState({
            on:i
        })
       this.setState({
           isLive: true
       },()=>{
         const dp = new DPlayer({
             container:document.getElementById('dp-warp'),
             live : true,
             autoplay:true,
             video: {
                url: live[i].m3u8
             }
         })
       })
    }
    changeOrigin(event) {
        this.setState({
            origin: event.target.value
        })
    }
    changeName(event){
        this.setState({
            searchName: event.target.value
        })
    }
    openPlay() {
        this.setState({
            isLive: false
        })
        this.setState({
            on:-1
        })
        if (this.state.origin === '') return;
        localStorage.setItem('originUrl', this.state.origin);
        this.setState({
            url: window.atob(this.state.ports[this.state.line]) + this.state.origin
        })
    }
    searchPlay(){
        this.setState({
            isLive: false
        })
        this.setState({
            on:-1
        })
        let name= '';
        if (this.state.searchName === ''){
            return;
        }else{
            if(this.state.searchName.indexOf('@')>-1){
             name = this.state.searchName.split('@').join('&episode=');
            }else{
                name=this.state.searchName;
            }
            
        }
        this.setState({
            url: window.atob(this.state.search) + name
        })
    }
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    componentWillMount() {
        if (this.getQueryString('url')) {
            this.setState({
                isFull: true,
                origin: this.getQueryString('url')
            },()=>{
                this.openPlay()
            }) 
        }
        // if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        //     this.setState({
        //         ports: this.state.ports.reverse()
        //     })
        // }
    }
    componentDidMount() {
        if (localStorage.getItem('originUrl')) {
            this.setState({
                origin: localStorage.getItem('originUrl')
            })
        }
    }
    render() {
        return (
            <div className="player">
                <div className={this.state.isFull ? 'iframe-fixed' : 'iframe'}>
                    {this.state.isLive
                          ?<div id="dp-warp"></div>
                        :<iframe src={this.state.url} title="播放器" frameBorder="1"></iframe>
                    }
                    {/* {this.state.isLive
                        ?'':<aside className={this.state.isFull ? 'btn-fixed' : 'url-btn'}>
                            <p>线路</p>
                            {this.state.ports.map((item, index) => {
                                return <span className={this.state.line === index ? 'on' : ''} onClick={this.handleCheck.bind(this, index)} key={index}>{index + 1}</span>
                            })}
                        </aside>                        
                    } */}

                </div>
                <div className="control-warp">
                    <div className="hd-input">
                        <div className="hd-lable">搜索</div>
                        <div className="input-warp">
                            <input placeholder="输入电影名称或电视剧名@集数" value={this.state.searchName} onChange={this.changeName} type="text" />
                            <i className="icon-search" onClick={this.searchPlay}></i>
                        </div>
                    </div>
                    <div className="hd-input">
                        <div className="hd-lable">解析</div>
                        <div className="input-warp">
                            <input placeholder="粘贴原视频播放地址" value={this.state.origin} onChange={this.changeOrigin} type="text" />
                            <i className="icon-play" onClick={this.openPlay}></i>
                        </div>
                    </div>
                    <div className="hd-input">
                        <div className="hd-lable">直播</div>
                        <div className="input-warp">
                        {
                            live.map((item,index) => {
                                return <span  className={index===this.state.on?'on live-item':'live-item'} onClick={this.openLive.bind(this,index)} key={index}>{item.name}</span>
                            })
                        }
                        </div>
                    </div>                    
                </div>

            </div>
        )
    }
}