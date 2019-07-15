import React from 'react';
import './support.scss';

export default class Support extends React.Component{
    render(){
        const imgArr = [
            require('../../assets/logo01.jpg'),
            require('../../assets/logo02.jpg'),
            require('../../assets/logo03.jpg'),
            require('../../assets/logo04.jpg'),
            require('../../assets/logo05.jpg'),
            require('../../assets/logo06.jpg'),
            require('../../assets/logo07.jpg'),
            require('../../assets/logo08.jpg'),
            require('../../assets/logo09.jpg'),
            require('../../assets/logo10.jpg')
        ]
        return (<div className="support">
            {imgArr.map((item,i)=>{
                return <img src={item} key={i} alt="支持"></img>
            })}
        </div>)
    }
} 