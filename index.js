var loaderUtils = require('loader-utils'),
    jsxdom = require('jsxdom'),
    babel = require('babel-core');

module.exports = function(source) {
    this.cacheable && this.cacheable(true);
    var query = loaderUtils.parseQuery(this.query),
        tree = [
            "require('jsxdom/dist/appendChildren.js');",
            "require('jsxdom/dist/setAttributes.js');",
            jsxdom.transpile(source, query)
        ];
    return babel.transform(tree.join('\n'), query.babel).code;
};
