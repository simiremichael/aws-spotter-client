import React, { useState } from 'react';
import styled from '@emotion/styled';
import Map, {FullscreenControl, GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAppSelector } from '../app/hooks';
import { selectCurrentBuyProperty } from '../services/features/buyPropertySlice';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useNavigate } from 'react-router-dom';

const MapContainer = styled.div`
 width: 100%;
 height: 100vh;
 background-color: #f5f5f5;
 `
 const MapBtn = styled.button`
 position: absolute;
 z-index: 30003;
 margin: 20px 0 0 30px;
 background: rgba( 255, 255, 255, 1 );
 backdrop-filter: blur( 4px );
 border-radius: 5px;
 border: 1px solid rgba( 255, 255, 255, 1 );
 box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
 cursor: pointer;
 `

function BuyMap() {

 const [viewState, setViewState] = useState(false);
 const navigate = useNavigate()
 //const img = data?.images[0].img
 const {buyProperty} = useAppSelector(selectCurrentBuyProperty);

 return ( 
    <MapContainer>
    <MapBtn onClick={() => navigate('/buy')}><CloseOutlinedIcon sx={{color: '#383838'}} /></MapBtn>
    <Map
    initialViewState={{
        longitude: 3.3441925,
        latitude:  6.5540011,
        zoom: 10
      }}
      style={{width: '100%', 
      height: '100vh',
       }}
       mapStyle="mapbox://styles/mapbox/streets-v9"
    // mapStyle="mapbox://styles/simiremichael/clcz22d6e00l814qni4m9qxaq"
    mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    onMove={(nextViewPort: any) => setViewState(nextViewPort)}
    >
          {/* @ts-ignore:next-line */}
    {buyProperty?.data?.map((map: any, index: any) => (
    <Marker key={index} longitude={map.longitude} latitude={map.latitude} anchor="bottom" >
    <LocationOnOutlinedIcon sx={{color: '#008080', fontSize: 40}}/>
    </Marker>
      ))}
    <NavigationControl position='bottom-right' />
    <GeolocateControl />
    <FullscreenControl />
    </Map>
    </MapContainer>
  )
}

export default BuyMap