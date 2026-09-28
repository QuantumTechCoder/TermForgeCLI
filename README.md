# TermForge

A tiny Node.js CLI that makes your Windows terminal *look* like another OS terminal,
while every command keeps running in one real, persistent Windows shell.

```
npm install
npm start
```

Pick a style (Kali, Ubuntu, Debian, Arch, Fedora, Windows, PowerShell, macOS, Alpine).
The screen clears and your prompt adopts that OS look — for example Kali:

```
┌──(root㉿kali)-[C:/Users/you/project]
└─#
```

The path always follows the real Windows working directory.

## How it works

- One shell (`cmd.exe /K`, or `powershell.exe -NoExit` for the PowerShell theme) is
  spawned once and kept alive for the whole session, so `cd`, env vars, git state and
  long-running/interactive programs persist naturally.
- The look comes from the shell's own prompt (`PROMPT` for cmd, a `prompt` function for
  PowerShell) plus ANSI colors. Nothing is emulated, virtualized or intercepted.
- If the optional `node-pty` package installs, TermForge uses a PTY for full
  input/output forwarding and live resizing. If it isn't available, it falls back to a
  plain `child_process` with an inherited console — same persistent shell, same
  interactivity, no native build required.

## Exit

Type `exit` (or close the shell). TermForge restores the cursor, resets colors and
returns you to your original terminal and directory.

## Requirements

Node.js 16+ on Windows. No React, Electron, browser UI, VM, WSL or Docker.
