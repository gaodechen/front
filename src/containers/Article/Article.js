import React, { Component } from 'react'

import { ContentLayout } from '../../components/Layouts'

class Article extends Component {
    render() {
        return (
            <ContentLayout>
                {this.props.article.content}
            </ContentLayout>
        )
    }
}

export default Article;