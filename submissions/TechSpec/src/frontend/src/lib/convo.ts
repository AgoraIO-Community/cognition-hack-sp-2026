export type TranscriptItem = {
  role: 'agent' | 'user';
  text: string;
  ts: number;
};

export type ConvoControllerOptions = {
  token: string;
  agentId: string;
  onTranscript: (item: TranscriptItem) => void;
  onTurnChange?: (turn: 'agent' | 'user') => void;
};

export type ConvoController = {
  start: () => Promise<void>;
  stop: () => Promise<void>;
};

export async function createConvoController(
  opts: ConvoControllerOptions
): Promise<ConvoController> {
  const { token, agentId, onTranscript, onTurnChange } = opts;

  if (!token) {
    throw new Error('Missing Convo AI token');
  }
  if (!agentId) {
    throw new Error('Missing NEXT_PUBLIC_CONVO_AI_AGENT_ID');
  }

  const sdk: any = await import('convai-web-sdk').catch(() => null);
  if (!sdk) {
    throw new Error('Failed to load Convo AI SDK (convai-web-sdk)');
  }

  const ClientCtor = sdk.default ?? sdk.ConvaiClient ?? sdk.Convai;
  if (!ClientCtor) {
    throw new Error('Unsupported Convo AI SDK export');
  }

  const client: any = new ClientCtor({ token });

  function wireTranscriptEvents(instance: any) {
    const subscribe = (eventName: string, handler: (...args: any[]) => void) => {
      if (typeof instance?.on === 'function') instance.on(eventName, handler);
      if (typeof instance?.addEventListener === 'function') instance.addEventListener(eventName, handler);
    };

    const push = (role: 'agent' | 'user', text: string) => {
      const t = String(text ?? '').trim();
      if (!t) return;
      onTranscript({ role, text: t, ts: Date.now() });
    };

    subscribe('agent_transcript', (payload: any) => {
      push('agent', payload?.text ?? payload?.transcript ?? payload);
      onTurnChange?.('user');
    });

    subscribe('user_transcript', (payload: any) => {
      push('user', payload?.text ?? payload?.transcript ?? payload);
      onTurnChange?.('agent');
    });

    subscribe('message', (payload: any) => {
      const role = payload?.role === 'user' ? 'user' : 'agent';
      push(role, payload?.text ?? payload?.content ?? payload);
    });

    subscribe('transcript', (payload: any) => {
      const role = payload?.role === 'user' ? 'user' : 'agent';
      push(role, payload?.text ?? payload?.transcript ?? payload);
    });
  }

  let conversation: any = null;

  return {
    start: async () => {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const maybeStart =
        client?.startConversation ??
        client?.startSession ??
        client?.connect ??
        client?.start;

      if (typeof maybeStart !== 'function') {
        throw new Error('Convo AI SDK: start method not found');
      }

      onTurnChange?.('agent');
      conversation = await maybeStart.call(client, { agentId });
      wireTranscriptEvents(conversation ?? client);
    },
    stop: async () => {
      const maybeStop =
        conversation?.stop ??
        conversation?.disconnect ??
        client?.stopConversation ??
        client?.stopSession ??
        client?.disconnect ??
        client?.stop;

      if (typeof maybeStop === 'function') {
        await maybeStop.call(conversation ?? client);
      }
    },
  };
}
