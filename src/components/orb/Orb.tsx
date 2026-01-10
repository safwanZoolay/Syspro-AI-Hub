'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/app-store';
import { ExecutionStatus } from '@/types/agent';

interface OrbProps {
  status?: ExecutionStatus;
  size?: number;
  onClick?: () => void;
}

export function Orb({ status = 'idle', size = 160, onClick }: OrbProps) {
  const { isOrbHovered, setIsOrbHovered, selectedAgent } = useAppStore();

  const getStatusColor = () => {
    switch (status) {
      case 'running':
      case 'processing':
        return {
          core: '#A4FFFF',
          glow: 'rgba(164, 255, 255, 0.6)',
          pulse: 'rgba(164, 255, 255, 0.3)',
        };
      case 'complete':
        return {
          core: '#10B981',
          glow: 'rgba(16, 185, 129, 0.6)',
          pulse: 'rgba(16, 185, 129, 0.3)',
        };
      case 'error':
        return {
          core: '#EF4444',
          glow: 'rgba(239, 68, 68, 0.6)',
          pulse: 'rgba(239, 68, 68, 0.3)',
        };
      default:
        return {
          core: '#0090B5',
          glow: 'rgba(0, 144, 181, 0.6)',
          pulse: 'rgba(164, 255, 255, 0.4)',
        };
    }
  };

  const colors = getStatusColor();
  const isActive = status === 'running' || status === 'processing';

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsOrbHovered(true)}
      onMouseLeave={() => setIsOrbHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${colors.pulse} 0%, transparent 70%)`,
        }}
        animate={{
          scale: isActive ? [1, 1.3, 1] : isOrbHovered ? [1, 1.15, 1] : [1, 1.1, 1],
          opacity: isActive ? [0.6, 0.2, 0.6] : [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: isActive ? 1.5 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Second glow layer */}
      <motion.div
        className="absolute inset-4 rounded-full"
        style={{
          background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Core orb */}
      <motion.div
        className="absolute inset-8 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${colors.core}, ${colors.core}88 50%, ${colors.core}44 100%)`,
          boxShadow: `
            0 0 20px ${colors.glow},
            0 0 40px ${colors.glow},
            0 0 60px ${colors.pulse},
            inset 0 0 20px rgba(255, 255, 255, 0.1)
          `,
        }}
        animate={{
          boxShadow: isActive
            ? [
                `0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}, 0 0 60px ${colors.pulse}, inset 0 0 20px rgba(255, 255, 255, 0.1)`,
                `0 0 40px ${colors.glow}, 0 0 80px ${colors.glow}, 0 0 120px ${colors.pulse}, inset 0 0 30px rgba(255, 255, 255, 0.2)`,
                `0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}, 0 0 60px ${colors.pulse}, inset 0 0 20px rgba(255, 255, 255, 0.1)`,
              ]
            : undefined,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Inner highlight */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: '25%',
          left: '25%',
          width: '20%',
          height: '20%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
        }}
      />

      {/* Rotating ring for active state */}
      {isActive && (
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: colors.core,
            borderRightColor: colors.core,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Center text/icon area */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-[10px] font-medium text-white/90 text-center px-4 leading-tight"
          animate={{
            opacity: isOrbHovered || selectedAgent ? [0.9, 1, 0.9] : 0.7,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {selectedAgent
            ? selectedAgent.shortName
            : status === 'idle'
              ? 'Select an agent to begin'
              : status.toUpperCase()}
        </motion.span>
      </div>

      {/* Particle effects for active state */}
      {isActive && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: colors.core,
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos((i * 60 * Math.PI) / 180) * 80],
                y: [0, Math.sin((i * 60 * Math.PI) / 180) * 80],
                opacity: [1, 0],
                scale: [1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}
