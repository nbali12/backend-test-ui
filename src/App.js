import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [departmentData, setDepartmentData] = useState([]);

  const Departments = ["Picking Team","Packing Team"]

  const baseUrl = "http://localhost:3001";  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderDates = await axios.get(`${baseUrl}/orderDates`);
        setAvailableDates(Array.from(new Set(orderDates.data)));
      } catch (error) {
        console.error('Error fetching Route Session IDs:', error);
      }
    };
    fetchData();
  }, []);

    const handleDepartmentChange = (event) => {
      const value = event.target.value;
      setDepartmentData([])
      setSelectedDepartment(value);
    };

    const handleDateChange = (event) => {
      const value = event.target.value;
      setDepartmentData([])
      setSelectedDate(value);
    };
  
  const handleGetDataClick = () => {
      getDisplayData(selectedDepartment, selectedDate);
    };
  
  const getDisplayData = async (selectedDepartment, selectedDate) => {
      let response;
      if (selectedDepartment === "Picking Team") {
        response = await axios.get(`${baseUrl}/lineItemCount?orderDate=${selectedDate}`)
        getPickerList(response.data.lineItemCounts)
      }
      else if (selectedDepartment === "Packing Team") {
        response = await axios.get(`${baseUrl}/orders?orderDate=${selectedDate}`)
        setDepartmentData(response.data)
      }
      // setDepartmentData(response.data);
    };
  
  const getPickerList = (data) => {

    const itemToSell = [];
    itemToSell.push(`Red Roses Bouquet x${data.ValentinesBox}`)
    itemToSell.push(`Box of chocolates x${data.ValentinesBox}`)
    itemToSell.push(`Love card x${data.ValentinesBox}`)
    itemToSell.push(`Womens perfume x${data.ValentinesBox}`)
    itemToSell.push(`Birthday cupcake x${data.BirthdayBox}`)
    itemToSell.push(`$100 Visa Gift Card x${data.BirthdayBox}`)
    itemToSell.push(`Birthday card x${data.BirthdayBox}`)
    itemToSell.push(`Bottle of wine x${data.ClientGiftBox}`)
    itemToSell.push(`Fruit basket x${data.ClientGiftBox}`)
    itemToSell.push(`Pen x${data.ClientGiftBox}`)
    setDepartmentData(itemToSell)

  }
  
  const renderLineItems = (lineItems) => {
    return (
      <ul>
        {Object.keys(lineItems[0]).map((boxName) => (
          <div key={boxName}>
            <h4>{boxName}</h4>
            <ul>
              {lineItems[0][boxName].contains.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    );
  }
  

  return (
  <div className="App" style={{padding: '10px'}}>
    <div className="App" style={{padding: '30px'}}>
      <div>
        <h2>Select Department:</h2>
        <select
          style={{ fontSize: '20px' }}
          onChange={handleDepartmentChange}
          value={selectedDepartment}
        >
          <option>Select Department</option>
          {Departments.map((Department) => (
            <option key={Department} value={Department}>
              {Department}
            </option>
          ))}
        </select>
      </div>
      <div >
        <h2>Select Date:</h2>
        <select
          style={{ fontSize: '20px' }}
          onChange={handleDateChange}
          value={selectedDate}
        >
          <option >Select Date</option>
          {availableDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
        </div>
          <div style={{ paddingTop: '20px' }}>
          <button
            onClick={handleGetDataClick}
            disabled={!selectedDepartment || !selectedDate || selectedDepartment === "Select Department" || selectedDate === "Select Date"}>
            Get Data
          </button>
          </div>
    </div>
    <div >
      <table>
        <tbody>
            <td>
              {selectedDepartment === "Packing Team" &&
                (
                <div>
                  {departmentData.map((order) => (
                    <div key={order.orderNumber}>
                      <h2>Order #{order.orderNumber}</h2>
                      <p>
                        <strong>Order Date:</strong> {order.orderDate}
                      </p>
                      <h3>Line Items</h3>
                      {renderLineItems(order.lineItems)}
                      <h3>Ships to</h3>
                      <p>{order.shipTo.name}</p>
                      <p>{order.shipTo.address}</p>
                      <p style={{ borderTop: '1px solid #000', marginTop: '10px', paddingTop: '10px', width:'500px' }} />        
                    </div>
                  ))}
                </div>
                )
              }
              {selectedDepartment === "Picking Team" &&
                (
                <div>
                  {departmentData.map((item, index) => (
                    <tr key={index}>
                      <ul>
                        <li>
                          <span>{item.slice(0, -2)}</span>
                          <span style={{ fontWeight: 'bold' }}>{item.slice(-2)}</span>
                        </li>
                      </ul>
                    </tr>
                  ))}
                </div>
                )
              }
          </td>
        </tbody>
      </table>
    </div>
</div>

  
  );
}

export default App;