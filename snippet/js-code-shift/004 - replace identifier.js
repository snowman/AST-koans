export default function transform(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.Identifier)
    .forEach((path) => {
      j(path).replaceWith(j.identifier("bar"));
    })
    .toSource();
}
