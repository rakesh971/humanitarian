import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Pagination, Autoplay} from "swiper/core";
import Spinner from "../../Spinner";
import Element from "../Element/Element"
import Link from 'next/link'
import styles from './Partners.module.scss';

SwiperCore.use([Pagination,Autoplay]);

const Partners = ({ Data }) => {
  const [SectionData, SetSectionData] = useState(null);
  const [CarosalImage, SetCarosalImage] = useState([]);
  const [PatnersCards, SetPatnersCards] = useState([]);
  const [ImgWidth, SetImgWidth] = useState(null);
  const InnerWrap = useRef();

  useEffect(() => {
    InnerWrap.current && SetImgWidth(InnerWrap.current.clientWidth);
  }, [InnerWrap]);

  useEffect(() => {
    let filteredPatners = Data.child.filter((val) =>
      val.slug.includes("partners")
    )[0];
    SetSectionData(filteredPatners);
    SetCarosalImage(filteredPatners.cards.filter((val) => val.is_carousel));
    SetPatnersCards(filteredPatners.cards.filter((val) => !val.is_carousel));
  }, []);

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
                          <img src={item.image} alt="slider_img" />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          ) : null}
          <div className={styles.partners}>
            {PatnersCards.map((item) => {

                return (
                  <Link
                    href={{ pathname: item.position }}
                    target="_blank"
                    ref={InnerWrap}
                  
                    key={item.id}
                  >
					<a className={styles.nbox}  style={{ height: InnerWrap.current ? ImgWidth : "200px" }}>
                    	<img src={item.image} alt="network logo" />
					</a>
                  </Link>
                );
            })}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Partners;
