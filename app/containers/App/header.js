import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { Menu, Dropdown, Button, Modal } from 'antd'

const confirm = Modal.confirm

@connect(
  (state, props) => ({ config: state.config })
)
export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      staff: {
        onlineCount: '',
        monthCount: '',
        usertable: {
          gxdwqc: '',
          longmobile: '',
          post: '',
          shortmobile: '',
          username: '',
          userid: '',
        },
      },
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    confirm({
      title: '提示',
      content: '确认退出登录吗？',
      onOk() {
        // TODO do something after logout here.
        hashHistory.push('/login')
      },
    })
  }
  render() {
    const staff = this.state.staff
    const menu = (
      <Menu className="nav-dropmenu">
        <Menu.Item key="0">
          <span className="label">所属单位</span><span>{staff.usertable.gxdwqc}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <span className="label">用户姓名</span><span>{staff.usertable.username}</span>
        </Menu.Item>
        <Menu.Item key="5">
          <Button type="primary" size="small" onClick={this.handleLogout}>退出登录</Button>
        </Menu.Item>
      </Menu>
    )
    const username = sessionStorage.getItem('username')
    return (
      <header id="navbar">
        <div id="navbar-container" className="boxed">
          <div className="navbar-header">
            <Link to={'/'} className="navbar-brand">
              <div className="brand-title">
                <span className="brand-text">后 台</span>
              </div>
            </Link>
          </div>

          <div className="navbar-content clearfix">
            <ul className="nav navbar-top-links pull-right">
              <li className="login-info">
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link">{username || '肚皮叔'}</a>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}
