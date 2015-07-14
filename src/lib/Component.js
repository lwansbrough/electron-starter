import { composeDefinition, composeInstance } from './sourceComposer';

export class Component {
  constructor(definition) {
    this.key = Math.random();
    this.parentKey = null;
    this.baseName = this.constructor.name;
    this.name = definition.name || this.baseName;
    this.defaultStyles = Object.assign({}, definition.styles);
    this.propDefinitions = Object.assign({}, definition.props);
    this.props = {};
    this.styles = Object.assign({}, this.defaultStyles);
    this.children = [];
  }
  
  addChild(child) {
    child.setParent(this);
    this.children.push(child);
  }
  
  removeChild(child) {
    var index = this.children.indexOf(child);
    if (index > -1) {
      child.setParent(null);
      this.children.splice(index, 1);
    }
  }
  
  getChildren() {
    return this.children;
  }
  
  getParent() {
    // TODO: access global component list
    if (this.parentKey == null) return null;
    return ({})[this.parentKey];
  }
  
  setParent(parent) {
    this.parentKey = parent.key;
  }
  
  getProps() {
    return this.props;
  }
  
  getProp(name) {
    return this.props[name];
  }
  
  setProp(name, value) {
    var prop = this.getProp(name);
    if (typeof prop === 'object' && typeof value === 'object') {
      Object.assign(prop, value);
      return;
    }
    this.props[name] = value;
  }
  
  getPropDefinitions() {
    return this.propDefinitions;
  }
  
  getPropDefinition(name) {
    return this.propDefinition[name];
  }
  
  getStyleProp(key) {
    return this.styles[key];
  }
  setStyleProp(key, value) {
    this.styles[key] = value;
  }
  
  getPropDefinitionsArray() {
    return Object.keys(this.propDefinitions).map(key => this.propDefinitions[key]);
  }
  
  toObject() {
    return {
      key: this.key,
      parentKey: this.parentKey,
      baseName: this.baseName,
      name: this.name,
      props: this.props,
      styles: this.styles
    };
  }
  
  toJSON() {
    return JSON.stringify(this.toObject());
  }
  
  toInstanceString() {
    return composeInstance(this);
  }
  
  toDefinitionString() {
    return composeDefinition(this);
  }
}