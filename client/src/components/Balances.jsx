import React from "react";
import "../App.scss";
const Balances = ({ balances }) => {
  const renderRows = Object.entries(balances).map(([address, balance]) => (
    <tr key={address}>
      <td>{address}</td>
      <td>{balance}</td>
    </tr>
  ));

  return (
    <div className="container">
      <table className="balance-table">
        <thead>
          <tr>
            <th>Address</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>{renderRows}</tbody>
      </table>
    </div>
  );
};

export default Balances;
