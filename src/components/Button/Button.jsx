import { LoadMoreButton } from "./Button.styled.js";

export const Button = ({ onClick }) => {
  return (
    <LoadMoreButton type="button" onClick={onClick}>
      Load More
    </LoadMoreButton>
  );
};
