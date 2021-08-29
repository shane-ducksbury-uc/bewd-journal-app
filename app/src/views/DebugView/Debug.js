import { React, useState } from 'react'
import axios from 'axios'

function Debug() {

    const [formData, updateFormData] = useState()

    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim(),
        });
      };
    
    const checkEndpoint = async () => {
        try {
            const url = formData.url
            const response = await axios.get(`${url}`)
            console.log('Bingo.')
            console.log(response)
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div>
            <label htmlFor="url" required>URL</label>
            <input type="text" name="url" onChange={handleChange} />
            <button onClick={checkEndpoint}>Check Error</button>
        </div>
    )
}

export default Debug
