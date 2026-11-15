# PayGlass

Windows desktop viewer for local Claude Code and Codex conversations.

Download the Windows installer from [Releases](https://github.com/PatAbah/PayGlass/releases). Install it and open the desktop shortcut. Viewing conversations requires no account, Node installation, or model download. The installer includes Electron. If using the unpacked build, keep the entire app folder together.

## Conversations

PayGlass detects `.codex` and `.claude` in your user folder and respects `CODEX_HOME` and `CLAUDE_CONFIG_DIR`. Set alternative paths in Settings. Original conversation files are read only. Tool payloads and private reasoning are excluded from the viewer.

Use the sidebar filters to switch sources. Sidebar search finds titles, project paths and indexed message text. The search button or Ctrl+F searches the open conversation. Long conversations initially show the latest 80 messages; Load earlier reveals more. Refresh reloads changes made by other clients.

The title bar contains conversation details, search, selection, copy and export. Selection controls appear when needed. Select individual messages, Shift-select a range, or choose All, User, Assistant or None. Copy selected includes role labels. Ordinary text selection and Ctrl+C also work. Export saves Markdown.

The sidebar and composer can be resized; their sizes persist. The sidebar can also be collapsed.

## Local continuation

Choose a local model below the composer. The + button opens prompt presets, context selection and model detection. Settings provides the local endpoint, llama.cpp executable, GGUF file chooser, server port, CPU threads, context budget, reply length, temperature and additional instructions.

Detection checks loopback OpenAI-compatible endpoints on ports 8081, 8082, 1234 and 11434, plus the configured endpoint. Common Downloads model folders are scanned. Model files remain in place. Offline GGUF loading requires a compatible llama.cpp runtime. External servers are reused and never terminated; PayGlass stops only servers it starts.

Recent or selected conversation messages are supplied to the local model when you send. Context size is estimated by text length and trimmed to the configured budget. Increase the budget or reduce history if a model reports context overflow. CPU generation can be slow. Stop preserves partial output.

Continuation is text only: previous tools, browser sessions and permissions are not connected to the local assistant. Replies are saved as a separate local branch. Original transcripts are never modified.

## Local data

Settings, the search index and local replies are stored in `%APPDATA%/PayGlass/data`. The index contains conversation text and should be treated as private. Settings includes an Open app data folder button. These files are excluded from this repository and releases.

There is no telemetry. Chat endpoints must be loopback addresses. Context is sent only to the selected local model after Send. The renderer is sandboxed, has no Node access and displays transcript text without HTML injection.

## Build and test

Use Node.js and run `npm install`, `npm test`, then `npm run build`. The Windows app is written to `dist/PayGlass`. `npm start` launches the source app. Build on Windows to embed the executable icon and metadata.

For an existing offline toolchain, `PAYGLASS_ELECTRON_DIST`, `PAYGLASS_ASAR` and `PAYGLASS_RESEDIT` can point to the Electron runtime folder and the corresponding module entry files.

`electron . --self-test` runs isolated fictional-history UI checks including selection, clipboard, search, saved sizing, local HTTP context handoff, streaming, stop and persistence. Core tests cover parsing, read-only operation, context construction, endpoint restrictions and streaming. No personal histories are included in the test fixtures.
