var path = require('path');

var production = !!~process.argv.indexOf('-p');

module.exports = {
  entry: {
    graphologyReact: './src/Graph.jsx'
  },
  output: {
    filename: production ? '[name].min.js' : '[name].js',
    path: path.join(__dirname, 'build'),
    library: 'graphology-react',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  }
};
