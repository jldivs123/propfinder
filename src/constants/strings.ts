export const MAPBOX_PUBLIC_TOKEN =
  "pk.eyJ1IjoiamxkaXZzLWRldiIsImEiOiJja3oyOGpqMXQxdGVrMnVwM2E3MnZ2MDkzIn0.sOADddfJqgk7XMKdg_Pjiw";

export const GOOGLE_STREETVIEW_URL = `https://maps.google.com/maps?q=&layer=c&cbll=latitude,longitude&cbp=11,0,0,0,0`;

export const MANILA_LATITUDE = `14.5995`;
export const MANILA_LONGITUDE = `120.9842`;
export const MISSING_PROPERTY_IMG = "/undraw_for_sale_re_egkk.svg";

export const THEME_COLORS = {
  BLUE: "#667FF8",
  DEEP_BLUE: "#0B0F58",
  YELLOW: "#ECC551",
  GRAY: "#F2F2F2",
};

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://api.scarriot.com";
