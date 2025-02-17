import React from "react";
import AppRouter from "./routes/AppRouter";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <p className="bg-lime-300 p-50">APA inni</p>
      <AppRouter />
    </ErrorBoundary>  
    
  );
};

export default App;
