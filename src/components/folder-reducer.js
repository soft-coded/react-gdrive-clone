import {useReducer, useEffect} from "react"
import {database} from "../authentication/firebase"
import {useAuth} from "../context/auth-context"

const ACTIONS={
    SELECT_FOLDER: "select_folder",
    UPDATE_FOLDER: "update_folder",
    SET_CHILD_FOLDERS: "set_child_folders",
    SET_CHILD_FILES: "set_child_files"
}

export const ROOT_FOLDER={id: null, path: [], name: "Root"}

function reducer(state, action){
    switch (action.type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: action.payload.folderId,
                folder: action.payload.folder,
                childFolders: [],
                childFiles: []
            }

        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: action.payload.folder
            }

        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders: action.payload.childFolders
            }

        case ACTIONS.SET_CHILD_FILES:
            return {
                ...state,
                childFiles: action.payload.childFiles
            }
    
        default:
            return state
    }
}

export default function useFolderReducer(folderId=null, folder=null){
    const {currUser}=useAuth()
    const [state,dispatch]=useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    })

    useEffect(()=>{
        dispatch({type: ACTIONS.SELECT_FOLDER, payload: {
            folderId,
            folder
        }})
    },[folder, folderId])

    useEffect(()=>{
        if(folderId==null)
            return dispatch({type: ACTIONS.UPDATE_FOLDER, payload: {
                folder: ROOT_FOLDER
            }})
        database.folders.doc(folderId).get().then(doc=>{
            dispatch({type: ACTIONS.UPDATE_FOLDER, payload: {
                folder: database.formatDoc(doc)
            }})
        }).catch(()=>{
            dispatch({type: ACTIONS.UPDATE_FOLDER, payload: {
                folder: ROOT_FOLDER
            }})
        })

    },[folderId])

    useEffect(()=>{
        return database.folders
            .where("parentId","==",folderId)
            .where("userId", "==",currUser.uid)
            .orderBy("createdAt")
            .onSnapshot(snap=>{
                dispatch({type: ACTIONS.SET_CHILD_FOLDERS, payload: {
                    childFolders: snap.docs.map(database.formatDoc)
                }})
            })
    },[folderId, currUser])

    useEffect(()=>{
        return database.files
            .where("folderId","==",folderId)
            .where("userId", "==",currUser.uid)
            .orderBy("createdAt")
            .onSnapshot(snap=>{
                dispatch({type: ACTIONS.SET_CHILD_FILES, payload: {
                    childFiles: snap.docs.map(database.formatDoc)
                }})
            })
    },[folderId, currUser])

    return state
}