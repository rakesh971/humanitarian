import React, { useState, useEffect } from "react";
import Spinner from "../../Spinner";
import Element from "../Element/Element"
import Link from 'next/link'
import InjectHTML from "../../../InjectHTML/InjectHTML";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay} from 'swiper/core';
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import useAxios from '../../../Hooks/useAxios'
import styles from './Members.module.scss';

SwiperCore.use([Autoplay]);

const Members = ({ Data }) => {

  const [
    getData, 
    responseData,  
    responseType, 
  ] = useAxios();

  const [SectionData, SetSectionData] = useState(null);
  const [CarosalImage, SetCarosalImage] = useState([]);
  const [MembersCards, SetMembersCards] = useState([]);
  const [OtherData, SetOtherData] = useState(null)

  useEffect(() => {
    let filteredPatners = Data.child.filter((val) =>
      val.slug.includes("members")
    )[0];
    getData(`info-card/categories`, {page_id: filteredPatners.id}, 'getCat', false, 'get', false);
    SetSectionData(filteredPatners);
    SetCarosalImage(filteredPatners.cards.filter((val) => val.is_carousel));
    SetMembersCards(filteredPatners.cards.filter((val) => !val.is_carousel));
  }, []);

  useEffect(() => {
    if(responseType === 'getCat') {
        if(responseData.error === 1) {
            SetOtherData(responseData.data)
        }
    }
}, [responseData])

  return (
    <div className={styles.dynamic_content}>
      {SectionData ? (
        <>
          {
            SectionData.sections.map(item => {
                return <Element data={item} key={item.id} />
            })
          }
          {CarosalImage && CarosalImage.length > 0 ? (
            <div className={styles.slider}>
              <Swiper 
                slidesPerView={1} 
                loop 
                pagination={CarosalImage.length > 1 ? { clickable: true } : false}
                autoplay={CarosalImage.length > 1 ? { delay: 10000 } : false}>
                {CarosalImage.map((item) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <div className={styles.slide_wrap}>
                        <div className={styles.img_wrap}>
                          <img
                            src={item.image}
                            alt="slider_img"
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          ) : null}
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
                    <div className={styles.members}>
                      {MembersCards.map((item) => {
                        if(item.info_category_id === val.id)
                        return (
                          <Link
                            href={{ pathname: item.position }}
                            target="_blank"
                            key={item.id}
                          >
							<a className={styles.membox}>
								<p className={styles.text_link}>
								<InjectHTML html={item.title} />
								</p>
							</a>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Members;
