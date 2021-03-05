import React from 'react'
import {Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import {AiFillFolder} from "react-icons/ai"

export default function Folder({folder}) {
    return (
        <Button as={Link} to={`/folder/${folder.id}`} variant="outline-primary" className="text-truncate w-100">
            <AiFillFolder className="mr-2" style={{fontSize: 30}}/>
            {folder.name}
        </Button>
    )
}
