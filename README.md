# LLMdle

A Wordle-style daily guessing game where you guess LLM model names.

## Play

Guess the LLM model name in 6 tries. Each guess must be a valid model name using letters, numbers, and hyphens.

**Examples:** `gpt-5-2`, `claude-4-opus`, `gemini-2-5-pro`

### Color meanings

- 🟩 **Green** - Character is in the correct position
- 🟨 **Yellow** - Character exists but in wrong position
- ⬛ **Gray** - Character is not in the word

## Features

- 67 LLM models from 9 providers (Anthropic, OpenAI, Google, QWEN, Kimi, Amazon, GLM, Meta, xAI)
- New model to guess every day
- Light/Dark theme
- Statistics tracking
- Share your results
- Mobile responsive

## Tech Stack

- [Astro](https://astro.build/)
- [Bun](https://bun.sh/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

## Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## License

MIT

---

Made by [@ej3mplo](https://x.com/ej3mplo)
