import React, {useState} from 'react'
import {Container, Button} from "react-bootstrap"
import {AiFillFolderAdd} from "react-icons/ai"
import {useParams} from "react-router-dom"

import Navbar from "./navbar"
import NewFolderModal from "./new-folder-modal"
import useFolderReducer from "./folder-reducer"
import Folder from './folder'
import File from './file'
import AddFileButton from './add-file-button'
import FolderBreadcrumbs from "./folder-breadcrumbs"

export default function Dashboard() {
    const {folderId}=useParams()
    const [openFolder, setOpenFolder]=useState(false)
    const {folder, childFolders, childFiles}=useFolderReducer(folderId)
    return (
        <>
            <Navbar/>
            <Container fluid className="mt-3">
                <div className="d-flex align-items-center">
                    <FolderBreadcrumbs currFolder={folder} />
                    <AddFileButton currFolder={folder} />
                    <Button variant="outline-success" size="sm" onClick={()=>setOpenFolder(true)}>
                        <AiFillFolderAdd style={{fontSize: 35}}/>
                    </Button>
                    <NewFolderModal show={openFolder} setShow={setOpenFolder} currentFolder={folder}/>
                </div>
                {childFolders.length? (
                    <div className="d-flex flex-wrap">
                        {childFolders.map(child=>{
                            return <div key={child.id} style={{maxWidth: 250}} className="mr-2 mt-2">
                                <Folder folder={child}/>
                            </div>
                        })}
                    </div>
                ): <h2 className="text-light">Loading</h2>}
                {(childFolders.length>0 && childFiles.length>0) && <hr style={{backgroundColor:"#fff"}}/>}
                {childFiles.length>0 && (
                    <div className="d-flex flex-wrap">
                        {childFiles.map(child=>{
                            return <div key={child.id} style={{maxWidth: 250}} className="mr-2 mt-2">
                                <File file={child}/>
                            </div>
                        })}
                    </div>
                )}
            </Container>
        </>
    )
}
