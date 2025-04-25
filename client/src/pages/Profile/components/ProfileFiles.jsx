import React from "react";
import MoreIcon from "../../../images/More.svg?react";
import FolderIcon from "../../../images/Folder.svg?react";
import FileIcon from "../../../images/File.svg?react";

export default function ProfileFiles({ filesBlock }) {
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
        </section>
    );
}