import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [departmentData, setDepartmentData] = useState();
  // const [locationUpdates, setLocationUpdates] = useState([]);

  const Departments = ["Picking Team","Packing Team"]

  const baseUrl = "http://localhost:3001";  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}\\order-dates`);
        console.log('response')
        console.log(response)
        setAvailableDates(Array.from(new Set(response.data)));
      } catch (error) {
        console.error('Error fetching Route Session IDs:', error);
      }
    };
    fetchData();
  }, []);
  
  // useEffect(() => {
  //   const fetchData = async () => {

  //     if (selectedDate !== null) {
  //       try {
  //         const response = await axios.get(`${baseUrl}?route_session_id=${selectedRouteSessionId}`);
  //         setLocationUpdates(response.data.map((coordinate) => {
  //           return { latitude: coordinate[0], longitude: coordinate[1] };
  //         }));
  //       } catch (error) {
  //         console.error('Axios error:', error);
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [selectedDate]);
  

  const handleDepartmentChange = (event) => {
    const value = event.target.value;
    console.log(value)
    setSelectedDepartment(value);
  };

    const handleDateChange = (event) => {
    const value = event.target.value;
    console.log(value)
    setSelectedDate(value);
    };
  
  
  const getData = (selectedDepartment, selectedDate) => {
    if (selectedDepartment === "Picking Team") {
        
    }
    if (selectedDepartment === "Packing Team") {
        
      }
  };

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
            onClick={getData(selectedDepartment, selectedDate)}
            disabled={!selectedDepartment || !selectedDate || selectedDepartment === "Select Department" || selectedDate === "Select Date"}>
            Get Data
          </button>
          </div>
    </div>

</div>

  
  );
}

export default App;