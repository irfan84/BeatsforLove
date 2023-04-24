import { useSelector } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Loader, Error, SongCard } from '../components';

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) {
    return <Loader title="Loading Top Charts" />;
  }

  if (error) return <Error />;

  // Filters the song if image and song uri are missing to avoid app error
  const filteredSong = data?.filter((obj) => obj.images !== undefined);

  return (
    <div className="w-full flex flex-col">
      <h2 className="text-white font-bold text-3xl text-left mt-4 mb-10">
        Discover Top Charts
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {filteredSong?.slice(3, data.length - 1).map((song, i) => (
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

export default TopCharts;
