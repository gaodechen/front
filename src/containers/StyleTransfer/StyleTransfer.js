import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Steps, Button, Icon } from 'antd';

import { ContentLayout } from '../../components/Layouts'
import FileSelector from './components'
import StyleSelector from '../StyleSelector'
import MusicGenerator from '../MusicGenerator'
import TransferSetting from '../TransferSetting'
import { actions as fileSelector_actions } from '../../modules/fileSelector'
import { actions as styleTransfer_actions } from '../../modules/styleTransfer'

import './style.css'

const Step = Steps.Step;

/**
 * @description Style Transfer Tools page
 *              Steps divided and displayed by router:
 *                    <Route component={Step1} />
 * @class StyleTransfer
 * @extends {Component}
 */
class StyleTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
        this.props.reset();
    }

    /**
     * @description use router path computing current step index
     * @param {*} currentPath
     * @returns
     */
    getCurrentStepByLocation = (currentPath) => {
        let currentIndex = steps.findIndex((step) => {
            return step.path === currentPath;
        })
        if (currentIndex === -1) {
            currentIndex = 0;
        }
        let currentStep = steps[currentIndex].step;
        return currentStep;
    }

    isCurrentNextAvailable = () => {
        const { current } = this.state;
        if (current === 0) {
            return this.props.audioAvailable;
        } else if (current === 1) {
            return this.props.styleAvailable;
        } else if (current === 3) {
            return this.props.audioAvailable && this.props.styleAvailable;
        }
        return true;
    }

    /**
     * @description go to next step
     */
    next = () => {
        let current = this.state.current + 1;
        if(current >= steps.length) current = 0;
        this.props.history.push(steps[current].path)
        this.setState({ current });
    }

    /**
     * @description reset
     */
    finish = () => {
        this.setState({current: 0});
        this.props.history.push(steps[0].path);
        this.props.reset();
    }

    /**
     * @description go to prev step
     */
    prev = () => {
        let current = this.state.current - 1;
        if (current < 0) current = 0;
        this.props.history.push(steps[current].path)
        this.setState({ current });
    }

    render() {
        const { pathname } = this.props.history.location;
        const current = this.getCurrentStepByLocation(pathname);
        /**
         * <ContentLayout>
         *      <Step Header />
         *      <div>
         *          <Route Step1 />
         *          <Route Step2 />
         *      </div>
         *      <Step Actions />
         * </ContentLayout>
         */
        const buttonDisabled = !this.isCurrentNextAvailable();
        return (
            <ContentLayout sider={false}>
                <Steps current={current} style={{ marginTop: '48px' }}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className={`${"steps-content"} ${"content-background"}`}>
                    <div className="steps-content-title">
                        <span>{steps[this.state.current].subTitle}</span>
                    </div>
                    <div className="steps-content-content">
                        <Switch>
                            <Route path='/styleTransfer/fileSelector' component={FileSelector} />
                            <Route path='/styleTransfer/styleSelector' component={StyleSelector} />
                            <Route path='/styleTransfer/transferSetting' component={TransferSetting} />
                            <Route path='/styleTransfer/musicGenerator' component={MusicGenerator} />
                            <Route path='/styleTransfer' component={FileSelector} />
                        </Switch>
                    </div>
                    <div className="steps-action">
                        <Button.Group>
                            {
                                current > 0
                                && (
                                    <Button size="large" shape="round" onClick={this.prev}>
                                        <Icon type="left" />回退
                                    </Button>
                                )
                            }
                            {
                                current < steps.length - 1
                                && (
                                    <Button size="large" shape="round" type="primary" onClick={this.next} disabled={buttonDisabled}>
                                        继续<Icon type="right" />
                                    </Button>
                                )
                            }
                            {
                                current === steps.length - 1
                                && (
                                    <Button size="large" shape="round" type="primary" onClick={this.finish}>
                                        重置<Icon type="redo" />
                                    </Button>
                                )
                            }
                        </Button.Group>
                    </div>
                </div>
            </ContentLayout>
        );
    }
}

const steps = [{
    step: 0,
    title: '选择音频',
    subTitle: '上传MIDI文件',
    path: '/styleTransfer/fileSelector',
}, {
    step: 1,
    title: '选择风格',
    subTitle: '选择您喜欢的风格，我们将用该风格谱写您的音乐',
    path: '/styleTransfer/styleSelector'
}, {
    step: 2,
    title: '生成配置',
    subTitle: '请回答以下问题',
    path: '/styleTransfer/transferSetting'
}, {
    step: 3,
    title: '乐曲生成',
    subTitle: '人工智能为您编曲',
    path: '/styleTransfer/musicGenerator'
}];

const mapStateToProps = (state) => {
    return {
        audioAvailable: !!state.fileSelector.audio,
        styleAvailable: !!state.styleTransfer.targetStyle,
        style: state.styleTransfer.targetStyle,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reset: (payload) => {
            dispatch(fileSelector_actions.setAudio(null, null));
            dispatch(styleTransfer_actions.setTargetStyle(null));
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StyleTransfer));