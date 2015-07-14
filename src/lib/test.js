import { Text, View } from './components';

var classes = {
  Text: Text,
  View: View
};

var RedView = createComponentClass({
  extends: classes['View'],
  props: {
    style: {
      name: 'style',
      type: {
        type: 'object'
      },
      defaultValue: { borderRadius: 5 }
    },
    foo: {
      name: 'foo',
      type: {
        type: 'arrayOf',
        value: { type: 'string' }
      },
      defaultValue: ['bar']
    }
  },
  styles: {
    backgroundColor: 'red'
  }
});
