import React, { Component } from 'react';
import { Editor as Slate } from 'slate-react';
import { Value as SlateValue } from 'slate';

class TextEditor extends Component {
  constructor( props ) {
    super(props);
    this.slateInitialValue = SlateValue.fromJSON({
      document: {
        nodes: [{
          object: 'block',
          type: 'paragraph',
          nodes: [{
            object: 'text',
            leaves: [{
              text: 'This is a line in a paragraph.',
            }],
          }],
        }],
      },
    });
    this.state = {
      value: this.slateInitialValue,
    }
  }
  onChange = ({ value }) => {
    this.setState({ value: value });
  }

  render() {
    return (
      <Slate
        value={ this.state.value }
        onChange={ this.onChange }
      />
    )
  }
}

export default TextEditor;
