// __mocks__/firebase.js
const getFirestore = jest.fn(() => ({
    collection: jest.fn(() => ({
      getDocs: jest.fn(() => Promise.resolve({
        docs: [
          { data: () => ({ Name: 'Event 1', Organisation: 'Org 1', ApplicationPeriod: '2024-12-31', Description: 'Description 1', Contact: 'Contact 1', signUpLink: '#' }) },
          { data: () => ({ Name: 'Event 2', Organisation: 'Org 2', ApplicationPeriod: '2024-11-30', Description: 'Description 2', Contact: 'Contact 2', signUpLink: '#' }) },
        ],
      })),
    })),
  }));
  
  export { getFirestore };
  