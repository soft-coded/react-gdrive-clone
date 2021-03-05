import React from 'react'
import {Breadcrumb} from "react-bootstrap"
import { Link } from 'react-router-dom'

import {ROOT_FOLDER} from "./folder-reducer"

export default function FolderBreadcrumbs({currFolder}){
    let path=currFolder===ROOT_FOLDER? []: [ROOT_FOLDER]
    if(currFolder) path=[...path, ...currFolder.path]
    return (
        <Breadcrumb 
            className="flex-grow-1" 
            listProps={{className: "p-0 m-0", style: {background: "#000", fontSize: 25}}}
        >
            {path.map(folder=>
                <Breadcrumb.Item 
                    key={folder.id} 
                    className="text-truncate d-inline-block" 
                    style={{maxWidth: 150}} 
                    linkAs={Link}
                    linkProps={{
                        to: folder.id? `/folder/${folder.id}`: "/"
                    }} 
                >  
                    {folder.name}
                </Breadcrumb.Item>
            )}

            {currFolder && (
                <Breadcrumb.Item className="text-truncate d-inline-block" style={{maxWidth: 200, color: "grey"}} active> 
                    {currFolder.name}
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    )
}
