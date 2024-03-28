import React from 'react'
import databaseService from '../appwrite/database'
import { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'

function AllPosts() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log("getting posts")
        databaseService.getPosts().then((posts) => {
            console.log(posts)
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div class="my-12 flex items-center justify-center px-2 md:my-24 md:px-0">
                    <div class="lg:flex lg:items-center lg:space-x-10">
                        <img
                            src="https://illustrations.popsy.co/white/resistance-band.svg"
                            alt="question-mark"
                            class="h-[300px] w-auto"
                        />
                        <div>
                            <h1 class="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                                We can&#x27;t find any Blogs
                            </h1>
                            <p class="mt-4 text-gray-500">
                                Sorry, no blogs are currently there in the feed!
                            </p>
                            <div class="mt-6 flex items-center space-x-3">
                                <button
                                    type="button"
                                    class="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="mr-2"
                                    >
                                        <line x1="19" y1="12" x2="5" y2="12"></line>
                                        <polyline points="12 19 5 12 12 5"></polyline>
                                    </svg>
                                    Go back
                                </button>
                                <button
                                    type="button"
                                    class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Contact us
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts