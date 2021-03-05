import React from 'react'
import {AiFillFileAdd} from "react-icons/ai"

import {storage, database} from "../authentication/firebase"
import {useAuth} from "../context/auth-context"
import {ROOT_FOLDER} from "./folder-reducer"

export default function AddFileButton({currFolder}){
    const {currUser}=useAuth()
    function handleUpload(e){
        const file=e.target.files[0]
        if(!file || !currFolder) return

        const filePath=
            currFolder===ROOT_FOLDER? 
            `${currFolder.path.join("/")}/${file.name}`:
            `${currFolder.path.join("/")}/${currFolder.name}/${file.name}`
            
        const upload=storage.ref(`/files/${currUser.uid}/${filePath}`).put(file)
        upload.on("state_changed",snap=>{},()=>{},()=>{
            upload.snapshot.ref.getDownloadURL().then(url=>{
                database.files.add({
                    url,
                    name: file.name,
                    createdAt: new Date().toLocaleDateString(),
                    folderId: currFolder.id,
                    userId: currUser.uid
                })
            })
        })
    }
    return (
        <label htmlFor="file-input" className="btn btn-outline-success btn-sm m-0 mr-2">
            <AiFillFileAdd style={{fontSize: 32}}/>
            <input id="file-input" type="file" onChange={handleUpload} style={{opacity: 0, position: "absolute", right: 9999}}/>
        </label>
    )
}
