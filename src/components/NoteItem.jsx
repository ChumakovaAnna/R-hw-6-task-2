import React, { Component } from 'react';
import PropTypes from 'prop-types';
import imgDelete from "../img/delete.png"
/**
 * Компонент для заметки
 */
class NoteItem extends Component {
  constructor({item, onDelete}) {
    super();
    this.id = item.id;
    this.content = item.content;
    this.onDelete = onDelete.bind(this);
  }

  onRemove = () => {
    this.onDelete(this.id)
  }

  render() {
    return (
      <div className="note">
        <span>{this.content}</span>
        <button className="button_delete" onClick={this.onRemove}>
          <img className="button_img" src={imgDelete} alt="delete"></img>
        </button>
      </div>
    );
  }
}

NoteItem.propTypes = {
 item: PropTypes.object.isRequired,
 onDelete: PropTypes.func.isRequired,
};

export default NoteItem;