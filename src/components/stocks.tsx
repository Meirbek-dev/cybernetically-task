import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "../assets/data.json";
import axios from "axios";
import { setStockData, setCurrentPage } from "../redux/stockSlice";

const Stocks = (apiUrl: string) => {
  const { data } = data;
  const stocksPerPage = 10;
  const dispatch = useDispatch();
  const stockData = useSelector((state) => state.stocks.stockData);
  const currentPage = useSelector(
    (state) => state.stocks.currentPage
  );

  useEffect(() => {
    const fetchStockData = async () => {
      const response = await axios.get(apiUrl);
      dispatch(setStockData(response.data));
    };
    fetchStockData();
  }, [dispatch, apiUrl]);

  const lastIndex = currentPage * stocksPerPage;
  const firstIndex = lastIndex - stocksPerPage;
  const currentStocks = stockData.slice(firstIndex, lastIndex);

  const goToPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <table className="w-[90vw] h-[70vh]">
        <thead>
          <tr className="border">
            {thData.map((tableHeader, index) => (
              <th className="text-left p-2" key={index}>
                {tableHeader.thName}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentStocks.map((stock, index) => (
            <tr key={index} className="border py-4">
              <td className="py-2 pl-2">{firstIndex + index + 1}</td>
              <td className="pl-2">{stock.companyName}</td>
              <td className="pl-2">{stock.primaryExchange}</td>
              <td>{stock.highSource}</td>
              <td className="pl-6">{stock.volume}</td>
              <td className="px-4">{stock.symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination flex gap-4 py-6">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo; Previous
        </button>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={lastIndex >= stockData.length}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default Stocks;
