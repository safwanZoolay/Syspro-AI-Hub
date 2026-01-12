export type InputFieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'multi-select'
  | 'file'
  | 'number';

// Updated category types for the 10 main categories
export type AgentCategoryId =
  | 'code-quality'
  | 'testing'
  | 'documentation'
  | 'dev-productivity'
  | 'devops'
  | 'requirements'
  | 'event-management'
  | 'syspro-specific'
  | 'team-process'
  | 'customer-support';

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
  defaultValue?: string; // Default value for the field
}

// Category definition for the orbital nodes
export interface Category {
  id: AgentCategoryId;
  name: string;
  shortName: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Category accent color
}

export interface Agent {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string; // Lucide icon name
  categoryId: AgentCategoryId;
  inputs: InputField[];
  webhookUrl: string;
  outputType: OutputType;
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

  // Category hover state for expanding agents
  expandedCategoryId: AgentCategoryId | null;
  setExpandedCategoryId: (id: AgentCategoryId | null) => void;
}
