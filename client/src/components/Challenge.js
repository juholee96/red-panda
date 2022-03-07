import React, {useState} from 'react';
import ItemRow from './ItemRow';
const axios = require("axios");

export default function Challenge() {
  
  const [lowStock, setLowStock] = useState({
    data: '',
    loading: true
  });
  const [restockCost, setRestockCost] = useState([]);
  
  const handleClickLowStock = async() => {
    const data = await axios.get('http://localhost:4567/low-stock');
    setLowStock({
      data: data.data,
      loading: false
    });
  }

  const handleClickReorderCost = async() => {
    const data = await axios.post('http://localhost:4567/restock-cost', lowStock.data);
    setRestockCost(data.data);
  }
  
  return (
    <>
      <table>
        <thead>
          <tr>
            <td>SKU</td>
            <td>Item Name</td>
            <td>Amount in Stock</td>
            <td>Capacity</td>
            <td>Order Amount</td>
          </tr>
        </thead>
        <tbody>
          {/* 
          TODO: Create an <ItemRow /> component that's rendered for every inventory item. The component
          will need an input element in the Order Amount column that will take in the order amount and 
          update the application state appropriately.
          */
          lowStock.loading?'':lowStock.data.map(item => 
          <ItemRow key={item.id} item={item} lowStock={lowStock} setLowStock={setLowStock} />)
          }
        </tbody>
      </table>
      {/* TODO: Display total cost returned from the server */}
      <div>Total Cost: {Math.round((restockCost + Number.EPSILON) * 100) / 100} </div>
      {/* 
      TODO: Add event handlers to these buttons that use the Java API to perform their relative actions.
      */}
      <button onClick={handleClickLowStock}>Get Low-Stock Items</button>
      <button onClick={handleClickReorderCost}>Calculate Re-Stock Cost</button>
    </>
  );
}
