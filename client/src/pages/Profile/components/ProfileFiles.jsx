import React from "react";
// import MoreIcon from "../../../images/More.svg?react";
import FolderIcon from "../../../images/Folder.svg?react";
import FileIcon from "../../../images/File.svg?react";
import PasswordIcon from "../../../images/Password.svg?react";

export default function ProfileFiles({ filesBlock, data }) {
    return (
        <section className='profile--files hidden' ref={filesBlock}>
            {/* <div className="profile--files__file">
                <FolderIcon className="icon icon--folder" />
                <span className="font-regular profile--files__file--text">My-file_1</span>
                <MoreIcon className="icon icon--more" />
            </div> */}
            {Array.isArray(data?.data) && data.data.length > 0 ? (
                data.data.map((item, index) => (
                    <div className="profile--files__file" key={index}>
                        {item.type === "password" ? (
                            <PasswordIcon className="icon icon--password" />
                        ) : (
                            <FileIcon className="icon icon--file" />
                        )}
                        <span className="font-regular profile--files__file--text">{item.name}</span>
                        <span className="font-regular profile--files__file--date">{item.uploaded}</span>
                    </div>
                ))) : (
                <span className="font-regular profile--files__file--no-data">No data</span>
            )}
        </section>
    );
}