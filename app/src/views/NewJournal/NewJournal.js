import React from "react";

function NewJournal({ setIsOpen }) {
  return (
    <>
      <div>
        <form onSubmit={""}>
          <label className="label" htmlFor="Journal Name">
            New Journal Name
          </label>
          <input className="input is-medium" type="text" required />
          <button className="button is-primary is-link">Create Journal</button>
        </form>
      </div>
      <button className="button is-secondary" onClick={() => {setIsOpen(false);}}>Cancel</button>
    </>
  );
}

export default NewJournal;
