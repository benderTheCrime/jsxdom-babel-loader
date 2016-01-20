var loaderUtils = require('loader-utils'),
    jsxdom = require('jsxdom'),
    babel = require('babel-core');

module.exports = function(source) {
    this.cacheable && this.cacheable(true);
    var query = loaderUtils.parseQuery(this.query),
        tree = jsxdom.transpile(source, query);
    return babel.transform(tree, query.babel).code;
};
