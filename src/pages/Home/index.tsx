import { useEffect, useState } from "react";
import { Video } from "../../modules/videos/video.entity";
import { videoRepository } from "../../modules/videos/video.repository";
import VideoCard from "./VideoCard";
import "./Home.css";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryParams, setQueryParams] = useSearchParams();
  const keyword = queryParams.get("keyword");
  const page = parseInt(queryParams.get("page") || "1");
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetchVideos();
  }, [keyword, page]);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      const { videos, pagination } = await videoRepository.find(keyword, {
        page,
        limit: 9,
      });
      setVideos(videos);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard video={video} />
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination-btn prev-btn"
          disabled={page === 1}
          onClick={() => {
            setQueryParams({
              keyword: keyword ?? "",
              page: String(page - 1),
            });
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          前へ
        </button>
        <button
          className="pagination-btn next-btn"
          disabled={page === totalPages}
          onClick={() => {
            setQueryParams({
              keyword: keyword ?? "",
              page: String(page + 1),
            });
          }}
        >
          次へ
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Home;
