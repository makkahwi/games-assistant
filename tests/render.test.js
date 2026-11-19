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
test("home requires a format before showing game actions", () => {
  const home = render(createElement(Landing), "/");
  assert.match(home, /Who’s taking a break/);
  assert.doesNotMatch(home, /Start Game/);
  for (const format of ["1v1", "2v2", "teams"]) {
    const selected = render(createElement(Landing), `/?format=${format}`);
    assert.match(selected, /Start Game/);
    assert.match(selected, /What’s the break plan/);
    assert.equal(selected.includes("Mafia needs a group"), format !== "teams");
  }
});
test("setup asks for a host and exactly the chosen number of players", () => {
  for (const [format, count] of [["1v1", 3], ["2v2", 5], ["teams", 7]]) {
    const html = render(createElement(Setup, { game: "PassWord", setNames: () => ({ type: "setup" }) }), `/password?format=${format}`);
    assert.equal((html.match(/<input /g) || []).length, count);
    assert.equal(html.includes('id="team-size"'), format === "teams");
  }
  const direct = render(createElement(Setup, { game: "PassWord" }), "/password");
  assert.match(direct, /Who’s taking a break/);
  assert.doesNotMatch(direct, /<form/);
});
test("Arabic home and setup include translated format labels and player fields", async () => {
  await i18n.changeLanguage("ar");
  assert.match(render(createElement(Landing), "/"), /مين معنا بالبريك/);
  const html = render(createElement(Setup, { game: "PassWord" }), "/password?format=1v1");
  assert.match(html, /اسم اللاعب 1/);
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
