import React from 'react'

interface Props{
    products: [] | null;
}

const Table = ({products}: Props) => {
  return (
    <table>
        <tbody>
            <tr>
                <td>Monthly Price</td>
                {/* <td>{products?[1].primary.price}</td>
                <td>{products?[2].standard.price}</td>
                <td>{products?[0].premium.price}</td> */}
            </tr>
        </tbody>
    </table>
  )
}

export default Table