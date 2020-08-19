// Gatsbyがページを生成する際に、特定のタイミングやイベントに合わせて設定する処理

const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    // 全記事一覧
    const blogResult = await graphql(`
        query {
            allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
                edges {
                    node {
                        id
                        slug
                    }
                    next {
                        title
                        slug
                    }
                    previous {
                        title
                        slug
                    }
                }
            }
            allContentfulCategory {
                edges {
                    node {
                        categorySlug
                        id
                        category
                        blogpost {
                            title
                        }
                    }
                }
            }
        }
    `);

    // エラー処理
    if (blogResult.errors) {
        reporter.panicOnBuild(`GraphQLのクエリでエラーが発生しました`);
        return;
    }

    // 記事詳細ページを生成
    blogResult.data.allContentfulBlogPost.edges.forEach(({ node, next, previous }) => {
        createPage({
            path: `/blog/post/${node.slug}/`, // 生成するページのパス
            component: path.resolve(`./src/templates/blogpost-template.js`), // 生成に使用するテンプレート
            context: {
                // 指定したオブジェクトをテンプレートへ送る
                id: node.id,
                next,
                previous,
            },
        });
    });

    // 1ページに表示する記事数
    const blogPostsPerPage = 6;
    // 記事の総数
    const blogPosts = blogResult.data.allContentfulBlogPost.edges.length;
    // 記事一覧ページの総数 (例）10 / 6 = 2ページ（小数点切り上げ）
    const blogPages = Math.ceil(blogPosts / blogPostsPerPage);

    // 記事一覧ページを生成
    Array.from({ length: blogPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/blog/` : `/blog/${i + 1}/`,
            component: path.resolve(`./src/templates/blog-template.js`),
            context: {
                skip: blogPostsPerPage * i, // 0, 6, 12, 18...
                limit: blogPostsPerPage,
                currentPage: i + 1,
                isFirst: i + 1 === 1,
                isLast: i + 1 === blogPages,
            },
        });
    });

    // 1ページに表示する記事数
    const catPostsPerPage = 6;

    // カテゴリーページを生成
    blogResult.data.allContentfulCategory.edges.forEach(({ node, next, previous }) => {
        // カテゴリーに属した記事の総数
        const catPosts = node.blogpost.length;
        // カテゴリーページの総数
        const catPages = Math.ceil(catPosts / catPostsPerPage);
        // ページネーションごとに生成
        Array.from({ length: catPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/cat/${node.categorySlug}/` : `/cat/${node.categorySlug}/${i + 1}`,
                component: path.resolve(`./src/templates/cat-template.js`),
                context: {
                    catid: node.id,
                    catname: node.category,
                    catslug: node.categorySlug,
                    skip: catPostsPerPage * i, // 0, 6, 12, 18...
                    limit: catPostsPerPage,
                    currentPage: i + 1,
                    isFirst: i + 1 === 1,
                    isLast: i + 1 === catPages,
                },
            });
        });
    });
};
