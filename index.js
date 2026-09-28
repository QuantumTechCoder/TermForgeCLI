#!/usr/bin/env node
'use strict';

/*
 * TermForge - a terminal harness.
 *
 * Pick an OS style, and your CURRENT terminal simply changes appearance.
 * Every command you type is executed by one real, persistent Windows shell
 * (cmd.exe / powershell.exe) that lives for the whole session, so `cd`,
 * environment variables, git state and interactive programs behave exactly
 * as they normally would. Nothing is emulated, virtualized or faked.
 */

const { themes } = require('./themes');

const ORIGINAL_CWD = process.cwd();
const out = process.stdout;

// ---------------------------------------------------------------- utilities

function write(s) {
  out.write(s);
}

function clearScreen() {
  // clear + scrollback + home cursor
  write('\x1b[2J\x1b[3J\x1b[H');
}

function showCursor() {
  write('\x1b[?25h');
}

function hideCursor() {
  write('\x1b[?25l');
}

function resetStyles() {
  write('\x1b[0m');
}

function restoreTerminal() {
  // Disable mouse reporting mode
  write('\x1b[?1000l\x1b[?1006l');
  if (process.stdin.isTTY && process.stdin.setRawMode) {
    try {
      process.stdin.setRawMode(false);
    } catch (_) {
      /* ignore */
    }
  }
  resetStyles();
  showCursor();
  process.stdin.pause();
}

// ------------------------------------------------------------------- menu

function renderMenu(selectedIndex = -1) {
  clearScreen();
  write('\x1b[1;36m');
  write('  ████████╗███████╗██████╗ ███╗   ███╗███████╗ ██████╗ ██████╗  ██████╗ ███████╗\n');
  write('  ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝\n');
  write('     ██║   █████╗  ██████╔╝██╔████╔██║█████╗  ██║   ██║██████╔╝██║  ███╗█████╗  \n');
  write('     ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  \n');
  write('     ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗\n');
  write('     ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝\x1b[0m\n');
  write('\x1b[2m  Terminal appearance only. Commands run in your real Windows shell.\x1b[0m\n\n');
  themes.forEach((t, i) => {
    if (i === selectedIndex) {
      write(`  \x1b[1;32m❯\x1b[0m \x1b[1;33m${String(i + 1).padStart(2, ' ')}\x1b[0m)  \x1b[1;37;44m ${t.name} \x1b[0m\n`);
    } else {
      write(`    \x1b[1;33m${String(i + 1).padStart(2, ' ')}\x1b[0m)  ${t.name}\n`);
    }
  });
  write('\n\x1b[2m   q) quit  •  [1-9] / ↑↓ arrows / click to select\x1b[0m\n');
  write(`\n  \x1b[1mSelect a terminal style [1-${themes.length}]: \x1b[0m`);
}

function askSelection() {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    stdin.resume();
    stdin.setEncoding('utf8');

    // Non-interactive / piped fallback
    if (!stdin.isTTY) {
      renderMenu();
      let buf = '';
      const onNonTtyData = (chunk) => {
        buf += chunk;
        if (buf.includes('\n') || buf.includes('\r')) {
          stdin.removeListener('data', onNonTtyData);
          const trimmed = buf.trim().toLowerCase();
          if (trimmed === 'q' || trimmed === 'quit' || trimmed === 'exit') {
            resolve(null);
            return;
          }
          const n = Number.parseInt(trimmed, 10);
          if (Number.isInteger(n) && n >= 1 && n <= themes.length) {
            resolve(themes[n - 1]);
            return;
          }
          resolve(null);
        }
      };
      stdin.on('data', onNonTtyData);
      return;
    }

    let selectedIndex = 0;
    let inputBuffer = '';
    renderMenu(selectedIndex);

    // Enable raw mode and mouse tracking (SGR mode 1006)
    if (stdin.setRawMode) {
      try {
        stdin.setRawMode(true);
      } catch (_) {}
    }
    // Enable mouse click reporting
    write('\x1b[?1000h\x1b[?1006h');

    const cleanup = () => {
      write('\x1b[?1000l\x1b[?1006l');
      stdin.removeListener('data', onData);
    };

    const onData = (chunk) => {
      // 1. Mouse Click handling: \x1b[<0;X;YM
      const mouseMatches = [...chunk.matchAll(/\x1b\[<(\d+);(\d+);(\d+)([Mm])/g)];
      if (mouseMatches.length > 0) {
        for (const m of mouseMatches) {
          const btn = parseInt(m[1], 10);
          const row = parseInt(m[3], 10);
          const event = m[4];
          // Left click press
          if (btn === 0 && event === 'M') {
            // Theme rows: lines 9 to 9 + themes.length - 1
            if (row >= 9 && row < 9 + themes.length) {
              cleanup();
              resolve(themes[row - 9]);
              return;
            }
            // Quit line: row 19
            if (row === 19) {
              cleanup();
              resolve(null);
              return;
            }
          }
        }
        return;
      }

      // 2. Arrow keys & Escape sequences
      if (chunk.includes('\x1b[A')) { // Up arrow
        selectedIndex = (selectedIndex - 1 + themes.length) % themes.length;
        renderMenu(selectedIndex);
        return;
      }
      if (chunk.includes('\x1b[B')) { // Down arrow
        selectedIndex = (selectedIndex + 1) % themes.length;
        renderMenu(selectedIndex);
        return;
      }

      // 3. Process key by key
      for (const ch of chunk) {
        if (ch === '\u0003') { // Ctrl+C
          cleanup();
          resolve(null);
          return;
        }

        if (ch === 'q' || ch === 'Q') {
          cleanup();
          resolve(null);
          return;
        }

        // Direct number selection (1-9)
        const num = Number.parseInt(ch, 10);
        if (Number.isInteger(num) && num >= 1 && num <= themes.length) {
          cleanup();
          resolve(themes[num - 1]);
          return;
        }

        // Enter key
        if (ch === '\r' || ch === '\n') {
          const trimmed = inputBuffer.trim().toLowerCase();
          inputBuffer = '';
          if (trimmed === 'q' || trimmed === 'quit' || trimmed === 'exit') {
            cleanup();
            resolve(null);
            return;
          }
          const n = Number.parseInt(trimmed, 10);
          if (Number.isInteger(n) && n >= 1 && n <= themes.length) {
            cleanup();
            resolve(themes[n - 1]);
            return;
          }
          // If no number typed, use current selectedIndex from arrow keys
          if (selectedIndex >= 0 && selectedIndex < themes.length) {
            cleanup();
            resolve(themes[selectedIndex]);
            return;
          }
        } else if (ch === '\u007f' || ch === '\b') {
          if (inputBuffer.length) {
            inputBuffer = inputBuffer.slice(0, -1);
            write('\b \b');
          }
        } else if (ch >= ' ') {
          inputBuffer += ch;
          write(ch);
        }
      }
    };

    stdin.on('data', onData);
  });
}

