import React, { useState, useEffect } from 'react'
import customFetcher from '../utils/fetchInstance'

function Categories() {
    const [category, setCategory] = useState([])

    useEffect(() => {
      customFetcher('http://127.0.0.1:5000/api/v1/categories')
      .then(({data}) => setCategory(data))
      .catch(error => console.error('Error fetching categories', error))
    }, [])
  return (
    <div>
      {category.map(cat => (
        <div key={cat.id}>
             <div>{cat.name}</div>
             {console.log(cat.name)}
        </div>
      ))}      
    </div>
  )
}

export default Categories