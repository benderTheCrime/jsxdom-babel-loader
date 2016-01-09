var fs = require('fs');
var assert = require('chai').assert;
var webpack = require('webpack');
var path = require('path');

var outputDir = path.resolve('./test/output/loader');
var jsxdomLoader = path.resolve('./index.js');

var config = {
  entry: './test/fixtures/test.jsx',
  output: {
    path: outputDir,
    filename: '[id].loader.js',
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx$/,
        loader: jsxdomLoader,
        excludes: /node_modules/,
        query: {
            declarationType: 'let',
            acorn: {
                plugins: {
                    jsx: true
                },
                ecmaVersion: 6,
                sourceType: 'module',
                allowReserved: true
            },
            babel: {
                presets: [ 'es2015', 'stage-0' ]
            }
        }
      }
    ]
  }
};

describe('loader', function() {
  it('transpiles JSX to native DOM', function(done) {
    webpack(config, function(err, stats) {
      fs.readdir(outputDir, function(err, files) {
        assert.isNull(err);
        assert.lengthOf(files, 1);

        fs.readFile(path.resolve(outputDir, files[0]), {encoding: 'utf8'}, function(err, source) {
          assert.match(source, /var \$\$a = document\.createElement\('div'\)/);
          assert.match(source, /setAttributes/);
          assert.match(source, /appendChildren/);
          done();
        });
      });
    });
  });
});
