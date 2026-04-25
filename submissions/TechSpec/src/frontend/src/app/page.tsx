'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, Mic, Wand2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { chat, generateSpec, startInterview, type ChatHistoryItem } from '@/lib/api';

type UiState = 'landing' | 'interview' | 'spec';

type Spec = {
  resumo?: string;
  objetivos?: string[];
  publico_alvo?: string;
  funcionalidades?: { nome: string; descricao: string; prioridade: 'alta' | 'media' | 'baixa' }[];
  stack_sugerida?: {
    frontend?: string;
    backend?: string;
    banco?: string;
    infra?: string;
    outros?: string[];
  };
  complexidade?: 'baixa' | 'media' | 'alta';
  horas_estimadas?: { min: number; max: number };
  riscos?: string[];
  dependencias?: string[];
  proximos_passos?: string[];
  raw?: string;
  parse_error?: boolean;
};

function priorityVariant(p: 'alta' | 'media' | 'baixa') {
  if (p === 'alta') return 'high';
  if (p === 'media') return 'medium';
  return 'low';
}

function complexityVariant(c?: 'baixa' | 'media' | 'alta') {
  if (c === 'alta') return 'high';
  if (c === 'media') return 'medium';
  return 'low';
}

type ChatMessage = {
  role: 'agent' | 'user';
  content: string;
  ts: number;
};

const INITIAL_AGENT_MESSAGE =
  'Olá! Vou te fazer algumas perguntas pra entender seu projeto. Pode começar me contando, com suas palavras, o que você quer construir?';

