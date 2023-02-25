import { useApi } from "../../utils/hooks";

export function getNearestProperties() {
  return useApi("/catalog/unit/properties");
}

export function getProperty(id: string) {
  return useApi(`/catalog/unit/properties/${id}`);
}
