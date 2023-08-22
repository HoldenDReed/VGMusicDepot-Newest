import { useState, useEffect } from "react";
import { Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import { Navigation, EffectFade } from 'swiper';
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { AlbumRandom } from "./AlbumRandom";
import './randomAlbum.css';

export const RandomAlbum = () => {
    const [albums, setAlbums] = useState([])
useEffect(
    () => {
        const fetchData = async () => {
            const response = await fetch(
                `http://localhost:8088/albums?_expand=gameType`
            );
            const albumsArray = await response.json();
            albumsArray.sort(function (a, b) {return Math.random() - 0.5;});
            setAlbums(albumsArray);
        };
        fetchData();
    },
    []
);

return (
    <div>
        <Swiper
          modules={[Navigation, EffectFade]}
          navigation
          effect={'fade'}
          speed={800}
          slidesPerView={1}
          loop
          className="swiper"
        >
            {
                albums.map(album => 
                    <SwiperSlide className="swiperSlide">
                <AlbumRandom key={`album--${album.id}`}
                    id={album.id}
                    title={album.albumTitle}
                    img={album.albumImg}
                    info={album.albumInfo}
                    url={album.albumUrl} />
                    </SwiperSlide>
                )
            }
        </Swiper>
    </div>
)
}