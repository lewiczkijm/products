import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { emptyPtoduct, productType } from "../globalTypes";
import { deleteProduct, getProductOfId, saveProduct } from "../queries";
import JoditEditor from "jodit-react";
import { MediaComponent } from "./components";
import { MemoLink } from "./components";
import { PriceComponent } from "./components";
import { SuccessMessage } from "./components/successMessage";
import { useInfo } from "../utils/setinfo";

const Editor_: React.FC<{ value: string; onBlur: (newValue: string) => void }> = ({ value, onBlur }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      height: 300,
      statusbar: false,
      disablePlugins: "about",
      buttons: "bold,italic,underline,strikethrough,ul,ol,font,paragraph,lineHeight,superscript,subscript,image,hr,table,link,symbols,indent,outdent,brush",
    }),
    []
  );

  return <JoditEditor ref={editor} onChange={(e) => {}} value={value} onBlur={onBlur} config={config as any} />;
};

const Editor = React.memo(Editor_);

export const Product: React.FC = ({}) => {
  const navigate = useNavigate();

  const { success, setSuccess } = useInfo(2000);

  const { id } = useParams();
  const queryClient = useQueryClient();
  const [productValue, setProductValue] = useState<productType>(emptyPtoduct);

  const product = useQuery(["product", id], () => getProductOfId(id as string), { enabled: !!id });

  useEffect(() => {
    if (product.data) {
      setProductValue(product.data);
    }
  }, [product.data]);

  const deleteCurrentProduct = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      navigate("/");
    },
  });

  const saveCurrentProduct = useMutation(saveProduct, {
    onSuccess: (res) => {
      setSuccess("Товар успешно сохранен!");
      queryClient.invalidateQueries(["products"]);
      if (res !== "ok") navigate(`/product/${res}`);
    },
  });

  return (
    <div>
      <header>
        <header>
          <div className="container-lg">
            <nav className="navbar navbar-dark bg-dark">
              <div className="container-fluid">
                <span className="navbar-brand">{product.isLoading ? "***" : productValue?.name || `Новый товар`}</span>
                <div className="d-flex flex-grow-1">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <MemoLink className="nav-link active" aria-current="page" to="/">
                        Назад к списку товаров
                      </MemoLink>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>
      </header>
      <div className="container-lg py-3 d-flex flex-column full-height">
        {!!success && <SuccessMessage>{success}</SuccessMessage>}
        {product.isLoading ? (
          <div style={{ height: 250 }} className="d-flex align-items-center justify-content-center">
            <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
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
                  <Editor value={productValue.description || ""} onBlur={(newContent) => setProductValue((val) => ({ ...val, description: newContent }))} />
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
            <div className="col-lg-3 mt-4 mt-lg-0">
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
                  <PriceComponent price={productValue.price} setPrice={(price) => setProductValue((val) => ({ ...val, price }))} />
                  {id && <MediaComponent id={id} urls={productValue.images || []} />}
                </div>
              </div>
            </div>
          </div>
        )}
        <div>Some fotter</div>
      </div>
    </div>
  );
};
