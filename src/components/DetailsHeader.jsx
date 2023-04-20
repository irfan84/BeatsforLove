import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = artistData?.attributes;

  return (
    <div className="relative w-full flex flex-col my-10">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center ">
        <img
          className="w-28 h-28 sm:w-48 sm:h-48 object-cover rounded-full border-2 shadow-xl shadow-black"
          alt="art"
          src={
            artistId
              ? artist.artwork?.url.replace('{w}', '500').replace('{h}', '500')
              : songData?.images?.coverart
          }
        />
        <div className="ml-5">
          <p className="text-white text-xl font-bold sm:text-3xl">
            {artistId ? artist.name : songData?.title}
          </p>
          {!artistData && (
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className="text-gray-400 mt-2 text-base ">
                {songData?.subtitle}
              </p>
            </Link>
          )}
          <p className="text-gray-400 mt-2 text-base ">
            {artistId ? artist?.genreNames[0] : songData?.genres?.primary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
