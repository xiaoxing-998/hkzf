// 首页后端接口
import axios from '../../axios'

// 获取轮播图数据
export function getSwiper() {
    // 返回一个Promise对象
    return axios.get('/home/swiper')
}
// 获取租房小组数据
export function getGroups(area = 'AREA%7C88cff55c-aaa4-e2e0') {
    return axios.get('/home/groups', {
        params: {
            area
        }
    })
}
// 获取资讯数据
export function getNews(area) {
    return axios.get('/home/news', {
        params: {
            area
        }
    })
}