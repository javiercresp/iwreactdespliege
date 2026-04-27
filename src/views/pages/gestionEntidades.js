import React from "react";
import axios from "axios";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter";
import EntityList from "views/components/EntityList";
import EntityForm from "views/components/EntityForm";
import { ENTITY_TYPES, getEntityTypeConfig } from "views/components/entityTypes";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

function GestionEntidades() {
  const [entityType, setEntityType] = React.useState("producto");
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const config = getEntityTypeConfig(entityType);

  const loadItems = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/${config.endpoint}/`);
      setItems(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(`Error al cargar ${entityType}:`, error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [config.endpoint, entityType]);

  React.useEffect(() => {
    loadItems();
  }, [loadItems]);

  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  }, []);

  document.documentElement.classList.remove("nav-open");

  return (
    <>
      <IndexNavbar />
      <IndexHeader />
      <div className="main">
        <div className="container pb-5">
          <h2 className="mt-4">Gestión de productos y eventos</h2>
          <p>
            El formulario y el listado cambian según la entidad seleccionada. Al guardar, el listado se recarga automáticamente.
          </p>

          <div className="btn-group mb-4" role="group" aria-label="Selector de entidad">
            {Object.entries(ENTITY_TYPES).map(([key, entity]) => (
              <button
                key={key}
                type="button"
                className={`btn ${entityType === key ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setEntityType(key)}
              >
                {entity.label}
              </button>
            ))}
          </div>

          <div className="row g-4">
            <div className="col-12 col-lg-5">
              <EntityForm entityType={entityType} onCreated={loadItems} />
            </div>
            <div className="col-12 col-lg-7">
              {loading ? (
                <p className="mt-4">Cargando...</p>
              ) : (
                <EntityList
                  title={config.listTitle}
                  items={items}
                  fields={config.listFields}
                  getItemKey={config.getItemKey}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <DemoFooter className="index-page" />
    </>
  );
}

export default GestionEntidades;