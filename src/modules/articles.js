/**
 * Sub Reducer for articles
 */
const action_types = {
    // get article list
    GET_ARTICLES: 'articles/GET',
    // set response data
    SET_ARTICLES: 'articles/SET',
    // get article info from server
    GET_ARTICLE: 'article/GET',
    // set article info to store
    SET_ARTICLE: 'article/SET',
    // post an article
    ADD_ARTICLE: 'article/ADD',
    // del an article
    DEL_ARTICLE: 'article/DEL',
    UPD_ARTICLE: 'article/UPD',
}

const initialState = {
    // artciles' list
    articles: [],
}

// Reducer
const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_ARTICLES:
            return {
                ...state,
                articles: {
                    ...action.articles,
                },
            }
        case action_types.SET_ARTCILE:
            return {
                ...state,
                // article detail
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