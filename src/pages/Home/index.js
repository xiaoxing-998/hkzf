import React, { Component } from 'react';
// 路由基础组件
import { Route } from 'react-router-dom';
// 引入Ant Design组件库组件
import { TabBar } from 'antd-mobile';

// 导入二级路由对应组件
import Index from '../Index';
import House from '../House';
import Profile from '../Profile';

// 引入局部样式
import './index.css'

class Home extends Component {

    // tab状态数据
    state = {
        selectedTab: 'redTab',//选中状态
    }

    render() {
        return (
            <div className='home'>
                {/* 配置二级路由 */}
                <Route exact path='/home' component={Index} />
                <Route path='/home/house' component={House} />
                <Route path='/home/profile' component={Profile} />
                {/* 全局导航 */}
                <div className="tabBox">
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                    >
                        <TabBar.Item
                            title="首页"
                            key="Life"
                            // 默认icon
                            icon={<i className="iconfont icon-ind" />}
                            // 选中icon
                            selectedIcon={<i className="iconfont icon-ind" />}
                            // 是否选中 返回布尔值
                            selected={this.state.selectedTab === 'blueTab'}
                            // bar 点击触发函数   设置点击状态
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'blueTab',
                                });
                            }}
                        >
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<i className="iconfont icon-findHouse" />}
                            selectedIcon={<i className="iconfont icon-findHouse" />}
                            title="找房"
                            key="Koubei"
                            selected={this.state.selectedTab === 'redTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'redTab',
                                });
                            }}
                        >
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<i className="iconfont icon-my" />}
                            selectedIcon={<i className="iconfont icon-my" />}
                            title="我的"
                            key="Friend"
                            selected={this.state.selectedTab === 'greenTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'greenTab',
                                });
                            }}
                        >
                        </TabBar.Item>
                    </TabBar>
                </div>


            </div>
        );
    }
}


export default Home;