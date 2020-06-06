const path = require('path');

const commonStylesPath = path.resolve(__dirname, './src/common-styles');

module.exports = env => {
  return {
    entry: './src/app.tsx',
    output: {
      path: path.resolve(__dirname + '/public'),
      filename: 'build/app.js',
      publicPath: '/'
    },
    optimization: {
      usedExports: true
    },
    devServer: {
      historyApiFallback: true
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.css'],
      alias: {
        '@assets': path.resolve(__dirname, './src/assets'),
        '@services': path.resolve(__dirname, './src/app/services/index.ts'),
        '@common-ui': path.resolve(__dirname, './src/common-ui/index.ts'),
        '@testing': path.resolve(__dirname, './src/testing/index.ts')
      }
    },
    mode: env === 'production' ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ['ts-loader']
        },
        {
          // rule for scss modules
          test: /\.module.scss$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [commonStylesPath]
                }
              }
            }
          ]
        },
        {
          // rule for common styles
          test: /\.scss$/,
          include: commonStylesPath,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(jpg|png)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'assets/images'
          }
        }
      ]
    }
  };
};
