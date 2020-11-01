const path = require('path')
module.exports = {
  devServer: { // ① api 요청이 있을때 어디에서 처리할지를 설정
    // proxy: 'http://localhost:8001/'
    proxy: {
      '/': {
        target: 'http://localhost:8001/',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },
  outputDir: path.resolve('../backend/public'), // ② 배포 파일의 위치를 지정
  transpileDependencies: [
    'vuetify'
  ]
}
