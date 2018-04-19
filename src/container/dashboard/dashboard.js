import React from "react";
import { connect } from "react-redux";
import { NavBar } from "antd-mobile";

function Boss() {
  return <h2>boss</h2>;
}

function Genius() {
  return <h2>genius</h2>;
}

function Msg() {
  return <h2>Msg</h2>;
}

function User() {
  return <h2>User</h2>;
}

@connect(state => state)
class Dashboard extends React.Component {
  render() {
    const { pathname } = this.props.location;
    const user = this.props.user;
    const navList = [
      {
        path: "/boos",
        text: "牛人",
        icon: "boss",
        title: "牛人列表",
        component: Boss,
        hide: user.type === "genius"
      },
      {
        path: "/genius",
        text: "boss",
        icon: "job",
        title: "BOOS类别",
        component: Genius,
        hide: user.type === "boos"
      },
      {
        path: "/msg",
        text: "消息",
        icon: "boss",
        title: "消息列表",
        component: Msg
      },
      {
        path: "/me",
        text: "我",
        icon: "boss",
        title: "个人中心",
        component: User
      }
    ];
    
    return (
      <div>
        <NavBar mode="dard">
          {navList.find(v => (v.path === pathname)).title}
        </NavBar>

        <h2>footer</h2>
      </div>
    );
  }
}

export default Dashboard;
