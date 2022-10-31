import React from 'react';

import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider(props) {
  const {
    item: todos,
    save: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);

  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todos?.filter(({ completed }) => !!completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(({ text }) =>
      text.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
    });

    saveTodos(newTodos);
  };

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((t) => t.text === text);
    const newTodos = [...todos];

    newTodos[todoIndex] = {
      ...todos[todoIndex],
      completed: true,
    };

    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    saveTodos(todos.filter((t) => t.text !== text));
  };

  return (
    <TodoContext.Provider
      value={{
        error,
        loading,
        completedTodos,
        totalTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        addTodo,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
