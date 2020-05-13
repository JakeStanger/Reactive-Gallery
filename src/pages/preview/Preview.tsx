import React from "react";
import styles from "./Preview.module.scss";
import ImageService from "../../services/imageService/ImageService";
import IPreviewState from "./IPreviewState";
import IPreviewProps from "./IPreviewProps";
import Loader from "../../components/loader/Loader";
import PreviewInfo from "./previewInfo/PreviewInfo";
import UserService from "../../services/userService/UserService";

class Preview extends React.PureComponent<IPreviewProps, IPreviewState> {
  private _imageService: ImageService;
  private _userService: UserService;

  constructor(props: IPreviewProps) {
    super(props);

    this.state = {
      image: null,
      user: null
    };

    this._imageService = ImageService.getInstance();
    this._userService = UserService.getInstance();
  }

  public componentDidMount() {
    const { filename } = this.props.match.params;

    this._imageService.get(filename).then(image => this.setState({ image }));
    this._userService.getCurrentUser().then(user => this.setState({ user }));
  }

  public render() {
    const { image, user } = this.state;
    const imageUrl = image ? this._imageService.getLink(image, true) : "#";

    return (
      <div>
        {image ? (
          <div>
            <div className={styles.imageContainer}>
              <a href={imageUrl}>
                <img
                  className={styles.image}
                  src={imageUrl}
                  alt={image.name}
                  height={window.innerHeight * 0.8}
                />
              </a>
            </div>
            <PreviewInfo
              image={image}
              user={user}
              history={this.props.history}
            />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default Preview;
