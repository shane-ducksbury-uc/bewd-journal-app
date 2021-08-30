import React, { useState } from 'react'
import Axios from 'axios';
import NewJournalEntryCSS from './NewJournalEntry.module.css'
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
        const newJournalURL = `http://${process.env.REACT_APP_API_ENDPOINT}/entries/`
        const journalData = {
            "associated_journal": journalId,
            "title": formData.title,
            "content": JSON.stringify({ "rawEditorState" : JSON.stringify(editorState.getCurrentContent()),
            "plainEntryText": editorState.getCurrentContent().getPlainText(),
            "htmlEntryText": draftToHtml(convertToRaw(editorState.getCurrentContent()))
            })
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
                history.push(`/journals/${journalId}`)} 
        } catch (e) {
            toast.error(`Something went wrong. Try again later.`, { autoClose:false })
        }
    }

    return (
        <div className={NewJournalEntryCSS.journalEntryWrapper}>
            <h1 className={NewJournalEntryCSS.test}>New Journal Entry</h1>
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" onChange={handleChange} />
            <Editor 
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState} 
            />
            <div>
                <button onClick={handleSubmit}>Save</button>
                <button>Cancel</button>
            </div>
        </div>
    )
}

export default NewJournalEntry
