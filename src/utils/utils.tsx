export const TrimString = (numericData: string) => {
  return numericData.replace(/\s/g, "");
};

// * For reference to geohash area check: https://www.movable-type.co.uk/scripts/geohash.html
export const calculateGeohashPrecision = (area: number) => {
  if (area > 781250) {
    return 1;
  }
  if (area > 24336) {
    return 2;
  }
  if (area > 762.45) {
    return 3;
  }
  if (area > 23.9121) {
    return 4;
  }
  if (area > 0.7442) {
    return 5;
  }
  if (area > 0.023409) {
    return 6;
  }
  if (area > 0.0007258) {
    return 7;
  }
  if (area > 0.00227529) {
    return 8;
  }
};

// * TABLE for geohash
/**
 * 1 - 25,000,000Km
 * 2 - 781,250Km
 * 3 - 24,336Km
 * 4 - 762.45Km
 * 5 - 23.9121Km
 * 6 - 0.74420Km
 * 7 - 0.023409
 * 8 - 0.0007258
 * 9 - 0.00227529
 */