// ------------------------------------------------------------- shell setup

function buildShellSpec(theme) {
  const comspec = process.env.ComSpec || 'C:\\Windows\\System32\\cmd.exe';

  // Non-Windows (testing/dev): style the local shell instead of cmd.exe.
  if (process.platform !== 'win32') {
    const ps1 = (theme.prompt || '$ ').split('$E').join('\\e').split('$P').join('\\w')
      .split('$_').join('\\n').split('$G').join('>');
    return {
      file: process.env.SHELL || '/bin/bash',
      args: ['-i'],
      env: { ...process.env, PS1: ps1 },
    };
  }

  if (theme.shell === 'powershell') {
    const pwsh = process.env.TERMFORGE_POWERSHELL || 'powershell.exe';
    return {
      file: pwsh,
      args: ['-NoLogo', '-NoExit', '-ExecutionPolicy', 'Bypass', '-Command', theme.psPrompt],
      env: { ...process.env },
    };
  }

  return {
    file: comspec,
    // /D: disables registry AutoRun commands so external scripts cannot clear screen or reset prompt
    // /K: sets the styled prompt and keeps the shell alive for the entire session
    args: ['/D', '/K', 'prompt ' + theme.prompt],
    env: { ...process.env, PROMPT: theme.prompt },
  };
}

function printBanner(theme) {
  clearScreen();
  (theme.banner || []).forEach((line) => write(line + '\n'));
  write('\x1b[2mType "exit" to leave TermForge.\x1b[0m\n\n');
}

// ------------------------------------------------------------- pty session

function startWithPty(pty, theme) {
  const spec = buildShellSpec(theme);

  const shell = pty.spawn(spec.file, spec.args, {
    name: 'xterm-256color',
    cols: out.columns || 120,
    rows: out.rows || 30,
    cwd: ORIGINAL_CWD,
    env: spec.env,
    useConpty: true,
  });

  printBanner(theme);

  shell.onData((data) => write(data));

  if (process.stdin.isTTY && process.stdin.setRawMode) {
    try {
      process.stdin.setRawMode(true);
    } catch (_) {
      /* ignore */
    }
  }
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  const onInput = (data) => shell.write(data);
  process.stdin.on('data', onInput);

  const onResize = () => {
    try {
      shell.resize(out.columns || 120, out.rows || 30);
    } catch (_) {
      /* ignore */
    }
  };
  out.on('resize', onResize);

  process.on('SIGINT', () => {});

  shell.onExit(() => {
    process.stdin.removeListener('data', onInput);
    out.removeListener('resize', onResize);
    finish();
  });
}

// ------------------------------------------------- fallback (no PTY module)

function startWithChildProcess(theme) {
  const { spawn } = require('child_process');
  const spec = buildShellSpec(theme);

  printBanner(theme);

  // Restore terminal so the child process inherits full console capability (README: "an inherited console")
  restoreTerminal();

  const child = spawn(spec.file, spec.args, {
    cwd: ORIGINAL_CWD,
    env: spec.env,
    stdio: 'inherit',
    windowsHide: false,
  });

  child.on('exit', (code) => {
    finish(code || 0);
  });
  child.on('error', (err) => {
    resetStyles();
    write(`\n\x1b[1;31mTermForge could not start the shell: ${err.message}\x1b[0m\n`);
    finish(1);
  });
}

// ------------------------------------------------------------------- exit

let finished = false;
function finish(code = 0) {
  if (finished) return;
  finished = true;
  restoreTerminal();
  try {
    process.chdir(ORIGINAL_CWD);
  } catch (_) {
    /* ignore */
  }
  write('\n\x1b[2mTermForge session ended. Back to your original terminal.\x1b[0m\n');
  process.exit(code);
}

// ------------------------------------------------------------------- main

async function main() {
  if (process.platform !== 'win32') {
    write(
      '\x1b[1;33mNote:\x1b[0m TermForge targets Windows. On this platform it will ' +
        'style your default system shell instead.\n\n'
    );
  }

  const theme = await askSelection();
  if (!theme) {
    clearScreen();
    restoreTerminal();
    write('Cancelled.\n');
    process.exit(0);
  }

  let pty = null;
  try {
    pty = require('node-pty');
  } catch (_) {
    pty = null;
  }

  if (pty && process.platform === 'win32') {
    startWithPty(pty, theme);
  } else {
    startWithChildProcess(theme);
  }
}

process.on('exit', () => {
  if (!finished) restoreTerminal();
});

main();
