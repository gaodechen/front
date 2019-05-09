# Project Structure

+ 前端采用`React + Redux`技术栈
+ 异步操作统一使用`sagas`管理
+ 使用持久化状态 & DevTools & sagas等中间件增强Redux
+ 模型推断采用`TensorFlow.js`

```
    public
    src
        api                                 API封装
            model                           模型接口
                asyncTF.js                  Tensorflow.js接口二次封装
                models_1
                    preprocess.js           推断预处理
            request                         异步请求API
                interceptors.js             拦截器
                request.js                  axios二次封装
                status_code.js              状态码
        components                          全局公用视图组件
        containers                          容器组件
            AuthRoute                       权限路由
            MusicGenerator                  风格迁移逻辑组件
            Logout                          注销逻辑组件
            Navigator                       导航栏视图及逻辑
            ...
        modules                             Redux reducers & actions
            home.js                         维护及存储登陆态 & 异步态
            styleTransfer.js                风格迁移组件状态 & 推断action
            ...
        sagas                               异步操作实际逻辑
            home.js                         登陆态 & 异步态操作逻辑
            styleTransfer.js                风格迁移异步推断逻辑
            articles.js                     文章管理异步操作逻辑
            ...
            index.js                        子sagas整合
        store
            configureStore.js               store装配
            index.js
        views
            index.js                        默认视图，入口view
        config
            index.js                        前端配置
        config-overrides.js                 webpack配置覆写
        serviceWorker.js                    PWA配置
    index.js                                主入口
    App.js                                  根组件
    package.json                            npm配置
```

# Resume

## React Ducks项目文件结构

+ 组件分为视图组件components，逻辑组件containers
+ 视图组件只负责`渲染`，逻辑组件负责实际的`业务逻辑`
+ 所有组件状态统一使用Redux集中到唯一的`Store`管理
+ 异步状态全部集中到`Redux-Saga`中间件统一管理
+ 各组件使用index.js统一暴露接口

React/Redux文件结构如下
```
    src
        components                          全局公用视图组件
            component_1
                component_1.js              视图组件_1
                index.js
            component_2
        containers                          逻辑组件
             container_1                    逻辑组件_1
                components                  逻辑组件所依赖的视图组件
                    component_1.js          视图组件_1
                    component_2.js          视图组件_2
                    index.js
                container_1.js              组件1
                index.js
            container_2
            container_3
```

## Lib

+ webpack                                   打包
+ redux-persist                             store持久化
+ redux-saga                                异步流
+ antd                                      组件库
+ axios                                     异步请求
+ react-router-dom                          路由
+ prop-types                                类型检查
+ customize-cra & react-app-rewired         脚手架配置
+ ...