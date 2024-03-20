import { render, screen } from  '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe, test } from 'vitest'

describe('<Blog />', () => {
    test('renders only title & author by default', () => {
        const blog = {
            title: "First blog",
            author: "Maximilian Hewitt",
            url: "https://github.com/hewmax2001/FullStackOpenExcercises",
            likes: 23,
            id: "65e2f1f26db792c52a5a06d1"
        }

        const { container } = render(<Blog blog={blog} likeBlog={() => false} removable={false}/>)
        const div = container.querySelector('.toggledOff')
        const hiddenDiv = container.querySelector('.toggledOn')

        expect(div).not.toHaveStyle('display: none')
        expect(hiddenDiv).toHaveStyle('display: none')

        expect(div).toHaveTextContent(
            'First blog'
        )
        expect(div).toHaveTextContent(
            'Maximilian Hewitt'
        )
    })

    test('clicking the view button displays the toggledOn div', async () => {
        const blog = {
            title: "First blog",
            author: "Maximilian Hewitt",
            url: "https://github.com/hewmax2001/FullStackOpenExcercises",
            likes: 23,
            id: "65e2f1f26db792c52a5a06d1"
        }

        const mockHandler = vi.fn()

        const { container } = render(<Blog blog={blog} likeBlog={mockHandler} removable={false}/>)

        const div = container.querySelector('.toggledOn')
        expect(div).toHaveStyle('display: none')

        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        expect(div).not.toHaveStyle('display: none')
    })

    test('clicking the like button twice triggers the event handler twice', async () => {
        const blog = {
            title: "First blog",
            author: "Maximilian Hewitt",
            url: "https://github.com/hewmax2001/FullStackOpenExcercises",
            likes: 23,
            id: "65e2f1f26db792c52a5a06d1"
        }

        const likeHandler = vi.fn()

        render(<Blog blog={blog} likeBlog={likeHandler} removable={false}/>)

        const user = userEvent.setup()
        const button = screen.getByText('like')

        await user.click(button)
        await user.click(button)

        expect(likeHandler.mock.calls).toHaveLength(2)
    })
})