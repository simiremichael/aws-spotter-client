import {  createApi } from '@reduxjs/toolkit/query/react'
import { AgentModel } from '../models/agentModel';
import { UserModel } from '../models/userModel';
import { CompanyModel } from '../models/companyModel';
import { PropertyModel } from '../models/propertyModel';
import { MortgageModel } from '../models/mortgageModel';
import { EventModel } from '../models/eventModel';
import customFetchBase from './custormFetchBase';
import  { logout } from '../features/agentSlice';
import { companyLogout } from '../features/companySlice';
import { logoutUsers } from '../features/userSlice';
import { ScoutingModel } from '../models/scoutingModel';

export const propertyAPI = createApi({
  reducerPath: 'propertyAPI',
  baseQuery: customFetchBase,
  //refetchOnReconnect: true,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'http://localhost:5000',
  //   prepareHeaders:  (headers, { getState }) => {
  //     const token = ( getState() as RootState).agentState.token
  //     // const token1 = ( getState() as RootState).companyState.token
  //     // const token2 = ( getState() as RootState).userState.token
  //     console.log('states: ', token);
  //     if (token) {
  //       // const decodedToken: { exp: number } = setAgents(token);
  //       headers.set('authorization', `Bearer ${token}` );
  //     // } else if (token1) {
  //     //   headers.set('authorization', `Bearer ${token}` );
        
  //     // } else if(token2) {
  //     //   headers.set('authorization', `Bearer ${token}` );
       
  //     // }
  //     }
  //       return headers;
      
  // }
  // }),
  

//refetchOnFocus: true,
tagTypes: ['Properties', 'Users', 'Agents', 'AgentReset', 'Companies', 'Mortgage', 'Scout', 'Events', 'Save'],
  endpoints: (builder) => ({
     getUsers: builder.query<UserModel[], void>({
      query: ()  => '/users',
        // providesTags: (result: { id: any; }[]) => result ? [...result.map(({ id }) => ({ type: 'Users' as const, id })),
        //         { type: 'Users', id: 'USER' },
        //       ] : [{ type: 'Users', id: 'USER' }],
        providesTags: (result: any, error: any, id: any) =>  [{ type:'Users', id: 'USER' }],  
    }),
  
    getUser: builder.query<UserModel, any>({
      query: (id: any) => `/users/${id}`,
      providesTags: (result: any, error: any, id: any) =>  [{ type:'Users', id }],  
    }),
     signinUser: builder.mutation<UserModel, Partial<UserModel>>({
      query(body: any) {
        return {
        url: '/users/signin',
        method: 'POST',
        body,
      }
       },
       invalidatesTags: [{type: 'Users', id: 'USER'}],
     }),
     googleSignIn: builder.mutation<UserModel, Partial<UserModel>>({
      query(body: any) {
        return {
        url: '/users/googleSignIn',
        method: 'POST',
        body,
      }
       },
       invalidatesTags: [{type: 'Users', id: 'USER'}],
     }),
     signupUser: builder.mutation<UserModel, Partial<UserModel>>({
      query: (body: any) => {
        return {
        url: '/users/signup', 
        method: 'POST',
        body,
      }
       },
       invalidatesTags: [{type: 'Users', id: 'USER'}],
     }),
     userRefresh: builder.query({
      query: () => ({
        url: '/users/refresh',
        method: 'GET',
      })
     }),
     logoutUser: builder.mutation<UserModel, Partial<UserModel>>({
      query:(body: any) => ({
        url: '/users/logout',
        method: 'POST',
        body,     
      }),
      async onQueryStarted( args: any, { dispatch, queryFulfilled }: any) {
       try {
        // const data =
         await queryFulfilled
        // console.log(data)
        dispatch(logoutUsers());
         dispatch(propertyAPI.util.resetApiState());
      //  setTimeout(() => {
      //   dispatch(propertyAPI.util.resetApiState())
      //  }, 1000)
      } catch (error) {
        console.log(error)
       }
      }
     }),

     generateOTP: builder.mutation<UserModel, Partial<UserModel>>({
      query(body: any) {
        return {
        url: '/users/generateOTP',
        method: 'PATCH',
        body,
      }
       },
       invalidatesTags: [{type: 'Users', id: 'USER'}],
     }),

     resetPassword: builder.mutation<UserModel, Partial<UserModel>>({
      query(body: any) {
        return {
        url: '/users/resetPassword',
        method: 'PATCH',
        body,
      }
       },

       invalidatesTags: [{type: 'Users', id: 'USER'}],
     }),


     updateUser: builder.mutation<UserModel, Partial<UserModel>>({
    query(data: { [x: string]: any; id: any; }) {const { id, ...body} = data;

        return {
        url: `/users/update/${id}`,
        method: 'PATCH',
        body,  
        }
       },
       transformResponse: (response: { data: UserModel }, meta: any, arg: any) => response.data,
      
       invalidatesTags:  (result: any, error: any, {id}: any) => [{ type: 'Users', id: 'USER'  }],
     }),
     
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query(id: any) {
        return {
          url: `users/delete/${id}`,
          method: 'DELETE',
          // credentials: 'include'
        }
      },
     invalidatesTags: (result: any, error: any, id: any) => [{ type: 'Users', id: 'USER' }],
       }),

       getAgents: builder.query<AgentModel[], void>({
        query: ()  => '/agents',
        providesTags: (result: any, error: any, id: any) =>  [{ type:'Agents', id: 'AGENT' }],  
          // providesTags: (result) => result ? [...result.map(({ id }) => ({ type: 'Agents' as const, id: 'AGENT'})),
          //         { type: 'Agents', id: 'AGENT' },
          //       ] : [{ type: 'Agents', id: 'AGENT' }],
      }),
      getAgent: builder.query <AgentModel, any>({
        query: (id: any) => `/agents/${id}`,
        providesTags: (result: any, error: any, id: any) =>  [{ type:'Agents', id: 'AGENT' }],  
      }),
         addAgent: builder.mutation<AgentModel, Partial<AgentModel>>({
          query(body: any) {
            return {
            url: '/agents/signup',
            method: 'POST',
            body,
          }
           },
            invalidatesTags: [{type: 'Agents', id: 'AGENT'}],
         }),
         signinAgent: builder.mutation<AgentModel, Partial<AgentModel>>({
          query(body: any) {
            return {
            url: '/agents/signin',
            method: 'POST',
            body,
            }
          },
            invalidatesTags: [{type: 'Agents', id: 'AGENT'}],
         }),
         getAgentCompany: builder.query<PropertyModel, any>({
          query: (compId: any) => `/agents/agentCompany/${compId}`,
          providesTags: (result: any, error: any, id: any) =>  [{ type:'Agents', id: 'AGENT' }],  
        }),
         logoutAgent:builder.mutation({
          query:(body: any) => ({
            url: '/agents/logout',
            method: 'POST',
            body,     
          }),
          async onQueryStarted( args: any, { dispatch, queryFulfilled }: any) {
           try {
            // const data =
             await queryFulfilled
            // console.log(data)
            dispatch(logout())
            // dispatch(propertyAPI.util.resetApiState())
          //  setTimeout(() => {
          //   dispatch(propertyAPI.util.resetApiState())
          //  }, 1000)
          } catch (error) {
            console.log(error)
           }
          }
         }),
         
         agentRefresh: builder.query({
          query: () => ({
            url: '/agents/refresh',
            method: 'GET',
          })
         }),

         generateAgentOTP: builder.mutation<AgentModel, Partial<AgentModel>>({
          query(body: any) {
            return {
            url: '/agents/generateOTP',
            method: 'PATCH',
            body,
          }
           },
           invalidatesTags: [{type: 'Agents', id: 'AGENT'}],
         }),
    
         resetAgentPassword: builder.mutation<AgentModel, Partial<AgentModel>>({
          query(body: any) {
            return {
            url: '/agents/resetPassword',
            method: 'PATCH',
            body,
          }
           },
    
           invalidatesTags: [{type: 'Agents', id: 'AGENT'}],
         }),

         updateAgent: builder.mutation<AgentModel, Partial<AgentModel> & Pick<AgentModel, 'id'>>({
          query: ({id, ...patch}: any) => ({
            url: `/agents/${id}`,
            method: 'PATCH',
            body: patch,  
            
           }),
             transformResponse: (response: { data: AgentModel }, meta: any, arg: any) => response.data,
             transformErrorResponse: (
              response: { status: string | number },
              meta: any,
              arg: any
            ) => response.status,
            invalidatesTags:  (result: any, error: any, {id}: any) => [{ type: 'Agents', id: 'AGENT'  }],
            async onQueryStarted(
              arg: any,
              { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }: any
            ) {},

         }),

        //  updateAgent: builder.mutation<AgentModel, Partial<AgentModel>>({
        //   query(data) {
        //     const { id, ...body} = data;
        //     return {
        //     url: `/agents/${id}`,
        //     method: 'PATCH',
        //     body,  
        //     }
        //    },
        //    async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        //     const patchResult = dispatch(
        //       propertyAPI.util.updateQueryData('getAgent', id, (draft) => {
        //         Object.assign(draft, patch)
        //       })
        //     )
        //     try {
        //       await queryFulfilled
        //     } catch {
        //       patchResult.undo()
        //     }
        //   },
        //    invalidatesTags:  (result, error, {id}) => [{ type: 'Agents', id: 'AGENT'  }],
        //  }),
  
         deleteAgent: builder.mutation<{ success: boolean; id: number }, number>({
          query(id: any) {
            return {
              url: `agents/${id}`,
              method: 'DELETE',
              // credentials: 'include'
            }
          },
         invalidatesTags: (result: any, error: any, id: any) => [{ type: 'Agents', id: 'AGENT' }],
           }),

           getCompanies: builder.query<CompanyModel[], void>({
            query: ()  => '/companies',
            providesTags: (result: any, error: any, id: any) =>  [{ type:'Companies', id: 'LIST' }], 
              // providesTags: (result) => result ? [...result.map(({ id }) => ({ type: 'Companies' as const, id })),
              //         { type: 'Companies', id: 'LIST' },
              //       ] : [{ type: 'Companies', id: 'LIST' }],
          }),

          getCompany: builder.query<CompanyModel, any>({
            query: (id: any) => `/companies/${id}`,
            providesTags: (result: any, error: any, id: any) =>  [{ type:'Companies', id: 'LIST' }],  
          }),
    
             addCompany: builder.mutation<CompanyModel, Partial<CompanyModel>>({
              query(body: any) {
                return {
                url: '/companies/signup',
                method: 'POST',
                body,
              }
               },
                invalidatesTags: [{type: 'Companies', id: 'LIST'}],
             }),
             signinCompany: builder.mutation<CompanyModel, Partial<CompanyModel>>({
              query(body: any) {
                return {
                url: '/companies/signin',
                method: 'POST',
                body,
              }
               },
                invalidatesTags: [{type: 'Companies', id: 'LIST'}],
             }),
             companyRefresh: builder.query({
              query: () => ({
                url: '/companies/refresh',
                method: 'GET',
              })
             }),
             logoutCompany:builder.mutation({
              query:(body: any) => ({
                url: '/companies/logout',                       
                method: 'POST',
                body,     
              }),
              async onQueryStarted( args: any, { dispatch, queryFulfilled }: any) {
               try {
                // const data =
                 await queryFulfilled
                // console.log(data)
                dispatch(companyLogout())
                // dispatch(propertyAPI.util.resetApiState())
              //  setTimeout(() => {
              //   dispatch(propertyAPI.util.resetApiState())
              //  }, 1000)
              } catch (error) {
                console.log(error)
               }
              }
             }),

             generateCompanyOTP: builder.mutation<CompanyModel, Partial<CompanyModel>>({
              query(body: any) {
                return {
                url: '/companies/generateOTP',
                method: 'PATCH',
                body,
              }
               },
               invalidatesTags: [{type: 'Companies', id: 'LIST'}],
             }),
        
             resetCompanyPassword: builder.mutation<CompanyModel, Partial<CompanyModel>>({
              query(body: any) {
                return {
                url: '/companies/resetPassword',
                method: 'PATCH',
                body,
              }
               },
        
               invalidatesTags: [{type: 'Companies', id: 'LIST'}],
             }),
             
             updateCompany: builder.mutation<CompanyModel, Partial<CompanyModel>>({
              query(data: { [x: string]: any; id: any; }) {
                const { id, ...body} = data;
                return {
                url: `/companies/${id}`,
                method: 'PATCH',
                body,  
                }
               },
              //  transformResponse: (response: { data: CompanyModel }, meta, arg) => response.data,
              async onQueryStarted({ id, ...patch }: any, { dispatch, queryFulfilled }: any) {
                const patchResult = dispatch(
                  propertyAPI.util.updateQueryData('getCompany', id, (draft: any) => {
                    Object.assign(draft, patch)
                  })
                )
                try {
                  await queryFulfilled
                } catch {
                  patchResult.undo()
                }
              },
               invalidatesTags:  (result: any, error: any, {id}: any) => [{ type: 'Companies', id: 'LIST'  }],
             }),
      
             deleteCompany: builder.mutation<{ success: boolean; id: number }, number>({
              query(id: any) {
                return {
                  url: `companies/${id}`,
                  method: 'DELETE',
                  // credentials: 'include'
                }
              },
             invalidatesTags: (result: any, error: any, id: any) => [{ type: 'Companies', id: 'LIST' }],
               }),

               getProperties: builder.query<PropertyModel[], void>({
                query: ()  => '/properties',
                  // providesTags: (result: { id: any; }[]) => result ? [...result.map(({ id }) => ({ type: 'Properties' as const, id: 'PROP' })),
                  //         { type: 'Properties', id: 'PROP' },
                  //       ] : [{ type: 'Properties', id: 'PROP' }],
                  providesTags: (result: any, error: any, id: any) =>  [{ type: 'Properties', id: 'PROP' }],  
              }),
              getProperty: builder.query<PropertyModel, any>({
                query: (id: any) => `/properties/${id}`,
                providesTags: (result: any, error: any, id: any) =>  [{ type:'Properties', id: 'PROP' }],  
              }),
              getPropertiesByAgent: builder.query<PropertyModel, any>({
                query: ({agentId, page}: any) => `/properties/agentProperties/${agentId}?page=${page}`,
                providesTags: (result: any, error: any, id: any) =>  [{ type:'Properties', id: 'PROP' }],  
              }),
              nativePropertiesByAgent: builder.query<PropertyModel, any>({
                query: ({agentId}: any) => `/properties/nativeAgentProperties/${agentId}`,
                providesTags: (result: any, error: any, id: any) =>  [{ type:'Properties', id: 'PROP' }],  
              }),
              searchProperties: builder.query<PropertyModel, any>({
                query: ({search, toggle, minPrice, maxPrice, type, page, state, selectBed, selectBath,duration}: any)  => `/properties/search?search=${search}&state=${state}&toggle=${toggle}&type=${type}&duration=${duration}&selectBath=${selectBath}&selectBed=${selectBed}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}`,
                providesTags: (result: any, error: any, id: any) =>  [{ type:'Properties', id: 'PROP' }],  
                //search, toggle, minPrice, maxPrice, type, selectBed, selectBath,duration
              }),
              searchPropertiesByBuy: builder.query<PropertyModel, any>({
                query: ({searchQuery, search, category, sort, bed,bath, minPrice, maxPrice, type, state, page}: any)  => `/properties/buy?search=${search}&category=${category}&type=${type}&state=${state}&sort=${sort}&bath=${bath}&bed=${bed}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}`,
                //transformResponse: (response: any) => response.reverse(),
                providesTags: (result: any, error: any, id: any) =>  [{ type:'Properties', id: 'PROP' }],  
                //search, category, sort, bed, bath, minPrice, maxPrice, type, page
              }),
              searchPropertiesByRent: builder.query<PropertyModel, any>({
                query: ({searchQuery, search, category, sort, bed,bath, minPrice, state, maxPrice, type, page}: any)  => `/properties/rent?search=${search}&category=${category}&type=${type}&state=${state}&sort=${sort}&bath=${bath}&bed=${bed}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}`,
               // transformResponse: (response: any) => response.sort((a: any, b: any) => b - a),
                providesTags: (result: any, error: any, id: any) =>  [{ type:'Properties', id: 'PROP' }],  
                //search, category, sort, bed, bath, minPrice, maxPrice, type, page
              }),
              moreProperty: builder.query<PropertyModel, any>({
                query: ({location, price, propertyType, bedroom, category}: any)  => `/properties/more?location=${location}&price=${price}&propertyType=${propertyType}&bedroom=${bedroom}&category=${category}`,
                transformResponse: (response: any) => response.sort((a: any, b: any) => b - a),
                providesTags: (result: any, error: any, id: any) =>  [{ type:'Properties', id: 'PROP' }],  
              }),
              commercial: builder.query<PropertyModel, any>({
                query: ({searchQuery, search, category, propertyGroup, state, sort, bed,bath, minPrice, maxPrice, type, page}: any)  => `/properties/commercial?search=${search}&propertyGroup=${propertyGroup}&state=${state}&category=${category}&type=${type}&sort=${sort}&bath=${bath}&bed=${bed}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}`,
               // transformResponse: (response: any) => response.sort((a: any, b: any) => b - a),
                providesTags: (result: any, error: any, id: any) =>  [{ type:'Properties', id: 'PROP' }],  
                //search, category, sort, bed, bath, minPrice, maxPrice, type, page
              }),
              newProject: builder.query<PropertyModel, any>({
                query: ({ search, sort, possession, state, minBed, maxBed, minPrice, maxPrice, type, propertyGroup, page}: any)  => `/properties/newProject?search=${search}&type=${type}&state=${state}&sort=${sort}&minBed=${minBed}&maxBed=${maxBed}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&possession=${possession}&propertyGroup=${propertyGroup}`,
                //transformResponse: (response: any) => response.reverse(),
                providesTags: (result: any, error: any, id: any) =>  [{ type:'Properties', id: 'PROP' }],  
              }),
              offplan: builder.query<PropertyModel, any>({
                query: ({search, sort, minBed, maxBed, minPrice, possession, state, maxPrice, type, propertyGroup, page}: any)  => `/properties/offplan?search=${search}&type=${type}&state=${state}&sort=${sort}&minBed=${minBed}&maxBed=${maxBed}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&possession=${possession}&propertyGroup=${propertyGroup}`,
                //transformResponse: (response: any) => response.reverse(),
                providesTags: (result: any, error: any, id: any) =>  [{ type:'Properties', id: 'PROP' }],  
              }),
                 addProperty: builder.mutation<PropertyModel, Partial<PropertyModel>>({
                  query(body: any) {
                    return {
                    url: '/properties',
                    method: 'POST',
                    body,
                  }
                   },
                    invalidatesTags: [{type: 'Properties', id: 'PROP'}],
                 }),
                 updateProperty: builder.mutation<PropertyModel, Partial<PropertyModel> & Pick<PropertyModel, 'id'>>({
                  query: ({id, ...patch}: any) => ({
                    url: `/properties/${id}`,
                    method: 'PATCH',
                    body: patch,  
                   }),
                     transformResponse: (response: { data: PropertyModel }, meta: any, arg: any) => response.data,
                     transformErrorResponse: (
                      response: { status: string | number },
                      meta: any,
                      arg: any
                    ) => response.status,
                    invalidatesTags:  (result: any, error: any, {id}: any) => [{ type: 'Properties', id: 'PROP'  }],
                    async onQueryStarted(
                      arg: any,
                      { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }: any
                    ) {},
                 }),
          
                 deleteProperty: builder.mutation<{ success: boolean; id: number | string }, number | string>({
                  query(id: any) {
                    return {
                      url: `properties/${id}`,
                      method: 'DELETE',
                    }
                  },
                 invalidatesTags: (result: any, error: any, id: any) => [{ type: 'Properties', id: 'PROP' }],
                   }),

                   companyPropertySearch: builder.query<PropertyModel, any>({
                    query: ({companyId, searchQuery, page, search}: any)  => `/properties/adminHomepage/propertyList/${companyId}?searchQuery=${searchQuery || 'i'}&page=${page}`,
                    providesTags: (result: any, error: any, id: any) =>  [{ type:'Properties', id: 'PROP' }],  
                  }),  
                  getCompanyProperty: builder.query<PropertyModel, any>({
                    query: (companyId: any) => `/properties/companyProperties/${companyId}`,
                    providesTags: (result: any, error: any, id: any) =>  [{ type:'Properties', id: 'PROP'  }],  
                  }), 

                  getMortgages: builder.query<MortgageModel[], void>({
                    query: ()  => '/mortgages',
                      // providesTags: (result: { id: any; }[]) => result ? [...result.map(({ id }) => ({ type: 'Mortgage' as const, id })),
                      //         { type: 'Mortgage', id: 'MORT' },
                      //       ] : [{ type: 'Mortgage', id: 'MORT' }],
                      providesTags: (result: any, error: any, id: any) =>  [{ type: 'Mortgage', id: 'MORT'  }],  
                  }), 
                  getMortgage: builder.query<MortgageModel, any>({
                    query: (id: any) => `/mortgages/${id}`,
                    providesTags: (result: any, error: any, id: any) =>  [{ type:'Mortgage', id: 'MORT' }],  
                  }), 
                  mortgageApplication: builder.mutation<MortgageModel, Partial<MortgageModel>>({
                    query(body: any) {
                      return {
                      url: '/mortgages',
                      method: 'POST',
                      body,
                    }
                     },
                      invalidatesTags: [{type: 'Mortgage', id: 'MORT'}],
                   }),
                   deleteMortgage: builder.mutation<{ success: boolean; id: number | string }, number | string>({
                    query(id: any) {
                      return {
                        url: `mortgages/${id}`,
                        method: 'DELETE',
                      }
                    },
                   invalidatesTags: (result: any, error: any, id: any) => [{ type: 'Mortgage', id: 'MORT' }],
             }),
             getScoutings: builder.query<ScoutingModel[], void>({
              query: ()  => '/propertyscouting',
              providesTags: (result: any, error: any, id: any) =>  [{ type:'Scout', id: 'SCOU' }], 
            }), 
            getScouting: builder.query<ScoutingModel, any>({
              query: (id: any) => `/propertyscouting/${id}`,
              providesTags: (result: any, error: any, id: any) =>  [{ type:'Scout', id: 'SCOU' }],  
            }), 
            scoutingApplication: builder.mutation<ScoutingModel, Partial<ScoutingModel>>({
              query(body: any) {
                return {
                url: '/propertyscouting',
                method: 'POST',
                body,
              }
               },
                invalidatesTags: [{type: 'Scout', id: 'SCOU'}],
             }),
             updateScouting: builder.mutation<ScoutingModel, Partial<ScoutingModel>>({
              query(data: { [x: string]: any; id: any; }) {
                const { id, ...body} = data;
                return {
                url: `/propertyscouting/${id}`,
                method: 'PATCH',
                body,  
                }
               },
              //  transformResponse: (response: { data: CompanyModel }, meta, arg) => response.data,
              async onQueryStarted({ id, ...patch }: any, { dispatch, queryFulfilled }: any) {
                const patchResult = dispatch(
                  propertyAPI.util.updateQueryData('getScouting', id, (draft: any) => {
                    Object.assign(draft, patch)
                  })
                )
                try {
                  await queryFulfilled
                } catch {
                  patchResult.undo()
                }
              },
               invalidatesTags:  (result: any, error: any, {id}: any) => [{ type: 'Scout', id: 'SCOU'  }],
             }),
             deleteScouting: builder.mutation<{ success: boolean; id: number | string }, number | string>({
              query(id: any) {
                return {
                  url: `propertyscouting/${id}`,
                  method: 'DELETE',
                }
              },
             invalidatesTags: (result: any, error: any, id: any) => [{ type: 'Scout', id: 'SCOU' }],
       }),
       getEvents: builder.query<EventModel[], void>({
        query: ()  => '/events',
        providesTags: (result: any, error: any, id: any) =>  [{ type:'Events', id: 'EVENT' }], 
      }), 
      getEvent: builder.query<EventModel, any>({
        query: (id: any) => `/events/${id}`,
        providesTags: (result: any, error: any, id: any) =>  [{ type:'Events', id: 'EVENT' }],  
      }), 
      getEventByAgent: builder.query<EventModel, any>({
        query: (agentId: any) => `/events/agentEvents/${agentId}`,
        providesTags: (result: any, error: any, id: any) =>  [{ type:'Events', id: 'EVENT' }],  
      }),
      bookEvents: builder.mutation<EventModel, Partial<EventModel>>({
        query(body: any) {
          return {
          url: '/events',
          method: 'POST',
          body,
        }
         },
          invalidatesTags: [{type: 'Events', id: 'EVENT'}],
       }),
       updateEvent: builder.mutation<EventModel, Partial<EventModel>>({
        query(data: { [x: string]: any; id: any; }) {
          const { id, ...body} = data;
          return {
          url: `/events/${id}`,
          method: 'PATCH',
          body,  
          }
         },
        //  transformResponse: (response: { data: CompanyModel }, meta, arg) => response.data,
        async onQueryStarted({ id, ...patch }: any, { dispatch, queryFulfilled }: any) {
          const patchResult = dispatch(
            propertyAPI.util.updateQueryData('getEvent', id, (draft: any) => {
              Object.assign(draft, patch)
            })
          )
          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
         invalidatesTags:  (result: any, error: any, {id}: any) => [{ type: 'Events', id: 'EVENT'  }],
       }),
       deleteEvent: builder.mutation<{ success: boolean; id: number | string }, number | string>({
        query(id: any) {
          return {
            url: `events/${id}`,
            method: 'DELETE',
          }
        },
       invalidatesTags: (result: any, error: any, id: any) => [{ type: 'Events', id: 'EVENT' }],
     }),
     saveProperty: builder.mutation<PropertyModel, Partial<PropertyModel>>({
      query(body: any) {
        return {
        url: '/save/savedProperty',
        method: 'POST',
        body,
      }
       },
        invalidatesTags: ['Save'],
     }),

     deleteSaveProperty: builder.mutation<{ success: boolean; id: number }, number>({
      query(id: any) {
        return {
          url: `save/savedProperty/${id}`,
          method: 'DELETE',
        }
      },
     invalidatesTags: (result: any, error: any, id: any) => ['Save'],
       }),

       getSavedProperties: builder.query<PropertyModel, any>({
        query: (saveBy: any) => `/save/savedProperties?saveBy=${saveBy}`,
        providesTags: (result: any, error: any, id: any) =>  [{ type:'Properties', id: 'PROP'  }],  
      }), 
       
    }), 
})

