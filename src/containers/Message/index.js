import { message, notification } from 'antd'

/**
 * @description show message on the middle of screen
 * @param {string} type
 * @param {string} content message content
 * @param {function} onClose callback
 */
const showMessage = (type, content, onClose) => {
    message[type](content, 1, onClose);
    onClose();
}

/**
 * @param {string} type
 * @param {string} message message content
 * @param {function} onClose callback
 */
const showNotification = (type, message, onClose) => {
    notification[type]({message, onClose});
    onClose();
}

export { showMessage, showNotification }
