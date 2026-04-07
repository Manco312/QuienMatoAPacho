"use client";

import { useState, useRef, useCallback } from "react";

interface Props {
  onSolved: (digit: number) => void;
  solved: boolean;
}

// T9 Multi-tap phone cipher
// Target word: ODIO
// O = press 6 three times (666)
// D = press 3 once (3)
// I = press 4 three times (444)
// O = press 6 three times (666)
// Digit revealed: 2 (diary page 2)

const KEY_LETTERS: Record<string, string[]> = {
  "2": ["A", "B", "C"],
  "3": ["D", "E", "F"],
  "4": ["G", "H", "I"],
  "5": ["J", "K", "L"],
  "6": ["M", "N", "O"],
  "7": ["P", "Q", "R", "S"],
  "8": ["T", "U", "V"],
  "9": ["W", "X", "Y", "Z"],
};

const HINTS = [
  "TELEFONO ANTIGUO.",
  "Puedes confirmar cada letra o esperar a que se confirme automáticamente después de un tiempo.",
];

interface PhoneState {
  committedLetters: string[];
  pendingKey: string | null;
  pendingCycles: number;
}

export default function Puzzle3({ onSolved, solved }: Props) {
  const [phoneState, setPhoneState] = useState<PhoneState>({
    committedLetters: [],
    pendingKey: null,
    pendingCycles: 0,
  });
  const [error, setError] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const commitPending = useCallback((state: PhoneState): PhoneState => {
    if (!state.pendingKey || state.pendingCycles === 0) {
      return { ...state, pendingKey: null, pendingCycles: 0 };
    }
    const letters = KEY_LETTERS[state.pendingKey];
    const letter = letters[(state.pendingCycles - 1) % letters.length];
    return {
      committedLetters: [...state.committedLetters, letter],
      pendingKey: null,
      pendingCycles: 0,
    };
  }, []);

  function handleKeyPress(key: string) {
    if (solved) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    setPhoneState((prev) => {
      if (prev.pendingKey === key) {
        // Same key: increment cycles
        return { ...prev, pendingCycles: prev.pendingCycles + 1 };
      } else {
        // Different key: commit previous, start new
        const committed = commitPending(prev);
        return { ...committed, pendingKey: key, pendingCycles: 1 };
      }
    });

    // Auto-commit after 1.8 seconds
    timerRef.current = setTimeout(() => {
      setPhoneState((prev) => commitPending(prev));
    }, 1800);
  }

  function handleManualCommit() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhoneState((prev) => commitPending(prev));
  }

  function handleBackspace() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhoneState((prev) => {
      if (prev.pendingKey) {
        return { ...prev, pendingKey: null, pendingCycles: 0 };
      }
      return {
        ...prev,
        committedLetters: prev.committedLetters.slice(0, -1),
      };
    });
  }

  function handleClear() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhoneState({ committedLetters: [], pendingKey: null, pendingCycles: 0 });
    setError(false);
  }

  function getPendingLetter(state: PhoneState): string {
    if (!state.pendingKey || state.pendingCycles === 0) return "";
    const letters = KEY_LETTERS[state.pendingKey];
    return letters[(state.pendingCycles - 1) % letters.length];
  }

  function handleSubmit() {
    // Also check without auto-commit (submit commits)
    const committedFinal = phoneState.pendingKey
      ? [...phoneState.committedLetters, getPendingLetter(phoneState)]
      : phoneState.committedLetters;

    if (committedFinal.join("") === "ODIO") {
      onSolved(2);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  const pendingLetter = getPendingLetter(phoneState);
  const displayWord =
    phoneState.committedLetters.join("") +
    (pendingLetter ? `[${pendingLetter}]` : "");

  return (
    <div className={`puzzle-card ${solved ? "solved" : ""}`}>
      <div className="puzzle-header">
        <div>
          <div className="puzzle-number">Acertijo 03 — El Diario Cifrado</div>
          <div className="puzzle-title">El Teléfono de Jose</div>
        </div>
        {solved && (
          <div className="puzzle-solved-badge">✓ RESUELTO — DÍGITO: 2</div>
        )}
      </div>

      <div className="puzzle-body">
        <p className="puzzle-context">
          En el casillero del sótano, entre herramientas viejas, el inspector
          encontró un diario de notas con cubierta roja. Jose escribía en
          clave, usando la notación de los teléfonos móviles de los años 90.
          La página 2 contenía una sola palabra. Esa palabra lo decía todo.
        </p>

        <img
          src="/diario.png"
          alt="Diario"
          style={{
            width: "30%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />

        <div className="cipher-display">
          <div className="cipher-code">6x33x14x36x3</div>
          <div className="cipher-sublabel">
            Página 2 del diario
          </div>
        </div>

        <div className="phone-container">
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                marginBottom: "0.3rem",
                letterSpacing: "0.15em",
              }}
            >
              PANTALLA
            </div>
            <div className="phone-display">
              {solved ? (
                "ODIO"
              ) : displayWord ? (
                displayWord
              ) : (
                <span style={{ opacity: 0.25 }}>_</span>
              )}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--text-muted)",
                marginTop: "0.3rem",
                marginBottom: "0.75rem",
              }}
            >
              {phoneState.pendingKey && (
                <>
                  Tecla [{phoneState.pendingKey}] × {phoneState.pendingCycles} →{" "}
                  <span style={{ color: "var(--accent-gold-dim)" }}>
                    {pendingLetter}
                  </span>{" "}
                  (presiona otra tecla o confirmar)
                </>
              )}
            </div>
            <div className="phone-actions">
              <button className="phone-commit-btn" onClick={handleManualCommit}>
                ✓ CONFIRMAR LETRA
              </button>
              <button className="phone-clear-btn" onClick={handleBackspace}>
                ← BORRAR
              </button>
              <button className="phone-clear-btn" onClick={handleClear}>
                ✕ LIMPIAR
              </button>
            </div>
            {error && (
              <div
                className="feedback-error"
                style={{ marginTop: "0.75rem" }}
              >
                ✗ Esa no es la palabra del diario.
              </div>
            )}
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                marginBottom: "0.3rem",
                letterSpacing: "0.15em",
              }}
            >
              TECLADO
            </div>
            <div className="phone-keypad">
              {/* 1 key (inactive) */}
              <div
                className="phone-key"
                style={{ background: "#141414", cursor: "default" }}
              >
                <span
                  className="phone-key-number"
                  style={{ color: "#444" }}
                >
                  1
                </span>
              </div>
              {/* 2, 3, 4 */}
              {(["2", "3", "4"] as const).map((k) => (
                <button
                  key={k}
                  className={`phone-key ${
                    phoneState.pendingKey === k ? "active" : ""
                  }`}
                  onClick={() => handleKeyPress(k)}
                >
                  <span className="phone-key-number">{k}</span>
                  <span className="phone-key-letters">
                    {KEY_LETTERS[k].join(" ")}
                  </span>
                </button>
              ))}
              {/* 5, 6, 7 */}
              {(["5", "6", "7"] as const).map((k) => (
                <button
                  key={k}
                  className={`phone-key ${
                    phoneState.pendingKey === k ? "active" : ""
                  }`}
                  onClick={() => handleKeyPress(k)}
                >
                  <span className="phone-key-number">{k}</span>
                  <span className="phone-key-letters">
                    {KEY_LETTERS[k].join(" ")}
                  </span>
                </button>
              ))}
              {/* 8, 9 */}
              {(["8", "9"] as const).map((k) => (
                <button
                  key={k}
                  className={`phone-key ${
                    phoneState.pendingKey === k ? "active" : ""
                  }`}
                  onClick={() => handleKeyPress(k)}
                >
                  <span className="phone-key-number">{k}</span>
                  <span className="phone-key-letters">
                    {KEY_LETTERS[k].join(" ")}
                  </span>
                </button>
              ))}
              {/* 0 key (inactive) */}
              <div
                className="phone-key"
                style={{ background: "#141414", cursor: "default" }}
              >
                <span
                  className="phone-key-number"
                  style={{ color: "#444" }}
                >
                  0
                </span>
              </div>
            </div>
          </div>
        </div>

        {!solved && (
          <>
            <div className="input-row">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Enviar palabra
              </button>
            </div>

            <div className="hint-section">
              {Array.from({ length: hintsShown }, (_, i) => (
                <div className="hint-box" key={i}>
                  <span className="hint-box-label">Pista {i + 1}</span>
                  {HINTS[i]}
                </div>
              ))}
              {hintsShown < HINTS.length && (
                <button
                  className="btn btn-hint"
                  onClick={() => setHintsShown((h) => h + 1)}
                >
                  {hintsShown === 0
                    ? "Revelar pista"
                    : `Pista ${hintsShown + 1}`}
                </button>
              )}
            </div>
          </>
        )}

        {solved && (
          <div className="feedback-success">
            <div className="feedback-success-title">
              ✓ Palabra descifrada: ODIO
            </div>
            <div className="feedback-success-text">
              El motivo era el odio. Jose odiaba a Pacho: el mapache
              había recibido el reconocimiento público que Jose creía merecer
              por su trabajo en los proyectos de NOVA. La entrada del diario
              estaba en la <strong>página 2</strong>. Tercer dígito del código
              final: <span className="feedback-success-digit">2</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
