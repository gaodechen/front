import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

import { actions } from '../../modules/styleTransfer'
import { static_addr } from '../../config'
import StyleCard from './components'

const srcPrefix = static_addr.STYLE_THUMBNAIL;

const styles = [
    { description: '巴赫', title: 'Bach',  },
    { description: '贝多芬', title: 'Beethoven',  },
    { description: '德彪西', title: 'Debussy',  },
    { description: '久石让', title: 'Hisaishi',  },
    { description: '莫扎特', title: 'Mozart',  },
    { description: '钢琴男孩', title: 'Pianoboy',  },
    { description: '舒伯特', title: 'Schubert',  },
    { description: 'V.K', title: 'V.K',  },
]

/**
 * @title guide users to upload or record audio files
 * @class FileSelector
 * @extends {Component}
 */
class StyleSelector extends Component {
    /**
     * @params sliceSize: number of styles in a single slice
     * @return sliced array
     */
    getSlices = (sliceSize) => {
        // number of all styles
        let stylesNumber = styles.length;
        // sliced array
        let slices = [];
        // number of styles has been added to a slice
        let styleNumberCnt = 0;
        // number of parts has been sliced
        let sliceCnt = 0;

        while (styleNumberCnt < stylesNumber) {
            let lower = sliceCnt * sliceSize;
            let upperTmp = (sliceCnt + 1) * sliceSize;
            let upper = stylesNumber > upperTmp ? upperTmp : stylesNumber;
            slices.push(styles.slice(lower, upper))
            styleNumberCnt += 4;
            sliceCnt += 1;
        }
        return slices;
    }

    handleClick = (colTitle) => () => {
        this.props.setTargetStyle(colTitle);
    }

    render() {
        let slices = this.getSlices(4)
        return (
            <div style={{ background: '#ECECEC', padding: '24px' }}>
                {slices.map((item, rowId) => {
                    return (
                        <Row gutter={16} key={rowId}>
                            {
                                item.map((col, colId) => {
                                    let src = srcPrefix + '/' + col.title + '.png';
                                    return (
                                        <Col span={6} key={colId} onClick={this.handleClick(col.title)}>
                                            <StyleCard description={col.description} title={col.title} src={src} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    )
                })}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTargetStyle: (targetStyle) => {
            dispatch(actions.setTargetStyle(targetStyle))
        }
    }
}

export default connect(null, mapDispatchToProps)(StyleSelector);