import { Item } from "./item";

export class Utensil implements Item {
  public "@id"?: string;

  constructor(_id?: string, public name?: string, public imgPath?: string) {
    this["@id"] = _id;
  }
}
