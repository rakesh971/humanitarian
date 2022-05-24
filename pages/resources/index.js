import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import useAxios from '../../Components/Website/Hooks/useAxios'
import Spinner from '../../Components/Website/Common/Spinner'
import InjectHTML from '../../Components/Website/InjectHTML/InjectHTML'
import Head from 'next/head';
import {Api} from '../../Common/Api/Api'
import styles from './Resources.module.scss'
import Header from '../../Components/Website/Header/Header'
import Footer from '../../Components/Website/Footer/Footer'
import PanelLayout from '../../Components/PanelLayout/PanelLayout'

const index = ({location}) => {

	const [
        getData, 
        responseData,  
        responseType, 
    ] = useAxios();

    const [Data, SetData] = useState(null)

    useEffect(() => {
        getData('website/resources', {}, 'getData', false, 'get', true);
    }, [])

    useEffect(() => {
        if(responseType === "getData") {
            if(responseData.error === 1) {
                console.log(responseData.data)
                SetData(responseData.data)
            }
        }
    }, [responseData])

  return (
	<PanelLayout>
		<div className={styles.contains_everything}>
			{
				Data ?
					<div className={styles.resources}>
						<Head>
							<title>{Data.seo_title}</title>
							<meta property="og:title" content={Data.seo_title} />
							<meta property="og:description" content={Data.seo_description} />
							<meta property="og:image" content={Data.seo_image} />
							{/* <meta property="og:url" content={Api.baseurl + location.pathname} /> */}
							<meta property="og:site_name" content="Humanitarian Finance Forum" />
							<meta name="twitter:title" content={Data.seo_title} />
							<meta name="twitter:description" content={Data.seo_description} />
							<meta name="twitter:image" content={Data.seo_image} />
							{/* <meta name="twitter:card" content={Api.baseurl + location.pathname} /> */}
							<meta name="twitter:image:alt" content={Data.seo_title} />
							<meta name="title" content={Data.seo_title} />
							<meta name="description" content={Data.seo_description} />
							<meta name="keywords" content={Data.seo_tags} />
						</Head>
						<div className={styles.banner}>
							<img src={Data.background_image} alt="About" className={styles.bg} />
							<div className={styles.wrapper}>
								<div className="contain">
									<h1>
										<span>{Data.title}</span>
									</h1>
								</div>
							</div>
						</div>
						<div className="contain">
							<div className={styles.resources_list}>
								{
									Data.cards.map((item, index) => {
										return (
											<Link href={index==0 ? "/resources/external-resources" :( index==1 ? "/resources/publications" : "/resources/blogs")}  key={item.id}>
												<a className={styles.resources_list_item}>
													<img src={item.image} alt="External Resources" />
													<div className={styles.inner}>
														<div>
															<p className={styles.rtitle}>
																<InjectHTML html={item.title} />
															</p>
															<p className={styles.rtext}>
																<InjectHTML html={item.description} />
															</p>
															{/* {
																index === 0 ?
																<Link to="/resources/external-resources" className="rlink">Learn more about us!</Link> :
																index === 1 ?
																<Link to="/resources/publications" className="rlink">Learn more about us!</Link> :
																<Link to="/resources/blogs" className="rlink">Learn more about us!</Link>
															} */}
														</div>
													</div>
												</a>
											</Link>
										)
									})
								}
							</div>
						</div>
					</div> : <Spinner />
			}
		</div>
	</PanelLayout>
  )
}

export default index