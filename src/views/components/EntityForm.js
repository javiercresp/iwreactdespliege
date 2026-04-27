import React from "react";
import axios from "axios";
import { getEntityTypeConfig } from "views/components/entityTypes";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

function EntityForm({ entityType, onCreated }) {
  const config = getEntityTypeConfig(entityType);
  const [formData, setFormData] = React.useState(config.initialData);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    setFormData(config.initialData);
  }, [config, entityType]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const payload = { ...formData };
      if (entityType === "producto") {
        payload.price = Number(payload.price);
      }

      await axios.post(`${API_BASE}/${config.endpoint}/`, payload);
      setFormData(config.initialData);
      if (onCreated) {
        onCreated();
      }
    } catch (error) {
      console.error(`Error al crear ${entityType}:`, error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!config) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <h4>{config.formTitle}</h4>
      {config.formFields.map((input) => (
        <div className="mb-3" key={input.name}>
          <label htmlFor={input.name} className="form-label">
            {input.label}
          </label>
          <input
            className="form-control"
            id={input.name}
            name={input.name}
            type={input.type}
            required={input.required}
            value={formData[input.name]}
            onChange={handleChange}
            step={input.type === "number" ? "any" : undefined}
          />
        </div>
      ))}
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}

export default EntityForm;
