// 根组件
import React from 'react';
// 路由三个基础组件
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// 导入路由对应组件
import Home from './pages/Home';
import CityList from './pages/CityList';
import Map from './pages/Map';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Router className="app">
            <Switch>
                {/* 一级路由 */}
                <Route path='/home' component={Home} />
                <Route path='/cityList' component={CityList} />
                <Route path='/map' component={Map} />
                {/* 404 */}
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default App;