/**
 * Interface representing the data required to create a new article.
 * 
 * The `ArticleRequest` interface defines the structure of the request body used when 
 * submitting a new article. It includes the title, content, and theme associated 
 * with the article.
 * 
 * @interface ArticleRequest
 * @property {string} title - The title of the article. This field is required.
 * @property {string} content - The content of the article. This field is required.
 * @property {string} theme_id - The identifier of the theme associated with the article. This field is required.
 */
export interface ArticleRequest {
    title: string;
    content: string;
    theme_id: string;
}
