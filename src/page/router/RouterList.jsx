import React, { Component } from 'react';
import { hashHistory } from "react-router";
import './index.scss'

class RouterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hashlist:[{id:1,hashstr:"Home",state:true,hashText:"首页"},{id:2,hashstr:"Cart",state:false,hashText:"购物车"},{id:3,hashstr:"User",state:false,hashText:"我的"}]
        }
    }
    History(index){
        let {hashlist} =this.state;
        hashlist.forEach((item,index)=>{hashlist[index].state=false});
        hashlist[index].state=true;
        this.setState({
            hashlist
        })
        hashHistory.push(hashlist[index].hashstr);
        console.log(this)
    }
    render() {
        let {hashlist} =this.state;
        return (   
            <div id="nav">
            {
                hashlist.map((item,index)=>{
                    let color=""
                    if(item.state===true)
                        color="#ccc"
                    return(
                        <li style={{background:color}} key={index} onClick={this.History.bind(this,index)}>{item.hashText}</li>
                    )
                })
            }

            <div className="clearfix"></div>
            </div>
        );
    }
}

export default RouterList;
