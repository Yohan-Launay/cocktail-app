import { Item } from "./item";

export class Ingredient implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public imgPath?: string,
    public unite?: string,
    public volume?: string
  ) {
    this["@id"] = _id;
  }
}
