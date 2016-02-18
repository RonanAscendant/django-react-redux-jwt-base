var webpackConfig = require('./webpack.config').default;

var isDevelopment = process.env.NODE_ENV === 'development';
var isCI = process.env.TRAVIS;

var singleRun = !isDevelopment;
var autoWatch = isDevelopment;

var browsers = (isDevelopment && ['Chrome']) ||
               (isCI && ['Chrome_travis_ci', 'Firefox']) ||
               ['Chrome', 'Firefox'];

module.exports = function (config) {
  config.set({
    browsers: browsers,
    autoWatch: autoWatch,
    singleRun: singleRun,
    frameworks: ['mocha'],
    files: [
      './tests/js/index.js'
    ],
    preprocessors: {
      './tests/js/index.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots', 'coverage'],
    coverageReporter: {
      check: {
        global: {
          statements: 100,
          branches:   100,
          functions:  100,
          lines:      100
        }
      },
      dir: 'coverage/',
      subdir: function(browserName) {
        if (isCI) {
          return 'ci';
        }
        return browserName;
      },
      reporters: [
        {type: 'html'},
        {type: 'lcovonly', file: 'lcov.info'},
        {type: 'text'}
      ]
    },
    webpack: webpackConfig,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};
