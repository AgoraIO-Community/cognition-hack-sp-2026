export type StartInterviewResponse = {
  sessionId: string;
  convoAiToken: string;
};

export type ChatHistoryItem = {
  role: 'agent' | 'user';
  content: string;
};

export type ChatResponse = {
  reply: string;
  isComplete: boolean;
};

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = baseUrl ? `${baseUrl}${path}` : path;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed (${res.status}) ${text}`);
  }

  return (await res.json()) as T;
}

export async function startInterview(): Promise<StartInterviewResponse> {
  return apiPost<StartInterviewResponse>('/api/interview/start', {});
}

export async function saveTranscript(sessionId: string, transcript: string): Promise<{ success: true }> {
  return apiPost<{ success: true }>('/api/interview/transcript', { sessionId, transcript });
}

export async function generateSpec(sessionId: string): Promise<unknown> {
  return apiPost<unknown>('/api/spec/generate', { sessionId });
}

export async function chat(
  sessionId: string,
  message: string,
  history: ChatHistoryItem[]
): Promise<ChatResponse> {
  return apiPost<ChatResponse>('/api/chat', { sessionId, message, history });
}
