'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Orb } from './Orb';
import { OrbitalAgent } from '../agents/OrbitalAgent';
import { Agent, ExecutionStatus } from '@/types/agent';
import { useAppStore } from '@/store/app-store';

interface OrbitSystemProps {
  agents: Agent[];
  status?: ExecutionStatus;
  orbitRadius?: number;
  onAgentSelect: (agent: Agent) => void;
  onOrbClick?: () => void;
}

export function OrbitSystem({
  agents,
  status = 'idle',
  orbitRadius = 180,
  onAgentSelect,
  onOrbClick,
}: OrbitSystemProps) {
  const { selectedAgent, viewState } = useAppStore();
  const isCollapsed = viewState !== 'orbit';

  // Calculate positions for each agent in a circle
  const getAgentPosition = (index: number, total: number) => {
    // Start from top (-90 degrees) and go clockwise
    const angleOffset = -90;
    const angle = angleOffset + (index * 360) / total;
    const radians = (angle * Math.PI) / 180;

    return {
      x: Math.cos(radians) * orbitRadius,
      y: Math.sin(radians) * orbitRadius,
    };
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Orbit path ring */}
      <motion.div
        className="absolute rounded-full border border-border/30"
        style={{
          width: orbitRadius * 2 + 60,
          height: orbitRadius * 2 + 60,
        }}
        animate={{
          opacity: isCollapsed ? 0 : 0.5,
          scale: isCollapsed ? 0.8 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Second orbit ring */}
      <motion.div
        className="absolute rounded-full border border-primary/10"
        style={{
          width: orbitRadius * 2 + 100,
          height: orbitRadius * 2 + 100,
        }}
        animate={{
          opacity: isCollapsed ? 0 : 0.3,
          scale: isCollapsed ? 0.7 : 1,
          rotate: 360,
        }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { duration: 0.5 },
          rotate: { duration: 120, repeat: Infinity, ease: 'linear' },
        }}
      />

      {/* Decorative dots on outer ring */}
      {!isCollapsed && (
        <motion.div
          className="absolute"
          style={{
            width: orbitRadius * 2 + 100,
            height: orbitRadius * 2 + 100,
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 90, 180, 270].map((angle) => (
            <div
              key={angle}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${angle}deg) translateX(${orbitRadius + 50}px) translate(-50%, -50%)`,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Central Orb */}
      <motion.div
        animate={{
          scale: isCollapsed ? 0.7 : 1,
        }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <Orb status={status} onClick={onOrbClick} />
      </motion.div>

      {/* Orbital Agents */}
      <AnimatePresence>
        {!isCollapsed &&
          agents.map((agent, index) => {
            const position = getAgentPosition(index, agents.length);
            return (
              <OrbitalAgent
                key={agent.id}
                agent={agent}
                position={position}
                index={index}
                onClick={onAgentSelect}
              />
            );
          })}
      </AnimatePresence>

      {/* Selected agent indicator */}
      <AnimatePresence>
        {selectedAgent && !isCollapsed && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute rounded-full border-2 border-accent"
              style={{
                width: orbitRadius * 2 + 140,
                height: orbitRadius * 2 + 140,
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
