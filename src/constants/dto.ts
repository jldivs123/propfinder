export interface PropertyDetail {
  property_number: string;
  address: string;
  selling_price: string;
  type: string;
  lot_area: string;
  floor_area: string;
  title_number: string;
  appraisal_date: string;
  remarks: string;
}

export interface GeoJSON {
  type: string;
  properties: PropertyDetail;
  geometry: {
    coordinates: Array<number>;
    type: string;
  };
}

export interface ModalPropsType<T> {
  isOpen: boolean;
  handleClose: () => void;
  data: T;
}
