import Footer from '../Website/Footer/Footer'
import Header from '../Website/Header/Header'
import React, {useState, useEffect} from 'react'
import Element from '../../Components/Website/Common/About/Element/Element'
import Spinner from '../../Components/Website/Common/Spinner'
import useAxios from '../../Components/Website/Hooks/useAxios'
import Head from 'next/head';
import { Api } from '../../Common/Api/Api';
import Link from 'next/link'
import { useRouter } from 'next/router';
import styles from './AboutLayout.module.scss'
import PanelLayout from '../PanelLayout/PanelLayout'

const AboutLayout = ({children, Data}) => {

	const router = useRouter();

	console.log('router.pathname', router.pathname)

    const [ShowTabList, SetShowTabList] = useState(false)
    const [TabList, SetTabList] = useState([
        {
            id: 'tab01',
            title: 'Why we started',
            slug: 'why-we-started'
        },
        {
            id: 'tab02',
            title: 'What we aim to do',
            slug: 'what-we-aim-to-do'
        },
        {
            id: 'tab05',
            title: 'History',
            slug: 'history',
        },
        {
            id: 'tab03',
            title: 'How we work',
            slug: 'how-we-work',
        },
        {
            id: 'tab04',
            title: 'Governance',
            slug: 'governance',
        },
        {
            id: 'tab07',
            title: 'Partners',
            slug: 'partners',
        },
        {
            id: 'tab08',
            title: 'Community',
            slug: 'community',
        },
        {
            id: 'tab06',
            title: 'Network',
            slug: 'network',
        },
    ])

	return (
		<PanelLayout>
			<div className={styles.contains_everything}>
				{
					Data ?
						<div className={styles.about}>
							<Head>
								<title>{Data.page.seo_title}</title>
								<meta property="og:title" content={Data.page.seo_title} />
								<meta property="og:description" content={Data.page.seo_description} />
								<meta property="og:image" content={Data.page.seo_image} />
								<meta property="og:url" content={Api.baseurl + location.pathname} />
								<meta property="og:site_name" content="Humanitarian Finance Forum" />
								<meta name="twitter:title" content={Data.page.seo_title} />
								<meta name="twitter:description" content={Data.page.seo_description} />
								<meta name="twitter:image" content={Data.page.seo_image} />
								<meta name="twitter:card" content={Api.baseurl + location.pathname} />
								<meta name="twitter:image:alt" content={Data.page.seo_title} />
								<meta name="title" content={Data.page.seo_title} />
								<meta name="description" content={Data.page.seo_description} />
								<meta name="keywords" content={Data.page.seo_tags} />
							</Head>
							<div className={styles.banner}>
								<img src={Data.page.background_image} alt="About" className={styles.bg} />
								<div className={styles.wrapper}>
									<div className="contain">
										<h1>
											<span>{Data.page.title}</span>
										</h1>
									</div>
								</div>
							</div>
							<div className={styles.about_container}>
								<div className="contain">
									<div className={styles.wrapper}>
										<div className={styles.sidebar}>
											<ul>
												{
													TabList.map(item => {
														const route = `/about/${item.slug}`
														return (
															<li key={item.id}>
																<Link href={route}>
																	<a 
																		className={`
																			btn ${styles.side_link} 
																			${router.pathname == route ? `${styles.active}` : ''}
																		`}
																	>
																		{item.title}
																		<img src="/assets/icons/angle_right_blue_md.svg" alt="icon" />
																	</a>
																</Link>
															</li>
														)
													})
												}
											</ul>
										</div>
										<div className={styles.mobile_drop_menu}>
											<button 
												className={`${styles.btn} ${styles.selected}`}
												onClick={() => SetShowTabList(!ShowTabList)}
											>
												{
													TabList.map(item => {
														const route = `/about/${item.slug}`
														if(router.pathname === route) {															
															return (
																<span key={item.id}>{item.title}</span>
															)
														}
													})
												}
												<img src="/assets/icons/angle_down_lg.svg" alt="angle_down_lg" />
											</button>
											{
												ShowTabList &&
												<ul>
													{
														TabList.map(item => {
															const route = `/about/${item.slug}`
															if(router.pathname !== route) {
																return (
																	<li key={item.id}>
																		<Link href={`/about/${item.slug}`}>
																			<a className={styles.btn}>{item.title}</a>		
																		</Link>
																	</li>
																)
															} else return null
														})
													}
												</ul>
											}
										</div>
										<div className={styles.content_wrap}>
											{children}
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

export default AboutLayout