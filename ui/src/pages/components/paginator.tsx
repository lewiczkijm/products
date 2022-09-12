import React from "react";

export type PaginatorProps = {
  value: number;
  maxVal: number;
  onChange: (value: number) => void;
};
export const Paginator: React.FC<PaginatorProps> = ({ value, maxVal, onChange }) => {
  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={`page-item ${value < 2 && "disabled"}`}>
          <a className="page-link" onClick={() => onChange(value - 1)} href="#">
            Назад
          </a>
        </li>
        <li className="page-item active" aria-current="page">
          <span className="page-link">{value}</span>
        </li>

        <li className={`page-item ${value >= maxVal && "disabled"}`}>
          <a className="page-link" onClick={() => onChange(value + 1)} href="#">
            Вперед
          </a>
        </li>
      </ul>
    </nav>
  );
};
