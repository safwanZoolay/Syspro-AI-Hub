/**
 * Agent Executor Service
 * Handles communication with n8n webhooks for agent execution
 */

export interface AgentExecutionRequest {
  agentId: string;
  webhookUrl: string;
  inputs: Record<string, unknown>;
  metadata?: {
    userId?: string;
    sessionId?: string;
    timestamp?: string;
  };
}

export interface AgentExecutionResponse {
  success: boolean;
  executionId: string;
  status: 'queued' | 'running' | 'complete' | 'error';
  data?: unknown;
  error?: string;
  duration?: number;
}

export interface WebhookPayload {
  agentId: string;
  inputs: Record<string, unknown>;
  jobId: string;
  callbackUrl: string;
  metadata: {
    userId?: string;
    sessionId?: string;
    timestamp: string;
    source: 'syspro-ai-hub';
  };
}

// Get the n8n base URL from environment
const getN8nBaseUrl = (): string => {
  const baseUrl = process.env.N8N_WEBHOOK_BASE_URL;
  if (!baseUrl) {
    console.warn('N8N_WEBHOOK_BASE_URL not set, using default localhost');
    return 'http://localhost:5678';
  }
  return baseUrl.replace(/\/$/, ''); // Remove trailing slash
};

// Generate a unique execution ID
const generateExecutionId = (): string => {
  return `exec_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Get the app's base URL for callbacks
const getAppBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
};

/**
 * Execute an agent by calling its n8n webhook
 */
export async function executeAgent(
  request: AgentExecutionRequest
): Promise<AgentExecutionResponse> {
  const executionId = generateExecutionId();
  const startTime = Date.now();

  try {
    const baseUrl = getN8nBaseUrl();
    const webhookUrl = `${baseUrl}${request.webhookUrl}`;

    // Prepare the payload for n8n
    const appBaseUrl = getAppBaseUrl();
    const payload: WebhookPayload = {
      agentId: request.agentId,
      inputs: request.inputs,
      jobId: executionId,
      callbackUrl: `${appBaseUrl}/api/agent-callback`,
      metadata: {
        ...request.metadata,
        timestamp: new Date().toISOString(),
        source: 'syspro-ai-hub',
      },
    };

    console.log(`[${executionId}] Executing agent: ${request.agentId}`);
    console.log(`[${executionId}] Webhook URL: ${webhookUrl}`);

    // Call the n8n webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Execution-Id': executionId,
        'X-Agent-Id': request.agentId,
        // Add API key header if configured
        ...(process.env.N8N_API_KEY && {
          'X-N8N-API-KEY': process.env.N8N_API_KEY,
        }),
      },
      body: JSON.stringify(payload),
      // Set a reasonable timeout (5 minutes for long-running agents)
      signal: AbortSignal.timeout(300000),
    });

    const duration = Date.now() - startTime;

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[${executionId}] Webhook error: ${response.status} - ${errorText}`);

      return {
        success: false,
        executionId,
        status: 'error',
        error: `Webhook returned ${response.status}: ${errorText}`,
        duration,
      };
    }

    // Parse the response
    const data = await response.json();
    console.log(`[${executionId}] Execution complete in ${duration}ms`);

    return {
      success: true,
      executionId,
      status: 'complete',
      data,
      duration,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[${executionId}] Execution failed:`, error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        return {
          success: false,
          executionId,
          status: 'error',
          error: 'Request timed out after 5 minutes',
          duration,
        };
      }

      if (error.message.includes('ECONNREFUSED')) {
        return {
          success: false,
          executionId,
          status: 'error',
          error: 'Could not connect to n8n. Is the n8n server running?',
          duration,
        };
      }

      return {
        success: false,
        executionId,
        status: 'error',
        error: error.message,
        duration,
      };
    }

    return {
      success: false,
      executionId,
      status: 'error',
      error: 'An unknown error occurred',
      duration,
    };
  }
}

/**
 * Check if n8n is reachable
 */
export async function checkN8nHealth(): Promise<boolean> {
  try {
    const baseUrl = getN8nBaseUrl();
    const response = await fetch(`${baseUrl}/healthz`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Validate webhook URL format
 */
export function isValidWebhookUrl(url: string): boolean {
  // Must start with /webhook/
  return url.startsWith('/webhook/') && url.length > 9;
}
