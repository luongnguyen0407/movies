import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher, tdmbApi } from "../../config";
import Button from "../Button/Button";

const Banner = () => {
  const { data } = useSWR(tdmbApi.getMoviesTypes("upcoming"), fetcher);
  const imgBanner = data?.results || [];
  return (
    <section className="banner page-container bg-white rounded-lg overflow-hidden h-[500px] mb-20">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {imgBanner.length > 0 &&
          imgBanner.map((banner) => {
            return (
              <SwiperSlide key={banner.id}>
                <BannerItem {...banner}></BannerItem>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
};

function BannerItem({
  title,
  backdrop_path,
  original_language,
  release_date,
  id,
}) {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-full select-none">
      <div className="overlay inset-0 absolute bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
      <img
        className="object-cover"
        src={tdmbApi.imgOriginal(backdrop_path)}
        alt=""
      />
      <div className="absolute text-white bottom-5 left-5">
        <h4 className="mb-5 text-3xl font-semibold capitalize">{title}</h4>
        <div className="flex items-center mb-5 gap-x-5">
          <span className="px-5 py-2 border rounded-lg border-rose-50">
            Actions
          </span>
          <span className="px-5 py-2 capitalize border rounded-lg border-rose-50">
            {original_language}
          </span>
          <span className="px-5 py-2 border rounded-lg border-rose-50">
            {release_date}
          </span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch Now</Button>
      </div>
    </div>
  );
}
export default Banner;
