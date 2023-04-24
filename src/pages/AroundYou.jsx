import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import { Loader, Error, SongCard } from '../components';

const AroundYou = () => {
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { region, country } = location;

  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=${
          import.meta.env.VITE_GEO_IPIFY_KEY
        }`
      )
      .then((res) => {
        setLocation({
          country: res?.data?.location?.country,
          region: res?.data?.location?.region,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading) {
    return <Loader title="Loading Top Songs Around You" />;
  }

  if (error && country) return <Error />;

  return (
    <div className="w-full flex flex-col">
      <h2 className="text-white font-bold text-3xl text-left mt-4 mb-10">
        {`Discover Around You (${region}, ${country})`}
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            data={data}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
