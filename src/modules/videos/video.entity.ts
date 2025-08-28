import { User } from "../users/user.entity";

export class Video {
  id!: string;
  title!: string;
  url!: string;
  thumbnailUrl!: string;
  description?: string;
  isPublic!: boolean;
  user!: User;
  createdAt!: Date;
  constructor(data: Video) {
    Object.assign(this, data);
    this.createdAt = new Date(data.createdAt);
    if (data.user != null) {
      this.user = new User(data.user);
    }
  }

  get iconUrl() {
    return (
      this.thumbnailUrl ||
      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
    );
  }
}
