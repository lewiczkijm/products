import React, { ChangeEvent, useCallback, useState } from "react";

export type SearchStringProps = {
  onChange: (searchStr: string) => void;
};

export const SearchString: React.FC<SearchStringProps> = ({ onChange }) => {
  const [value, setValue] = useState("");
  const onInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "" && value !== "") onChange("");
      setValue(e.target.value);
    },
    [value]
  );

  return (
    <form className="d-flex" onSubmit={(e) => e.preventDefault()} role="search">
      <input className="form-control me-2" type="search" value={value} onChange={onInput} placeholder="Поиск по товарам" aria-label="Search" />
      <button onClick={() => onChange(value)} className="btn btn-outline-success" type="submit">
        Искать
      </button>
    </form>
  );
};
