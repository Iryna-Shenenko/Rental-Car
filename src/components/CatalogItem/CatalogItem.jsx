import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorite } from "../../redux/Favourite/selectors";
import { addFavoriteCar, deleteFavoriteCar } from "../../redux/Favourite/slice";
import sprite from "../../../public/img/sprite.svg";

const CatalogItem = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorite);
  const location = useLocation();

  
  const {
    id,
    img,
    brand,
    model,
    year,
    rentalPrice,
    mileage = 0,
    address,
    rentalCompany,
    type,
  } = car;


  const formattedMileage = mileage.toLocaleString();
  const isFavorite = favorites.includes(id);

  const addressParts = address.split(",").map(part => part.trim());
  const city = addressParts[addressParts.length - 2];
  const country = addressParts[addressParts.length - 1];

  const handleAdd = () => {
    dispatch(addFavoriteCar(car));
  };

  const handleRemove = () => {
    dispatch(deleteFavoriteCar(id));
  };

  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      <img src={img} alt={`${brand} ${model}`}  />

      <div >
        <svg
          width="16"
          height="16"
          onClick={isFavorite ? handleRemove : handleAdd}
        >
          <use
            href={`${sprite}#${isFavorite ? "favorite" : "icon-heart"}`}
          />
        </svg>
      </div>

      <div >
        <p>{brand} <span>{model}</span>, {year}</p>
        <p >${rentalPrice}</p>
        <ul >
          <li >{city}</li>
          <li >{country}</li>
          <li >{rentalCompany}</li>
          <li ></li>
          <li >{capitalizeFirstLetter(type)}</li>
          <li >{formattedMileage} km</li>
        </ul>
      </div>

      <NavLink to={`/catalog/${id}`} state={location}>
        Read more
      </NavLink>
    </>
  );
};

export default CatalogItem;
