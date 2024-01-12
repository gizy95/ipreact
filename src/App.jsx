import { useEffect, useState } from 'react'
import './App.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


function App() {

  const api = import.meta.env.VITE_KEY
  const [data, setData] = useState({
    "ip": "47.63.220.6",
    "location": {
      "country": "Es",
      "region": "Comunidad de Madrid",
      "city": "Los Angeles",
      "lat": 40.35579,
      "lng": -3.69914,
      "postalCode": "",
      "timezone": "+01:00",
      "geonameId": 11550023
    },
    "as": {
      "asn": 12430,
      "name": "VODAFONE_ES",
      "route": "47.63.0.0/16",
      "domain": "http://www.vodafone.es/",
      "type": "Cable/DSL/ISP"
    },
    "isp": "Vodafone Global Enterprise Inc.",
    "proxy": {
      "proxy": false,
      "vpn": false,
      "tor": false
    }
  })
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(false);

  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${api}`
  const url2 = `https://restcountries.com/v3.1/alpha?codes=${data.location.country}`;

  // const getData = async () => {
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setData(data)
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   } finally {
  //     setLoading(true);

  //   }

  // }

  const getCountry = async () => {
    try {
      const response = await fetch(url2);
      const data = await response.json();
      setCountry(data)
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(true);
      console.log(country);

    }

  }

  useEffect(() => {
    //getData();
    getCountry();
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
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div >

          <div className='card-info'>
            <h2>{country[0].name.common}</h2>
            <h2>{country[0].capital}</h2>
            <img src={country[0].flags.png}></img>
          </div>
        </div >
      ) : (<h2>Loading.......</h2>)
      }

    </>
  )

}

export default App
