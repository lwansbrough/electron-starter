export { Text } from './Text';
export { View } from './View';

export function createComponentClass(definition) {
  return class extends classes[definition.extends] {
    constructor(definition) {
      super(definition);
    }
  }
}