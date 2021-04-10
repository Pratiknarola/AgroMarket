import React from 'react'
import {useParams} from 'react-router-dom'
const BidPage = ({match}) => {

    const {id} = useParams()

    return (
        <div>
            {console.log(id)}
        </div>
    )
}

export default BidPage
