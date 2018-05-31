import libui from 'libui-node'

import { Widget } from './widget'

export class TextArea extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      value: '',
      readonly: false
    };
  }

  _createWidget() {
    this.widget = new libui.UiMultilineEntry();
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    if ( this.attributes.value != '' )
      this.widget.text = this.attributes.value;
    if ( this.attributes.readonly )
      this.widget.readOnly = true;
  }

  _setWidgetAttribute( key, value ) {
    if ( key == 'value' ) {
      if ( this.widget.text != value ) {
        if ( process.platform == 'win32' ) {
          // workaround for https://github.com/andlabs/libui/issues/359
          this.widget.text = value.replace( /\n/g, '\r\n' );
        } else {
          this.widget.text = value;
        }
      }
    } else if ( key == 'readonly' ) {
      this.widget.readOnly = value;
    } else {
      super._setWidgetAttribute( key, value );
    }
  }

  _setWidgetHandler( event, handler ) {
    if ( event == 'input' ) {
      this.widget.onChanged( () => {
        handler( this.widget.text );
      } );
    } else {
      super._setWidgetHandler( event, handler );
    }
  }
}
