import assert from "node:assert/strict";
import { before, after, test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { createInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { createServer } from "vite";
import { readFile } from "node:fs/promises";

let server, Landing, Setup, GameRoute;
const i18n = createInstance();
before(async () => {
  await i18n.use(initReactI18next).init({ lng: "en", fallbackLng: "en", resources: { en: { translations: {} }, ar: { translations: JSON.parse(await readFile(new URL("../src/assets/locales/ar.json", import.meta.url))) } }, defaultNS: "translations", interpolation: { escapeValue: false } });
  server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false, watch: null } });
  Landing = (await server.ssrLoadModule("/src/views/index.jsx")).default;
  Setup = (await server.ssrLoadModule("/src/components/Competition/Setup.jsx")).default;
  GameRoute = (await server.ssrLoadModule("/src/components/Competition/GameRoute.jsx")).default;
});
after(async () => { await server?.close(); });
const render = (component, url, session = { master: "" }) => {
  const store = configureStore({ reducer: { password: () => session } });
  return renderToStaticMarkup(createElement(I18nextProvider, { i18n }, createElement(Provider, { store }, createElement(MemoryRouter, { initialEntries: [url] }, component))));
};
test("library groups pairs separately from uncapped Mafia", () => {
  const home = render(createElement(Landing), "/");
  assert.match(home, /PassWord/);
  assert.match(home, /Pictionary/);
  assert.doesNotMatch(home, /game-mafia/);
  assert.match(home, /password\?format=2v2/);
  const group = render(createElement(Landing), "/?format=group");
  assert.match(group, /game-mafia/);
  assert.doesNotMatch(group, /game-password/);
  assert.doesNotMatch(group, /game-pictionary/);
  assert.match(group, /No player limit/);
});
test("new pair setups always ask for a host and exactly two players per team", () => {
  for (const game of ["PassWord", "Pictionary"]) {
    for (const query of ["", "?format=1v1", "?format=2v2", "?format=teams"]) {
      const html = render(createElement(Setup, { game }), `/password${query}`);
      assert.equal((html.match(/<input /g) || []).length, 5);
      assert.doesNotMatch(html, /id="team-size"/);
    }
  }
});
test("Arabic setup includes both named team members", async () => {
  await i18n.changeLanguage("ar");
  const html = render(createElement(Setup, { game: "PassWord" }), "/password");
  assert.match(html, /اسم اللاعب 1/);
  assert.match(html, /اسم اللاعب 2/);
  assert.match(html, /اسم مقدّم البريك/);
  await i18n.changeLanguage("en");
});
test("a saved game cannot silently open in a different format", () => {
  const component = createElement(GameRoute, { name: "password", game: createElement("p", null, "Saved game"), setup: createElement("p", null, "New setup") });
  const session = { master: "Host", format: "teams" };
  assert.match(render(component, "/password?format=1v1", session), /Resume saved game/);
  assert.match(render(component, "/password?format=teams", session), /Saved game/);
  assert.match(render(component, "/password?format=1v1"), /New setup/);
});

test("rules show their first section even when it is not Introduction", async () => {
  const Rules = (await server.ssrLoadModule("/src/views/Common/GameRules.jsx")).default;
  const html = render(createElement(Rules, { gameName: "PassWord", rules: [{ title: "How To Play", rules: ["Keep the word private."] }, { title: "Scores", rules: ["Win points."] }] }), "/password-rules");
  assert.match(html, /aria-selected="true"/);
  assert.match(html, /role="tabpanel"[^>]*class="club-panel">/);
  assert.match(html, /Keep the word private/);
  assert.match(html, /hidden=""/);
});

test("setup connects visible field labels to inputs and preserves required validation", () => {
  const html = render(createElement(Setup, { game: "PassWord" }), "/password?format=1v1");
  const ids = [...html.matchAll(/<input[^>]*id="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, 5);
  for (const id of ids) assert.ok(html.includes(`for="${id}"`));
  assert.equal((html.match(/required=""/g) || []).length, 5);
});
