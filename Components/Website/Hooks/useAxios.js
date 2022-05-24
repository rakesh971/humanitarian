import { useState } from 'react';
import { Api } from '../../../Common/Api/Api';
import { toast } from 'react-toastify';

const qs = require('qs');
const axios = require('axios');

export default () => {

    const [responseData, setResponseData] = useState(null);
    const [responseType, setResponseType] = useState(null);
    const [userToken, setUserToken] = useState(null);
	// JSON.parse(localStorage.getItem('token')) || 

    const getData = async (headPoint, bodyData, rType, show, method, isForm) => {
        setResponseType(rType);
        try {
            const response = await axios({
                url: `${Api.baseurl}/${headPoint}`,
                method: method,
                data: method == 'get' ? '' : isForm ? bodyData : qs.stringify(bodyData),
                params: method !== 'get' ? '' : bodyData,
                paramsSerializer: params => {
                    return qs.stringify(params)
                },
                headers: {
                    'Content-Type': isForm ? '' : 'application/x-www-form-urlencoded',
                    'Authorization': userToken ? `Bearer ${userToken.token}` : '', 
                }
            });
            // console.log(response.data);
            setResponseData(response.data);
            if(response.data.error === 1 && show) {
                toast('Data updated successfully', {
                    position: "bottom-center",
                    type: "success",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            if(response.data.error === 0) {
                toast(response.data.msg, {
                    position: "bottom-center",
                    type: "error",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch(err) {
            console.log('err');
            console.log(err);
        }
    }   

    return [
        getData, 
        responseData,  
        responseType
    ];
}

