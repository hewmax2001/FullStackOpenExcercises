const { test, describe, expect, beforeEach } = require('@playwright/test')
const baseURL = 'http://localhost:5173'
const helper = require('./test_helper')

const testUser = {
    username: 'Test_User',
    password: 'password',
    name: 'Testing User'
}
const { username, password, name } = testUser

const newBlog = {
    title: 'A test blog',
    author: 'Test Author',
    url: 'https://test.url.com'
}
const { title, author, url } = newBlog

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/testing/create_test_blogs')

        await request.post('/api/users', {
            data: testUser
        })

        await page.goto('/')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByText('blogs')
        await expect(locator).toBeVisible()
    })

    test('login form can be opened', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click()

        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {

        test('succeeds wtih correct credentials', async ({ page }) => {
            await helper.loginWith(page, username, password)

            await expect(page.getByText('testing user logged in')).toBeVisible()
        })

        test('fails wtih incorrect credentials', async ({ page }) => {
            await helper.loginWith(page, username, 'wrong_password')

            const errorDiv = await page.locator('.notifFailed')
            await expect(errorDiv).toContainText('Wrong credentials')
        })

    })  

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await helper.loginWith(page, username, password)
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'New Blog' }).click()

            await page.getByTestId('title-input').fill(title)
            await page.getByTestId('author-input').fill(author)
            await page.getByTestId('url-input').fill(url)

            await page.getByRole('button', { name: 'create' }).click()

            await expect(page.getByText(`a new blog ${title} by ${author} added`)).toBeVisible()
        })

        describe('with a blog created', () => {
            beforeEach(async ({ page }) => {
                await helper.createBlog(page, title, author, url)
            })

            test('likes can be updated', async ({page}) => {
                const blogDiv = await page.locator('.boxStyle').filter({ hasText: 'A test blog by Test Author'})
                await blogDiv.getByRole('button', { name: 'view' }).click()

                await blogDiv.getByRole('button', { name: 'like' }).click()

                await expect(blogDiv.getByText('likes 1')).toBeVisible()
            })

            test('user can delete blog', async ({page}) => {
                const blogDiv = await page.locator('.boxStyle').filter({ hasText: 'A test blog by Test Author'})
                await blogDiv.getByRole('button', { name: 'view' }).click()

                page.on('dialog', dialog => {
                    console.log(dialog.message())
                    dialog.accept()
                })
                await blogDiv.getByRole('button', { name: 'remove' }).click()

                await expect(blogDiv).toHaveCount(0)
            })

            test('only user that created blog can delete it', async ({page}) => {
                const blogDiv = await page.locator('.boxStyle').filter({ hasText: 'A test blog by Test Author'})
                await blogDiv.getByRole('button', { name: 'view' }).click()

                expect(blogDiv.getByRole('button', { name: 'remove' })).toBeVisible()

                const otherBlogDiv = await page.locator('.boxStyle').filter({ hasText: 'First class tests' })
                await otherBlogDiv.getByRole('button', { name: 'view' }).click()

                expect(otherBlogDiv.getByRole('button', { name: 'remove' })).not.toBeVisible()
            })

            test('blogs are ordered according to likes in descending order', async ({page}) => {
                const blogDiv = await page.locator('.boxStyle')
                const count = await blogDiv.count()

                const likesText = []

                for (let i = 0; i <= count ; i++) {
                    const element = await blogDiv.nth(i)
                    await element.getByRole('button', { name: 'view' }).click()
                    likesText.push(await element.getByText('likes').innerText())
                }

                const likes = likesText.map(text => text.match(/\d+/)[0])
                expect(likes.sort((a, b) => b- a) === likes).toBeTruthy()
            })
        })

    })
})