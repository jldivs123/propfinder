import { useApi } from "../../utils/hooks";

export function getNearestProperties(): any {
  return useApi("/unit/properties");
}

export function getProperty(id: string) {
  return useApi(`/unit/properties/${id}`);
}
