import assert from "node:assert/strict";
import test from "node:test";
import { isFormat, rosterFromValues, roundRoles, pairedTurn } from "../src/utils/competition.js";

const names = (count) => Object.fromEntries(["A", "B"].flatMap((side) => Array.from({ length: count }, (_, index) => [`team${side}member${index + 1}`, ` ${side}${index + 1} `])));

test("only supported formats are accepted", () => {
  assert.ok(["1v1", "2v2", "teams"].every(isFormat));
  for (const value of [null, "", "3v3", "unknown"]) assert.equal(isFormat(value), false);
});
test("solo and pairs enforce their roster size and trim names", () => {
  assert.deepEqual(rosterFromValues(names(3), "1v1"), [["A1"], ["B1"]]);
  assert.deepEqual(rosterFromValues(names(3), "2v2"), [["A1", "A2"], ["B1", "B2"]]);
});
test("group rosters support every configured member and reject incomplete or invalid teams", () => {
  assert.deepEqual(rosterFromValues({ ...names(8), teamSize: 8 }, "teams")[0], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"]);
  assert.throws(() => rosterFromValues({ ...names(2), teamSize: 3 }, "teams"));
  for (const teamSize of [0, 1, 9, 2.5, "invalid"]) assert.throws(() => rosterFromValues({ ...names(8), teamSize }, "teams"));
});
test("solo host gives clues, while each member of a larger team gets a turn", () => {
  assert.deepEqual(roundRoles(["Lina"], 3, "Noor"), { clueGiver: "Noor", guessers: ["Lina"] });
  const team = ["Lina", "Omar", "Hala"];
  assert.deepEqual([0, 1, 2, 3].map((round) => roundRoles(team, round, "Noor").clueGiver), ["Lina", "Omar", "Hala", "Lina"]);
  assert.deepEqual(roundRoles(team, 1, "Noor").guessers, ["Lina", "Hala"]);
});
test("Pictionary persists its format and roster without changing PassWord; reset clears the active session", async () => {
  const data = new Map([["password-master", "Existing host"], ["password-members", '[["A","B"],["C","D"]]']]);
  globalThis.localStorage = { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, String(value)), removeItem: (key) => data.delete(key) };
  const { default: reducer, setNames, addScores, reset } = await import("../src/redux/pictionary.js");
  let state = reducer(undefined, { type: "init" });
  assert.equal(state.master, "");
  state = reducer(state, setNames({ master: "Host", format: "1v1", members: [["Lina"], ["Omar"]] }));
  state = reducer(state, addScores({ team: "Team A", point: 1 }));
  assert.equal(data.get("pictionary-format"), "1v1");
  assert.deepEqual(JSON.parse(data.get("pictionary-members")), [["Lina"], ["Omar"]]);
  assert.equal(data.get("password-master"), "Existing host");
  state = reducer(state, reset());
  assert.equal(state.master, "");
  assert.deepEqual(state.history, []);
  assert.equal(data.has("pictionary-format"), false);
  assert.equal(data.has("pictionary-members"), false);
  assert.equal(data.get("password-master"), "Existing host");
});

test("paired rounds alternate teams and give each teammate a full turn", () => {
  const teams = [["A1", "A2"], ["B1", "B2"]];
  const turns = Array.from({ length: 8 }, (_, round) => {
    const { teamIndex, roleRound } = pairedTurn(round);
    return roundRoles(teams[teamIndex], roleRound, "Host").clueGiver;
  });
  assert.deepEqual(turns, ["A1", "B1", "A2", "B2", "A1", "B1", "A2", "B2"]);
});

test("legacy game restart clears scores and reset clears active state without touching another game", async () => {
  const data = new Map([["password-master", "Unchanged"]]);
  globalThis.localStorage = { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, String(value)), removeItem: (key) => data.delete(key) };
  for (const name of ["listwords", "catchphrase"]) {
    const { default: reducer, setNames, addScores, reset } = await import(`../src/redux/${name}.js`);
    const setup = { master: "Host", member1: "Lina", member2: "Omar" };
    let state = reducer(undefined, setNames(setup));
    state = reducer(state, addScores({ team: "Lina", point: 1 }));
    state = reducer(state, setNames(setup));
    assert.equal(state.master, "Host");
    assert.deepEqual(state.members, ["Lina", "Omar"]);
    assert.deepEqual(state.history, []);
    assert.equal(data.get(`${name}-history`), "[]");
    state = reducer(state, reset());
    assert.equal(state.master, "");
    assert.deepEqual(state.members, ["", ""]);
    assert.deepEqual(state.history, []);
    assert.equal(data.has(`${name}-master`), false);
  }
  const { default: reducer, setRoles, reset } = await import("../src/redux/mafia.js");
  const state = reducer(reducer(undefined, setRoles({ master: "Host", killers: 2, citizens: 8, drowner: "No" })), reset());
  assert.equal(state.master, "");
  assert.deepEqual(state.roles, {});
  assert.equal(data.has("mafia-master"), false);
  assert.equal(data.get("password-master"), "Unchanged");
});
