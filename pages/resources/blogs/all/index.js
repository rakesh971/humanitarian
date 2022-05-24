import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import useAxios from '../../../../Components/Website/Hooks/useAxios'
import Spinner from '../../../../Components/Website/Common/Spinner'
import InjectHTML from '../../../../Components/Website/InjectHTML/InjectHTML'
import Pagination from '../../../../Common/Pagination/Pagination'
import moment from 'moment'
import styles from './Blogs.module.scss';
import PanelLayout from '../../../../Components/PanelLayout/PanelLayout'

const BlogsAll = () => {

    const [
        getData, 
        responseData,  
        responseType, 
    ] = useAxios();

    const [Data, SetData] = useState(null)
    const [Config, SetConfig] = useState({'all': 'yes'})
    const [Paginate, SetPaginate] = useState(null)

    useEffect(() => {
        getData('website/blogs',Config, 'getData', false, 'get', true);
    }, [Config])

    useEffect(() => {
        console.log(responseData)
        if(responseType === "getData") {
            if(responseData.error === 1) {
                SetData(responseData.data.others.data)
                SetPaginate(responseData.data.others)
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
										<li>
											<Link href="/resources/blogs"><a className={styles.active}>Blogs</a></Link>
											<img src="/assets/icons/angle_right_dark.svg" alt="angle_right" />
										</li>
										<li>See All</li>
									</ul>
								</div>
							</div>
							<div className={styles.all_resources}>
								<div className="contain">
									<p className={styles.section_title}>Blogs</p>
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
																<div className={styles.content_wrap_inner}>
																	<p className={styles.text_sm}>News</p>
																	<p className={styles.title}><InjectHTML html={item.header} /></p>
																</div>
																<p className={styles.date}>{moment(item.published_at).format('Do MMM, YYYY')}</p>
															</div>
														</a>
													</Link>
												);
											})
										}
									</div>
									{ Paginate && <Pagination Data={Paginate} SetConfig={SetConfig} DefaultLimit = {5} Config={Config} /> }
								</div>
							</div>
						</div> : <Spinner />
				}
			</div>
		</PanelLayout>
    )
}

export default withRouter(BlogsAll)