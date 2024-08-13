/**
 * Interface representing a comment on an article.
 * 
 * The `Comment` interface defines the structure of a comment object, which includes details
 * about the comment itself, the author, and the article to which it belongs. It captures
 * information such as the comment's unique identifier, its content, the author's name,
 * and timestamps for creation and last update.
 * 
 * @interface Comment
 * @property {number} id - The unique identifier of the comment. This field is required.
 * @property {string} content - The text content of the comment. This field is required.
 * @property {string} author - The name of the author who created the comment. This field is required.
 * @property {string} article_id - The unique identifier of the article that the comment is associated with. This field is required.
 * @property {string} [createdAt] - The date and time when the comment was created. This field is optional.
 * @property {string} [updatedAt] - The date and time when the comment was last updated. This field is optional.
 */
export interface Comment {
    id: number;
    content: string;
    author: string;
    article_id: string;
    createdAt?: string;
    updatedAt?: string;
}
