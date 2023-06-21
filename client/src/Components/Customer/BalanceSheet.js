import React, {useState , useEffect} from 'react'
import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'

const BalanceSheet = () => {

 const [cash, setCash] =useState([{}])
  const cashdata = async () => {

    const res = await fetch("http://localhost:8000/cashsales", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const getcashdata = await res.json()

    
    const cashinhand = getcashdata[0].total["$numberDecimal"];


    console.log(cashinhand)

    if (res.status === 422 || ! getcashdata) {
        console.log("error ");

    } else {
      setCash(cashinhand)
        console.log("got cash data ");


    }
}

useEffect(() => {
  cashdata();
  
}, [])
  const assets = [
    { name: 'Cash', amount: `${cash}` },
    { name: 'Accounts Receivable', amount: 10000 },
    { name: 'Inventory', amount: 15000 },
  ];

  const liabilities = [
    { name: 'Accounts Payable', amount: 8000 },
    { name: 'Loans Payable', amount: 0 },
  ];

  const equity = [
    { name: "Owner's Capital", amount: 0 },
  ];

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + Number(item.amount), 0);
  };

  return (
    <div className='flex'>

            <div>
                <SuperAdminNavbar/>
            </div>
    <div className="container mx-auto px-4 pt-5">
      <h2 className="text-2xl font-bold mb-4">Balance Sheet Report</h2>

      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2 text-left">Assets</th>
            <th className="py-2 text-left">Liabilities</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border">
              {assets.map((asset, index) => (
                <div key={index} className="flex justify-between py-2 px-4">
                  <div>{asset.name}</div>
                  <div>{asset.amount}</div>
                </div>
              ))}
              <div className="flex justify-between py-2 px-4 font-bold">
                <div>Total Assets:</div>
                <div>{calculateTotal(assets)}</div>
              </div>
            </td>
            <td className="border">
              {liabilities.map((liability, index) => (
                <div key={index} className="flex justify-between py-2 px-4">
                  <div>{liability.name}</div>
                  <div>{liability.amount}</div>
                </div>
              ))}
              {equity.map((equityItem, index) => (
                <div key={index} className="flex justify-between py-2 px-4">
                  <div>{equityItem.name}</div>
                  <div>{equityItem.amount}</div>
                </div>
              ))}
              <div className="flex justify-between py-2 px-4 font-bold">
                <div>Total Liabilities:</div>
                <div>
                  {calculateTotal(liabilities) + calculateTotal(equity)}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default BalanceSheet;
