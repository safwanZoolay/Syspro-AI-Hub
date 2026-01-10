import { create } from 'zustand';
import { Agent, ExecutionRun, AppState } from '@/types/agent';

export const useAppStore = create<AppState>((set) => ({
  // Authentication
  isAuthenticated: false,
  setIsAuthenticated: (authenticated: boolean) => set({ isAuthenticated: authenticated }),

  // Selected agent
  selectedAgent: null,
  setSelectedAgent: (agent: Agent | null) =>
    set({
      selectedAgent: agent,
      viewState: agent ? 'form' : 'orbit',
    }),

  // Current view state
  viewState: 'orbit',
  setViewState: (state) => set({ viewState: state }),

  // Current execution
  currentExecution: null,
  setCurrentExecution: (execution) => set({ currentExecution: execution }),

  // Execution history
  executionHistory: [],
  addExecution: (execution: ExecutionRun) =>
    set((state) => ({
      executionHistory: [execution, ...state.executionHistory],
    })),
  updateExecution: (id: string, updates: Partial<ExecutionRun>) =>
    set((state) => ({
      executionHistory: state.executionHistory.map((exec) =>
        exec.id === id ? { ...exec, ...updates } : exec
      ),
      currentExecution:
        state.currentExecution?.id === id
          ? { ...state.currentExecution, ...updates }
          : state.currentExecution,
    })),

  // Command input
  commandInput: '',
  setCommandInput: (input) => set({ commandInput: input }),

  // UI state
  isOrbHovered: false,
  setIsOrbHovered: (hovered) => set({ isOrbHovered: hovered }),
  hoveredAgentId: null,
  setHoveredAgentId: (id) => set({ hoveredAgentId: id }),
}));
