import React from "react";
import styles from "./Gallery.module.scss";
import IGalleryState from "./IGalleryState";
import ImageService from "../../../services/imageService/ImageService";
import Loader from "./loader/Loader";
import Card from "./card/Card";
import Masonry from "react-masonry-component";
import Controls from "./controls/Controls";
import IImage from "../../../services/imageService/IImage";
import { groupBy } from "lodash";
import { DateTime } from "luxon";
import SettingsService from "../../../services/settingsService/SettingsService";

class Gallery extends React.PureComponent<{}, IGalleryState> {
  private readonly _imageService: ImageService;
  private _settingsService: SettingsService;

  constructor(props: {}) {
    super(props);

    this._imageService = ImageService.getInstance();

    const settingsService = new SettingsService();
    this._settingsService = settingsService;

    this.state = {
      loading: true,
      images: [],

      showLocation: settingsService.getShowLocation(),
      showTime: settingsService.getShowTime(),
      showDescription: settingsService.getShowDescription(),
      showTags: settingsService.getShowTags(),

      query: "",
      group: "",

      width: this._getWidth()
    };
  }

  private _getWidth() {
    return (360 + 20) * Math.floor(window.innerWidth / (360 + 20));
  }

  private _updateWidth = () => {
    this.setState({ width: this._getWidth() });
  };

  public componentDidMount() {
    this._imageService
      .getAll()
      .then(images =>
        this.setState({ images }, () => this.setState({ loading: false }))
      );

    window.addEventListener("resize", this._updateWidth);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this._updateWidth);
  }

  private _updateQuery = (query: string) => {
    this.setState({ query });
  };

  private _updateGroup = (group: string) => {
    this.setState({ group });
  };

  private _updateShowLocation = (showLocation: boolean) => {
    this.setState({ showLocation });
    this._settingsService.setShowLocation(showLocation);
  };

  private _updateShowTime = (showTime: boolean) => {
    this.setState({ showTime });
    this._settingsService.setShowTime(showTime);
  };

  private _updateShowDescription = (showDescription: boolean) => {
    this.setState({ showDescription });
    this._settingsService.setShowDescription(showDescription);
  };

  private _updateShowTags = (showTags: boolean) => {
    this.setState({ showTags });
    this._settingsService.setShowTags(showTags);
  };

  private _getSortedGroups(groups: string[]) {
    return groups.sort((a, b) => {
      switch (this.state.group) {
        case "taken_time":
          return DateTime.fromISO(a)
            .diff(DateTime.fromISO(b))
            .as("months");
        default:
          return (a !== "null" && a !== "No Location"
            ? a
            : "zzz"
          ).localeCompare(b !== "null" && b !== "No Location" ? b : "zzz");
      }
    });
  }

  private _getFilteredImages(images: IImage[]) {
    const query = this.state.query.toLowerCase();

    return images.filter(
      image =>
        !query ||
        (image.name && image.name.toLowerCase().indexOf(query) > -1) ||
        (image.location &&
          image.location.name.toLowerCase().indexOf(query) > -1) ||
        (image.description &&
          image.description.toLowerCase().indexOf(query) > -1) ||
        (image.tags &&
          image.tags
            .map(t => t.name)
            .join("")
            .toLowerCase()
            .indexOf(query) > -1)
    );
  }

  private _getGroupedImages() {
    const { group } = this.state;
    const images = this._getFilteredImages(this.state.images);

    return groupBy(images, image => {
      switch (group) {
        case "taken_time":
          // Group by month
          const date = DateTime.fromISO(image.timeTaken);
          return date.isValid ? date.toFormat("MMMM yyyy") : "No Date";
        case "name":
          // Group by first letter
          return image.name.trim()[0].toUpperCase();
        case "location":
          return image.location ? image.location.name : "No Location";
        default:
          return "";
      }
    });
  }

  public render() {
    const {
      loading,
      showLocation,
      showTime,
      showDescription,
      showTags,
      query,
      group,
      width
    } = this.state;

    const groupedImages = this._getGroupedImages();

    return (
      <div>
        <Controls
          showLocation={showLocation}
          onChangeShowLocation={this._updateShowLocation}
          showTime={showTime}
          onChangeShowTime={this._updateShowTime}
          showDescription={showDescription}
          onChangeShowDescription={this._updateShowDescription}
          showTags={showTags}
          onChangeShowTags={this._updateShowTags}
          query={query}
          onQueryChange={this._updateQuery}
          group={group}
          onGroupChange={this._updateGroup}
        />
        <div className={styles.galleryContainer}>
          {loading && <Loader />}

          {this._getSortedGroups(Object.keys(groupedImages)).map(groupName => (
            <div className={styles.group} key={groupName}>
              <div className={styles.subTitle}>{groupName}</div>
              <Masonry className={styles.cards} style={{ width }}>
                {groupedImages[groupName].map(image => (
                  <Card
                    key={image.filename}
                    imageService={this._imageService}
                    image={image}
                    height={image.height * (360 / image.width)}
                    showLocation={this.state.showLocation}
                    showTime={this.state.showTime}
                    showTags={this.state.showTags}
                    showDescription={this.state.showDescription}
                  />
                ))}
              </Masonry>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Gallery;
