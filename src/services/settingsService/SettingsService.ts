class SettingsService {
  private _getBool(keyName: string, def: any) {
    const value = localStorage.getItem(keyName);
    if (value === null) return def;
    else return value === "true";
  }

  public getShowLocation() {
    return this._getBool("showLocation", true);
  }

  public setShowLocation(show: boolean) {
    localStorage.setItem("showLocation", show.toString());
  }

  public getShowTime() {
    return this._getBool("showTime", true);
  }

  public setShowTime(show: boolean) {
    localStorage.setItem("showTime", show.toString());
  }

  public getShowDescription() {
    return this._getBool("showDescription", true);
  }

  public setShowDescription(show: boolean) {
    localStorage.setItem("showDescription", show.toString());
  }

  public getShowTags() {
    return this._getBool("showTags", false);
  }

  public setShowTags(show: boolean) {
    localStorage.setItem("showTags", show.toString());
  }
}

export default SettingsService;
