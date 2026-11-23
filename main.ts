// A Day of One-Line Pitches — a make.fun entry.
//
// The whole entry is one sentence that would convince a friend who has
// never coded to let an AI agent build their first app idea on make.fun.
// The program's only job is to put that sentence into /output/entry.txt,
// exactly as written.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "You've carried that app idea long enough — tell it in plain words " +
  "to an AI agent on make.fun and by tonight you'll be tapping a first " +
  "version of it, free, with no code to learn.";

// The gate only accepts 1 to 240 characters of real text, and the judge
// only compares one complete sentence. Refuse to write anything that
// does not meet both bars, so a bad edit fails loudly here instead of
// silently scoring zero.
function checkPitch(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 240 || text.trim().length === 0) {
    throw new Error(`pitch is ${chars} characters, outside 1-240`);
  }
  // "make.fun" holds a dot that is not a sentence break, so hide it
  // before counting sentences.
  const masked = text.replaceAll("make.fun", "makefun");
  const sentences = masked.split(/[.!?]+/).filter((part) => part.trim() !== "");
  if (sentences.length !== 1) {
    throw new Error(`pitch has ${sentences.length} sentences, expected exactly 1`);
  }
}

checkPitch(PITCH);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), PITCH, "utf8");
