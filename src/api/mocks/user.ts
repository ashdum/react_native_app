export interface UserData {
    username: string;
    firstName: string;
    lastName: string;
  }
  
  export const mockUser = {
    fetchUser: (): Promise<UserData> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            username: 'testuser',
            firstName: 'Иван',
            lastName: 'Иванов',
          });
        }, 500); // Имитация задержки сети
      });
    },
  };