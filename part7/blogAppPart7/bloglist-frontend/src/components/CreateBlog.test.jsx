import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import { describe, test } from "vitest";

/*
Make a test for the new blog form. 
The test should check, that the form calls the event handler it 
received as props with the right 
details when a new blog is created.
*/
describe("<CreateBlog />", () => {
  test("recieves correct blog details when create blog evenet handler called", async () => {
    const testInputBlog = {
      title: "test_title",
      author: "test_author",
      url: "https://test.url.com",
    };

    const { title, author, url } = testInputBlog;

    const createHandler = vi.fn();

    const { container } = render(
      <CreateBlog handleBlogCreate={createHandler} />,
    );

    const user = userEvent.setup();

    const titleInput = container.querySelector("#title-input");
    const authorInput = container.querySelector("#author-input");
    const urlInput = container.querySelector("#url-input");

    const submitButton = screen.getByText("create");

    await user.type(titleInput, title);
    await user.type(authorInput, author);
    await user.type(urlInput, url);

    await user.click(submitButton);

    expect(createHandler.mock.calls[0][0].title).toBe(title);
    expect(createHandler.mock.calls[0][0].author).toBe(author);
    expect(createHandler.mock.calls[0][0].url).toBe(url);
  });
});
