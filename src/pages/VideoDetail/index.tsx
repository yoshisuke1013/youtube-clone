import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { videoRepository } from "../../modules/videos/video.repository";
import { Video } from "../../modules/videos/video.entity";
import "./VideoDetail.css";

function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVideo = async () => {
    try {
      setIsLoading(true);
      const video = await videoRepository.findOne(id!);
      setVideo(video);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (video == null) return <div>Videoの取得に失敗しました。</div>;

  return (
    <>
      <div className="layout">
        <main className="video-detail-main">
          <div className="video-detail-container">
            <div className="video-main-content">
              <div className="video-player">
                <video controls poster={video.thumbnailUrl}>
                  <source src={video.url} />
                </video>
              </div>
              <div className="video-info-section">
                <h1 className="video-detail-title">{video.title}</h1>
                <div className="video-meta-bar">
                  <div className="video-stats">
                    <span className="upload-date">
                      {video.createdAt.toLocaleString()} アップロード
                    </span>
                  </div>
                </div>
              </div>
              <div className="channel-info-section">
                <div className="video-detail-video-description">
                  {video.description ?? "説明はありません。"}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default VideoDetail;
