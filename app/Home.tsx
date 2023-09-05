"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from '../styles/Home.module.css';
import TodoItem, { TodoItemRef } from './TodoItem';
import { useTodoContext } from './TodoContext';

export default function Home() {
  const { control, handleSubmit, reset, getValues } = useForm();
  const { tasks, addTask, toggleTaskCompletion, removeTask } = useTodoContext();
  const [logs, setLogs] = useState<{ text: string; completed: boolean }[][] | null>(null);
  const todoItemRefs = useRef<TodoItemRef[]>([]);

  useEffect(() => {
    if (logs != null) setLogs([...logs, tasks]);
    else if (tasks.length > 0) setLogs([tasks])// 현재 할 일 목록(tasks)을 로그에 출력
  }, [tasks]);

  const onSubmit = () => {
    const formData = getValues();
    if (formData.newTask.trim() !== '') {
      const task = { text: formData.newTask, completed: false };
      addTask(task);
      reset();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>To-Do List</h1>
      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="newTask"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                className={styles.taskInput}
                type="text"
                placeholder="Enter a new task"
              />
            )}
          />
          <button className={styles.addButton} type="submit">
            Add Task
          </button>
        </form>
      </div>
      <ul className={styles.taskList}>
        {tasks.map((task, index) => (
          <TodoItem
            key={index}
            task={task}
            onToggle={() => toggleTaskCompletion(index)}
            onRemove={() => removeTask(index)}
            ref={(element) => {
              if (element) todoItemRefs.current[index] = element;
            }}
          />
        ))}
      </ul>
      <div className={styles.logPanel}>
        <h2>Log Panel</h2>
        <ul className={styles.logList}>
          {logs != null ? (
            <>
              {logs.map((item, index) => (
                <div key={index}>
                  <hr />
                  <div>To-Do List Updated</div>
                  {item.map((task, idx2) => (
                    <div key={idx2}>
                      <div>{task.text}</div>
                      <div>{task.completed ? 'completed' : 'none'}</div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
}
