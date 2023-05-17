export interface MortgageModel {
  id: string
  name: string 
  email: string 
  phone: string 
  mortgageType: string 
  stage: string 
  when: string  
  typeOfProperty: string  
  propertyStatus: string  
  propertyvalue: number 
  downPaymentPercent: number 
  downpayment: number | string 
  loanamount: number | string
  loanTermmonths: number
  monthlypayment: number | string 
  totalLoanpayable: number | string  
  chips: any[]
  }