export const { 
    useGetUsersQuery,
    useGetUserQuery, 
    useSigninUserMutation, 
    useSignupUserMutation, 
    useUserRefreshQuery,
    useGenerateOTPMutation,
    useResetPasswordMutation,
    useLogoutUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetCompaniesQuery,
    useGetCompanyQuery, 
    useAddCompanyMutation, 
    useSigninCompanyMutation,
    useCompanyRefreshQuery,
    useLogoutCompanyMutation,
    useGenerateCompanyOTPMutation,
    useResetCompanyPasswordMutation,
    useUpdateCompanyMutation,
    useDeleteCompanyMutation,
    useGetAgentsQuery,
    useGetAgentQuery, 
    useAddAgentMutation, 
    useSigninAgentMutation,
    useGetAgentCompanyQuery,
    useLogoutAgentMutation,
    useAgentRefreshQuery,
    useGenerateAgentOTPMutation,
    useResetAgentPasswordMutation,
    useUpdateAgentMutation,
    useDeleteAgentMutation,
    useGetPropertiesQuery,
    useGetPropertyQuery,
    useCommercialQuery,
    useNewProjectQuery,
    useOffplanQuery,
    useMorePropertyQuery, 
    useAddPropertyMutation, 
    useUpdatePropertyMutation,
    useSavePropertyMutation,
    useDeleteSavePropertyMutation,
    useGetSavedPropertiesQuery,
    useDeletePropertyMutation,
    useGetPropertiesByAgentQuery,
    useSearchPropertiesByBuyQuery,
    useSearchPropertiesByRentQuery,
    useCompanyPropertySearchQuery,
    useSearchPropertiesQuery,
    useGoogleSignInMutation,
    useGetCompanyPropertyQuery,
    useGetMortgagesQuery, 
    useGetMortgageQuery,
    useMortgageApplicationMutation,
    useDeleteMortgageMutation,
    useScoutingApplicationMutation,
    useGetScoutingsQuery,
    useGetScoutingQuery,
    useUpdateScoutingMutation,
    useDeleteScoutingMutation,
    useGetEventsQuery,
    useGetEventQuery,
    useGetEventByAgentQuery,
    useBookEventsMutation,
    useUpdateEventMutation,
    useDeleteEventMutation
 } = propertyAPI

