
import React, {useState, useEffect} from 'react'
import useAxios from '../../../Components/Website/Hooks/useAxios'
import OurNetwork from '../../../Components/Website/Common/About/OurNetwork/OurNetwork';
import AboutLayout from '../../../Components/AboutLayout/AboutLayout';

const index = () => {

    const [
        getData, 
        responseData,  
        responseType, 
    ] = useAxios();
	
    const [Data, SetData] = useState(null)
	
	useEffect(() => {
        getData('pages/about', {
            'with': ['child', 'sections'],
        }, 'getData', false, 'get', true);
    }, [])
	
    useEffect(() => {
        if(responseType === "getData") {
            if(responseData.error === 1) {
                SetData(responseData.data)
            }
        }
    }, [responseData])

    return (
		<AboutLayout Data={Data}>
			<OurNetwork Data={Data}/>
		</AboutLayout>
    )
}

export default index