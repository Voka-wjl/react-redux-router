import React, { Component } from 'react';
import './cart.scss';
import img from '../../asets/imges/pic.png';
import { connect } from 'react-redux';
import {initDataList,editLogo} from './action/cartAction'
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[{id:9,name:1,pic:'../../asets/imges/pic.png',state:false},{id:8,name:1,pic:'../../asets/imges/pic.png',state:false},
            {id:7,name:1,pic:'../../asets/imges/pic.png',state:false},{id:6,name:1,pic:'../../asets/imges/pic.png',state:false},
            {id:5,name:1,pic:'../../asets/imges/pic.png',state:false},{id:4,name:1,pic:'../../asets/imges/pic.png',state:false},
            {id:3,name:3,pic:'../../asets/imges/pic.png',state:false},{id:2,name:1,pic:'../../asets/imges/pic.png',state:false}]
        }
    }
    componentDidMount() {
        let {list} = this.state;
        let {initData } = this.props;
        initData(list);
    }
    selectedGoods(index){
        let {list}=this.state;
        list[index].state=!list[index].state;
        this.setState({
            list
        })
    }
    render() {
        // let {list}=this.state;
        let {info,editLogo}=this.props;
        // console.log("info",info)
        return (
            <div className="Cart">
                {
                    info.map((item,index)=>{
                        return(
                            <li onClick={(v) => { editLogo(item.id, index) }} className='pic' key={index}>
                            <img src={img} alt=""/>
                            <p>{item.id}</p>
                            </li>                              
                        )
                    }
                    )
                
                }
                <div className="clearfix"></div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state)
    return {
        info: state.info,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        initData: (goodslistInfo) => {
            dispatch(initDataList(goodslistInfo));
        },
        editLogo: (qrcodeval, qrcodeindex) => {
            dispatch(editLogo({qrcodeval, qrcodeindex }));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
