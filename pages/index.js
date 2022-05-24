import React, { useState, useEffect } from 'react'
import InjectHTML from '../Components/Website/InjectHTML/InjectHTML'
import Spinner from "../Components/Website/Common/Spinner";
import useAxios from "../Components/Website/Hooks/useAxios";
import { Api } from "../Common/Api/Api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, { Pagination, Autoplay } from 'swiper/core';
import moment from 'moment'
import styles from './Home.module.scss'
import Link from 'next/link'
import Head from 'next/head';
import PanelLayout from '../Components/PanelLayout/PanelLayout';
SwiperCore.use([Pagination, Autoplay]);

export default function Home() {

    const [
        getData, 
        responseData,  
        responseType, 
    ] = useAxios();

    const [Data, SetData] = useState(null)

    useEffect(() => {
        getData('website/home', {}, 'getData', false, 'get', true);
    }, [])

    useEffect(() => {
        if(responseType === "getData") {
            if(responseData.error === 1) {
                console.log(responseData)
                SetData(responseData.data)
            }
        }
    }, [responseData])
	
	return (
		<PanelLayout>
			<div className="contains_everything">
				{
					Data ?
						<>
							<Head>
								<title>{Data.seo_title}</title>
								<meta property="og:title" content={Data.seo_title} />
								<meta property="og:description" content={Data.seo_description} />
								<meta property="og:image" content={Data.seo_image} />
								<meta property="og:url" content={Api.baseurl + location.pathname} />
								<meta property="og:site_name" content="Humanitarian Finance Forum" />
								<meta name="twitter:title" content={Data.seo_title} />
								<meta name="twitter:description" content={Data.seo_description} />
								<meta name="twitter:image" content={Data.seo_image} />
								<meta name="twitter:card" content={Api.baseurl + location.pathname} />
								<meta name="twitter:image:alt" content={Data.seo_title} />
								<meta name="title" content={Data.seo_title} />
								<meta name="description" content={Data.seo_description} />
								<meta name="keywords" content={Data.seo_tags} />
							</Head>
							<div className={styles.showcase}>
								<img src={Data.background_image} alt="showcase" className={styles.bg}/>
								<div className={styles.wrapper}>
									<h1>
										<InjectHTML html={Data.header} />
									</h1>
								</div>
							</div>
							<div className={styles.home_what_is}>
								<div className={`contain ${styles.contain}`}>
									<p className={styles.section_title}>What is HFF?</p>
									<Swiper
										slidesPerView={1}
										loop
										pagination={Data.cards.length > 1 ? { clickable: true } : false}
										autoplay={Data.cards.length > 1 ? { delay: 10000 } : false}
									>
										{
											Data.cards.map((item) => {
												return (
													<SwiperSlide key={"whatishff" + item.id}>
														<div className={styles.wrapper}>
															<div className={styles.img_wrap}>
																<img src={item.image} alt="showcase" />
															</div>
															<div className={styles.content_wrap}>
																<img src="/assets/icons/triangle.svg" alt="triangle" className={styles.abs} />
																<p>
																	<InjectHTML html={item.description} />
																</p>
															</div>
														</div>
													</SwiperSlide>
												);
											})
										}
									</Swiper>
								</div>
							</div>
							{
								Data.upcoming && Data.upcoming.length > 0 && <div className={styles.home_upcoming}>
									<div className="contain">
										<p className={styles.section_title}>Upcoming Events</p>
										<div className={styles.wrapper}>
											<Swiper
												slidesPerView={1}
												loop
												pagination={Data.upcoming.length > 1 ? { clickable: true } : false}
												autoplay={Data.upcoming.length > 1 ? { delay: 10000 } : false}
											>
												{
													Data.upcoming.map((item) => {
														return (
															<SwiperSlide key={"upcoming"+item.id}>
																<Link href={`/events/${item.page.id}/${item.page.slug}`}>
																	<a  className={styles.slide_wrap}>
																		<div className={styles.content_wrap}>
																			<div>
																				<p className={styles.title}>{item.page.title}</p>
																				<p className={styles.text}>{item.page.seo_description}</p>
																			</div>
																			<p className={styles.date}>
																				{
																					item.page.details.date
																				}
																			</p>
																		</div>
																		<div className={styles.img_wrap}>
																			<img src={item.page.background_image} alt="showcase" />
																		</div>
																	</a>
																</Link>
															</SwiperSlide>
														);
													})
												}
											</Swiper>
										</div>
									</div>
								</div>
							}
							<div className={styles.home_events}>
								{Data.events && Data.events.length > 0 ?
									<div className="contain">
										<div className={styles.events_head}>
											<p className={styles.section_title}>Events</p>
											<Link href="/events">
												<a className={styles.btnlink}>
													<span>See All</span>
													<img src="/assets/icons/angle_right_color_thin.svg" alt="see all" />
												</a>							
											</Link>
										</div>
										<div className={styles.wrapper}>
											{
												Data.events.map(item => {
													return (
														<Link href={`/events/${item.page.id}/${item.page.slug}`} key={"events"+item.id}>
															<a className={styles.event_box}>
																<img src={item.page.background_image} alt={item.page.title} />
																<div className={styles.event_wrapper}>
																	<div className={styles.event_info}>
																		<p className={styles.title}>{item.page.title}</p>
																		<p className={styles.text}>{item.page.seo_description}</p>
																	</div>
																	<div className={styles.event_meta}>
																		{/* <p className="date">{item.page.created_at}</p> */}
																		<p className={styles.date}>
																			{
																				item.page.details.date
																			}
																		</p>
																		<p className={styles.cat} style={{background: item.page.details.type_color}}>{item.page.details.type}</p>
																	</div>
																</div>
															</a>
														</Link>
													)
												})
											}
										</div>
									</div>:null}

							</div>
							<div className={styles.home_resources}>
								{Data.news && Data.news.length > 0 ?
									<div className="contain">
										<div className={styles.resources_head}>
											<p className={styles.section_title}>Resources</p>
											<Link href="/resources">
												<a className={styles.btnlink}>
												<span>See All</span>
												<img src="/assets/icons/angle_right_blue_thin.svg" alt="see all" />
												</a>
											</Link>
										</div>
										<div className={styles.wrapper}>
											{
												Data.news.map(item => {
													return (
														<Link href={item.page.page_type== "External" ? `/resources/external-resources/${item.page.id}`:item.page.page_type == "Publications" ? `/resources/publications/${item.page.id}` : `/resources/blogs/${item.page.id}`} key={"resources"+item.id}>
															<a className={styles.resources_box} >
																<img src={item.page.background_image} alt={item.page.title} />
																<div className={styles.resources_wrapper}>
																	<p className={styles.title}>
																		<InjectHTML html={item.page.header} />    
																	</p>
																	<p className={styles.date}>{moment(item.page.published_at).format('Do MMM, YYYY')}</p>
																</div>
															</a>
														</Link>
													)
												})
											}
										</div>
									</div>:null}
							</div>
							{
						Data.partners && Data.partners.filter(n=>!n.is_carousel).length > 0 && 
							<div className={styles.our_partners}>
									<div className="contain">
										<p className={styles.section_title}>Our Partners</p>
										<div className={styles.wrapper}>
										{
											Data.partners.filter(n=>!n.is_carousel).map(
												n=> 
												<div className={styles.img_wrap} key={"partner"+n.id}>
													<img src={n.image} alt="Partner name" />
												</div>
												)
										}
										</div>
									</div>
							</div>
						}
						</> : <Spinner />
				}
			</div>
		</PanelLayout>
	)
}
