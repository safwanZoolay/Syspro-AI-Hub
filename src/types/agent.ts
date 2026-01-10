export type InputFieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'multi-select'
  | 'file'
  | 'number';

export type AgentCategory =
  | 'testing'
  | 'review'
  | 'documentation'
  | 'analysis';

export type OutputType =
  | 'markdown'
  | 'code'
  | 'file'
  | 'mixed';

export type ExecutionStatus =
  | 'idle'
  | 'queued'
  | 'running'
  | 'processing'
  | 'complete'
  | 'error';

export interface InputField {
  name: string;
  label: string;
  type: InputFieldType;
  required: boolean;
  placeholder?: string;
  description?: string;
  options?: { value: string; label: string }[];
  accept?: string; // For file inputs
  rows?: number; // For textarea
}

export interface Agent {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string; // Lucide icon name
  category: AgentCategory;
  inputs: InputField[];
  webhookUrl: string;
  outputType: OutputType;
  color?: string; // Optional custom accent color
}

export interface ExecutionRun {
  id: string;
  agentId: string;
  status: ExecutionStatus;
  inputs: Record<string, unknown>;
  startedAt: Date;
  completedAt?: Date;
  progress?: number;
  statusMessage?: string;
  result?: ExecutionResult;
  error?: string;
}

export interface ExecutionResult {
  type: OutputType;
  content?: string; // Markdown or code content
  files?: OutputFile[];
  summary?: string;
}

export interface OutputFile {
  name: string;
  type: string;
  url?: string;
  content?: string;
}

export interface AppState {
  // Authentication
  isAuthenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;

  // Selected agent
  selectedAgent: Agent | null;
  setSelectedAgent: (agent: Agent | null) => void;

  // Current view state
  viewState: 'orbit' | 'form' | 'executing' | 'results';
  setViewState: (state: AppState['viewState']) => void;

  // Current execution
  currentExecution: ExecutionRun | null;
  setCurrentExecution: (execution: ExecutionRun | null) => void;

  // Execution history
  executionHistory: ExecutionRun[];
  addExecution: (execution: ExecutionRun) => void;
  updateExecution: (id: string, updates: Partial<ExecutionRun>) => void;

  // Command input
  commandInput: string;
  setCommandInput: (input: string) => void;

  // UI state
  isOrbHovered: boolean;
  setIsOrbHovered: (hovered: boolean) => void;
  hoveredAgentId: string | null;
  setHoveredAgentId: (id: string | null) => void;
}
