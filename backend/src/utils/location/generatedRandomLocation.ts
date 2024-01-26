export const generateRandomLocation =async () => {
 const minLatitude = -90;
 const maxLatitude = 90;
 const minLongitude = -180;
 const maxLongitude = 180; 

 const randomLatitude = getRandomNumber(minLatitude, maxLatitude);
 const randomLongitude = getRandomNumber(minLongitude, maxLongitude);

 return {
  latitude: randomLatitude,
  longitude: randomLongitude,
 };
};

const getRandomNumber = (min: number, max: number) =>{
  return Math.random() * ( max - min ) + min;
};
