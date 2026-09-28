# ⚡ TermForge CLI

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-16%2B-brightgreen?style=for-the-badge&logo=node.js" alt="Node.js Version">
  <img src="https://img.shields.io/badge/Platform-Windows-0078D6?style=for-the-badge&logo=windows" alt="Platform: Windows">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License: MIT">
  <img src="https://img.shields.io/badge/Shells-CMD%20%7C%20PowerShell-purple?style=for-the-badge" alt="Supported Shells">
</p>

<p align="center">
  <b>A lightweight, zero-overhead terminal harness that restyles your Windows command prompt with authentic OS themes and Neofetch ASCII art.</b><br>
  <i>Commands run directly inside your real, persistent Windows shell with full interactive console support. No VMs, Docker, or WSL required.</i>
</p>

---

```
  ████████╗███████╗██████╗ ███╗   ███╗███████╗ ██████╗ ██████╗  ██████╗ ███████╗
  ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
     ██║   █████╗  ██████╔╝██╔████╔██║█████╗  ██║   ██║██████╔╝██║  ███╗█████╗  
     ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  
     ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
     ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
```

---

## 🚀 Overview

**TermForge** transforms the look and feel of your Windows terminal into classic operating systems—from **Kali Linux** and **Arch** to **Ubuntu**, **macOS**, and **Alpine**.

Unlike emulators or mock shells, TermForge **does not virtualize, intercept, or fake commands**. It launches your real Windows shell (`cmd.exe` or `powershell.exe`) directly in your console with authentic Neofetch ASCII art and native OS prompt palettes.

Every command you type—whether running `git`, compiling code, editing with console editors, navigating directories with `cd`, or managing environment variables—persists naturally across the entire session.

---

## ✨ Features

- 🐉 **Authentic Neofetch ASCII Art**: Displays iconic distro logos rendered with true ANSI color palettes.
- 🎨 **Accurate OS Prompts & Palettes**:
  - **Kali Linux**: Iconic Kali Blue styling (`┌──(root㉿kali)-[path]` / `└─#`).
  - **Ubuntu**: Signature orange & green bash prompt (`root@ubuntu:path#`).
  - **Arch Linux**: Clean Arch cyan prompt (`[root@arch path]#`).
  - **Debian**: Raspberry/crimson swirl with Debian prompt.
  - **Fedora**: Classic Fedora blue infinity styling.
  - **Windows PowerShell**: PowerShell blue & gold branding with dynamic paths.
  - **macOS**: Six-color Apple rainbow ASCII logo with zsh `%` prompt.
  - **Alpine Linux**: Minimalist Alpine peak with ash prompt.
- 🖱️ **Interactive Menu Navigation**:
  - **Mouse Click Support**: Click directly on any OS option using ANSI SGR mouse tracking.
  - **Arrow Keys**: Navigate up and down with `↑`/`↓` (or `k`/`j`) with live visual highlight (`❯`).
  - **Instant Numbers**: Press `1`–`9` for instant launch without even pressing Enter.
- 🔒 **Real Persistent Shell**:
  - Attached directly to Windows console (`stdio: 'inherit'`).
  - Command history, tab completion, arrow keys, and interactive CLI programs work flawlessly.
  - Bypass registry `AutoRun` conflicts (`/D`) to ensure your styled prompt and screen stay intact.
- ⚡ **Zero Bloat**:
  - Pure Node.js with zero heavy dependencies.
  - No Electron, no web views, no WSL, and no virtual machines.

---

## 📦 Quick Start

### Prerequisites
- Windows 10 / 11 (Windows Terminal, Command Prompt, or PowerShell)
- Node.js 16+

### Installation & Launch

```bash
# Clone the repository
git clone https://github.com/QuantumTechCoder/TermForgeCLI.git

# Navigate into the project folder
cd TermForgeCLI

# Start TermForge
npm start
```

*(Alternatively, run `node index.js` directly).*

---

## 🎮 Navigation & Controls

