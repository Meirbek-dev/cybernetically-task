import axios from "axios";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { setStockData, setCurrentPage } from "../redux/stockSlice";
import data from "../assets/headers.json";
import PaginationButton from "./button";

export interface Stock {
  companyName: string;
  symbol: string;
  primaryExchange: string;
  latestPrice: string;
  highSource: string;
  volume: number;
  marketCap: number;
}

const fetchStockData = async (apiUrl: string, dispatch) => {
  try {
    const response = await axios.get(apiUrl);
    dispatch(setStockData(response.data));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

interface StockTableProps {
  apiUrl: string;
}

const StockTable = ({ apiUrl }: StockTableProps) => {
  const { headers } = data;
  const stocksPerPage = 10;
  const dispatch = useDispatch();
  const stockData = useSelector((state) => state.stocks.stockData);
  const currentPage = useSelector((state) => state.stocks.currentPage);

  useEffect(() => {
    fetchStockData(apiUrl, dispatch);
  }, [dispatch, apiUrl]);

  const lastIndex = currentPage * stocksPerPage;
  const firstIndex = lastIndex - stocksPerPage;
  const visibleStocks = useMemo(
    () => stockData.slice(firstIndex, lastIndex),
    [stockData, firstIndex, lastIndex],
  );

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              {headers.map(({ title }, index) => (
                <TableCell key={index}>{title}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleStocks.map((stock: Stock, rowIndex: number) => (
              <TableRow key={rowIndex}>
                <TableCell>{firstIndex + rowIndex + 1}</TableCell>
                {headers.map(({ title }, colIndex) => (
                  <TableCell key={colIndex}>{stock[title]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        text="Previous"
      />
      <PaginationButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={lastIndex >= stockData.length}
        text="Next"
      />
    </div>
  );
};

export default StockTable;
