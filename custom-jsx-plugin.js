const isComponent = (name) => name[0] === name[0].toUpperCase()

module.exports = function (babel) {
  const types = babel.types
  return {
    name: "custom-jsx-plugin",
    visitor: {
      JSXText(path) {
        const str = path.node.value.trim()
        if (str.length > 0) {
          path.replaceWith(types.stringLiteral(path.node.value.trim()), path.node)
        } else {
          path.remove()
        }
      },
      JSXExpressionContainer(path) {
        path.replaceWith(path.node.expression, path.node)
      },
      JSXElement(path) {
        //get the opening element from jsxElement node
        const openingElement = path.node.openingElement
        //tagname is name of tag like div, p etc
        const tagName = openingElement.name.name
        // arguments for React.createElement function
        const args = []
        if (isComponent(tagName)) {
          args.push(types.identifier(tagName))
        } else {
          args.push(types.stringLiteral(tagName))
        }
        const props = openingElement.attributes.map((attrib) => types.objectProperty(
          types.identifier(attrib.name.name),
          attrib.value.type === 'StringLiteral' ? attrib.value : attrib.value.expression,
        ))
        // props.push(types.objectProperty(
        //   types.identifier('children'),
        //   types.arrayExpression(path.node.children.map(x => types.jSXIdentifier(x))),
        // ))
        // as we are considering props as null for now
        const attribs = types.objectExpression(props)
        // attribs = callExpression.arguments.concat(path.node.children)
        //push props or other attributes which is null for now
        args.push(attribs)
        // order in AST Top to bottom -> (CallExpression => MemberExpression => Identifiers)
        // below are the steps to create a callExpression
        const identifier = types.identifier("Cerber.default") //object
        const createElementIdentifier = types.identifier("createElement") //property of object
        const callee = types.memberExpression(identifier, createElementIdentifier)
        const callExpression = types.callExpression(callee, args)
        //now add children as a third argument
        callExpression.arguments = callExpression.arguments.concat(path.node.children)
        // replace jsxElement node with the call expression node made above
        path.replaceWith(callExpression, path.node)
      },
    },
  }
}