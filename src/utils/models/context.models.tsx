export interface IAuthData {
  currentUser: ICurrentUser | null,
  setUser: (user: any) => void, //TODOCRH: review any
  logout: () => void,
}

export interface ICurrentUser {
  username: string,
  score: number,
  language: string,
  theme: string,
  render: string,
  createdAt: string,
  updatedAt: string,
  id: number | null,
}
