import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function DeleteJournal({ deleteModalIsOpen, setDeleteModalIsOpen, forceJournalsRefresh, journalId, token }) {

    const deleteJournal = async (journalId) => {
        try {
            const deleteJournalURL = `${process.env.REACT_APP_API_ENDPOINT}/journals/${journalId}`
            const response = await axios.delete(deleteJournalURL, {
                headers: {
                  'Authorization': `Bearer ${token.accessToken}`
                }
              })
            if(response.status === 200){
                sessionStorage.removeItem('currentJournal')
                forceJournalsRefresh()
                toast.success('Journal successfully deleted.')
            }
        } catch (e) {
            toast.error(`Something went wrong. Try again later.`, { autoClose:false })
        }     
    }

    return (
        <div className={`modal ${deleteModalIsOpen ? 'is-active' : null}`}>
            <div className="modal-background" onClick={() => { setDeleteModalIsOpen(false) }}></div>
            <div className="modal-content journal-modal">
                <h3>Delete Journal</h3>
                <p>Are you really sure you want to delete? You will lose all journal entries in this journal. This action is irreversible.</p>
                <button className="button is-danger" onClick={() => { deleteJournal(journalId) }}>Delete</button>
                <button className="button is-secondary" onClick={() => { setDeleteModalIsOpen(false) }}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteJournal
