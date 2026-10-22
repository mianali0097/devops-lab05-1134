// test/build.test.js — runs on Node's built-in test runner. No test framework.
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');

const pages = fs.readdirSync('out').filter((f) => f.endsWith('.html'));

test('every source produced a page', () => {
  const sources = fs.readdirSync('src').filter((f) => f.endsWith('.md'));
  assert.strictEqual(pages.length, sources.length);
});

test('every page is real HTML and not raw Markdown', () => {
  for (const p of pages) {
    const html = fs.readFileSync('out/' + p, 'utf8');
    assert.match(html, /^<!doctype html>/);
    assert.doesNotMatch(html, /^# /m);
  }
});


test('build output is reproducible', () => {
  const os = require('os');
  const path = require('path');
  const { execFileSync } = require('child_process');
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'lab05-build-'));

  try {
    const sources = fs.readdirSync('src').filter((f) => f.endsWith('.md'));
    for (const source of sources) {
      const dest = path.join(temp, source.replace(/\.md$/, '.html'));
      execFileSync(process.execPath, ['tools/build.js', 'src/' + source, dest]);
      const original = fs.readFileSync('out/' + source.replace(/\.md$/, '.html'), 'utf8');
      const rebuilt = fs.readFileSync(dest, 'utf8');
      assert.strictEqual(rebuilt, original);
    }
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});
