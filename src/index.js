import {createStore,applyMiddleware ,compose} from 'redux';
import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";
import thunk from 'redux-thunk'; //异步处理插件
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import Login from './container/login/login'
import Register from './container/registered/registered'
import './config';
import reducers from './reducer';
import AutoRouter from './component/autoRouter/autoRouter'
import BoosInfo from './container/boosInfo/boosInfo';
import GeniusInfo from './container/geniusInfo/geniusInfo';
import Dashboard from './container/dashboard/dashboard';
import './index.css';

// 新建store
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension() || (()=>{})
));

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AutoRouter></AutoRouter>
                <Switch>
                    <Route path='/boosInfo' component={BoosInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/geniusInfo' component={GeniusInfo}></Route>
                    <Route component={Dashboard }></Route>      
                </Switch>

            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById("root")
);