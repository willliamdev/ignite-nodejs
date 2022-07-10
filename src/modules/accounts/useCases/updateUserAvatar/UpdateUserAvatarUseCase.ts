import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/files";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {
    /**/
  }

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByID(user_id);

    if (user.avatar) {
      const pathAvatar = `./tmp/avatar/${user.avatar}`;
      await deleteFile(pathAvatar);
    }

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}
export { UpdateUserAvatarUseCase };
