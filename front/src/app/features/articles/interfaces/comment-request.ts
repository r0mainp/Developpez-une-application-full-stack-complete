/**
 * Interface representing a request to create a new comment.
 * 
 * The `CommentRequest` interface defines the structure of the data required to create
 * a new comment on an article. It includes the content of the comment and the identifier
 * of the article to which the comment is being added.
 * 
 * @interface CommentRequest
 * @property {string} content - The text content of the comment. This field is required.
 * @property {number} article_id - The unique identifier of the article to which the comment belongs. This field is required.
 */
export interface CommentRequest {
    content: string;
    article_id: number;
}
