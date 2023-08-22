"use client"
import React from 'react'
import { useEffect } from 'react'
import Story from './Story/page'

const Feed = () => {
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/'
        }
    }, [])
    return (
        <>
            <Story />

            <hr className='border border-gray-700 mb-3 md:mx-10' />
            <div className="flex justify-center">
                <div className="md:max-w-lg">
                    <div className="">
                        dgsfhdsh Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore nisi deserunt laborum unde repudiandae neque repellat sed dolore alias enim eius eum deleniti distinctio dolor pariatur facilis, quod qui quibusdam ullam dolorum! Recusandae voluptate sequi quaerat quam eveniet optio atque, nesciunt saepe, aliquam sint reiciendis ratione adipisci, architecto dolorem dolore. Magni dolor porro corporis, sapiente exerci Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt voluptas ullam voluptatibus, laborum ipsum atque quam suscipit aperiam doloribus numquam ad, placeat esse reiciendis voluptatem autem officia deserunt fuga magni ex. Sequi ad velit voluptatibus officia, quod reiciendis. Mollitia, culpa odit! Blanditiis voluptatum fugiat magnam error numquam explicabo nostrum dolorum eos voluptatem nesciunt tenetur qui enim placeat corporis eaque tempora laborum aperiam, doloribus accusamus deleniti. Eius quas minus accusamus, ipsa saepe in soluta excepturi unde nam aspernatur quos porro fugiat temporibus beatae nobis odit dolor laborum inventore quia! Sunt maiores voluptatem debitis et a similique, ducimus esse ut necessitatibus laudantium rem ipsam eius, accusantium dolore, quam voluptatibus! Dignissimos saepe accusamus magnam dolorum vitae itaque aliquam pariatur, unde fugit possimus, nisi accusantium provident neque ipsa voluptates aspernatur, sequi recusandae. Ad nemo dignissimos omnis, deleniti laborum asperiores provident ut praesentium cumque est earum accusantium possimus cum officiis eius nulla facere. Aliquid optio voluptates consequuntur repudiandae. Saepe necessitatibus quaerat, veniam deserunt, eius praesentium eos modi iste nemo repellat delectus fugiat reprehenderit? Aspernatur voluptatum dolorem libero illo nulla fugiat, beatae maxime sapiente velit aut quam rerum tempore ab omnis enim voluptate incidunt at molestias adipisci corporis impedit nisi ad tenetur? Adipisci voluptates repudiandae id. Sint reiciendis libero dolorem fuga quasi assumenda adipisci necessitatibus culpa voluptatum iure fugit laudantium consectetur quisquam, esse natus architecto optio eligendi repellat repudiandae veniam, animi perspiciatis, rerum asperiores? Facilis officiis adipisci eaque dignissimos eveniet! Sed!tationem pariatur nostrum, ex esse tempore dolorem vero error itaque. Harum error qui id, nostrum doloremque sint commodi unde laborum iste in nam nulla molestias. Ipsam maxime consectetur impedit nemo quam eveniet, blanditiis exercitationem vero incidunt ab sapiente asperiores sed nisi, a iusto repudiandae earum. Odit soluta nihil velit blanditiis nesciunt nostrum distinctio sapiente sunt, enim similique a quas et, eligendi in fugiat facilis recusandae tempora cumque. Eveniet nisi labore rerum, quos placeat quaerat fuga reprehenderit facilis animi excepturi? Assumenda, provident, magnam asperiores consequuntur alias laboriosam accusamus incidunt ea vitae error cumque eos quasi vero possimus nulla rem rerum tempore maiores! Accusantium sed inventore est, obcaecati earum distinctio amet tenetur. Modi iste expedita velit omnis? Fugit maiores, quaerat minima incidunt placeat voluptatum illum. Laudantium sapiente temporibus dolorum totam consectetur maxime. Totam accusamus facilis beatae laudantium quidem voluptate! Cum pariatur doloremque voluptate id natus itaque molestias aspernatur, porro minus aliquam dicta magni alias quisquam quasi dolorem incidunt. Cupiditate quos perspiciatis officiis. Deserunt voluptate quisquam, fugiat eaque est distinctio facilis voluptatum ipsa, ullam delectus similique officiis culpa, dolor atque perspiciatis soluta?
                    </div>
                    <div className="">

                    </div>
                </div>
            </div>
        </>

    )
}

export default Feed
