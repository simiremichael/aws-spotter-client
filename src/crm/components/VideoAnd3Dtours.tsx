import React, {useState} from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavLink} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { TextareaAutosize, TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledBox = styled(Box)`
`
const StyledContainer = styled(Container)`
margin-bottom: 20px;
`
const ItmesContainer= styled.div`
margin-top: 20px;
@media screen and (max-width: 900px) {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  margin-top: 0;
}
`
const Items = styled.p`
text-align: start;
color: #494949;
@media screen and (max-width: 900px) {
  margin: 10px;
}
`
const FormContainer = styled.div`
width: 100%;
padding: 20px 10px;
border: 0.5px solid #D3D3D3;
`
const FormTitle = styled.h5`
font-size: 1.5rem;
text-align: start;
font-weight: 400;
color: #383838;
margin-bottom: 0;
`
const FormInfo = styled.p`
color: #494949;
font-size: 0.7rem;
text-align: start;
margin-bottom: 30px;
`
const TextareaAutosizes = styled(TextareaAutosize)`
border: 1px solid #D3D3D3; 
color: #494949;
outline: none;
`
const PropertyTypeLink = styled(NavLink)`
 text-decoration: none;
 color: #494949;
 :active{
  front-weight: bold;
 }
 `
 const Form = styled.form`

`
 const ButtonContainer = styled.div`
 display: flex;
 width: 100%;
 justify-content: start;
 margin-top: 20px;
 `
 const NextButton = styled.button`
 border: none;
 background-color:#008080;
 color: #ffffff;
 outline: none;
 font-size: 1rem;
 padding: 6px 15px;
 font-size: 1rem;
 font-weight: bold;
 border-radius: 5px;
 cursor: pointer;
 `
 const CloseButton = styled.button`
 border: 0.5px solid #D3D3D3;
 background-color: inherit;
 color: #494949;
 outline: none;
 margin-right: 15px;
 padding: 6px 15px;
 font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
 `
 const VidContainer = styled.div`
margin: 20px 0;
 `
const VideoUrl = styled(TextField)`
margin-bottom: 8px;
`
const TourUrl = styled(TextField)`
marging-top: 8px;
`
const TourInfo = styled.p`
font-size: 0.8rem;
`
const ViewBtn = styled.button`
outline: none;
border: none;
font-size: 0.8rem;
color: #007FFF;
background-color: inherit;
cursor: pointer;
:hover {
  color: #6CB4EE;
}
`

function VideoAnd3Dtours(props: { updateProperty: any, property: any, setProperty: any}) {

  const property = props.property;
  const setProperty = props.setProperty;
  const { register,handleSubmit } = useForm({
    defaultValues: {
      video: property.video,
      tour: property.tour,
    }
  });
  const [viewInfo, setViewInfo] = useState(false)

 let navigate = useNavigate();
  
 const onSubmit = (data: any) => {
  toast.success('Saved..')
 console.log(data);
 props.updateProperty(data);
 navigate('/agentproperties/details')

};

const handleBackButton = () => {
  navigate('/agentproperties/photos')
}

  return (
    <StyledBox >
    <StyledContainer >
    <FormTitle>Photos</FormTitle>
     <Grid container>
     <Grid item lg={3} md={3} sm={12} xs={12}>
      <ItmesContainer>
       <Items><PropertyTypeLink to=''>Property type</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Location</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Property size and Price</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Description</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Photos</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''><strong>Video & 3D tours</strong></PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Details</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Utilities</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to=''>Features</PropertyTypeLink></Items>
      </ItmesContainer>
     </Grid>
     <Grid item lg={9} md={9} sm={12} xs={12}>
     <FormContainer>
     <FormTitle>Video and 3D tours</FormTitle>
     <FormInfo></FormInfo>
     <Form onSubmit={handleSubmit(onSubmit)}>
      <VidContainer>
      <VideoUrl variant='outlined' label='LINK TO VIDEO' type='url' {...register('video',{required: false })} name='video' value={property.video} onChange={(e: any) => setProperty({...property, video: e.target.value})} size='small' fullWidth />
      <TourUrl variant='outlined' label='LINK TO 3D TOURS' type='url' {...register('tour',{required: false })} name='tour' value={property.tour} onChange={(e: any) => setProperty({...property, tour: e.target.value})} size='small' fullWidth />
      </VidContainer>
      <ViewBtn onClick={() => setViewInfo(!viewInfo)} type='button'>View info on how to upload video and tour.</ViewBtn>
      {viewInfo &&
      <>
      <TourInfo>To upload a video to YouTube and copy the embed URL link, follow these steps:

 1. Sign in to your YouTube account: Go to YouTube's website (www.youtube.com) and sign in with your Google account. If you don't have an account, you'll need to create one. 
<br />
Click on the "Upload" button: In the top right corner of the YouTube homepage, click on the upward-pointing arrow icon next to the notification bell. This will open the upload menu.
<br />
2. Select your video file: Click on the "Select files to upload" button and choose the video file you want to upload from your computer. You can also drag and drop the file directly into the upload area.
<br />
3. Set the video details: While the video is uploading, you can add information about your video, such as the title, description, and tags. You can also choose the privacy settings and select a thumbnail image. 
<br />
4. Publish the video: Once the video has finished uploading, click on the "Publish" button to make it live on YouTube. You can also choose to schedule the video to be published at a later time or set it as unlisted or private if you don't want it to be publicly accessible. 
<br />
5. Access the video's embed URL link: After the video is published, go to the video's page on YouTube. Below the video player, you'll find a share button with an arrow. Click on it, and a sharing panel will appear. 
<br />
6. Copy the embed URL link: In the sharing panel, you'll see an "Embed" option. Click on it, and the embed code will be displayed.simply copy part of  the URL within the code, which typically starts with https and stopped just before the title. EXXAMPLE: <strong>https://www.youtube.com/embed/EfAl9bwzVZk</strong>. please note: remove the quotes before u continue.
<br />
That's it! You have successfully uploaded your video to YouTube and copied the embed URL link.</TourInfo>

<br />

<TourInfo><strong>For property tour:</strong></TourInfo>
<TourInfo>Contact us via email or call us.</TourInfo>
<TourInfo>sales@residencespotter.com</TourInfo>
<TourInfo>08024990457</TourInfo>
</> 
            }
      <ToastContainer />
    <ButtonContainer>
    <CloseButton type='button' onClick={handleBackButton}>Back</CloseButton>
    <NextButton type='submit'>Continue</NextButton>
    </ButtonContainer>
     </Form> 
     </FormContainer>
     </Grid>
     </Grid>
    </StyledContainer>
   </StyledBox>
  )
}

export default VideoAnd3Dtours


//onChange={(e) => setInput({ ...input, tour: e.target.value })}