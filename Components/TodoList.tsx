import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AddTodoForm, type Priority } from './AddTodoForm';
import { TodoFilters, type FilterType } from './TodoFilters';
import { TodoItem, type Todo } from './TodoItem';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

const STORAGE_KEY = 'mobile-todo-list';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  // Load todos from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedTodos = JSON.parse(saved).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, priority: Priority) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
      createdAt: new Date()
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'uncompleted':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  const sortedTodos = getFilteredTodos().sort((a, b) => {
    // Sort by completion status first (uncompleted first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then by priority (high first)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    
    // Finally by creation date (newest first)
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  const counts = {
    all: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    uncompleted: todos.filter(todo => !todo.completed).length
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="max-w-2xl mx-auto p-4 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AddTodoForm onAddTodo={addTodo} />
      
      <TodoFilters
        activeFilter={filter}
        onFilterChange={setFilter}
        counts={counts}
      />

      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {sortedTodos.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 bg-card/50">
                <CardContent className="p-8 text-center">
                  <motion.div 
                    className="text-6xl mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30,
                      delay: 0.2
                    }}
                  >
                    📝
                  </motion.div>
                  <motion.h3 
                    className="font-medium mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    No todos yet
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {filter === 'completed' && 'No completed tasks yet. Keep working!'}
                    {filter === 'uncompleted' && 'All tasks completed! Great job! 🎉'}
                    {filter === 'all' && 'Add your first todo to get started.'}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="todo-list"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-3 pr-4">
                  <AnimatePresence>
                    {sortedTodos.map((todo, index) => (
                      <motion.div
                        key={todo.id}
                        variants={itemVariants}
                        layout
                        transition={{ delay: index * 0.05 }}
                      >
                        <TodoItem
                          todo={todo}
                          onToggle={toggleTodo}
                          onDelete={deleteTodo}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {todos.length > 0 && (
        <motion.div 
          className="text-center text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.span
            key={`${counts.completed}-${counts.all}`}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {counts.completed} of {counts.all} tasks completed
          </motion.span>
          {counts.completed === counts.all && counts.all > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                className="block text-green-600 dark:text-green-400 mt-1"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                Great job! All tasks completed! 🎉
              </motion.span>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
