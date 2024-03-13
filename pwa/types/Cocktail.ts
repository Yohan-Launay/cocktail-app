import { Item } from "./item";

export class Cocktail implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public resume?: string,
    public imgPath?: string,
    public etat?: boolean,
    public reviews?: any,
    public utensils?: any,
    public ingredients?: any,
    public categories?: any,
    public steps?: any,
    public user?: any
  ) {
    this["@id"] = _id;
  }
}
