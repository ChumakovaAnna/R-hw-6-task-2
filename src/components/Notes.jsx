import React, { Component } from 'react';
import NoteItem from './NoteItem';
import imgUpdate from '../img/update.png';
import Form from './Form';

/**
 * Класс для работы с заметками
 */
class Notes extends Component {
  constructor() {
    super();
    this.state = {
      notes: null,
    };
  }

  /**
   * Создаем запрос для получения всех заметок с сервера
   */
  getNotes = () => {
    fetch(process.env.REACT_APP_NOTES_URL)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ notes: response });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getNotes();
  }

  /**
   * Создаем запрос для удаления заметки на сервере. Потом обновляем список заметок
   * @param {*} id - id заметки
   */
  onItemRemove = (id) => {
    fetch(`${process.env.REACT_APP_NOTES_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then(this.getNotes())
      .catch((err) => console.log(err));
    this.getNotes();
  };

  /**
   * Создаем запрос для добавления заметки на сервер. Потом обновляем список заметок
   * @param {*} value - значение заполняемой формы
   */
  onItemAdd = (value) => {
    const data = {
      id: 0,
      content: value,
    };

    fetch(process.env.REACT_APP_NOTES_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(data),
    })
      .then(this.getNotes())
      .catch((err) => console.log(err));
    this.getNotes();
  };

  render() {
    return (
      <div>
        <div className="header">
          <h1>Note</h1>
          <button onClick={this.getNotes}>
            <img className="button_img" src={imgUpdate} alt="update"></img>
          </button>
        </div>
        <div className="note_list">
          {this.state.notes
            ? this.state.notes.map((i) => (
                <NoteItem
                  key={i.id}
                  item={i}
                  onDelete={this.onItemRemove}
                ></NoteItem>
              ))
            : null}
        </div>
        <Form onAdd={this.onItemAdd}></Form>
      </div>
    );
  }
}

export default Notes;
