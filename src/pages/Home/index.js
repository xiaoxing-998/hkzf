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
import './index.scss'

// 引入TabBar items 数据
import tabItems from '../../utils/tabBar_config'

class Home extends Component {

    // tab状态数据
    state = {
        selectedTab: this.props.location.pathname,//设置默认选中状态
    }

    // 渲染全局菜单方法
    renderContent = () => {
        return (
            tabItems.map((item) => {
                return (
                    <TabBar.Item
                        title={item.title}
                        key={item.key}
                        // 默认icon
                        icon={<i className={`iconfont ${item.icon}`} />}
                        // 选中icon
                        selectedIcon={<i className={`iconfont ${item.icon}`} />}
                        // 是否选中 返回布尔值
                        selected={this.state.selectedTab === item.path}
                        // bar 点击触发函数   设置点击状态
                        onPress={() => {
                            // 编程式导航
                            this.props.history.push(item.path)
                            this.setState({
                                selectedTab: item.path,
                            });
                        }}
                    >
                    </TabBar.Item>
                )
            })
        )
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
                        {this.renderContent()}
                    </TabBar>
                </div>

            </div>
        );
    }
}


export default Home;