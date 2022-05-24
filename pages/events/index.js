import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import useAxios from '../../Components/Website/Hooks/useAxios'
import Spinner from '../../Components/Website/Common/Spinner'
import moment from 'moment'
import {Api} from '../../Common/Api/Api'
import Head from 'next/head';
import styles from './Events.module.scss'
import PanelLayout from '../../Components/PanelLayout/PanelLayout'

const index = ({location}) => {

	const [
        getData, 
        responseData,  
        responseType, 
    ] = useAxios();

    const [Data, SetData] = useState(null)

    useEffect(() => {
        getData('website/events', {}, 'getData', false, 'get', true);
    }, [])

    useEffect(() => {
        if(responseType === "getData") {
            if(responseData.error === 1) {
                SetData(responseData.data)
            }
        }
    }, [responseData])

    console.log(Data)

  return (
		<PanelLayout>
			<div className={styles.contains_everything}>
				{
					Data ?
						<div className={styles.events}>
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
								<img src={Data.event.background_image} alt="About" className={styles.bg} />
								<div className={styles.wrapper}>
									<div className="contain">
										<h1>
											<span>{Data.event.title}</span>
										</h1>
									</div>
								</div>
							</div>
							{
								Data.annual &&
								<div className={`${styles.annual_event} ${styles.event_lg}`}>
									<div className="contain">
										<p className={styles.section_title}>Annual Event</p>
										<Link href={`/events/${Data.annual.id}/${Data.annual.slug}`}>
											<a className={styles.event_wrap}>
												<div className={styles.img_wrap}>
													<img src={Data.annual.background_image} alt="showcase" />
												</div>
												<div className={styles.content_wrap}>
													<div>
														<p className={styles.title}>{Data.annual.title}</p>
														<p className={styles.text}>{Data.annual.seo_description}</p>
													</div>
													<p className={styles.date}>
														{
															Data.annual.details.start_date == Data.annual.details.end_date ?
															moment(Data.annual.details.start_date).format('Do MMM YYYY') :
															`${moment(Data.annual.details.start_date).format('Do')} - ${moment(Data.annual.details.end_date).format('Do MMM YYYY')}`
														}
														{`, ${Data.annual.details.location}`}
													</p>
												</div>
											</a>
										</Link>
									</div>
								</div>
							}
							{
								Data.next && 
								<div className={`${styles.next_event} ${styles.event_lg}`}>
									<div className="contain">
										<div className={styles.events_head}>
											<p className={styles.section_title}>Next Event</p>
											<Link href={{pathname: '/all-events', state: {filter: 'upcoming'}}}>
												<a className={styles.btnlink}>
													<span>See All</span>
													<img src="/assets/icons/angle_right_color_thin.svg" alt="see all" />
												</a>
											</Link>
										</div>
										<Link href={`/events/${Data.next.id}/${Data.next.slug}`}>
											<a className={styles.event_wrap}>
												<div className={styles.content_wrap}>
													<div>
														<p className={styles.title}>{Data.next.title}</p>
														<p className={styles.text}>{Data.next.seo_description}</p>
													</div>
													<p className={styles.date}>
														{
															Data.next.details.start_date == Data.next.details.end_date ?
															moment(Data.next.details.start_date).format('Do MMM YYYY') :
															`${moment(Data.next.details.start_date).format('Do')} - ${moment(Data.next.details.end_date).format('Do MMM YYYY')}`
														}
														{`, ${Data.next.details.location}`}
													</p>
												</div>
												<div className={styles.img_wrap}>
													<img src={Data.next.background_image} alt="showcase" />
												</div>
											</a>
										</Link>
									</div>
								</div>
							}
							<div className={styles.past_events}>
								<div className="contain">
									<div className={styles.events_head}>
										<p className={styles.section_title}>Past Events</p>
										<Link href={{pathname: '/all-events', state: {filter: 'past'}}}>
											<a className={styles.btnlink}>
												<span>See All</span>
												<img src="/assets/icons/angle_right_color_thin.svg" alt="see all" />
											</a>
										</Link>
									</div>
									<div className={styles.wrapper}>
										{
											Data.past.map(item => {
												return (
													<Link href={`/events/${item.id}/${item.slug}`} key={item.id}>
														<a className={styles.event_box}>
															<img src={item.background_image} alt={item.title} />
															<div className={styles.event_wrapper}>
																<div className={styles.event_info}>
																	<p className={styles.title}>{item.title}</p>
																	<p className={styles.text}>{item.seo_description}</p>
																</div>
																<div className={styles.event_meta}>
																	<p className={styles.date}>
																		{
																			item.details.start_date == item.details.end_date ?
																			moment(item.details.start_date).format('Do MMM YYYY') :
																			`${moment(item.details.start_date).format('Do')} - ${moment(item.details.end_date).format('Do MMM YYYY')}`
																		}
																	</p>
																	<p className={styles.cat} style={{background: item.details.type_color}}>{item.details.type}</p>
																</div>
															</div>
														</a>
													</Link>
												)
											})
										}
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