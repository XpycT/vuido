import libui from 'libui-node'

import { Widget } from './widget'

export class DropdownList extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      items: [],
      selected: 0
    };
  }

  _createWidget() {
    this.widget = new libui.UiCombobox();
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    if ( !Array.isArray( this.attributes.items ) )
      throw new Error( 'DropdownList items must be an array' );

    this.attributes.items.forEach( item => {
      this.widget.append( item );
    } );

    this.widget.selected = this.attributes.selected;

    this.items = this.attributes.items;
  }

  _setWidgetAttribute( key, value ) {
    if ( key == 'items' ) {
      // this attribute must be set dynamically using v-bind, so make sure it's not modified
      if ( !Array.isArray( value ) )
        throw new Error( 'DropdownList items must be an array' );
      if ( value.length != this.items.length )
        throw new Error( 'DropdownList items cannot be changed dynamically' );
      value.forEach( ( item, index ) => {
        if ( item != this.items[ index ] )
          throw new Error( 'DropdownList items cannot be changed dynamically' );
      } );
    } else if ( key == 'selected' ) {
      if ( this.widget.selected != value )
        this.widget.selected = value;
    } else {
      super._setWidgetAttribute( key, value );
    }
  }

  _setWidgetHandler( event, handler ) {
    if ( event == 'change' ) {
      this.widget.onSelected( () => {
        handler( this.widget.selected );
      } );
    } else {
      super._setWidgetHandler( event, handler );
    }
  }
}
