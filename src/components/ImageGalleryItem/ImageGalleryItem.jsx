import { Item, Image } from "./ImageGalleryItem.styled.js";

export const ImageGalleryItem = ({ image, onImageClick }) => {
  const handleClick = () => {
    onImageClick(image);
  };

  return (
    <Item>
      <Image src={image.webformatURL} alt={image.tags} onClick={handleClick} />
    </Item>
  );
};