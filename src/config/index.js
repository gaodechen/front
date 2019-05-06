import logo from '../static/Music.svg'

const addr_config = {
    // forwarding reqeusts using nginx
    FORWARDING_HOST: 'http://127.0.0.1:4534',
    // static resources server
    STATIC_HOST: 'http://127.0.0.1:3002/static',
}

// static folder config
const static_folder_config = {
    // static resources (music / pictures) folder
    AVATAR: addr_config.STATIC_HOST + '/avatar',
    THUMBNAIL: addr_config.STATIC_HOST + '/thumbnail',
    STYLE_THUMBNAIL: addr_config.STATIC_HOST + '/styleThumbnail',
    MUSIC: addr_config.STATIC_HOST + '/music',
    // model files
    STYLE_TRANSFER_MODEL: addr_config.STATIC_HOST + '/model/styleTransfer',
    EMOTION_ANALYSIS_MODEL: addr_config.STATIC_HOST + '/model/emotionAnalysis',
}

export { logo, addr_config, static_folder_config as static_addr }