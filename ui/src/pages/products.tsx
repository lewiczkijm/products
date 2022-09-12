import React from "react";

export const Products: React.FC = ({}) => {
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
                    <a className="nav-link active" aria-current="page" href="/product">
                      Новый
                    </a>
                  </li>
                </ul>

                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div className="container-lg py-3">1234</div>
    </div>
  );
};
