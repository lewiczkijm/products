import React, { DragEvent, FormEvent, useCallback, useRef } from "react";

export type FileLoaderProps = {
  onChange: (e: File) => void;
  load?: boolean;
  className?: string;
};
export const FileLoader: React.FC<FileLoaderProps> = ({ onChange, load, className }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = useCallback(() => fileRef.current && fileRef.current.click(), []);
  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onChange(e.dataTransfer.files[0]);
  }, []);

  return (
    <div onClick={handleClick} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className={`fileLoader ${className}`}>
      {load ? (
        <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <span>Загрузить файл</span>
      )}
      <input ref={fileRef} onChange={(e) => e.target.files && onChange(e.target.files[0])} type="file" />
    </div>
  );
};
