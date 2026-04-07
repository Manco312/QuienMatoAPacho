"use client";

import { useState, useRef } from "react";

interface Props {
  digits: (number | null)[];
  onSolved: () => void;
  solved: boolean;
}

// Final code: 2739
// Order: why(ODIO→2) → who(MARCO→7) → where(SOTANO→3) → how(VENENO→9)
// The digits from puzzles 1-4 are: [3, 7, 2, 9]
// Players must REORDER them as: 2, 7, 3, 9

const CORRECT_CODE = ["2", "7", "3", "9"];

const HINTS = [
  "¿Qué significa cada concepto?",
  "¿A qué se refiere el detective con 'el orden natural de la investigación'?",
];

export default function Puzzle5({ digits, onSolved, solved }: Props) {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const allDigitsFound = digits.every((d) => d !== null);

  function handleInputChange(index: number, value: string) {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...inputs];
    next[index] = digit;
    setInputs(next);
    // Auto-advance
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !inputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleSubmit() {
    if (inputs.join("") === CORRECT_CODE.join("")) {
      onSolved();
    } else {
      setError(true);
      setShakeKey((k) => k + 1);
      setTimeout(() => setError(false), 1500);
    }
  }

  const discoveredInfo = [
    { puzzle: "Acertijo 1", concept: "???", word: "???", digit: digits[0] },
    { puzzle: "Acertijo 2", concept: "???", word: "???", digit: digits[1] },
    { puzzle: "Acertijo 3", concept: "???", word: "???", digit: digits[2] },
    { puzzle: "Acertijo 4", concept: "???", word: "???", digit: digits[3] },
  ];

  return (
    <div className={`puzzle-card ${solved ? "solved" : ""}`}>
      <div className="puzzle-header">
        <div>
          <div className="puzzle-number">Acertijo 05 — La Caja de Evidencias</div>
          <div className="puzzle-title">El Código Final</div>
        </div>
        {solved && (
          <div className="puzzle-solved-badge">✓ CASO CERRADO</div>
        )}
      </div>

      <div className="puzzle-body">

        {/* Digits collected */}
        <div
          style={{
            background: "var(--bg-input)",
            border: "1px solid var(--border-mid)",
            padding: "1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--accent-gold-dim)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Dígitos descubiertos
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.75rem",
            }}
          >
            {discoveredInfo.map((info, i) => (
              <div
                key={i}
                style={{
                  background: info.digit !== null ? "rgba(201,168,76,0.07)" : "transparent",
                  border: `1px solid ${info.digit !== null ? "var(--border-gold)" : "var(--border-dark)"}`,
                  padding: "0.6rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "0.2rem",
                  }}
                >
                  {info.concept}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.8rem",
                    color:
                      info.digit !== null
                        ? "var(--accent-gold)"
                        : "var(--text-muted)",
                    opacity: info.digit !== null ? 1 : 0.3,
                  }}
                >
                  {info.digit !== null ? info.digit : "?"}
                </div>
                {info.digit !== null && (
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      color: "var(--accent-solved-bright)",
                      marginTop: "0.2rem",
                    }}
                  >
                    {info.word}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {!allDigitsFound && (
          <div
            style={{
              background: "rgba(139,26,26,0.1)",
              border: "1px solid var(--border-red)",
              padding: "1rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--accent-red-bright)",
              textAlign: "center",
            }}
          >
            ⚠ Resuelve los acertijos anteriores para obtener todos los dígitos.
          </div>
        )}

        {allDigitsFound && !solved && (
          <>
            <div className="code-instruction">
              <p>El inspector encontró una nota final cosida en el forro del diario de Jose:</p>
              <br />
              <p>
                <strong>
                  "Para descifrar el código, sigue el orden natural
                  de la investigación. No el orden en que encontraste las
                  pistas, sino el orden en que el crimen se construyó."
                </strong>
              </p>
              <br />
              <ul className="code-steps">
                <li className="code-step">
                  <span className="code-step-arrow">→</span>
                  <span className="code-step-text">
                    Primero nació <strong>la razón más oscura</strong>
                  </span>
                </li>
                <li className="code-step">
                  <span className="code-step-arrow">→</span>
                  <span className="code-step-text">
                    Luego el destino eligió{" "}
                    <strong>a su ejecutor</strong>
                  </span>
                </li>
                <li className="code-step">
                  <span className="code-step-arrow">→</span>
                  <span className="code-step-text">
                    Después encontraron{" "}
                    <strong>su escenario</strong>
                  </span>
                </li>
                <li className="code-step">
                  <span className="code-step-arrow">→</span>
                  <span className="code-step-text">
                    Y finalmente se forjó{" "}
                    <strong>el instrumento</strong>
                  </span>
                </li>
              </ul>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.15em",
                  marginBottom: "0.75rem",
                }}
              >
                INGRESA EL CÓDIGO DE 4 DÍGITOS
              </div>
              <div className="code-input-row" key={shakeKey}>
                {[0, 1, 2, 3].map((i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    className={`code-digit-input ${error ? "error" : ""} ${
                      solved && inputs[i] === CORRECT_CODE[i]
                        ? "correct-digit"
                        : ""
                    }`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={inputs[i]}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                  />
                ))}
              </div>
              {error && (
                <div className="feedback-error" style={{ marginBottom: "0.75rem" }}>
                  ✗ Código incorrecto. Revisa el orden de los dígitos.
                </div>
              )}
              <button
                className="btn btn-submit-code"
                onClick={handleSubmit}
                disabled={inputs.some((d) => d === "")}
                style={{
                  opacity: inputs.some((d) => d === "") ? 0.5 : 1,
                  cursor: inputs.some((d) => d === "")
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                Abrir la caja
              </button>
            </div>

            <div className="hint-section" style={{ marginTop: "1.5rem" }}>
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
          <div className="feedback-success" style={{ textAlign: "center", padding: "2rem" }}>
            <div className="feedback-success-title" style={{ fontSize: "0.9rem" }}>
              ✓ ✓ ✓ CASO CERRADO — CÓDIGO CORRECTO: 2739
            </div>
            <div className="feedback-success-text" style={{ marginTop: "0.75rem" }}>
              La caja de evidencias se abre. Jose quedó como el principal
              sospechoso del caso. La investigación continúa.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
