module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                //名字可以自定义，这里我用的是api
                '/api': {
                  target: 'http://192.168.1.188:12/api',//设置你调用的接口域名和端口号 别忘了加http
                  changeOrigin: true,//这里设置是否跨域
                  pathRewrite: {
                    '^/api': ''
                  }
                }
            }
        }
    },
}