export interface User {
    userId?: string,
    login: string,
    username?: string,
    email?: string,
    dateOfRegistration?: string,
    password: string,
    isAdmin?: boolean,
    orders?: any[],
    wishes?: any[]
}

