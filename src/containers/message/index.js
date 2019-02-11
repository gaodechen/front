import { message, Alert, Modal } from 'antd'
import React from 'react'

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

export { message, Modal, Tip }