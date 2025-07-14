import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import type { Priority } from './AddTodoForm';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    }
  };

  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
    }
  };

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          type: "spring", 
          stiffness: 500, 
          damping: 30,
          opacity: { duration: 0.2 }
        }
      }}
      exit={{ 
        opacity: 0, 
        y: -20, 
        scale: 0.9,
        transition: { duration: 0.2 }
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
    >
      <Card className={`transition-all duration-300 border-0 bg-card/50 ${todo.completed ? 'opacity-60' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <motion.div 
              className="flex-shrink-0 mt-0.5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={handleToggle}
                className="h-5 w-5"
              />
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between space-x-2">
                <motion.p 
                  className={`text-sm leading-relaxed ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
                  animate={todo.completed ? { 
                    scale: [1, 0.98, 1],
                    transition: { duration: 0.3 }
                  } : {}}
                >
                  {todo.text}
                </motion.p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDelete}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                  asChild
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { type: "spring", stiffness: 400, damping: 17 }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Badge variant="secondary" className={`text-xs ${getPriorityColor(todo.priority)}`}>
                    {getPriorityIcon(todo.priority)} {todo.priority}
                  </Badge>
                </motion.div>
                <motion.span 
                  className="text-xs text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {todo.createdAt.toLocaleDateString()}
                </motion.span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
