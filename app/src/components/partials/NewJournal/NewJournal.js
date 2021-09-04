import React from "react";
import { useForm } from "react-hook-form"
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom"

function NewJournal({ newJournalModalIsOpen, setNewJournalModalIsOpen, forceJournalsRefresh, forceEntriesRefresh, token }) {
  const { register, handleSubmit, formState: {errors}} = useForm()

  const history = useHistory()

  const addNewJournal = (formData) => {
    const newJournalURL = `${process.env.REACT_APP_API_ENDPOINT}/journals`

    return axios.post(newJournalURL, formData, {
      headers: {
        'Authorization': `Bearer ${token.accessToken}`
      }
    })
  }

  const onSubmit = async (data) => {
    try {
      const response = await addNewJournal(data)
      if(response.status === 201) {
        sessionStorage.setItem('currentJournal', response.data)
        forceJournalsRefresh()
        history.push(`/journals/${response.data}`)
        toast.success('Journal successfully created.')
      }
    } catch (e) {
      toast.error(`Something went wrong. Try again later.`, { autoClose:false })
    }
  }

  return (
    <div className={`modal ${newJournalModalIsOpen ? 'is-active' : null}`}>
      <div className="modal-background" onClick={() => { setNewJournalModalIsOpen(false) }}></div>
      <div className="modal-content journal-modal">
        <div>
          <h3>Create a New Journal</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="label" htmlFor="title">New Journal Name</label>
              <input placeholder="My New Journal" className={`input is-medium ${errors.title ? "is-danger" : null}`} type="text" {...register("title", { required: true, minLength: 5, maxLength: 64 })} />
              {errors.title ? <p className="help is-danger">The journal name must be between 5 and 64 characters long.</p> : null}
            </div>
          </form>
        </div>
        <button className="button is-primary is-link" onClick={handleSubmit(onSubmit)}>Create Journal</button>
        <button className="button is-secondary" onClick={() => { setNewJournalModalIsOpen(false) }}>Cancel</button>
      </div>
    </div>
  );
}

export default NewJournal;
