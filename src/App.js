import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [departmentData, setDepartmentData] = useState([]);
  // const [locationUpdates, setLocationUpdates] = useState([]);

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
      console.log(value)
      setDepartmentData()
      setSelectedDepartment(value);
    };

    const handleDateChange = (event) => {
      const value = event.target.value;
      console.log(value)
      setDepartmentData()
      setSelectedDate(value);
    };
  
  const handleGetDataClick = () => {
    console.log("inside button");
      getOrderData(selectedDepartment, selectedDate);
    };
  
  const getOrderData = async (selectedDepartment, selectedDate) => {
      console.log("inside getOrderData");
      let response;
      if (selectedDepartment === "Picking Team") {
        response = await axios.get(`${baseUrl}/lineItemCount?orderDate=${selectedDate}`)
        console.log(response.data.lineItemCounts)
        getPickerList(response.data.lineItemCounts)
      }
      else if (selectedDepartment === "Packing Team") {
        
      console.log("inside getOrderData else if");
        response = await axios.get(`${baseUrl}/orders?orderDate=${selectedDate}`)
        console.log(response.data)
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
    console.log(itemToSell)
    setDepartmentData(itemToSell)
  }
  

  return (
  <div className="App" >
    <div className="App" style={{padding: '10px'}}>
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
        {console.log("selectedDepartment "+selectedDepartment)}
          <div style={{ paddingTop: '20px' }}>
          <button
            onClick={handleGetDataClick}
            disabled={!selectedDepartment || !selectedDate || selectedDepartment === "Select Department" || selectedDate === "Select Date"}>
            Get Data
          </button>
          </div>
    </div>


  <div style={{ marginTop: '50px' }}>
     <table>
      <tbody>
        <td>
          {departmentData.map((item, index) => (
            <tr key={index}>{item}</tr>
          ))}
        </td>
      </tbody>
    </table>
  </div>
</div>

  
  );
}

export default App;