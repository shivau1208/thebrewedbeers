module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Matches JavaScript and JSX files
        exclude: /node_modules/, // Exclude node_modules folder
        use: {
          loader: 'babel-loader', // Use babel-loader for transpiling
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Use necessary Babel presets
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Add this so you can import .jsx files without specifying the extension
  },
};
