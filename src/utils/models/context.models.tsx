export interface IAuthData {
  currentUser: any | null, //TODOCRH: to type
  setUser: (user: any) => void, //TODOCRH: review any
  logout: () => void,
}
