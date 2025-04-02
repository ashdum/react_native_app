export interface GridData {
    id: string;
    col1: string;
    col2: string;
    col3: boolean;
    col4: string;
    col5: Date;
  }
  
  export const mockGrid = {
    fetchData: (): Promise<GridData[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: '1',
              col1: 'Sample Data 1',
              col2: 'Option A',
              col3: true,
              col4: 'Text 1',
              col5: new Date(),
            },
          ]);
        }, 500); // Имитация задержки сети
      });
    },
  };