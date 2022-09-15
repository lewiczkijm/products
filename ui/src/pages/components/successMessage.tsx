import React from "react";

export const SuccessMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="position-relative d-flex justify-content-center">
    <div className="position-absolute bg-success text-light fs-3 shadow p-3 rounded" style={{ zIndex: 100 }}>
      {children}
    </div>
  </div>
);
