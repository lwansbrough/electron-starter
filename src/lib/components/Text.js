import { Component } from '../Component';

export class Text extends Component {
  constructor(definition) {
    super(definition);
    this.text = '';
  }
  
  getValue() {
    return this.text;
  }
  
  setValue(text) {
    this.text = text;
  }
  
  toInstanceString() {
    if (this.children.length > 0) {
      return super.toInstanceString();
    }
    return this.text;
  }
}