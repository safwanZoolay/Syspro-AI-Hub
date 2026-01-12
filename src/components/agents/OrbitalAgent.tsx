'use client';

import { motion } from 'framer-motion';
import { getIcon } from '@/lib/icons';
import { Agent } from '@/types/agent';
import { useAppStore } from '@/store/app-store';
import { categories } from '@/config/agents';

interface OrbitalAgentProps {
  agent: Agent;
  position: { x: number; y: number };
  index: number;
  onClick: (agent: Agent) => void;
}

export function OrbitalAgent({ agent, position, index, onClick }: OrbitalAgentProps) {
  const { hoveredAgentId, setHoveredAgentId, selectedAgent } = useAppStore();
  const isHovered = hoveredAgentId === agent.id;
  const isSelected = selectedAgent?.id === agent.id;

  // Get the icon component dynamically
  const IconComponent = getIcon(agent.icon);

  // Get category color
  const categoryColor = categories.find((c) => c.id === agent.categoryId)?.color || '#0090B5';

  return (
    <motion.div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: isSelected ? 0.8 : 1,
        x: isSelected ? 0 : 0,
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 200,
      }}
    >
      {/* Connection line to center */}
      <motion.div
        className="absolute"
        style={{
          width: Math.sqrt(position.x ** 2 + position.y ** 2) * 0.4,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${categoryColor}40, transparent)`,
          transformOrigin: 'left center',
          left: '50%',
          top: '50%',
          rotate: `${Math.atan2(-position.y, -position.x) * (180 / Math.PI)}deg`,
        }}
        animate={{
          opacity: isHovered ? 0.8 : 0.3,
        }}
      />

      {/* Agent node */}
      <motion.button
        className="relative flex flex-col items-center gap-2 focus:outline-none group"
        onMouseEnter={() => setHoveredAgentId(agent.id)}
        onMouseLeave={() => setHoveredAgentId(null)}
        onClick={() => onClick(agent)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-4 rounded-full"
          style={{
            background: `radial-gradient(circle, ${categoryColor}40 0%, transparent 70%)`,
          }}
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 1 : 0.5,
          }}
        />

        {/* Icon container */}
        <motion.div
          className="relative w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${categoryColor}20, ${categoryColor}40)`,
            border: `2px solid ${categoryColor}60`,
            boxShadow: isHovered
              ? `0 0 20px ${categoryColor}60, 0 0 40px ${categoryColor}30`
              : `0 0 10px ${categoryColor}30`,
          }}
          animate={{
            borderColor: isHovered ? categoryColor : `${categoryColor}60`,
            boxShadow: isHovered
              ? `0 0 20px ${categoryColor}60, 0 0 40px ${categoryColor}30`
              : `0 0 10px ${categoryColor}30`,
          }}
        >
          <IconComponent
            size={24}
            className="transition-colors duration-200"
            style={{ color: isHovered ? categoryColor : '#9CA3AF' }}
          />

          {/* Pulse ring on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${categoryColor}` }}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Agent name */}
        <motion.span
          className="text-xs font-medium whitespace-nowrap"
          style={{ color: isHovered ? categoryColor : '#9CA3AF' }}
          animate={{
            y: isHovered ? -2 : 0,
          }}
        >
          {agent.shortName}
        </motion.span>

        {/* Expanded info card on hover */}
        <motion.div
          className="absolute top-full mt-4 px-4 py-3 rounded-lg pointer-events-none"
          style={{
            background: 'rgba(17, 24, 39, 0.95)',
            border: `1px solid ${categoryColor}40`,
            boxShadow: `0 4px 20px rgba(0, 0, 0, 0.5), 0 0 20px ${categoryColor}20`,
            minWidth: 200,
          }}
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : -10,
            scale: isHovered ? 1 : 0.9,
          }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm font-semibold text-foreground mb-1">{agent.name}</p>
          <p className="text-xs text-foreground-secondary">{agent.description}</p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: `${categoryColor}20`,
                color: categoryColor,
              }}
            >
              {agent.categoryId}
            </span>
          </div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
