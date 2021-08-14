import React from "react";

function JournalEntries({ journalEntries }) {
  return (
    <div>
      {journalEntries.map((entry) => {
        return (
          <div key={entry.id}>
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default JournalEntries;
