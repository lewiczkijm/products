import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useParams, useNavigate } from "react-router-dom";
import { emptyPtoduct, productType } from "../../../globalTypes";
import { addCity, deleteProduct, getCities, getProductOfId, saveProduct } from "../queries";
import JoditEditor from "jodit-react";

export const Product: React.FC = ({}) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const queryClient = useQueryClient();
  const [priceType, setPriceType] = useState(false);
  const [productValue, setProductValue] = useState<productType>(emptyPtoduct);
  const [prices, setPrices] = useState<any[]>([]);
  const [cityName, setCityName] = useState("");

  const product = useQuery(["product", id], () => getProductOfId(id as string), { enabled: !!id });

  useEffect(() => {
    if (product.data) {
      setProductValue(product.data);
      setPriceType(!!product.data.price && typeof product.data.price !== "number");
    }
  }, [product.data]);

  const cities = useQuery(["cities"], getCities, { enabled: priceType });

  useEffect(() => {
    if (!cities.data) return;
    const pricesDraft = [];
    let key = 0;
    for (let name in cities.data) {
      pricesDraft.push(name);
      key++;
    }
    //@ts-ignore
    setPrices(pricesDraft);
  }, [cities.data, productValue]);

  const addCityMutation = useMutation(addCity, { onSuccess: () => queryClient.invalidateQueries(["cities"]) });

  const deleteCurrentProduct = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      navigate("/");
    },
  });

  const saveCurrentProduct = useMutation(saveProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      navigate("/");
    },
  });

  return (
    <div>
      <header>
        <header>
          <div className="container-lg">
            <nav className="navbar navbar-dark bg-dark">
              <div className="container-fluid">
                <span className="navbar-brand">{productValue?.name || `Новый товар`}</span>
                <div className="d-flex flex-grow-1">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="/">
                        Назад к списку товаров
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>
      </header>
      <div className="container-lg py-3 d-flex flex-column full-height">
        <div className="flex-grow-1 row ">
          <div className="col-lg-9">
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    Название товара
                  </label>
                  <input className="form-control" id="productName" value={productValue.name} onChange={(e) => setProductValue((value) => ({ ...value, name: e.target.value }))} />
                </div>
                <JoditEditor
                  value={productValue.description || ""}
                  onBlur={(newContent) => setProductValue((val) => ({ ...val, description: newContent }))}
                  // @ts-ignore
                  config={{
                    height: 300,
                    statusbar: false,
                    disablePlugins: "about",
                    buttons: "bold,italic,underline,strikethrough,ul,ol,font,paragraph,lineHeight,superscript,subscript,image,hr,table,link,symbols,indent,outdent,brush",
                  }}
                />
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-body d-flex justify-content-end">
                {!!id && (
                  <button className="btn me-2 btn-danger" onClick={() => deleteCurrentProduct.mutate(id)}>
                    Удалить
                  </button>
                )}
                <button onClick={() => saveCurrentProduct.mutate({ product: productValue, id })} disabled={!productValue.name} className="btn btn-success">
                  Сохранить
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Статус</h5>
                <div className="form-check form-switch pb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={productValue.status}
                    onChange={(e) => setProductValue((val) => ({ ...val, status: e.target.checked }))}
                    role="switch"
                    id="status"
                  />
                  <label className="form-check-label" htmlFor="status">
                    {productValue.status ? "Активен" : "Неактивен"}
                  </label>
                </div>
                <h5 className="card-title">Цена</h5>
                <div className="form-check form-switch pb-1">
                  <input className="form-check-input" type="checkbox" checked={priceType} onChange={(e) => setPriceType(e.target.checked)} role="switch" id="priceType" />
                  <label className="form-check-label" htmlFor="priceType">
                    {priceType ? "Цены для каждого города" : "Одна цена на все города"}
                  </label>
                </div>
                {priceType ? (
                  <div className="pb-3">
                    <ul className="list-group prices">
                      {prices.map((name) => (
                        <li key={name} className="list-group-item py-0 align-items-center">
                          <label className="d-flex">
                            <div className="priceForm">{name}</div>
                            <div>
                              <input
                                type="text"
                                /* @ts-ignore */
                                value={(productValue.price && productValue.price[name]) || undefined}
                                /* @ts-ignore */
                                onChange={(e) => setProductValue((val) => ({ ...val, price: { ...val.price, [name]: Number(e.target.value) } }))}
                                className="form-control form-control-sm"
                              />
                            </div>
                          </label>
                        </li>
                      ))}
                    </ul>
                    <div className="d-flex pt-2">
                      <div className="pe-1">
                        <input value={cityName} onChange={(e) => setCityName(e.target.value)} className="form-control form-control-sm" />
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          disabled={!cityName || cityName.length < 3}
                          onClick={() => {
                            addCityMutation.mutate(cityName);
                            setCityName("");
                          }}
                          type="submit"
                          className="btn btn-sm btn-primary"
                        >
                          Добавить город
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pb-3">
                    <label htmlFor="price" className="form-label">
                      Цена
                    </label>
                    <input
                      className="form-control"
                      value={typeof productValue.price === "number" ? (productValue.price as unknown as string) : undefined}
                      onChange={(e) => setProductValue((val) => ({ ...val, price: Number(e.target.value) || undefined }))}
                      id="price"
                    />
                  </div>
                )}
                <h5 className="card-title">Медиа</h5>
              </div>
            </div>
          </div>
        </div>
        <div>Some fotter</div>
      </div>
    </div>
  );
};
