import { Item } from "./item";

export class Review implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public title?: string,
    public resume?: string,
    public note?: number,
    public user?: any
  ) {
    this["@id"] = _id;
  }
}
