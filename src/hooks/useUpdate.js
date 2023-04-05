import { useState } from "react"
import { useEffect } from "react"

const useUpdate = (data, key) => {

    const [updateData, setUpdateData] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3001/reg/updateadmin/${key?.id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setUpdateData(data)
            })
            .catch(e => console.log(e.message))
    }, [data, key])

    return [updateData]

}

export default useUpdate