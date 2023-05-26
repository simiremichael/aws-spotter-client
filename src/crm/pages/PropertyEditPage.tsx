import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams} from "react-router-dom";
import { useGetPropertyQuery, useUpdatePropertyMutation } from '../../services/api/propertyAPI';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Chip, TextField, Theme, useTheme } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import OutlinedInput from '@mui/material/OutlinedInput';
import { toast } from 'react-toastify';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentAgent } from '../../services/features/agentSlice';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";


const StyledBox = styled(Box)`
`
const StyledContainer = styled(Container)`
margin: 30px 0;
`
 const SingleFile = styled.input`
 margin-bottom: 10px;
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
 const VidContainer = styled.div`
  `
 const VideoUrl = styled(TextField)`
 `
 const TourUrl = styled(TextField)`
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
 const Form = styled.form`
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
const ErrMessage = styled.h5`
color: red;
`

 const parkings = [
  'Garage',
 'Indoor parking',
 'On-street-parking',
'Off-street-parking',
  'Parking lot',
  'Attached garage',
'Detached garage',
 'Valet parking',
  'Carport'
];
const securities = [
 'Alarm',
'Concierge',
'Video surveillance',
];
const comforts = [
  'Fire place',
  'Fitness room',
  'Furnished',
  'Unfurnished',
  'Home automation',
  'Home cinema',
  'Suna',
  'Walk-in-closet',
  'Wine cellar',
  'Wheelchair access',
  'EV charging',
  'No smaking',
  'Waterfront'
];
const hvacs = [
  'Air conditioning',
  'Centra heating',
  'Floor heating',
  'Geothermal heating',
  'Aerothermal heating',
  'Gas heating',
  'Electricity heating',
]
 function getStyles(name: string, parkings: readonly string[], theme: Theme) {
    return {
      fontWeight:
        parkings.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  function getSecurityStyles(name: string, securities: readonly string[], theme: Theme) {
    return {
      fontWeight:
        securities.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  
  function getComfortStyles(name: string, comforts: readonly string[], theme: Theme) {
    return {
      fontWeight:
        comforts.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  function getHvacStyles(name: string, hvacs: readonly string[], theme: Theme) {
    return {
      fontWeight:
        hvacs.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

function PropertyEditPage() {

    const theme = useTheme(); 
   
    const initialValue = {propertyTitle: '', id: '', description: '', uniqNo: '', bedroom: '', kitchen: '', livingRoom: '', 
  showerRoom: '', bathRoom: '', buildingYear: '', yearRenovated: '', lotSize: '', condition: '',pets: [], parking: [],
 hvac: [], comfort: [], security: [], address: '', address2: '', street: '', house: '', location: '', state: '', 
 postCode: '', lga: '', images: [], size: '', price: '', latitude: NaN, longitude: NaN, category: '', propertyTax: '', electricity: '', water: '', serviceCharge: '',
 utilities: '', taxes: '',video: '', imagename: '', tour: '',propertyType: '', creator: '', developer: '', propertyGroup: '', paymentType: ''}
 const [edit, setEdit] = useState(initialValue);  
 
 let navigate = useNavigate();
 const [pick1, setPick1] = useState(false);
 const [pick2, setPick2] = useState(false);
 const [pick3, setPick3] = useState(false);
 const [pick4, setPick4] = useState(false);
 const [pick5, setPick5] = useState(false);
 const [pick6, setPick6] = useState(false);
 const [pick7, setPick7] = useState(false);
 const [pick8, setPick8] = useState(false);
 const [pick9, setPick9] = useState(false);
 const [pick10, setPick10] = useState(false);
 const [pick11, setPick11] = useState(false);
 const [pick12, setPick12] = useState(false);
 
 let {ptId} = useParams();  
   const { data:  editData} = useGetPropertyQuery(ptId);  
   const [ updateProperty, {isSuccess}]= useUpdatePropertyMutation();  

   useEffect(() => {                 
     if(data) {
        {/* @ts-ignore:next-line */}
       setEdit({...editData, id: ptId});
     }
   }, [editData]);

     {/* @ts-ignore:next-line */}
const storedData = editData?.images?.map((ed: any) => ed)

console.log(storedData)

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
  const [imageName1, setImageName1] = useState('');
  const [imageName2, setImageName2] = useState('');
  const [imageName3, setImageName3] = useState('');
  const [imageName4, setImageName4] = useState('');
  const [imageName5, setImageName5] = useState('');
  const [imageName6, setImageName6] = useState('');
  const [imageName7, setImageName7] = useState('');
  const [imageName8, setImageName8] = useState('');
  const [imageName9, setImageName9] = useState('');
  const [imageName10, setImageName10] = useState('');
  const [imageName11, setImageName11] = useState('');
  const [imageName12, setImageName12] = useState('');
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
    
    const {agent} = useAppSelector(selectCurrentAgent);


    const handleUpload1 = async (e: any) => {
      setLoading1(true);
      const files = e.target.files
       const formData = new FormData();
       formData.append('picture', files[0]);
        {/* @ts-ignore:next-line */}
       formData.append('id', agent?.result?._id);
        {/* @ts-ignore:next-line */}
       formData.append('deleteimg', editData?.imagename[0].key);
       formData.append('edit', 'edit');
      await fetch('http://localhost:5000/api/properties/upload', {
       method: 'POST',
       body: formData,
     })
     .then(r => r.json())
     .then(data => {
     setImgstring1(data.url)
    setImageName1(data.imageName)
     if (data) {
       setLoading1(false);
       setPick1(false);
      }
     })
        }
      const handleUpload2 = async (e: any) => {
        setLoading2(true);
        const files = e.target.files
         const formData = new FormData();
         formData.append('picture', files[0]);
          {/* @ts-ignore:next-line */}
          formData.append('id', agent?.result?._id);
           {/* @ts-ignore:next-line */}
       formData.append('deleteimg', editData?.imagename[1].key);
       formData.append('edit', 'edit');
        await fetch('http://localhost:5000/api/properties/upload', {
         method: 'POST',
         body: formData,
       })
       .then(r => r.json())
       .then(data => {
       setImgstring2(data.url)
       setImageName2(data.imageName)
       if (data) {
         setLoading2(false);
         setPick2(false);
        }
       })
          }
    const handleUpload3 = async (e: any) => {
      setLoading3(true);
      const files = e.target.files
       const formData = new FormData();
       formData.append('picture', files[0]);
        {/* @ts-ignore:next-line */}
        formData.append('id', agent?.result?._id);
         {/* @ts-ignore:next-line */}
       formData.append('deleteimg', editData?.imagename[2].key);
       formData.append('edit', 'edit');
      await fetch('http://localhost:5000/api/properties/upload', {
       method: 'POST',
       body: formData,
     })
     .then(r => r.json())
     .then(data => {
     setImgstring3(data.url)
     setImageName3(data.imageName)
    if (data) {
       setLoading3(false);
       setPick3(false);
      }
     })
        }
    const handleUpload4 = async (e: any) => {
      setLoading4(true);
      const files = e.target.files
       const formData = new FormData();
       formData.append('picture', files[0]);
        {/* @ts-ignore:next-line */}
        formData.append('id', agent?.result?._id);
         {/* @ts-ignore:next-line */}
       formData.append('deleteimg', editData?.imagename[3].key);
       formData.append('edit', 'edit');
      await fetch('http://localhost:5000/api/properties/upload', {
       method: 'POST',
       body: formData,
     })
     .then(r => r.json())
     .then(data => {
     setImgstring4(data.url)
     setImageName4(data.imageName)
     if (data) {
       setLoading4(false);
       setPick4(false);
      }
     })
        }
    const handleUpload5 = async (e: any) => {
      setLoading5(true);
      const files = e.target.files
       const formData = new FormData();
       formData.append('picture', files[0]);
        {/* @ts-ignore:next-line */}
        formData.append('id', agent?.result?._id);
         {/* @ts-ignore:next-line */}
       formData.append('deleteimg', editData?.imagename[4].key);
       formData.append('edit', 'edit');
      await fetch('http://localhost:5000/api/properties/upload', {
       method: 'POST',
       body: formData,
     })
     .then(r => r.json())
     .then(data => {
     setImgstring5(data.url)
     setImageName5(data.imageName)
      if (data) {
       setLoading5(false);
       setPick5(false);
      }
     })
        }
    const handleUpload6 = async (e: any) => {
      setLoading6(true);
      const files = e.target.files
       const formData = new FormData();
       formData.append('picture', files[0]);
        {/* @ts-ignore:next-line */}
        formData.append('id', agent?.result?._id);
         {/* @ts-ignore:next-line */}
       formData.append('deleteimg', editData?.imagename[5].key);
      await fetch('http://localhost:5000/api/properties/upload', {
       method: 'POST',
       body: formData,
     })
     .then(r => r.json())
     .then(data => {
     setImgstring6(data.url)
     setImageName6(data.imageName)
     if (data) {
       setLoading6(false);
       setPick6(false);
      }
     })
        }
    const handleUpload7 = async (e: any) => {
      setLoading7(true);
      const files = e.target.files
       const formData = new FormData();
       formData.append('picture', files[0]);
        {/* @ts-ignore:next-line */}
        formData.append('id', agent?.result?._id);
         {/* @ts-ignore:next-line */}
       formData.append('deleteimg', editData?.imagename[6].key);
       formData.append('edit', 'edit');
      await fetch('http://localhost:5000/api/properties/upload', {
       method: 'POST',
       body: formData,
     })
     .then(r => r.json())
     .then(data => {
     setImgstring7(data.url)
     setImageName7(data.imageName)
     if (data) {
       setLoading7(false);
       setPick7(false);
      }
     })
        }
    const handleUpload8 = async (e: any) => {
      setLoading8(true);
      const files = e.target.files
       const formData = new FormData();
       formData.append('picture', files[0]);
        {/* @ts-ignore:next-line */}
        formData.append('id', agent?.result?._id)
         {/* @ts-ignore:next-line */}
       formData.append('deleteimg', editData?.imagename[7].key);
       formData.append('edit', 'edit');
      await fetch('http://localhost:5000/api/properties/upload', {
       method: 'POST',
       body: formData,
     })
     .then(r => r.json())
     .then(data => {
     setImgstring8(data.url)
     setImageName8(data.imageName)
     if (data) {
       setLoading8(false);
       setPick8(false);
      }
     })
        }
    const handleUpload9 = async (e: any) => {
      setLoading9(true);
      const files = e.target.files
       const formData = new FormData();
       formData.append('picture', files[0]);
        {/* @ts-ignore:next-line */}
        formData.append('id', agent?.result?._id);
         {/* @ts-ignore:next-line */}
       formData.append('deleteimg', editData?.imagename[8].key);
       formData.append('edit', 'edit');
      await fetch('http://localhost:5000/api/properties/upload', {
       method: 'POST',
       body: formData,
     })
     .then(r => r.json())
     .then(data => {
     setImgstring9(data.url)
     setImageName9(data.imageName)
     if (data) {
       setLoading9(false);
       setPick9(false);
      }
     })
        }
    const handleUpload10 = async (e: any) => {
      setLoading10(true);
      const files = e.target.files
       const formData = new FormData();
       formData.append('picture', files[0]);
        {/* @ts-ignore:next-line */}
        formData.append('id', agent?.result?._id);
         {/* @ts-ignore:next-line */}
       formData.append('deleteimg', editData?.imagename[9].key);
       formData.append('edit', 'edit');
      await fetch('http://localhost:5000/api/properties/upload', {
       method: 'POST',
       body: formData,
     })
     .then(r => r.json())
     .then(data => {
     setImgstring10(data.url)
     setImageName10(data.imageName)
     if (data) {
       setLoading10(false);
       setPick10(false);
      }
     })
        }
    const handleUpload11 = async (e: any) => {
      setLoading11(true);
      const files = e.target.files
       const formData = new FormData();
       formData.append('picture', files[0]);
        {/* @ts-ignore:next-line */}
        formData.append('id', agent?.result?._id);
         {/* @ts-ignore:next-line */}
       formData.append('deleteimg', editData?.imagename[10].key);
       formData.append('edit', 'edit');
      await fetch('http://localhost:5000/api/properties/upload', {
       method: 'POST',
       body: formData,
     })
     .then(r => r.json())
     .then(data => {
     setImgstring11(data.url)
     setImageName11(data.imageName)
     if (data) {
       setLoading11(false);
       setPick11(false);
      }
     })
        }
    
    const handleUpload12 = async (e: any) => {
      setLoading12(true);
      const files = e.target.files
       const formData = new FormData();
       formData.append('picture', files[0]);
        {/* @ts-ignore:next-line */}
        formData.append('id', agent?.result?._id);
         {/* @ts-ignore:next-line */}
       formData.append('deleteimg', editData?.imagename[11].key);
       formData.append('edit', 'edit');
      await fetch('http://localhost:5000/api/properties/upload', {
       method: 'POST',
       body: formData,
     })
     .then(r => r.json())
     .then(data => {
     setImgstring12(data.url)
     setImageName12(data.imageName)
     if (data) {
       setLoading12(false);
       setPick12(false);
      }
     })
        }

  const [parking, setParking] = useState<string[]>([]);
//SelectChangeEvent<typeof parking>
  const handlePakingChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setParking(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setEdit({...edit, parking: e.target.value})
    
  };
  const [security, setSecurity] = useState<string[]>([]);
// SelectChangeEvent<typeof security>
  const handleSecurityChange = (e: any ) => {
    const {
      target: { value },
    } = e;
    setSecurity(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setEdit({...edit, security: e.target.value})
  };

  const [comfort, setComfort] = useState<string[]>([]);

  const handleComfortChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setComfort(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setEdit({...edit, comfort: e.target.value})
  };

  const [hvac, setHvac] = useState<string[]>([]);

  const handleHvacChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setHvac(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setEdit({...edit, hvac: e.target.value})
  };
  
  const attachImg = () => {
 
     {/* @ts-ignore:next-line */}
     const imagearray = []
      {/* @ts-ignore:next-line */}
     const imageName = []
  // imgarray.push({ img:imgstring1}, {img:imgstring2}, {img:imgstring3}, {img:imgstring4}, {img:imgstring5}, {img: imgstring6}, {img:imgstring7}, {img:imgstring8}, {img:imgstring9}, {img:imgstring10}, {img:imgstring11}, {img:imgstring12});
   const pushImageArray = (image: any) => {    
     if (image.img !== '') {
      imagearray.push(image)
     }
   };
   
    const pushToImageArray = (url: any) => {
      if (url.key !== '') {
        imageName.push(url)
      }
    };
  
    // Call pushToImageArray with each image URL
    pushToImageArray({ key: imageName1});
    pushToImageArray({ key: imageName2});
    pushToImageArray({ key: imageName3});
    pushToImageArray({ key: imageName4});
    pushToImageArray({ key: imageName5});
    pushToImageArray({ key: imageName6});
    pushToImageArray({ key: imageName7});
    pushToImageArray({ key: imageName8});
    pushToImageArray({ key: imageName9});
    pushToImageArray({ key: imageName10});
    pushToImageArray({ key: imageName11});
    pushToImageArray({ key: imageName12});

 pushImageArray({ img:imgstring1});
  pushImageArray({ img:imgstring2});
  pushImageArray({ img:imgstring3});
  pushImageArray({ img:imgstring4});
  pushImageArray({ img:imgstring5});
  pushImageArray({ img:imgstring6});
  pushImageArray({ img:imgstring7});
  pushImageArray({ img:imgstring8});
  pushImageArray({ img:imgstring9});
  pushImageArray({ img:imgstring10});
  pushImageArray({ img:imgstring11});
  pushImageArray({ img:imgstring12});
  
   if (imgstring1 !== '') {
    {/* @ts-ignore:next-line */} 
  setEdit({...edit, imagename: imageName, images: imagearray});  
   }
  }

//   const attachImg = () => {
//     const imgarray = [];
    
//     imgarray.push({ img:imgstring1 ? imgstring1 : edit.images[0]}, {img: imgstring2 ? imgstring2 : edit.images[1]}, {img:imgstring3 ? imgstring3 : edit.images[2]}, {img:imgstring4 ? imgstring4 : edit.images[3]}, {img:imgstring5 ? imgstring5 : edit.images[4]}, {img: imgstring6 ? imgstring6 : edit.images[5]}, {img:imgstring7 ? imgstring7 : edit.images[6]}, {img:imgstring8 ? imgstring8 : edit.images[7]}, {img:imgstring9 ? imgstring9 : edit.images[8]}, {img:imgstring10 ? imgstring10 : edit.images[9]}, {img:imgstring11 ? imgstring11 : edit.images[10]}, {img:imgstring12 ? imgstring12 : edit.images[11]});
//     //const slideArray = new Array([imgstring1, imgstring2, imgstring3, imgstring4, imgstring5, imgstring6, imgstring7, imgstring8, imgstring9, imgstring10, imgstring11, imgstring12])
//     {/* @ts-ignore:next-line */} 
//     const namearray = [];
//     if ( imageName1) {
//       namearray.push( { key: imageName1})
//     } else if(imageName2) {
//       namearray.push( { key: imageName2})
//     }else if(imageName3) {
//     namearray.push( { key: imageName3})
//   } else if(imageName4) {
//     namearray.push( { key: imageName4})
//   }else if(imageName5) {
//   namearray.push( { key: imageName5})
// }else if(imageName6) {
//   namearray.push( { key: imageName6})
// }else if(imageName7) {
// namearray.push( { key: imageName7})
// } else if(imageName8) {
// namearray.push( { key: imageName8})
// }else if(imageName9) {
// namearray.push( { key: imageName9})
// }else if(imageName10) {
//   namearray.push( { key: imageName10})
//   } else if(imageName11) {
//   namearray.push( { key: imageName11})
//   }else if(imageName12) {
//   namearray.push( { key: imageName12})
//   }
//     //namearray.push( imageName1? { key: imageName1} : null, imageName2? {key: imageName2} : null, imageName3 ? {key: imageName3} : null, imageName4 ? {key: imageName4} : null, imageName5 ? {key: imageName5} : null, imageName6 ? {key: imageName6} : null, imageName7 ? {key: imageName7} : null, imageName8 ? {key: imageName8} : null, imageName9 ? {key: imageName9} : null, imageName10 ? {key: imageName10} : null, imageName11 ? {key: imageName11} : null, imageName12 ? {key: imageName12} : null);
//    {/* @ts-ignore:next-line */} 
//     setEdit({...edit, images: imgarray});
//      {/* @ts-ignore:next-line */} 
//     setEdit({...edit, imagename: namearray});  
//   }
  

const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setEdit(values => ({...values, [name]: value}))
 }

 const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      if(editData) {
        {/* @ts-ignore:next-line */}
        await updateProperty({...edit}).unwrap();
      }
    } catch (error) {
      console.error('rejected', error);
    }
  };

  useEffect(() => {
    if(isSuccess) { 
      navigate('/agentproperties')
   toast.success('Updated successfully....')
   setEdit(initialValue)
    }
}, [isSuccess]);

const {
  ready,
  value,
  suggestions: { status, data },
  setValue,
  clearSuggestions,
} = usePlacesAutocomplete({
  requestOptions: {
    /* Define search scope here */
  },
  debounce: 300,
});


const handleInput = (e: any) => {
  // Update the keyword of the input element
  setValue(e.target.value);
  // setProperty({...property, address: e.target.value})
};

const ref = useOnclickOutside(() => {
  // When user clicks outside of the component, we can dismiss
  // the searched suggestions by calling this method
  getGeocode({ address: edit.address }).then((results) => {
    const { lat, lng } = getLatLng(results[0]);
    console.log("📍 Coordinates: ", { lat, lng });
    setEdit({...edit, latitude: lat, longitude: lng})
  });
  
  clearSuggestions();
});

console.log(editData?.images, editData?.imagename)
const handleSelect =
  ({ description }: any) =>
  () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      console.log("📍 Coordinates: ", { lat, lng });
      setEdit({...edit, latitude: lat, longitude: lng})
    });
  };

  useEffect(() => {
    setEdit({...edit, address: value})
  },[value, edit.address])

const renderSuggestions = () =>
  data.map((suggestion) => {
    const {
      place_id,
      structured_formatting: { main_text, secondary_text },
    } = suggestion;

    return (
      <li key={place_id} onClick={handleSelect(suggestion)}>
        <strong>{main_text}</strong> <small>{secondary_text}</small>
      </li>
    );
  });

  return (
    <StyledBox>
        <StyledContainer >
            <Form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item lg={2} md={2} sm={6} xs={6}>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">PROPERTY GROUP</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name= 'propertyGroup'
          value={edit.propertyGroup}
          label="PROPERTY GROUP"
          onChange={handleChange}
          size="small"
        >
          <MenuItem value='Residential'>Residential</MenuItem>
          <MenuItem value='Commercial'>Commercial</MenuItem>
          <MenuItem value='Land'>Land</MenuItem>
          <MenuItem value='New Projects'>New Projects</MenuItem>
          <MenuItem value='Offplan'>Offplan</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item lg={2} md={2} sm={6} xs={6}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">PROPERTY TYPE</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='propertyType'
          value={edit.propertyType}
          label="PROPERTY TYPE"
          onChange={handleChange}
          size="small"
        >
          <MenuItem value='apartment'>Apartment</MenuItem>
          <MenuItem value='flat'>Flat</MenuItem>
          <MenuItem value='office'>Office</MenuItem>
          <MenuItem value='terraced'>Terraced</MenuItem>
          <MenuItem value='detatched'>Detached</MenuItem>
          <MenuItem value='semi detached'>Semi detached</MenuItem>
          <MenuItem value='full floor'>Full floor</MenuItem>
          <MenuItem value='hotel appartment'>Hotel appartment</MenuItem>
          <MenuItem value='bungalow'>Bungalow</MenuItem>
          <MenuItem value='room'>Room</MenuItem>
          <MenuItem value='mini flat'>Mini flat</MenuItem>
          <MenuItem value='self contain'>Self contain</MenuItem>
          <MenuItem value='shop'>Shop</MenuItem>
          <MenuItem value='warehouse'>Warehouse</MenuItem>
          <MenuItem value='land'>Land</MenuItem>                  
          <MenuItem value='farm'>Farm</MenuItem>
          <MenuItem value='others'>Other</MenuItem>
        </Select>
      </FormControl>
            </Grid>                
            <Grid item lg={2} md={4} sm={8} xs={12}>
            <div ref={ref}>
            <TextField variant='outlined' autoComplete='address' 
            label='ADDRESS LINE' type='text'  
            name='address' 
            value={value} 
            onChange={handleInput} 
            fullWidth size='small' />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
           </Grid>
            {/* <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextField variant='outlined' label='ADDRESS LINE 2' type='text'  name='address2' value={edit.address2} onChange={handleChange} fullWidth size='small' />
            </Grid> */}
            <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextField fullWidth size='small' variant='outlined' label='STREET' type='text'  name='street' value={edit.street} onChange={handleChange} />
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextField variant='outlined' label='HOUSE NUMBER' type='number'  name='house' value={edit.house} onChange={handleChange} fullWidth size='small' />
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextField variant='outlined' label='LOCATION' type='text'  name='location' value={edit.location} onChange={handleChange} fullWidth size='small' />
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextField variant='outlined' label='POST CODE' type='number'  name='postCode' value={edit.postCode} onChange={handleChange} fullWidth size='small' />
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextField  fullWidth size='small' variant='outlined' label='LGA' type='text'  name='lga' value={edit.lga} onChange={handleChange} />
            </Grid>
            <Grid item lg={2} md={1.5} sm={4} xs={6}>
            <TextField  fullWidth size='small' variant='outlined' label='STATE' type='text'  name='state' value={edit.state} onChange={handleChange} />
            </Grid>
            <Grid item lg={2} md={1.5} sm={4} xs={6}>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='category'
          value={edit.category}
          label="Category"
          onChange={handleChange}
          size="small"
        >
          <MenuItem value='sale'>For sale</MenuItem>
          <MenuItem value='rent'>For rent</MenuItem>
        </Select>
      </FormControl>
           </Grid>
           <Grid item lg={2} md={1.5} sm={4} xs={6}>
            <FormControl fullWidth sx={{ textAlign: 'start'}}>
        <InputLabel id="demo-simple-select-label">Condition</InputLabel>
       <Select 
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label='condition'
     name='condition'
     size='small'
     value={edit.condition}
     onChange={(e: any) => {setEdit({...edit, condition: e.target.value})}}
     >
      <MenuItem  value='new'>New</MenuItem>
      <MenuItem  value='mint'>Mint</MenuItem>
      <MenuItem  value='good'>Good</MenuItem>
      <MenuItem  value='fair'>Fair</MenuItem>
      <MenuItem  value='poor'>Poor</MenuItem>
     </Select>
     </FormControl>
            </Grid>
            <Grid item lg={2} md={1.5} sm={4} xs={6}>
            <TextField  fullWidth size='small' variant='outlined' label='SIZE' type='number'  name='size' value={edit.size} onChange={handleChange} />
            </Grid>
            <Grid item lg={1.8} md={2} sm={4} xs={6}>
            <TextField  fullWidth size='small' variant='outlined' label='PRICE' type='number'  name='price' value={edit.price} onChange={handleChange} />
            </Grid>
            <Grid item lg={1.8} md={2} sm={3} xs={6}>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Payment Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='paymentType'
          value={edit.paymentType}
          label="PaymentType"
          onChange={handleChange}
          size="small"
        >
          <MenuItem value='Total price'>Total price</MenuItem>
          <MenuItem value='Price per square meter'>Price per square meter</MenuItem>
          <MenuItem value='Yearly price'>Yearly price</MenuItem>
          <MenuItem value='Monthly price'>Monthly price</MenuItem>
          <MenuItem value='Weekly price'>Weekly price</MenuItem>
          <MenuItem value='Daily price'>Daily price</MenuItem>
        </Select>
      </FormControl>
            </Grid>
            <Grid item lg={1.8} md={2} sm={3} xs={6}>
            <TextField  fullWidth size='small' variant='outlined' label='DEVELOPER' type='text'  name='developer' value={edit.developer} onChange={handleChange} />
            </Grid>
            <Grid item lg={2.6} md={2} sm={6} xs={12}>
            <TextField variant='outlined' fullWidth label='PROPERTY TITLE' type='text' name='propertyTitle' value={edit.propertyTitle} onChange={handleChange} size='small' />
            </Grid>
            <Grid item lg={4} md={4} sm={8} xs={12}>
            <TextField fullWidth multiline minRows={1} placeholder='Description....'  name='description' value={edit.description} onChange={handleChange} />
            </Grid>
           
    <Grid item lg={4} md={4} sm={4} xs={6}>
    <VidContainer>
    <VideoUrl variant='outlined' label='LINK TO VIDEO' type='url'  name='video' value={edit.video} onChange={handleChange} size='small' fullWidth />
    </VidContainer>
    </Grid>
            <Grid item lg={4} md={4} sm={4} xs={6}>
            <VidContainer>
      <TourUrl variant='outlined' label='LINK TO 3D TOURS' type='url'  name='tour' value={edit.tour} onChange={handleChange} size='small' fullWidth />
      </VidContainer>
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextField variant='outlined' label='UNIQ NO' type='number'  name='uniqNo' value={edit.uniqNo} onChange={handleChange} size='small' fullWidth />
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextField variant='outlined' label='BEDROOMS' type='number' name='bedroom' value={edit.bedroom} onChange={handleChange} size='small' fullWidth />
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextField variant='outlined' label='KITCHENS' type='number' name='kitchen' value={edit.kitchen} onChange={handleChange}  size='small' fullWidth />
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextField variant='outlined' label='LIVING ROOMS' type='number' name='livingRoom' value={edit.livingRoom} onChange={handleChange} size='small' fullWidth />
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextField variant='outlined' label='BATHROOMS' type='number'  name='bathRoom' value={edit.bathRoom} onChange={handleChange} size='small' fullWidth />
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextField variant='outlined' label='BUILDING YEAR' type='number'  name='buildingYear' value={edit.buildingYear} onChange={handleChange}  size='small' fullWidth />
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextField variant='outlined' label='YEAR RENOVATED' type='number'  name='yearRenovated' value={edit.yearRenovated} onChange={handleChange} size='small' fullWidth />
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={6}>
            <FormControl fullWidth sx={{ textAlign: 'start'}}>
        <InputLabel id="demo-simple-select-label">Pets</InputLabel>
        <Select 
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label='Pet'
     name='pets'
     size='small'
     value={edit.pets}
     onChange={(e: any) => {setEdit({...edit, pets:e.target.value})}}
     >
      <MenuItem  value='pets allowed'>Pets allowed</MenuItem>
      <MenuItem  value='no pets allowed'>No pets allowed</MenuItem>
      <MenuItem  value='cats allowed'>Cats allowed</MenuItem>
      <MenuItem  value='dogs allowed'>Dogs allowed</MenuItem>
     </Select>
     </FormControl>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
            <FormControl sx={{  width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Comfort</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          size='small'
          value={edit.comfort}
          name='comfort'
          onChange={handleComfortChange}
          input={<OutlinedInput id="select-multiple-chip" label="Comfort" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
              {selected.map((value: any) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {comforts.map((name: any) => (
            <MenuItem
              key={name}
              value={name}
              style={getComfortStyles(name, comfort, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
            <FormControl sx={{  width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">HVAC</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          size='small'
          value={edit.hvac} 
          name='hvac'
          onChange={handleHvacChange}
          input={<OutlinedInput id="select-multiple-chip" label="Hvac" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
              {selected.map((value: any) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {hvacs.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getHvacStyles(name, hvac, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
            <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Security</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          size='small'
          value={edit.security}
          name='security'
          onChange={handleSecurityChange}
          input={<OutlinedInput id="select-multiple-chip" label="Security" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
              {selected.map((value: any) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {securities.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getSecurityStyles(name, security, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            </Grid>
            
            <Grid item lg={3} md={3} sm={3} xs={6}>
            <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Parking</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          size='small'
          value={edit.parking}

          name='parking'
          onChange={handlePakingChange}
          input={<OutlinedInput id="select-multiple-chip" label="Parking" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: any) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {parkings.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, parking, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            </Grid>
            </Grid> 
            <Grid container spacing={2} style={{marginTop: '5px'}}>
            <Grid item xs={6} sm={4} md={3} lg={2}>
            <PropertyImgContainer>
            {pick1 === false &&
        <>
       {imgstring1 ?
       <>
       <PropertyImage src={ imgstring1} />
       <CloseOutlinedIcon onClick={() => setPick1(true)} style={{ marginLeft: '10%', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
       
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
        </> }
        {pick1 === true  &&
        <>
        <SingleFile
         type='file' 
         name='image1' 
         id='image1'
         required
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload1} />
        <PropertyImgLabel htmlFor='image1'>Pick image</PropertyImgLabel>
        </>  }
        </PropertyImgContainer>
        <SpinnerContainer>
       {loading1 === true ? 
        <SpinnerDiv>
         <LinearProgress />
        </SpinnerDiv>
        : '' }
        </SpinnerContainer>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2}>
      <PropertyImgContainer>
      {pick2 === false &&
        <>
       {imgstring2  ?
       <>
       <PropertyImage src={imgstring2 } />
       <CloseOutlinedIcon onClick={() => setPick2(true)} style={{ marginLeft: '10%', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
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
           </> }
           {pick2 === true  &&
        <>
        <SingleFile
         type='file' 
         name='image2' 
         id='image2'
         required
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload2} />
        <PropertyImgLabel htmlFor='image2'>Pick image</PropertyImgLabel>
        </> }
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
      {pick3 === false &&
        <>
       {imgstring3  ?
       <>
       <PropertyImage src={imgstring3 } />
       <CloseOutlinedIcon onClick={() => setPick3(true)} style={{ marginLeft: '10%', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
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
                </> }
                {pick3 === true  &&
        <>
        <SingleFile
         type='file' 
         name='image3' 
         id='image3'
         required
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload3} />
        <PropertyImgLabel htmlFor='image3'>Pick image</PropertyImgLabel>
        </> }
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
       {pick4 === false &&
        <>
       {imgstring4 ?
       <>
       <PropertyImage src={imgstring4 } />
       <CloseOutlinedIcon onClick={() => setPick4(true)} style={{ marginLeft: '10%', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
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
              </> }
              {pick4 === true   &&
        <>
        <SingleFile
         type='file' 
         name='image4' 
         id='image4'
         required
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload4} />
        <PropertyImgLabel htmlFor='image4'>Pick image</PropertyImgLabel>
        </>  }
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
    {pick5 === false &&
        <>
       {imgstring5 ?
       <>
       <PropertyImage src={imgstring5} />
       <CloseOutlinedIcon onClick={() => setPick5(true)} style={{ marginLeft: '10%', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />

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
              </> }
              {pick5 === true  &&
        <>
        <SingleFile
         type='file' 
         name='image5' 
         id='image5'
         required
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload5} />
        <PropertyImgLabel htmlFor='image5'>Pick image</PropertyImgLabel>
        </>  }
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
       {pick6 === false &&
        <>
       {imgstring6  ?
       <>
       <PropertyImage src={imgstring6 } />
       <CloseOutlinedIcon onClick={() => setPick6(true)} style={{ marginLeft: '10%', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />

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
               </> }
               {pick6 === true  &&
        <>
        <SingleFile
         type='file' 
         name='image6' 
         id='image6'
         required
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload6} />
        <PropertyImgLabel htmlFor='image6'>Pick image</PropertyImgLabel>
        </> }
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
    {pick7 === false &&
        <>
       {imgstring7 ?
       <>
       <PropertyImage src={imgstring7 } />
       <CloseOutlinedIcon onClick={() => setPick7(true)} style={{ marginLeft: '10%', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />

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
              </> }
        {pick7 === true  &&
        <>
        <SingleFile
         type='file' 
         name='image7' 
         id='image7'
         required
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload7} />
        <PropertyImgLabel htmlFor='image7'>Pick image</PropertyImgLabel>
        </> }
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
       {pick8 === false &&
        <>
       {imgstring8  ?
       <>
       <PropertyImage src={imgstring8 } />
       <CloseOutlinedIcon onClick={() => setPick8(true)} style={{ marginLeft: '10%', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
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
        </> }
        {pick8 === true  &&
        <>
        <SingleFile
         type='file' 
         name='image8' 
         id='image8'
         required
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload8} />
        <PropertyImgLabel htmlFor='image8'>Pick image</PropertyImgLabel>
        </> }
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
      
    {pick9 === false &&
        <>
       {imgstring9 ?
       <>
       <PropertyImage src={imgstring9 } />
       <CloseOutlinedIcon onClick={() => setPick9(true)} style={{ marginLeft: '10%', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />

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
               </> }
               {pick9 === true  &&
        <>
        <SingleFile
         type='file' 
         name='image9' 
         id='image9'
         required
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload9} />
        <PropertyImgLabel htmlFor='image9'>Pick image</PropertyImgLabel>
        </> }
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
       {pick10 === false &&
        <>
       {imgstring10 ?
       <>
       <PropertyImage src={imgstring10} />
       <CloseOutlinedIcon onClick={() => setPick10(true)} style={{ marginLeft: '10%', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
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
               </> }
        {pick10 === true  &&
        <>
        <SingleFile
         type='file' 
         name='image10' 
         id='image10'
         required
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload10} />
        <PropertyImgLabel htmlFor='image10'>Pick image</PropertyImgLabel>
        </> }
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
    {pick11 === false &&
        <>
       {imgstring11  ?
       <>
       <PropertyImage src={imgstring11 } />
       <CloseOutlinedIcon onClick={() => setPick11(true)} style={{ marginLeft: '10%', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
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
        </> }
        {pick11 === true  &&
        <>
        <SingleFile
         type='file' 
         name='image11' 
         id='image11'
         required
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload11} />
        <PropertyImgLabel htmlFor='image11'>Pick image</PropertyImgLabel>
        </> }
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
        {pick12 === false &&
         <>
       {imgstring12  ?
       <>
       <PropertyImage src={ imgstring12 } />
       <CloseOutlinedIcon onClick={() => setPick12(true)} style={{ marginLeft: '10%', cursor: 'pointer', marginTop: '-80px' ,zIndex: 10, position: 'absolute', background: 'black', color: 'white', fontSize: '15px'}} />
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
        </> }
        {pick12 === true  && 
        <>
        <SingleFile
         type='file' 
         name='image12' 
         id='image12'
         required
          accept='image/png, image/jpg, image/jpeg, image/webp' 
        onChange={handleUpload12} />
        <PropertyImgLabel htmlFor='image12'>Pick image</PropertyImgLabel>
         </>}
        </PropertyImgContainer>
        <SpinnerContainer>
       {loading12 === true ? 
        <SpinnerDiv>
         <LinearProgress />
        </SpinnerDiv>
        : '' }
        </SpinnerContainer>
      </Grid> 
      { edit.images.length !== 12 ? <ErrMessage>{'Please note all images must be replaced if you want to update your image'}</ErrMessage> : ''}                                           
    <Grid item lg={3} md={4} sm={4} xs={12}>
    <NextButton type='submit' onClick={attachImg} style={{marginRight: 10}}>Update</NextButton>
    {/* <NextButton type='submit'>Update</NextButton> */}
    </Grid>
        </Grid>
        </Form>
        </StyledContainer>
    </StyledBox>
  )
}

export default PropertyEditPage