import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Steps, Button, Icon, Spin } from 'antd';

import FileSelector from '../FileSelector'
import SheetMusic from '../SheetMusic'
import { ContentLayout } from '../../components/Layouts'
import Recorder from '../Recorder'

import './style.css'

const steps = [{
    step: 0,
    title: '上传旋律',
    subTitle: '选择一种方式，把您的旋律告诉我们',
    path: '/transcription/fileSelector',
}, {
    step: 1,
    title: '旋律提取',
    subTitle: '请耐心等待...',
    path: '/transcription/spin'
}, {
    step: 2,
    title: '查看结果',
    subTitle: '已经为您生成乐谱',
    path: '/transcription/sheetMusic'
}];

const Step = Steps.Step;

/**
 * @description Transcription tool page
 * @class Transcription
 * @extends {Component}
 */
class Transcription extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.history.location.pathname;
        let currentStep = this.getCurrentStepByLocation(pathname);
        this.state = {
            current: currentStep,
        };
    }

    /**
     * @description compute index in steps[] with router path
     * @param {*} currentPath
     * @returns
     */
    getCurrentStepByLocation = (currentPath) => {
        let currentIndex = steps.findIndex((step) => {
            return step.path === currentPath;
        })
        if(currentIndex === -1) {
            currentIndex = 0;
        }
        let currentStep = steps[currentIndex].step;
        return currentStep;
    }

    /**
     * @description go to next step after clicking button
     */
    next = () => {
        const current = this.state.current + 1;
        this.props.history.push(steps[current].path)
        this.setState({ current });
    }

    /**
     * @description go to prev step after clicking button
     */
    prev = () => {
        const current = this.state.current - 1;
        this.props.history.push(steps[current].path)
        this.setState({ current });
    }

    render() {
        const { current } = this.state;
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
                            <Route path='/transcription/fileSelector' component={FileSelector} />
                            <Route path='/transcription/recorder' component={Recorder} />
                            <Route path='/transcription/spin' render={
                                () => {
                                    return (
                                        <Spin size="large" style={{marginTop: '100px'}}/>
                                    )
                                }
                            } />
                            <Route path='/transcription/sheetMusic' component={SheetMusic} />
                            <Route path='/transcription' component={FileSelector} />
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
                                    <Button size="large" shape="round" type="primary" onClick={this.next}>
                                        继续<Icon type="right" />
                                    </Button>
                                )
                            }
                            {
                                current === steps.length - 1
                                && (
                                    <Button size="large" shape="round" type="primary" onClick={this.finish}>
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

export default withRouter(Transcription);