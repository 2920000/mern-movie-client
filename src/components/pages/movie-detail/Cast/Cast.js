import Slider from "react-slick";
import apiConfig from "../../../../api/apiConfig";
import './cast.scss'
export const Cast = ({ movieCredits }) => {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1270,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
    <div className="cast">
         <h3 className="cast-title">DIỄN VIÊN</h3>
        <Slider {...settings}>
        {movieCredits.map((cast) => (
          <div className="cast-profile" key={cast.id}>
            <img
              className="cast-image"
              src={apiConfig.w500Image(cast.profile_path)}
              alt=""
            />
            <span className="cast-name">{cast.name}</span>
            <span className="cast-name-character">{cast.character}</span>
          </div>
        ))}
      </Slider>
    </div>
    );
  };
  