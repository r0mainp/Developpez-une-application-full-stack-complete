/**
 * Interface representing an article.
 * 
 * The `Article` interface defines the structure of an article object, which includes
 * details such as the article's identifier, title, content, author, theme, and timestamps.
 * This interface is used to model articles retrieved from or sent to the server.
 * 
 * @interface Article
 * @property {number} id - The unique identifier for the article. This is a required field.
 * @property {string} title - The title of the article. This field is required.
 * @property {string} content - The content or body of the article. This field is required.
 * @property {number} authorId - The identifier of the author who created the article. This is a required field.
 * @property {number} themeId - The identifier of the theme associated with the article. This is a required field.
 * @property {string} [createdAt] - The date and time when the article was created. This field is optional.
 * @property {string} [updatedAt] - The date and time when the article was last updated. This field is optional.
 */
export interface Article {
    id: number;
    title: string;
    content: string;
    authorId: number;
    themeId: number;
    createdAt?: string;
    updatedAt?: string;
}
