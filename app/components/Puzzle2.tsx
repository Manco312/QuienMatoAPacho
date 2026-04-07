"use client";

import { useState } from "react";

interface Props {
  onSolved: (digit: number) => void;
  solved: boolean;
}

// Logic puzzle: assign suspects to locations
// Solution:
//   Juliana          → Laboratorio Principal
//   Manco            → Sala de Seguridad
//   Jose             → Sótano  ← PRINCIPAL SOSPECHOSO
//   Juanse Lizcano   → Pasillo Norte
//   Jarax            → Cafetería
// Digit revealed: 7 (Jose's employee number)

const SUSPECTS = [
  "Juliana",
  "Manco",
  "Jose",
  "Juanse Lizcano",
  "Jarax",
];

const LOCATIONS = [
  "Sótano",
  "Pasillo Norte",
  "Laboratorio Principal",
  "Cafetería",
  "Sala de Seguridad",
];

// grid[suspect_index][location_index] = state: '' | 'yes' | 'no'
type CellState = "" | "yes" | "no";

const SOLUTION: number[] = [2, 4, 0, 1, 3];
// Juliana→Laboratorio(2), Manco→Sala Seg(4), Jose→Sótano(0), Juanse→Pasillo(1), Jarax→Cafetería(3)

const HINTS_STORY = [
  "Todas las ubicaciones, excepto una, dejaron algún tipo de registro confiable esa noche: biométrico, cámara, reserva o recibo.",

  'Jose aseguró que estaba patrullando el edificio, pero no aparece en ninguno de los sistemas que sí estaban activos durante la franja del incidente.',

  "El único lugar sin monitoreo directo ni registro automático era el sótano.",

  "La Sala de Seguridad registró una única huella válida. Esa persona no estuvo ni en la cafetería ni en el laboratorio.",

  "Manco no estuvo en la cafetería. Tampoco tenía autorización para usar el Laboratorio Principal.",

  "La única cámara activa estaba en el Pasillo Norte. La persona captada allí no fue la misma que quedó registrada en la Sala de Seguridad.",

  "Juanse Lizcano no aparece en la Sala de Seguridad ni en la cafetería.",

  "El recibo de la cafetería marca una compra a las 11:00 PM. La persona asociada a esa transacción no volvió a aparecer en ningún otro registro del edificio después de esa hora.",

  "Jarax no fue visto en el Pasillo Norte, y tampoco figura en el acceso biométrico de la Sala de Seguridad.",

  "El Laboratorio Principal tuvo una reserva activa durante toda la franja del incidente, y entre todos los sospechosos, la única persona vinculada a esa reserva era Juliana.",
];

const HINTS = [
  "Deberías dibujar la situación.",
  "Usa eliminación.",
];

export default function Puzzle2({ onSolved, solved }: Props) {
  const [grid, setGrid] = useState<CellState[][]>(
    Array.from({ length: 5 }, () => Array(5).fill(""))
  );
  const [error, setError] = useState("");
  const [hintsShown, setHintsShown] = useState(0);

  function cycleCell(row: number, col: number) {
    if (solved) return;
    setGrid((prev) => {
      const next = prev.map((r) => [...r]);
      const cur = next[row][col];
      next[row][col] = cur === "" ? "yes" : cur === "yes" ? "no" : "";
      return next;
    });
  }

  function cellIcon(state: CellState) {
    if (state === "yes") return "✓";
    if (state === "no") return "✗";
    return "";
  }

  function handleVerify() {
    // Check each suspect has exactly one 'yes' and it matches the solution
    for (let s = 0; s < 5; s++) {
      const yesCount = grid[s].filter((c) => c === "yes").length;
      if (yesCount !== 1) {
        setError(
          `${SUSPECTS[s]} necesita exactamente una ubicación marcada con ✓.`
        );
        return;
      }
      const yesCol = grid[s].indexOf("yes");
      if (yesCol !== SOLUTION[s]) {
        setError(
          `La ubicación de ${SUSPECTS[s]} no es correcta. Revisa las pistas.`
        );
        return;
      }
    }
    setError("");
    onSolved(7);
  }

  return (
    <div className={`puzzle-card ${solved ? "solved" : ""}`}>
      <div className="puzzle-header">
        <div>
          <div className="puzzle-number">Acertijo 02 — El Alibi Imposible</div>
          <div className="puzzle-title">Las Coartadas de esa Noche</div>
        </div>
        {solved && (
          <div className="puzzle-solved-badge">✓ RESUELTO — DÍGITO: 7</div>
        )}
      </div>

      <div className="puzzle-body">
        <p className="puzzle-context">
          La puerta 3 del sótano era la escena del crimen. Ahora la pregunta
          era: ¿quién estaba ahí? El inspector revisó todos los registros de
          acceso, cámaras (las que no fueron saboteadas) y testimonios. Cada
          sospechoso tenía una historia. Solo una resistía la lógica.
        </p>

        <img
          src="/reporte.png"
          alt="Reporte"
          style={{
            width: "30%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />

        <div className="clue-notes">
          {HINTS_STORY.map((hint, i) => (
            <div className="clue-item" key={i}>
              <div className="clue-number">{i + 1}</div>
              <div className="clue-text">{hint}</div>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            marginBottom: "0.5rem",
          }}
        >
          INSTRUCCIONES: Marca con ✓ dónde estaba cada sospechoso y con ✗
          dónde no estaba. Haz clic en cada celda para cambiar el estado.
          Cada sospechoso debe tener exactamente un ✓.
        </p>

        <div className="logic-grid-container">
          <table className="logic-grid">
            <thead>
              <tr>
                <th>Sospechoso</th>
                {LOCATIONS.map((loc) => (
                  <th key={loc}>{loc}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SUSPECTS.map((suspect, si) => (
                <tr key={suspect}>
                  <td>{suspect}</td>
                  {LOCATIONS.map((_, li) => (
                    <td key={li}>
                      <div
                        className={`grid-cell ${grid[si][li]}`}
                        onClick={() => !solved && cycleCell(si, li)}
                        style={{ cursor: solved ? "default" : "pointer" }}
                      >
                        {solved
                          ? li === SOLUTION[si]
                            ? "✓"
                            : "✗"
                          : cellIcon(grid[si][li])}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!solved && (
          <>
            <div className="input-row">
              <button className="btn btn-primary" onClick={handleVerify}>
                Verificar solución
              </button>
            </div>
            {error && <div className="feedback-error">✗ {error}</div>}

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
              ✓ Coartadas verificadas: Jose en el Sótano
            </div>
            <div className="feedback-success-text">
              Por eliminación lógica, Jose es el único sospechoso sin
              coartada verificable. Al revisar su expediente en NOVA, el
              inspector encontró que Jose era el{" "}
              <strong>empleado #7</strong> en turno esa noche. Segundo dígito
              del código final:{" "}
              <span className="feedback-success-digit">7</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
