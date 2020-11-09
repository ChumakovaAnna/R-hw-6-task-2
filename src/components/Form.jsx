import React, { useState } from 'react';
import PropTypes from 'prop-types';
import imgSave from '../img/save.png';

Form.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
/**
 * Компонент для формы, чтобы создать новую заметку
 * @param {*} onAdd - функция для отправки новой заметки на сервер
 */
function Form({ onAdd }) {
  const [form, setForm] = useState({ value: '' });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAdd(form.value);
    setForm({ value: '' });
  };
  
  const handleChange = ({ target }) => {
    setForm({ value: target.value });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        name="note"
        className="textarea"
        value={form.value}
        onChange={handleChange}
      ></textarea>
      <button className="button_save">
        <img className="button_img" src={imgSave} alt="save"></img>
      </button>
    </form>
  );
}

export default Form;
