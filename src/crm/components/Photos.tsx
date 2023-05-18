import React, {useState } from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavLink} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinearProgress from '@mui/material/LinearProgress';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

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
const FileContainer = styled.div`
 `
 const SingleFile = styled.input`
 width: 0;
 height: 0;
 `
 const SpinnerContainer = styled.div`
 display: flex;
 align-items: center;
justify-content: start; 
`
 const SpinnerDiv = styled.div`
 width: 80%;
 margin-top: 4px;
 `
  const PropertyImgLabel = styled.label`
 color: #008080;
 cursor: pointer;
 font-size: 1rem;
 text-align: center;
 width: 100%;
 height: 100%;
 display: flex;
align-items: center;
justify-content: center;
font-weight: bold;
 `
 const PropertyImgContainer = styled.div`
width: 100%;
height: 100px;
border: 0.5px solid #C4C4C4;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-image: url('../../images/blank_avater.jpg');
background-size: 100% 100%;
`
const PropertyImage = styled.img`
width: 100%;
height: 100%;
`

function Photos(props: { updateProperty: any, property: any, setProperty: any }) {

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);
  const [loading7, setLoading7] = useState(false);
  const [loading8, setLoading8] = useState(false);
  const [loading9, setLoading9] = useState(false);
  const [loading10, setLoading10] = useState(false);
  const [loading11, setLoading11] = useState(false);
  const [loading12, setLoading12] = useState(false);

  const [imgstring1, setImgstring1] = useState('')
  const [imgstring2, setImgstring2] = useState('')
  const [imgstring3, setImgstring3] = useState('')
  const [imgstring4, setImgstring4] = useState('')
  const [imgstring5, setImgstring5] = useState('')
  const [imgstring6, setImgstring6] = useState('')
  const [imgstring7, setImgstring7] = useState('')
  const [imgstring8, setImgstring8] = useState('')
  const [imgstring9, setImgstring9] = useState('')
  const [imgstring10, setImgstring10] = useState('')
  const [imgstring11, setImgstring11] = useState('')
  const [imgstring12, setImgstring12] = useState('')

 const property = props.property;
 const setProperty = props.setProperty;

  const { handleSubmit } = useForm({
    defaultValues: {
    }
  });
 let navigate = useNavigate();


 const onSubmit = async (data: any) => {
  console.log(data);
  toast.success('Saved..')
  props.updateProperty(data);
 navigate('/agentproperties/videoAnd3Dtours')

};


