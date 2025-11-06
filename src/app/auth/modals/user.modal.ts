export interface User {
    id: number,
    name: string,
    email: string,
    mobile: number,
    password: string,
    role: 'user | admin',
}

