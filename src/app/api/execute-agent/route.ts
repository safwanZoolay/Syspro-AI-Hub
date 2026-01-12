import { NextRequest, NextResponse } from 'next/server';
import { executeAgent, AgentExecutionRequest, AgentExecutionResponse } from '@/lib/agent-executor';

export async function POST(request: NextRequest) {
  try {
    const body: AgentExecutionRequest = await request.json();

    // Validate required fields
    if (!body.agentId || !body.webhookUrl) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: agentId and webhookUrl are required'
        },
        { status: 400 }
      );
    }

    // Execute the agent
    const result = await executeAgent(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Agent execution error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
        executionId: '',
        status: 'error' as const,
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'agent-executor',
    timestamp: new Date().toISOString(),
  });
}
