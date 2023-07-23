import {useState} from 'react'

import './App.css'

const AirportTransferApp = () => {
  const [fromLocation, setFromLocation] = useState('')
  const [toLocation, setToLocation] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [returnTransfer, setReturnTransfer] = useState(false)
  const [returnDate, setReturnDate] = useState('')
  const [returnTime, setReturnTime] = useState('')
  const [passengerCount, setPassengerCount] = useState(0)

  const handleSearch = () => {
    const apiUrl = 'https://api.example.com/search'
    const queryParams = {
      fromLocation,
      toLocation,
      date,
      time,
      returnTransfer,
      returnDate,
      returnTime,
      passengerCount,
    }

    const queryString = Object.keys(queryParams)
      .map(
        key =>
          `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`,
      )
      .join('&')

    fetch(`${apiUrl}?${queryString}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        return response.json()
      })
      .then(data => {
        console.log('API Response:', data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }

  return (
    <div className="app-container">
      <h1 className="heading">Airport Transfer Booking</h1>
      <div className="form-group">
        <div>
          <label className="label" htmlFor="fromLocation">
            From:
          </label>
          <input
            id="fromLocation"
            className="input"
            type="text"
            value={fromLocation}
            onChange={e => setFromLocation(e.target.value)}
            placeholder="Start typing your pickup location"
          />
        </div>
        <div>
          <label className="label" htmlFor="toLocation">
            To:
          </label>
          <input
            id="toLocation"
            className="input"
            type="text"
            value={toLocation}
            onChange={e => setToLocation(e.target.value)}
            placeholder="Start typing your dropOff location"
          />
        </div>
      </div>
      <div className="date-time-input">
        <div>
          <label className="label" htmlFor="date">
            Date:
          </label>
          <input
            id="date"
            className="input date-input"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="time">
            Time:
          </label>
          <input
            id="time"
            className="input time-input"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </div>
      </div>
      <div className="return-transfer">
        <input
          type="checkbox"
          id="returnTransfer"
          checked={returnTransfer}
          onChange={() => setReturnTransfer(prev => !prev)}
        />
        <label className="return-transfer-label" htmlFor="returnTransfer">
          {returnTransfer ? 'Return Date:' : '+ Add Return'}
        </label>
      </div>
      {returnTransfer && (
        <div className="date-time-input">
          <div>
            <label className="label" htmlFor="returnDate">
              Return Date:
            </label>
            <input
              id="returnDate"
              className="input date-input"
              type="date"
              value={returnDate}
              onChange={e => setReturnDate(e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="returnTime">
              Return Time:
            </label>
            <input
              id="returnTime"
              className="input time-input"
              type="time"
              value={returnTime}
              onChange={e => setReturnTime(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="passenger-input">
        <label className="passenger-label" htmlFor="passengerCount">
          {passengerCount} Adults
        </label>
        <input
          id="passengerCount"
          className="passenger-count"
          type="range"
          min="1"
          max="10"
          value={passengerCount}
          onChange={e => setPassengerCount(e.target.value)}
        />
      </div>
      <button type="button" className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  )
}

export default AirportTransferApp
