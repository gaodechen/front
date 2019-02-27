// 文章列表
const action_types = {
    // 获取articles列表
    GET_ARTICLES: 'articles/GET',
    // 将articles存入store
    SET_ARTICLES: 'articles/SET',
    // 单篇文章
    GET_ARTICLE: 'article/GET',
    SET_ARTICLE: 'article/SET',
    // 增删文章
    ADD_ARTICLE: 'article/ADD',
    DEL_ARTICLE: 'article/DEL',
}

const initialState = {
    // 异步获取的文章列表，包含文章的_id, 摘要，摘要图等基本信息
    articles: [],
    // [articleID]: detail，异步获取文章的详细信息
}

// Reducer
const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_ARTICLES:
            return {
                ...state,
                // 文章基本信息列表
                articles: {
                    ...action.articles,
                },
            }
        case action_types.SET_ARTCILE:
            return {
                ...state,
                // 单篇文章的详细信息
                [action.articleID]: {
                    ...action.article
                }
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    // 获取userID的文章列表
    getArticles: (userID) => ({
        type: action_types.GET_ARTICLES, id: userID
    }),
    setArticles: (articles) => ({
        type: action_types.SET_ARTICLES, articles
    }),
    getArticle: (articleID) => ({
        type: action_types.GET_ARTICLES, id: articleID
    }),
    addArticle: (userID, article) => ({
        type: action_types.ADD_ARTICLE, id: userID, article
    }),
    delArticle: (userID, articleID) => ({
        type: action_types.DEL_ARTICLE, id: userID, articleID
    })
}

export default Reducer
export { action_types, actions }