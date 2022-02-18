import { container } from "tsyringe";

import { UsersRepository } from "@src/modules/users/repositories/implementations/UsersRepository";

container.registerSingleton("UsersRepository", UsersRepository);
