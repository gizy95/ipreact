import { useEffect, useState } from 'react'
import './App.css'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';



function App() {


  const [data, setData] = useState({})
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(false);
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_KEY}`


  const getData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);


      const url2 = `https://restcountries.com/v3.1/alpha?codes=${data.location.country}`;

      try {
        const response2 = await fetch(url2);
        const data2 = await response2.json();
        setCountry(data2);
      } catch (error) {
        console.error("Error fetching data from the second URL: ", error);
      }

    } catch (error) {
      console.error("Error fetching data from the first URL: ", error);
    } finally {
      setLoading(true);
    }
  }


  useEffect(() => {
    getData();

  }, [])

  console.log(data);
  console.log(country);





  return (
    <>
      {loading ? (
        <div>
          <h2>Region : {data.location.region}</h2>
          <h2>Town : {data.location.city}</h2>
          <div>
            <MapContainer style={{ width: "800px", height: '500px', marginBottom: "20px" }} center={[data.location.lat, data.location.lng]} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[data.location.lat, data.location.lng]}>

              </Marker>
            </MapContainer>
          </div >

          <div className='card-info'>
            <h2>Country : {country[0].name.common}</h2>
            <img src={country[0].flags.png} alt="flag" />
            <p>Capital : {country[0].capital}</p>
            <p>Population : {country[0].population}</p>
            <p>Area : {country[0].area} km²</p>

          </div>
        </div >
      ) : (<h2>Loading.......</h2>)
      }

    </>
  )

}

export default App
