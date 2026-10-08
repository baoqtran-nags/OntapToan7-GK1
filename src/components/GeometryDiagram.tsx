import React from 'react';
import { DiagramConfig } from '../types/math';

interface Props {
  config: DiagramConfig;
  className?: string;
}

export const GeometryDiagram: React.FC<Props> = ({ config, className = '' }) => {
  const { type, title, angles = {} } = config;

  return (
    <div className={`p-4 bg-slate-50 border border-slate-200 rounded-xl my-3 flex flex-col items-center ${className}`}>
      {title && (
        <div className="text-xs font-semibold text-slate-600 mb-2 tracking-wide uppercase">
          {title}
        </div>
      )}

      {/* Case 1: Intersecting Lines (Hai đường thẳng cắt nhau) */}
      {type === 'intersecting_lines' && (
        <svg viewBox="0 0 320 200" className="w-full max-w-sm h-auto select-none">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#475569" />
            </marker>
          </defs>

          {/* Line 1: AB */}
          <line x1="30" y1="150" x2="290" y2="50" stroke="#1e293b" strokeWidth="2.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
          {/* Line 2: CD */}
          <line x1="40" y1="50" x2="280" y2="150" stroke="#1e293b" strokeWidth="2.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />

          {/* Intersection point O */}
          <circle cx="160" cy="100" r="4" fill="#2563eb" />
          <text x="156" y="125" fontSize="13" fontWeight="bold" fill="#2563eb">O</text>

          {/* Labels A, B, C, D */}
          <text x="25" y="170" fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
          <text x="290" y="45" fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
          <text x="35" y="45" fontSize="13" fontWeight="bold" fill="#0f172a">C</text>
          <text x="285" y="170" fontSize="13" fontWeight="bold" fill="#0f172a">D</text>

          {/* Angle Arcs */}
          {/* AOC arc (left side) */}
          <path d="M 130 90 A 30 30 0 0 1 140 110" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3" />
          <text x="100" y="102" fontSize="11" fontWeight="bold" fill="#2563eb">
            {angles.AOC || angles.xOy || '42°'}
          </text>

          {/* BOD arc (right side) */}
          <path d="M 190 110 A 30 30 0 0 1 180 90" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3" />
          <text x="200" y="102" fontSize="11" fontWeight="bold" fill="#2563eb">
            {angles.BOD || angles["x'Oy'"] || '42°'}
          </text>

          {/* Note */}
          <text x="160" y="185" textAnchor="middle" fontSize="11" fill="#64748b">
            (Hai góc đối đỉnh: ∠AOC = ∠BOD)
          </text>
        </svg>
      )}

      {/* Case 2: Parallel lines perpendicular to a 3rd line (Quan hệ vuông góc song song) */}
      {type === 'parallel_perpendicular' && (
        <svg viewBox="0 0 340 220" className="w-full max-w-md h-auto select-none">
          {/* Line c (vertical perpendicular) */}
          <line x1="80" y1="20" x2="80" y2="200" stroke="#0284c7" strokeWidth="2.5" />
          <text x="88" y="30" fontSize="13" fontWeight="bold" fill="#0284c7">c</text>

          {/* Line a (horizontal top) */}
          <line x1="30" y1="60" x2="310" y2="60" stroke="#1e293b" strokeWidth="2.5" />
          <text x="315" y="65" fontSize="13" fontWeight="bold" fill="#1e293b">a</text>

          {/* Line b (horizontal bottom) */}
          <line x1="30" y1="160" x2="310" y2="160" stroke="#1e293b" strokeWidth="2.5" />
          <text x="315" y="165" fontSize="13" fontWeight="bold" fill="#1e293b">b</text>

          {/* Right angle symbols at G and K */}
          {/* Point G (80, 60) */}
          <path d="M 80 75 L 95 75 L 95 60" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          <circle cx="80" cy="60" r="3.5" fill="#ef4444" />
          <text x="60" y="55" fontSize="12" fontWeight="bold" fill="#ef4444">G</text>

          {/* Point K (80, 160) */}
          <path d="M 80 145 L 95 145 L 95 160" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          <circle cx="80" cy="160" r="3.5" fill="#ef4444" />
          <text x="60" y="175" fontSize="12" fontWeight="bold" fill="#ef4444">K</text>

          {/* Transversal line d crossing a and b */}
          <line x1="170" y1="25" x2="270" y2="195" stroke="#7c3aed" strokeWidth="2.2" />
          <text x="275" y="200" fontSize="12" fontWeight="bold" fill="#7c3aed">d</text>

          {/* Intersection H on a and E on b */}
          <circle cx="190" cy="60" r="3.5" fill="#7c3aed" />
          <text x="180" y="50" fontSize="12" fontWeight="bold" fill="#7c3aed">H</text>

          <circle cx="250" cy="160" r="3.5" fill="#7c3aed" />
          <text x="255" y="180" fontSize="12" fontWeight="bold" fill="#7c3aed">E</text>

          {/* Angle at E */}
          <path d="M 235 160 A 20 20 0 0 1 245 145" fill="none" stroke="#2563eb" strokeWidth="2" />
          <text x="200" y="152" fontSize="11" fontWeight="bold" fill="#2563eb">
            {angles.HEF || '62°'}
          </text>

          {/* Explanatory annotation */}
          <text x="190" y="212" textAnchor="middle" fontSize="11" fill="#475569">
            c ⊥ a tại G, c ⊥ b tại K ⇒ a // b
          </text>
        </svg>
      )}

      {/* Case 3: Parallel Transversal with Alternate Interior / Corresponding angles */}
      {type === 'parallel_transversal' && (
        <svg viewBox="0 0 340 200" className="w-full max-w-md h-auto select-none">
          {/* Line 1 */}
          <line x1="30" y1="50" x2="310" y2="50" stroke="#1e293b" strokeWidth="2.5" />
          <text x="315" y="55" fontSize="13" fontWeight="bold" fill="#1e293b">a</text>

          {/* Line 2 */}
          <line x1="30" y1="140" x2="310" y2="140" stroke="#1e293b" strokeWidth="2.5" />
          <text x="315" y="145" fontSize="13" fontWeight="bold" fill="#1e293b">b</text>

          {/* Transversal Line c */}
          <line x1="90" y1="20" x2="230" y2="180" stroke="#2563eb" strokeWidth="2.2" />
          <text x="235" y="190" fontSize="13" fontWeight="bold" fill="#2563eb">c</text>

          {/* Intersection A (top) */}
          <circle cx="116" cy="50" r="3.5" fill="#2563eb" />
          <text x="95" y="45" fontSize="12" fontWeight="bold" fill="#0f172a">A</text>

          {/* Intersection B (bottom) */}
          <circle cx="195" cy="140" r="3.5" fill="#2563eb" />
          <text x="205" y="155" fontSize="12" fontWeight="bold" fill="#0f172a">B</text>

          {/* Angle 1 (under line a, right of c: alternate interior 1) */}
          <path d="M 135 50 A 20 20 0 0 1 126 62" fill="none" stroke="#ef4444" strokeWidth="2" />
          <text x="135" y="75" fontSize="11" fontWeight="bold" fill="#ef4444">A₁</text>

          {/* Angle 2 (above line b, left of c: alternate interior 2) */}
          <path d="M 175 140 A 20 20 0 0 1 184 128" fill="none" stroke="#ef4444" strokeWidth="2" />
          <text x="155" y="132" fontSize="11" fontWeight="bold" fill="#ef4444">B₁</text>

          <text x="170" y="195" textAnchor="middle" fontSize="11" fill="#64748b">
            Cặp góc so le trong: ∠A₁ = ∠B₁ khi a // b
          </text>
        </svg>
      )}

      {/* Case 4: Adjacent Supplementary (Hai góc kề bù) */}
      {type === 'adjacent_supplementary' && (
        <svg viewBox="0 0 320 180" className="w-full max-w-sm h-auto select-none">
          {/* Straight line x-t */}
          <line x1="30" y1="120" x2="290" y2="120" stroke="#1e293b" strokeWidth="2.5" />
          <circle cx="160" cy="120" r="4" fill="#2563eb" />
          <text x="156" y="140" fontSize="13" fontWeight="bold" fill="#2563eb">O</text>

          <text x="20" y="125" fontSize="13" fontWeight="bold" fill="#0f172a">t</text>
          <text x="295" y="125" fontSize="13" fontWeight="bold" fill="#0f172a">x</text>

          {/* Ray Oy inclined at 120° (or 60°) */}
          <line x1="160" y1="120" x2="230" y2="40" stroke="#2563eb" strokeWidth="2.5" />
          <text x="235" y="35" fontSize="13" fontWeight="bold" fill="#2563eb">y</text>

          {/* Arc xOy = 120° */}
          <path d="M 195 120 A 35 35 0 0 0 178 99" fill="none" stroke="#2563eb" strokeWidth="2" />
          <text x="195" y="105" fontSize="11" fontWeight="bold" fill="#2563eb">
            {angles.xOy || '120°'}
          </text>

          {/* Arc tOy = 60° */}
          <path d="M 178 99 A 35 35 0 0 0 125 120" fill="none" stroke="#10b981" strokeWidth="2" />
          <text x="120" y="105" fontSize="11" fontWeight="bold" fill="#10b981">
            {angles.tOy || '60°'}
          </text>

          <text x="160" y="165" textAnchor="middle" fontSize="11" fill="#64748b">
            ∠xOy + ∠tOy = 180° (Hai góc kề bù)
          </text>
        </svg>
      )}

      {/* Case 5: Zigzag Angle (Chữ V hoặc zích zắc) */}
      {type === 'zigzag_angle' && (
        <svg viewBox="0 0 340 220" className="w-full max-w-md h-auto select-none">
          {/* Top ray Ax */}
          <line x1="60" y1="50" x2="280" y2="50" stroke="#1e293b" strokeWidth="2.5" />
          <circle cx="60" cy="50" r="3.5" fill="#1e293b" />
          <text x="45" y="45" fontSize="13" fontWeight="bold" fill="#1e293b">A</text>
          <text x="285" y="55" fontSize="13" fontWeight="bold" fill="#1e293b">x</text>

          {/* Bottom ray By */}
          <line x1="60" y1="170" x2="280" y2="170" stroke="#1e293b" strokeWidth="2.5" />
          <circle cx="60" cy="170" r="3.5" fill="#1e293b" />
          <text x="45" y="180" fontSize="13" fontWeight="bold" fill="#1e293b">B</text>
          <text x="285" y="175" fontSize="13" fontWeight="bold" fill="#1e293b">y</text>

          {/* Midpoint vertex O */}
          <circle cx="160" cy="110" r="4" fill="#2563eb" />
          <text x="145" y="115" fontSize="13" fontWeight="bold" fill="#2563eb">O</text>

          {/* Segment AO and OB */}
          <line x1="60" y1="50" x2="160" y2="110" stroke="#2563eb" strokeWidth="2.2" />
          <line x1="160" y1="110" x2="60" y2="170" stroke="#2563eb" strokeWidth="2.2" />

          {/* Auxiliary line Ot parallel to Ax and By (dashed) */}
          <line x1="160" y1="110" x2="280" y2="110" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="4 4" />
          <text x="285" y="115" fontSize="12" fontWeight="bold" fill="#f59e0b">t (đường phụ)</text>

          {/* Angle at A */}
          <text x="80" y="70" fontSize="11" fontWeight="bold" fill="#ef4444">
            {angles.xAO || angles.ABD || '35°'}
          </text>

          {/* Angle at B */}
          <text x="80" y="160" fontSize="11" fontWeight="bold" fill="#ef4444">
            {angles.OBy || angles.BDC || '35°'}
          </text>

          <text x="170" y="205" textAnchor="middle" fontSize="11" fill="#475569">
            Kẻ tia Ot // Ax // By để phân tích góc ∠AOB
          </text>
        </svg>
      )}
    </div>
  );
};
