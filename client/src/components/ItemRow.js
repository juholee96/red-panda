
export default function ItemRow(props){
    return (
        <tr>
            <td> {props.sku} </td>
            <td> {props.itemName} </td>
            <td> {props.stock} </td>
            <td> {props.capacity} </td>
        </tr>
    );
}