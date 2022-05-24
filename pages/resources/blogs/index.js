import React, { useState, useEffect } from 'react'
import Footer from '../../../Components/Website/Footer/Footer'
import Header from '../../../Components/Website/Header/Header'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, { Pagination , Autoplay} from 'swiper/core';
import useAxios from '../../../Components/Website/Hooks/useAxios'
import InjectHTML from '../../../Components/Website/InjectHTML/InjectHTML';
import Spinner from '../../../Components/Website/Common/Spinner'
import moment from 'moment'
import Link from 'next/link'
import { withRouter } from 'next/router'
import styles from './Blog.module.scss'
import {useRouter} from 'next/router'
import PanelLayout from '../../../Components/PanelLayout/PanelLayout';

SwiperCore.use([Pagination, Autoplay]);

const index = () => {

	const [
        getData, 
        responseData,  
        responseType, 
    ] = useAxios();

    const [Featured, SetFeatured] = useState(null)
    const [Data, SetData] = useState(null)

    useEffect(() => {
        getData('website/blogs', {}, 'getData', false, 'get', true);
    }, [])

    useEffect(() => {
        console.log(responseData)
        if(responseType === "getData") {
            if(responseData.error === 1) {
                SetFeatured(responseData.data.featured)
                SetData(responseData.data.others.data)
            }
        }
    }, [responseData])

  return (
	<PanelLayout>
		<div className="contains_everything">
			{
				Data ?
					<div className={styles.resources}>
						<div className={styles.custom_crumbs}>
							<div className="contain">
								<ul>
									<li>
										<Link href="/resources"><a className={styles.active}>Resources</a></Link>
										<img src="/assets/icons/angle_right_dark.svg" alt="angle_right" />
									</li>
									<li>Blogs</li>
								</ul>
							</div>
						</div>
						{
							Featured.length > 0 &&
							<div className={`${styles.featured} ${styles.var_height}`}>
								<div className={styles.wrapper}>
									<div className="contain">
										<p className={styles.section_title}>Featured Blogs</p>
										<div className={styles.wrapper}>
											<Swiper
												slidesPerView={1}
												loop
												pagination={{ clickable: true }}
												autoplay={{ delay: 3000 }}
											>
												{
													Featured.map((item) => {
														return (
															<SwiperSlide key={item.id}>
																<Link href={`/resources/blogs/${item.id}`}>
																	<a className={styles.slide_wrap}>
																		<div className={`${styles.content_wrap} ${styles.light}`}>
																			<div>
																				<p className={styles.title} id="full_img"><InjectHTML html={item.header} /></p>
																			</div>
																			<p className={styles.date}>{moment(item.published_at).format('Do MMM, YYYY')}</p>
																		</div>
																		<div className={styles.img_wrap}>
																			<img src={item.background_image} alt="showcase" />
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
							</div>
						}
						<div className={styles.other_resources}>
							<div className="contain">
								<div className={styles.section_head}>
									<p className={styles.section_title}>Latest Blogs</p>
									<Link href="/resources/blogs/all">
										<a className={styles.btn}>See All
											<img src="/assets/icons/angle_right_orange.svg" alt="angle right" />
										</a>
									</Link>
								</div> 
								<div className={styles.wrapper}>
									{
											Data.map((item) => {
											return (
												<Link href={`/resources/blogs/${item.id}`} key={item.id}>
													<a className={styles.rwrap}>
														<div className={styles.img_wrap}>
															<img src={item.background_image} alt="showcase" />
														</div>
														<div className={styles.content_wrap}>
															<p className={styles.title}><InjectHTML html={item.header} /></p>
															<p className={styles.date}>{moment(item.published_at).format('Do MMM, YYYY')}</p>
														</div>
													</a>
												</Link>
											);
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