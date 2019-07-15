import React from "react";
import './player.scss';

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ports: ["aHR0cHM6Ly9hcGkuc2lndWp4LmNvbS8/dXJsPQ==", "aHR0cHM6Ly9qeC42MThnLmNvbS8/dXJsPQ==", "aHR0cDovL3l1bi4zNjBkeS53YW5nLz91cmw9", "aHR0cHM6Ly93d3cuYWl5ZXh1ZS5jb20vcG9ydC8/dXJsPQ=="],
            url: '',
            origin: '',
            line: 0,
            ifFull: false
        }
        this.changeOrigin = this.changeOrigin.bind(this);
        this.openPlay = this.openPlay.bind(this);
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
    changeOrigin(event) {
        this.setState({
            origin: event.target.value
        })
    }
    openPlay() {
        if (this.state.origin === '') return;
        localStorage.setItem('originUrl', this.state.origin);
        this.setState({
            url: window.atob(this.state.ports[this.state.line]) + this.state.origin
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
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            this.setState({
                ports: this.state.ports.reverse()
            })
        }
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
                    <iframe src={this.state.url} title="播放器" frameBorder="1"></iframe>
                    <aside className={this.state.isFull ? 'btn-fixed' : 'url-btn'}>
                        <p>线路</p>
                        {this.state.ports.map((item, index) => {
                            return <span className={this.state.line === index ? 'on' : ''} onClick={this.handleCheck.bind(this, index)} key={index}>{index + 1}</span>
                        })}
                    </aside>
                </div>
                <div className="hd-input">
                    <div className="input-warp">
                        <input placeholder="粘贴原视频播放地址" value={this.state.origin} onChange={this.changeOrigin} type="text" />
                        <i className="icon-play" onClick={this.openPlay}></i>
                    </div>
                </div>
            </div>
        )
    }
}