import React, {useState, useEffect, useRef} from 'react'
import InjectHTML from '../../../InjectHTML/InjectHTML'
import styles from './Element.module.scss';

const Element = ({data, style={} }) => {

    const [ImgWidth, SetImgWidth] = useState(null)
    const InnerWrap = useRef();

    useEffect(() => {
        InnerWrap.current && SetImgWidth(InnerWrap.current.clientWidth)
    }, [])
	
    return (
        data.type === 'h2' ?
        <p className={styles.tab_title}>
            <InjectHTML html={data.content} />
        </p> : 
        data.type === 'p' ?
        <p className={`${styles.text} pb-4`}>
            <InjectHTML html={data.content} />
        </p> : 
        data.type === 'img' ?
        <div className={styles.img_wrap}>
            <img src={data.content} />
        </div> : 
        data.type === 'card' ?
        <div className={`${styles.img_wrap} ${styles.multiple}`}>
            <div className={styles.inner_wrap} style={{height: InnerWrap.current ? ImgWidth : '250px'}} ref={InnerWrap}>
                <img src={data.content} alt="card" />
                <div className={styles.content_overlay}></div>
                <p className={styles.img_title}>
                    <InjectHTML html={data.meta} />
                </p>
            </div>
            {
                data.child.map(item => {
                    return (
                        <div className={styles.inner_wrap} style={{height: InnerWrap.current ? ImgWidth : '250px'}} key={item.id}>
                            <img src={item.content} alt="card" />
                            <div className={styles.content_overlay}></div>
                            <p className={styles.img_title}>
                                <InjectHTML html={item.meta} />
                            </p>
                        </div>
                    )
                })
            }
        </div> : null
    )
}

export default Element

