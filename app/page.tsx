"use client";

import { useState } from "react";
import Puzzle1 from "./components/Puzzle1";
import Puzzle2 from "./components/Puzzle2";
import Puzzle3 from "./components/Puzzle3";
import Puzzle4 from "./components/Puzzle4";
import Puzzle5 from "./components/Puzzle5";

export default function Home() {
  // solved[i] = true when puzzle i+1 is solved
  const [solved, setSolved] = useState([false, false, false, false, false]);
  // digits[i] = digit from puzzle i+1 (null if not yet solved)
  const [digits, setDigits] = useState<(number | null)[]>([null, null, null, null]);
  const [showVictory, setShowVictory] = useState(false);

  function handlePuzzleSolved(index: number, digit?: number) {
    setSolved((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
    if (digit !== undefined) {
      setDigits((prev) => {
        const next = [...prev];
        next[index] = digit;
        return next;
      });
    }
  }

  function handleFinalSolved() {
    setSolved((prev) => {
      const next = [...prev];
      next[4] = true;
      return next;
    });
    setShowVictory(true);
  }

  const solvedCount = solved.filter(Boolean).length;

  return (
    <>
      {/* Victory overlay */}
      {showVictory && (
        <div className="victory-overlay">
          <div className="victory-card">
            <div className="victory-badge">CASO #0315-24 — RESUELTO</div>

            <div className="victory-title">El principal sospechoso de la muerte de Pacho es...</div>
            <div className="victory-culprit">Jose</div>
            <div className="victory-text">
              La guardia de seguridad #7 de turno aquella noche, sin coartada
              verificable, estuvo en el <strong>sótano</strong> cuando Pacho
              fue envenenado (compuesto V-9). El <strong>odio</strong> lo señala
              como principal sospechoso. El caso #0315-24 sigue abierto. Que
              descanse en paz, Pacho.
            </div>
            <div className="victory-code-display">
              <div className="victory-code-label">
                Código de la caja de evidencias
              </div>
              <div className="victory-code-number">2739</div>
            </div>
            <button
              className="victory-close-btn"
              onClick={() => setShowVictory(false)}
            >
              Cerrar expediente
            </button>
          </div>
        </div>
      )}

      <div className="page-wrapper">
        {/* =========================================
            HERO
        ========================================= */}
        <header className="hero">
          <div className="case-number">NOVA — CASO #0315-24 — CONFIDENCIAL</div>
          <h1 className="hero-title">
            ¿Quién
            <span>mató a Pacho?</span>
          </h1>
          <div className="hero-subtitle">
            CINCO ACERTIJOS · UN CÓDIGO FINAL
          </div>
          <div className="hero-tape">⚠ ESCENA DEL CRIMEN — NO CRUZAR ⚠</div>
        </header>

        {/* =========================================
            STORY SECTION
        ========================================= */}
        <section className="story-section">
          <div className="section-title">El Expediente</div>

          <div className="story-grid">
            <div className="story-text">
              <p>
                La madrugada del 12 de marzo de 2026, el Laboratorio de
                Innovación de NOVA amaneció en silencio sepulcral. Pacho,
                el mapache que durante años había sido el alma y el símbolo
                del equipo, fue encontrado sin vida en el sótano del
                edificio. Sin señales de lucha aparente. Sin testigos
                directos. Las cámaras de seguridad, curiosamente, habían
                fallado esa noche.
              </p>
              <p>
                Los servicios de emergencia acordonaron el área a las 3:14
                AM. El inspector a cargo del caso encontró algo
                perturbador: Pacho había intentado dejar un rastro antes
                de morir. Marcas en las paredes. Un diario en el casillero
                del sótano. Registros que no cuadraban. Alguien había
                planeado esto con frialdad.
              </p>
              <div className="story-highlight">
                "Los animales no mienten. Los humanos, sí. La verdad está
                en los rastros que dejó Pacho, no en las palabras de los
                sospechosos."
                <br />
                <em style={{ fontSize: "0.85rem" }}>— Inspector del caso</em>
              </div>
              <p>
                Cinco personas permanecieron en el edificio esa noche.
                Solo una de ellas tiene las manos manchadas. Tu misión es
                descifrar los acertijos que Pacho dejó como última
                voluntad.
              </p>
            </div>

            <div>
              <div className="suspects-panel">
                <div className="suspects-panel-title">
                  Sospechosos — Noche del 15/03
                </div>
                {[
                  { name: "Juliana", role: "Jefa de Investigación" },
                  { name: "Manco", role: "Técnico de Laboratorio" },
                  { name: "Jose", role: "Guardia de Seguridad" },
                  { name: "Juanse Lizcano", role: "Personal de Limpieza" },
                  { name: "Jarax", role: "Directora de Proyectos" },
                ].map((s) => (
                  <div className="suspect-item" key={s.name}>
                    <div className="suspect-dot" />
                    <div>
                      <span className="suspect-name">{s.name}</span>
                      <span className="suspect-role">{s.role}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pacho photo placeholder */}
              <div style={{ marginTop: "1.25rem" }}>
                <div className="image-polaroid">
                  <img
                    src="/pacho.png"
                    alt="Pacho"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                  <div className="image-polaroid-caption">Pacho :c</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scene photos row */}
          <div style={{ marginTop: "2rem" }}>
            <div className="section-title">Fotos de la Escena</div>
            <div className="story-images">
              <img
                src="/sotano.png"
                alt="Sotano"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
              <img
                src="/Laboratorio.png"
                alt="Laboratorio"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
              <img
                src="/casillero.png"
                alt="Casillero"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            </div>
          </div>
        </section>

        {/* =========================================
            EVIDENCE BOARD
        ========================================= */}
        <div className="evidence-board">
          <div className="evidence-board-header">
            <div className="evidence-board-title">
              ▸ Tablero de Evidencias — Código Final
            </div>
            <div className="evidence-board-status">
              {solvedCount}/5 acertijos resueltos
            </div>
          </div>
          <div className="evidence-digits">
            {[
              { label: "Dígito 1", concept: "Lugar" },
              { label: "Dígito 2", concept: "Sospechoso" },
              { label: "Dígito 3", concept: "Motivo" },
              { label: "Dígito 4", concept: "Arma" },
            ].map((item, i) => (
              <div
                key={i}
                className={`evidence-digit-card ${digits[i] !== null ? "revealed" : ""}`}
              >
                <div className="evidence-digit-label">{item.label}</div>
                <div
                  className={`evidence-digit-number ${digits[i] !== null ? "revealed" : ""}`}
                >
                  {digits[i] !== null ? digits[i] : "?"}
                </div>
                <div className="evidence-digit-word">
                  {digits[i] !== null
                    ? [
                        "SÓTANO",
                        "JOSE",
                        "ODIO",
                        "VENENO",
                      ][i]
                    : ""}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================
            DIVIDER
        ========================================= */}
        <div className="mystery-divider">
          <span className="mystery-divider-icon">🔍</span>
        </div>

        {/* =========================================
            PUZZLES
        ========================================= */}
        <div className="section-title">Los Acertijos</div>

        {/* Puzzle 1 — always visible */}
        <div className="puzzle-wrapper puzzle-unlocked">
          <Puzzle1
            solved={solved[0]}
            onSolved={(digit) => handlePuzzleSolved(0, digit)}
          />
        </div>

        {/* Puzzle 2 */}
        <div
          className={`puzzle-wrapper ${solved[0] ? "puzzle-unlocked" : "puzzle-locked"}`}
        >
          {!solved[0] && (
            <div
              style={{
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                padding: "1.5rem",
                border: "1px dashed var(--border-dark)",
                letterSpacing: "0.2em",
              }}
            >
              🔒 BLOQUEADO — Resuelve el Acertijo 01
            </div>
          )}
          {solved[0] && (
            <Puzzle2
              solved={solved[1]}
              onSolved={(digit) => handlePuzzleSolved(1, digit)}
            />
          )}
        </div>

        {/* Puzzle 3 */}
        <div
          className={`puzzle-wrapper ${solved[1] ? "puzzle-unlocked" : "puzzle-locked"}`}
        >
          {!solved[1] && (
            <div
              style={{
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                padding: "1.5rem",
                border: "1px dashed var(--border-dark)",
                letterSpacing: "0.2em",
              }}
            >
              🔒 BLOQUEADO — Resuelve el Acertijo 02
            </div>
          )}
          {solved[1] && (
            <Puzzle3
              solved={solved[2]}
              onSolved={(digit) => handlePuzzleSolved(2, digit)}
            />
          )}
        </div>

        {/* Puzzle 4 */}
        <div
          className={`puzzle-wrapper ${solved[2] ? "puzzle-unlocked" : "puzzle-locked"}`}
        >
          {!solved[2] && (
            <div
              style={{
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                padding: "1.5rem",
                border: "1px dashed var(--border-dark)",
                letterSpacing: "0.2em",
              }}
            >
              🔒 BLOQUEADO — Resuelve el Acertijo 03
            </div>
          )}
          {solved[2] && (
            <Puzzle4
              solved={solved[3]}
              onSolved={(digit) => handlePuzzleSolved(3, digit)}
            />
          )}
        </div>

        {/* Puzzle 5 */}
        <div
          className={`puzzle-wrapper ${solved[3] ? "puzzle-unlocked" : "puzzle-locked"}`}
        >
          {!solved[3] && (
            <div
              style={{
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                padding: "1.5rem",
                border: "1px dashed var(--accent-gold-dim)",
                letterSpacing: "0.2em",
              }}
            >
              🔒 BLOQUEADO — Resuelve todos los acertijos anteriores
            </div>
          )}
          {solved[3] && (
            <Puzzle5
              digits={digits}
              solved={solved[4]}
              onSolved={handleFinalSolved}
            />
          )}
        </div>

        {/* =========================================
            FOOTER
        ========================================= */}
        <footer className="page-footer">
          NOVA MYSTERY — CASO #0315-24 — CLASIFICADO
          <br />
          <span style={{ opacity: 0.4 }}>
            Resuelve los acertijos. Descubre la verdad. Honra a Pacho.
          </span>
        </footer>
      </div>
    </>
  );
}
