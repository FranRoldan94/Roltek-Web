import type { Project } from "@/types/content";

export const mindcrown: Project = {
  slug: "mindcrown",
  title: "Mindcrown",
  description: {
    es: "App de puzzles de lógica para iPhone con retos diarios y duelos con amigos.",
    en: "A logic puzzle app for iPhone with daily challenges and duels with friends.",
  },
  summary: {
    es: "Mindcrown reúne puzzles de lógica (Coronas, Binario, Sudoku y Trazo) con un reto diario igual para todos, un modo automático que adapta la dificultad a cada jugador y desafíos para jugar con amigos en Game Center: Tempo, en vivo, y Picas y Fijas, por turnos.",
    en: "Mindcrown brings together logic puzzles (Crowns, Binary, Sudoku and Path) with a daily challenge that's the same for everyone, an automatic mode that adapts the difficulty to each player, and challenges to play with friends on Game Center: Tempo, live, and Bulls and Cows, turn-based.",
  },
  categories: ["mobile"],
  technologies: ["Swift", "SwiftUI", "GameKit", "StoreKit", "SwiftData"],
  year: 2026,
  status: "beta",
  visual: "grid",
  privacyPath: "/privacy/mindcrown",
  supportPath: "/support/mindcrown",
  featured: true,
};
