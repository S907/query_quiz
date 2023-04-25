import {QUIZ_DATA} from '../QueryKeys/quiz.key';
import clientApi, { request } from '../../utils/axios-utils'
import { useQuery } from 'react-query';
// import axios from 'axios';
const staleTime = 300000;
const cacheTime = 600000;
const catchRequest = ()=>{
//     return request({url:'/data'})
//     return axios.get(`http://localhost:3000/data`)
    return clientApi.get("/data");
//     console.log('RESPONSE:::',response);
//     return response?.data;
}
export const useQuizData = (onSuccess, onError)=>{
    return useQuery(QUIZ_DATA, catchRequest,
    {
            onSuccess,
            onError,
            select:(data)=>data?.data,
            cacheTime: cacheTime,
            staleTime: staleTime,
        })
}