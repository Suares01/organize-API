import { container } from "tsyringe";

import { ProjectsRepository } from "@modules/projects/repositories/implementations/ProjectsRepository";
import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";

container.registerSingleton("UsersRepository", UsersRepository);
container.registerSingleton("ProjectsRepository", ProjectsRepository);
