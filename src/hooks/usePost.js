import { useState } from "react"
import { useEffect } from "react"
import { BASE_URL } from "../components/Actions"

const usePost = () => {

    const [info, setInfo] = useState([])

    useEffect(() => {
        fetch(BASE_URL + 'reg/index')
            .then(res => res.json())
            .then(data => setInfo(data))
    }, [])

    return [info]

}

export default usePost