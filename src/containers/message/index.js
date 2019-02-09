import { message, Alert } from 'antd'
import React from 'react'

const successBox = (msg) => {
    message.success(msg)
}

const errorBox = (msg) => {
    message.error(msg)
}

const warningBox = (msg) => {
    message.warning(msg)
}

const Tip = (type, msg, content, callback) => {
    return (
        <Alert
            message={msg}
            description={content}
            type={type}
            showIcon
        />
    )
}

export { successBox, errorBox, warningBox, Tip }