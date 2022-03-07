import React, {useState} from 'react';
import ItemRow from './ItemRow';
const axios = require("axios");

export default function Challenge() {
  
  const [items, setItems] = useState();
  const [lowestPrice, setLowestPrice] = useState(0);
  
  const getOutOfStock = () => {
    axios.get("http://localhost:4567/low-stock").then(function (response){
      setItems(response.data);
    }).catch(function(error){});
  }

  const getLowestStock = () => {
    let getRestock = items.map((item) => {
      return {
        itemName: item.name,
        amount: item.orderAmount ? item.orderAmount: 0
      }
    });
    axios({
      method: "post",
      url: "http://localhost:4567/restock-cost",
      data: getRestock
    }).then(function(response){
      setLowestPrice(response.data);
    }).catch(function(error){});
  }

   const listItems = items?.map((item) => (
     <ItemRow 
       key={item.id}
       sku={item.id}
       itemName={item.name}
       stock={item.stock}
       capacity={item.capacity}
       onChange={(e) => {
         let updateItems = items;
         updateItems[
           updateItems.findIndex((itemToUpdate) => itemToUpdate.id === item.id)
         ].orderAmount = e.target.value;
         setItems(updateItems);
       }}
     />
   ))
  
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
          listItems
          }
        </tbody>
      </table>
      {/* TODO: Display total cost returned from the server */}
      <div>Total Cost:{lowestPrice} </div>
      {/* 
      TODO: Add event handlers to these buttons that use the Java API to perform their relative actions.
      */}
      <button onClick={getOutOfStock} >Get Low-Stock Items</button>
      <button onClick={getLowestStock} >Determine Re-Order Cost</button>
    </>
  );
}
