'use strict';

/*
 * Theme definitions with authentic Neofetch ASCII art and accurate OS styling.
 *
 * Every theme is purely cosmetic. Commands always run in the real Windows
 * shell (cmd.exe or powershell.exe) that TermForge keeps alive for the
 * whole session.
 *
 * cmd.exe prompts use the built-in PROMPT syntax:
 *   $P = current drive + path   $_ = newline   $E = ESC   $G = ">"   $$ = "$"
 * PowerShell themes provide a `prompt` function instead.
 */

const E = '$E'; // escape sequence marker understood by cmd.exe PROMPT
const R = '\x1b[0m'; // ANSI reset

// Kali Linux colors (Iconic Kali Blue)
const KB = '\x1b[38;5;39m'; // Kali Bright Blue
const KD = '\x1b[38;5;33m'; // Kali Deep Blue

// Ubuntu colors (Ubuntu Orange & Aubergine White)
const UO = '\x1b[38;5;208m'; // Ubuntu Orange
const UW = '\x1b[1;37m';     // White

// Debian colors (Debian Crimson)
const DC = '\x1b[38;5;197m'; // Debian Crimson

// Arch Linux colors (Arch Cyan)
const AC = '\x1b[38;5;39m';  // Arch Cyan
const AL = '\x1b[38;5;45m';  // Arch Light Cyan

// Fedora colors (Fedora Blue)
const FB = '\x1b[38;5;33m';  // Fedora Blue
const FW = '\x1b[1;37m';     // White

// Windows colors (Windows 11 Blue)
const WB = '\x1b[38;5;39m';  // Windows Blue

// PowerShell colors (PowerShell Royal Blue & Gold)
const PB = '\x1b[38;5;33m';  // PowerShell Blue
const PY = '\x1b[1;33m';     // PowerShell Gold

// macOS colors (Apple 6-color Rainbow)
const MG = '\x1b[38;5;40m';  // Green
const MY = '\x1b[38;5;220m'; // Yellow
const MO = '\x1b[38;5;208m'; // Orange
const MR = '\x1b[38;5;196m'; // Red
const MP = '\x1b[38;5;129m'; // Purple
const MB = '\x1b[38;5;39m';  // Blue

// Alpine Linux colors (Alpine Blue)
const AB = '\x1b[38;5;31m';  // Alpine Blue

