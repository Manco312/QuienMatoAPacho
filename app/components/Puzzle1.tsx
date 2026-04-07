"use client";

import { useState } from "react";

interface Props {
  onSolved: (digit: number) => void;
  solved: boolean;
}

// Cipher: Reversed alphabet (A=26, B=25, ... Z=1)
// Formula: letter = char(27 - n)  [1-indexed]
// Message: 8·12·7·26·13·12 = SOTANO
// Digit revealed: 3

const HINTS = [
  "Un espejo invierte todo lo que refleja.",
  "Una fórmula matemática puede convertir números en letras.",
];

export default function Puzzle1({ onSolved, solved }: Props) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);

  function handleSubmit() {
    if (answer.trim().toUpperCase() === "SOTANO") {
      onSolved(3);
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
          <div className="puzzle-number">Acertijo 01 — El Espejo Oscuro</div>
          <div className="puzzle-title">El Mensaje en la Pared</div>
        </div>
        {solved && (
          <div className="puzzle-solved-badge">✓ RESUELTO — DÍGITO: 3</div>
        )}
      </div>

      <div className="puzzle-body">
        <p className="puzzle-context">
          Cuando el inspector examinó la pared del sótano, encontró algo grabado
          con dificultad en el concreto. Pacho, en sus últimos momentos, había
          dejado un mensaje. Pero las marcas no eran letras: eran números. Y el
          abecedario de Pacho no era como el nuestro.
        </p>

        {/* Image placeholder */}
        <img
          src="/marcas.png"
          alt="Marcas"
          style={{
            width: "30%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />

        <div className="cipher-display">
          <div className="cipher-code">8 · 12 · 7 · 26 · 13 · 12</div>
          <div className="cipher-sublabel">
            Mensaje encontrado — CASO #0315-24
          </div>
        </div>

        <div className="clue-notes">
          <div className="clue-item">
            <div className="clue-number">◈</div>
            <div className="clue-text">
              "El alfabeto de los mapaches corre al revés: donde nosotros vemos
              el principio, ellos ven el fin."{" "}
              <em>(Nota encontrada junto al cuerpo)</em>
            </div>
          </div>
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
                Descifrar
              </button>
            </div>
            {error && (
              <div className="feedback-error">
                ✗ Respuesta incorrecta. Revisa el sistema de cifrado.
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
              ✓ Mensaje descifrado: SÓTANO
            </div>
            <div className="feedback-success-text">
              Pacho dejó grabado el lugar donde lo encontrarían. El sótano.
              Explorando la escena, el inspector encontró la{" "}
              <strong>puerta 3</strong> del sótano ligeramente entreabierta. Un
              número que no debía olvidarse. Primer dígito del código final:{" "}
              <span className="feedback-success-digit">3</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
