import { message, notification } from 'antd'

// 屏幕中央提示框
const showMessage = (type, content, onClose) => {
    message[type](content, 1, onClose);
    onClose();
}

// 右侧提示框
const showNotification = (type, message, onClose) => {
    notification[type]({message, onClose});
    onClose();
}

export { showMessage, showNotification }
