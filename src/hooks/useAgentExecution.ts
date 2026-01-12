'use client';

import { useState, useCallback } from 'react';
import { Agent, ExecutionStatus } from '@/types/agent';

interface ExecutionState {
  isExecuting: boolean;
  status: ExecutionStatus;
  progress: number;
  statusMessage: string;
  result: unknown | null;
  error: string | null;
  executionId: string | null;
}

interface UseAgentExecutionReturn extends ExecutionState {
  executeAgent: (agent: Agent, inputs: Record<string, unknown>) => Promise<void>;
  reset: () => void;
}

const initialState: ExecutionState = {
  isExecuting: false,
  status: 'idle',
  progress: 0,
  statusMessage: '',
  result: null,
  error: null,
  executionId: null,
};

export function useAgentExecution(): UseAgentExecutionReturn {
  const [state, setState] = useState<ExecutionState>(initialState);

  const executeAgent = useCallback(async (agent: Agent, inputs: Record<string, unknown>) => {
    // Reset and start execution
    setState({
      ...initialState,
      isExecuting: true,
      status: 'queued',
      progress: 0,
      statusMessage: 'Queuing agent execution...',
    });

    try {
      // Update to running status
      setState((prev) => ({
        ...prev,
        status: 'running',
        progress: 10,
        statusMessage: `Connecting to ${agent.name}...`,
      }));

      // Call the API
      const response = await fetch('/api/execute-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentId: agent.id,
          webhookUrl: agent.webhookUrl,
          inputs,
          metadata: {
            sessionId: `session_${Date.now()}`,
            timestamp: new Date().toISOString(),
          },
        }),
      });

      // Update to processing status
      setState((prev) => ({
        ...prev,
        status: 'processing',
        progress: 50,
        statusMessage: 'Processing request...',
      }));

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Execution failed');
      }

      // Success
      setState({
        isExecuting: false,
        status: 'complete',
        progress: 100,
        statusMessage: 'Execution complete',
        result: result.data,
        error: null,
        executionId: result.executionId,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      setState({
        isExecuting: false,
        status: 'error',
        progress: 0,
        statusMessage: errorMessage,
        result: null,
        error: errorMessage,
        executionId: null,
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    executeAgent,
    reset,
  };
}

/**
 * Simulate agent execution for development/demo purposes
 * Use this when n8n is not available
 */
export function useAgentExecutionSimulated(): UseAgentExecutionReturn {
  const [state, setState] = useState<ExecutionState>(initialState);

  const executeAgent = useCallback(async (agent: Agent, inputs: Record<string, unknown>) => {
    setState({
      ...initialState,
      isExecuting: true,
      status: 'queued',
      progress: 0,
      statusMessage: 'Queuing agent execution...',
    });

    // Simulate queue delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setState((prev) => ({
      ...prev,
      status: 'running',
      progress: 20,
      statusMessage: `Initializing ${agent.name}...`,
    }));

    // Simulate running
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setState((prev) => ({
      ...prev,
      progress: 50,
      statusMessage: 'Processing inputs...',
    }));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setState((prev) => ({
      ...prev,
      status: 'processing',
      progress: 75,
      statusMessage: 'Generating output...',
    }));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate completion
    setState({
      isExecuting: false,
      status: 'complete',
      progress: 100,
      statusMessage: 'Execution complete',
      result: {
        message: `${agent.name} executed successfully (simulated)`,
        inputs,
        timestamp: new Date().toISOString(),
      },
      error: null,
      executionId: `sim_${Date.now()}`,
    });
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    executeAgent,
    reset,
  };
}
