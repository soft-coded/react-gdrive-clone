import React from 'react'
import {AiFillFile} from "react-icons/ai"

export default function File({file}) {
    return (
        <a href={file.url} rel="noreferrer" target="_blank" className="btn btn-outline-light text-truncate w-100">
            <AiFillFile className="mr-2"/>
            {file.name} 
        </a>
    )
}
