import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addCity, getCities } from "../../queries";

export const PriceComponent: React.FC<{ price?: number | {}; setPrice: (price?: number | {}) => void }> = ({ price, setPrice }) => {
  const queryClient = useQueryClient();

  const [priceType, setPriceType] = useState(false);
  const [prices, setPrices] = useState<any[]>([]);
  const cities = useQuery(["cities"], getCities, { enabled: priceType });
  const [cityName, setCityName] = useState("");

  const addCityMutation = useMutation(addCity, { onSuccess: () => queryClient.invalidateQueries(["cities"]) });

  useEffect(() => {
    setPriceType(!!price && typeof price !== "number");
  }, [price]);

  useEffect(() => {
    if (!cities.data) return;
    const pricesDraft = [];
    for (let name in cities.data) {
      pricesDraft.push(name);
    }
    setPrices(pricesDraft);
  }, [cities.data]);

  return (
    <>
      <h5 className="card-title">Цена</h5>
      <div className="form-check form-switch pb-1">
        <input className="form-check-input" type="checkbox" checked={priceType} onChange={(e) => setPriceType(e.target.checked)} role="switch" id="priceType" />
        <label className="form-check-label" htmlFor="priceType">
          {priceType ? "Цены для каждого города" : "Одна цена на все города"}
        </label>
      </div>
      {priceType ? (
        cities.isLoading || addCityMutation.isLoading ? (
          <div style={{ height: 250 }} className="d-flex align-items-center justify-content-center">
            <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="pb-3">
            <ul className="list-group prices">
              {prices.map((name) => (
                <li key={name} className="list-group-item py-0 align-items-center pe-0">
                  <label className="d-flex">
                    <div className="priceForm">{name}</div>
                    <div>
                      <input
                        type="text"
                        /* @ts-ignore */
                        value={(price && price[name]) || undefined}
                        /* @ts-ignore */
                        onChange={(e) => setPrice({ ...price, [name]: Number(e.target.value) })}
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
        )
      ) : (
        <div className="pb-3">
          <label htmlFor="price" className="form-label">
            Цена
          </label>
          <input className="form-control" value={typeof price === "number" ? (price as unknown as string) : undefined} onChange={(e) => setPrice(Number(e.target.value) || undefined)} id="price" />
        </div>
      )}
    </>
  );
};
