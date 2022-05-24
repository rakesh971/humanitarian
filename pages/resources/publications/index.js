import React, { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import Select from 'react-select'
import useAxios from '../../../Components/Website/Hooks/useAxios'
import Spinner from '../../../Components/Website/Common/Spinner'
import InjectHTML from '../../../Components/Website/InjectHTML/InjectHTML'
import Pagination from '../../../Common/Pagination/Pagination'
import moment from 'moment'
import styles from './Publications.module.scss'
import PanelLayout from '../../../Components/PanelLayout/PanelLayout'

const index = () => {
	
	const [
        getData, 
        responseData,  
        responseType, 
    ] = useAxios();

    const [Data, SetData] = useState(null)
    const [Paginate, SetPaginate] = useState(null)
    const [TopicOptions, SetTopicOptions] = useState(null)
    const [GeoOptions, SetGeoOptions] = useState(null)
    const [Config, SetConfig] = useState({
        'get': 'init',
        'topic': '',
        'geography': '',
    })

    useEffect(() => {
        getData('website/publications', Config, 'getData', false, 'get', true);
    }, [Config])

    useEffect(() => {
        console.log(responseData)
        if(responseType === "getData") {
            if(responseData.error === 1) {
                SetData(responseData.data.data)
                SetPaginate(responseData.data);
                var topic = [{
                    value: '',
                    label: 'All'
                }]
                responseData.data.topic.map(val => {
                    topic.push({
                        value: val,
                        label: val
                    })
                    return val
                })
                SetTopicOptions(topic)
                var geo = [{
                    value: '',
                    label: 'All'
                }]
                responseData.data.geography.map(val => {
                    geo.push({
                        value: val,
                        label: val
                    })
                    return val
                })
                SetGeoOptions(geo)
            }
        }
    }, [responseData])

  return (
	<PanelLayout>
		<div className="contains_everything">
			{
				Data ?
					<div className={`${styles.resources} ${styles.publications}`}>
						<div className={styles.custom_crumbs}>
							<div className="contain">
								<ul>
									<li>
										<Link href="/resources"><a className={styles.active}>Resources</a></Link>
										<img src="/assets/icons/angle_right_dark.svg" alt="angle_right" />
									</li>
									<li>Publications</li>
								</ul>
							</div>
						</div>
						<div className={styles.publication_list}>
							<div className="contain">
								<div className={styles.filters_area}>
									<p className={styles.section_title}>Publications</p>
									<div className={styles.drop_filters}>
										<div className={styles.select}>
											<Select
												menuPosition="fixed"
												options={TopicOptions}
												className="pop_select"
												name='element_type'
												styles={customStyles}
												placeholder='Select Topic'
												isSearchable={false}
												onChange={e => SetConfig({
													...Config,
													'topic': e.value
												})}
											/>
										</div>
										<div className={styles.select}>
											<Select
												menuPosition="fixed"
												options={GeoOptions}
												className="pop_select"
												name='element_type'
												styles={customStyles}
												placeholder='Select Geography'
												isSearchable={false}
												onChange={e => SetConfig({
													...Config,
													'geography': e.value
												})}
											/>
										</div>
									</div>
								</div>
								<div className={styles.wrapper}>
									{
										Data.map(item => {
											console.log(item.publication)
											return (
												<div className={styles.publication_list_item} key={item.id}>
													<div className={styles.img_wrap}>
														<img src={item.background_image} alt="document_holder" />
													</div>
													<div className={styles.content_wrap}>
														<div className={styles.content_wrap_inner}>
															<p className={styles.date}>{moment(item.published_at).format('Do MMM, YYYY')}</p>
															<p className={styles.title}><InjectHTML html={item.header} /></p>
														</div>
														<div className={styles.btns_grp}>
															<Link 
																href={{ pathname: item.publication.downloadable }} 
																target="_blank" 
															><a className={`${styles.btn} ${styles.orange}`}>Download</a></Link>
															<Link href={`/resources/publications/${item.id}`}><a className={styles.btn}>Read More</a></Link>
														</div>
													</div>
												</div>
											)
										})
									}
								</div>
							</div>
						</div>  
						<div className="contain">
						{ Paginate && <Pagination Data={Paginate} SetConfig={SetConfig} DefaultLimit = {5} Config={Config} /> }     
						</div>
					</div> : <Spinner />
			}
		</div>
	</PanelLayout>
  )
}

const customStyles = {
    input: (provided, state) => ({
        ...provided,
        height: '30px',
        lineHeight: '30px',
        padding: '0',
        fontSize: '17px',
        fontWeight: '400'
    }),
    container: (provided, state) => ({
        ...provided,
        height: '30px',
        width: '100%',
        maxWidth: '100%',
        padding: '0',
        marginLeft: 'auto',
        backgroundColor: '#F2F2F2',
    }),
    control: (provided, state) => ({
        ...provided,
        height: '30px',
        padding: '0',
        paddingLeft: '14px',
        borderRadius: '0',
        border: '0',
        boxShadow: 'none',
        backgroundColor: '#F2F2F2',
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        height: '30px',
        padding: '0',
    }),
    placeholder: (provided, state) => ({
        ...provided,
        fontSize: '17px',
        fontWeight: '400',
        color: 'rgba(0, 0, 0, 0.6)',
    }),
    indicatorSeparator: (provided, state) => ({
        ...provided,
        display: 'none'
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        fill: 'rgba(0, 0, 0, 0.0);'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        fontSize: '17px',
        color: '#333',
        fontWeight: '400'
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '17px',
        fontWeight: '400',
        padding: '6px 12px',
        backgroundColor: '#fff',
        color: state.isSelected ? '#264F7F' : 'rgba(0, 0, 0, 0.8)',
    }),
    menuPortal: (provided, state) => ({
        ...provided,
        backgroundColor: '#fff',
    }),
}

export default index