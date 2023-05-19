import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from '../../app/store';
  import { setAgents, logout } from '../features/agentSlice';
import { setUsers, logoutUsers } from '../features/userSlice';
import { setCompanies, companyLogout } from '../features/companySlice';

const baseQuery = fetchBaseQuery({
  baseUrl:'http://13.245.161.92/api', 
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const agentToken = ( getState() as RootState).agentState.agentToken
    const companyToken = ( getState() as RootState).companyState.companyToken
    const token = ( getState() as RootState).userState.token
   // console.log('states: ', agentToken);
    //console.log('states: ', companyToken);
    //console.log('states: ', token);
  
    if (agentToken) {
      headers.set('authorization', `Bearer ${agentToken}`);
    } else if (companyToken) {
      headers.set('comAuthorization', `Bearer ${companyToken}`);
    } else {
      headers.set('userAuthorization', `Bearer ${token}`);
    }                   
      return headers;
}
})
// BaseQueryFn< string | FetchArgs, unknown, FetchBaseQueryError>
   const customFetchBase = async (args: any, api: any, extraOptions: any) => {
   
    let result = await baseQuery(args, api, extraOptions);
    //console.log(result);
    // If you want, handle other status codes, too
    //result?.error?.status === 403
   // !result?.data?.token 
    {/* @ts-ignore:next-line */}
    if (result?.error?.status === 403) {
        //console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/users/refresh', api, extraOptions)
        // console.log(refreshResult)
        if (refreshResult?.data) {
       const user = ( api.getState() as RootState).userState.user
            // store the new token 
             // console.log(user)
              {/* @ts-ignore:next-line */}
            api.dispatch(setUsers({ token: refreshResult?.data?.token, user }))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
      //       if (refreshResult?.error?.status === 403) {
      //           // refreshResult.error.data.message = "Your login has expired. "
      //       }
      //       return refreshResult
      // }
        api.dispatch(logoutUsers())
        }
    };

    
{/* @ts-ignore:next-line */}
    if (result?.error?.status === 403) {
     // console.log('sending company refresh token')

      // send refresh token to get new access token 
      const companyRefreshResult = await baseQuery('/companies/refresh', api, extraOptions)
      //console.log(companyRefreshResult)
      if (companyRefreshResult?.data) {
     const company = ( api.getState() as RootState).companyState.company
          // store the new token 
           //console.log(company)
            {/* @ts-ignore:next-line */}
          api.dispatch(setCompanies({ companyToken: companyRefreshResult?.data?.companyToken, company}))

          // retry original query with new access token
          result = await baseQuery(args, api, extraOptions)
      } else {
         api.dispatch(companyLogout())

          // if (companyRefreshResult?.error?.status === 403) {
          //  // agentRefreshResult?.error?.data?.message = "Your login has expired. "
          // }
          // return companyRefreshResult
    }
  };

  {/* @ts-ignore:next-line */}
  if (result?.error?.status === 403) {
    //console.log('sending agent refresh token')

    // send refresh token to get new access token 
    const agentRefreshResult = await baseQuery('/agents/refresh', api, extraOptions)
    //console.log(agentRefreshResult)
    if (agentRefreshResult?.data) {
   const agent = ( api.getState() as RootState).agentState.agent
        // store the new token 
         // console.log(agent)
          {/* @ts-ignore:next-line */}
        api.dispatch(setAgents({ agentToken: agentRefreshResult?.data?.agentToken, agent }))

        // retry original query with new access token
        result = await baseQuery(args, api, extraOptions)
    } else {
         api.dispatch(logout())
        // if (agentRefreshResult?.error?.status === 403) {
        //  // agentRefreshResult?.error?.data?.message = "Your login has expired. "
        // }
        // return agentRefreshResult
  }
}
 
  return result;

  };
  
  export default customFetchBase;