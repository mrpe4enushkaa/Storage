import React, { useEffect, useState } from "react";
import MoreIcon from "../../../images/More.svg?react";
import FolderIcon from "../../../images/Folder.svg?react";
import FileIcon from "../../../images/File.svg?react";

export default function ProfileFiles({ filesBlock }) {
    const [name, setName] = useState("");
    const [files, setFiles] = useState([]);

    useEffect(() => { console.log(name) }, [name]);
    useEffect(() => { console.log(files) }, [files]);

    const addDocument = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        files.forEach(file => {
            formData.append("files", file);
        });
        formData.append("name", name);

        const response = await fetch("http://localhost:3000/api/addDocument", {
            method: "POST",
            body: formData,
            credentials: "include"
        });

        console.log(response);
    }

    return (
        <section className='profile--files hidden' ref={filesBlock}>
            <div className="profile--files__file">
                <FolderIcon className="icon icon--folder" />
                <span className="font-regular profile--files__file--text">My-file_1</span>
                <MoreIcon className="icon icon--more" />
            </div>
            <div className="profile--files__file">
                <FileIcon className="icon icon--file" />
                <span className="font-regular profile--files__file--text">My-file_1</span>
                <MoreIcon className="icon icon--more" />
            </div>

            <form onSubmit={addDocument}>
                <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
                <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files))} />
                <button type="submit">submit</button>
            </form>
        </section>
    );
}