import logo from '../static/Music.svg'

const addr_config = {
    // forwarding reqeusts using nginx
    FORWARDING_HOST: 'http://127.0.0.1:4534',
    // static resources server
    STATIC_HOST: 'http://127.0.0.1:3002/static',
}

export { logo, addr_config }