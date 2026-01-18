export const MODELS_BY_PROVIDER: Record<string, string[]> = {
  "Anthropic": [
    "claude-4-5-opus",
    "claude-4-opus",
    "claude-4-5-sonnet",
    "claude-4-sonnet",
    "claude-3-5-sonnet",
    "claude-3-5-haiku",
    "claude-3-haiku"
  ],
  "OpenAI": [
    "gpt-5-2",
    "gpt-5-2-pro",
    "gpt-5-2-codex",
    "gpt-5",
    "gpt-5-pro",
    "gpt-5-mini",
    "gpt-5-nano",
    "o3",
    "o3-pro",
    "o3-deep-research",
    "o4-mini",
    "o4-mini-deep-research",
    "o1-pro",
    "gpt-4-1",
    "gpt-4o",
    "gpt-4o-mini",
    "gpt-4o-realtime",
    "gpt-realtime",
    "gpt-realtime-mini",
    "gpt-4-turbo",
    "gpt-3-5-turbo"
  ],
  "Google": [
    "gemini-3-pro-preview",
    "gemini-3-pro-image-preview",
    "gemini-3-flash-preview",
    "gemini-2-5-pro",
    "gemini-2-5-flash",
    "gemini-2-0-flash"
  ],
  "QWEN": [
    "qwen-3",
    "qwen-3-tts-vd-flash",
    "qwen-3-tts-vc",
    "qwen-2-5-max",
    "qwen-2-5"
  ],
  "Kimi": [
    "kimi-k2-thinking",
    "kimi-k2"
  ],
  "Amazon": [
    "amazon-nova-micro",
    "amazon-nova-lite",
    "amazon-nova-pro",
    "amazon-nova-canvas",
    "amazon-nova-reel",
    "amazon-nova-sonic",
    "amazon-titan-text-premier",
    "amazon-titan-text-express",
    "amazon-titan-text-lite"
  ],
  "GLM": [
    "glm-4-7",
    "glm-4-6",
    "glm-4-5",
    "glm-4-5-air",
    "glm-4-5v",
    "glm-image"
  ],
  "Meta": [
    "llama-4-scout",
    "llama-4-maverick",
    "llama-4-behemoth-preview"
  ],
  "xAI": [
    "grok-4-1-fast-reasoning",
    "grok-4-1-fast-non-reasoning",
    "grok-code-fast-1",
    "grok-4-fast-reasoning",
    "grok-4-fast-non-reasoning",
    "grok-4",
    "grok-3-mini",
    "grok-3"
  ]
};

export const ALL_MODELS: string[] = Object.values(MODELS_BY_PROVIDER).flat();

export function getProviderForModel(modelName: string): string | undefined {
  for (const [provider, models] of Object.entries(MODELS_BY_PROVIDER)) {
    if (models.includes(modelName.toLowerCase())) {
      return provider;
    }
  }
  return undefined;
}

export const VALID_CHARS = new Set([
  ...'abcdefghijklmnopqrstuvwxyz'.split(''),
  ...'0123456789'.split(''),
  '-'
]);

export function isValidGuess(guess: string): boolean {
  return ALL_MODELS.includes(guess.toLowerCase());
}
