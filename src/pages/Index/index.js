// 默认首页
import React, { Component } from 'react';
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';

import { BASE_URL } from '../../utils/axios';
import { getSwiper, getGroups, getNews } from '../../utils/api/home'

import './index.scss'

// 引入栏目导航数据
import navItems from '../../utils/nav_config'


class Index extends Component {
    state = {
        // 轮播图数据
        swiper: [],
        // 轮播图高度  占位
        imgHeight: 212,
        // 调接口 数据未返回时 自动播放失效
        autoPlay: false,
        // 租房小组宫格数据
        grid: [],
        // 资讯数据
        news: []

    }
    //  创建时   组件挂载 完成DOM渲染后 用于发送网络请求以及Dom操作
    componentDidMount() {
        this.getAllResult()
        // this.getSwiper();
        // this.getGroups();
        // this.getNews();
    }

    // Promise.all()接受一个由promise任务组成的数组  （可循环对象），可以同时处理多个promise任务，
    // 当所有的任务都执行完成时，Promise.all()返回resolve (返回一个 Promise 实例)，但当有一个失败(reject)，则返回失败的信息
    // 统一处理所有接口调用的方法
    getAllResult = async () => {
        const res = await Promise.all([getSwiper(), getGroups(), getNews({ area: 'AREA|88cff55c-aaa4-e2e0' })])
        res[0].status === 200 && this.setState({
            swiper: res[0].data,
            grid: res[1].data,
            news: res[2].data
        }, () => {
            this.setState({
                autoPlay: true
            })
        })
    }

    // // 获取轮播图数据
    // getSwiper = async () => {
    //     const { data, status } = await getSwiper();
    //     if (status === 200) {
    //         // setState()是异步
    //         this.setState({
    //             swiper: data,
    //         }, () => {
    //             //第二个回调中  拿到数据后 设置自动播放
    //             this.setState({
    //                 autoPlay: true
    //             })
    //         })
    //     }
    // }

    // 获取租房小组数据
    // getGroups = async () => {
    //     const { status, data } = await getGroups();
    //     if (status === 200) {
    //         this.setState({
    //             grid: data
    //         })
    //     }
    // }

    // // 获取最新资讯数据
    // getNews = async () => {
    //     const { status, data } = await getNews({ area: 'AREA|88cff55c-aaa4-e2e0' });
    //     status === 200 && this.setState
    //         // if简写
    //         ({
    //             news: data
    //         })
    // }

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
    // 渲染租房小组
    renderGroups = () => {
        return (
            <div>
                {/* 标题 */}
                <Flex className='group-title' justify='between'>
                    <h3>租房小组</h3>
                    <span>更多</span>
                </Flex>
                {/* 宫格布局*/}
                {/* 宫格数据源 */}
                <Grid data={this.state.grid}
                    // 宫格列数
                    columnNum={2}
                    // 取消边框
                    hasLine={false}
                    // 取消固定正方形
                    square={false}
                    // 宫格内容
                    renderItem={item => (
                        <Flex className='grid-item' justify='between'>
                            <div className="desc">
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                            <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
                        </Flex>
                    )}
                />
            </div>
        )
    }
    // 渲染最新资讯
    renderNews = () => {
        return (
            this.state.news.map(item => (
                <div className='news-item' key={item.id}>
                    <div className="imgwrap">
                        <img className='img'
                            src={`${BASE_URL}${item.imgSrc}`} alt="" />
                    </div>
                    <Flex className='content' direction='column' justify='between'>
                        <h3 className="title">{item.title}</h3>
                        <Flex className='info' justify='between'>
                            <span>{item.from}</span>
                            <span>{item.date}</span>
                        </Flex>
                    </Flex>
                </div>
            ))
        )
    }
    render() {
        return (
            <div>
                {/* 轮播图start */}
                < Carousel
                    autoplay={this.state.autoPlay}//自动播放
                    infinite//循环播放
                >
                    {/* 数据渲染 */}
                    {this.renderSwiper()}
                </Carousel >
                {/* 栏目导航start */}
                < Flex className='nav' >
                    {this.renderNavs()}
                </Flex >
                {/* 租房小组start */}
                < div className="group" >
                    {this.renderGroups()}
                </div >
                {/* 最新资讯start */}
                < div className="news" >
                    <h3 className="group-title">最新资讯</h3>
                    <WingBlank size='md'>
                        {this.renderNews()}
                    </WingBlank>

                </div >
            </div >
        );
    }
}

export default Index;