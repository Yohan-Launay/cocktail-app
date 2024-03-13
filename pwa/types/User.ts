import { Item } from "./item";

export class User implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public email?: string,
    public password?: string,
    public username?: string,
    public firstName?: string,
    public lastName?: string,
    public city?: string,
    public country?: string,
    public nameBar?: string,
    public bio?: string,
    public dateBirthday?: Date
  ) {
    this["@id"] = _id;
  }
}
