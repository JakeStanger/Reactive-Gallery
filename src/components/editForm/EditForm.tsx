import React from "react";
import styles from "./EditForm.module.scss";
import IEditFormProps from "./IEditFormProps";
import IEditFormState from "./IEditFormState";
import TagsInput, { Tag } from "react-tag-autocomplete";
import ILocation from "../../services/imageService/ILocation";
import ITag from "../..//services/imageService/ITag";
import ImageService from "../../services/imageService/ImageService";
import IImage from "../../services/imageService/IImage";
import Dropdown from "../dropdown/Dropdown";
import PriceService from "../../services/priceService/PriceService";
import Loader from "../loader/Loader";
import ICategory from "../../services/imageService/ICategory";

class EditForm extends React.PureComponent<IEditFormProps, IEditFormState> {
  private _imageService: ImageService;

  constructor(props: IEditFormProps) {
    super(props);

    this.state = {
      name: props.image.name || "",
      description: props.image.description || "",

      categories: props.image.categories || [],
      location: props.image.location ? [props.image.location] : null,
      tags: props.image.tags || [],

      suggestedCategories: [],
      suggestedLocations: [],
      suggestedTags: [],

      priceGroup: props.image.priceGroup,
      priceGroups: [],

      loading: false
    };

    this._imageService = ImageService.getInstance();

    this._removeCategory = this._removeCategory.bind(this);
    this._removeTag = this._removeTag.bind(this);
  }

  public componentDidMount() {
    const { priceGroup } = this.state;

    this._imageService
      .getLocations()
      .then(suggestedLocations => this.setState({ suggestedLocations }));

    this._imageService
      .getTags()
      .then(suggestedTags => this.setState({ suggestedTags }));

    this._imageService
      .getCategories()
      .then(suggestedCategories => this.setState({ suggestedCategories }));

    PriceService.getInstance()
      .getAllPriceGroups()
      .then(priceGroups =>
        this.setState({
          priceGroups,
          priceGroup: priceGroup ? priceGroup : priceGroups[0]
        })
      );
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

  private _addCategory = (category: Tag) => {
    let { categories } = this.state;
    categories = [...categories, category as ICategory];
    this.setState({ categories });
  };

  private _removeCategory(index: number) {
    let { categories } = this.state;
    categories = categories.filter((_, i) => i !== index);
    this.setState({ categories });
  }

  private _addTag = (tag: Tag) => {
    let { tags } = this.state;
    tags = [...tags, tag as ITag];
    this.setState({ tags });
  };

  private _removeTag = (index: number) => {
    let { tags } = this.state;
    tags = tags.filter((_, i) => i !== index);
    this.setState({ tags });
  };

  private _setPriceGroup = (priceGroupId: string) => {
    const groupId = parseInt(priceGroupId);
    const { priceGroups } = this.state;
    this.setState({
      priceGroup: priceGroups.find(group => group.id === groupId)!
    });
  };

  private _onSave = async (ev: React.FormEvent) => {
    ev.preventDefault();

    this.setState({ loading: true });

    try {
      const { image, mode, file, history } = this.props;
      const {
        name,
        description,
        location,
        categories,
        tags,
        priceGroup
      } = this.state;

      if (mode === "upload" && file) {
        const res = await this._imageService.upload(file, {
          name,
          description,
          location: location ? location[0] : null,
          categories,
          tags,
          priceGroup
        });

        if ((res as { msg: string }).msg && this.props.onError)
          this.props.onError((res as { msg: string }).msg);
        else history.push("/");
      } else {
        await this._imageService.update({
          id: image.id,
          filename: image.filename,
          name,
          description,
          location: location ? location[0] : null,
          tags,
          categories,
          priceGroup
        });
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      if (this.props.onError) this.props.onError(err.message);
    }

    this.setState({ loading: false });
  };

  private _onDelete = async (ev: React.FormEvent) => {
    ev.preventDefault();
    await this._imageService.delete(this.props.image as IImage);
    this.props.history.push("/");
  };

  public render() {
    const {
      name,
      description,
      categories,
      location,
      tags,
      suggestedCategories,
      suggestedLocations,
      suggestedTags,
      priceGroup,
      priceGroups
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
          <div className={styles.label}>Categories</div>
        </label>
        <div>
          <TagsInput
            tags={categories}
            suggestions={
              !categories || categories.length < 3
                ? suggestedCategories.filter(c => !categories.includes(c))
                : undefined
            }
            handleAddition={this._addCategory}
            handleDelete={this._removeCategory}
            placeholder={
              !categories || categories.length < 3
                ? "Press enter to confirm each category. Up to 3 categories."
                : ""
            }
            minQueryLength={0}
            autofocus={false}
            maxSuggestionsLength={20}
          />
        </div>
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
            autofocus={false}
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
            autofocus={false}
          />
        </div>
        <label>
          <div className={styles.label}>Price Group</div>
        </label>
        <div>
          <Dropdown
            value={priceGroup?.id}
            onChange={this._setPriceGroup}
            options={priceGroups.map(group => ({
              key: group.id.toString(),
              value: group.name
            }))}
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
        {this.state.loading && <Loader small />}
      </form>
    );
  }
}

export default EditForm;
