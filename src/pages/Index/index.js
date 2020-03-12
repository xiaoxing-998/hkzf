// 默认首页
import React, { Component } from 'react';
import { Carousel, Flex } from 'antd-mobile';

import { BASE_URL } from '../../utils/axios';
import { getSwiper } from '../../utils/api/home'

import './index.css'

// 引入栏目导航数据
import navItems from '../../utils/nav_config'


class Index extends Component {
    state = {
        // 轮播图数据
        swiper: [],
        // 轮播图高度  占位
        imgHeight: 212,
        // 调接口 数据未返回时 自动播放失效
        autoPlay: false
    }
    //  创建时   组件挂载 完成DOM渲染后 用于发送网络请求以及Dom操作
    componentDidMount() {
        this.getSwiper();
    }

    // 获取轮播图数据
    getSwiper = async () => {
        const { data, status } = await getSwiper();
        if (status === 200) {
            // setState()是异步
            this.setState({
                swiper: data,
            }, () => {
                //第二个回调中  拿到数据后 设置自动播放
                this.setState({
                    autoPlay: true
                })
            })
        }
    }

    // 渲染轮播图
    renderSwiper = () => {
        return (
            this.state.swiper.map(val => (
                <a
                    key={val.id}
                    href="http://www.alipay.com"
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight, background: '#787373' }}
                >
                    <img
                        src={`${BASE_URL}${val.imgSrc}`}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                            // 根据resize与onload设置图片动态高度  图片适配 窗口自适应  onload 事件会在页面或图像加载完成后立即发生
                            // resize事件   window窗口尺寸变化时触发
                            // imgHeight默认轮播图高度176 用于图片加载完成之前占位  防止布局混乱
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                        }}
                    />
                </a>
            ))
        )
    }

    // 渲染栏目导航
    renderNavs = () => {
        return (
            navItems.map(item => {
                return <Flex.Item onClick={() => {
                    this.props.history.push(item.path)
                }} key={item.id}>
                    <img src={item.img} alt="" />
                    <p>{item.title}</p>
                </Flex.Item>
            })
        )
    }
    render() {
        return (
            <div>
                {/* 轮播图start */}
                <Carousel
                    autoplay={this.state.autoPlay}//自动播放
                    infinite//循环播放
                >
                    {/* 数据渲染 */}
                    {this.renderSwiper()}
                </Carousel>
                {/* 栏目导航start */}
                <Flex className='nav'>
                    {this.renderNavs()}
                </Flex>

            </div>
        );
    }
}

export default Index;