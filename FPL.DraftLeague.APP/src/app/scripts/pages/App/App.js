import React from 'react';
import Header from './../../components/Header/Header'

const App = (props) => {
  return (
    <div>
      <Header />
      <div className="content">
        {props.children}
      </div>
    </div>
  );
};

export default App;
