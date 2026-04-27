export const ENTITY_TYPES = {
  producto: {
    endpoint: "producto",
    label: "Productos",
    listTitle: "Listado de productos",
    formTitle: "Crear producto",
    initialData: {
      idUser: 1,
      name: "",
      description: "",
      price: 0,
    },
    listFields: [
      { key: "name", label: "Nombre" },
      { key: "description", label: "Descripcion" },
      { key: "price", label: "Precio" },
      { key: "idUser", label: "Usuario" },
    ],
    formFields: [
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "description", label: "Descripcion", type: "text", required: false },
      { name: "price", label: "Precio", type: "number", required: true },
    ],
    getItemKey: (item, index) => item.pk ?? item.id ?? index,
  },
  evento: {
    endpoint: "evento",
    label: "Eventos",
    listTitle: "Listado de eventos",
    formTitle: "Crear evento",
    initialData: {
      name: "",
      description: "",
      creation_date: "",
      resolution_date: "",
    },
    listFields: [
      { key: "name", label: "Nombre" },
      { key: "description", label: "Descripcion" },
      { key: "creation_date", label: "Fecha de creacion" },
      { key: "resolution_date", label: "Fecha de resolucion" },
    ],
    formFields: [
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "description", label: "Descripcion", type: "text", required: false },
      { name: "creation_date", label: "Fecha de creacion", type: "date", required: true },
      { name: "resolution_date", label: "Fecha de resolucion", type: "date", required: false },
    ],
    getItemKey: (item, index) => item.oid ?? item.pk ?? index,
  },
};

export function getEntityTypeConfig(entityType) {
  return ENTITY_TYPES[entityType] || ENTITY_TYPES.producto;
}