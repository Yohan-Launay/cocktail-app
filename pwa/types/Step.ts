import { Item } from "./item";

export class Step implements Item {
  public "@id"?: string;

  constructor(_id?: string, public sequence?: number, public resume?: string) {
    this["@id"] = _id;
  }
}
