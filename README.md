# The Great GDC

> continue his magical web work with the little ZX

# TODO

- [ ] Recommendation System
- [ ] StyleNet

# Resume

## Ducks项目文件结构

大多文件夹下面使用index.js统一暴露接口，React/Redux文件结构如下：

    src
        components                          全局视图组件
        containers                          逻辑组件
            feature_1                       具体的逻辑业务
                components                  该逻辑所使用的视图组件
                    component_1.js
                    component_2.js
                    index.js
                container_1.js
                container_2.js
                index.js
            feature_2
            feature_3

## Tech

+ antd                                      组件库
+ axios                                     异步请求
+ react-router-dom                          前端
+ redux-persist                             store持久化
+ redux-saga                                异步流 

## Others

+ customize-cra & react-app-rewired         脚手架配置
+ prop-types                                类型检查
+ React                                     UI框架
+ Redux                                     数据流框架
+ webpack                                   打包
+ ...


## Project Structure

    public
    src                                     前端源码
        api                                 API接口封装
            interceptors.js                 请求拦截器
            request.js                      封装axios请求方法
            status_code.js                  状态码
        components                          全局视图组件
        containers                          容器组件们
            AuthRoute                       权限路由
            ...
        modules                             Redux reducers/actions
            home.js                         全局state，维护登陆态/异步态
            ...
        sagas                               异步流
            home.js                         全局state的异步逻辑
            ...
            index.js                        sagas整合以及接口
        store
            configureStore.js               store装配
            index.js                        出口store
        views
            index.js                        默认的视图，应用入口view
    index.js                                主入口
    App.js                                  根组件
    config-overrides.js                     webpack配置覆盖
    package.json                            派克吱点鸡僧
