import React, { useState, useEffect } from "react";
import { withRouter } from 'next/router'
import Link from 'next/link'
import Spinner from "../../../../Components/Website/Common/Spinner";
import InjectHTML from "../../../../Components/Website/InjectHTML/InjectHTML";
import useAxios from '../../../../Components/Website/Hooks/useAxios'
import styles from './View.module.scss'
import {useRouter} from 'next/router'
import PanelLayout from "../../../../Components/PanelLayout/PanelLayout";

const ExternalResourcesView = ({location, history, match}) => {
    const [
        getData, 
        responseData,  
        responseType, 
    ] = useAxios();
	const router = useRouter()
	
	console.log('router', router.query)

	const [Data, SetData] = useState(null)

	useEffect(()=>{
		if(router.isReady){
			getData(`website/external/${router.query.id}`,{}, 'getData', false, 'get', true);
		}
	},[router])

	
	console.log("Data",Data)
    useEffect(() => {
        if(responseType === "getData") {
            if(responseData.error === 1) {
				console.log("working")
                SetData(responseData.data)
            }
        }
    }, [responseData])
    
    return (
		<PanelLayout>
			<div className="contains_everything">
				{Data ? (
					<div className={styles.resources}>
						<div className={`${styles.custom_crumbs} ${styles.sm}`}>
							<div className="contain">
							<ul>
								<li className={styles.back}>
								<img
									src="/assets/icons/angle_right_dark.svg"
									alt="angle_right"
								/>
								<button
									className={`${styles.active} ${styles.btn}`}
									onClick={() => router.back()}
								>
									Back
								</button>
								</li>
								<li>
								<Link href="/resources">
									<a className={styles.active}>
										Resources
									</a>
								</Link>
								<img
									src="/assets/icons/angle_right_dark.svg"
									alt="angle_right"
								/>
								</li>
								<li>
								<Link href="/resources/external-resources">
									<a className={styles.active}>
										External Resources
									</a>
								</Link>
								<img
									src="/assets/icons/angle_right_dark.svg"
									alt="angle_right"
								/>
								</li>
								<li>
									<InjectHTML html={Data.header} />
								</li>
							</ul>
							</div>
						</div>
						<div className={styles.publication_view}>
							<div className="contain">
								<p className={styles.blog_title}>
									<InjectHTML html={Data.header} />
								</p>
								<div className={styles.wrapper}>
									<div className={styles.sidebar}>
										<div className={`${styles.img_wrap} ${styles.lg} p-3`}>
											<img src={Data.background_image} alt="document_holder" />
										</div>
										<Link href={{ pathname: Data.call_to_action }} target="_blank">
											<a className={`${styles.btn } ${styles.download_btn} ${styles.sm}`}>Read More</a>
										</Link>
									</div>
									<div className={styles.content_wrap}>
										<div className={`${styles.img_wrap} ${styles.sm}`}>
										<img src={Data.background_image} alt="document_holder" />
										</div>
										<div className={styles.dynamic_content}>
											<p className={styles.dark_title}>Overview</p>
											<p className={`${styles.text} pb-4`}>
												<InjectHTML html={Data.body} />
											</p>
											<Link
											href={{ pathname: Data.call_to_action }}
											target="_blank"
											>
												<a className={`${styles.btn} ${styles.download_btn} ${styles.lg}`}>Read More</a>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<Spinner />
				)}
			</div>
		</PanelLayout>
	)
}

export async function getServerSideProps(context) {
	return {
	  	props: {}, // will be passed to the page component as props
	}
}

export default withRouter(ExternalResourcesView)
