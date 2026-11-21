// A working gta6-meme-x-01 entry (Node 22, standard library only).
//
// The entry is the X post itself: this program only copies POST.json from the
// repository root to /output/POST.json, where the gate reads it. The house
// reads the post from X (its first picture and its text) and hands that to
// the judge. Nothing this program writes about the post is judged.
//
// POST.json holds a placeholder address until the post is published; the
// parent replaces it with the real post address before submitting. The
// placeholder as it stands is refused by the gate (valid 0), so never
// submit without the real post URL in place.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
