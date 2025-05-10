import React, { useEffect, useRef, useState } from "react";
import Cloud from "../../../images/Cloud.png?react";
import CloudDone from "../../../images/CloudDone.png?react";

export default React.memo(function FormAdd({ setName, isPassword, setIsPassword, setFiles, addDocument, formAdd, setPassword, showToast, buttonSubmit, open, close, isValidate, setIsValidate }) {
    const [countFiles, setCountFiles] = useState(0);
    const [states, setStates] = useState({ name: "", password: "", files: [] });
    // const buttonSubmit = useRef(null);
    const selectType = useRef(null);
    const blockPassword = useRef(null);
    const blockFiles = useRef(null);
    const inputPassword = useRef(null);
    const inputFiles = useRef(null);
    const handleValidate = () => {
        let valid = false;

        if (selectType.current.value === 'password') {
            if (states.name === '') {
                close();
                showToast('error', "Empty name field");
            } else if (states.password.length < 6) {
                close();
                showToast('error', "Incorrect password: at least 6 characters");
            } else {
                open();
                valid = true;
            }
        } else if (selectType.current.value === 'document') {
            if (states.name === '') {
                close();
                showToast('error', "Empty name field");
            } else if (states.files.length < 1) {
                close();
                showToast('error', "Empty files field");
            } else {
                open();
                valid = true;
            }
        }

        setIsValidate(valid);
        return valid;
    };

    const changeSelect = () => {
        setStates(prev => ({ ...prev, password: '', files: [] }));
        setFiles.current = [];
        setPassword.current = "";
        setCountFiles(0);
        inputPassword.current.value = '';
        inputFiles.current.value = '';
        setIsValidate(false);
    }

    const changeBlocks = () => {
        switch (isPassword) {
            case false:
                blockFiles.current.style.display = "flex";
                blockPassword.current.style.display = "none";
                break;
            case true:
                blockFiles.current.style.display = "none";
                blockPassword.current.style.display = "flex";
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        changeBlocks();
    }, [isPassword]);

    return (
        <form className="profile__form close" onSubmit={addDocument} ref={formAdd}>
            <div className='form__add'>
                <div className="form__container-div">
                    <span className="form__name-dot font-regular">Name</span>
                    <input type="text" className="form__input"
                        onChange={(e) => {
                            setName.current = e.target.value;
                            setStates(prev => ({ ...prev, name: e.target.value }));
                        }} />
                </div>
                <div className="form__container-div">
                    <span className="form__name-dot font-regular">Type</span>
                    <select className="form__select" defaultValue="password" ref={selectType}
                        onChange={(e) => {
                            setStates(prev => ({ ...prev, name: e.target.value }));
                            changeSelect();
                            setIsPassword(e.target.value === "password");
                        }}
                    >
                        <option value="password">Password</option>
                        <option value="document">Document</option>
                    </select>
                </div>
                <div className="form__container-div" ref={blockPassword}>
                    <span className="form__name-dot font-regular">Password</span>
                    <input type="text" className="form__input" onChange={(e) => {
                        setPassword.current = e.target.value;
                        setStates(prev => ({ ...prev, password: e.target.value }));
                    }}
                        ref={inputPassword} />
                </div>
                <div className="form__container-div" ref={blockFiles} style={{ display: "none" }}>
                    <span className="form__name-dot font-regular">File(s)</span>
                    <label htmlFor="input-files" className="label__drag-and-drop">
                        <input
                            type="file"
                            multiple
                            hidden
                            id="input-files"
                            onChange={(e) => {
                                const files = Array.from(e.target.files);
                                console.log(files)
                                setFiles.current = Array.from(e.target.files);
                                setCountFiles(e.target.files.length);
                                setStates(prev => ({ ...prev, files: e.target.files }));
                            }}
                            ref={inputFiles}
                        />
                        <div className="container__drag-and-drop">
                            {countFiles === 0 ? (<>
                                <img src={Cloud} alt="cloud" className="img-cloud" />
                                <span className="font-regular">Drag and drop or click here <br /> to upload</span>
                            </>) : (<>
                                <img src={CloudDone} alt="cloud" className="img-cloud done" />
                                <span className="font-regular">Uploaded {countFiles} files</span>
                            </>)}
                        </div>
                    </label>
                </div>
                <button
                    className="form__button-submit"
                    type="submit" ref={buttonSubmit}
                    onClick={() => {
                        const valid = handleValidate();

                        if (valid) {
                            setTimeout(() => {
                                changeBlocks();
                                setIsPassword(true);
                                changeSelect();
                                formAdd.current.reset();
                            }, 50);
                        }
                    }}
                >
                    Submit
                </button>
            </div>
        </form >
    );
});