| Action | Control | Description |
| :--- | :--- | :--- |
| **Select OS** | `Click` with mouse | Click directly on any OS name in the list |
| **Navigate** | `↑` / `↓` or `k` / `j` | Move selection cursor up and down |
| **Confirm** | `Enter` / `Space` | Launch the highlighted OS shell |
| **Direct Launch** | Keys `1` – `9` | Instantly launches that OS theme |
| **Quit Menu** | `q` or `Ctrl+C` | Exit cleanly without changing terminal state |
| **Exit Session** | Type `exit` | Closes the styled shell and restores your original terminal |

---

## 🖥️ Supported Operating Systems

| OS Theme | Shell Engine | Brand Colors | Prompt Preview |
| :--- | :--- | :--- | :--- |
| **Kali Linux** | `cmd.exe` | Kali Blue (`#0080ff`) | `┌──(root㉿kali)-[C:\path]`<br>`└─# ` |
| **Ubuntu** | `cmd.exe` | Ubuntu Orange (`#E95420`) | `root@ubuntu:C:\path# ` |
| **Debian** | `cmd.exe` | Debian Crimson (`#D70A53`) | `root@debian:C:\path# ` |
| **Arch Linux** | `cmd.exe` | Arch Cyan (`#1793D1`) | `[root@arch C:\path]# ` |
| **Fedora** | `cmd.exe` | Fedora Blue (`#0B57A4`) | `[root@fedora C:\path]# ` |
| **Windows** | `cmd.exe` | Windows 11 Blue (`#0078D7`) | `C:\path> ` |
| **Windows PowerShell** | `powershell.exe` | PowerShell Blue & Gold | `PS C:\path> ` |
| **macOS (zsh)** | `cmd.exe` | Classic Rainbow / White | `user@MacBook-Pro C:\path % ` |
| **Alpine Linux** | `cmd.exe` | Alpine Blue (`#0D597F`) | `alpine:C:\path# ` |

---

## 🛠️ How It Works

1. **Persistent Session**: TermForge spawns a single real Windows shell (`cmd.exe /D /K` or `powershell.exe -NoExit`) and binds it to the active console window.
2. **Registry Protection**: Automatically passes `/D` to `cmd.exe` to suppress registry `AutoRun` scripts (such as custom startup banners or prompt overrides) that might wipe the screen or prompt.
3. **Prompt Styling**: Prompts are dynamically evaluated by the shell itself using native escape codes (`PROMPT` syntax for cmd and PowerShell `prompt` function), ensuring accurate paths and instant responsiveness.
4. **PTY & Inherited Console Support**: If `node-pty` is installed, TermForge utilizes ConPTY for live resizing and terminal streams; otherwise, it cleanly falls back to `child_process` with an inherited console.

---

## ✅ Completed Checklist

- [x] Initial project harness and CLI menu creation
- [x] Fixed CLI premature exit bug when selecting an OS
- [x] Inherited console integration (`stdio: 'inherit'`) for genuine Windows shell persistence
- [x] Windows Registry `AutoRun` bypass (`/D`) to protect prompt styling and screen state
- [x] Interactive menu with ANSI SGR mouse click selection support
- [x] Keyboard arrow key navigation (`↑`/`↓`/`k`/`j`) with visual cursor indicators
- [x] Integrated authentic Neofetch ASCII art logos for all 9 operating systems
- [x] Fixed Kali Linux color scheme to iconic Kali Blue (`#0080ff`)
- [x] Fixed PowerShell prompt compatibility for both Windows PowerShell 5.1 and PowerShell 7+
- [x] Removed non-standard labels (`(styled session)` and `Real shell session.`) for a clean presentation
- [x] Git repository setup and initial push to GitHub

---

## 🔮 Upcoming Updates (Roadmap)

- [ ] **Improving the pwsh logo**: Design a higher-fidelity, dedicated PowerShell ASCII art logo
- [ ] **Custom Username & Hostname Configuration**: Allow users to specify custom user/host strings (e.g. `yourname@kali`)
- [ ] **Additional Linux Distros**: Add support for Void Linux, Gentoo, NixOS, Manjaro, and Pop!_OS
- [ ] **Custom Shell Selector**: Option to launch Git Bash, Zsh, or WSL from within the styled harness
- [ ] **Persistent User Preferences**: Save favorite OS theme to automatically boot into on launch

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/QuantumTechCoder"><b>QuantumTechCoder</b></a>
</p>
