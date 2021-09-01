import React, { useState } from 'react'
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'

function NewJournalEntry({ handleForceRefresh, token }) {
    const history = useHistory()
    // May not need the below id field?
    const [formData, updateFormData] = useState({'id': uuidv4()})
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const { journalId } = useParams()

    // https://linguinecode.com/post/how-to-get-form-data-on-submit-in-reactjs
    // Make this so that it is saved in local storage until submitted.
    const handleChange = (e) => {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim(),
      });
    };

    const addJournalEntry = (formData, editorState) => {
        const newJournalURL = `${process.env.REACT_APP_API_ENDPOINT}/entries/`
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
        return Axios.post(newJournalURL, journalData, {
            headers: {
              'Authorization': `Bearer ${token.accessToken}`
            }
          })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await addJournalEntry(formData, editorState)
            if(response.status === 201) {
                handleForceRefresh(false)
                toast.success('Journal entry successfully created.')
                history.push(`/journals/${journalId}`)} 
        } catch (e) {
            toast.error(`Something went wrong. Try again later.`, { autoClose:false })
        }
    }

    return (
        <div className="card">
            <header className="card-header">
                <input placeholder="Enter a title for your journal entry" className="card-header-title input is-large"type="text" name="title" onChange={handleChange} required />
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
                <button className="button is-secondary" onClick={() => {history.push(`/journals/${journalId}`)}}>Cancel</button>
            </div>
        </div>
    )
}

export default NewJournalEntry
