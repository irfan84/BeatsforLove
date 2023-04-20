import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsHeader, Loader, Error, RelatedSongs } from '../components';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery(songid);

  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songid });

  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return <Loader title="Searching song details..." />;
  }
  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col">
      <DetailsHeader songData={songData} />
      <div className="mb-5">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
      </div>
      <div className="mb-10">
        {songData?.sections[1].type === 'LYRICS' ? (
          songData.sections[1].text.map((line, i) => (
            <p className="text-gray-400 text-base my-1">{line}</p>
          ))
        ) : (
          <p className="text-gray-400 text-base my-1">
            Sorry, no lyrics found!
          </p>
        )}
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePlayClick={handlePlayClick}
        handlePauseClick={handlePauseClick}
      />
    </div>
  );
};

export default SongDetails;
