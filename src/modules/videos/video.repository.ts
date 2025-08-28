import api from "../../lib/api";
import { Video } from "./video.entity";

type CreateParams = {
  video: File;
  thumbnail: File;
  title: string;
  description: string;
  isPublic: boolean;
};

export const videoRepository = {
  async create(params: CreateParams): Promise<Video> {
    const result = await api.postForm("/videos", params);
    return new Video(result.data);
  },
};
