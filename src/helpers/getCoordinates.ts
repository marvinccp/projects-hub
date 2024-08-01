export const getCoordinates = async (address: string, postalCode:string) => {
  console.log(address, postalCode);
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${address}, ${postalCode}`
  );
  const data = await response.json();
  console.log(data);
  return data ? { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) } : null
};
