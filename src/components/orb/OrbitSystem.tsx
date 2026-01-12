'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Orb } from './Orb';
import { Agent, Category, ExecutionStatus } from '@/types/agent';
import { useAppStore } from '@/store/app-store';
import { getIcon, ArrowLeft } from '@/lib/icons';
import { getAgentsByCategory } from '@/config/agents';

interface OrbitSystemProps {
  categories: Category[];
  status?: ExecutionStatus;
  orbitRadius?: number;
  onAgentSelect: (agent: Agent) => void;
  onOrbClick?: () => void;
}

export function OrbitSystem({
  categories,
  status = 'idle',
  orbitRadius = 220,
  onAgentSelect,
  onOrbClick,
}: OrbitSystemProps) {
  const { viewState, expandedCategoryId, setExpandedCategoryId } = useAppStore();
  const isCollapsed = viewState !== 'orbit';

  // Get selected category
  const selectedCategory = expandedCategoryId
    ? categories.find((c) => c.id === expandedCategoryId)
    : null;

  // Get agents for selected category
  const categoryAgents = selectedCategory
    ? getAgentsByCategory(selectedCategory.id)
    : [];

  // Calculate position for a node in a circle
  const getCirclePosition = (index: number, total: number, radius: number, startAngle = -90) => {
    const angle = startAngle + (index * 360) / total;
    const radians = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radians) * radius,
      y: Math.sin(radians) * radius,
      angle,
    };
  };

  // Handle back to categories
  const handleBackToCategories = () => {
    setExpandedCategoryId(null);
  };

  // Handle category selection
  const handleCategoryClick = (categoryId: Category['id']) => {
    setExpandedCategoryId(categoryId);
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: 650, height: 650 }}>
      {/* Outer decorative ring */}
      <motion.div
        className="absolute rounded-full border border-border/20"
        style={{
          width: orbitRadius * 2 + 140,
          height: orbitRadius * 2 + 140,
        }}
        animate={{
          opacity: isCollapsed ? 0 : 0.3,
          scale: isCollapsed ? 0.8 : 1,
          borderColor: selectedCategory ? `${selectedCategory.color}30` : undefined,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Main orbit path ring */}
      <motion.div
        className="absolute rounded-full border-2"
        style={{
          width: orbitRadius * 2 + 60,
          height: orbitRadius * 2 + 60,
          borderColor: selectedCategory ? `${selectedCategory.color}40` : 'rgba(0, 144, 181, 0.2)',
        }}
        animate={{
          opacity: isCollapsed ? 0 : 0.6,
          scale: isCollapsed ? 0.8 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Inner orbit ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          width: orbitRadius * 2 - 60,
          height: orbitRadius * 2 - 60,
          borderColor: selectedCategory ? `${selectedCategory.color}20` : 'rgba(0, 144, 181, 0.1)',
        }}
        animate={{
          opacity: isCollapsed ? 0 : 0.4,
          scale: isCollapsed ? 0.8 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Rotating decoration particles */}
      {!isCollapsed && (
        <motion.div
          className="absolute"
          style={{
            width: orbitRadius * 2 + 140,
            height: orbitRadius * 2 + 140,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <div
              key={angle}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${angle}deg) translateX(${orbitRadius + 70}px) translate(-50%, -50%)`,
                background: selectedCategory ? selectedCategory.color : '#0090B5',
                opacity: 0.4,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* CATEGORY VIEW - Central Orb */}
      <AnimatePresence mode="wait">
        {!selectedCategory && (
          <motion.div
            key="main-orb"
            className="absolute z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: isCollapsed ? 0.7 : 1,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, type: 'spring' }}
          >
            <Orb status={status} onClick={onOrbClick} />
          </motion.div>
        )}

        {/* AGENT VIEW - Category as Center */}
        {selectedCategory && (
          <motion.div
            key="category-center"
            className="absolute z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, type: 'spring' }}
          >
            {/* Back button */}
            <motion.button
              className="absolute -top-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: `${selectedCategory.color}15`,
                border: `1px solid ${selectedCategory.color}40`,
                color: selectedCategory.color,
              }}
              onClick={handleBackToCategories}
              whileHover={{
                scale: 1.05,
                background: `${selectedCategory.color}25`,
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ArrowLeft size={16} />
              Back to Categories
            </motion.button>

            {/* Category center node */}
            <motion.div
              className="relative w-32 h-32 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: `radial-gradient(circle, ${selectedCategory.color}30 0%, ${selectedCategory.color}10 50%, transparent 70%)`,
                border: `3px solid ${selectedCategory.color}`,
                boxShadow: `0 0 40px ${selectedCategory.color}40, 0 0 80px ${selectedCategory.color}20, inset 0 0 40px ${selectedCategory.color}20`,
              }}
              animate={{
                boxShadow: [
                  `0 0 40px ${selectedCategory.color}40, 0 0 80px ${selectedCategory.color}20, inset 0 0 40px ${selectedCategory.color}20`,
                  `0 0 60px ${selectedCategory.color}50, 0 0 100px ${selectedCategory.color}30, inset 0 0 50px ${selectedCategory.color}30`,
                  `0 0 40px ${selectedCategory.color}40, 0 0 80px ${selectedCategory.color}20, inset 0 0 40px ${selectedCategory.color}20`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {(() => {
                const CategoryIcon = getIcon(selectedCategory.icon);
                return (
                  <CategoryIcon
                    size={48}
                    style={{ color: selectedCategory.color }}
                    className="drop-shadow-lg"
                  />
                );
              })()}
            </motion.div>

            {/* Category name */}
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2
                className="text-xl font-bold"
                style={{ color: selectedCategory.color }}
              >
                {selectedCategory.name}
              </h2>
              <p className="text-sm text-foreground-secondary mt-1">
                {categoryAgents.length} agents available
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CATEGORY VIEW - Category Nodes orbiting center */}
      <AnimatePresence>
        {!isCollapsed && !selectedCategory &&
          categories.map((category, index) => {
            const position = getCirclePosition(index, categories.length, orbitRadius);
            const CategoryIcon = getIcon(category.icon);
            const agentCount = getAgentsByCategory(category.id).length;

            return (
              <motion.div
                key={category.id}
                className="absolute z-20"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: position.x,
                  y: position.y,
                }}
                exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                {/* Category Node */}
                <motion.button
                  className="relative flex flex-col items-center -translate-x-1/2 -translate-y-1/2 focus:outline-none group"
                  onClick={() => handleCategoryClick(category.id)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-4 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${category.color}30 0%, transparent 70%)`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Category circle */}
                  <motion.div
                    className="relative w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${category.color}25, ${category.color}10)`,
                      border: `2px solid ${category.color}60`,
                      boxShadow: `0 0 15px ${category.color}30`,
                    }}
                    whileHover={{
                      borderColor: category.color,
                      boxShadow: `0 0 30px ${category.color}50, 0 0 60px ${category.color}25`,
                    }}
                  >
                    <CategoryIcon
                      size={28}
                      style={{ color: category.color }}
                      className="drop-shadow-lg"
                    />

                    {/* Pulse effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                      style={{ border: `2px solid ${category.color}` }}
                      initial={{ scale: 1 }}
                      whileHover={{
                        scale: [1, 1.3, 1],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Category label */}
                  <motion.span
                    className="mt-2 text-xs font-semibold whitespace-nowrap px-2 py-1 rounded-full"
                    style={{
                      color: category.color,
                      background: `${category.color}15`,
                    }}
                  >
                    {category.shortName}
                  </motion.span>

                  {/* Agent count badge */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                    style={{
                      background: category.color,
                      color: '#fff',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    {agentCount}
                  </motion.div>
                </motion.button>
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* AGENT VIEW - Agent Nodes orbiting category center */}
      <AnimatePresence>
        {!isCollapsed && selectedCategory &&
          categoryAgents.map((agent, index) => {
            const position = getCirclePosition(index, categoryAgents.length, orbitRadius);
            const AgentIcon = getIcon(agent.icon);

            return (
              <motion.div
                key={agent.id}
                className="absolute z-20"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: position.x,
                  y: position.y,
                }}
                exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.04,
                  type: 'spring',
                  stiffness: 250,
                  damping: 20,
                }}
              >
                {/* Agent Node */}
                <motion.button
                  className="relative flex flex-col items-center -translate-x-1/2 -translate-y-1/2 focus:outline-none group"
                  onClick={() => onAgentSelect(agent)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `radial-gradient(circle, ${selectedCategory.color}40 0%, transparent 70%)`,
                    }}
                  />

                  {/* Agent circle */}
                  <motion.div
                    className="relative w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${selectedCategory.color}20, ${selectedCategory.color}08)`,
                      border: `2px solid ${selectedCategory.color}50`,
                      boxShadow: `0 0 12px ${selectedCategory.color}25`,
                    }}
                    whileHover={{
                      borderColor: selectedCategory.color,
                      boxShadow: `0 0 25px ${selectedCategory.color}50`,
                      background: `linear-gradient(135deg, ${selectedCategory.color}30, ${selectedCategory.color}15)`,
                    }}
                  >
                    <AgentIcon
                      size={24}
                      className="transition-colors"
                      style={{ color: selectedCategory.color }}
                    />
                  </motion.div>

                  {/* Agent name */}
                  <motion.span
                    className="mt-2 text-xs font-medium whitespace-nowrap max-w-[100px] truncate text-center"
                    style={{ color: selectedCategory.color }}
                  >
                    {agent.shortName}
                  </motion.span>

                  {/* Expanded tooltip on hover */}
                  <motion.div
                    className="absolute top-full mt-6 px-4 py-3 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50"
                    style={{
                      background: 'rgba(10, 15, 25, 0.95)',
                      border: `1px solid ${selectedCategory.color}40`,
                      boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px ${selectedCategory.color}15`,
                      minWidth: 220,
                    }}
                  >
                    <p className="text-sm font-semibold text-foreground mb-1">{agent.name}</p>
                    <p className="text-xs text-foreground-secondary leading-relaxed">{agent.description}</p>
                    <div className="mt-2 pt-2 border-t border-border/30">
                      <span className="text-[10px] text-foreground-muted">Click to configure</span>
                    </div>
                  </motion.div>
                </motion.button>
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* Connection lines - Category View */}
      {!isCollapsed && !selectedCategory && (
        <svg
          className="absolute pointer-events-none"
          style={{
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
          }}
        >
          <defs>
            {categories.map((category) => (
              <linearGradient
                key={`grad-${category.id}`}
                id={`line-gradient-${category.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={category.color} stopOpacity="0" />
                <stop offset="50%" stopColor={category.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={category.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {categories.map((category, index) => {
            const position = getCirclePosition(index, categories.length, orbitRadius);
            return (
              <motion.line
                key={category.id}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${position.x}px)`}
                y2={`calc(50% + ${position.y}px)`}
                stroke={`url(#line-gradient-${category.id})`}
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              />
            );
          })}
        </svg>
      )}

      {/* Connection lines - Agent View */}
      {!isCollapsed && selectedCategory && (
        <svg
          className="absolute pointer-events-none"
          style={{
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
          }}
        >
          <defs>
            <linearGradient
              id="agent-line-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={selectedCategory.color} stopOpacity="0.1" />
              <stop offset="50%" stopColor={selectedCategory.color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={selectedCategory.color} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {categoryAgents.map((agent, index) => {
            const position = getCirclePosition(index, categoryAgents.length, orbitRadius);
            return (
              <motion.line
                key={agent.id}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${position.x}px)`}
                y2={`calc(50% + ${position.y}px)`}
                stroke="url(#agent-line-gradient)"
                strokeWidth="1"
                strokeDasharray="6 4"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
}