const themes = [
  {
    key: 'kali',
    name: 'Kali Linux',
    shell: 'cmd',
    banner: [
      `${KB}..............`,
      `${KB}            ..,;:ccc,.`,
      `${KB}          ......''';lxO.`,
      `${KB}.....''''..........,:ld;`,
      `${KB}           .';;;:::;,,.x,`,
      `${KB}      ..'''.            ${KD}0Xxoc:,.  ...`,
      `${KB}  ....                ${KD},ONkc;,;cokOdc',.`,
      `${KB} .                   ${KD}OMo           ':ddo.`,
      `${KD}                    dMc               :OO;`,
      `${KD}                    0M.                 .:o.`,
      `${KD}                    ;Wd`,
      `${KD}                     ;XO,`,
      `${KD}                       ,d0Odlc;,..`,
      `${KD}                           ..',;:cdOOd::,.`,
      `${KD}                                    .:d;.':;.`,
      `${KD}                                       'd,  .'`,
      `${KD}                                         ;l   ..`,
      `${KD}                                          .o`,
      `${KD}                                            c`,
      `${KD}                                            .'`,
      `${KD}                                             .${R}`,
      `${KB}  Kali GNU/Linux Rolling${R}`,
    ],
    // Authentic Kali Blue prompt: ┌──(root㉿kali)-[path] \n └─#
    prompt:
      `${E}[38;5;39m┌──(${E}[38;5;45mroot${E}[38;5;39m㉿${E}[38;5;45mkali${E}[38;5;39m)-[${E}[0;37m$P${E}[38;5;39m]${E}[0m$_` +
      `${E}[38;5;39m└─#${E}[0m `,
  },
  {
    key: 'ubuntu',
    name: 'Ubuntu',
    shell: 'cmd',
    banner: [
      `${UW}                             ....`,
      `${UW}              ${UW}.',:clooo:  ${UO}.:looooo:.`,
      `${UW}           .;looooooooc  ${UO}.oooooooooo'`,
      `${UW}        .;looooool:,''.  ${UO}:ooooooooooc`,
      `${UW}       ;looool;.         ${UO}'oooooooooo,`,
      `${UW}      ;clool'             ${UO}.cooooooc.  ${UW},,`,
      `${UW}         ...                ${UO}......  ${UW}.:oo,`,
      `${UO}  .;clol:,.                        ${UW}.loooo'`,
      `${UO} :ooooooooo,                        ${UW}'ooool`,
      `${UO}'ooooooooooo.                        ${UW}loooo.`,
      `${UO}'ooooooooool                         ${UW}coooo.`,
      `${UO} ,loooooooc.                        ${UW}.loooo.`,
      `${UO}   .,;;;'.                          ${UW};ooooc`,
      `${UW}       ...                         ${UW},ooool.`,
      `${UW}    .cooooc.              ${UO}..',,'.  ${UW}.cooo.`,
      `${UW}      ;ooooo:.           ${UO};oooooooc.  ${UW}:l.`,
      `${UW}       .coooooc,..      ${UO}coooooooooo.`,
      `${UW}         .:ooooooolc:. ${UO}.ooooooooooo'`,
      `${UW}           .':loooooo;  ${UO},oooooooooc`,
      `${UW}               ..';::c'  ${UO}.;loooo:'${R}`,
      `${UO}  Ubuntu 24.04 LTS${R}`,
    ],
    // Authentic Ubuntu bash prompt: root@ubuntu:path#
    prompt: `${E}[1;32mroot@ubuntu${E}[0m:${E}[1;34m$P${E}[0m${E}[1;37m#${E}[0m `,
  },
  {
    key: 'debian',
    name: 'Debian',
    shell: 'cmd',
    banner: [
      `${DC}        _,met$$$$$gg.`,
      `${DC}     ,g$$$$$$$$$$$$$$$P.`,
      `${DC}   ,g$$$P""       """Y$$.".`,
      `${DC}  ,$$$$P'              \`$$$$.`,
      `${DC}',$$$$P       ,ggs.     \`$$b:`,
      `${DC}\`d$$$$'     ,$P"'   ${UW}.${DC}    $$$$`,
      `${DC} $$$$P      d$'     ${UW},${DC}    $$$$P`,
      `${DC} $$$$:      $$$.   ${UW}-${DC}    ,d$$$P'`,
      `${DC} $$$$;      Y$b._   _,d$P'`,
      `${DC} Y$$$$.    ${UW}\`.\`"${DC}Y$$$$$$P"'`,
      `${DC} \`$$$$b      ${UW}"-.__`,
      `${DC}  \`Y$$$$b`,
      `${DC}   \`Y$$$$.`,
      `${DC}     \`$$$$b.`,
      `${DC}       \`Y$$$$b.`,
      `${DC}         \`"Y$$b._`,
      `${DC}             \`""""${R}`,
      `${DC}  Debian GNU/Linux 12 (bookworm)${R}`,
    ],
    // Authentic Debian prompt: root@debian:path#
    prompt: `${E}[1;31mroot@debian${E}[0m:${E}[1;34m$P${E}[0m${E}[1;37m#${E}[0m `,
  },
  {
    key: 'arch',
    name: 'Arch Linux',
    shell: 'cmd',
    banner: [
      `${AC}                  -\``,
      `${AC}                 .o+\``,
      `${AC}                \`ooo/`,
      `${AC}               \`+oooo:`,
      `${AC}              \`+oooooo:`,
      `${AC}              -+oooooo+:`,
      `${AC}            \`/:-:++oooo+:`,
      `${AC}           \`/++++/+++++++:`,
      `${AC}          \`/++++++++++++++:`,
      `${AC}         \`/+++o${AL}oooooooo${AC}oooo/\``,
      `${AC}        ./${AL}ooosssso++osssssso${AC}+\``,
      `${AL}       .oossssso-\`\`\`\`/ossssss+\``,
      `${AL}      -osssssso.      :ssssssso.`,
      `${AL}     :osssssss/        osssso+++.`,
      `${AL}    /ossssssss/        +ssssooo/-`,
      `${AL}  \`/ossssso+/:-        -:/+osssso+-`,
      `${AL} \`+sso+:-\`                 \`.-/+oso:`,
      `${AL}\`++:.                           \`-/+/`,
      `${AL}.\`                                 \`/${R}`,
      `${AC}  Arch Linux${R}`,
    ],
    // Authentic Arch Linux prompt: [root@arch path]#
    prompt: `${E}[1;36m[${E}[1;37mroot@arch ${E}[1;36m$P${E}[1;36m]#${E}[0m `,
  },
  {
    key: 'fedora',
    name: 'Fedora',
    shell: 'cmd',
    banner: [
      `${FB}             .',;::::;,'.`,
      `${FB}         .';:cccccccccccc:;,.`,
      `${FB}      .;cccccccccccccccccccccc;.`,
      `${FB}    .:cccccccccccccccccccccccccc:.`,
      `${FB}  .;ccccccccccccc;${FW}.:dddl:.${FB};ccccccc;.`,
      `${FB} .:ccccccccccccc;${FW}OWMKOOXMWd${FB};ccccccc:.`,
      `${FB}.:ccccccccccccc;${FW}KMMc${FB};cc;${FW}xMMc${FB};ccccccc:.`,
      `${FB},cccccccccccccc;${FW}MMM.${FB};cc;${FW};WW:${FB};cccccccc,`,
      `${FB}:cccccccccccccc;${FW}MMM.${FB};cccccccccccccccc:`,
      `${FB}:ccccccc;${FW}oxOOOo${FB};${FW}MMM000k.${FB};cccccccccccc:`,
      `${FB}cccccc;${FW}0MMKxdd:${FB};${FW}MMMkddc.${FB};cccccccccccc;`,
      `${FB}ccccc;${FW}XMO'${FB};cccc;${FW}MMM.${FB};cccccccccccccccc'`,
      `${FB}ccccc;${FW}MMo${FB};ccccc;${FW}MMW.${FB};ccccccccccccccc;`,
      `${FB}ccccc;${FW}0MNc.${FB}ccc${FW}.xMMd${FB};ccccccccccccccc;`,
      `${FB}cccccc;${FW}dNMWXXXWM0:${FB};cccccccccccccc:,`,
      `${FB}cccccccc;${FW}.:odl:.${FB};cccccccccccccc:,.`,
      `${FB}ccccccccccccccccccccccccccccc:'.`,
      `${FB}:ccccccccccccccccccccccc:;,..`,
      `${FB} ':cccccccccccccccc::;,.${R}`,
      `${FB}  Fedora Linux 40${R}`,
    ],
    // Authentic Fedora bash prompt: [root@fedora path]#
    prompt: `${E}[1;34m[${E}[1;37mroot@fedora ${E}[1;34m$P${E}[1;34m]#${E}[0m `,
  },
  {
    key: 'windows',
    name: 'Windows (cmd.exe)',
    shell: 'cmd',
    banner: [
      `${WB}  ################    ################`,
      `${WB}  ################    ################`,
      `${WB}  ################    ################`,
      `${WB}  ################    ################`,
      `${WB}  ################    ################`,
      `${WB}  ################    ################`,
      `${WB}  ################    ################`,
      ``,
      `${WB}  ################    ################`,
      `${WB}  ################    ################`,
      `${WB}  ################    ################`,
      `${WB}  ################    ################`,
      `${WB}  ################    ################`,
      `${WB}  ################    ################`,
      `${WB}  ################    ################${R}`,
      `${WB}  Microsoft Windows${R} \x1b[2m(cmd.exe)${R}`,
    ],
    prompt: `$P$G `,
  },
  {
    key: 'powershell',
    name: 'Windows PowerShell',
    shell: 'powershell',
    banner: [
      `${PB}                 #,`,
      `${PB}                 ###_`,
      `${PB}                 #####_`,
      `${PB}                 #######_`,
      `${PB}                 #########_`,
      `${PB}  ${PY}_____${PB}           ###########_`,
      `${PB}  ${PY}\\    ~~~~~-_${PB}    #############_`,
      `${PB}   ${PY}\\          ~-_${PB} ###############_`,
      `${PB}    ${PY}\\            ~${PB}################`,
      `${PB}     ${PY}\\              ~${PB}#############`,
      `${PB}      ${PY}\\            _~${PB}#############`,
      `${PB}       ${PY}\\       _ -~   ${PB}############`,
      `${PB}        ${PY}\\  _ -~        ${PB}###########`,
      `${PB}         ${PY}~              ${PB}##########`,
      `${PB}                         #########`,
      `${PB}                          ########`,
      `${PB}                           #######`,
      `${PB}                            ######`,
      `${PB}                             #####`,
      `${PB}                              ####`,
      `${PB}                               ###`,
      `${PB}                                ##`,
      `${PB}                                 #${R}`,
      `${PB}  Windows PowerShell${R}`,
    ],
    // Authentic PowerShell prompt in PowerShell Blue & White
    psPrompt:
      'function prompt { [char]27 + "[1;34mPS " + [char]27 + "[0;37m" + (Get-Location).Path + [char]27 + "[1;34m>" + [char]27 + "[0m " }',
  },
  {
    key: 'macos',
    name: 'macOS (zsh)',
    shell: 'cmd',
    banner: [
      `${MG}                    ..'`,
      `${MG}                ,xNMM.`,
      `${MG}              .OMMMMo`,
      `${MG}              lMM"`,
      `${MG}    .;loddo:.  .olloddol;.`,
      `${MG}  cKMMMMMMMMMMNWMMMMMMMMMM0:`,
      `${MY}.KMMMMMMMMMMMMMMMMMMMMMMMWd.`,
      `${MY}XMMMMMMMMMMMMMMMMMMMMMMMX.`,
      `${MO};MMMMMMMMMMMMMMMMMMMMMMMM:`,
      `${MO}:MMMMMMMMMMMMMMMMMMMMMMMM:`,
      `${MR}.MMMMMMMMMMMMMMMMMMMMMMMMX.`,
      `${MR}kMMMMMMMMMMMMMMMMMMMMMMMMWd.`,
      `${MP}'XMMMMMMMMMMMMMMMMMMMMMMMMMMk`,
      `${MP} 'XMMMMMMMMMMMMMMMMMMMMMMMMK.`,
      `${MB}   kMMMMMMMMMMMMMMMMMMMMMMd`,
      `${MB}    ;KMMMMMMMWXXWMMMMMMMk.`,
      `${MB}      "cooc*"    "*coo'"${R}`,
      `${MG}  macOS Sonoma${R}`,
    ],
    // Authentic macOS zsh prompt: user@MacBook-Pro path %
    prompt: `${E}[1;37muser@MacBook-Pro ${E}[1;36m$P${E}[0m ${E}[1;32m%${E}[0m `,
  },
  {
    key: 'alpine',
    name: 'Alpine Linux',
    shell: 'cmd',
    banner: [
      `${AB}       .hddddddddddddddddddddddh.`,
      `${AB}      :dddddddddddddddddddddddddd:`,
      `${AB}     /dddddddddddddddddddddddddddd/`,
      `${AB}    +dddddddddddddddddddddddddddddd+`,
      `${AB}  \`sdddddddddddddddddddddddddddddddds\``,
      `${AB} \`ydddddddddddd++hdddddddddddddddddddy\``,
      `${AB}.hddddddddddd+\`  \`+ddddh:-sdddddddddddh.`,
      `${AB}hdddddddddd+\`      \`+y:    .sddddddddddh`,
      `${AB}ddddddddh+\`   \`//\`   \`.\`     -sddddddddd`,
      `${AB}ddddddh+\`   \`/hddh/\`   \`:s-    -sddddddd`,
      `${AB}ddddh+\`   \`/+/dddddh/\`   \`+s-    -sddddd`,
      `${AB}ddd+\`   \`/o\` :dddddddh/\`   \`oy-    .yddd`,
      `${AB}hdddyo+ohddyosdddddddddho+oydddy++ohdddh`,
      `${AB}.hddddddddddddddddddddddddddddddddddddh.`,
      `${AB} \`yddddddddddddddddddddddddddddddddddy\``,
      `${AB}  \`sdddddddddddddddddddddddddddddddds\``,
      `${AB}    +dddddddddddddddddddddddddddddd+`,
      `${AB}     /dddddddddddddddddddddddddddd/`,
      `${AB}      :dddddddddddddddddddddddddd:`,
      `${AB}       .hddddddddddddddddddddddh.${R}`,
      `${AB}  Alpine Linux 3.20${R}`,
    ],
    // Authentic Alpine ash prompt: alpine:path#
    prompt: `${E}[1;34malpine${E}[0m:${E}[1;36m$P${E}[0m${E}[1;37m#${E}[0m `,
  },
];

module.exports = { themes };
