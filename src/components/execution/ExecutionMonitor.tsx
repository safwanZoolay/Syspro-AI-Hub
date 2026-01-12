'use client';

import { motion } from 'framer-motion';
import {
  getIcon,
  Circle,
  Clock,
  Loader2,
  Cpu,
  CheckCircle2,
  XCircle,
  Check,
  Terminal
} from '@/lib/icons';
import { ExecutionRun, ExecutionStatus, Agent } from '@/types/agent';
import { categories } from '@/config/agents';
import { LucideIcon } from 'lucide-react';

interface ExecutionMonitorProps {
  execution: ExecutionRun;
  agent: Agent;
  onCancel?: () => void;
}

const statusConfig: Record<ExecutionStatus, { label: string; icon: LucideIcon; color: string }> = {
  idle: { label: 'Idle', icon: Circle, color: '#6B7280' },
  queued: { label: 'Queued', icon: Clock, color: '#F59E0B' },
  running: { label: 'Running', icon: Loader2, color: '#0090B5' },
  processing: { label: 'Processing', icon: Cpu, color: '#A4FFFF' },
  complete: { label: 'Complete', icon: CheckCircle2, color: '#10B981' },
  error: { label: 'Error', icon: XCircle, color: '#EF4444' },
};

export function ExecutionMonitor({ execution, agent, onCancel }: ExecutionMonitorProps) {
  const status = statusConfig[execution.status];
  const StatusIcon = status.icon;
  const AgentIcon = getIcon(agent.icon);
  const categoryColor = categories.find((c) => c.id === agent.categoryId)?.color || '#0090B5';

  const isActive = execution.status === 'running' || execution.status === 'processing';
  const progress = execution.progress || 0;

  // Timeline steps
  const steps = [
    { status: 'queued', label: 'Queued' },
    { status: 'running', label: 'Running' },
    { status: 'processing', label: 'Processing' },
    { status: 'complete', label: 'Complete' },
  ];

  const getCurrentStepIndex = () => {
    const statusOrder = ['idle', 'queued', 'running', 'processing', 'complete'];
    return statusOrder.indexOf(execution.status);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
          style={{
            background: `radial-gradient(circle, ${categoryColor}30 0%, transparent 70%)`,
            border: `2px solid ${categoryColor}60`,
          }}
          animate={
            isActive
              ? {
                  boxShadow: [
                    `0 0 20px ${categoryColor}40`,
                    `0 0 40px ${categoryColor}60`,
                    `0 0 20px ${categoryColor}40`,
                  ],
                }
              : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <AgentIcon size={36} style={{ color: categoryColor }} />
        </motion.div>

        <h2 className="text-2xl font-bold text-foreground mb-2">{agent.name}</h2>
        <p className="text-foreground-secondary">{execution.statusMessage || 'Processing your request...'}</p>
      </motion.div>

      {/* Status indicator */}
      <motion.div
        className="flex items-center justify-center gap-3 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          animate={execution.status === 'running' ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <StatusIcon size={24} style={{ color: status.color }} />
        </motion.div>
        <span className="text-lg font-medium" style={{ color: status.color }}>
          {status.label}
        </span>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between text-sm text-foreground-secondary mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-background-surface rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}CC)`,
              boxShadow: `0 0 10px ${categoryColor}60`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Animated progress glow */}
        {isActive && (
          <motion.div
            className="h-2 rounded-full mt-[-8px] opacity-50"
            style={{
              background: `linear-gradient(90deg, transparent, ${categoryColor}, transparent)`,
            }}
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const stepColor = isCompleted
            ? '#10B981'
            : isCurrent
              ? categoryColor
              : '#374151';

          return (
            <div key={step.status} className="flex flex-col items-center flex-1">
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                style={{
                  background: isCompleted
                    ? stepColor
                    : isCurrent
                      ? `${stepColor}30`
                      : 'transparent',
                  border: `2px solid ${stepColor}`,
                }}
                animate={
                  isCurrent
                    ? {
                        boxShadow: [
                          `0 0 0px ${stepColor}`,
                          `0 0 15px ${stepColor}`,
                          `0 0 0px ${stepColor}`,
                        ],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {isCompleted ? (
                  <Check size={20} className="text-white" />
                ) : (
                  <span className="text-sm font-medium" style={{ color: stepColor }}>
                    {index + 1}
                  </span>
                )}
              </motion.div>
              <span
                className="text-xs font-medium"
                style={{ color: isCompleted || isCurrent ? stepColor : '#6B7280' }}
              >
                {step.label}
              </span>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className="absolute h-0.5 w-full"
                  style={{
                    background: index < currentStepIndex ? '#10B981' : '#374151',
                    left: `${((index + 0.5) / steps.length) * 100}%`,
                    width: `${100 / steps.length}%`,
                    top: '20px',
                  }}
                />
              )}
            </div>
          );
        })}
      </motion.div>

      {/* Activity log */}
      <motion.div
        className="bg-background-surface rounded-lg p-4 border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Terminal size={16} className="text-foreground-muted" />
          <span className="text-sm font-medium text-foreground-secondary">Activity Log</span>
        </div>
        <div className="font-mono text-xs text-foreground-muted space-y-1 max-h-32 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-success">[{new Date(execution.startedAt).toLocaleTimeString()}]</span>{' '}
            Agent initialized
          </motion.div>
          {execution.status !== 'queued' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-primary">[{new Date().toLocaleTimeString()}]</span>{' '}
              {execution.statusMessage || 'Processing...'}
            </motion.div>
          )}
          {isActive && (
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-accent">●</span> Awaiting response...
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Cancel button */}
      {isActive && onCancel && (
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={onCancel}
            className="text-sm text-foreground-muted hover:text-error transition-colors"
          >
            Cancel execution
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
