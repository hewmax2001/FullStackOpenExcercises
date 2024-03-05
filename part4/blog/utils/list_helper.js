const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0)
        return 0

    const result = blogs.reduce((sum, order) => sum + order.likes, 0)
    return result
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0)
        return 0

    const result = blogs.reduce((sum, order) => {
        return sum.likes < order.likes ? order : sum
    }, blogs[0])
    return result
}

const mostBlogs = (blogs) => {
    // iterates through all blog objects, maps names to a counter, 
    //if name already exists, increment counter
    const mappedBlogs = blogs.map(blog => {
        
        const noBlogs = blogs.filter(eachBlog => {
            return blog.author === eachBlog.author
        }).length

        return {
            author: blog.author,
            blogs: noBlogs
        }
    })

    return mappedBlogs.reduce((sum, order) => {
        return sum.blogs < order.blogs ? order : sum
    }, mappedBlogs[0])
}

const mostLikes = (blogs) => {
    // iterate through blogs
    // for each blog iterate though entire list accumulating likes
    const mappedBlogs = blogs.map(blog => {
        const totalLikes = blogs.reduce((likesSum, orderBlog) => {
            return blog.author === orderBlog.author ? likesSum + orderBlog.likes : likesSum
        }, 0)

        return {
            author: blog.author,
            likes: totalLikes
        }
    })

    return mappedBlogs.reduce((currentBlog, orderBlog) => {
        return currentBlog.likes < orderBlog.likes ? orderBlog : currentBlog
    }, mappedBlogs[0])
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}