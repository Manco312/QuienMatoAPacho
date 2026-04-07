"use client";

import { useState } from "react";

interface Props {
  onSolved: (digit: number) => void;
  solved: boolean;
}

// Letter riddle: each line gives one letter of VENENO
// V: "en vida pero no en muerte"
// E: "en estrella pero no en luna"
// N: "en noche pero no en día"
// E: same as 2nd line
// N: same as 3rd line
// O: "en oro pero no en plata"
// Digit revealed: 9 (compound code V-9)

const HINTS = [
  "Lee muy bien los versos.",
  "Sigue el patrón de las pistas.",
];

const riddleLines = [
  {
    text: (
      <>
        Mi primera vive en <em>vapor</em> pero nunca en <em>humo</em>.
      </>
    ),
  },
  {
    text: (
      <>
        Mi segunda duerme en <em>espejo</em> pero no en <em>bruma</em>.
      </>
    ),
  },
  {
    text: (
      <>
        Mi tercera se oculta en <em>noche</em> pero jamás en <em>día</em>.
      </>
    ),
  },
  {
    text: (
      <>
        Mi cuarta repite el signo de mi segunda.
      </>
    ),
  },
  {
    text: (
      <>
        Mi quinta sigue la sombra de mi tercera.
      </>
    ),
  },
  {
    text: (
      <>
        Mi sexta resuena en <em>oro</em> pero calla en <em>plata</em>.
      </>
    ),
  },
];

export default function Puzzle4({ onSolved, solved }: Props) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [hintsShown, setHintsShown] = useState(0);

  function handleSubmit() {
    if (answer.trim().toUpperCase() === "VENENO") {
      onSolved(9);
    } else {
      setError(true);
      setShakeKey((k) => k + 1);
      setTimeout(() => setError(false), 1000);
    }
  }

  return (
    <div className={`puzzle-card ${solved ? "solved" : ""}`}>
      <div className="puzzle-header">
        <div>
          <div className="puzzle-number">Acertijo 04 — El Instrumento</div>
          <div className="puzzle-title">El Acertijo de las Letras</div>
        </div>
        {solved && (
          <div className="puzzle-solved-badge">✓ RESUELTO — DÍGITO: 9</div>
        )}
      </div>

      <div className="puzzle-body">
        <p className="puzzle-context">
          En el casillero de Jose se encontró un frasco vacío sin etiqueta.
          La única pista sobre su contenido estaba escrita en un papel doblado
          dentro del casillero: un acertijo antiguo que Jose había memorizado,
          una descripción oculta del instrumento de su crimen.
        </p>

        <div className="riddle-container">
          <p className="riddle-intro">
            "Soy el alma oscura de NOVA, su secreto más peligroso.
            <br />
            Para encontrarme, sigue estas pistas letra por letra:"
          </p>
          <ul className="riddle-lines">
            {riddleLines.map((line, i) => (
              <li className="riddle-line" key={i}>
                {line.text}
              </li>
            ))}
          </ul>
          <p
            style={{
              textAlign: "center",
              fontStyle: "italic",
              color: "var(--text-muted)",
              marginTop: "1rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
            }}
          >
            ¿Qué soy?
          </p>
        </div>

        {!solved && (
          <>
            <div className="input-row">
              <input
                key={shakeKey}
                className={`puzzle-input ${error ? "error" : ""}`}
                type="text"
                placeholder="ESCRIBE LA RESPUESTA"
                value={answer}
                maxLength={10}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button className="btn btn-primary" onClick={handleSubmit}>
                Revelar
              </button>
            </div>
            {error && (
              <div className="feedback-error">
                ✗ Esa no es la respuesta. Revisa cada verso con cuidado.
              </div>
            )}

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
              ✓ Instrumento identificado: VENENO
            </div>
            <div className="feedback-success-text">
              Se usó un compuesto tóxico administrado en el alimento de
              Pacho. El frasco fue registrado en el inventario del laboratorio
              bajo el código <strong>V-9</strong>. Un número que completaba el
              rompecabezas. Cuarto dígito del código final:{" "}
              <span className="feedback-success-digit">9</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
