import React from "react";

export default function FormAdd({ setName, isPassword, setIsPassword, setFiles, addDocument, formAdd, setPassword }) {
    return (
        <form className="profile__form close" onSubmit={addDocument} ref={formAdd}>
            <div className='form__add-document'>
                <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
                <select id="" defaultValue="password" onChange={(e) => setIsPassword(e.target.value === "password")}>
                    <option value="password" selected>Password</option>
                    <option value="document">Document</option>
                </select>
                {isPassword ? (<>
                    <input type="text" placeholder='password: *********' onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">submit</button>
                </>) : (<>
                    <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files))} />
                    <button type="submit">submit</button>
                </>)}
            </div>
            {/* <div className='form__add-folder'>
                            <input type="text" placeholder='name forler' />
                            <button type="submit">submit</button>
                        </div> */}
        </form>
    );
}