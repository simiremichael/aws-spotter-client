import React, { useState } from 'react';
import styled from '@emotion/styled';
import Map, {FullscreenControl, GeolocateControl, Marker, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAppSelector } from '../app/hooks';
import { selectCurrentRentProperty } from '../services/features/rentPropertySlice';
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

function RentMap() {

 const [viewState, setViewState] = useState(false);
 const navigate = useNavigate()
 //const img = data?.images[0].img
 const {rentProperty} = useAppSelector(selectCurrentRentProperty);

 return ( 
    <MapContainer>
    <MapBtn onClick={() => navigate('/rent')}><CloseOutlinedIcon sx={{color: '#383838'}} /></MapBtn>
    <Map 
    initialViewState={{
        longitude: 3.429252,
        latitude:  6.539580,
        zoom: 10
      }}
      style={{width: '100%', 
      height: '100vh',
       }}
      // mapStyle="mapbox://styles/mapbox/streets-v9"
    mapStyle="mapbox://styles/simiremichael/clcz22d6e00l814qni4m9qxaq"
    mapboxAccessToken="pk.eyJ1Ijoic2ltaXJlbWljaGFlbCIsImEiOiJjbDhtMWZza3owOGM5M290aGdkdXNzbnhyIn0.cZ53EbJgw_QlQEq2-bRpWw"
    onMove={(nextViewPort: any) => setViewState(nextViewPort)}
    >
          {/* @ts-ignore:next-line */}
    {rentProperty?.data?.map((map: any, index: any) => (
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

export default RentMap