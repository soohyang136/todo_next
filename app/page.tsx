"use client"
import React from 'react';
import { TodoProvider } from './TodoContext'; // TodoProvider를 import
import Home from './Home'; // Home 컴포넌트를 import

function App() {
  return (
    <TodoProvider> {/* TodoProvider로 감싸기 */}
      <div className="App">
        <Home />
      </div>
    </TodoProvider>
  );
}

export default App;