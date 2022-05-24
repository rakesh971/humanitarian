import React, { useState, useEffect, useRef } from 'react'
import RegisterPopper from '../../../../Components/Website/Common/RegisterPopper/RegisterPopper'
import useAxios from '../../../../Components/Website/Hooks/useAxios'
import Spinner from '../../../../Components/Website/Common/Spinner'
import InjectHTML from '../../../../Components/Website/InjectHTML/InjectHTML'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './EventsAll.module.scss'
import PanelLayout from '../../../../Components/PanelLayout/PanelLayout'

const index = () => {

	const router = useRouter()

	console.log('router new', router.query)

	const [
        getData, 
        responseData,  
        responseType, 
    ] = useAxios();

    const [Data, SetData] = useState(null)

    const [RegisterShow, SetRegisterShow] = useState(false)
    const [OverviewDrop, SetOverviewDrop] = useState(true)
    const [SpeakersDrop, SetSpeakersDrop] = useState(true)
    const [ImgWidth, SetImgWidth] = useState(null)
    const [Width, setWidth] = useState();
	// const [Width, setWidth] = useState(window.innerWidth);
    const InnerWrap = useRef();

    useEffect(() => {
        InnerWrap.current && SetImgWidth(InnerWrap.current.clientWidth)
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, [])

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }
	
    useEffect(() => {
        if(Width > 768) {
            SetOverviewDrop(true)
            SetSpeakersDrop(true)
        }
    }, [Width])

    useEffect(() => {
		getData(`website/event/${router.query.id}`, {'with[]': 'sections'}, 'getData', false, 'get', true);
    }, [])
	
    useEffect(() => {
        if(responseType === "getData") {
            if(responseData.error === 1) {
                SetData(responseData.data)
            }
        }
    }, [responseData])
	
  return (
		<PanelLayout>
			<div className="contains_everything">
				{
					Data ?
						<div className={styles.events}>
							<div className={styles.custom_crumbs}>
								<div className="contain">
									<ul>
										<li>
											<Link href="/events"><a className={styles.active}>Events</a></Link>
											<img src="/assets/icons/angle_right_dark.svg" alt="angle_right" />
										</li>
										<li>{Data.title}</li>
									</ul>
								</div>
							</div>
							<div className={styles.event_view}>
								<div className="contain">
									<p className={styles.event_title}><InjectHTML html={Data.header} /></p>
									<div className={styles.wrapper}>
										<div className={styles.sidebar}>
											<div className={`${styles.img_wrap} ${styles.sm}`}>
												<img src="/assets/images/home_what_is.png" alt="img title" />
											</div>
											<ul>
												<li>
													<p className={styles.side_title}>Location</p>
													<p className={styles.side_text}>
														<InjectHTML html={Data.details.location} />
													</p>
												</li>
												<li>
													<p className={styles.side_title}>Date</p>
													<p className={styles.side_text}>{Data.details.date}</p>
												</li>
												<li>
													<p className={styles.side_title}>Time</p>
													<p className={styles.side_text}>{Data.details.time}</p>
												</li>
												<li>
													<p className={styles.side_title}>Type</p>
													<p className={styles.side_text_badge} style={{background: Data.details.type_color}}>{Data.details.type}</p>
												</li>
											</ul>
											{
												Data.details.is_future &&
												<Link href={`/events/${router.query.id}/${router.query.slug}/register`} className={`${styles.btn} ${styles.lg}`}><a>Register</a></Link>
											}
										</div>
										<div className={styles.content_wrap}>
											<div className={styles.dynamic_content}>
												<div className={`${styles.img_wrap} ${styles.lg}`}>
													<img src={Data.background_image || "https://hfforum.org/images/pages/backgrounds/1629907326135-home-show-copy.png"} alt="img title" />
												</div>
												<div className={styles.bord_bot}>
													<p className={styles.tab_title}>Overview</p>
													<button 
														className={`${styles.btn} ${styles.accord} ${OverviewDrop ? `${styles.rotate}` : ''}`}
														onClick={() => SetOverviewDrop(!OverviewDrop)}
													>
														<span>Overview</span>
														<img src="/assets/icons/angle_color_up.svg" alt="angle" />
													</button>
													{
														OverviewDrop &&
														<p className={`${styles.text} pb-2`}>
															<InjectHTML html={Data.details.overview} />
														</p>
													}
												</div>
												{
													Data.cards.length > 0 &&
													<div className={styles.bord_bot}>
														<p className={styles.tab_title}>
															<InjectHTML html={Data.sections[0].content} />
														</p>
														<button 
															className={`${styles.btn} ${styles.accord} ${SpeakersDrop ? `${styles.rotate}` : ''}`}
															onClick={() => SetSpeakersDrop(!SpeakersDrop)}
														>
															<span>
																<InjectHTML html={Data.sections[0].content} />
															</span>
															<img src="/assets/icons/angle_color_up.svg" alt="angle" />
														</button>
														{
															SpeakersDrop &&
															<div className={styles.speakers}>
																{
																	Data.cards.map((item, index) => {
																		return (
																			<div className={styles.sbox} key={item.id}>
																				<img src={item.image} alt={`speaker ${index}`} style={{height: InnerWrap.current ? ImgWidth : '300px'}} ref={InnerWrap} />
																				<p className={styles.sbox_title}>
																					<InjectHTML html={item.title} />
																				</p>
																				<p className={styles.sbox_text}>
																					<InjectHTML html={item.description} />
																				</p>
																			</div>
																		)
																	})
																}
															</div>
														}
													</div>
												}
											</div>
										</div>
										{
											Data.details.is_future &&
											<button 
												className={`${styles.btn} ${styles.sm}`}
												onClick={() => SetRegisterShow(true)}
											>Register</button>
										}
									</div>
								</div>
							</div>
						</div> : <Spinner />
				}
				{
					RegisterShow &&
					<RegisterPopper SetRegisterShow={SetRegisterShow} Data={Data} id={match.params.id} slug={match.params.slug} />
				}
			</div>
		</PanelLayout>
  )
}

export async function getServerSideProps(context) {
	return {
	  	props: {}, // will be passed to the page component as props
	}
}
 
export default index