const handleBackButton = () => {
  navigate('/agentproperties/description')
}

 const formData = new FormData();

 const handleUpload1 = async (e: any) => {
  setLoading1(true);
 const files = e.target.files
 for ( const file of files) {
     formData.append('file', file);
      {/* @ts-ignore:next-line */}
     formData.append('upload_preset', 'propertyImg');
    await fetch('https://api.cloudinary.com/v1_1/do2u3zzko/image/upload', {
     method: 'POST',
     body: formData,
   })
   .then(r => r.json())
   .then(data => {
       setImgstring1(data.secure_url);
       if (data.url) {
        setLoading1(false);
       }
    })
   }
  };
  const handleUpload2 = async (e: any) => {
  setLoading2(true);
  const files = e.target.files
   for ( const file of files) {
    formData.append('file', file);
     {/* @ts-ignore:next-line */}
     formData.append('upload_preset', 'propertyImg');
     await fetch('https://api.cloudinary.com/v1_1/do2u3zzko/image/upload', {
    method: 'POST',
    body: formData,
  })
  .then(r => r.json())
  .then(data => {
   setImgstring2(data.secure_url);
   if (data.url) {
    setLoading2(false);
   }
   })
  };
};
const handleUpload3 = async (e: any) => {
  setLoading3(true);
  const files = e.target.files
  for ( const file of files) {
    formData.append('file', file);
     {/* @ts-ignore:next-line */}
     formData.append('upload_preset', 'propertyImg');
     await fetch('https://api.cloudinary.com/v1_1/do2u3zzko/image/upload', {
    method: 'POST',
    body: formData,
  })
  .then(r => r.json())
  .then(data => {
   setImgstring3(data.secure_url)
   if (data.url) {
    setLoading3(false);
    }
   })
  }
};
const handleUpload4 = async (e: any) => {
  setLoading4(true);
  const files = e.target.files
  for ( const file of files) {
   formData.append('file', file);
    {/* @ts-ignore:next-line */}
    formData.append('upload_preset', 'propertyImg');
    await fetch('https://api.cloudinary.com/v1_1/do2u3zzko/image/upload', {
   method: 'POST',
   body: formData,
 })
 .then(r => r.json())
 .then(data => {
  setImgstring4(data.secure_url)
  if (data.url) {
    setLoading4(false);
   }
  })
 }
};
const handleUpload5 = async (e: any) => {
 setLoading5(true);
 const files = e.target.files
 for ( const file of files) {
  formData.append('file', file);
   {/* @ts-ignore:next-line */}
   formData.append('upload_preset', 'propertyImg');
   await fetch('https://api.cloudinary.com/v1_1/do2u3zzko/image/upload', {
  method: 'POST',
  body: formData,
})
.then(r => r.json())
.then(data => {
 setImgstring5(data.secure_url)
 if (data.url) {
  setLoading5(false);
 }
 })
}
};
const handleUpload6 = async (e: any) => {
setLoading6(true);
const files = e.target.files
for ( const file of files) {
 formData.append('file', file);
  {/* @ts-ignore:next-line */}
  formData.append('upload_preset', 'propertyImg');
  await fetch('https://api.cloudinary.com/v1_1/do2u3zzko/image/upload', {
  method: 'POST',
  body: formData,
})
.then(r => r.json())
.then(data => {
setImgstring6(data.secure_url)
if (data.url) {
  setLoading6(false);
 }
})
}
};
const handleUpload7 = async (e: any) => {
setLoading7(true);
const files = e.target.files
for ( const file of files) {
 formData.append('file', file);
  {/* @ts-ignore:next-line */}
  formData.append('upload_preset', 'propertyImg');
  await fetch('https://api.cloudinary.com/v1_1/do2u3zzko/image/upload', {
 method: 'POST',
 body: formData,
})
.then(r => r.json())
.then(data => {
setImgstring7(data.secure_url)
if (data.url) {
  setLoading7(false);
 }
})
}
};
const handleUpload8 = async (e: any) => {
setLoading8(true);
const files = e.target.files
for ( const file of files) {
formData.append('file', file);
 {/* @ts-ignore:next-line */}
 formData.append('upload_preset', 'propertyImg');
    await fetch('https://api.cloudinary.com/v1_1/do2u3zzko/image/upload', {
method: 'POST',
body: formData,
})
.then(r => r.json())
.then(data => {
setImgstring8(data.secure_url)
if (data.url) {
  setLoading8(false);
 }
})
}
};
const handleUpload9 = async (e: any) => {
setLoading9(true);
const files = e.target.files
for ( const file of files) {
  formData.append('file', file);
   {/* @ts-ignore:next-line */}
   formData.append('upload_preset', 'propertyImg');
    await fetch('https://api.cloudinary.com/v1_1/do2u3zzko/image/upload', {
  method: 'POST',
  body: formData,
})
.then(r => r.json())
.then(data => {
 setImgstring9(data.secure_url)
 if (data.url) {
  setLoading9(false);
 }
 })
}
};
const handleUpload10 = async (e: any) => {
setLoading10(true);
const files = e.target.files
for ( const file of files) {
 formData.append('file', file);
  {/* @ts-ignore:next-line */}
  formData.append('upload_preset', 'propertyImg');
    await fetch('https://api.cloudinary.com/v1_1/do2u3zzko/image/upload', {
 method: 'POST',
 body: formData,
})
.then(r => r.json())
.then(data => {
setImgstring10(data.secure_url)
if (data.url) {
  setLoading10(false);
 }
})
}
};
const handleUpload11 = async (e: any) => {
setLoading11(true);
const files = e.target.files
for ( const file of files) {
 formData.append('file', file);
  {/* @ts-ignore:next-line */}
  formData.append('upload_preset', 'propertyImg');
  await fetch('https://api.cloudinary.com/v1_1/do2u3zzko/image/upload', {
 method: 'POST',
 body: formData,
})
.then(r => r.json())
.then(data => {
setImgstring11(data.secure_url)
if (data.url) {
  setLoading11(false);
 }
})
}
};
const handleUpload12 = async (e: any) => {
setLoading12(true);
const files = e.target.files
for ( const file of files) {
formData.append('file', file);
 {/* @ts-ignore:next-line */}
 formData.append('upload_preset', 'propertyImg');
    await fetch('https://api.cloudinary.com/v1_1/do2u3zzko/image/upload', {
method: 'POST',
body: formData,
})
.then(r => r.json())
.then(data => {
setImgstring12(data.secure_url)
if (data.url) {
  setLoading12(false);
 }
})
};
}

