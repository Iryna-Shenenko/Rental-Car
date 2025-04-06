
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectIsLoading, selectSelectedCar } from "../../redux/Cars/selector";
import { useEffect } from "react";
import { fetchCarById } from "../../redux/Cars/operations";
import { Loader } from "../../components/Loader/Loader";
import { DetailForm } from "../../components/DetailForm/DetailForm";


const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(selectSelectedCar);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const safeYear = car?.year || 'N/A';
  
  
  const locationPart =
    car?.address?.split(', ').slice(1).join(', ') || 'Unknown Location';
  const displayId = `Id: ${String(car?.id).replace(/-/g, '').slice(0, 4)}`;
  const safeMileage = Number(car?.mileage) || 0;

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id));
    }
  }, [dispatch, id]);

  if (error) return <div>Error: {error}</div>;
   if (isLoading) return <Loader />;
  if (!car) return <p>Car not found</p>;
  

   const rentalConditions =
     typeof car?.rentalConditions === 'string'
       ? car.rentalConditions.split(', ')
       : car?.rentalConditions || [];
   const accessoriesFunctionalities = [
     ...(car?.accessories || []),
     ...(car?.functionalities || []),
  ];
  
  return (
    <>
      <div >
        <div >
          <img
            src={car.img}
            alt={`${car.brand} ${car.model}`}
          />
          <DetailForm />
        </div>
        <div >
          <h2 >
            {car?.brand} {car?.model}, {safeYear}
            <span >{displayId}</span>
          </h2>
          <p >
            <svg >
              <use href={'/img/sprite.svg#icon-location'} />
            </svg>
            {locationPart}{' '}
            <span style={{ marginLeft: '16px', color: '#101828' }}>
              Mileage: {safeMileage.toLocaleString()} km
            </span>
          </p>
          <p >{car?.rentalPrice || 'N/A'}$</p>
          <p >
            {car?.description || 'No description'}
          </p>
          <h3>Rental Conditions:</h3>
          <URLSearchParams>
            {rentalConditions.map((condition, index) => (
              <li key={index}>
                <svg >
                  <use
                    href={'/img/sprite.svg#icon-check-circle'}
                  />
                </svg>
                {condition}
              </li>
            ))}
          </URLSearchParams>
          <h3>Car Specifications:</h3>
          <ul >
            <li >
              <svg >
                <use href={'/img/sprite.svg#icon-calendar'} />
              </svg>
              Year: {safeYear}
            </li>
            <li >
              <svg >
                <use href={'/img/sprite.svg#icon-car'} />
              </svg>
              Type: {car?.type || 'N/A'}
            </li>
            <li >
              <svg >
                <use href={'/img/sprite.svg#icon-fuel-pump'} />
              </svg>
              Fuel Consumption: {car?.fuelConsumption || 'N/A'}
            </li>
            <li >
              <svg >
                <use href={'/img/sprite.svg#icon-gear'} />
              </svg>
              Engine Size: {car?.engineSize || 'N/A'}
            </li>
          </ul>
          <h3>Accessories and functionalities:</h3>
          <ul >
            {accessoriesFunctionalities.map((item, index) => (
              <li key={index}>
                <svg >
                  <use
                    href={'/img/sprite.svg#icon-check-circle'}
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Outlet />
      </div>
    </>
  );
};


export default DetailPage;