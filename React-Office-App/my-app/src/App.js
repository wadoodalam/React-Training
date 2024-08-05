import './App.css';
import { RenderTable } from './Components/OfficeTable';
import { OfficeContextProvider } from './Context/OfficeContext';
/**
 * 
 * 

 */
function App() {

  return (
    <OfficeContextProvider>
      <div>
        <RenderTable />
      </div>
    </OfficeContextProvider>
  );
}

export default App;
