import { useEffect, useState } from 'react'
import './App.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


function App() {

  const api = import.meta.env.VITE_KEY
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false);

  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${api}`

  const getData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data)
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(true);
    }




  }

  useEffect(() => {
    getData()
  }, [])

  console.log(data);


  return (
    <>
      {loading ? (
        <div id='map'>
          <h1>{data.ip}</h1>
          <h1>{data.location.country}</h1>
          <h1>{data.location.region}</h1>
          <h1>{data.location.city}</h1>
          <div>
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      ) : (<h2>Loading.......</h2>)}

    </>
  )

}

export default App
