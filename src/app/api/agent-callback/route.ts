import { NextRequest, NextResponse } from 'next/server';

// Store for pending executions (in production, use Redis or database)
const pendingExecutions = new Map<string, {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}>();

// Register a pending execution
export function registerPendingExecution(jobId: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    pendingExecutions.set(jobId, { resolve, reject });

    // Timeout after 10 minutes
    setTimeout(() => {
      if (pendingExecutions.has(jobId)) {
        pendingExecutions.delete(jobId);
        reject(new Error('Execution timed out'));
      }
    }, 600000);
  });
}

// Callback endpoint for n8n to POST results
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobId, status, result, error } = body;

    console.log(`[Callback] Received for job: ${jobId}, status: ${status}`);

    if (!jobId) {
      return NextResponse.json(
        { success: false, error: 'Missing jobId' },
        { status: 400 }
      );
    }

    const pending = pendingExecutions.get(jobId);

    if (pending) {
      if (status === 'complete') {
        pending.resolve({ success: true, output: result });
      } else if (status === 'error') {
        pending.reject(new Error(error || 'Execution failed'));
      }
      pendingExecutions.delete(jobId);
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid callback payload' },
      { status: 400 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    pendingJobs: pendingExecutions.size,
  });
}
