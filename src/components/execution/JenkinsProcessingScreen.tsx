'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, CheckCircle2, Loader2 } from 'lucide-react';

interface JenkinsProcessingScreenProps {
  programName: string;
  companyId: string;
  onComplete: () => void;
  duration?: number; // Duration in ms before completing (default 60000 = 1 minute)
}

// Status messages that cycle through during processing
const processingMessages = [
  { text: 'Initializing Claude Code...', icon: '🤖' },
  { text: 'Connecting to SYSPRO environment...', icon: '🔗' },
  { text: 'Authenticating with eNet services...', icon: '🔐' },
  { text: 'Loading program metadata...', icon: '📋' },
  { text: 'Analyzing program structure...', icon: '🔍' },
  { text: 'Scanning business logic patterns...', icon: '🧠' },
  { text: 'Identifying test scenarios...', icon: '📊' },
  { text: 'Mapping data dependencies...', icon: '🗺️' },
  { text: 'Generating test framework...', icon: '⚙️' },
  { text: 'Creating test cases...', icon: '✏️' },
  { text: 'Validating test coverage...', icon: '✅' },
  { text: 'Running preliminary tests...', icon: '🧪' },
  { text: 'Restoring test datasets...', icon: '💾' },
  { text: 'Executing test suite...', icon: '▶️' },
  { text: 'Analyzing test results...', icon: '📈' },
  { text: 'Running regression tests...', icon: '🔄' },
  { text: 'Verifying data integrity...', icon: '🔒' },
  { text: 'Compiling test reports...', icon: '📝' },
  { text: 'Writing test documentation...', icon: '📖' },
  { text: 'Packaging test artifacts...', icon: '📦' },
  { text: 'Finalizing test folders...', icon: '📁' },
  { text: 'Performing cleanup operations...', icon: '🧹' },
  { text: 'Validating output files...', icon: '✔️' },
  { text: 'Preparing final report...', icon: '📄' },
];

export function JenkinsProcessingScreen({
  programName,
  companyId,
  onComplete,
  duration = 60000,
}: JenkinsProcessingScreenProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [logMessages, setLogMessages] = useState<{ time: string; text: string; icon: string }[]>([]);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Cycle through messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        const nextIndex = (prev + 1) % processingMessages.length;
        const message = processingMessages[nextIndex];
        const time = new Date().toLocaleTimeString();

        setLogMessages((logs) => {
          const newLogs = [...logs, { time, text: message.text, icon: message.icon }];
          // Keep only last 8 messages
          return newLogs.slice(-8);
        });

        return nextIndex;
      });
    }, 2500); // Change message every 2.5 seconds

    return () => clearInterval(messageInterval);
  }, []);

  // Progress bar
  useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval);
        setIsComplete(true);
        setTimeout(onComplete, 1500); // Small delay before completing
      }
    }, 100);

    return () => clearInterval(progressInterval);
  }, [duration, onComplete]);

  const currentMessage = processingMessages[currentMessageIndex];

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {/* Header */}
      <motion.div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 relative"
          style={{
            background: 'radial-gradient(circle, rgba(0, 144, 181, 0.3) 0%, transparent 70%)',
            border: '2px solid rgba(0, 144, 181, 0.6)',
          }}
        >
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px dashed rgba(164, 255, 255, 0.4)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner pulsing glow */}
          <motion.div
            className="absolute inset-2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 144, 181, 0.4) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {isComplete ? (
            <CheckCircle2 size={40} className="text-green-500 z-10" />
          ) : (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="z-10"
            >
              <Cpu size={40} className="text-[#0090B5]" />
            </motion.div>
          )}
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-2">
          Jenkins Test Creator
        </h2>
        <p className="text-gray-400 mb-1">
          Generating tests for <span className="text-[#A4FFFF] font-mono">{programName}</span>
        </p>
        <p className="text-gray-500 text-sm">
          Company: <span className="text-gray-400 font-mono">{companyId}</span>
        </p>
      </motion.div>

      {/* Current Status */}
      <motion.div
        className="flex items-center justify-center gap-3 mb-6"
        key={currentMessageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <span className="text-2xl">{currentMessage.icon}</span>
        <span className="text-lg font-medium text-[#A4FFFF]">
          {isComplete ? '✅ Complete!' : currentMessage.text}
        </span>
        {!isComplete && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 size={20} className="text-[#0090B5]" />
          </motion.div>
        )}
      </motion.div>

      {/* Progress bar */}
      <motion.div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: isComplete
                ? 'linear-gradient(90deg, #10B981, #34D399)'
                : 'linear-gradient(90deg, #0090B5, #A4FFFF)',
              boxShadow: isComplete
                ? '0 0 20px rgba(16, 185, 129, 0.6)'
                : '0 0 20px rgba(0, 144, 181, 0.6)',
              width: `${progress}%`,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Animated shimmer */}
          {!isComplete && (
            <motion.div
              className="absolute inset-0 h-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                width: '30%',
              }}
              animate={{ x: ['-100%', '400%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>
      </motion.div>

      {/* Activity Log */}
      <motion.div
        className="bg-gray-900/50 rounded-lg p-4 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Terminal size={16} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-400">Activity Log</span>
        </div>
        <div className="font-mono text-xs space-y-1.5 max-h-48 overflow-y-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span className="text-green-500">[{new Date().toLocaleTimeString()}]</span>{' '}
            <span className="text-gray-400">Agent initialized for {programName}</span>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {logMessages.map((log, index) => (
              <motion.div
                key={`${log.time}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-[#0090B5]">[{log.time}]</span>{' '}
                <span className="mr-1">{log.icon}</span>
                <span className="text-gray-300">{log.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {!isComplete && (
            <motion.div
              className="flex items-center gap-2 text-[#A4FFFF]"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span>●</span> Processing...
            </motion.div>
          )}

          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500"
            >
              <span>[{new Date().toLocaleTimeString()}]</span> ✅ All tasks completed successfully!
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Estimated time */}
      {!isComplete && (
        <motion.p
          className="text-center text-gray-500 text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Estimated time remaining: {Math.max(0, Math.ceil((duration - (progress / 100) * duration) / 1000))}s
        </motion.p>
      )}
    </motion.div>
  );
}
