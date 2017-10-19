const webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      path = require('path');

const EXAMPLES = {
  basic: {
    id: 'basic',
    title: 'Basic'
  }
};

const entry = {};

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.bundle.js',
      minChunks: 2
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    title: 'Graphology React - Examples',
    template: path.join(__dirname, 'templates', 'index.ejs'),
    pages: Object.keys(EXAMPLES).map(key => EXAMPLES[key]),
    chunks: []
  })
];

for (const key in EXAMPLES) {
  const example = EXAMPLES[key];

  entry[key] = `./${example.id}.jsx`;

  plugins.push(new HtmlWebpackPlugin({
    filename: `${example.id}.html`,
    title: `Graphology React - ${example.title} Example`,
    chunks: ['commons', key],
    template: path.join(__dirname, 'templates', 'default.ejs')
  }));
}

module.exports = {
  context: __dirname,
  entry,
  output: {
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.(?:glsl|gexf)$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      },
      {
        test: /\.worker\.js$/,
        exclude: /node_modules/,
        loader: 'worker-loader'
      }
    ]
  },
  plugins,
  devServer: {
    port: 8000
  }
};
