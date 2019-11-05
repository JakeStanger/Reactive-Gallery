interface IControlsProps {
  showLocation: boolean;
  onChangeShowLocation: (show: boolean) => void;

  showTime: boolean;
  onChangeShowTime: (show: boolean) => void;
  
  showTags: boolean;
  onChangeShowTags: (show: boolean) => void;
  
  showDescription: boolean;
  onChangeShowDescription: (show: boolean) => void;

  query: string;
  onQueryChange: (query: string) => void;

  group: string;
  onGroupChange: (group: string) => void;
}

export default IControlsProps;