import React, {useState, createContext} from 'react';

export const bookApiContext = createContext();

export const BookProvider = stfNthngs =>{
     const [books, setBooks] = useState([]);
     return(
          <bookApiContext.Provider value={[books, setBooks]}>
               {stfNthngs.children}
          </bookApiContext.Provider>
     );
};