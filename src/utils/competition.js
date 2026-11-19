export const formats = [
  { id: "1v1", label: "1 vs 1", icon: "fa-user", description: "A friendly face-off with your work bestie.", detail: "2 players + a host" },
  { id: "2v2", label: "2 vs 2", icon: "fa-user-group", description: "Pair up. Take on the desk next door.", detail: "4 players + a host" },
  { id: "teams", label: "Team vs team", icon: "fa-people-group", description: "Bring the whole crew to the break table.", detail: "2–8 per team + a host" },
];
export const isFormat = (value) => formats.some(({ id }) => id === value);
export const formatLabel = (value) => formats.find(({ id }) => id === value)?.label || "Team vs team";
export const rosterFromValues = (values, format) => {
  if (!isFormat(format)) throw new Error("Invalid format");
  const count = format === "1v1" ? 1 : format === "2v2" ? 2 : Number(values.teamSize);
  if (!Number.isInteger(count) || count < 1 || count > 8 || (format === "teams" && count < 2)) throw new Error("Invalid team size");
  return ["A", "B"].map((team) => Array.from({ length: count }, (_, index) => {
    const name = values[`team${team}member${index + 1}`]?.trim();
    if (!name) throw new Error("Every player needs a name");
    return name;
  }));
};
// The host gives clues in 1 vs 1; larger teams rotate through every player.
export const roundRoles = (members, round, host) => ({
  clueGiver: members.length === 1 ? host : members[round % members.length],
  guessers: members.length === 1 ? members : members.filter((_, index) => index !== round % members.length),
});

// Public library groups are independent of formats retained for saved games.
export const gameGroups = [
  { id: "2v2", label: "2 vs 2", icon: "fa-user-group", description: "Two teams. Two players on each team.", detail: "4 players + a host" },
  { id: "group", label: "Multiplayer group", icon: "fa-people-group", description: "Everyone joins the same game with their own role.", detail: "No player limit" },
];

// Each team takes a turn before teammates exchange roles: A1, B1, A2, B2.
export const pairedTurn = (round) => ({ teamIndex: round % 2, roleRound: Math.floor(round / 2) });
