import { NextResponse } from 'next/server';
import { checkN8nHealth } from '@/lib/agent-executor';

export async function GET() {
  const n8nHealthy = await checkN8nHealth();

  return NextResponse.json({
    status: 'ok',
    service: 'syspro-ai-hub',
    timestamp: new Date().toISOString(),
    dependencies: {
      n8n: {
        status: n8nHealthy ? 'connected' : 'disconnected',
        url: process.env.N8N_WEBHOOK_BASE_URL || 'http://localhost:5678',
      },
    },
  });
}
