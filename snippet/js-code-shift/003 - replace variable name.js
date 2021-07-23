function transform (fileInfo, api, options) {
  return api
    .jscodeshift(fileInfo.source)
    .findVariableDeclarators("foo")
    .renameTo("bar")
    .toSource();
};

module.exports = transform
