interface IVisibilityProps {
  showLocation: boolean;
  showTime: boolean;
  showDescription: boolean;
  showTags: boolean;

  onChangeShowLocation: (show: boolean) => void;
  onChangeShowTime: (show: boolean) => void;
  onChangeShowDescription: (show: boolean) => void;
  onChangeShowTags: (show: boolean) => void;

}

export default IVisibilityProps;