export interface UserParams {
  id?: string,
  login?: string,
  username?: string,
  email?: string,
  dateOfRegistration?: string,
  password?: string,
  isAdmin?:boolean,
  orders?: any[],
  imageURL?: string,
  wishes?: any[]
}
