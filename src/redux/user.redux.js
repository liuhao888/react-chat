import axios from 'axios';
import {getRedirectPath} from "../util";

const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOGINSUCCESS_SUCCESS = "LOGINSUCCESS_SUCCESS";
const LOAD_DATA = "LOAD_DATA";
const AUTH_SUCCESS = 'AUTH_SUCCESS';

const initState ={
  redirectTo:'',
  user:'',
  type:'',
  msg:'',
  isAuth:false
};

export function user(state=initState,action) {
    switch (action.type){
        case AUTH_SUCCESS:
            return {...state , msg:'',redirectTo:getRedirectPath(action.payload) , ...action.data};
        case ERROR_MSG :
            return {...state , isAuth:false , msg:action.msg };
        case LOAD_DATA :
            return {...state , ...action.data};
        default:
            return state;
    }
}

function authSuccess(data){
    return {type:AUTH_SUCCESS,payload:data}
}

function errorMsg(msg) {
    return {msg,type:ERROR_MSG}
}

export function loadData(userInfo) {
    return {type:LOAD_DATA,data:userInfo};
}

export function login({user,pwd}) {
    if(!user || !pwd){
        return errorMsg("用户名必须输入")
    }

    return dispatch=>{
        axios.post("/user/login",{user,pwd})
            .then(res=>{
                if(res.status===200 && res.data.code===0){
                    dispatch( authSuccess(res.data.data) );
                }else {
                    dispatch( errorMsg(res.data.msg) );
                }
            })
    }
}

export function register({user,pwd,type,repeatpwd}) {

    if(!user || !pwd || !type){
        return errorMsg("用户名必须输入")
    }
    if(pwd!==repeatpwd){
        return errorMsg("两次输入密码不同")
    }

    return dispatch=>{
        axios.post("/user/register",{user,pwd,type})
            .then(res=>{
                if(res.status===200 && res.data.code===0){
                    dispatch( authSuccess({user,pwd,type}) );
                }else {
                    dispatch( errorMsg(res.data.msg) );
                }
            })
    }

}

export function update (data){
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                if(res.status===200 && res.data.code===0){
                    dispatch( authSuccess(res.data.data) );
                }else {
                    dispatch( errorMsg(res.data.msg) );
                }
            })
    }
}