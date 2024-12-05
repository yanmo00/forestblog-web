module.exports = {
    publicPath: './',
    outputDir: 'dist',
    indexPath: 'index.html',
    devServer: {
        proxy: {
            '/prod-api': {
                target: 'http://182.92.67.117:7002',
                changeOrigin: true,
                pathRewrite: {
                    '^/prod-api': ''
                }
            }
        }
    }
  };