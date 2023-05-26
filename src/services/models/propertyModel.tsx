import { StringDecoder } from "string_decoder"

export interface PropertyModel {
  id: number | string
  category: string
  title: string
  address1: string
  address2: string
  bedroom: number
  creator:  string
  bathroom: number
  location: string
  description: string
  electricity: number
  images: [] | string
  kitchen: number
  price: number
  size: number
  state: string
  street: string
  taxes: string
  tour: string
  ultilities:[]
  video: string
  comfort: []
  condition: string
  slideImages: []
  hvac: []
  parking: []
  pets: []
  security: []
  createdAt: string
  propertyTitle: string
   uniqNo: string | string
   livingRoom: string | string
  showerRoom: string | string
   bathRoom: string 
   buildingYear: string | string
   yearRenovated: string | string
   lotSize: string | string
   house: string | string
 postCode: string 
 lga: string
 propertyTax: string
 water: string
 serviceCharge: string
 utilities: string
 propertyType: string
 propertyGroup: string
 paymentType: string
 agentProperty: string | {} | []
 _id: string
 name: string
 companyName: string
 profilePicture: string
 longitude: number 
 latitude: number 
 phone: string
 logo: string
 email: string
 property: {}
 data: {}
 result: {} | string
 imagename: [] | {}
}