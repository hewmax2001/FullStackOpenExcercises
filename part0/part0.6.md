```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser executes code that appends a note list element to the HTML document and sends the note to the server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
```