import "./App.css";
import Stocks from "./components/stocks";

function App() {
  const apiToken = import.meta.env.VITE_IEXCLOUD_API_TOKEN;
  const apiUrl = `https://api.iex.cloud/v1/data/core/stock_collection/sector?collectionName=Technology&token=${apiToken}`;

  return (
    <>
      <h1>iex cloud stocks</h1>
      <Stocks apiUrl={apiUrl} />
    </>
  );
}

export default App;
