import React from 'react'
import { Spin } from 'antd';

import './style.css'

const Loading = () => (
    <div className="loading-container">
        <Spin size="large" />
    </div>
);

export default Loading