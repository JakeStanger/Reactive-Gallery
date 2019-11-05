import React from "react";
import styles from "./EditForm.module.scss";
import IEditFormProps from "./IEditFormProps";
import IEditFormState from "./IEditFormState";
import TagsInput, { Tag } from "react-tag-autocomplete";
import ILocation from "../../services/imageService/ILocation";
import ITag from "../..//services/imageService/ITag";
import ImageService from "../../services/imageService/ImageService";
import IImage from "../../services/imageService/IImage";

class EditForm extends React.PureComponent<IEditFormProps, IEditFormState> {
  private _imageService: ImageService;

  constructor(props: IEditFormProps) {
    super(props);

    this.state = {
      name: props.image.name || "",
      description: props.image.description || "",
      location: props.image.location ? [props.image.location] : null,
      tags: props.image.tags || [],

      suggestedLocations: [],
      suggestedTags: []
    };

    this._imageService = ImageService.getInstance();
  }

  public componentDidMount() {
    this._imageService
      .getLocations()
      .then(suggestedLocations => this.setState({ suggestedLocations }));
    this._imageService
      .getTags()
      .then(suggestedTags => this.setState({ suggestedTags }));
  }

  private _setName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: ev.target.value });
  };

  private _setDescription = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: ev.target.value });
  };

  private _setLocation = (location: Tag) => {
    this.setState({ location: [location as ILocation] });
  };

  private _clearLocation = (_index: number) => {
    this.setState({ location: null });
  };

  private _addTag = (tag: Tag) => {
    const { tags } = this.state;
    tags.push(tag as ITag);
    this.setState({ tags });
  };

  private _removeTag = (index: number) => {
    let { tags } = this.state;
    tags = tags.filter((_, i) => i !== index);
    this.setState({ tags });
  };

  private _onSave = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const { image, mode, file } = this.props;
    const { name, description, location, tags } = this.state;

    if (mode === "upload" && file) {
      await this._imageService.upload(file, {
        name,
        description,
        location: location ? location[0] : null,
        tags
      });
      window.location.href = "/";
    } else {
      await this._imageService.update({
        filename: image.filename,
        name,
        description,
        location: location ? location[0] : null,
        tags
      });
      window.location.reload();
    }
  };

  private _onDelete = async (ev: React.FormEvent) => {
    ev.preventDefault();
    await this._imageService.delete(this.props.image as IImage);
    window.location.href = "/";
  };

  public render() {
    const {
      name,
      description,
      location,
      tags,
      suggestedLocations,
      suggestedTags
    } = this.state;

    const { mode } = this.props;

    return (
      <form onSubmit={this._onSave} className={styles.container}>
        <label>
          <div className={styles.label}>Name</div>
          <input
            value={name}
            onChange={this._setName}
            className={styles.name}
          />
        </label>
        <label>
          <div className={styles.label}>Description</div>
          <textarea
            value={description}
            onChange={this._setDescription}
            rows={10}
          />
        </label>
        <label>
          <div className={styles.label}>Location</div>
        </label>
        <div>
          <TagsInput
            tags={location && location[0] ? location : undefined}
            suggestions={
              !location || location.length < 1 ? suggestedLocations : undefined
            }
            handleAddition={this._setLocation}
            handleDelete={this._clearLocation}
            placeholder={!location ? "Press enter to confirm" : ""}
            allowNew
          />
        </div>
        <label>
          <div className={styles.label}>Tags</div>
        </label>
        <div>
          <TagsInput
            tags={tags}
            suggestions={!tags || tags.length < 10 ? suggestedTags : undefined}
            handleAddition={this._addTag}
            handleDelete={this._removeTag}
            placeholder={
              !tags || tags.length < 10
                ? "Press enter to confirm each tag. Up to 10 tags."
                : ""
            }
            allowNew
          />
        </div>
        <div className={styles.buttons}>
          <button type="submit" className={styles.save}>
            {mode === "upload" ? "Upload" : "Save"}
          </button>
          {mode === "edit" && (
            <button className={styles.delete} onClick={this._onDelete}>
              Delete
            </button>
          )}
        </div>
      </form>
    );
  }
}

export default EditForm;
