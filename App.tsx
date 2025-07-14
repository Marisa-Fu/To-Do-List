import { motion } from 'framer-motion';
import { ThemeProvider } from './components/ThemeProvider';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="todo-theme">
      <motion.div 
        className="min-h-screen bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <TodoHeader />
        <motion.main 
          className="pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <TodoList />
        </motion.main>
      </motion.div>
    </ThemeProvider>
  );
}
