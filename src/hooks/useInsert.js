import { useEffect } from "react"
import { BASE_URL } from "../components/Actions"
import { useState } from "react"

const useInsert = (data) => {

    const [insert, setInsert] = useState(data)

    useEffect(() => {
        if(data) {
            fetch(BASE_URL + 'reg/insertadmin', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    setInsert(data)
                })
                .catch(e => console.log(e.message))
        }
    }, [data])

    return [insert]
}

export default useInsert