import Slider from "react-slick";
import apiConfig from "../../../../api/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import './cast.scss'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.scss";
export const Cast = ({ movieCredits }) => {
 
    return (
    <div className="cast">
         <h3 className="cast-title">DIỄN VIÊN</h3>
       
         <Swiper
        slidesPerView={3}
        spaceBetween={10}
        slidesPerGroup={3}
        loopFillGroupWithBlank={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
          500:{
            slidesPerView: 4,
          },
          640: {
            slidesPerView: 5,
          },
          
          1200: {
            slidesPerView: 6
          },
        }}
        className="mySwiper">
        {movieCredits.map((cast) => {
          if(cast.profile_path){
            return   <SwiperSlide key={cast.id}>
          <div className="cast-profile" >
            <img
              className="cast-image"
              src={apiConfig.w500Image(cast.profile_path)}
              alt=""
            />
            <span className="cast-name">{cast.name}</span>
            <span className="cast-name-character">{cast.character}</span>
          </div>
          </SwiperSlide>
          }
        }
        
        )}
        </Swiper>
    </div>
    );
  };
  