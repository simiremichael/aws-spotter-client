import { useSelector } from 'react-redux'
import { selectCurrentCompany } from '../../services/features/companySlice';
import AdminRedirect from './AdminRedirect';


function AdminPrivateRoute({children}: {children: any}) {
  
    const {companyToken} = useSelector(selectCurrentCompany);
    
    return companyToken ? children : <AdminRedirect />
};

export default AdminPrivateRoute