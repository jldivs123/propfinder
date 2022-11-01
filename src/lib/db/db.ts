import Dexie, { Table } from "dexie";

export interface HomerFavorite {
  pk: string;
  sk: string;
  geojson: any;
  author: string;
}

export class HomerBookmark extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  savedProperties!: Table<HomerFavorite>;

  constructor() {
    super("HomerFavoriteDB");
    this.version(1).stores({
      savedProperties: "pk, sk, author", // Primary key and indexed props
    });
  }
}

export const db = new HomerBookmark();
