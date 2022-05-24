import React, { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import useAxios from '../../../../Components/Website/Hooks/useAxios'
import Spinner from '../../../../Components/Website/Common/Spinner'
import InjectHTML from '../../../../Components/Website/InjectHTML/InjectHTML'
import moment from 'moment'
import Element from '../../../../Components/Website/Common/About/Element/Element'
import {Api} from '../../../../Common/Api/Api'
import Head from 'next/head'
import {useRouter} from 'next/router'
import styles from './BlogAll.module.scss';
import PanelLayout from '../../../../Components/PanelLayout/PanelLayout'

const index = ({history, match}) => {
	
    const [
        getData, 
        responseData,  
        responseType, 
    ] = useAxios();
    
    const [Data, SetData] = useState()
    const [UrlData, SetUrlData] = useState({
		id:"",
		pathname:''
	})
	const Router =  useRouter()
	
	useEffect(()=>{	
		if(Router.isReady){
			console.log("Router",Router.query)
			let {bid} = Router.query
			SetUrlData({
				id:bid,
				pathname:Router.pathname
			})
			getData(`website/blog/${bid}`, {}, 'getData', false, 'get', true);
		}
	},[Router])


   

    useEffect(() => {
        if(responseType === "getData") {
            if(responseData.error === 1) {
                SetData(responseData.data)
                console.log(responseData.data)
            }
        }
    }, [responseData])

    return (
		<PanelLayout>
			<div className="contains_everything">
				{
					Data ?
						<div className="resources">
							<Head>
								<title>{Data.seo_title}</title>
								<meta property="og:title" content={Data.seo_title} />
								<meta property="og:description" content={Data.seo_description} />
								<meta property="og:image" content={Data.seo_image} />
								<meta property="og:url" content={Api.baseurl + UrlData.pathname} />
								<meta property="og:site_name" content="Humanitarian Finance Forum" />
								<meta name="twitter:title" content={Data.seo_title} />
								<meta name="twitter:description" content={Data.seo_description} />
								<meta name="twitter:image" content={Data.seo_image} />
								<meta name="twitter:card" content={Api.baseurl + UrlData.pathname} />
								<meta name="twitter:image:alt" content={Data.seo_title} />
								<meta name="title" content={Data.seo_title} />
								<meta name="description" content={Data.seo_description} />
								<meta name="keywords" content={Data.seo_tags} />
							</Head>
							<div className={`${styles.custom_crumbs} ${styles.sm}`}>
								<div className="contain">
									<ul>
										<li className={styles.back}>
											<img src="/assets/icons/angle_right_dark.svg" alt="angle_right" />
											<button 
												className={`${styles.active} ${styles.btn}`}
												onClick={() => Router.back()}
											>Latest Blogs</button>
										</li>
										<li>
											<Link href="/resources"><a className={styles.active}>Resources</a></Link>
											<img src="/assets/icons/angle_right_dark.svg" alt="angle_right" />
										</li>
										<li>
											<Link href="/resources/blogs"><a className={styles.active}>Blogs</a></Link>
											<img src="/assets/icons/angle_right_dark.svg" alt="angle_right" />
										</li>
										<li>{Data.title}</li>
									</ul>
								</div>
							</div>
							<div className={styles.blog_view}>
								<div className="contain">
									<p className={styles.blog_title}>
										<InjectHTML html={Data.header} />    
									</p>
									{/* <p className="side_text">Published 22-26 Jun 2021 (220 words)</p> */}
									<div className={styles.wrapper}>
										<div className={styles.sidebar}>
											<ul>
												<li>
													<p className={styles.side_title}>Published</p>
													<p className={styles.side_text}>{moment(new Date(Data.published_at)).format('DD MMM YYYY')}</p>
												</li>
												<li>
													<p className={styles.side_title}>Reading time</p>
													<p className={styles.side_text}>
														<InjectHTML html={Data.call_to_action} />
													</p>
												</li>
											</ul>
											<div className={styles.share}>
												<p className={styles.side_title}>Share</p>
												<div className={styles.icons}>
													<Link href="/" target="_blank">
														<a className={styles.icon}>
															<img src="/assets/icons/facebook.svg" alt="facebook" />
														</a>
													</Link>
													<Link href="/" target="_blank">
														<a className={styles.icon}>	
															<img src="/assets/icons/twitter.svg" alt="twitter" />
														</a>
													</Link>
													<Link href="/" target="_blank">
														<a className={styles.icon}>
															<img src="/assets/icons/youtube.svg" alt="youtube" />
														</a>
													</Link>
													<Link href="/" target="_blank">
														<a className={styles.icon}>
															<img src="/assets/icons/instagram.svg" alt="instagram" />
														</a>
													</Link>
												</div>
											</div>
										</div>
										<div className={styles.content_wrap}>
											<div className={styles.dynamic_content}>
											<div className={styles.img_wrap}>
												<img src={Data.background_image} />
											</div>
												{
													Data.sections &&
													Data.sections.map(item => {
														return <Element data={item} key={item.id} />
													})
												}
											</div>
											<div className={styles.share}>
												<p className={styles.side_title}>Share</p>
												<div className={styles.icons}>
													<Link href="/" target="_blank">
														<a className={styles.icon}>
															<img src="/assets/icons/facebook.svg" alt="facebook" />
														</a>
													</Link>
													<Link href="/" target="_blank">
														<a className={styles.icon}>
															<img src="/assets/icons/twitter.svg" alt="twitter" />
														</a>
													</Link>
													<Link href="/" target="_blank">
														<a className={styles.icon}>
															<img src="/assets/icons/youtube.svg" alt="youtube" />
														</a>
													</Link>
													<Link href="/" target="_blank">
														<a className={styles.icon}>
															<img src="/assets/icons/instagram.svg" alt="instagram" />
														</a>
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>  
						</div> : <Spinner />
				}
			</div>
		</PanelLayout>
    )
}

export default index
