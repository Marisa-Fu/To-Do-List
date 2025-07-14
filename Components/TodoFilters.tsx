import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export type FilterType = 'all' | 'completed' | 'uncompleted';

interface TodoFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    completed: number;
    uncompleted: number;
  };
}

export function TodoFilters({ activeFilter, onFilterChange, counts }: TodoFiltersProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Tabs value={activeFilter} onValueChange={(value: string) => onFilterChange(value as FilterType)}>
        <TabsList className="grid w-full grid-cols-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <TabsTrigger value="all" className="text-xs sm:text-sm w-full">
              All ({counts.all})
            </TabsTrigger>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <TabsTrigger value="uncompleted" className="text-xs sm:text-sm w-full">
              Active ({counts.uncompleted})
            </TabsTrigger>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <TabsTrigger value="completed" className="text-xs sm:text-sm w-full">
              Done ({counts.completed})
            </TabsTrigger>
          </motion.div>
        </TabsList>
      </Tabs>
    </motion.div>
  );
}
