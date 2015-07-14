function propTypeResolver(propType) {
  if (!propType) {
    propType = {
      type: 'any'
    };
  }
  var propTypeString = `React.PropTypes.${propType.type}`;
  switch(propType.type) {
    case 'arrayOf':
    case 'objectOf':
      propTypeString += `(${propTypeResolver(propType.value)})`;
      break;
    case 'instanceOf':
      propTypeString += `(${propType.value})`;
      break;
    case 'oneOf':
      var valueString = propType.value.map((v) => typeof v === 'string' ? `'${v}'` : v).join(',');
      propTypeString += `[${valueString}]`;
      break;
    case 'shape':
      var types = [];
      Object.keys(propType.value).forEach((key) => {
        types.push(`'${key}': ${propTypeResolver(propType.value[key])}`);
      });
      types = `{${types.join(',')}}`;
      propTypeString += `(${types})`;
      break;
    default:
      break;
  }
  propTypeString += propType.required ? '.isRequired' : '';
  return propTypeString;
}

export function composeInstance(component) {
  
  var children = component.getChildren();
  var instanceProps = component.getProps();
  var instancePropsString = Object.keys(instanceProps)
    .map((p) => `${p}={${JSON.stringify(instanceProps[p])}}`).join(' ');
  
  return `
    <${component.name} ${instancePropsString}>
      ${children.map((child) => child.toInstanceString())}
    </${component.name}>
  `;
}

export function composeDefinition(component) {
  
  var children = component.getChildren();
  
  var defaultProps = component.getPropDefinitionsArray()
    .filter((p) => typeof p.defaultValue != 'undefined')
    .map((p) => {
      var obj = {};
      obj[p.name] = p.defaultValue;
      return obj;
    });
  var defaultPropsString = JSON.stringify(defaultProps);
  
  var propTypesString = '{' + component.getPropsArray()
    .map((p) => `${p.name}: ${propTypeResolver(p.type)}`)
    .join(',') + '}';
    
  var stylesString = JSON.stringify(component.styles);
  
  return `
    export class ${component.name} extends React.Component {
      constructor(props) {
        super(props);
      }
      render() {
        <${component.baseName}>
          ${children.map((child) => child.toInstanceString())}
        </${component.baseName}>
      }
    }
    
    ${component.name}.propTypes = ${propTypesString};
    ${component.name}.defaultProps = ${defaultPropsString};
    
    var styles = StyleSheet.create(${stylesString});
  `;
}