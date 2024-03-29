import { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";

const CreateBlog = ({ handleBlogCreate }) => {
  const dispatch = useDispatch() 

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlogSubmit = (event) => {
    event.preventDefault();
    handleBlogCreate({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={createBlogSubmit}>
        <div>
          <TextField
            type="text"
            value={title}
            label="Title"
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            id="title-input"
            data-testid="title-input"
          />
        </div>
        <div>
          <TextField
            type="text"
            value={author}
            label="Author"
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            id="author-input"
            data-testid="author-input"
          />
        </div>
        <div>
          <TextField
            type="text"
            value={url}
            label="URL"
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            id="url-input"
            data-testid="url-input"
          />
        </div>
        <Button size="small" variant="contained" color="primary" type="submit">create</Button>
      </form>
    </>
  );
};

export default CreateBlog;
