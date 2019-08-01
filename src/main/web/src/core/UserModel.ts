export interface UserModel {
    name: string;
    email: string;
    birthday: string;
}

export interface UserInterface {
    user?: UserModel;
}