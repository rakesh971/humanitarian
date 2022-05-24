import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Spinner from '../../Spinner'
import Element from '../Element/Element'
import InjectHTML from '../../../InjectHTML/InjectHTML'
import useAxios from '../../../Common/../Hooks/useAxios'
import styles from './Governance.module.scss';

const Governance = ({Data,}) => {

    const [
        getData, 
        responseData,  
        responseType, 
    ] = useAxios();
	
    const [SectionData, SetSectionData] = useState(null)
    const [OtherData, SetOtherData] = useState(null)
    const [BoxHeight, SetBoxHeight] = useState(null)
    const boxRef = useRef()

    useEffect(() => {
        var temp = Data.child.find(val => val.slug.includes('governance'))
        SetSectionData(temp)
        getData(`info-card/categories`, {page_id: temp.id}, 'getCat', false, 'get', false);
    }, [])

    useLayoutEffect(() => {
        if(boxRef.current) {
            SetBoxHeight(`${boxRef.current.clientWidth * 0.55}px`)
        }
    }, [boxRef])

    useEffect(() => {
        if(responseType === 'getCat') {
            console.log('gove',responseData)
            if(responseData.error === 1) {
                SetOtherData(responseData.data)
            }
        }
    }, [responseData])

    return (
        <div className={styles.dynamic_content} ref={boxRef}>
            {
                SectionData ?
                <>
                    {
                        SectionData.sections.map(item => {
                            return <Element data={item} key={item.id} />
                        })
                    }
                    <div>
                        {
                            OtherData && OtherData.length &&
                            OtherData.map(val => {
                                return (
                                    <div className={styles.section_other} key={val.id}>
                                        <h3 className={styles.section_title}>
                                            <InjectHTML html={val.title} />
                                        </h3>
                                        <p className={styles.section_description}>
                                            <InjectHTML html={val.description} />
                                        </p>
                                        <div className={styles.section_team}>
                                            {
                                                SectionData.cards.map((item,index) => {
                                                    if(item.info_category_id === val.id)
                                                    return (
                                                        <div className={styles.tbox} key={item.id}>
                                                            <img src={item.image || `/images/profile.png`} alt="card" style={{height: BoxHeight}} />
                                                            <div className={styles.tbox_inner}>
                                                                <p className={styles.tbox_title}>
                                                                    <InjectHTML html={item.title} />
                                                                </p>
                                                                <p className={styles.tbox_role}>
                                                                    <InjectHTML html={item.position} style={{lineHeight:"1.5"}}/>
                                                                </p>
                                                                <a href={item.description} target="_blank" rel="noopener noreferrer" className={styles.text}>read more</a>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </> : <Spinner />
            }
        </div>
    )
}

export default Governance
