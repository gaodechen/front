import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Steps, Button, Icon } from 'antd';

import { FileSelector } from './components'
import { Player } from './components'
import { ContentLayout } from '../../components/Layouts'
import Spin from './components'
import Recorder from '../Recorder'
import { actions as fileSelector_actions } from '../../modules/fileSelector'
import { actions as transcription_actions } from '../../modules/transcription'

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
    subTitle: '已经为您生成MIDI',
    path: '/transcription/player'
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
        this.state = {
            current: 0,
        };
        this.props.reset();
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
        return steps[currentIndex].step;
    }

    isCurrentNextAvailable = () => {
        let current = this.state.current;
        if (current === 0) {
            return this.props.audioAvailable;
        }
        if (current === 1) {
            return this.props.midiAvailable;
        }
        return this.props.audioAvailable && this.props.midiAvailable;
    }

    /**
     * @description go to next step after clicking button
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
     * @description go to prev step after clicking button
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
        const buttonAvailable = this.isCurrentNextAvailable();
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
                            <Route path='/transcription/spin' component={Spin} />
                            <Route path='/transcription/player' component={Player} />
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
                                    <Button size="large" shape="round" type="primary" onClick={this.next} disabled={!buttonAvailable}>
                                        继续<Icon type="right" />
                                    </Button>
                                )
                            }
                            {
                                current === steps.length - 1
                                && (
                                    <Button size="large" shape="round" type="primary" onClick={this.finish} disabled={!buttonAvailable}>
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

const mapStateToProps = (state) => {
    return {
        audioAvailable: !!state.fileSelector.audio,
        midiAvailable: !!state.transcription.musicMidi,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reset: () => {
            dispatch(fileSelector_actions.setAudio(null, null));
            dispatch(transcription_actions.setMidi(null));
            dispatch(transcription_actions.setXml(null));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Transcription));