const isComponent = (name) => name[0] === name[0].toUpperCase()

module.exports = function (babel) {
    var types = babel.types
    return {
      name: "custom-jsx-plugin",
      visitor: {
        JSXElement(path) {
          //get the opening element from jsxElement node
          const openingElement = path.node.openingElement  
           //tagname is name of tag like div, p etc
          const tagName = openingElement.name.name
          // arguments for React.createElement function
          const args = []
          if (!isComponent(tagName)) {
              args.push(types.stringLiteral(tagName)) 
          }
          // as we are considering props as null for now
          const attribs = types.objectExpression(openingElement.attributes.map((attrib) => types.objectProperty(
            types.identifier(attrib.name.name),
            attrib.value.type === 'StringLiteral' ? attrib.value : attrib.value.expression,
          )))
          //push props or other attributes which is null for now
          args.push(attribs)
          // order in AST Top to bottom -> (CallExpression => MemberExpression => Identifiers)
          // below are the steps to create a callExpression
          if (isComponent(tagName)) {
            const callee = types.identifier(tagName)
            const callExpression = types.callExpression(callee, args)
             //now add children as a third argument
            callExpression.arguments = callExpression.arguments.concat(path.node.children)
            // replace jsxElement node with the call expression node made above
            path.replaceWith(callExpression, path.node) 
          } else {
            const identifier = types.identifier("Renderer") //object
            const createElementIdentifier = types.identifier("createElement") //property of object
            const callee = types.memberExpression(identifier, createElementIdentifier)
            const callExpression = types.callExpression(callee, args)
             //now add children as a third argument
            callExpression.arguments = callExpression.arguments.concat(path.node.children)
            // replace jsxElement node with the call expression node made above
            path.replaceWith(callExpression, path.node) 
          }
        },
      },
    }
  }