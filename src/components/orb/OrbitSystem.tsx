'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Orb } from './Orb';
import { Agent, Category, ExecutionStatus } from '@/types/agent';
import { useAppStore } from '@/store/app-store';
import { getIcon } from '@/lib/icons';
import { getAgentsByCategory } from '@/config/agents';

interface OrbitSystemProps {
  categories: Category[];
  status?: ExecutionStatus;
  categoryOrbitRadius?: number;
  agentOrbitRadius?: number;
  onAgentSelect: (agent: Agent) => void;
  onOrbClick?: () => void;
}

export function OrbitSystem({
  categories,
  status = 'idle',
  categoryOrbitRadius = 200,
  agentOrbitRadius = 85,
  onAgentSelect,
  onOrbClick,
}: OrbitSystemProps) {
  const { viewState, expandedCategoryId, setExpandedCategoryId } = useAppStore();
  const isCollapsed = viewState !== 'orbit';

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

  // Get agents for a category
  const getCategoryAgents = (categoryId: Category['id']) => {
    return getAgentsByCategory(categoryId);
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: 600, height: 600 }}>
      {/* Outer decorative ring */}
      <motion.div
        className="absolute rounded-full border border-border/20"
        style={{
          width: categoryOrbitRadius * 2 + 160,
          height: categoryOrbitRadius * 2 + 160,
        }}
        animate={{
          opacity: isCollapsed ? 0 : 0.3,
          scale: isCollapsed ? 0.8 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Main orbit path ring */}
      <motion.div
        className="absolute rounded-full border border-primary/20"
        style={{
          width: categoryOrbitRadius * 2 + 60,
          height: categoryOrbitRadius * 2 + 60,
        }}
        animate={{
          opacity: isCollapsed ? 0 : 0.5,
          scale: isCollapsed ? 0.8 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Rotating decoration */}
      {!isCollapsed && (
        <motion.div
          className="absolute"
          style={{
            width: categoryOrbitRadius * 2 + 160,
            height: categoryOrbitRadius * 2 + 160,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <div
              key={angle}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${angle}deg) translateX(${categoryOrbitRadius + 80}px) translate(-50%, -50%)`,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Central Orb */}
      <motion.div
        className="absolute z-10"
        animate={{
          scale: isCollapsed ? 0.7 : 1,
        }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <Orb status={status} onClick={onOrbClick} />
      </motion.div>

      {/* Category Nodes */}
      <AnimatePresence>
        {!isCollapsed &&
          categories.map((category, index) => {
            const position = getCirclePosition(index, categories.length, categoryOrbitRadius);
            const isExpanded = expandedCategoryId === category.id;
            const categoryAgents = getCategoryAgents(category.id);
            const CategoryIcon = getIcon(category.icon);

            return (
              <motion.div
                key={category.id}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: position.x - 30,
                  y: position.y - 30,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                {/* Category Node */}
                <motion.div
                  className="relative w-[60px] h-[60px] cursor-pointer group"
                  onMouseEnter={() => setExpandedCategoryId(category.id)}
                  onMouseLeave={() => setExpandedCategoryId(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Category glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${category.color}40 0%, transparent 70%)`,
                    }}
                    animate={{
                      scale: isExpanded ? [1, 1.3, 1.2] : [1, 1.1, 1],
                      opacity: isExpanded ? 0.8 : 0.4,
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Category circle */}
                  <motion.div
                    className="absolute inset-0 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${category.color}30, ${category.color}10)`,
                      border: `2px solid ${category.color}60`,
                      boxShadow: isExpanded
                        ? `0 0 20px ${category.color}50, 0 0 40px ${category.color}30`
                        : `0 0 10px ${category.color}30`,
                    }}
                    animate={{
                      borderColor: isExpanded ? category.color : `${category.color}60`,
                    }}
                  >
                    <CategoryIcon
                      size={24}
                      style={{ color: category.color }}
                      className="drop-shadow-lg"
                    />
                  </motion.div>

                  {/* Category label */}
                  <motion.div
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{
                        color: category.color,
                        background: `${category.color}15`,
                      }}
                    >
                      {category.shortName}
                    </span>
                  </motion.div>

                  {/* Agent count badge */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: category.color,
                      color: '#fff',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {categoryAgents.length}
                  </motion.div>

                  {/* Expanded Agents */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="absolute"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {categoryAgents.map((agent, agentIndex) => {
                          const agentPos = getCirclePosition(
                            agentIndex,
                            categoryAgents.length,
                            agentOrbitRadius,
                            position.angle > 0 ? -90 : 90
                          );
                          const AgentIcon = getIcon(agent.icon);

                          return (
                            <motion.div
                              key={agent.id}
                              className="absolute cursor-pointer"
                              style={{
                                left: '50%',
                                top: '50%',
                              }}
                              initial={{
                                opacity: 0,
                                scale: 0,
                                x: 0,
                                y: 0,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                x: agentPos.x - 20,
                                y: agentPos.y - 20,
                              }}
                              exit={{
                                opacity: 0,
                                scale: 0,
                                x: 0,
                                y: 0,
                              }}
                              transition={{
                                duration: 0.3,
                                delay: agentIndex * 0.03,
                                type: 'spring',
                                stiffness: 300,
                                damping: 20,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onAgentSelect(agent);
                              }}
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {/* Agent node */}
                              <motion.div
                                className="w-10 h-10 rounded-full flex items-center justify-center relative group/agent"
                                style={{
                                  background: `linear-gradient(135deg, ${category.color}25, ${category.color}10)`,
                                  border: `1.5px solid ${category.color}50`,
                                  boxShadow: `0 0 10px ${category.color}20`,
                                }}
                                whileHover={{
                                  boxShadow: `0 0 20px ${category.color}40`,
                                  borderColor: category.color,
                                }}
                              >
                                <AgentIcon
                                  size={16}
                                  style={{ color: category.color }}
                                />

                                {/* Agent tooltip */}
                                <div
                                  className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/agent:opacity-100 transition-opacity pointer-events-none"
                                >
                                  <div
                                    className="px-2 py-1 rounded-lg text-[10px] whitespace-nowrap"
                                    style={{
                                      background: 'rgba(0,0,0,0.9)',
                                      border: `1px solid ${category.color}40`,
                                      color: '#fff',
                                    }}
                                  >
                                    {agent.shortName}
                                  </div>
                                </div>
                              </motion.div>
                            </motion.div>
                          );
                        })}

                        {/* Connection lines to agents */}
                        <svg
                          className="absolute pointer-events-none"
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: agentOrbitRadius * 2 + 40,
                            height: agentOrbitRadius * 2 + 40,
                            overflow: 'visible',
                          }}
                        >
                          {categoryAgents.map((agent, agentIndex) => {
                            const agentPos = getCirclePosition(
                              agentIndex,
                              categoryAgents.length,
                              agentOrbitRadius,
                              position.angle > 0 ? -90 : 90
                            );
                            return (
                              <motion.line
                                key={agent.id}
                                x1={agentOrbitRadius + 20}
                                y1={agentOrbitRadius + 20}
                                x2={agentPos.x + agentOrbitRadius + 20}
                                y2={agentPos.y + agentOrbitRadius + 20}
                                stroke={category.color}
                                strokeWidth="1"
                                strokeOpacity="0.3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                exit={{ pathLength: 0 }}
                                transition={{ duration: 0.3, delay: agentIndex * 0.02 }}
                              />
                            );
                          })}
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* Connection lines from center to categories */}
      {!isCollapsed && (
        <svg
          className="absolute pointer-events-none"
          style={{
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
          }}
        >
          {categories.map((category, index) => {
            const position = getCirclePosition(index, categories.length, categoryOrbitRadius);
            const isExpanded = expandedCategoryId === category.id;
            return (
              <motion.line
                key={category.id}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${position.x}px)`}
                y2={`calc(50% + ${position.y}px)`}
                stroke={category.color}
                strokeWidth={isExpanded ? "2" : "1"}
                strokeOpacity={isExpanded ? "0.5" : "0.15"}
                strokeDasharray="4 4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
}
