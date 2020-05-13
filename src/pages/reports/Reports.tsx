import React, { useCallback, useEffect, useState } from "react";
import styles from "./Reports.module.scss";
import IReportsProps from "./IReportsProps";
import IImage from "../../services/imageService/IImage";
import ImageService from "../../services/imageService/ImageService";
import { Link } from "react-router-dom";

const ImageLink: React.FC<{image: IImage}> = ({image}) => (
  <div className={styles.imageLink}><Link to={`/preview/${image.filename}`} target={'_blank'}>{image.name}</Link></div>
)

const Reports: React.FC<IReportsProps> = () => {
  const [images, setImages] = useState<IImage[]>([]);

  const getImages = useCallback(() => {
    ImageService.getInstance()
      .getAll(true)
      .then(setImages)
      .catch(console.error);
  }, [])


  useEffect(() => {
    getImages();
    const timer = setInterval(() => {
      getImages();
    }, 10_000);

    return () => clearInterval(timer);
  }, [getImages])

  return (
    <div className={`${styles.container} ${styles.reports}`}>
      <div>
        <div className={styles.subSubTitle}>No Location</div>
        {images
          .filter(image => !image.location)
          .map(image => (
            <ImageLink image={image} key={image.filename} />
          ))}
      </div>
      <div>
        <div className={styles.subSubTitle}>No Tags</div>
        {images
          .filter(image => !image.tags?.length)
          .map(image => (
            <ImageLink image={image} key={image.filename} />
          ))}
      </div>
      <div>
        <div className={styles.subSubTitle}>No Price Group</div>
        {images
          .filter(image => (image as any).price_group_id === null)
          .map(image => (
            <ImageLink image={image} key={image.filename} />
          ))}
      </div>
      <div>
        <div className={styles.subSubTitle}>Missing EXIF Data</div>
        {images
          .filter(image => !image.cameraModel)
          .map(image => (
            <ImageLink image={image} key={image.filename} />
          ))}
      </div>
      <div>
        <div className={styles.subSubTitle}>No Description</div>
        {images
          .filter(image => !image.description)
          .map(image => (
            <ImageLink image={image} key={image.filename} />
          ))}
      </div>
      <div>
        <div className={styles.subSubTitle}>Short Description</div>
        {images
          .filter(image => image.description && image.description.length <= 16)
          .map(image => (
            <ImageLink image={image} key={image.filename} />
          ))}
      </div>
    </div>
  );
};

export default Reports;
