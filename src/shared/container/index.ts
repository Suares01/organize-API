import { container } from "tsyringe";

import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";

container.registerSingleton("UsersRepository", UsersRepository);
