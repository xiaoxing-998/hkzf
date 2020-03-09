import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';

import axios,{BASE_URL} from '../../utils/axios'

class Index extends Component {
    state = {
        // 轮播图数据
        swiper: [],
        // 轮播图高度
        imgHeight: 176,
    }
    //  创建时   组件挂载 完成DOM渲染后 用于发送网络请求以及Dom操作
    componentDidMount() {
        this.getSwiper();
    }
    // 获取轮播图数据

    getSwiper = async () => {
        const res = await axios.get('/home/swiper');
        const { body, status } = res.data;
        if (status === 200) {
            this.setState({
                swiper: body
            })
        }
    }
    render() {
        return (
            <div>
                <Carousel
                    autoplay//自动播放
                    infinite//循环播放
                >
                    {/* 数据渲染 */}
                    {this.state.swiper.map(val => (
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
                    ))}
                </Carousel>
            </div>
        );
    }
}

export default Index;