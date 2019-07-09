import React from "react";
import './player.scss';

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ports: ['https://api.sigujx.com/?url=', 'https://jx.618g.com/?url=', 'http://yun.360dy.wang/?url=', 'https://www.aiyexue.com/vip/?url=', 'https://api.sigujx.com/?url='],
            url: '',
            line: 1
        }
    }
    handleCheck(i) {
        this.setState({
            line: 1+i
        })
        if (this.props.videoUrl=='')return;
        this.setState({
            url: this.state.ports[this.state.line] + this.props.videoUrl
        })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.videoUrl == '') return;
        this.setState({
            url: this.state.ports[this.state.line]+ nextProps.videoUrl
        })
    }
    //https://api.sigujx.com/?url=https://v.qq.com/x/cover/lqz8bdnjk05bfqg.html
    render() {
        return (
            <div className="player">
                <div className="iframe">
                    <iframe src={this.state.url} title="播放器" frameBorder="1"></iframe>
                    <div className="url-btn">
                        <p>线路</p>
                        {this.state.ports.map((item, index) => {
                            return <span className={this.state.line==(index+1)?'on':''} onClick={this.handleCheck.bind(this,index)} key={index}>{index + 1}</span>
                        })}
                    </div>
                </div>


            </div>
        )
    }
}