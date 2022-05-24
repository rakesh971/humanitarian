import React, {useState, useEffect, useRef} from 'react'
import Spinner from '../../Spinner'
import Element from '../Element/Element'
import Link from 'next/link'
import styles from './OurNetwork.module.scss';

const OurNetwork = ({Data}) => {

    const [SectionData, SetSectionData] = useState(null)
    const [ImgWidth, SetImgWidth] = useState(null)
    const InnerWrap = useRef();

    useEffect(() => {
        InnerWrap.current && SetImgWidth(InnerWrap.current.clientWidth)
    }, [InnerWrap])

    useEffect(() => {
        SetSectionData(Data.child.filter(val => val.slug.includes('our-network'))[0])
        console.log(Data.child.filter(val => val.slug.includes('our-network'))[0].sections)
    }, [])


    return (
        <div className={styles.dynamic_content}>
            {
                SectionData ?
                <>
                    {
                        SectionData.sections.map(item => {
                            return <Element data={item} key={item.id} />
                        })
                    }
                    <div className={styles.network}>
                        {
                            SectionData.cards.map((item, index) => {
                                console.log(item)
                                return (
                                    <Link 
                                        href={{ pathname: item.position }} 
                                        target="_blank" 
                                        ref={InnerWrap} 
                                        key={item.id}
                                    >
										<a className={styles.nbox} style={{height: InnerWrap.current ? ImgWidth : '200px'}} >
                                        	<img src={item.image} alt="network logo" />
										</a>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </> : <Spinner />
            }
        </div>
    )
}

export default OurNetwork
