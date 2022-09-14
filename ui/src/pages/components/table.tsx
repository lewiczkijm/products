import React from "react";
import { Link } from "react-router-dom";
import { productType } from "../../../../globalTypes";
import { BASE_URL } from "../../utils/Axios";

export type TableProps = {
  data: productType[];
  onDelete: (id: string) => void;
};
export const Table: React.FC<TableProps> = ({ data, onDelete }) => {
  return (
    <table className="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>Название</th>
          <th>Статус</th>
          <th>Цена</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((product) => (
          <tr key={product.id}>
            <td>
              <Link to={`/product/${product.id}`}>{product.images ? <img src={BASE_URL + product.images[0]} width="40" height="40" /> : <span className="imagePlaceholder"></span>}</Link>
            </td>
            <td>{product.name}</td>
            <td>
              <span className={`badge ${product.status ? "text-bg-success" : "text-bg-secondary"}`}>{product.status ? "active" : "inactive"}</span>
            </td>
            <td>{typeof product.price === "number" ? product.price : "-"}</td>
            <td>
              <span className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  ...
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={`/product/${product.id}`}>
                      Edit
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={() => onDelete(product.id)} href="#">
                      Delete
                    </a>
                  </li>
                </ul>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
