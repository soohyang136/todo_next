import React, { createContext, useContext, useState, ReactNode } from 'react';

// Todo 항목의 타입 정의
export interface Todo {
  text: string;
  completed: boolean;
}

// TodoContext의 타입 정의
interface TodoContextType {
  tasks: Todo[];
  addTask: (task: Todo) => void;
  toggleTaskCompletion: (index: number) => void;
  removeTask: (index: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

// TodoContext를 사용할 컴포넌트에 제공하는 컨텍스트 프로바이더
export function TodoProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Todo[]>([]);

  const addTask = (task: Todo) => {
    setTasks([...tasks, task]);
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <TodoContext.Provider value={{ tasks, addTask, toggleTaskCompletion, removeTask }}>
      {children}
    </TodoContext.Provider>
  );
}

// 커스텀 훅을 사용하여 TodoContext를 사용할 수 있도록 설정
export function useTodoContext() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}
