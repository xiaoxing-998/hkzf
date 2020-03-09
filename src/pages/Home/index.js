import React, { Component } from 'react';
// 路由基础组件
import { Route, Link } from 'react-router-dom';

// 导入二级路由对应组件
import Index from '../Index';
import House from '../House';
import Profile from '../Profile';

class Home extends Component {
    render() {
        return (
            <div className='home'>
                {/* 配置二级路由 */}
                <div>
                    <Link to='/home'>默认首页</Link>
                    <Link to='/home/house'>找房</Link>
                    <Link to='/home/profile' >我的</Link>
                </div>
                <Route exact path='/home' component={Index} />
                <Route path='/home/house' component={House} />
                <Route path='/home/profile' component={Profile} />

            </div>
        );
    }
}

export default Home;