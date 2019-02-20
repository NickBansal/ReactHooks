import React, { useState } from "react";
import styled from "styled-components";

const MainDiv = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 20px 0;
  height: 30px;
  width: 300px;
  padding: 10px;
  font-size: 20px;
`;

const Button = styled.button`
  width: 100px;
  padding: 10px;
  font-size: 20px;
  border: 2px solid black;
  border-radius: 20px;
  box-shadow: 1px 5px 2px black

  &:hover {
    cursor: pointer;
    background: grey;
    color: white;
  }

  &:active {
    box-shadow: 1px 1px 1px black;
    transform: translateY(4px);
  }

  &:focus {
    outline: none;
  }
`;

const UL = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 25px;
`;

const LI = styled.li`
  text-decoration: ${props => (props.delValue === 1 ? "line-through" : "none")};
  color: ${props => (props.delValue === 1 ? "red" : "black")};
`;

const TodoList = () => {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState([]);

  const changeHandler = event => {
    setTodoName(event.target.value);
  };

  const handleAdd = () => {
    setTodoList([
      ...todoList,
      {
        name: todoName,
        delValue: 0
      }
    ]);
    setTodoName("");
  };

  const handleDelete = (item, index) => {
    let newArray;
    if (item.delValue !== 1) {
      newArray = todoList.reduce((acc, element) => {
        if (item.name === element.name) element.delValue += 1;
        acc.push(element);
        return acc;
      }, []);
    } else newArray = todoList.filter((element, i) => index !== i);
    setTodoList(newArray);
  };

  const keyIdentifier = index => Math.random() * index;

  return (
    <MainDiv>
      <Input
        type="text"
        placeholder="Text"
        value={todoName}
        onChange={changeHandler}
      />
      <Button onClick={handleAdd} type="submit">
        SUBMIT
      </Button>
      <UL>
        {todoList.map((item, index) => (
          <LI
            delValue={item.delValue}
            onClick={() => handleDelete(item, index)}
            key={keyIdentifier(index)}
          >
            {item.name}
          </LI>
        ))}
      </UL>
    </MainDiv>
  );
};

export default TodoList;
