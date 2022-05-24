import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import useAxios from '../Hooks/useAxios'
import InjectHTML from '../InjectHTML/InjectHTML'
import styles from './Footer.module.scss';

const Footer = () => {

	const [
		getData,
		responseData,
		responseType,
	] = useAxios();

	const [Data, SetData] = useState(null)
	const [Footer, SetFooter] = useState('')
	const [Facebook, SetFacebook] = useState('')
	const [Twitter, SetTwitter] = useState('')
	const [LinkedIn, SetLinkedIn] = useState('')

	useEffect(() => {
		getData('pages/contact', { 'with[]': 'options' }, 'getData', false, 'get', false);
	}, [])

	useEffect(() => {
		if (responseType === "getData") {
			if (responseData.error === 1) {
				SetFacebook(responseData.data.page.options.filter(val => val.key === 'facebook')[0].value)
				SetTwitter(responseData.data.page.options.filter(val => val.key === 'twitter')[0].value)
				SetLinkedIn(responseData.data.page.options.filter(val => val.key === 'linkedin')[0].value)
				SetFooter(responseData.data.page.options.filter(val => val.key === 'footer')[0].value)
				SetData(responseData.data)
			}
		}
	}, [responseData])

	return (
		Data &&
		<div className={styles.footer}>
			<img src="/assets/images/bg_pattern.png" alt="bg_pattern" className={styles.bg} />
			<div className="contain">
				<div className={styles.wrapper}>
					<div className={`${styles.wrap} ${styles.left}`}>
						<img src="/assets/icons/logo_sm.svg" alt="Humanitarian Finance Forum" />
						<div className={styles.inner}>
							<p className={styles.bold}>ABOUT THE HFF</p>
							<p className={styles.lgt}>
								<InjectHTML html={Footer} />
							</p>
						</div>
					</div>
					<div className={`${styles.wrap} ${styles.right}`}>
						<div className={styles.inner}>
							<p className={styles.bold}>SUBSCRIBE TO OUR MAILING LIST</p>
							<div className={styles.newsletter}>
								<input type="text" className={`form_control ${styles.form_control}`} placeholder="Your email address" />
								<button className={`btn ${styles.btn}`}>SIGN UP</button>
							</div>
							<div className={styles.social}>
								<p className={styles.bold}>CONNECT WITH US</p>
								<div className={styles.icons}>
									<Link
										href={{pathname: Facebook}}
									>
										<a className={styles.social_link}>
											<img src="/assets/icons/facebook.svg" alt="facebook" />
										</a>
									</Link>
									<Link
										href={{pathname: Twitter}}
										>
										<a className={styles.social_link}>
											<img src="/assets/icons/twitter.svg" alt="twitter" />
										</a>
									</Link>
									<Link
										href={{pathname: LinkedIn}}>
										<a className={styles.social_link}>
											<img src="/assets/icons/linkedin_orange.svg" alt="linkedin" />
										</a>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer
