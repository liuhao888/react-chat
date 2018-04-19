import React from 'react';
import { NavBar , InputItem , TextareaItem ,Button} from 'antd-mobile';
import AvatarSelector from '../../component/avatarSelector/avatarSelector';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux';
@connect(
    state=>state.user,
    {update}
)
class GeniusInfo extends React.Component{

    constructor(pops){
        super(pops);

        this.state = {
            title:'',
            desc:''
        }
    }

    onChange(key,v){
        this.setState({
            [key]:v
        })
    }

    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return(
            <div>
                {redirect && path!==redirect? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar mode="dark">Genius info</NavBar>
                <AvatarSelector 
                    selectAvatar={imageName=>{
                        this.setState({
                            avatar:imageName
                        })
                    }}
                    />
                <InputItem onChange={v=>{this.onChange('title',v)}}>
                    求职岗位
                </InputItem>    
                
                <TextareaItem 
                    onChange={v=>{this.onChange('desc',v)}}
                    row={3}
                    autoHeight
                    title='个人简介'
                />
                <Button 
                    type='primary'
                    onClick={()=>{
                        this.props.update(this.state)
                    }}
                    >保存</Button>
            </div>
        )
    }
}

export default GeniusInfo;