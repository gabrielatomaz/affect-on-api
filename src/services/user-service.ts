import { userRepository } from '../repositories/repositories';
import { User, UserLogin, UserPermission } from '../models/models'
import { userMapper, userPermissionMapper } from '../mappers/mappers'

class UserService {
    async findUserPermission(email: string): Promise<UserPermission[]> {
        const { rows: userPermissions } = await userRepository
            .findUserPermission(email);

        return userPermissions.map(userPermission => userPermissionMapper.map(userPermission));
    }

    async getUserCredentials(user: UserLogin): Promise<User> {
        const { email, password }: UserLogin = user;

        const { rows: [userFound] } = await userRepository
            .findUserByEmailAndPassword(email, password);

        return userMapper.map(userFound);
    }

    async findAll(): Promise<User[]> {
        const { rows: users } = await userRepository.findAll();

        return users.map(user => userMapper.map(user));
    }

    async findByEmail(email?: string): Promise<User> {
        const { rows: [userFound] } = await userRepository.findByEmail(email);

        return userMapper.map(userFound);
    }

    async findBy(user: User): Promise<User[]> {
        const { rows: users } = await userRepository.findBy(user);

        return users.map(user => userMapper.map(user));
    }

    async upateAllFieldsBy(email: string, user: User): Promise<void> {
        userRepository.update(email, user);
    }

    async updateBy(email: string, user: User): Promise<void> {
        const {
            email: emailFound,
            name: nameFound,
            password: passwordFound,
            phone: phoneFound,
            groupId: groupIdFound,
        }: User = await this.findByEmail(email);
        const { email: userEmail, name, password, phone, groupId } = user;
        const userToBeUpdated: User = {
            email: userEmail ? userEmail : emailFound,
            name: name ? name : nameFound,
            password: password ? password : passwordFound,
            phone: phone ? phone : phoneFound,
            groupId: groupId ? groupId : groupIdFound,
        };

        userRepository.update(email, userToBeUpdated);
    }

    async deleteBy(email: string): Promise<void> {
        userRepository.delete(email);
    }

    create(user: User): Promise<any> {
        return userRepository.insert(user);
    }
}

export default new UserService();