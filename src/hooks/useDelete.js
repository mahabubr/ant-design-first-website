import { useState } from "react"
import { useEffect } from "react"

const useDelete = (key) => {

    const [deletedItem, setDeletedItem] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3000/reg/deleteadmin/${key}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                setDeletedItem(data)
            })
            .catch(e => console.log(e.message))
    }, [key])
    return [deletedItem]
}

export default useDelete