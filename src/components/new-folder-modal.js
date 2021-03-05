import React, {useRef} from 'react'
import {Modal, Form, Button} from "react-bootstrap"

import {database} from "../authentication/firebase"
import {useAuth} from "../context/auth-context"
import {ROOT_FOLDER} from "./folder-reducer"

export default function NewFolderModal({show, setShow, currentFolder}) {
    const folderNameRef=useRef()
    const {currUser}=useAuth()
    function handleSubmit(e){
        e.preventDefault()
        if(!currentFolder) return
        const path=[...currentFolder.path]
        if(currentFolder!==ROOT_FOLDER)
            path.push({id: currentFolder.id, name: currentFolder.name})
            
        database.folders.add({
            name: folderNameRef.current.value,
            userId: currUser.uid,
            parentId: currentFolder.id,
            path: path,
            createdAt: new Date().toLocaleString()
        })
        setShow(false)
        folderNameRef.current.value=""
    }

    return (
        <Modal show={show} onHide={()=>setShow(false)} centered size="lg">
            <Modal.Header className="bg-dark text-light">
                <Modal.Title><strong>Add new folder</strong></Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body className="bg-dark text-light">
                    <Form.Group>
                        <Form.Label>Folder Name</Form.Label>
                        <Form.Control type="text" required ref={folderNameRef}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="bg-dark text-light">
                    <Button className="btn-success" type="submit">Create</Button>
                    <Button className="btn-danger" onClick={()=>setShow(false)}>Cancel</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
