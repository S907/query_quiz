import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const clientApi = axios.create({baseURL:baseUrl,
    headers:{
        Authorization:`Bearer Token`}
    }

)
export const request =({...options})=>{
    clientApi.defaults.headers.common.Authorization =`Bearer token`;
    const onSuccess = response => response
    const onError = (error)=>{
        console.log(`This error ${error}`);
        return error;
    }
    return clientApi(options).then(onSuccess).catch(onError)
}

export default clientApi;