const attachImg = () => {
 
  const imgarray = [];
  imgarray.push({ img:imgstring1}, {img:imgstring2}, {img:imgstring3}, {img:imgstring4}, {img:imgstring5}, {img: imgstring6}, {img:imgstring7}, {img:imgstring8}, {img:imgstring9}, {img:imgstring10}, {img:imgstring11}, {img:imgstring12});
  //const slideArray = new Array([imgstring1, imgstring2, imgstring3, imgstring4, imgstring5, imgstring6, imgstring7, imgstring8, imgstring9, imgstring10, imgstring11, imgstring12])

    setProperty({...property, images: imgarray});
    // setProperty({...property, slideImages: slideArray});
}

  return (
    
    <StyledBox>
    <StyledContainer >
    <FormTitle>Photos</FormTitle>
     <Grid container>
     <Grid item lg={3} md={3} sm={12} xs={12}>
      <ItmesContainer>
       <Items><PropertyTypeLink to='/agentproperties/propertyType'>Property type</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/location'>Location</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/propertySizeAndPrice'>Property size and Price</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/description'>Description</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/photos'><strong>Photos</strong></PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/videoAnd3Dtours'>Video & 3D tours</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/details'>Details</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/utilities'>Utilities</PropertyTypeLink></Items>
       <Items><PropertyTypeLink to='/agentproperties/features'>Features</PropertyTypeLink></Items>
      </ItmesContainer>
     </Grid>
     <Grid item lg={9} md={9} sm={12} xs={12}>
     <FormContainer>
     <FormTitle>Photos</FormTitle>
     <FormInfo>Upload high quality pictures to represent your property. Good photos will attract more buyers. First photo will be used as the main photo of the property.</FormInfo>
     <Form onSubmit={handleSubmit(onSubmit)}>
     <FileContainer>
        <Grid container spacing={2}>
      <Grid item xs={6} sm={4} md={3} lg={2}>
      <PropertyImgContainer>
       {imgstring1 ?
       <>
       <PropertyImage src={imgstring1} />
       <CloseOutlinedIcon onClick={() => setImgstring1('')} style={{ marginLeft: '80px', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
       </>
        :
        <>
        <SingleFile
         type='file' 
         name='image1' 
         id='image1'
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload1} />
        <PropertyImgLabel htmlFor='image1'>Pick image</PropertyImgLabel>
        </>
        }
        </PropertyImgContainer>
        <SpinnerContainer>
       {loading1 === true ? 
        <SpinnerDiv>
         <LinearProgress />
        </SpinnerDiv>
        : '' }
        </SpinnerContainer>
       {/* <SingleFile
       type='file' 
       name='image1' 
       id='image1'
        onChange={(e: any) =>  setImage1(e.target.files)} 
        accept='image/png, image/jpg, image/jpeg, image/webp' 
       />
        }
         {saved1 === true ? 
        <SaveDiv>
          <DoneIcon sx={{ fontSize: 12, color: '#008080', marginRight: 0.1 }} />
          <Save>saved</Save>
        </SaveDiv>
        : '' }
       </SpinnerContainer> */}
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2}>
      <PropertyImgContainer>
       {imgstring2 ?
       <>
       <PropertyImage src={imgstring2} />
       <CloseOutlinedIcon onClick={() => setImgstring2('')} style={{ marginLeft: '80px', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
       </>
        :
        <>
        <SingleFile
         type='file' 
         name='image2' 
         id='image2'
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload2} />
        <PropertyImgLabel htmlFor='image2'>Pick image</PropertyImgLabel>
        </>
        }
        </PropertyImgContainer>
        <SpinnerContainer>
       {loading2 === true ? 
        <SpinnerDiv>
         <LinearProgress />
        </SpinnerDiv>
        : '' }
        </SpinnerContainer>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2}>
      <PropertyImgContainer>
       {imgstring3 ?
       <>
       <PropertyImage src={imgstring3} />
       <CloseOutlinedIcon onClick={() => setImgstring3('')} style={{ marginLeft: '80px', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
       </>
        :
        <>
        <SingleFile
         type='file' 
         name='image3' 
         id='image3'
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload3} />
        <PropertyImgLabel htmlFor='image3'>Pick image</PropertyImgLabel>
        </>
        }
        </PropertyImgContainer>
        <SpinnerContainer>
       {loading3 === true ? 
        <SpinnerDiv>
         <LinearProgress />
        </SpinnerDiv>
        : '' }
        </SpinnerContainer>
      </Grid>
       <Grid item xs={6} sm={4} md={3} lg={2}>
       <PropertyImgContainer>
       {imgstring4 ?
       <>
       <PropertyImage src={imgstring4} />
       <CloseOutlinedIcon onClick={() => setImgstring4('')} style={{ marginLeft: '80px', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
       </>
        :
        <>
        <SingleFile
         type='file' 
         name='image4' 
         id='image4'
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload4} />
        <PropertyImgLabel htmlFor='image4'>Pick image</PropertyImgLabel>
        </>
        }
        </PropertyImgContainer>
        <SpinnerContainer>
       {loading4 === true ? 
        <SpinnerDiv>
         <LinearProgress />
        </SpinnerDiv>
        : '' }
        </SpinnerContainer>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2}>
      <PropertyImgContainer>
       {imgstring5 ?
       <>
       <PropertyImage src={imgstring5} />
       <CloseOutlinedIcon onClick={() => setImgstring5('')} style={{ marginLeft: '80px', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
       </>
        :
        <>
        <SingleFile
         type='file' 
         name='image5' 
         id='image5'
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload5} />
        <PropertyImgLabel htmlFor='image5'>Pick image</PropertyImgLabel>
        </>
        }
        </PropertyImgContainer>
        <SpinnerContainer>
       {loading5 === true ? 
        <SpinnerDiv>
         <LinearProgress />
        </SpinnerDiv>
        : '' }
        </SpinnerContainer>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2}>
      <PropertyImgContainer>
       {imgstring6 ?
       <>
       <PropertyImage src={imgstring6} />
       <CloseOutlinedIcon onClick={() => setImgstring6('')} style={{ marginLeft: '80px', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
       </>
        :
        <>
        <SingleFile
         type='file' 
         name='image6' 
         id='image6'
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload6} />
        <PropertyImgLabel htmlFor='image6'>Pick image</PropertyImgLabel>
        </>
        }
        </PropertyImgContainer>
        <SpinnerContainer>
       {loading6 === true ? 
        <SpinnerDiv>
         <LinearProgress />
        </SpinnerDiv>
        : '' }
        </SpinnerContainer>
      </Grid>
       <Grid item xs={6} sm={4} md={3} lg={2}>
       <PropertyImgContainer>
       {imgstring7 ?
       <>
       <PropertyImage src={imgstring7} />
       <CloseOutlinedIcon onClick={() => setImgstring7('')} style={{ marginLeft: '80px', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
       </>
        :
        <>
        <SingleFile
         type='file' 
         name='image7' 
         id='image7'
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload7} />
        <PropertyImgLabel htmlFor='image7'>Pick image</PropertyImgLabel>
        </>
        }
        </PropertyImgContainer>
        <SpinnerContainer>
       {loading7 === true ? 
        <SpinnerDiv>
         <LinearProgress />
        </SpinnerDiv>
        : '' }
        </SpinnerContainer>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2}>
      <PropertyImgContainer>
       {imgstring8 ?
       <>
       <PropertyImage src={imgstring8} />
       <CloseOutlinedIcon onClick={() => setImgstring8('')} style={{ marginLeft: '80px', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
       </>
        :
        <>
        <SingleFile
         type='file' 
         name='image8' 
         id='image8'
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload8} />
        <PropertyImgLabel htmlFor='image8'>Pick image</PropertyImgLabel>
        </>
        }
        </PropertyImgContainer>
        <SpinnerContainer>
       {loading8 === true ? 
        <SpinnerDiv>
         <LinearProgress />
        </SpinnerDiv>
        : '' }
        </SpinnerContainer>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2}>
      <PropertyImgContainer>
       {imgstring9 ?
       <>
       <PropertyImage src={imgstring9} />
       <CloseOutlinedIcon onClick={() => setImgstring9('')} style={{ marginLeft: '80px', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
       </>
        :
        <>
        <SingleFile
         type='file' 
         name='image9' 
         id='image9'
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload9} />
        <PropertyImgLabel htmlFor='image9'>Pick image</PropertyImgLabel>
        </>
        }
        </PropertyImgContainer>
        <SpinnerContainer>
       {loading9 === true ? 
        <SpinnerDiv>
         <LinearProgress />
        </SpinnerDiv>
        : '' }
        </SpinnerContainer>
      </Grid>
       <Grid item xs={6} sm={4} md={3} lg={2}>
       <PropertyImgContainer>
       {imgstring10 ?
       <>
       <PropertyImage src={imgstring10} />
       <CloseOutlinedIcon onClick={() => setImgstring10('')} style={{ marginLeft: '80px', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
       </>
        :
        <>
        <SingleFile
         type='file' 
         name='image10' 
         id='image10'
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload10} />
        <PropertyImgLabel htmlFor='image10'>Pick image</PropertyImgLabel>
        </>
        }
        </PropertyImgContainer>
        <SpinnerContainer>
       {loading10 === true ? 
        <SpinnerDiv>
         <LinearProgress />
        </SpinnerDiv>
        : '' }
        </SpinnerContainer>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2}>
      <PropertyImgContainer>
       {imgstring11 ?
       <>
       <PropertyImage src={imgstring11} />
       <CloseOutlinedIcon onClick={() => setImgstring11('')} style={{ marginLeft: '80px', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
       </>
        :
        <>
        <SingleFile
         type='file' 
         name='image11' 
         id='image11'
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload11} />
        <PropertyImgLabel htmlFor='image11'>Pick image</PropertyImgLabel>
        </>
        }
        </PropertyImgContainer>
        <SpinnerContainer>
       {loading11 === true ? 
        <SpinnerDiv>
         <LinearProgress />
        </SpinnerDiv>
        : '' }
        </SpinnerContainer>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2}>
      <PropertyImgContainer>
       {imgstring12 ?
       <>
       <PropertyImage src={imgstring12} />
       <CloseOutlinedIcon onClick={() => setImgstring12('')} style={{ marginLeft: '80px', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
       </>
        :
        <>
        <SingleFile
         type='file' 
         name='image12' 
         id='image12'
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload12} />
        <PropertyImgLabel htmlFor='image12'>Pick image</PropertyImgLabel>
        </>
        }
        </PropertyImgContainer>
        <SpinnerContainer>
       {loading12 === true ? 
        <SpinnerDiv>
         <LinearProgress />
        </SpinnerDiv>
        : '' }
        </SpinnerContainer>
      </Grid>
       </Grid> 
      </FileContainer>
      {/* {errors.images &&  <ErrMessage>{'image is required'}</ErrMessage>} */}
      <ToastContainer />
    <ButtonContainer>
    <CloseButton type='button' onClick={handleBackButton}>Back</CloseButton>
    {/* <NextButton style={{marginRight: 15}} type='button' onClick={uploadImg}>Upload</NextButton> */}
    <NextButton type='submit' onClick={attachImg}>Continue</NextButton>
    </ButtonContainer>
     </Form> 
     </FormContainer>
     </Grid>
     </Grid>
    </StyledContainer>
   </StyledBox>
  )
}

export default Photos