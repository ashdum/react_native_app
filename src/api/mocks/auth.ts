export const mockAuth = {
    login: (username: string, password: string): Promise<{ token: string }> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === 'a' && password === 'a') {
                    resolve({ token: 'mock_jwt_token_12345' });
                } else {
                    reject(new Error('Неверные учетные данные'));
                }
            }, 500);
        });
    },
};