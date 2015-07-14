import { Component } from '../Component';

export class View extends Component {
  constructor(definition) {
    definition = objectAssignDeep({
      // You could, for example, apply default View styles here
    }, definition);
    super(definition);
  }
}