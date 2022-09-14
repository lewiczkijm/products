import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

import { deleteProduct, getProducts } from "../queries";
import { Paginator, SearchString } from "./components";
import { Table } from "./components/table";

export const Products: React.FC = ({}) => {
  const [page, setPage] = useState(1);
  const [searchStr, setSearchStr] = useState("");
  useEffect(() => setPage(1), [searchStr]);

  const queryClient = useQueryClient();

  const { data, isFetched, error } = useQuery(["products", page, searchStr], () => getProducts(page, searchStr));

  const { mutate } = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  return (
    <div>
      <header>
        <div className="container-lg">
          <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
              <span className="navbar-brand">Товары</span>
              <div className="d-flex flex-grow-1">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/product">
                      Новый
                    </Link>
                  </li>
                </ul>

                <SearchString onChange={setSearchStr} />
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div className="container-lg py-3 d-flex flex-column full-height">
        <div className="flex-grow-1">
          <Table data={data?.value || []} onDelete={mutate} />
        </div>
        <Paginator maxVal={data?.pages || 1} value={page} onChange={setPage} />
        <div>Some fotter</div>
      </div>
    </div>
  );
};
