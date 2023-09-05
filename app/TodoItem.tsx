import React, { forwardRef, useImperativeHandle } from 'react';

interface TodoItemProps {
  task: { text: string; completed: boolean };
  onToggle: () => void;
  onRemove: () => void;
}

export interface TodoItemRef {
  // Todo 목록 아이템을 제어하기 위한 메서드나 속성을 선언합니다.
}

const TodoItem = forwardRef<TodoItemRef, TodoItemProps>((props, ref) => {
  const { task, onToggle, onRemove } = props;

  const handleToggle = () => {
    onToggle();
  };

  const handleRemove = () => {
    onRemove();
  };

  useImperativeHandle(ref, () => ({
    // Todo 목록 아이템을 제어하기 위한 메서드나 속성을 구현합니다.
  }));

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />
      <span className={task.completed ? 'completed' : undefined}>
        {task.text}
      </span>
      <button onClick={handleRemove}>Remove</button>
    </li>
  );
});

export default TodoItem;


TodoItem.displayName = 'TodoItem'; 
