import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Steps, Button, Icon } from 'antd';

import FileSelector from './components'
import StyleSelector from '../StyleSelector'
import MusicGenerator from '../MusicGenerator'
import TransferSetting from '../TransferSetting'
import { ContentLayout } from '../../components/Layouts'
import Recorder from '../Recorder'

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
        const pathname = this.props.history.location.pathname;
        let currentStep = this.getCurrentStepByLocation(pathname);
        this.state = {
            current: currentStep,
        };
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
        const {current} = this.state;
        if(current === 0) {
            return this.props.audioAvailable;
        } else if(current === 1) {
            return this.props.styleAvailable;
        } else if(current === 3) {
            return this.props.audioAvailable && this.props.styleAvailable;
        }
        return true;
    }

    /**
     * @description go to next step
     */
    next = () => {
        const current = this.state.current + 1;
        this.props.history.push(steps[current].path)
        this.setState({ current });
    }

    /**
     * @description go to prev step
     */
    prev = () => {
        const current = this.state.current - 1;
        this.props.history.push(steps[current].path)
        this.setState({ current });
    }

    render() {
        const { current } = this.state;
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
                                <Route path='/styleTransfer/recorder' component={Recorder} />
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
                                    <Button size="large" shape="round" type="primary" onClick={this.finish} disabled={buttonDisabled}>
                                        完成<Icon type="right" />
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
    subTitle: '选择一种方式，把您的旋律灵感告诉我们',
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

export default withRouter(connect(mapStateToProps)(StyleTransfer));