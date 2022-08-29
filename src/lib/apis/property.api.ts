import { useApi } from "../../utils/hooks";

export function getNearestProperties() {
  return useApi("/unit/properties");
}
