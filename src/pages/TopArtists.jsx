import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Loader, Error, ArtistCard } from '../components';

const TopArtist = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) {
    return <Loader title="Loading Top Charts" />;
  }

  if (error) return <Error />;

  return (
    <div className="w-full flex flex-col">
      <h2 className="text-white font-bold text-3xl text-left mt-4 mb-10">
        Discover Top Artists
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.slice(3, data.length - 1).map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtist;
