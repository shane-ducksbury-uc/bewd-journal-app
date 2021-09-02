import React, { useState } from 'react'
import Axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'

// This function is largely a duplicate of new entry. Could be refactored.

function EditJournalEntry({ handleForceRefresh, token, journalEntry }) {
    const history = useHistory()
    const [journalData, updateJournalData] = useState(journalEntry)
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(convertFromRaw(JSON.parse(journalEntry.content.rawEditorState))))
    const { journalId, journalEntryId } = useParams()

    const handleChange = (e) => {
      updateJournalData({
        ...journalData,
        [e.target.name]: e.target.value.trim(),
      });
    };

    const updateJournalEntry = (formData, editorState) => {
        const updateJournalURL = `${process.env.REACT_APP_API_ENDPOINT}/entries/${journalEntryId}`
        const journalData = {
            "associated_journal": journalId,
            "title": formData.title.replace(/'/g,`''`),
            "content": 
            JSON.stringify({
                "rawEditorState" : JSON.stringify(convertToRaw(editorState.getCurrentContent())),
                "plainEntryText": editorState.getCurrentContent().getPlainText(),
                "htmlEntryText": draftToHtml(convertToRaw(editorState.getCurrentContent()))
            }).replace(/'/g,`''`)
        }
        return Axios.put(updateJournalURL, journalData, {
            headers: {
              'Authorization': `Bearer ${token.accessToken}`
            }
          })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await updateJournalEntry(journalData, editorState)
            if(response.status === 201) {
                handleForceRefresh(false)
                toast.success('Journal entry successfully updated.')
                history.push(`/journals/${journalId}/${journalEntryId}`)} 
        } catch (e) {
            toast.error(`Something went wrong. Try again later.`, { autoClose:false })
        }
    }

    return (
        <div className="card">
            <header className="card-header">
                <input defaultValue={journalEntry.title} className="card-header-title input is-large"type="text" name="title" onChange={handleChange} required />
            </header>
            <section className="card-content">
            <Editor 
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="entry-editor"
                onEditorStateChange={setEditorState} 
                />
            </section>
            <div>
                <button className="button is-primary" onClick={handleSubmit}>Save</button>
                <button className="button is-secondary" onClick={() => {history.push(`/journals/${journalId}/${journalEntryId}`)}}>Cancel</button>
            </div>
        </div>
    )
}

export default EditJournalEntry
