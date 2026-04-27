import React from "react";

function EntityList({ title, items, fields, getItemKey }) {
  return (
    <div className="mt-4">
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p>No hay elementos para mostrar.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                {fields.map((field) => (
                  <th key={field.key}>{field.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={getItemKey(item, index)}>
                  {fields.map((field) => (
                    <td key={field.key}>{String(item[field.key] ?? "")}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EntityList;
