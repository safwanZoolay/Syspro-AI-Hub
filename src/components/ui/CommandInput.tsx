'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getIcon, Sparkles, X, Command, ArrowRight } from '@/lib/icons';
import { Agent } from '@/types/agent';
import { useAppStore } from '@/store/app-store';
import { categories, getCategoryById } from '@/config/agents';

interface CommandInputProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent) => void;
  placeholder?: string;
}

export function CommandInput({
  agents,
  onAgentSelect,
  placeholder = 'Search agents...',
}: CommandInputProps) {
  const { commandInput, setCommandInput } = useAppStore();
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Agent[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter agents based on input
  useEffect(() => {
    if (commandInput.trim()) {
      const query = commandInput.toLowerCase();
      const filtered = agents.filter(
        (agent) =>
          agent.name.toLowerCase().includes(query) ||
          agent.shortName.toLowerCase().includes(query) ||
          agent.description.toLowerCase().includes(query) ||
          agent.categoryId.toLowerCase().includes(query)
      );
      setSuggestions(filtered.slice(0, 8)); // Limit to 8 suggestions
    } else {
      setSuggestions([]);
    }
  }, [commandInput, agents]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
    if (e.key === 'Enter' && suggestions.length === 1) {
      onAgentSelect(suggestions[0]);
      setCommandInput('');
      setIsFocused(false);
    }
  };

  const getAgentCategoryColor = (agent: Agent) => {
    const category = getCategoryById(agent.categoryId);
    return category?.color || '#0090B5';
  };

  return (
    <motion.div
      className="relative w-full max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Input container */}
      <motion.div
        className={`
          relative flex items-center gap-3 px-4 py-3
          bg-background-surface rounded-xl border
          transition-all duration-300
          ${isFocused ? 'border-primary shadow-lg shadow-primary/20' : 'border-border hover:border-border-hover'}
        `}
        animate={{
          boxShadow: isFocused
            ? '0 0 20px rgba(0, 144, 181, 0.2), 0 4px 20px rgba(0, 0, 0, 0.3)'
            : '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Sparkles
          size={20}
          className={`transition-colors duration-200 ${isFocused ? 'text-primary' : 'text-foreground-muted'}`}
        />

        <input
          ref={inputRef}
          type="text"
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-foreground placeholder-foreground-muted"
        />

        {commandInput && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setCommandInput('')}
            className="p-1 rounded-md hover:bg-background-elevated transition-colors"
          >
            <X size={16} className="text-foreground-muted" />
          </motion.button>
        )}

        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-background-elevated text-xs text-foreground-muted">
          <Command size={12} />
          <span>K</span>
        </div>
      </motion.div>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            className="absolute bottom-full left-0 right-0 mb-2 bg-background-surface border border-border rounded-xl shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {suggestions.map((agent, index) => {
              const IconComponent = getIcon(agent.icon);
              const categoryColor = getAgentCategoryColor(agent);
              const category = getCategoryById(agent.categoryId);

              return (
                <motion.button
                  key={agent.id}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-background-elevated transition-colors text-left"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => {
                    onAgentSelect(agent);
                    setCommandInput('');
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${categoryColor}20`,
                      border: `1px solid ${categoryColor}40`,
                    }}
                  >
                    <IconComponent size={20} style={{ color: categoryColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{agent.name}</p>
                    <p className="text-xs text-foreground-muted truncate">{category?.shortName}</p>
                  </div>
                  <ArrowRight size={16} className="text-foreground-muted flex-shrink-0" />
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick tips - show categories */}
      <AnimatePresence>
        {isFocused && !commandInput && (
          <motion.div
            className="absolute bottom-full left-0 right-0 mb-2 bg-background-surface border border-border rounded-xl shadow-xl p-4 z-50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <p className="text-xs text-foreground-muted mb-3">Categories ({agents.length} agents)</p>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCommandInput(cat.shortName);
                  }}
                  className="px-3 py-1.5 rounded-lg text-sm transition-all hover:scale-105"
                  style={{
                    background: `${cat.color}15`,
                    color: cat.color,
                    border: `1px solid ${cat.color}30`,
                  }}
                >
                  {cat.shortName}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
