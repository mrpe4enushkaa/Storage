import React, { useState } from "react";
import Cloud from "../../../images/Cloud.png?react";
import CloudDone from "../../../images/CloudDone.png?react";

export default function FormAdd({ setName, isPassword, setIsPassword, setFiles, addDocument, formAdd, setPassword }) {
    const [countFiles, setCountFiles] = useState(0);

    return (
        <form className="profile__form close" onSubmit={addDocument} ref={formAdd}>
            <div className='form__add'>
                <div className="form__container-div">
                    <span className="form__name-dot font-regular">Name</span>
                    <input type="text" className="form__input" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form__container-div">
                    <span className="form__name-dot font-regular">Type</span>
                    <select className="form__select" defaultValue="password" onChange={(e) => setIsPassword(e.target.value === "password")}>
                        <option value="password">Password</option>
                        <option value="document">Document</option>
                    </select>
                </div>
                {isPassword ? (<div className="form__container-div">
                    <span className="form__name-dot font-regular">Password</span>
                    <input type="text" className="form__input" onChange={(e) => setPassword(e.target.value)} />
                </div>) : (<div className="form__container-div">
                    <span className="form__name-dot font-regular">File(s)</span>
                    <label htmlFor="input-files" className="label__drag-and-drop">
                        <input
                            type="file"
                            multiple
                            hidden
                            id="input-files"
                            onChange={(e) => {
                                setFiles(Array.from(e.target.files));
                                setCountFiles(e.target.files.length);
                            }}
                        />
                        <div className="container__drag-and-drop">
                            {countFiles === 0 ? (<>
                                <img src={Cloud} alt="cloud" className="img-cloud" />
                                <span className="font-regular">Drag and drop or click here <br /> to upload</span>
                            </>) : (<>
                                <img src={CloudDone} alt="cloud" className="img-cloud done"/>
                                <span className="font-regular">Uploaded {countFiles} files</span>
                            </>)}
                        </div>
                    </label>
                </div>)}
                <button className="form__button-submit" type="submit" >Submit</button>
            </div>
            {/* <div className='form__add-folder'>
                <input type="text" placeholder='name forler' />
                <button type="submit">submit</button>
            </div> */}
        </form>
    );
}