export default function Page() {
  const [uiState, setUiState] = useState<UiState>('landing');

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [agentTyping, setAgentTyping] = useState(false);
  const [chatComplete, setChatComplete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [spec, setSpec] = useState<Spec | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const historyPayload = useMemo<ChatHistoryItem[]>(() => {
    return messages
      .map(m => ({ role: m.role, content: m.content }))
      .filter(m => m.content.trim().length > 0);
  }, [messages]);

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, agentTyping]);

  async function handleStart() {
    setError(null);
    setBusy(true);
    setMessages([]);
    setSpec(null);
    setChatComplete(false);

    try {
      const { sessionId: newSessionId } = await startInterview();
      setSessionId(newSessionId);

      setMessages([
        {
          role: 'agent',
          content: INITIAL_AGENT_MESSAGE,
          ts: Date.now(),
        },
      ]);
      setUiState('interview');

      setTimeout(() => inputRef.current?.focus(), 50);
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao iniciar entrevista');
    } finally {
      setBusy(false);
    }
  }

  async function handleSend() {
    if (!sessionId) return;
    const message = draft.trim();
    if (!message) return;
    if (agentTyping || busy) return;

    setError(null);
    setDraft('');
    setMessages(prev => [
      ...prev,
      {
        role: 'user',
        content: message,
        ts: Date.now(),
      },
    ]);

    setAgentTyping(true);
    try {
      const res = await chat(sessionId, message, historyPayload);
      setMessages(prev => [
        ...prev,
        {
          role: 'agent',
          content: res.reply,
          ts: Date.now(),
        },
      ]);
      setChatComplete(Boolean(res.isComplete));
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao enviar mensagem');
    } finally {
      setAgentTyping(false);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }

  async function handleGenerateSpec() {
    if (!sessionId) return;
    setError(null);
    setBusy(true);
    try {
      const generated = (await generateSpec(sessionId)) as Spec;
      setSpec(generated);
      setUiState('spec');
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao gerar especificação');
    } finally {
      setBusy(false);
    }
  }

  function handleReset() {
    setUiState('landing');
    setSessionId(null);
    setMessages([]);
    setDraft('');
    setAgentTyping(false);
    setChatComplete(false);
    setSpec(null);
    setError(null);
    setBusy(false);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(70%_55%_at_40%_10%,rgba(139,92,246,0.22),transparent_55%),radial-gradient(60%_45%_at_80%_30%,rgba(139,92,246,0.10),transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-10 md:py-16">
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-violet-500/15 ring-1 ring-violet-500/25" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide text-zinc-100">SpecForge</div>
              <div className="text-xs text-zinc-400">Interview → Spec</div>
            </div>
          </div>

          {uiState !== 'landing' && (
            <Button variant="secondary" onClick={handleReset} disabled={busy}>
              Nova entrevista
            </Button>
          )}
        </header>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {uiState === 'landing' && (
          <section className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Transforme sua ideia em uma especificação técnica em 5 minutos.
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-zinc-300 md:text-lg">
                Conte seu projeto numa conversa. Nossa IA faz as perguntas certas e entrega a spec pronta para o time de dev.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button size="lg" onClick={handleStart} disabled={busy}>
                  <Mic className="h-5 w-5" />
                  Iniciar entrevista
                </Button>
                <div className="text-sm text-zinc-400">
                  Sem login. Uma página. Pronto pra demo.
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Fluxo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span>1) Entrevista por voz</span>
                    <Badge variant="violet">Convo AI</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>2) Transcrição + contexto</span>
                    <Badge>Backend</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>3) Spec pronta (JSON)</span>
                    <Badge variant="violet">Claude</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {uiState === 'interview' && (
          <section className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-12">
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Entrevista (chat)</CardTitle>
                    <div className="mt-1 text-sm text-zinc-400">
                      {sessionId ? `Sessão: ${sessionId}` : 'Criando sessão...'}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {agentTyping ? (
                      <Badge variant="violet">Agente está digitando...</Badge>
                    ) : (
                      <Badge>Pronto</Badge>
                    )}

                    <Button
                      variant="secondary"
                      disabled
                      title="Opcional (beta). Se sobrar tempo, ativamos a voz."
                    >
                      <Mic className="h-4 w-4" />
                      Tentar entrevista por voz (beta)
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="flex h-[70vh] min-h-[520px] flex-col">
                    <div className="flex-1 overflow-y-auto bg-zinc-950/30 p-5">
                      <div className="mx-auto w-full max-w-3xl space-y-3">
                        {messages.map(m => (
                          <div
                            key={m.ts}
                            className={
                              'flex ' + (m.role === 'user' ? 'justify-end' : 'justify-start')
                            }
                          >
                            <div
                              className={
                                'max-w-[85%] rounded-2xl border px-4 py-3 text-sm leading-relaxed shadow-soft ' +
                                (m.role === 'user'
                                  ? 'border-violet-500/25 bg-violet-500/10 text-zinc-100'
                                  : 'border-zinc-800 bg-zinc-900/70 text-zinc-200')
                              }
                            >
                              {m.content}
                            </div>
                          </div>
                        ))}

                        {agentTyping && (
                          <div className="flex justify-start">
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-300">
                              Agente está digitando...
                            </div>
                          </div>
                        )}

                        <div ref={messagesEndRef} />
                      </div>
                    </div>

                    <div className="border-t border-zinc-800 bg-zinc-950/60 p-4">
                      <div className="mx-auto flex w-full max-w-3xl items-end gap-3">
                        <div className="flex-1">
                          <input
                            ref={inputRef}
                            value={draft}
                            onChange={e => setDraft(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                              }
                            }}
                            placeholder="Digite sua resposta..."
                            className="h-12 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 text-sm text-zinc-100 outline-none ring-violet-500/40 focus:ring-2"
                            disabled={busy}
                          />
                        </div>

                        <Button onClick={handleSend} disabled={busy || agentTyping || draft.trim().length === 0}>
                          <ArrowUp className="h-4 w-4" />
                          Enviar
                        </Button>
                      </div>

                      {chatComplete && (
                        <div className="mx-auto mt-3 flex w-full max-w-3xl items-center justify-end">
                          <Button onClick={handleGenerateSpec} disabled={busy}>
                            <Wand2 className="h-4 w-4" />
                            Gerar especificação
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {uiState === 'spec' && (
          <section className="space-y-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Especificação técnica gerada
                </h2>
                <div className="mt-1 text-sm text-zinc-400">
                  {sessionId ? `Sessão: ${sessionId}` : null}
                </div>
              </div>

              <Button variant="secondary" onClick={handleReset} disabled={busy}>
                Nova entrevista
              </Button>
            </div>

            {spec?.parse_error && spec?.raw && (
              <Card>
                <CardHeader>
                  <CardTitle>Resposta bruta</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-sm text-zinc-200">
                    {spec.raw}
                  </pre>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-6 md:grid-cols-12">
              <Card className="md:col-span-7">
                <CardHeader>
                  <CardTitle>Resumo executivo</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-zinc-200">
                  {spec?.resumo ?? 'a definir'}
                </CardContent>
              </Card>

              <Card className="md:col-span-5">
                <CardHeader>
                  <CardTitle>Complexidade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Badge variant={complexityVariant(spec?.complexidade)} className="text-sm">
                      {spec?.complexidade ?? 'a definir'}
                    </Badge>
                  </div>
                  <div className="text-sm text-zinc-200">
                    {spec?.horas_estimadas?.min != null && spec?.horas_estimadas?.max != null
                      ? `${spec.horas_estimadas.min}–${spec.horas_estimadas.max} horas`
                      : 'a definir'}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-12">
              <Card className="md:col-span-6">
                <CardHeader>
                  <CardTitle>Objetivos + público-alvo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-xs font-medium text-zinc-400">Público-alvo</div>
                    <div className="mt-1 text-sm text-zinc-200">
                      {spec?.publico_alvo ?? 'a definir'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-zinc-400">Objetivos</div>
                    <div className="mt-2 space-y-2">
                      {(spec?.objetivos?.length ? spec.objetivos : ['a definir']).map((o, i) => (
                        <div key={i} className="text-sm text-zinc-200">
                          {o}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-6">
                <CardHeader>
                  <CardTitle>Stack sugerida</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3 text-sm text-zinc-200">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-3">
                    <div className="text-xs text-zinc-400">Frontend</div>
                    <div className="mt-1 font-medium">{spec?.stack_sugerida?.frontend ?? 'a definir'}</div>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-3">
                    <div className="text-xs text-zinc-400">Backend</div>
                    <div className="mt-1 font-medium">{spec?.stack_sugerida?.backend ?? 'a definir'}</div>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-3">
                    <div className="text-xs text-zinc-400">Banco</div>
                    <div className="mt-1 font-medium">{spec?.stack_sugerida?.banco ?? 'a definir'}</div>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-3">
                    <div className="text-xs text-zinc-400">Infra</div>
                    <div className="mt-1 font-medium">{spec?.stack_sugerida?.infra ?? 'a definir'}</div>
                  </div>
                  <div className="col-span-2 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-3">
                    <div className="text-xs text-zinc-400">Outros</div>
                    <div className="mt-1 text-sm">
                      {(spec?.stack_sugerida?.outros?.length
                        ? spec.stack_sugerida.outros
                        : ['a definir']
                      ).join(' • ')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Funcionalidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {(spec?.funcionalidades?.length
                    ? spec.funcionalidades
                    : [{ nome: 'a definir', descricao: 'a definir', prioridade: 'media' as const }]
                  ).map((f, i) => (
                    <div
                      key={f.nome + i}
                      className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm font-semibold text-zinc-100">{f.nome}</div>
                        <Badge variant={priorityVariant(f.prioridade)}>
                          {f.prioridade}
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm leading-relaxed text-zinc-200">{f.descricao}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-12">
              <Card className="md:col-span-6">
                <CardHeader>
                  <CardTitle>Riscos e dependências</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-xs font-medium text-zinc-400">Riscos</div>
                    <div className="mt-2 space-y-2">
                      {(spec?.riscos?.length ? spec.riscos : ['a definir']).map((r, i) => (
                        <div key={i} className="text-sm text-zinc-200">
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-zinc-400">Dependências</div>
                    <div className="mt-2 space-y-2">
                      {(spec?.dependencias?.length ? spec.dependencias : ['a definir']).map((d, i) => (
                        <div key={i} className="text-sm text-zinc-200">
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-6">
                <CardHeader>
                  <CardTitle>Próximos passos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(spec?.proximos_passos?.length ? spec.proximos_passos : ['a definir']).map((p, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-3">
                      <div className="mt-0.5">
                        <Wand2 className="h-4 w-4 text-violet-300" />
                      </div>
                      <div className="text-sm text-zinc-200">{p}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        <footer className="mt-14 text-xs text-zinc-500">
          Configure `NEXT_PUBLIC_API_URL` e `NEXT_PUBLIC_CONVO_AI_AGENT_ID` em `.env.local`.
        </footer>
      </div>
    </main>
  );
}
